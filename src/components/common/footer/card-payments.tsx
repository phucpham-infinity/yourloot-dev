import { cn } from '@/lib/utils'

interface CardPaymentsProps {
  className?: string
}

function CardPayments({ className }: CardPaymentsProps) {
  return (
    <div
      className={cn(
        'flex h-[24px] items-center justify-center gap-[10px] rounded-[30px] px-[12px] py-[7px]',
        '!bg-[#0B0A11] !text-[#9E90CF] text-app-medium-12',
        className
      )}
    >
      Card Payments
    </div>
  )
}

export default CardPayments
