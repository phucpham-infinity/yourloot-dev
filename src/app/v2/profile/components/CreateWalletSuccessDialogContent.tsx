import CheckIcon from '@/assets/images/check-done.svg'
import CloseIcon from '@/assets/images/close.svg'
import CustomButton from '@/components/common/custom-button'
import { useDialogStore, useV2WalletStore } from '@/store'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import SwitchingWalletDialogContent from './SwitchingWalletDialogContent'

export default function CreateWalletSuccessDialogContent() {
  const { t } = useTranslation()
  const dialog = useDialogStore()
  const setIsSwichingWallet = useV2WalletStore((s) => s.setIsSwichingWallet)

  return (
    <div className="w-96 bg-zinc-950 rounded-[10px] border border-[#2b2142] backdrop-blur-lg inline-flex flex-col justify-start items-center overflow-hidden">
      {/* Header */}
      <div className="self-stretch h-12 relative bg-zinc-950 border-b border-[#2b2142] backdrop-blur-[10px] flex items-center justify-center">
        <div className="text-white text-base font-medium">
          {t('wallet.createWallet.title', 'Create Wallet')}
        </div>
        <div className="absolute right-2 top-[10px]">
          <CustomButton
            aria-label="Close"
            variant="invisible"
            height={24}
            onClick={() => dialog.close()}
            label={
              <img src={CloseIcon} alt="" aria-hidden className="w-4 h-4" />
            }
            className="min-w-0 w-6 h-6 p-0 border-0 bg-transparent outline-none shadow-none"
            style={{ padding: 0, borderRadius: 0 }}
          />
        </div>
      </div>

      {/* Body */}
      <div className="self-stretch px-4 py-6 flex flex-col justify-start items-start">
        <div className="self-stretch pb-8 flex flex-col justify-center items-center gap-4">
          <img className="w-20 h-20" src={CheckIcon} alt="success" />
          <div className="self-stretch text-center justify-center text-white text-sm font-medium">
            {t(
              'newWallet.createSuccessMessage',
              'Your wallet was created successfully'
            )}
          </div>
          <div className="self-stretch text-center justify-center text-slate-400 text-xs font-medium">
            {t(
              'newWallet.createSuccessDescription',
              'You can now use it to deposit, withdraw and manage funds.'
            )}
          </div>
        </div>
        <div className="self-stretch inline-flex justify-start items-start gap-2.5">
          <CustomButton
            variant="default"
            className="flex-1"
            label={t('balance.makePrimary', 'Make primary')}
            onClick={() => {
              dialog.close()
              if (isMobile) {
                // Mobile: Use drawer
                setIsSwichingWallet(true)
              } else {
                // Desktop: Use dialog
                dialog.open({
                  width: 384,
                  noBorder: true,
                  content: <SwitchingWalletDialogContent />
                })
              }
            }}
          />
          <CustomButton
            variant="muted"
            className="flex-1"
            label={t('common.close', 'Close')}
            onClick={() => dialog.close()}
          />
        </div>
      </div>
    </div>
  )
}
