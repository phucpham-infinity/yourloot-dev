import WarningIcon from '@/assets/images/warning-icon.svg'
import CustomButton from '@/components/common/custom-button'
import useToast from '@/hooks/use-toast'
import { walletsController } from '@/services/controller'
import { useAuthStore, useDialogStore, useV2WalletStore } from '@/store'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function SwitchingBonusWalletDialogContent() {
  const { t } = useTranslation()
  const dialog = useDialogStore()
  const setIsSwichingWallet = useV2WalletStore((s) => s.setIsSwichingWallet)
  const walletId = useV2WalletStore((s) => s.walletId)
  const currency = useV2WalletStore((s) => s.currency)
  const { useUpdateMainWallet } = walletsController()
  const { userId } = useAuthStore()
  const toast = useToast()
  const {
    mutate: updateMainWallet,
    isSuccess: isSuccessSwitchMain,
    isError: isErrorSwitchMain
  } = useUpdateMainWallet(walletId!)

  const handleWalletChangedAlert = () => {
    updateMainWallet({
      userId: userId || '',
      currency: currency!
    })
  }

  useEffect(() => {
    if (isSuccessSwitchMain) {
      toast.success(
        t(
          'balance.primaryWalletChangedSuccessfully',
          'Primary wallet changed successfully.'
        )
      )
      dialog.close()
      setIsSwichingWallet(false)
    }

    if (isErrorSwitchMain) {
      toast.error(
        t('balance.walletChangeError', 'Primary wallet changed error')
      )
    }
  }, [
    isSuccessSwitchMain,
    isErrorSwitchMain,
    dialog,
    toast,
    t,
    setIsSwichingWallet
  ])

  return (
    <div className="w-96 bg-zinc-950 rounded-[10px] border border-[#2b2142] backdrop-blur-lg inline-flex flex-col justify-start items-center overflow-hidden">
      {/* Body */}
      <div className="flex flex-col items-start self-stretch justify-start px-4 py-6">
        <div className="flex flex-col items-center self-stretch justify-center gap-4 pb-8">
          <img className="w-20 h-20" src={WarningIcon} alt="warning" />
          <div className="self-stretch justify-center text-sm font-medium text-center text-white">
            {t('balance.switchingWalletDialog.warningTitle', 'Are you sure?')}
          </div>
          <div className="self-stretch justify-center text-xs font-medium text-center text-slate-400">
            {t(
              'balance.switchingWalletDialog.warningMessage',
              'Switching wallets can cancel active bonuses. Make sure to use any bonuses before changing.'
            )}
          </div>
        </div>
        <div className="self-stretch inline-flex justify-start items-start gap-2.5">
          <CustomButton
            variant="default"
            className="flex-1"
            label={t('balance.switchingWalletDialog.switch', 'Switch')}
            onClick={() => {
              handleWalletChangedAlert()
            }}
          />
          <CustomButton
            variant="muted"
            className="flex-1"
            label={t('balance.switchingWalletDialog.cancel', 'Cancel')}
            onClick={() => {
              dialog.close()
            }}
          />
        </div>
      </div>
    </div>
  )
}
