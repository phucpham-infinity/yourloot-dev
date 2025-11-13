import MyBalance from '@/app/v1/balance/component/MyBalance'
import OldWallet from '@/app/v1/balance/component/OldWallet'
import { walletsController } from '@/services/controller'
import { useAuthStore } from '@/store'
import { useEffect, useState } from 'react'

export default function Balance() {
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

    // setYourLootWallet(level?.experiencePoints ?? 0)
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
        // return !e.isDefault && !e.isBonus && e.currency !== 'BBK'
        // return !e.isDefault && e.currency !== 'BBK'
        return !e.isBonus && e.currency !== 'BBK'
      })
    )
  }, [walletData])

  // useEffect(() => {
  //   setYourLootWallet(level?.experiencePoints ?? 0)
  // }, [level])

  return (
    <div className="w-full">
      <MyBalance
        mainWallet={mainWallet}
        isLoading={isLoading}
        bonusWallet={bonusWallet}
        yourLoot={yourLootWallet}
      />
      <OldWallet
        mainWallet={mainWallet}
        oldWallets={oldWallet}
        isLoading={isLoading}
      />
    </div>
  )
}
