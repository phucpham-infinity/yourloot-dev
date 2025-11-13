import { useTranslation } from 'react-i18next'
import { WALLETS } from '../common'
import WalletGrid from './WalletGrid'

interface CryptoWalletsTabProps {
  userWallets?: any[]
  selected: number
  onWalletCreate: (index: number, type: string) => void
}

export default function CryptoWalletsTab({
  userWallets,
  selected,
  onWalletCreate
}: CryptoWalletsTabProps) {
  const { t } = useTranslation()

  return (
    <div className="flex-col gap-3 overflow-hidden md:justify-start md:items-start max-lg:items-center max-lg:justify-center">
      <WalletGrid
        wallets={WALLETS}
        userWallets={userWallets}
        selected={selected}
        onWalletCreate={onWalletCreate}
        walletType="CRYPTO"
        title={t('newWallet.selectCurrency', 'Select currency')}
        originalWallets={WALLETS}
      />
    </div>
  )
}