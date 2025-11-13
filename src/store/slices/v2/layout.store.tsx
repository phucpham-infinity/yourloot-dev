import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LayoutStore {
  isOpenSidebar: boolean
  setIsOpenSidebar: (isOpenSidebar: boolean) => void
  // notifications panel (desktop)
  isOpenNotificationsPanel: boolean
  setIsOpenNotificationsPanel: (open: boolean) => void
  notificationsUnread: number
  setNotificationsUnread: (count: number) => void
}
const initialState: Pick<LayoutStore, 'isOpenSidebar' | 'isOpenNotificationsPanel' | 'notificationsUnread'> = {
  isOpenSidebar: false,
  isOpenNotificationsPanel: false,
  notificationsUnread: 0
}

export const useV2LayoutStore = create<LayoutStore>()(
  persist(
    (set) => ({
      ...initialState,
      setIsOpenSidebar: (isOpenSidebar) => set({ isOpenSidebar }),
      setIsOpenNotificationsPanel: (open) => set({ isOpenNotificationsPanel: open }),
      setNotificationsUnread: (count) => set({ notificationsUnread: count })
    }),
    { name: 'v2-layout-storage' }
  )
)
