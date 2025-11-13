import Loader from '@/components/common/loader'
import { cryptoCurrencyNetwork } from '@/constants'
import { css } from '@/lib/utils.ts'
import { orderController } from '@/services/controller/orders'
import { walletsController } from '@/services/controller/wallets'
import { useAuthStore } from '@/store'
import { useDepositStore } from '@/store/slices/deposit'
import { useWalletStore } from '@/store/slices/wallet'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import CryptocurrencyLayout from './layout.tsx'

const CryptocurrencyNetwork = () => {
  const navigate = useNavigate()
  const { walletName, cryptocurrencyName } = useParams()

  const networks =
    cryptoCurrencyNetwork.find((x) => x.currency === cryptocurrencyName)
      ?.networks ?? []

  const setCryptocurrencyNetwork = useDepositStore(
    (state) => state.setCryptocurrencyNetwork
  )
  const setOrderCrypto = useDepositStore((s) => s.setOrderCrypto)
  const setIsProcessing = useDepositStore((state) => state.setIsProcessing)
  const setMode = useDepositStore((state) => state.setMode)
  const wallets = useWalletStore((state) => state.wallets)
  const setTimeExpires = useDepositStore((state) => state.setTimeExpires)

  const { userId } = useAuthStore()

  const [selectedNetwork, setSelectedNetwork] = useState('Bitcoin')

  const { useCreateOrderCrypto } = orderController()
  const { useCreateWallet } = walletsController()
  const { t } = useTranslation()

  const { mutate: createWallet, isSuccess: isSuccessCreateWallet } =
    useCreateWallet()

  const {
    mutate: createOrderCrypto,
    isPending,
    isSuccess,
    data: orderCryptoData
  } = useCreateOrderCrypto()

  useEffect(() => {
    if (isSuccess && orderCryptoData) {
      setIsProcessing(true)
      setTimeExpires(900)
      setOrderCrypto({
        ...orderCryptoData,
        walletName: walletName,
        cryptocurrencyName: cryptocurrencyName,
        network: selectedNetwork
      })
      setMode('cryptocurrency')
      setCryptocurrencyNetwork(selectedNetwork)
      navigate(
        `/deposit/${walletName}/cryptocurrency/${cryptocurrencyName}/network/${selectedNetwork}/info${location.search}`
      )
    }
  }, [isSuccess, orderCryptoData])

  const handleSelect = (name: string) => {
    const wallet = wallets.find(
      (wallet) => wallet.currency === cryptocurrencyName
    )
    if (wallet) {
      createOrderCrypto({
        currency: cryptocurrencyName ?? '',
        network: name,
        userId: userId!
      })
    } else {
      createWallet({
        currency: cryptocurrencyName ?? '',
        userId: userId!,
        initialBalance: 0
      })
    }
  }

  useEffect(() => {
    if (isSuccessCreateWallet) {
      createOrderCrypto({
        currency: cryptocurrencyName ?? '',
        network: selectedNetwork,
        userId: userId!
      })
    }
  }, [isSuccessCreateWallet])

  return (
    <CryptocurrencyLayout
      title={t('deposit.selectNetwork')}
      description={t('deposit.descriptionNetwork')}
    >
      <div
        css={style}
        className="self-stretch flex-col justify-start items-start gap-5 flex"
      >
        <div className="self-stretch justify-start items-start flex-wrap gap-4 inline-flex">
          {networks.map((x, index) => (
            <div
              onClick={() => {
                setSelectedNetwork(x.network)
                handleSelect(x.network)
              }}
              key={index}
              style={{ minWidth: '105px', maxWidth: '105px' }}
              className="item p-5 rounded-[15px] flex-col justify-start items-start gap-5 inline-flex overflow-hidden"
            >
              {isPending && x.network === selectedNetwork ? (
                <Loader size={20} thin className="" />
              ) : (
                x.icon
              )}
              <div
                style={{ fontSize: '12px' }}
                className="self-stretch text-[#c5c0d8] text-sm font-medium  "
              >
                {x.network}
              </div>
            </div>
          ))}
        </div>
      </div>
    </CryptocurrencyLayout>
  )
}

const style = css`
  /* width: 100%; */
  .item {
    width: 140px;
    border-radius: 15px;
    border: 1px solid #40385a;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.1) 100%
    );
    box-shadow:
      6px 6px 12px 0px rgba(22, 20, 24, 0.5),
      -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
  }
`

export default CryptocurrencyNetwork
