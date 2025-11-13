import { cn } from '@/lib/utils'
import { cssForCard } from '../common'
import { useRef } from 'react'

interface Wallet {
  icon: string | React.ReactNode
  label: string
  currency: string
}

interface TextWithSlideOnOverflowProps {
  text: string
  className?: string
}

function TextWithSlideOnOverflow({ text, className = '' }: TextWithSlideOnOverflowProps) {
    const textRef = useRef<HTMLDivElement>(null)
    const px = text.length > 8 ? 60 + (text.length - 8) * 10 : 0
    return (
        <div className={cn('relative overflow-hidden', className)}>
            <div
                ref={textRef}
                className={cn(
                    'whitespace-nowrap transition-transform duration-1000 ease-in-out',
                    `group-hover:translate-x-[calc(100%-${px}px)]`
                )}
            >
                {text}
            </div>
        </div>
    )
}

interface DesktopWalletGridProps {
  wallets: Wallet[]
  userWallets?: any[]
  selected: number
  onWalletCreate: (index: number, type: string) => void
  walletType: 'CRYPTO' | 'FIAT'
  originalWallets: Wallet[]
}

export default function DesktopWalletGrid({
  wallets,
  userWallets = [],
  selected,
  onWalletCreate,
  walletType,
  originalWallets
}: DesktopWalletGridProps) {
  // Filter out existing wallets
  const existing = new Set(
    userWallets?.map((w: any) => w.currency) || []
  )
  const filtered = wallets.filter(
    (w) => !existing.has(w.currency)
  )

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
    <div
      className="grid w-full grid-cols-3 gap-2 pt-4 no-shadow overflow-auto"
      css={cssForCard()}
    >
      {filtered.map((item) => {
        const { icon, label, currency } = item
        const originalIndex = originalWallets.findIndex(
          (w) => w.currency === currency
        )

        return (
          <div
            key={currency}
            className={cn(
              'group max-h-[78px] card-item flex flex-col items-start justify-start rounded-[10px] border-1 p-4 gap-[12px]',
              { active: selected === originalIndex }
            )}
            onClick={() => onWalletCreate(originalIndex, walletType)}
          >
            <div data-svg-wrapper className="relative">
              {typeof icon === 'string' ? (
                <img
                  src={icon}
                  alt="Logo"
                  className="w-4 h-4 mx-auto"
                />
              ) : (
                <div>
                  {icon}
                </div>
              )}
            </div>
            <TextWithSlideOnOverflow 
              text={label}
              className="text-left justify-start text-[#c5c0d8] text-[14px] font-medium"
            />
          </div>
        )
      })}
    </div>
  )
}