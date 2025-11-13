import YLIcon from '@/assets/icons/v2/YLIcon'
import { useWalletStore } from '@/store'
import formatAmount from '@/utils/format-amount'
import { useMemo } from 'react'

export default function YLCoins() {
  const { wallets } = useWalletStore()

  const ylCoinsAmount = useMemo(() => {
    return wallets.find((x) => x.currency === 'BBK')?.amount ?? 0
  }, [wallets])

  return (
    <div className="w-fit h-[40px] py-[6px] pl-[8px] pr-[12px] bg-transparent rounded-[10px] flex flex-row gap-2 items-center justify-start border-app-default">
      <div className="w-4 h-4">
        <YLIcon />
      </div>
      <div className="flex flex-col items-start justify-center gap-1">
        {/* <div className="leading-none text-app-brand-light text-app-bold-10">
          {t('common.ylCoins', 'YL Coins')}
        </div> */}
        <div className="leading-none text-app-white text-app-medium-14">
          {formatAmount(ylCoinsAmount || 0)}
        </div>
      </div>
    </div>
  )
}
