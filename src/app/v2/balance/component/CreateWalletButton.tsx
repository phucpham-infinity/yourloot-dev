import Plus from '@/assets/images/achievement/plus.svg'
import CustomButton from '@/components/common/custom-button'
import WalletDialogContent from '@/app/v2/profile/components/WalletDialogContent'
import { useDialogStore } from '@/store'
import { useHomeStoreV2 } from '@/store/slices/v2/home.store'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface CreateWalletButtonProps {
  isHome: boolean
  className?: string
}

export default function CreateWalletButton({ isHome, className = '' }: CreateWalletButtonProps) {
  const { setOpenManageFunds } = useHomeStoreV2()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const dialog = useDialogStore()

  const handleCreateWallet = () => {
    const isDesktop =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(min-width: 1024px)').matches

    if (isDesktop) {
      dialog.open({
        width: 708,
        noBorder: true,
        content: <WalletDialogContent />
      })
    } else {
      if (isHome) {
        setOpenManageFunds(false)
      }
      navigate(`/new-wallet?close-back=${location.pathname}`)
    }
  }

  return (
    <CustomButton
      label={
        <div className="flex items-center justify-center gap-2">
          <div
            data-svg-wrapper
            className="flex items-center justify-center w-4 h-4"
          >
            <img src={Plus} alt="Plus" className="w-3 h-3" />
          </div>
          <span>{t('balance.createNewWallet', 'Create new wallet')}</span>
        </div>
      }
      className={`text-16px text-[#9d90cf] font-medium font-['Satoshi'] p-5 ${className}`}
      variant="default"
      textAlign="center"
      onClick={handleCreateWallet}
    />
  )
}