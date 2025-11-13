import TitleGeneralV2 from '@/app/v2/general/TitleGeneralV2'
import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useToast from '@/hooks/use-toast'
import { walletsController } from '@/services/controller'
import { useAuthStore, useV2WalletStore } from '@/store'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
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
import CryptoWalletsTab from './CryptoWalletsTab'
import FiatWalletsTab from './FiatWalletsTab'

export default function NewWalletMobile({
  hideHeader = false
}: {
  hideHeader?: boolean
}) {
  const navigate = useNavigate()
  const toast = useToast()
  const { t } = useTranslation()

  const { userId } = useAuthStore()
  const [selected, setSelected] = useState<number>(-1)
  const { useCreateWallet } = walletsController()
  const { useGetUserWallets } = walletsController()
  const { data: userWalletsData } = useGetUserWallets(userId || '')

  const setIsCreateWalletSuccessfull = useV2WalletStore(
    (s) => s.setIsCreateWalletSuccessfull
  )
  const setIsOpenSelectNetwork = useV2WalletStore(
    (s) => s.setIsOpenSelectNetwork
  )
  const setWalletId = useV2WalletStore((s) => s.setWalletId)
  const setCurrency = useV2WalletStore((s) => s.setCurrency)

  const {
    mutate: createWallet,
    data: walletData,
    isError: isError
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
      setIsOpenSelectNetwork(true)
    }
  }

  const handleBack = () => {
    navigate(-1)
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
    <div className="h-full">
      {!hideHeader && (
        <div className="w-full flex items-center justify-between mb-[24px]">
          <TitleGeneralV2
            titleClassName="text-[16px] font-black text-white "
            title={t('wallet.createWallet.title')}
            icon={<ArrowLeftIcon className="w-4 h-4" />}
            onClick={handleBack}
          />
        </div>
      )}
      <div className="text-sm font-medium text-white">
        <div className="text-[16px] font-medium text-white">{t('newWallet.selectWalletType', 'Select wallet type')}</div>
        <Tabs defaultValue="crypto" className="w-full h-full !gap-0">
          <TabsList className="w-full h-full gap-2 bg-transparent pb-[24px] pt-[16px] flex flex-row justify-between items-center !px-0">
            <TabsTrigger
              css={cssFn()}
              value="crypto"
              className="flex p-3 flex-col items-start gap-2 flex-[1_0_0] rounded-[10px]  border-app-default data-[state=active]:border-none"
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
              <div className="self-stretch text-[#c5c0d8]   text-start  text-app-medium-14 ">
                {t('depositWithdrawV2.methods.crypto')}
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="fiat"
              className="flex p-3 flex-col items-start gap-2 flex-[1_0_0] rounded-[10px] border-app-default data-[state=active]:border-none"
              css={cssFn()}
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
              <div className="self-stretch text-[#c5c0d8] text-start  text-app-medium-14 ">
                {t('newWallet.fiat', 'Fiat')}
              </div>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="crypto">
            <CryptoWalletsTab
              userWallets={userWalletsData?.content?.content}
              selected={selected}
              onWalletCreate={handleWalletCreate}
            />
          </TabsContent>
          <TabsContent value="fiat">
            <FiatWalletsTab
              userWallets={userWalletsData?.content?.content}
              selected={selected}
              onWalletCreate={handleWalletCreate}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
