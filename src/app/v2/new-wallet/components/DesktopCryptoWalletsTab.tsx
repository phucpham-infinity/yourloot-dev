import { cn } from '@/lib/utils'
import { WALLETS } from '../common'
import DesktopWalletGrid from './DesktopWalletGrid'
import NetworkSelectionView from './NetworkSelectionView'

interface DesktopCryptoWalletsTabProps {
  userWallets?: any[]
  selected: number
  view: 'list' | 'networks'
  cryptoCurrency: string
  userId: string
  onWalletCreate: (index: number, type: string) => void
  onCreateWallet: (params: {
    userId: string
    currency: string
    network: string
    initialBalance: number
  }) => void
  onBackToList: () => void
}

export default function DesktopCryptoWalletsTab({
  userWallets,
  selected,
  view,
  cryptoCurrency,
  userId,
  onWalletCreate,
  onCreateWallet,
  onBackToList
}: DesktopCryptoWalletsTabProps) {
  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="relative overflow-hidden h-full">
        <div
          className={cn(
            'transition-transform duration-300 ease-out',
            view === 'list' ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <DesktopWalletGrid
            wallets={WALLETS}
            userWallets={userWallets}
            selected={selected}
            onWalletCreate={onWalletCreate}
            walletType="CRYPTO"
            originalWallets={WALLETS}
          />
        </div>
        <NetworkSelectionView
          cryptoCurrency={cryptoCurrency}
          userId={userId}
          onCreateWallet={onCreateWallet}
          onBack={onBackToList}
          isVisible={view === 'networks'}
        />
      </div>
    </div>
  )
}