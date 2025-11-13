import { cn } from '@/lib/utils'
import formatAmount from '@/utils/format-amount'

interface MoneyProps {
  className?: string
  amount: number | string
  label: string
  classNameAmount?: string
  classNameLabel?: string
  icon?: React.ReactNode
}

const Money = ({
  className,
  amount,
  label,
  classNameAmount,
  classNameLabel,
  icon
}: MoneyProps) => {
  return (
    <div
      className={cn(
        'p-10 flex-col justify-start items-start gap-5 flex flex-wrap',
        className
      )}
    >
      <div className="flex gap-2.5 justify-between flex-col">
        <div
          className={cn(
            'text-white text-2xl font-black leading-6 flex gap-2.5 items-center justify-start',
            classNameAmount
          )}
        >
          <div>{icon}</div>
          <div>{formatAmount(amount as number)}</div>
        </div>
        <div
          className={cn(
            'text-[#c5c0d8] text-sm font-medium leading-3.5',
            classNameLabel
          )}
        >
          {label}
        </div>
      </div>
    </div>
  )
}

export default Money
