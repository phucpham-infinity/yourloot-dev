import CheckIcon from '@/assets/icons/checkmark'
import CloseMarkIcon from '@/assets/icons/close-mark'
import { Skeleton } from '@/components/ui/skeleton'
import { format } from 'date-fns'

interface HistoryItemProps {
  order?: {
    id: string
    status: string
    orderType: string
    createdAt: string
    paymentSystem: string
    amount: number
  }
  isLoading?: boolean
}

const HistoryItem = ({ order, isLoading = false }: HistoryItemProps) => {
  if (isLoading) {
    return (
      <div
        style={{
          borderBottom: '1px solid #2A2242'
        }}
        className="flex items-center justify-between gap-[10px] text-app-medium-14 px-3 py-2 opacity-50"
      >
        <Skeleton className="w-4 h-4 rounded-full bg-gray-50" />
        <div className="flex flex-1 items-center justify-between">
          <div className="flex flex-col gap-2">
            <Skeleton className="w-16 h-4 bg-gray-50" />
            <Skeleton className="w-20 h-3 bg-gray-50" />
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Skeleton className="w-12 h-4 bg-gray-50" />
            <Skeleton className="w-16 h-3 bg-gray-50" />
          </div>
        </div>
      </div>
    )
  }

  if (!order) return null

  return (
    <div
      style={{
        borderBottom: '1px solid #2A2242'
      }}
      className="flex items-center justify-between gap-[10px] text-app-medium-14 px-3 py-2"
    >
      <div>
        {order.status === 'Succeed' ? (
          <CheckIcon className="w-4 h-4" />
        ) : (
          <CloseMarkIcon className="w-4 h-4" />
        )}
      </div>
      <div className="flex flex-1 items-center justify-between">
        <div>
          <div>{order.orderType === 'DEPOSIT' ? 'Deposit' : 'Withdraw'}</div>
          <div className="!text-[#C5C0D8]">
            {format(order.createdAt, 'MMM d, yyyy')}
          </div>
        </div>
        <div>
          <div className="text-right">{order.paymentSystem}</div>
          <div className="!text-[#C5C0D8] text-right">
            {order.orderType === 'DEPOSIT' ? '+ ' : '- '}
            {Number(order.amount)?.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryItem
