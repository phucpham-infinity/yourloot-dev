import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useToast from '@/hooks/use-toast'
import { walletsController } from '@/services/controller'
import { useAuthStore, useV2WalletStore } from '@/store'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  BitCoinIcon,
  CoinTotal,
  cssFn,
  EUROICon,
  FiatTotal,
  USDICon,
  USDTICon,
  WALLETS,
  WALLETS_FIAT
} from '../common'
import DesktopCryptoWalletsTab from './DesktopCryptoWalletsTab'
import DesktopFiatWalletsTab from './DesktopFiatWalletsTab'

export default function NewWalletDesktop() {
  const toast = useToast()
  const { t } = useTranslation()

  const { userId } = useAuthStore()
  const [selected, setSelected] = useState<number>(-1)
  const [view, setView] = useState<'list' | 'networks'>('list')
  const { useCreateWallet } = walletsController()
  const { useGetUserWallets } = walletsController()
  const { data: userWalletsData } = useGetUserWallets(userId || '')

  const setIsCreateWalletSuccessfull = useV2WalletStore(
    (s) => s.setIsCreateWalletSuccessfull
  )
  const setWalletId = useV2WalletStore((s) => s.setWalletId)
  const setCurrency = useV2WalletStore((s) => s.setCurrency)
  const cryptoCurrency = useV2WalletStore((s) => s.currency)

  const {
    mutate: createWallet,
    data: walletData,
    isError: isError,
    isPending: isPendingCreate
  } = useCreateWallet()

  const handleWalletCreate = (selectedPage: number, typeWallet: string) => {
    let currencyWallet = ''
    if (typeWallet === 'FIAT') {
      setSelected(selectedPage)
      const { currency } = WALLETS_FIAT[selectedPage]
      currencyWallet = currency
      setCurrency(currency)
      createWallet({
        userId: userId || '',
        currency: currencyWallet,
        initialBalance: 0
      })
    } else {
      setSelected(selectedPage)
      const { currency } = WALLETS[selectedPage]
      currencyWallet = currency
      setCurrency(currency)
      setView('networks')
    }
  }

  useEffect(() => {
    if (walletData) {
      setWalletId(walletData?.content?.id || '')
      setIsCreateWalletSuccessfull(true)
    }
  }, [walletData])

  useEffect(() => {
    if (isError) {
      toast.error(
        t('faq.sections.newWallet.createWalletError', 'Create wallet error'),
        {
          position: 'top-right'
        }
      )
    }
  }, [isError])

    return (
    <div className="relative text-sm font-medium text-white h-full">
      <Tabs
        defaultValue="crypto"
        onValueChange={() => setView('list')}
        className="grid w-full h-full grid-cols-12 gap-0"
      >
        <TabsList className="flex flex-row w-full col-span-6 gap-2 pt-16 pl-6 pr-6 bg-transparent">
          <TabsTrigger
            css={cssFn()}
            value="crypto"
            className="flex p-4 flex-col items-start gap-[16px] w-1/2 rounded-[10px] border-app-default data-[state=active]:border-none"
          >
            <div className="flex items-start gap-[2px]">
              <BitCoinIcon className="w-4 h-4" />
              <USDTICon className="w-4 h-4" />
              <img
                src={CoinTotal}
                alt="CoinTotal"
                className="object-cover w-4 h-4"
              />
            </div>
            <div className="self-stretch text-[#c5c0d8] text-start text-app-medium-14 ">
              {t('depositWithdrawV2.methods.crypto')}
            </div>
          </TabsTrigger>
          <TabsTrigger
            css={cssFn()}
            value="fiat"
            className="flex p-4 flex-col items-start gap-[16px] w-1/2 rounded-[10px] border-app-default data-[state=active]:border-none"
          >
            <div className="flex items-start gap-[2px]">
              <USDICon />
              <EUROICon />
              <img
                src={FiatTotal}
                alt="FiatTotal"
                className="object-cover w-4 h-4"
              />
            </div>
            <div className="self-stretch text-[#c5c0d8] text-start text-app-medium-14 ">
              {t('newWallet.fiat', 'Fiat')}
            </div>
          </TabsTrigger>
        </TabsList>

        <div className="col-span-6 bg-[radial-gradient(ellipse_116.82%_237.29%_at_60.95%_-22.92%,_#362C5A_0%,_#181526_100%)] self-stretch p-6 pt-1 max-h-[420px] overflow-y-auto min-h-[100px]">
          <TabsContent value="crypto" className={"h-full"}>
            <DesktopCryptoWalletsTab
              userWallets={userWalletsData?.content?.content}
              selected={selected}
              view={view}
                // @ts-ignore
              cryptoCurrency={cryptoCurrency}
              userId={userId || ''}
              onWalletCreate={handleWalletCreate}
              onCreateWallet={createWallet}
              onBackToList={() => setView('list')}
            />
          </TabsContent>
          <TabsContent value="fiat" className={"h-full"}>
            <DesktopFiatWalletsTab
              userWallets={userWalletsData?.content?.content}
              selected={selected}
              onWalletCreate={handleWalletCreate}
            />
          </TabsContent>
        </div>
      </Tabs>
      {isPendingCreate && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
      )}
    </div>
  )
}
