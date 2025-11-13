import { cn } from '@/lib/utils'

interface WalletCardProps {
  icon: string | React.ReactNode
  label: string
  currency: string
  isSelected: boolean
  onClick: () => void
  className?: string
}

export default function WalletCard({
  icon,
  label,
  currency,
  isSelected,
  onClick,
  className = ''
}: WalletCardProps) {
  return (
    <div
      key={currency}
      className={cn(
        'no-shadow border-[1px] border-[#31293e] rounded-[20px] ',
        className
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          'card-item flex-col items-center justify-start p-3 border-0',
          { active: isSelected }
        )}
      >
        <div data-svg-wrapper className="relative pb-[5px]">
          {typeof icon === 'string' ? (
            <img src={icon} alt="Logo" className="w-[16px]" />
          ) : (
            icon
          )}
        </div>
        <div className="justify-center text-[#c5c0d8] text-[14px] font-medium">
          {label}
        </div>
      </div>
    </div>
  )
}