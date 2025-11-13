import { useEffect, useState } from 'react'
import { orderController } from '@/services/controller/orders'
import { useProfileStore, useV2DepositStore, useWalletStore } from '@/store'
import { getFingerprint } from '@/lib/fingerprint'

interface CreateOrderParams {
  method: string
  amount: number
  bankCode?: string
  paymentSystem?: string
}

interface UseCreateOrderReturn {
  createOrder: (params: CreateOrderParams) => void
  isLoading: boolean
  orderData: any
  error: any
  isError: boolean
  isSuccess: boolean
}

export const useCreateOrderBank = (): UseCreateOrderReturn => {
  const { profile, ip } = useProfileStore()
  const [fingerprint, setFingerprint] = useState<string | null>(null)

  const method = useV2DepositStore((s) => s.method)

  const setAmount = useV2DepositStore((s) => s.setAmount)
  const setStatus = useV2DepositStore((s) => s.setStatus)
  const setMethod = useV2DepositStore((s) => s.setMethod)
  const setOrderData = useV2DepositStore((s) => s.setOrderData)
  const setIsOpenInputInfo = useV2DepositStore((s) => s.setIsOpenInputInfo)
  const setIsOpenDataInfo = useV2DepositStore((s) => s.setIsOpenDataInfo)
  const setIsOpenDepositFailed = useV2DepositStore(
    (s) => s.setIsOpenDepositFailed
  )
  const rateLimitStartedAt = useV2DepositStore((s) => s.rateLimitStartedAt)
  const setIsRateLimitError = useV2DepositStore((s) => s.setIsRateLimitError)
  const setRateLimitStartedAt = useV2DepositStore(
    (s) => s.setRateLimitStartedAt
  )
  const clearDeposit = useV2DepositStore((s) => s.clearDeposit)

  const defaultWallet = useWalletStore((s) =>
    s.wallets?.find((w) => w.isDefault)
  )
  const defaultWalletCurrency = defaultWallet?.currency

  // bank-card
  const {
    mutate: createOrderBankCard,
    isPending: isCreatingOrderBankCard,
    data: orderDataBankCard,
    isError: isErrorBankCard,
    error: errorBankCard
  } = orderController().useCreateCardOrder()

  // sbp
  const {
    mutateAsync: createOrderSbp,
    isPending: isCreatingOrderSbp,
    data: orderDataSbp,
    isError: isErrorSbp,
    isSuccess: isSuccessSbp
  } = orderController().useCreateSbpOrder()

  // sbp-sber
  const {
    mutate: createOrderSbpSber,
    isPending: isCreatingOrderSbpSber,
    data: orderDataSbpSber,
    isError: isErrorSbpSber,
    error: errorSbpSber
  } = orderController().useCreateSbpSberOrder()

  // nspk
  const {
    mutate: createOrderNSPK,
    isPending: isCreatingOrderNSPK,
    data: orderDataNSPK,
    isError: isErrorNSPK,
    error: errorNSPK
  } = orderController().useCreateNSPKOrder()

  // redirect-pay
  const {
    mutate: createOrderRedirectPay,
    isPending: isCreatingOrderRedirectPay,
    data: orderDataRedirectPay,
    isError: isErrorRedirectPay,
    error: errorRedirectPay
  } = orderController().useCreateRedirectPayOrder()

  // fps-alfa - ozon
  const {
    mutate: createOrderB2b,
    isPending: isCreatingOrderB2b,
    data: orderDataB2b,
    isError: isErrorB2b,
    isSuccess: isSuccessB2b,
    error: errorB2b
  } = orderController().useCreateOrderB2b()

  useEffect(() => {
    getFingerprint().then(setFingerprint)
  }, [])

  const handleSbpFailed = (amount: number) => {
    setMethod('fps-qr')
    createOrderRedirectPay({
      userId: profile?.userId!,
      currency: defaultWalletCurrency ?? '',
      userIp: ip ?? '',
      amount: Number(amount),
      paymentSystem: 'QRPAY',
      extra: {
        userAgent: navigator.userAgent,
        fingerprint,
        registeredAt: new Date().getTime()
      }
    })
  }

  const createOrder = async ({ method, amount }: CreateOrderParams) => {
    setAmount(amount)

    const baseParams = {
      userId: profile?.userId!,
      currency: defaultWalletCurrency ?? '',
      userIp: ip ?? '',
      amount: Number(amount),
      extra: {
        userAgent: navigator.userAgent,
        fingerprint,
        registeredAt: new Date().getTime()
      }
    }

    if (['bank-card', 'fps-abkhazia', 'uzcard', 'humo'].includes(method)) {
      createOrderBankCard({
        ...baseParams,
        paymentSystem:
          method === 'uzcard' ? 'UZCARD' : method === 'humo' ? 'HUMO' : 'CARD'
      })
    }

    if (method === 'fps') {
      try {
        await createOrderSbp(baseParams)
      } catch (error) {
        console.log('error', error)
        handleSbpFailed(amount || 0)
      }
    }

    if (method === 'fps-cis') {
      try {
        await createOrderSbp(baseParams)
      } catch (error) {
        console.log('error', error)
        handleSbpFailed(amount || 0)
      }
    }

    if (method === 'fps-sber') {
      createOrderSbpSber(baseParams)
    }

    if (method === 't-pay') {
      createOrderRedirectPay({
        ...baseParams,
        paymentSystem: 'TPAY'
      })
    }

    if (method === 'sber-pay') {
      createOrderRedirectPay({
        ...baseParams,
        paymentSystem: 'SBERPAY'
      })
    }

    if (method === 'yukassa') {
      createOrderNSPK({
        ...baseParams,
        paymentSystem: 'YUKASSA'
      })
    }

    if (method === 'sbp-fast') {
      createOrderRedirectPay({
        ...baseParams,
        paymentSystem: 'SBPFAST'
      })
    }

    if (method === '1-click-pay') {
      createOrderRedirectPay({
        ...baseParams,
        paymentSystem: 'ONECLICK'
      })
    }

    if (method === 'mobile') {
      createOrderRedirectPay({
        ...baseParams,
        paymentSystem: 'MOBILEPAYMENT'
      })
    }

    if (method === 'fps-alfa') {
      createOrderB2b({
        ...baseParams,
        paymentSystem: 'ALFA'
      })
    }

    if (method === 'ozon') {
      createOrderB2b({
        ...baseParams,
        paymentSystem: 'OZON'
      })
    }
  }

  useEffect(() => {
    if (
      isErrorBankCard ||
      isErrorSbpSber ||
      isErrorRedirectPay ||
      isErrorNSPK ||
      isErrorB2b
    ) {
      clearDeposit()
      const error: any =
        errorBankCard || errorRedirectPay || errorNSPK || errorB2b
      if (
        error?.content?.message?.includes(
          'limit of 3 deposit attempts within the past 30 minutes.'
        ) ||
        error?.message?.includes(
          'limit of 3 deposit attempts within the past 30 minutes.'
        )
      ) {
        setIsRateLimitError(true)
        if (!rateLimitStartedAt) setRateLimitStartedAt(new Date().getTime())
      } else {
        setIsOpenDepositFailed(true)
      }
    }
  }, [
    isErrorBankCard,
    isErrorSbpSber,
    isErrorRedirectPay,
    isErrorNSPK,
    isErrorB2b
  ])

  useEffect(() => {
    if (
      orderDataBankCard ||
      orderDataSbpSber ||
      orderDataRedirectPay ||
      orderDataNSPK
    ) {
      setStatus('inProgress')
      setOrderData({
        ...(orderDataBankCard ||
          orderDataSbpSber ||
          orderDataRedirectPay ||
          orderDataNSPK),
        method: method || '',
        currency: defaultWalletCurrency,
        createdAt: new Date().getTime(),
        orderTimeRemainingMinutes: 15,
        walletId: defaultWallet?.id,
        userId: profile?.userId!
      })
      setIsOpenInputInfo(false)
      setIsOpenDataInfo(true)
    }
  }, [orderDataBankCard, orderDataSbpSber, orderDataRedirectPay, orderDataNSPK])

  useEffect(() => {
    if (orderDataSbp && isSuccessSbp) {
      if (orderDataSbp.success) {
        setStatus('inProgress')
        setMethod('fps')
        setOrderData({
          ...orderDataSbp,
          method: 'fps',
          currency: defaultWalletCurrency,
          createdAt: new Date().getTime(),
          orderTimeRemainingMinutes: 15,
          walletId: defaultWallet?.id,
          userId: profile?.userId!
        })
        setIsOpenInputInfo(false)
        setIsOpenDataInfo(true)
      } else {
        handleSbpFailed(orderDataSbp.amount || 0)
      }
    }
  }, [orderDataSbp, isSuccessSbp])

  useEffect(() => {
    if (orderDataB2b && isSuccessB2b) {
      if (orderDataB2b.success) {
        setStatus('inProgress')
        setOrderData({
          ...orderDataB2b,
          method: method || '',
          currency: defaultWalletCurrency,
          createdAt: new Date().getTime(),
          orderTimeRemainingMinutes: 15,
          walletId: defaultWallet?.id,
          userId: profile?.userId!
        })
        setIsOpenInputInfo(false)
        setIsOpenDataInfo(true)
      } else {
        handleSbpFailed(orderDataB2b.amount || 0)
      }
    }
  }, [orderDataB2b, isSuccessB2b])

  const isLoading =
    isCreatingOrderBankCard ||
    isCreatingOrderSbp ||
    isCreatingOrderSbpSber ||
    isCreatingOrderRedirectPay ||
    isCreatingOrderNSPK ||
    isCreatingOrderB2b

  const orderData =
    orderDataBankCard ||
    orderDataSbp ||
    orderDataSbpSber ||
    orderDataRedirectPay ||
    orderDataNSPK ||
    orderDataB2b

  const isError =
    isErrorBankCard ||
    isErrorSbp ||
    isErrorSbpSber ||
    isErrorRedirectPay ||
    isErrorNSPK ||
    isErrorB2b

  const error =
    errorBankCard || errorSbpSber || errorRedirectPay || errorNSPK || errorB2b

  const isSuccess = isSuccessSbp || isSuccessB2b || !!orderData

  return {
    createOrder,
    isLoading,
    orderData,
    isError,
    error,
    isSuccess
  }
}
