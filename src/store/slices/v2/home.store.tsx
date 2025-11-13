import { create } from 'zustand'

interface HomeStoreV2 {
  openManageFunds: boolean
  setOpenManageFunds: (openManageFunds: boolean) => void

  openMenu: boolean
  setOpenMenu: (openMenu: boolean) => void
}

export const useHomeStoreV2 = create<HomeStoreV2>()((set) => ({
  openManageFunds: false,
  setOpenManageFunds: (openManageFunds) => set({ openManageFunds }),

  openMenu: false,
  setOpenMenu: (openMenu) => set({ openMenu })
}))
