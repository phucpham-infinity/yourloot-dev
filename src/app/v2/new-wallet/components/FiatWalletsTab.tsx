import { useTranslation } from 'react-i18next'
import { WALLETS_FIAT } from '../common'
import WalletGrid from './WalletGrid'

interface FiatWalletsTabProps {
  userWallets?: any[]
  selected: number
  onWalletCreate: (index: number, type: string) => void
}

export default function FiatWalletsTab({
  userWallets,
  selected,
  onWalletCreate
}: FiatWalletsTabProps) {
  const { t } = useTranslation()

  return (
    <div className="flex-col gap-3 overflow-hidden md:justify-start md:items-start max-lg:items-center max-lg:justify-center">
      <WalletGrid
        wallets={WALLETS_FIAT}
        userWallets={userWallets}
        selected={selected}
        onWalletCreate={onWalletCreate}
        walletType="FIAT"
        title={t('newWallet.selectCurrency', 'Select currency')}
        originalWallets={WALLETS_FIAT}
      />
    </div>
  )
}