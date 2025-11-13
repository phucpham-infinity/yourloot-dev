import { orderController } from '@/services/controller/orders'
import { useProfileStore } from '@/store/slices/profile'
import { useV2DepositStore } from '@/store/slices/v2/deposit.store'
import { useWalletStore } from '@/store/slices/wallet'
import { useEffect } from 'react'
import useToast from '@/hooks/use-toast'
import { useTranslation } from 'react-i18next'

export const useCreateOrderCrypto = () => {
  const toast = useToast()
  const { t } = useTranslation()
  const { useCreateOrderCrypto: useCreateOrderCrypto2 } = orderController()

  const {
    mutate,
    isPending: isPendingCreateOrderCrypto,
    data: orderCryptoData,
    isError: isErrorCreateOrderCrypto
  } = useCreateOrderCrypto2()

  const cryptoCurrency = useV2DepositStore((s) => s.cryptoCurrency)
  const network = useV2DepositStore((s) => s.network)
  const profile = useProfileStore((s) => s.profile)
  const defaultWallet = useWalletStore((s) =>
    s.wallets?.find((w) => w.isDefault)
  )

  const setStatus = useV2DepositStore((s) => s.setStatus)
  const setMethod = useV2DepositStore((s) => s.setMethod)
  const setOrderData = useV2DepositStore((s) => s.setOrderData)
  const setIsOpenDataInfo = useV2DepositStore((s) => s.setIsOpenDataInfo)
  const clearDeposit = useV2DepositStore((s) => s.clearDeposit)

  const handleCreateOrderCrypto = (props?: any) => {
    mutate({
      currency: props?.cryptoCurrency || cryptoCurrency || '',
      network: props?.network || network || '',
      userId: profile?.userId!
    })
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
      setIsOpenDataInfo(true)
    }
  }, [orderCryptoData])

  useEffect(() => {
    if (isErrorCreateOrderCrypto) {
      toast.error(
        t('deposit.processAlert.failedToast', {
          defaultValue: 'Deposit failed, please try again or contact support.'
        })
      )
      clearDeposit()
    }
  }, [isErrorCreateOrderCrypto])

  return {
    createOrderCrypto: handleCreateOrderCrypto,
    isPendingCreateOrderCrypto,
    orderCryptoData,
    isErrorCreateOrderCrypto
  }
}
