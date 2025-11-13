import { CustomDrawer } from '@/components/common/dw-drawer'
import { useProfileStore, useV2DepositStore, useWalletStore } from '@/store'
import { cryptoCurrencyNetworkKey } from '@/constants'
import { useEffect } from 'react'
import { orderController } from '@/services/controller/orders'
import Loader from '@/components/common/loader'
import BackIcon from '@/assets/icons/back'
import { useScreen } from '@/hooks'

const DepositSelectNetwork = () => {
  const { useCreateOrderCrypto } = orderController()
  const { profile } = useProfileStore()
  const { isMobile } = useScreen()

  const isOpenSelectNetwork = useV2DepositStore((s) => s.isOpenSelectNetwork)
  const setIsOpenSelectNetwork = useV2DepositStore(
    (s) => s.setIsOpenSelectNetwork
  )
  const setIsOpenCoinSelect = useV2DepositStore((s) => s.setIsOpenCoinSelect)
  const setPendingNetwork = useV2DepositStore((s) => s.setPendingNetwork)
  const setOrderData = useV2DepositStore((s) => s.setOrderData)
  const setNetwork = useV2DepositStore((s) => s.setNetwork)
  const setStatus = useV2DepositStore((s) => s.setStatus)
  const status = useV2DepositStore((s) => s.status)
  const network = useV2DepositStore((s) => s.network)
  const setMethod = useV2DepositStore((s) => s.setMethod)
  const cryptoCurrency = useV2DepositStore((s) => s.cryptoCurrency)
  const setIsOpenDataInfo = useV2DepositStore((s) => s.setIsOpenDataInfo)
  const networks = cryptoCurrencyNetworkKey[cryptoCurrency ?? '']?.networks
  const setIsOpenCreateCryptoWallet = useV2DepositStore(
    (s) => s.setIsOpenCreateCryptoWallet
  )
  const wallets = useWalletStore((s) => s.wallets)
  const defaultWallet = wallets.find((w) => w.isDefault)
  const clearDeposit = useV2DepositStore((s) => s.clearDeposit)
  const {
    mutate: createOrderCrypto,
    isPending: isPendingCreateOrderCrypto,
    data: orderCryptoData,
    isError: isErrorCreateOrderCrypto
  } = useCreateOrderCrypto()

  useEffect(() => {
    if (isErrorCreateOrderCrypto) {
      clearDeposit()
    }
  }, [isErrorCreateOrderCrypto])

  const handleSelectNetwork = (network: string) => {
    if (!defaultWallet) return
    const wallet = wallets.find((w) => w.currency === cryptoCurrency)
    if (!wallet) {
      setPendingNetwork(network)
      setIsOpenSelectNetwork(false)
      setIsOpenCreateCryptoWallet(true)
    } else {
      setNetwork(network)
      createOrderCrypto({
        currency: cryptoCurrency ?? '',
        network: network,
        userId: profile?.userId!
      })
    }
  }

  useEffect(() => {
    if (orderCryptoData) {
      setStatus('inProgress')
      setMethod('cryptocurrency')
      setOrderData({
        ...orderCryptoData,
        walletName: cryptoCurrency ?? '',
        cryptocurrencyName: cryptoCurrency ?? '',
        network: network ?? '',
        createdAt: new Date().getTime(),
        orderTimeRemainingMinutes: 15,
        walletId: defaultWallet?.id,
        userId: profile?.userId!,
        method: 'cryptocurrency'
      })
      setIsOpenSelectNetwork(false)
      setIsOpenDataInfo(true)
    }
  }, [orderCryptoData])

  useEffect(() => {
    if (isOpenSelectNetwork && network && status === 'idle') {
      createOrderCrypto({
        currency: cryptoCurrency ?? '',
        network: network,
        userId: profile?.userId!
      })
    }
  }, [isOpenSelectNetwork])

  return (
    <CustomDrawer
      title={
        <div className="flex items-center w-full gap-2 justify-center">
          <div className="text-app-medium-16">Select Network</div>
        </div>
      }
      // contentClassName="z-[99]"
      open={isOpenSelectNetwork}
      onOpenChange={(open) => setIsOpenSelectNetwork(open)}
      name="DepositSelectNetwork"
      type="deposit"
    >
      <div className="flex flex-col gap-4 w-full">
        {!isMobile && (
          <div
            className="flex  items-center w-full cursor-pointer"
            onClick={() => {
              setIsOpenSelectNetwork(false)
              setIsOpenCoinSelect(true)
            }}
          >
            <BackIcon />{' '}
            <span className="text-app-medium-12 text-[#9E90CF] mb-1">Back</span>
          </div>
        )}
        <div
          data-name="DepositSelectNetwork"
          className="grid grid-cols-3 gap-4"
        >
          {networks?.map((networkItem) => (
            <div
              key={networkItem.id}
              className="cursor-pointer rounded-2xl p-3 flex flex-col items-start gap-1  border-app-default"
              onClick={() => handleSelectNetwork(networkItem.network)}
            >
              {isPendingCreateOrderCrypto && networkItem.network === network ? (
                <Loader size={20} thin className="" />
              ) : (
                <div className="flex-shrink-0">{networkItem.icon}</div>
              )}
              <div className="text-app-medium-14 text-white text-left whitespace-nowrap">
                {networkItem.network}
              </div>
            </div>
          ))}
        </div>
      </div>
    </CustomDrawer>
  )
}

export default DepositSelectNetwork
