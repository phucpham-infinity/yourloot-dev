import BalanceV2 from '@/app/v2/balance'
import ArrowDown from '@/assets/icons/arrowDown'
import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import PlusIcon from '@/assets/images/header/plus.png'

import { getWalletIcon } from '@/app/v2/new-wallet/common'
import ProfileIcon from '@/assets/images/header/avatar.png'
import LogoMobile from '@/assets/images/yourloot-logotype.png'
import IconBtn from '@/components/common/icon-button'

import { CURRENCY_SIGN, FiatCurrencySymbol } from '@/constants/fund.constants'
// import { useToast } from '@/hooks/use-toast'
import { useFavorites } from '@/app/v2/game-inside/hooks/useFavorites'
import FullscreenIcon from '@/assets/images/fullscreen.svg'
import { useHistoryTracker } from '@/hooks/use-history-tracker'
import { cn, css } from '@/lib/utils'
import { walletsController } from '@/services/controller'
import { useAuthStore, useRegisterStore, useWalletStore } from '@/store'
import { useDialogStore } from '@/store/slices/dialog'
import { useV2DepositStore } from '@/store/slices/v2/deposit.store'
import { useHomeStoreV2 } from '@/store/slices/v2/home.store'
import formatAmount from '@/utils/format-amount'
import { Star } from 'lucide-react'
import { useMemo, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { CustomDrawer } from '../custom-drawer'
import BalanceHeaderV2 from './BalanceHeaderV2'

export const renderCurrencyIcon = (currency: string) => {
  if (!currency) return null
  if (FiatCurrencySymbol[currency as keyof typeof FiatCurrencySymbol]) {
    return (
      <span className="inline-flex items-center justify-center w-4 h-4">
        {FiatCurrencySymbol[currency as keyof typeof FiatCurrencySymbol]}
      </span>
    )
  }
  const crypto = CURRENCY_SIGN[currency]
  if (crypto) {
    return (
      <span className="inline-flex items-center justify-center w-4 h-4">
        {'\u00A0'}
        {crypto}
      </span>
    )
  }
  return null
}

const HeaderV2 = () => {
  const { wallets } = useWalletStore()
  const navigate = useNavigate()
  const location = useLocation()
  const { userId, isAuthenticated, user } = useAuthStore()
  const { t } = useTranslation()
  const { setStep } = useRegisterStore()
  const { historyCount } = useHistoryTracker()

  const [openBalance, setOpenBalance] = useState(false)
  const { openManageFunds, setOpenManageFunds } = useHomeStoreV2()
  const setIsOpenInputInfo = useV2DepositStore((s) => s.setIsOpenInputInfo)

  const { useCheckUserActiveBalanceWallet } = walletsController()
  const { data: userActiveBalanceWallet } = useCheckUserActiveBalanceWallet(
    userId!
  )

  const isBonusActiveBalance = useMemo(
    () => userActiveBalanceWallet?.content?.isBonus,
    [userActiveBalanceWallet]
  )

  // Favorite games
  const { gameId, provider } = useParams()
  const { isFavoriteGame, handleAddFavoriteGame, handleRemoveFavoriteGame } =
    useFavorites(String(gameId || ''), String(provider || ''), userId!)

  const accounts = useMemo(
    () => [
      {
        id: 'gold',
        icon: getWalletIcon(
          isBonusActiveBalance
            ? wallets.find((x) => x.isBonus)?.currency || ''
            : wallets.find((x) => x.isDefault)?.currency || '',
          { className: 'w-4 h-4' }
        ),
        total: isBonusActiveBalance
          ? wallets.find((x) => x.isBonus)?.amount
          : wallets.find((x) => x.isDefault)?.amount,
        currency: isBonusActiveBalance
          ? wallets.find((x) => x.isBonus)?.currency
          : wallets.find((x) => x.isDefault)?.currency
      }
    ],
    [isBonusActiveBalance, wallets]
  )

  return (
    <div className="w-full py-2 pl-4 pr-4 h-[60px] flex items-center bg-[#040305] justify-between border-b-0 border-[#2A2242]">
      {location?.pathname.startsWith('/game-inside') ? (
        isMobile ? (
          <div className="flex !items-center gap-2 !w-full !justify-between">
            <IconBtn
              onClick={() => {
                if (historyCount > 1) {
                  navigate(-1)
                } else {
                  navigate('/')
                }
              }}
              className="!rounded-[8px]"
              icon={<ArrowLeftIcon />}
            />
            <IconBtn
              variant="CTA"
              icon={<img src={PlusIcon} alt="deposit" className="!w-3 !h-3" />}
              onClick={() => {
                setIsOpenInputInfo(true, 'bank-card')
              }}
              className="!rounded-[8px] "
            />
            <div
              className="!w-full h-[40px] rounded-[10px] border border-app-default flex items-center justify-between gap-2 px-3 py-1 mx-auto"
              onClick={() => {
                setOpenBalance(true)
              }}
            >
              {accounts.map((account) => {
                return (
                  <div
                    key={account?.id}
                    className="inline-flex items-center justify-start h-3 gap-2"
                  >
                    <div>{account?.icon}</div>
                    <div className="text-center text-[#9d90cf] flex flex-col items-start justify-start">
                      <div className="text-xs text-[#9E90CF] font-bold">
                        {isBonusActiveBalance
                          ? t('header.bonus', 'Bonus')
                          : t('header.primary', 'Primary')}
                      </div>

                      <div className="text-[14px] text-white font-medium leading-[12px] flex items-center gap-1">
                        {formatAmount(account?.total)}
                        {renderCurrencyIcon(account?.currency || '')}
                      </div>
                    </div>
                  </div>
                )
              })}
              <ArrowDown className="w-3 h-3 text-[#9E90CF]" />
            </div>
            <IconBtn
              className="!rounded-[8px]"
              onClick={() => {
                if (isFavoriteGame) {
                  handleRemoveFavoriteGame()
                } else {
                  handleAddFavoriteGame()
                }
              }}
              icon={
                <Star
                  fill={isFavoriteGame ? 'yellow' : 'grey'}
                  className="w-[20px] h-[20px]"
                />
              }
            />
            <IconBtn
              className="!rounded-[8px]"
              onClick={() => {
                // Toggle game fullscreen mode via query parameter
                const searchParams = new URLSearchParams(location.search)
                if (searchParams.get('game_mode') === 'fullscreen') {
                  searchParams.delete('game_mode')
                } else {
                  searchParams.set('game_mode', 'fullscreen')
                }
                navigate({
                  pathname: location.pathname,
                  search: searchParams.toString()
                })
              }}
              icon={
                <img
                  src={FullscreenIcon}
                  alt="fullscreen"
                  className="w-3 h-3"
                />
              }
            />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <IconBtn
              onClick={() => {
                if (historyCount > 1) {
                  navigate(-1)
                } else {
                  navigate('/')
                }
              }}
              className="!rounded-[8px]"
              icon={<ArrowLeftIcon />}
            />
            <IconBtn
              className="!rounded-[8px]"
              onClick={() => {
                if (isFavoriteGame) {
                  handleRemoveFavoriteGame()
                } else {
                  handleAddFavoriteGame()
                }
              }}
              icon={<Star fill={isFavoriteGame ? 'yellow' : 'grey'} />}
            />
          </div>
        )
      ) : (
        <Link className="relative" to="/">
          <img src={LogoMobile} alt="Your-Loot" className="w-[31px] h-10" />
        </Link>
      )}
      {!location?.pathname.startsWith('/game-inside') && (
        <div className={cn('flex items-center gap-2 pl-3 pr-1 pt-1 pb-1', '')}>
          {isAuthenticated ? (
            <div className="flex items-center gap-2" style={{ width: '100%' }}>
              <>
                <div className="w-fit h-[40px] rounded-[10px] border border-app-default flex items-center justify-between gap-2 px-3 py-1">
                  {accounts.map((account) => {
                    return (
                      <div
                        key={account?.id}
                        className="inline-flex items-center justify-center h-3 gap-2"
                        onClick={() => {
                          setOpenBalance(true)
                        }}
                      >
                        <div>{account?.icon}</div>
                        <div className="text-center text-[#9d90cf] flex flex-col items-start justify-start">
                          {/* <div className="text-xs text-[#9E90CF] font-bold">
                            {isBonusActiveBalance
                              ? t('header.bonus', 'Bonus')
                              : t('header.primary', 'Primary')}
                          </div> */}

                          <div className="text-[14px] text-white font-medium leading-[12px] flex items-center gap-1">
                            {formatAmount(account?.total)}
                            {/* {renderCurrencyIcon(account?.currency || '')} */}
                          </div>
                        </div>

                        <ArrowDown className="w-3 h-3 text-[#9E90CF]" />
                      </div>
                    )
                  })}
                </div>
                <img
                  onClick={() => navigate('/profile')}
                  src={user?.photo_url ?? ProfileIcon}
                  alt="Profile"
                  className="object-cover w-10 h-10 border border-transparent rounded-full"
                />
              </>
            </div>
          ) : (
            <div className="flex items-center gap-2" style={{ width: '100%' }}>
              {/* <div className="relative inline-block">
              <IconBtn
                aria-label="Notifications"
                onClick={() => {
                  // const dialog = useDialogStore.getState()
                  // dialog.open({
                  //   content: <NotificationsV2 onClose={dialog.close} />,
                  //   width: window.innerWidth,
                  //   height: window.innerHeight,
                  //   noBorder: true
                  // })
                }}
                icon={
                  <img
                    src={NotificationsMenuIcon}
                    alt=""
                    aria-hidden
                    className="w-[11px] h-3"
                  />
                }
                className="min-w-0 w-10 h-10 !rounded-[10px] !shadow-none"
              />
              {unreadCount > 0 && (
                <span
                  aria-label={`${unreadCount} unread notifications`}
                  className="absolute top-2 right-2 translate-x-1/2 -translate-y-1/2 z-10 min-w-[22px] h-6 px-2 rounded-full bg-[#e3b175] text-[#0b0a11] text-[12px] leading-6 font-bold flex items-center justify-center border border-[#2A2242]"
                >
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </div> */}
              <div className="inline-flex w-auto gap-2">
                <div
                  css={styles1()}
                  onClick={() => {
                    const dialog = useDialogStore.getState()
                    dialog.close()
                    navigate('/auth/login')
                  }}
                  className="flex items-center justify-center border-app-default h-10 rounded-[10px] py-[16px] px-[20px] text-[#9E90CF] text-xs font-medium"
                >
                  {t('login.loginButton')}
                </div>
                <div
                  css={styles2()}
                  onClick={() => {
                    const dialog = useDialogStore.getState()
                    dialog.close()
                    navigate('/auth/register')
                    setStep(1)
                  }}
                  className="flex items-center justify-center border-app-default h-10 rounded-[10px] py-[16px] px-[20px] text-[#9E90CF] text-xs font-medium"
                >
                  {t('register.registerButton')}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <CustomDrawer
        open={openBalance}
        onOpenChange={setOpenBalance}
        title={t('header.balance', 'Balance')}
        bodyClassName="h-full max-h-[85dvh]"
      >
        <BalanceHeaderV2 onClose={() => setOpenBalance(false)} />
      </CustomDrawer>

      <CustomDrawer
        open={openManageFunds}
        onOpenChange={setOpenManageFunds}
        title={t('balance.manageFunds', 'Manage Funds')}
        bodyClassName="h-full max-h-[85dvh]"
      >
        <BalanceV2 isHome />
      </CustomDrawer>
    </div>
  )
}

export default HeaderV2

const styles1 = () => {
  return css`
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.1) 100%
    );
  `
}

const styles2 = () => {
  return css`
    background: radial-gradient(
      88.61% 265.18% at 59.95% -118.74%,
      #654ec8 0%,
      #372864 100%
    );
  `
}
