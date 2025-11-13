import dayjs from 'dayjs'

type ItemTransactionProps = {
  status: any // hoặc string nếu tự do
  orderType: string
  createdAt: string // có thể là ISO string hoặc định dạng bạn muốn
  amount: number
  currency: string
}

export const ItemTransaction: React.FC<ItemTransactionProps> = ({
  status,
  orderType,
  createdAt,
  amount,
  currency
}) => {
  return (
    <div className="inline-flex items-center justify-between w-full py-3 border-b md:border-b-0 md:border-t first:md:border-t-0 border-slate-800">
      <div className="w-fit md:w-28 flex justify-start items-center gap-2.5">
        <div className="relative size-4">{status}</div>
        <div className="inline-flex flex-col justify-center items-start gap-2.5">
          <div className="justify-center text-white text-app-medium-14 font-['Satoshi']">
            {(() => {
              const raw = (orderType || '').toString().toLowerCase()
              return raw ? raw.charAt(0).toUpperCase() + raw.slice(1) : ''
            })()}
          </div>
          {/* Mobile date format with time */}
          <div className="justify-center text-[#9E90CF] text-app-medium-14 font-['Satoshi'] md:hidden">
            {dayjs(createdAt).format('HH:mm DD.MM.YYYY')}
          </div>
          {/* Desktop date format per raw.tsx */}
          <div className="justify-center text-[#9E90CF] text-app-medium-14 font-['Satoshi'] hidden md:inline-block">
            {dayjs(createdAt).format('MMM D, YYYY')}
          </div>
        </div>
      </div>
      <div className="w-20 inline-flex flex-col justify-center items-end gap-2.5">
        <div className="justify-center text-white text-app-medium-14 font-['Satoshi']">
          {currency}
        </div>
        <div className="justify-center text-[#9E90CF] text-app-medium-14 font-['Satoshi']">
          {(orderType || '').toLowerCase() === 'deposit' ? '+' : '-'}
          {amount.toFixed ? amount.toFixed(2) : Number(amount).toFixed(2)}
        </div>
      </div>
    </div>
  )
}
export default ItemTransaction
