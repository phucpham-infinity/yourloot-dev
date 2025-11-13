import { generateCompleteWalletList } from '@/app/v2/balance/component/utils/walletUtils'
import { useWalletOperations } from '@/app/v2/balance/hooks/useWalletOperations'
import ConfirmSwitchBalanceDrawer from '@/app/v2/game-inside/components/ConfirmSwitchBalanceDrawer'
import { getWalletIcon } from '@/app/v2/new-wallet/common'
import ArrowDown from '@/assets/icons/arrowDown'
import HelpIcon from '@/assets/images/header/help.svg'
import InfiniteDropdown from '@/components/common/custom-dropdown/InfiniteDropdown'
import HoverTooltip from '@/components/common/hover-tooltip'
import WalletSpinnerDialog from '@/components/v2/payment/WalletSpinnerDialog.tsx'
import { useScreen } from '@/hooks'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { walletsController } from '@/services/controller'
import { promotionsController } from '@/services/controller/promotions'
import { useAuthStore, useWalletStore } from '@/store'
import { useHomeStoreV2 } from '@/store/slices/v2/home.store'
import formatAmount from '@/utils/format-amount'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import CustomButton from '../custom-button'
import ToggleButton from '../toggle-button'

interface BalanceHeaderV2Props {
  onClose?: () => void
}

const BalanceHeaderV2 = ({ onClose = () => {} }: BalanceHeaderV2Props) => {
  const { wallets } = useWalletStore()
  const navigate = useNavigate()
  const { userId, isAuthenticated } = useAuthStore()
  const { t } = useTranslation()
  const toast = useToast()
  const { setOpenManageFunds } = useHomeStoreV2()
  const [isSwitchingWallet, setSwitchingWallet] = useState<boolean>(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false)
  const [pendingWalletSwitch, setPendingWalletSwitch] = useState<{
    walletId: string
    currency: string
  } | null>(null)
  const { isMobile } = useScreen()

  const { useCheckUserActiveBalanceWallet, useUserActiveBalance } =
    walletsController()
  const { useGetActivePromotions } = promotionsController()
  const {
    data: userActiveBalanceWallet
    // refetch: refetchUserActiveBalanceWallet
  } = useCheckUserActiveBalanceWallet(userId!)

  const { data: activePromotionsData } = useGetActivePromotions('', 0, 20, {
    enabled: !!userId,
    refetchOnMount: 'always',
    staleTime: 0
  })

  const isBonusActiveBalance = useMemo(
    () => userActiveBalanceWallet?.content?.isBonus,
    [userActiveBalanceWallet]
  )

  const [isBonus, setIsBonus] = useState(isBonusActiveBalance)

  useEffect(() => {
    setIsBonus(isBonusActiveBalance)
  }, [isBonusActiveBalance])

  const {
    mutate: updateActiveBalance,
    isSuccess: isSuccessUpdateActiveBalance,
    isError: isErrorUpdateActiveBalance,
    data: dataActiveBalance
  } = useUserActiveBalance(userId!)

  const handleUpdateActiveBalance = () => {
    if (!isAuthenticated) return
    updateActiveBalance()
  }

  useEffect(() => {
    if (isSuccessUpdateActiveBalance) {
      // refetchUserActiveBalanceWallet()
      setIsBonus(true)
      toast.success(
        dataActiveBalance?.content?.isBonus
          ? t('header.bonusWalletActive', 'Bonus balance activated.')
          : t('header.defaultWalletActive', 'Primary balance activated.')
      )
    }

    if (isErrorUpdateActiveBalance) {
      setIsBonus(false)
      toast.warning(
        t('balance.errorSwitchWallet', "The bonus balance isn't available yet.")
      )
    }
  }, [
    isSuccessUpdateActiveBalance,
    isErrorUpdateActiveBalance,
    dataActiveBalance
  ])

  const allAvailableWallets = useMemo(
    () => generateCompleteWalletList(wallets || []),
    [wallets]
  )

  const walletOptions = useMemo(() => {
    const opts = allAvailableWallets.map((w) => {
      const network = w.network ? ` (${w.network})` : ''
      return {
        label: `${w.currency}${network}`,
        value: w.id,
        currency: w.currency,
        network: w.network || ''
      }
    })

    const defCur = wallets.find((x) => x.isDefault)?.currency
    if (!defCur) return opts

    const preferred = opts.filter((o) => o.currency === defCur)
    const others = opts.filter((o) => o.currency !== defCur)
    return [...preferred, ...others]
  }, [allAvailableWallets, wallets])

  const { handleSetPrimary, spinnerDialog } = useWalletOperations({
    allAvailableWallets
  })

  // Check if there are active promotions
  const hasActivePromotions = useMemo(() => {
    // @ts-ignore
    return activePromotionsData?.content?.length > 0
  }, [activePromotionsData])

  // New function to handle wallet switching with promotion check
  const handleWalletSwitchWithPromotionCheck = (
    walletId: string,
    currency: string
  ) => {
    if (hasActivePromotions) {
      // Store the pending wallet switch data
      setPendingWalletSwitch({ walletId, currency })
      // Show confirmation dialog
      setShowConfirmDialog(true)
    } else {
      // No active promotions, switch immediately
      handleSetPrimary(walletId, currency)
    }
  }

  // Handle confirmed wallet switch
  const handleConfirmWalletSwitch = async () => {
    if (pendingWalletSwitch) {
      handleSetPrimary(
        pendingWalletSwitch.walletId,
        pendingWalletSwitch.currency
      )
    }
    setShowConfirmDialog(false)
    setPendingWalletSwitch(null)
  }

  // Handle cancelled wallet switch
  const handleCancelWalletSwitch = () => {
    setShowConfirmDialog(false)
    setPendingWalletSwitch(null)
  }

  const defaultWalletId = useMemo(() => {
    return wallets.find((x) => x.isDefault)?.id
  }, [wallets])

  useEffect(() => {
    setSwitchingWallet(spinnerDialog.isOpen)
  }, [spinnerDialog])

  const balance = useMemo(
    () => [
      {
        id: 'primary',
        title: t('header.primary', 'Primary'),
        total: formatAmount(wallets.find((x) => x.isDefault)?.amount) ?? 0,
        currency: wallets.find((x) => x.isDefault)?.currency,
        icon: !isMobile ? (
          <>
            <InfiniteDropdown
              value={defaultWalletId}
              placeholder={t(
                'header.selectPrimaryWallet',
                'Select primary wallet'
              )}
              options={walletOptions}
              triggerClassName="w-[153px] h-[40px] !px-3"
              contentClassName="-translate-x-26"
              keepOpenOnSelect
              optionRender={(opt) => {
                let label =
                  typeof opt.label === 'string' ? opt.label : opt.label
                if (!opt.value?.toString().includes('placeholder')) {
                  label = opt.currency || opt.label
                }
                return (
                  <div className="flex items-center gap-[10px]">
                    {getWalletIcon(String(opt.currency) || '', {
                      className: 'w-4 h-4'
                    })}
                    <div className="text-[14px] text-white font-medium leading-[12px]">
                      {label}
                    </div>
                  </div>
                )
              }}
              onValueChange={(val) => {
                const opt = walletOptions.find(
                  (o) => o.value?.toString() === val?.toString()
                )
                handleWalletSwitchWithPromotionCheck(
                  String(opt?.value),
                  opt?.currency || ''
                )
              }}
            />
            <WalletSpinnerDialog
              isOpen={isSwitchingWallet}
              message={spinnerDialog.message}
            />
          </>
        ) : (
          <div
            onClick={() => {
              onClose()
              setOpenManageFunds(true)
            }}
            className="w-[103px] h-[40px] rounded-[10px] border border-app-default flex items-center justify-end gap-4 px-3 py-1"
          >
            <div className="flex items-center gap-[10px]">
              {getWalletIcon(wallets.find((x) => x.isDefault)?.currency || '', {
                className: 'w-4 h-4'
              })}
              <div className="text-[14px] text-white font-medium leading-[12px]">
                {wallets.find((x) => x.isDefault)?.currency}
              </div>
            </div>

            <ArrowDown className="w-3 h-3 text-[#9E90CF]" />
          </div>
        )
      },
      {
        id: 'coinLoot',
        title: 'YL Coins',
        total: wallets?.find((item) => item?.currency === 'BBK')?.amount || 0,
        currency: null
      },
      {
        id: 'bonus',
        title: t('header.bonus', 'Bonus'),
        total: formatAmount(wallets?.find((item) => item?.isBonus)?.amount),
        icon: (
          <div className="flex items-center justify-end gap-2">
            <div className="flex items-center gap-1">
              <div className="text-[#9d90cf] text-[14px] font-medium leading-[14px]">
                Activate
              </div>
              <HoverTooltip
                content={'Use your bonus balance as primary for all games.'}
              >
                <img
                  src={HelpIcon}
                  alt="Help"
                  className="w-4 h-4 cursor-help"
                />
              </HoverTooltip>
            </div>
            <ToggleButton
              checked={isBonus}
              onChange={() => {
                setIsBonus(true)
                handleUpdateActiveBalance()
              }}
            />
          </div>
        ),
        currency: wallets?.find((item) => item?.isBonus)?.currency
      }
    ],
    [
      isBonus,
      wallets,
      t,
      onClose,
      setOpenManageFunds,
      isErrorUpdateActiveBalance,
      isSuccessUpdateActiveBalance,
      isSwitchingWallet,
      isBonusActiveBalance
    ]
  )

  return (
    <div
      className={cn(
        'flex flex-col h-full',
        'md:w-[393px] md:py-6 md:!px-4 md:border-inherit'
      )}
    >
      <div className="flex-1">
        {balance.map((item, idx) => {
          return (
            <div
              key={item.id}
              className={cn(
                'flex justify-between items-center w-full border-b border-[#2A2242]',
                item.id === 'bonus' && 'bg-[#191524] rounded-[10px] px-3 my-4'
              )}
            >
              <div
                className={cn(
                  'flex flex-col gap-3 py-4  w-full',
                  idx === 0 ? 'pt-0' : ''
                )}
              >
                <div className="flex items-center gap-1 text-[#9d90cf] text-[14px] font-medium leading-[14px]">
                  <span>{item?.title}</span>
                  {!!item?.currency && (
                    <span className="w-[3px] h-[3px] bg-[#9d90cf] rounded-full"></span>
                  )}
                  <span>{item?.currency}</span>
                </div>
                <div className="text-white text-[16px] font-black leading-[16px]">
                  {item?.total}
                </div>
              </div>

              {item?.icon && (
                <div className="flex items-center justify-end w-full">
                  {item?.icon}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex justify-between w-full gap-3 flex-nowrap">
        <CustomButton
          label={t('menu.wallet', 'Wallet')}
          onClick={() => {
            onClose()
            navigate('/payment/deposit')
          }}
          labelStyle={{
            color: '#9d90cf'
          }}
          className="flex-1 w-full"
          variant="default"
        />
      </div>

      <ConfirmSwitchBalanceDrawer
        isOpen={showConfirmDialog}
        onClose={handleCancelWalletSwitch}
        onConfirmSwitch={handleConfirmWalletSwitch}
        onCancelSwitch={handleCancelWalletSwitch}
      />
    </div>
  )
}

export default BalanceHeaderV2
