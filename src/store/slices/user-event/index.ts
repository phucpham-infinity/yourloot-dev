import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserEventStore {
  // State
  isDoneProfilePage: boolean
  isDoneFAQPage: boolean
  isDoneBonusPage: boolean
  isDoneDepositPage: boolean
  isDoneCategoryPage: boolean

  // Actions
  setIsDoneProfilePage: (isDoneProfilePage: boolean) => void
  setIsDoneFAQPage: (isDoneFAQPage: boolean) => void
  setIsDoneBonusPage: (isDoneBonusPage: boolean) => void
  setIsDoneDepositPage: (isDoneDepositPage: boolean) => void
  setIsDoneCategoryPage: (isDoneCategoryPage: boolean) => void
}

export const useUserEventStore = create<UserEventStore>()(
  persist(
    (set) => ({
      // State
      isDoneProfilePage: false,
      isDoneFAQPage: false,
      isDoneBonusPage: false,
      isDoneDepositPage: false,
      isDoneCategoryPage: false,
      // Actions
      setIsDoneProfilePage: (isDoneProfilePage) => set({ isDoneProfilePage }),
      setIsDoneFAQPage: (isDoneFAQPage) => set({ isDoneFAQPage }),
      setIsDoneBonusPage: (isDoneBonusPage) => set({ isDoneBonusPage }),
      setIsDoneDepositPage: (isDoneDepositPage) => set({ isDoneDepositPage }),
      setIsDoneCategoryPage: (isDoneCategoryPage) => set({ isDoneCategoryPage })
    }),
    {
      name: 'user-event-storage'
    }
  )
)
