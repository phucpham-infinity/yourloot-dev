import {
  OrderCryptoResponse,
  OrderResponse
} from '@/services/controller/orders'
import { addSeconds } from 'date-fns'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type DepositMode =
  | 'bank-card'
  | 'cryptocurrency'
  | 'sbp'
  | 'kassa'
  | 'sbp-qr'
export type WalletCurrency = 'USD' | 'EUR' | 'EUB' | 'RUB'

interface DepositStore {
  mode: DepositMode | null
  currency: WalletCurrency | null
  amountBankCard: number
  amountSbp: number
  cardNumber: string
  bankNumber: string
  information: string
  bank: string
  timeExpires: number
  orderBankCard: OrderResponse | null
  orderSbp: OrderResponse | null
  paymentMethod: string
  isSuccess: boolean
  isProcessing: boolean
  bankSbp: string
  cryptocurrencyCoin: string
  cryptocurrencyNetwork: string
  orderCrypto: OrderCryptoResponse | null
  expires: Date | null
  orderKassa: OrderResponse | null
  orderSbpQr: OrderResponse | null

  //action
  setMode: (mode: DepositMode) => any
  setAmountBankCard: (amount: number) => void
  setAmountSbp: (amount: number) => void
  setBank: (bank: string) => void
  setCurrency: (currency: WalletCurrency) => void
  setTimeExpires: (timer: number) => void
  setOrderBankCard: (order: OrderResponse | null) => void
  setOrderSbp: (order: OrderResponse | null) => void
  setPaymentMethod: (paymentMethod: string) => void
  setIsSuccess: (isSuccess: boolean) => void
  setIsProcessing: (isProcessing: boolean) => void
  setBankSbp: (bank: string) => void
  setCryptocurrencyCoin: (coin: string) => void
  setCryptocurrencyNetwork: (network: string) => void
  setBankInfo: (args: {
    cardNumber: string
    bankNumber: string
    information: string
  }) => void
  setOrderCrypto: (order: OrderCryptoResponse | null) => void
  setOrderKassa: (order: OrderResponse | null) => void
  setOrderSbpQr: (order: OrderResponse | null) => void
  clearDeposit: () => void
}

export const useDepositStore = create<DepositStore>()(
  persist(
    (set) => ({
      // State
      mode: null,
      amountBankCard: 0,
      amountSbp: 0,
      cardNumber: '0',
      bankNumber: '0',
      information: '0',
      currency: null,
      bank: '',
      timeExpires: 0,
      orderBankCard: null,
      orderSbp: null,
      paymentMethod: '',
      isSuccess: false,
      isProcessing: false,
      bankSbp: '',
      cryptocurrencyCoin: '',
      cryptocurrencyNetwork: '',
      sbpOrder: null,
      orderCrypto: null,
      expires: null,
      orderKassa: null,
      orderSbpQr: null,

      // Actions
      setMode: (mode) => set({ mode }),
      setAmountBankCard: (amount) => set({ amountBankCard: amount }),
      setAmountSbp: (amount) => set({ amountSbp: amount }),
      setBank: (bank) => set({ bank }),
      setCurrency: (currency) => set({ currency: currency }),
      setTimeExpires: (timerSeconds) => {
        const now = new Date().getTime()
        const expires = addSeconds(now, timerSeconds)
        set({ timeExpires: now + timerSeconds * 1000, expires })
      },
      setOrderBankCard: (order) => set({ orderBankCard: order }),
      setOrderSbp: (order) => set({ orderSbp: order }),
      setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
      setIsSuccess: (isSuccess) => set({ isSuccess }),
      setIsProcessing: (isProcessing) => set({ isProcessing }),
      setBankSbp: (bank) => set({ bankSbp: bank }),
      setBankInfo: (args) =>
        set({
          cardNumber: args.cardNumber,
          bankNumber: args.bankNumber,
          information: args.information
        }),
      setCryptocurrencyCoin: (coin) => set({ cryptocurrencyCoin: coin }),
      setCryptocurrencyNetwork: (network) =>
        set({ cryptocurrencyNetwork: network }),
      setOrderCrypto: (order) => set({ orderCrypto: order }),
      setOrderKassa: (order) => set({ orderKassa: order }),
      setOrderSbpQr: (order) => set({ orderSbpQr: order }),
      clearDeposit: () =>
        set({
          mode: null,
          amountBankCard: 0,
          amountSbp: 0,
          cardNumber: '',
          bankNumber: '',
          information: '',
          currency: null,
          bank: '',
          timeExpires: 0,
          orderBankCard: null,
          orderSbp: null,
          paymentMethod: '',
          isSuccess: false,
          isProcessing: false,
          bankSbp: '',
          orderCrypto: null,
          cryptocurrencyCoin: '',
          cryptocurrencyNetwork: '',
          orderSbpQr: null
        })
    }),
    { name: 'deposit-storage' }
  )
)
