import { useTranslation } from 'react-i18next'
import EmptyStore from './components/empty'

interface PurchaseHistoryItem {
  id: string
  bonus: string
  date: string
  price: string
}

interface PurchaseHistoryGridProps {
  data: PurchaseHistoryItem[]
}

export default function PurchaseHistoryGrid({
  data
}: PurchaseHistoryGridProps) {
  const { t } = useTranslation()

  return (
    <div className="self-stretch inline-flex flex-col justify-start items-start gap-4">
      <div
        data-bold="false"
        data-icon="false"
        className="h-4 inline-flex justify-center items-center gap-2"
      >
        <div className="justify-center text-white text-base font-semibold leading-normal">
          {t('store.purchaseHistory', 'Purchase History')}
        </div>
      </div>
      {data.length === 0 ? (
        <EmptyStore
          title={t(
            'store.history.empty',
            'You haven’t made any purchases yet.'
          )}
        />
      ) : (
        <div className="self-stretch rounded-[10px] outline outline-[rgba(92,70,123,0.5)] flex flex-col justify-start items-start gap-0.5 overflow-hidden">
          <div className="self-stretch h-8 relative rounded-[10px]">
            <div className="left-[16px] top-[12px] absolute justify-center text-[#9E90CF] text-app-medium-12 font-medium leading-none">
              {t('store.bonus', 'Bonus')}
            </div>
            <div className="left-[667px] top-[12px] absolute justify-center text-[#9E90CF] text-app-medium-12 font-medium leading-none">
              {t('store.date', 'Date')}
            </div>
            <div className="left-[841px] top-[12px] absolute justify-center text-[#9E90CF] text-app-medium-12 font-medium leading-none">
              {t('store.price', 'Price')}
            </div>
          </div>
          {data.map((item) => (
            <div
              key={item.id}
              className="self-stretch h-[42px] relative bg-[#191524]"
            >
              <div className="left-[16px] top-[16px] absolute justify-center text-[#9E90CF] text-app-medium-14 font-medium leading-tight">
                {item.bonus}
              </div>
              <div className="left-[650px] top-[16px] absolute justify-center text-[#9E90CF] text-app-medium-14 font-medium leading-tight">
                {item.date}
              </div>
              <div className="left-[820px] top-[16px] absolute justify-center text-[#9E90CF] text-app-medium-14 font-medium leading-tight">
                {item.price}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
