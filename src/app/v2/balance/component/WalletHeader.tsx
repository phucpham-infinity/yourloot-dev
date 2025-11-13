import { useTranslation } from 'react-i18next'

interface WalletHeaderProps {
  isHome: boolean
  className?: string
}

export default function WalletHeader({ isHome, className = '' }: WalletHeaderProps) {
  const { t } = useTranslation()

  if (isHome) return null

  return (
    <div className={`inline-flex items-center justify-between pt-3 mx-auto ${className}`}>
      <div className="flex items-center justify-start gap-1">
        <div className="text-white text-v2-app-medium-16 font-['Satoshi'] pb-5">
          {t('balance.oldWallets.title', 'Available Wallets')}
        </div>
      </div>
    </div>
  )
}