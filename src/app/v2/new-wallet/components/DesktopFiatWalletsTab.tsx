import { WALLETS_FIAT } from '../common'
import DesktopWalletGrid from './DesktopWalletGrid'

interface DesktopFiatWalletsTabProps {
  userWallets?: any[]
  selected: number
  onWalletCreate: (index: number, type: string) => void
}

export default function DesktopFiatWalletsTab({
  userWallets,
  selected,
  onWalletCreate
}: DesktopFiatWalletsTabProps) {
  return (
    <div className="flex flex-col gap-3 overflow-hidden h-full">
      <DesktopWalletGrid
        wallets={WALLETS_FIAT}
        userWallets={userWallets}
        selected={selected}
        onWalletCreate={onWalletCreate}
        walletType="FIAT"
        originalWallets={WALLETS_FIAT}
      />
    </div>
  )
}