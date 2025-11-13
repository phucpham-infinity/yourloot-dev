import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type WithdrawV2Method = 'bank-card' | 'cryptocurrency' | 'fps'

export type WithdrawV2Status = 'idle' | 'inProgress' | 'success' | 'error'

interface WithdrawStore {
  method: WithdrawV2Method | null
  beforeMethod: WithdrawV2Method | null
  amount: number | null
  bankCode: string | null
  cardNumber: string | null
  status: WithdrawV2Status
  orderId: string | null
  orderData: any | null
  isOpenInputInfo: boolean
  isOpenCancel: boolean
  isOpenProcess: boolean
  isOpenWithdrawRequested: boolean
  isOpenWithdrawCancel: boolean
  isOpenWithdrawFailed: boolean
  isOpenWithdrawUnavailable: boolean
  selectedMethod: WithdrawV2Method | null

  clearWithdraw: () => void
  setMethod: (method: WithdrawV2Method) => void
  setAmount: (amount: number) => void
  setBankCode: (bankCode: string) => void
  setCardNumber: (cardNumber: string) => void
  setStatus: (status: WithdrawV2Status) => void
  setOrderId: (orderId: string) => void
  setOrderData: (orderData: any) => void
  setBeforeMethod: (beforeMethod: WithdrawV2Method | null) => void
  setSelectedMethod: (selectedMethod: WithdrawV2Method | null) => void
  setIsOpenInputInfo: (
    isOpenInputInfo: boolean,
    method?: WithdrawV2Method | null
  ) => void
  setIsOpenCancel: (isOpenCancel: boolean) => void
  setIsOpenProcess: (isOpenProcess: boolean) => void
  setIsOpenWithdrawRequested: (isOpenWithdrawRequested: boolean) => void
  setIsOpenWithdrawCancel: (isOpenWithdrawCancel: boolean) => void
  setIsOpenWithdrawFailed: (isOpenWithdrawFailed: boolean) => void
  setIsOpenWithdrawUnavailable: (isOpenWithdrawUnavailable: boolean) => void
}

const initialState: Pick<
  WithdrawStore,
  | 'method'
  | 'amount'
  | 'bankCode'
  | 'cardNumber'
  | 'status'
  | 'orderId'
  | 'orderData'
  | 'isOpenInputInfo'
  | 'isOpenCancel'
  | 'isOpenProcess'
  | 'isOpenWithdrawRequested'
  | 'isOpenWithdrawCancel'
  | 'isOpenWithdrawFailed'
  | 'isOpenWithdrawUnavailable'
> = {
  method: null,
  amount: null,
  bankCode: null,
  cardNumber: null,
  status: 'idle',
  orderId: null,
  orderData: null,
  isOpenInputInfo: false,
  isOpenCancel: false,
  isOpenProcess: false,
  isOpenWithdrawRequested: false,
  isOpenWithdrawCancel: false,
  isOpenWithdrawFailed: false,
  isOpenWithdrawUnavailable: false
}

export const useV2WithdrawStore = create<WithdrawStore>()(
  persist(
    (set) => ({
      ...initialState,
      selectedMethod: null,
      beforeMethod: null,
      setMethod: (method) => set({ method }),
      setAmount: (amount) => set({ amount }),
      setBankCode: (bankCode) => set({ bankCode }),
      setCardNumber: (cardNumber) => set({ cardNumber }),
      setStatus: (status) => set({ status }),
      setOrderId: (orderId) => set({ orderId }),
      setOrderData: (orderData) => set({ orderData }),
      setBeforeMethod: (beforeMethod) => set({ beforeMethod }),
      setIsOpenInputInfo: (isOpenInputInfo, method) => {
        set({ isOpenInputInfo })
        if (method) set({ method })
      },
      setIsOpenCancel: (isOpenCancel) => set({ isOpenCancel }),
      setIsOpenProcess: (isOpenProcess) => set({ isOpenProcess }),
      setIsOpenWithdrawRequested: (isOpenWithdrawRequested) =>
        set({ isOpenWithdrawRequested }),
      setIsOpenWithdrawCancel: (isOpenWithdrawCancel) =>
        set({ isOpenWithdrawCancel }),
      setIsOpenWithdrawFailed: (isOpenWithdrawFailed) =>
        set({ isOpenWithdrawFailed }),
      setIsOpenWithdrawUnavailable: (isOpenWithdrawUnavailable) =>
        set({ isOpenWithdrawUnavailable }),
      setSelectedMethod: (selectedMethod) => set({ selectedMethod }),
      clearWithdraw: () => set(initialState)
    }),
    { name: 'v2-withdraw-storage' }
  )
)
