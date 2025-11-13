import { useTranslation } from 'react-i18next'
import CloseIcon from '@/assets/images/close.svg'
import CustomButton from '@/components/common/custom-button'
import { useDialogStore } from '@/store'
import NewWalletLayoutV2 from '@/app/v2/new-wallet'

export default function WalletDialogContent() {
  const { t } = useTranslation()
  const dialog = useDialogStore()

  return (
    <div className="w-[708px] h-auto min-h-[416px] bg-zinc-950 rounded-[10px] border border-[#2b2142] backdrop-blur-lg inline-flex flex-col justify-start items-stretch overflow-hidden">
      {/* Header */}
      <div className="h-12 relative bg-zinc-950 border-b border-[#2b2142] backdrop-blur-[10px] flex items-center justify-center">
        <div className="text-white text-base font-medium">{t('wallet.createWallet.title')}</div>
        <div className="absolute right-2 top-[10px]">
          <CustomButton
            aria-label="Close"
            variant="invisible"
            height={24}
            onClick={() => dialog.close()}
            textAlign="center"
            label={
              <div className="w-full h-full flex items-center justify-center">
                <img src={CloseIcon} alt="" aria-hidden className="w-4 h-4" />
              </div>
            }
            className="min-w-0 w-6 h-6 p-0 border-0 bg-transparent outline-none shadow-none"
            style={{ padding: 0, borderRadius: 0 }}
          />
        </div>
      </div>

      {/* Body: Use the existing NewWalletLayoutV2 UI without header */}
      <div className="h-full">
        <NewWalletLayoutV2 hideHeader twoColumns />
      </div>
    </div>
  )
}
