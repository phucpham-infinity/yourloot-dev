import { Wallet } from '@/services/controller/wallets'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { produce } from 'immer'
import { keys } from 'lodash-es'

interface WalletStore {
  wallets: Wallet[]
  prevPage: string
  setWallets: (wallet: Wallet[]) => void
  setPrevPage: (prevPage: string) => void
  clearWallets: () => void
  updateWallet: (wallet: Wallet) => void
  updateWalletsBalances: (balances: Record<string, string | number>) => void
  isLoading: boolean
}

export const useWalletStore = create<WalletStore>()(
  persist(
    (set) => ({
      wallets: [],
      prevPage: '/',
      setWallets: (wallets) => set({ wallets }),
      setPrevPage: (prevPage) => set({ prevPage }),
      clearWallets: () => set({ wallets: [] }),
      updateWallet: (wallet) =>
        set((state) => ({
          wallets: state.wallets.map((w) =>
            w.currency === wallet.currency ? wallet : w
          )
        })),
      updateWalletsBalances: (balances) => {
        set((state) =>
          produce(state, (draft) => {
            keys(balances).forEach((walletId) => {
              const wallet = draft.wallets.find((w) => w.id === walletId)
              if (wallet && !!balances[walletId]) {
                wallet.amount = Number(balances[walletId])
              }
            })
          })
        )
      },
      isLoading: false
    }),
    {
      name: 'wallets-storage'
    }
  )
)
