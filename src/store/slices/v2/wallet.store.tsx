import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WalletStore {
  walletId: string | null
  currency: string | null
  walletIdMain: string | null
  currencyMain: string | null
  isCreateWalletSuccessfull: boolean
  isSwichingWallet: boolean
  isOpenSelectNetwork: boolean
  setWalletId: (walletId: string) => void
  setCurrency: (currency: string) => void
  setWalletIdMain: (walletIdMain: string) => void
  setCurrencyMain: (currencyMain: string) => void
  setIsCreateWalletSuccessfull: (isCreateWalletSuccessfull: boolean) => void
  setIsSwichingWallet: (isSwichingWalle: boolean) => void
  setIsOpenSelectNetwork: (isSwichingWalle: boolean) => void
}
const initialState: Pick<
  WalletStore,
  | 'walletId'
  | 'currency'
  | 'walletIdMain'
  | 'currencyMain'
  | 'isCreateWalletSuccessfull'
  | 'isSwichingWallet'
  | 'isOpenSelectNetwork'
> = {
  walletId: null,
  currency: null,
  walletIdMain: null,
  currencyMain: null,
  isOpenSelectNetwork: false,
  isCreateWalletSuccessfull: false,
  isSwichingWallet: false
}

export const useV2WalletStore = create<WalletStore>()(
  persist(
    (set) => ({
      ...initialState,
      setCurrency: (currency) => set({ currency }),
      setWalletId: (walletId) => set({ walletId }),
      setCurrencyMain: (currencyMain) => set({ currencyMain }),
      setWalletIdMain: (walletIdMain) => set({ walletIdMain }),
      setIsCreateWalletSuccessfull: (isCreateWalletSuccessfull) =>
        set({ isCreateWalletSuccessfull }),
      setIsSwichingWallet: (isSwichingWallet) => set({ isSwichingWallet }),
      setIsOpenSelectNetwork: (isOpenSelectNetwork) =>
        set({ isOpenSelectNetwork })
    }),
    { name: 'v2-wallet-storage' }
  )
)
