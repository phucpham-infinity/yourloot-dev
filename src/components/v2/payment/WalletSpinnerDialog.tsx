import Loader from '@/components/common/loader'
import { useTranslation } from 'react-i18next'

interface WalletSpinnerDialogProps {
  isOpen: boolean
  message?: string
}

export default function WalletSpinnerDialog({
  isOpen,
  message
}: WalletSpinnerDialogProps) {
  const { t } = useTranslation()
  const defaultMessage =
    message || t('wallet.makingPrimary', 'Making wallet primary...')
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-[99999]">
      <div className="rounded-[10px] w-96 px-4 py-6 bg-zinc-950 backdrop-blur-lg inline-flex flex-col justify-start items-center">
        <div className="self-stretch pb-8 flex flex-col justify-center items-center gap-4">
          <div className="w-20 h-20 flex items-center justify-center">
            <Loader className="w-10 h-10" size={40} />
          </div>
          <div className="self-stretch text-center justify-center text-white text-sm font-medium font-['Satoshi']">
            {defaultMessage}
          </div>
        </div>
      </div>
    </div>
  )
}
