import StoreHeader from './StoreHeader'
import StoreCard from './StoreCard'
import PurchaseHistoryGrid from './PurchaseHistoryGrid'
import { useTranslation } from 'react-i18next'
import EmptyStore from './components/empty'
import GodofFortune from '/public/images/v2/store/GodofFortune.png'

const sampleStoreItems = [
  {
    id: '1',
    title: '25 Free Spins',
    image: GodofFortune,
    tags: [
      { label: 'Unlimited', bgColor: 'bg-violet-500/20', icon: 'clock' },
      { label: 'Unlocks at Level 4', bgColor: 'bg-slate-500', icon: 'history' }
    ],
    coinPrice: 5,
    cashPrice: '₽ 550',
    currency: 'RUB',
    isLocked: true,
    isNew: false,
    description: 'Available only for certain games',
    hasTimer: true
  },
  {
    id: '2',
    title: '50 Free Spins',
    image: GodofFortune,
    tags: [
      { label: 'Limited Time', bgColor: 'bg-orange-500/20', icon: 'clock' },
      { label: 'Premium', bgColor: 'bg-gold-500/20', icon: 'history' }
    ],
    coinPrice: 10,
    cashPrice: '₽ 1100',
    currency: 'RUB',
    isLocked: false,
    isNew: true,
    description: 'Available only for certain games',
    hasTimer: false
  },
  {
    id: '3',
    title: '100 Free Spins',
    image: GodofFortune,
    tags: [
      { label: 'Mega Deal', bgColor: 'bg-red-500/20', icon: 'history' },
      { label: 'VIP Only', bgColor: 'bg-purple-500/20', icon: 'clock' }
    ],
    coinPrice: 20,
    cashPrice: '₽ 2200',
    currency: 'RUB',
    isLocked: false,
    isNew: true,
    description: 'Available only for certain games',
    hasTimer: true
  }
]

const samplePurchaseHistory = [
  { id: '1', bonus: '25 Free Spins', date: '24.09.25', price: '5 YL Coins' },
  { id: '2', bonus: '50 Free Spins', date: '23.09.25', price: '10 YL Coins' },
  { id: '3', bonus: '25 Free Spins', date: '22.09.25', price: '5 YL Coins' }
]

export default function StoreV2() {
  const { t } = useTranslation()
  return (
    <div className="self-stretch flex flex-col w-full md:max-w-[908px] md:mx-auto gap-6">
      <StoreHeader />

      {sampleStoreItems.length === 0 ? (
        <EmptyStore title={t('store.empty', 'No bonuses available yet.')} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleStoreItems.map((item) => (
            <StoreCard key={item.id} data={item} />
          ))}
        </div>
      )}

      <PurchaseHistoryGrid data={samplePurchaseHistory} />
    </div>
  )
}
