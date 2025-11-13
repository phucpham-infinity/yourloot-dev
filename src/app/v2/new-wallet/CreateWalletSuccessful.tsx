import CheckIcon from '@/assets/images/check-done.svg'
import CustomButton from '@/components/common/custom-button'
import { CustomDrawer } from '@/components/common/custom-drawer'
import { useTranslation } from 'react-i18next'
import { useDialogStore, useV2WalletStore } from '@/store'
import CreateWalletSuccessDialogContent from '@/app/v2/profile/components/CreateWalletSuccessDialogContent'

const CreateWalletSuccessful = () => {
  const { t } = useTranslation()
  const isCreateWalletSuccessfull = useV2WalletStore((s) => s.isCreateWalletSuccessfull)
  const setIsCreateWalletSuccessfull = useV2WalletStore((s) => s.setIsCreateWalletSuccessfull)
  const setIsSwichingWallet = useV2WalletStore((s) => s.setIsSwichingWallet)
  const dialog = useDialogStore()

  // Desktop-only handling: open dialog instead of drawer
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(min-width: 1024px)').matches) {
    if (isCreateWalletSuccessfull) {
      // close the drawer state to avoid rendering it
      setIsCreateWalletSuccessfull(false)
      dialog.open({
        width: 384,
        noBorder: true,
        content: (
          <CreateWalletSuccessDialogContent />
        )
      })
    }
    return null
  }

  return (
    <CustomDrawer
      title={
        <div className="flex items-center justify-center w-full gap-2">
          <div className="text-app-medium-16">{t('wallet.createWallet.title')}</div>
        </div>
      }
      open={isCreateWalletSuccessfull}
      onOpenChange={(open) => setIsCreateWalletSuccessfull(open)}
    >
      <div className="flex flex-col items-center gap-4">
        <img src={CheckIcon} className="w-20 h-20" />
        <div className="text-app-medium-14">
          {t('newWallet.createSuccessMessage', 'Your wallet was created successfully')}
        </div>
        <div className="text-app-medium-12 w-[70%] text-center text-[#9E90CF]">
          {t(
            'newWallet.createSuccessDescription',
            'You can now use it to deposit, withdraw and manage funds.'
          )}
        </div>
        <div className="flex flex-row w-full gap-2 pt-4">
          <CustomButton
            label={t('balance.makePrimary')}
            variant="default"
            className="w-[48%]"
            onClick={() => {
              setIsCreateWalletSuccessfull(false)
              setIsSwichingWallet(true)
            }}
          />

          <CustomButton
            label={t('common.close')}
            className="w-[48%]"
            variant="muted"
            onClick={() => {
              setIsCreateWalletSuccessfull(false)
            }}
          />
        </div>
      </div>
    </CustomDrawer>
  )
}

export default CreateWalletSuccessful
