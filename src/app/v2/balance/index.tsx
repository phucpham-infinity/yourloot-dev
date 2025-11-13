import { walletsController } from '@/services/controller'
import { useAuthStore } from '@/store'
import { useEffect, useState } from 'react'
import MyBalanceV2 from './component/MyBalanceV2'
import OldWalletV2 from './component/OldWalletV2'

export default function BalanceV2({ isHome = false }: { isHome?: boolean }) {
  const { userId } = useAuthStore()
  const { useGetUserWallets } = walletsController()
  const { data: walletData, isLoading } = useGetUserWallets(userId || '')
  const [mainWallet, setMainWallet] = useState<any | null>({})
  const [bonusWallet, setBonusWallet] = useState<any | null>({})
  const [yourLootWallet, setYourLootWallet] = useState<number | null>(0)
  const [oldWallet, setOldWallet] = useState<any | null>([])

  // const { level } = useLevelStore()

  const CURRENCY_SIGN: any = {
    BTC: '₿',
    ETH: 'ETH',
    LTC: 'Ł',
    BNB: 'BNB',
    USDT: '₮',
    TRX: 'TRX',
    TON: 'TON',
    USD: '$',
    RUB: '₽',
    EUR: '€',
    GBP: '£',
    AMD: '֏',
    AZN: '₼',
    BYN: 'Br',
    KZT: '₸',
    KGS: 'KGS',
    TJS: 'TJS',
    BBK: 'BBK'
  }

  useEffect(() => {
    walletData?.content?.content.forEach((e) => {
      e.sign = CURRENCY_SIGN[e.currency]
    })

    setMainWallet(
      walletData?.content?.content.filter((e: any) => {
        return e.isDefault
      })[0]
    )

    setYourLootWallet(
      walletData?.content?.content.find((e: any) => e.currency === 'BBK')
        ?.amount ?? 0
    )

    setBonusWallet(
      walletData?.content?.content.filter((e: any) => {
        return e.isBonus
      })[0]
    )

    setOldWallet(
      walletData?.content?.content.filter((e: any) => {
        return !e.isBonus && e.currency !== 'BBK'
      })
    )
  }, [walletData])

  return (
    <div className="w-full">
      {!isHome && (
        <MyBalanceV2
          mainWallet={mainWallet}
          isLoading={isLoading}
          bonusWallet={bonusWallet}
          yourLoot={yourLootWallet}
        />
      )}
      <OldWalletV2
        isHome={isHome}
        mainWallet={mainWallet}
        oldWallets={oldWallet}
        isLoading={isLoading}
      />
    </div>
  )
}
