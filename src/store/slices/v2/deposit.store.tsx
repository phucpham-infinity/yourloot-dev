import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type DepositV2Method =
  | 'bank-card'
  | 'cryptocurrency'
  | 'sbp'
  | 'kassa'
  | 'sbp-qr'
  | 'fps-qr'
  | 'fps-cis'
  | 'fps'
  | 'fps-sber'
  | 'sber-pay'
  | 't-pay'
  | 'yukassa'
  | 'sbp-fast'
  | 'fps-alfa'
  | '1-click-pay'
  | 'mobile'
  | 'ozon'
  | 'sber'
  | 'fps-abkhazia'
  | 'psb'
  | 'wb'
  | 'yandex'
  | 'vtb'
  | 'sberPay'
  | 'uzcard'
  | 'humo'
export type DepositV2Status = 'idle' | 'inProgress' | 'success' | 'error'

interface DepositStore {
  method: DepositV2Method | ''
  amount: number | null
  bankCode: string | null
  status: DepositV2Status
  orderId: string | null
  orderData: any | null
  network: string | null
  cryptoCurrency: string | null
  pendingNetwork: string | null
  depositRightComponent: any
  depositRightComponentName: string | null
  selectedMethod: DepositV2Method | null
  selectedNetwork: string | null
  selectedCryptoCurrency: string | null
  confirmationData: any | null
  isAmountConfirmed: boolean

  isOpenCoinSelect: boolean
  isOpenDepositDataInfo: boolean
  isOpenInputInfo: boolean
  isOpenCancel: boolean
  isOpenProcess: boolean
  isOpenDepositInprogress: boolean
  isOpenSelectNetwork: boolean
  isOpenCreateCryptoWallet: boolean
  isOpenDepositSuccessful: boolean
  isOpenDepositFailed: boolean
  isOpenDepositTimeOut: boolean
  isOpenRedirectPayLink: boolean
  isOpenWithdrawUnavailable: boolean
  onCreateWalletSuccess: any
  rateLimitStartedAt: number
  isRateLimitError: boolean

  setConfirmationData: (confirmationData: any) => void
  setIsRateLimitError: (isRateLimitError: boolean) => void
  setIsAmountConfirmed: (isAmountConfirmed: boolean) => void
  setSelectedCryptoCurrency: (selectedCryptoCurrency: string) => void
  setSelectedNetwork: (selectedNetwork: string) => void
  setIsOpenDepositSuccessful: (isOpenDepositSuccessful: boolean) => void
  setIsOpenDepositFailed: (isOpenDepositFailed: boolean) => void
  setIsOpenDepositTimeOut: (isOpenDepositTimeOut: boolean) => void
  setDepositRightComponent: ({
    component,
    props
  }: {
    component: any
    props: any
  }) => void
  onBack?: () => void
  //action
  setIsOpenDataInfo: (isOpenDepositDataInfo: boolean) => void

  setIsOpenInputInfo: (
    isOpenInputInfo: boolean,
    method?: DepositV2Method | null
  ) => void
  setIsOpenCancel: (isOpenCancel: boolean, onBack?: () => void) => void
  setMethod: (method: DepositV2Method) => any
  setSelectedMethod: (selectedMethod: DepositV2Method | null) => void
  setAmount: (amount: number) => void
  setBankCode: (bankCode: string) => void
  setStatus: (status: DepositV2Status) => void
  setOrderId: (orderId: string) => void
  setOrderData: (orderData: any) => void
  setIsOpenProcess: (isOpenProcess: boolean) => void
  setOpenDepositInporcess: (isOpenDepositInprogress: boolean) => void
  setIsOpenSelectNetwork: (isOpenSelectNetwork: boolean) => void
  setNetwork: (network: string) => void
  setCryptoCurrency: (cryptoCurrency: string) => void
  setIsOpenCreateCryptoWallet: (
    isOpenCreateCryptoWallet: boolean,
    onCreateWalletSuccess?: () => void
  ) => void
  setPendingNetwork: (pendingNetwork: string) => void
  setIsOpenWithdrawUnavailable: (isOpenWithdrawUnavailable: boolean) => void
  setIsOpenRedirectPayLink: (isOpenRedirectPayLink: boolean) => void
  setIsOpenCoinSelect: (isOpen: boolean) => void
  setDepositRightComponentName: (depositRightComponentName: string) => void
  setRateLimitStartedAt: (rateLimitStartedAt: number) => void
  clearDeposit: () => void
}

const initialState: Pick<
  DepositStore,
  | 'method'
  | 'amount'
  | 'bankCode'
  | 'status'
  | 'orderId'
  | 'orderData'
  | 'isOpenDepositDataInfo'
  | 'isOpenInputInfo'
  | 'isOpenCancel'
  | 'isOpenProcess'
  | 'isOpenDepositInprogress'
  | 'isOpenSelectNetwork'
  | 'isOpenCoinSelect'
  | 'network'
  | 'cryptoCurrency'
  | 'isOpenCreateCryptoWallet'
  | 'pendingNetwork'
  | 'isOpenWithdrawUnavailable'
  | 'isOpenRedirectPayLink'
  | 'depositRightComponent'
  | 'onCreateWalletSuccess'
  | 'isAmountConfirmed'
