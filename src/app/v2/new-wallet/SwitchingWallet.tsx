import WarningIcon from '@/assets/images/warning-icon.svg'
import CustomButton from '@/components/common/custom-button'
import { CustomDrawer } from '@/components/common/custom-drawer'
import useToast from '@/hooks/use-toast'
import { walletsController } from '@/services/controller'
import { useAuthStore, useV2WalletStore } from '@/store'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const SwitchingWalletV2 = () => {
  const { t } = useTranslation()
  const isSwichingWallet = useV2WalletStore((s) => s.isSwichingWallet)
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
          'balance.walletChangedSuccessfully',
          'Primary wallet changed successfully.'
        )
      )
    }

    if (isErrorSwitchMain) {
      toast.error(
        t('balance.walletChangeError', 'Primary wallet changed error')
      )
    }
  }, [isSuccessSwitchMain, isErrorSwitchMain])

  return (
    <CustomDrawer
      title={
        <div className="flex items-center justify-center w-full gap-2">
          <div className="text-app-medium-16">
            {t('wallet.createWallet.title')}
          </div>
        </div>
      }
      hideHeader={true}
      open={isSwichingWallet}
      onOpenChange={(open) => setIsSwichingWallet(open)}
      contentClassName="data-[vaul-drawer-direction=bottom]:rounded-t-[20px] rounded-t-[20px] overflow-hidden border-t border-r border-l border-app-default bg-[#040305] backdrop-blur-[15px]"
    >
      <div className="flex flex-col items-center w-full px-4 py-6">
        <div className="flex flex-col items-center self-stretch justify-center gap-4 pb-8">
          <img src={WarningIcon} className="w-20 h-20" />
          <div className="self-stretch text-center text-app-medium-14">
            {t('promotionV2.areYouSure', 'Are you sure?')}
          </div>
          <div className="self-stretch text-center text-app-medium-12 text-[#9E90CF]">
            {t(
              'balance.switchWallet.warningMessage',
              'Switching wallets can cancel active bonuses. Make sure to use any bonuses before changing.'
            )}
          </div>
        </div>
        <div className="self-stretch inline-flex justify-start items-start gap-2.5">
          <CustomButton
            label={t('balance.switchWallet.switch', 'Switch')}
            variant="default"
            className="flex-1 h-10 rounded-[10px]"
            onClick={() => {
              handleWalletChangedAlert()
              setIsSwichingWallet(false)
            }}
          />
          <CustomButton
            label={t('balance.switchWallet.cancel', 'Cancel')}
            variant="muted"
            className="flex-1 h-10 rounded-[10px]"
            onClick={() => {
              setIsSwichingWallet(false)
            }}
          />
        </div>
      </div>
    </CustomDrawer>
  )
}

export default SwitchingWalletV2
