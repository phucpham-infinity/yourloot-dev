// import { cn } from '@/lib/utils'
import { cssForCard } from '../common'
import WalletCard from './WalletCard'

interface Wallet {
  icon: string | React.ReactNode
  label: string
  currency: string
}

interface WalletGridProps {
  wallets: Wallet[]
  userWallets?: any[]
  selected: number
  onWalletCreate: (index: number, type: string) => void
  walletType: 'CRYPTO' | 'FIAT'
  title: string
  originalWallets: Wallet[]
}

export default function WalletGrid({
  wallets,
  userWallets = [],
  selected,
  onWalletCreate,
  walletType,
  title,
  originalWallets
}: WalletGridProps) {
  // Filter out existing wallets
  const existing = new Set(userWallets?.map((w: any) => w.currency) || [])
  const filtered = wallets.filter((w) => !existing.has(w.currency))

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full align-middle">
        <div className="text-[#c5c0d8] text-sm font-medium text-center">
          All available wallets are already created.
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="text-[16px] font-medium text-white">{title}</div>
      <div className="grid w-full grid-cols-3 gap-2 pt-[16px]" css={cssForCard()}>
        {filtered.map((item) => {
          const { icon, label, currency } = item
          const originalIndex = originalWallets.findIndex(
            (w) => w.currency === currency
          )

          // Handle special layout for FIAT wallets when last row is not full
          // const isLastRow =
          //   index >= filtered.length - (filtered.length % 3 || 3)
          // const remaining = filtered.length % 3
          // const isLastRowNotFull = isLastRow && remaining !== 0
          // let colClass = ''
          // if (walletType === 'FIAT' && isLastRowNotFull && remaining !== 0) {
          //   colClass = 'col-span-3'
          // }

          return (
            <WalletCard
              key={currency}
              icon={icon}
              label={label}
              currency={currency}
              isSelected={selected === originalIndex}
              onClick={() => onWalletCreate(originalIndex, walletType)}
              // className={colClass}
            />
          )
        })}
      </div>
    </>
  )
}