> = {
  method: '',
  amount: null,
  bankCode: null,
  status: 'idle',
  orderId: null,
  orderData: null,
  isOpenDepositDataInfo: false,
  isOpenInputInfo: false,
  isOpenCancel: false,
  isOpenProcess: false,
  isOpenDepositInprogress: false,
  isOpenSelectNetwork: false,
  isOpenWithdrawUnavailable: false,
  isOpenRedirectPayLink: false,
  isOpenCoinSelect: false,
  network: null,
  cryptoCurrency: null,
  isOpenCreateCryptoWallet: false,
  pendingNetwork: null,
  depositRightComponent: null,
  onCreateWalletSuccess: null,
  isAmountConfirmed: false
}

export const useV2DepositStore = create<DepositStore>()(
  persist(
    (set) => ({
      ...initialState,
      confirmationData: null,
      isOpenDepositSuccessful: false,
      isOpenDepositTimeOut: false,
      isOpenDepositFailed: false,
      selectedMethod: null,
      selectedNetwork: null,
      selectedCryptoCurrency: null,
      depositRightComponentName: null,
      rateLimitStartedAt: 0,
      isRateLimitError: false,
      setIsRateLimitError: (isRateLimitError) => set({ isRateLimitError }),
      setMethod: (method) => set({ method }),
      setSelectedCryptoCurrency: (selectedCryptoCurrency) =>
        set({ selectedCryptoCurrency }),
      setSelectedMethod: (selectedMethod) => set({ selectedMethod }),
      setSelectedNetwork: (selectedNetwork) => set({ selectedNetwork }),
      setAmount: (amount) => set({ amount }),
      setBankCode: (bankCode) => set({ bankCode }),
      setStatus: (status) => set({ status }),
      setOrderId: (orderId) => set({ orderId }),
      setOrderData: (orderData) => set({ orderData }),
      setIsOpenDataInfo: (isOpenDepositDataInfo) =>
        set({ isOpenDepositDataInfo }),
      setIsOpenInputInfo: (isOpenInputInfo, method) => {
        set({
          amount: ['uzcard', 'humo'].includes(method || '')
            ? 30300
            : method === 'mobile'
              ? 350
              : 5050,
          isOpenInputInfo
        })
        if (method) set({ method, confirmationData: null })
      },
      setIsAmountConfirmed: (isAmountConfirmed) => set({ isAmountConfirmed }),
      setConfirmationData: (confirmationData) => set({ confirmationData }),
      setIsOpenCancel: (isOpenCancel, onBack) => set({ isOpenCancel, onBack }),
      setIsOpenProcess: (isOpenProcess) => set({ isOpenProcess }),
      setOpenDepositInporcess: (isOpenDepositInprogress) =>
        set({ isOpenDepositInprogress }),
      setIsOpenSelectNetwork: (isOpenSelectNetwork) =>
        set({ isOpenSelectNetwork }),
      setNetwork: (network) => set({ network }),
      setCryptoCurrency: (cryptoCurrency) => set({ cryptoCurrency }),
      setIsOpenCreateCryptoWallet: (
        isOpenCreateCryptoWallet,
        onCreateWalletSuccess
      ) => set({ isOpenCreateCryptoWallet, onCreateWalletSuccess }),
      setPendingNetwork: (pendingNetwork) => set({ pendingNetwork }),
      setIsOpenWithdrawUnavailable: (isOpenWithdrawUnavailable) =>
        set({ isOpenWithdrawUnavailable }),
      setIsOpenDepositSuccessful: (isOpenDepositSuccessful) =>
        set({ isOpenDepositSuccessful }),
      setIsOpenDepositTimeOut: (isOpenDepositTimeOut) =>
        set({ isOpenDepositTimeOut }),
      setIsOpenRedirectPayLink: (isOpenRedirectPayLink) =>
        set({ isOpenRedirectPayLink }),
      setDepositRightComponent: ({ component, props }) =>
        set({ depositRightComponent: { component, props } }),
      setDepositRightComponentName: (depositRightComponentName) =>
        set({ depositRightComponentName }),
      setIsOpenDepositFailed: (isOpenDepositFailed) =>
        set({ isOpenDepositFailed }),
      setIsOpenCoinSelect(isOpenCoinSelect) {
        set({
          isOpenCoinSelect
        })
      },
      setRateLimitStartedAt: (rateLimitStartedAt) =>
        set({ rateLimitStartedAt }),
      clearDeposit: () => set(initialState)
    }),
    { name: 'v2-deposit-storage' }
  )
)

// useV2DepositStore.subscribe((state) => {
//   console.log('state', state)
// })
