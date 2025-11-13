import CustomButton from '@/components/common/custom-button'
import Loader from '@/components/common/loader'
import { walletsController, WalletsListResponse } from '@/services/controller'
import { gameController } from '@/services/controller/games'
import { useAuthStore, useDialogStore, useProfileStore } from '@/store'
import { useHomeStore } from '@/store/slices/home'
import { useWalletStore } from '@/store/slices/wallet'
import { useCallback, useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import GameLauncherComponent from './components/GameLauncher'
import { httpClient } from '@/services/api'

export default function GameInside() {
  const { gameId, provider } = useParams()
  const { profile } = useProfileStore()
  const { wallets } = useWalletStore()
  const [searchParams] = useSearchParams()
  const { setType, setActiveTab, setLayoutActive } = useHomeStore()
  const mode = searchParams.get('mode')
  const dialog = useDialogStore()
  const navigate = useNavigate()

  const { usePostGame, getMyIp } = gameController()
  const { t } = useTranslation()
  const { userId } = useAuthStore()

  const {
    mutate: postGame,
    data: launchUrl,
    isPending: isPostingGame,
    error: postGameError
  } = usePostGame()

  const { data: ip } = getMyIp()

  const { useCheckUserActiveBalanceWallet, useUserActiveBalance } =
    walletsController()

  const {
    mutate: updateActiveBalance,
    isSuccess: isSuccessUpdateActiveBalance,
    isError: isErrorUpdateActiveBalance,
    data: dataActiveBalance
  } = useUserActiveBalance(userId!)

  const { data: userActiveBalanceWallet } = useCheckUserActiveBalanceWallet(
    userId!
  )

  const handleUpdateActiveBalance = () => {
    updateActiveBalance()
  }

  useEffect(() => {
    if (isErrorUpdateActiveBalance) {
      dialog.openBasicDialog({
        type: 'warning',
        meta: {
          title: 'Warning',
          description: t('balance.errorSwitchWallet'),
          button: (
            <div className="w-full">
              <CustomButton
                variant={'default'}
                className="w-full text-center"
                label="Close"
                onClick={() => {
                  dialog.closeBasicDialog()
                }}
              />
            </div>
          )
        }
      })
    }
  }, [
    isSuccessUpdateActiveBalance,
    isErrorUpdateActiveBalance,
    dataActiveBalance
  ])

  useEffect(() => {
    if (
      postGameError &&
      ((postGameError as any)?.content?.message ===
        "Player can't use bonus wallet now" ||
        (postGameError as any)?.content?.message ===
          'Player can play only bonus games using bonus wallet')
    ) {
      dialog.openBasicDialog({
        type: 'warning',
        meta: {
          description: `You can't play it with bonus balance 😣\nPlease choose Games for Bonus or switch to Main Balance`,
          button: (
            <div className="w-full flex justify-between items-center gap-5">
              <CustomButton
                variant={'default'}
                className="w-[148px] text-center"
                label={'Switch'}
                // isLoading={isPendingUpdateActiveBalance}
                onClick={() => {
                  dialog.closeBasicDialog()
                  handleUpdateActiveBalance()
                }}
              />
              <CustomButton
                variant={'default'}
                className="w-[148px] text-center"
                label={'Bonus Games'}
                onClick={() => {
                  dialog.closeBasicDialog()
                  if (isMobile) {
                    setActiveTab('game')
                  } else {
                    setLayoutActive('right')
                  }
                  navigate('/?category=bonus&titleCategory=Games+for+Bonus')
                  setType('liveGame')
                  window.scrollTo(0, 0)
                }}
              />
            </div>
          )
        }
      })
    }
  }, [postGameError])

  useEffect(() => {
    if (profile?.userId && ip && wallets && gameId && provider) {
      postGame({
        mode: mode ?? 'real',
        userId: profile?.userId,
        walletId:
          (userActiveBalanceWallet?.content?.isBonus
            ? wallets.find((wallet) => wallet.isBonus)?.id
            : wallets.find((wallet) => wallet.isDefault)?.id) || '',
        currency:
          (userActiveBalanceWallet?.content?.isBonus
            ? wallets.find((wallet) => wallet.isBonus)?.currency
            : wallets.find((wallet) => wallet.isDefault)?.currency) || 'USD',
        clientType: isMobile ? 'mobile' : 'desktop',
        game: `${provider}:${gameId}`,
        ip: ip,
        jurisdiction: 'US',
        locale: navigator.language.split('-')[0] || 'en',
        returnUrl: window.location.href,
        depositUrl: window.location.href
      })
    }
  }, [ip, profile, mode, userActiveBalanceWallet, gameId, provider])

  const fetchUserWallets = useCallback(async (userId: string) => {
    try {
      const response = await httpClient.get<WalletsListResponse>(
        `/wallets/users/${userId}`
      )
      if (response?.data?.content?.content) {
        useWalletStore.getState().setWallets(response?.data?.content?.content)
      }
    } catch (error) {
      console.error('Failed to fetch user wallets:', error)
    }
  }, [])

  useEffect(() => {
    if (!userId) return

    const interval = setInterval(() => {
      fetchUserWallets(userId)
    }, 30000)

    return () => {
      clearInterval(interval)
      fetchUserWallets(userId)
    }
  }, [userId, fetchUserWallets])

  return (
    <div
      style={{
        minHeight: '600px',
        width: isMobile ? window.innerWidth * 0.95 : '1200px'
      }}
      className="relative"
    >
      {!isPostingGame && (
        <GameLauncherComponent
          className="relative z-20"
          width={isMobile ? window.innerWidth * 0.95 : '1200px'}
          height={isMobile ? '580px' : '600px'}
          launchUrl={launchUrl ?? ''}
        />
      )}
      <div
        className="flex justify-center items-center absolute top-0 left-0 z-0"
        style={{
          width: isMobile ? window.innerWidth * 0.9 : '1200px',
          height: isMobile ? '600px' : '600px'
        }}
      >
        <Loader />
      </div>
    </div>
  )
}
