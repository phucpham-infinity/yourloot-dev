import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WithdrawStore {
  mode: 'sbp' | 'cryptocurrency' | null
  inProgress: boolean
  isSuccess: boolean
  bankAmount: number
  bankNumber: string
  bankCode: string

  cryptocurrencyAmount: number
  cryptocurrencyAddress: string
  cryptocurrencyCurrency: string
  cryptocurrencyCoin: string
  cryptoWithdrawOrder: any

  sbpAmount: number
  sbpBankId: string
  sbpBankNumber: string
  sbpBankCode: string
  sbpOrder: any
  currentWalletAmount: number

  setMode: (mode: 'sbp' | 'cryptocurrency' | null) => void
  setInProgress: (inProgress: boolean) => void
  setBankAmount: (bankAmount: number) => void
  setIsSuccess: (isSuccess: boolean) => void
  setBankNumber: (bankNumber: string) => void
  setBankCode: (bankCode: string) => void
  setSbpAmount: (sbpAmount: number) => void
  setSbpBankId: (sbpBankId: string) => void
  setSbpBankNumber: (sbpBankNumber: string) => void
  setSbpBankCode: (sbpBankCode: string) => void
  setSbpOrder: (sbpOrder: any) => void
  setCurrentWalletAmount: (currentWalletAmount: number) => void
  setCryptocurrencyAmount: (cryptocurrencyAmount: number) => void
  setCryptocurrencyAddress: (cryptocurrencyAddress: string) => void
  setCryptocurrencyCurrency: (cryptocurrencyCurrency: string) => void
  setCryptocurrencyCoin: (cryptocurrencyCoin: string) => void
  setCryptoWithdrawOrder: (cryptoWithdrawOrder: any) => void
  clearWithdraw: () => void
}

export const useWithdrawStore = create<WithdrawStore>()(
  persist(
    (set) => ({
      // State
      mode: null,
      inProgress: false,
      isSuccess: false,
      bankAmount: 0,
      bankNumber: '',
      bankCode: '',
      sbpAmount: 0,
      sbpBankId: '',
      sbpBankNumber: '',
      sbpBankCode: '',
      cryptocurrencyAmount: 0,
      cryptocurrencyAddress: '',
      cryptocurrencyCurrency: '',
      cryptocurrencyCoin: '',
      sbpOrder: null,
      currentWalletAmount: 0,
      cryptoWithdrawOrder: null,
      // Actions
      setMode: (mode) => set({ mode }),
      setInProgress: (inProgress) => set({ inProgress }),
      setBankAmount: (bankAmount) => set({ bankAmount }),
      setBankNumber: (bankNumber) => set({ bankNumber }),
      setBankCode: (bankCode) => set({ bankCode }),
      setSbpAmount: (sbpAmount) => set({ sbpAmount }),
      setSbpBankId: (sbpBankId) => set({ sbpBankId }),
      setSbpBankNumber: (sbpBankNumber) => set({ sbpBankNumber }),
      setSbpBankCode: (sbpBankCode) => set({ sbpBankCode }),
      setSbpOrder: (sbpOrder) => set({ sbpOrder }),
      setIsSuccess: (isSuccess) => set({ isSuccess }),
      setCurrentWalletAmount: (currentWalletAmount) =>
        set({ currentWalletAmount }),
      setCryptocurrencyCoin: (cryptocurrencyCoin) =>
        set({ cryptocurrencyCoin }),
      setCryptocurrencyAmount: (cryptocurrencyAmount) =>
        set({ cryptocurrencyAmount }),
      setCryptocurrencyAddress: (cryptocurrencyAddress) =>
        set({ cryptocurrencyAddress }),
      setCryptocurrencyCurrency: (cryptocurrencyCurrency) =>
        set({ cryptocurrencyCurrency }),
      setCryptoWithdrawOrder: (cryptoWithdrawOrder) =>
        set({ cryptoWithdrawOrder }),
      clearWithdraw: () =>
        set({
          mode: null,
          bankAmount: 0,
          bankNumber: '',
          bankCode: '',
          cryptocurrencyAmount: 0,
          cryptocurrencyAddress: '',
          cryptocurrencyCurrency: '',
          inProgress: false,
          sbpAmount: 0,
          sbpBankId: '',
          sbpBankNumber: '',
          sbpBankCode: '',
          sbpOrder: null,
          cryptoWithdrawOrder: null
        })
    }),
    { name: 'withdraw-storage' }
  )
)
