import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useAuthStore } from '../auth'

interface OnBoardingStore {
  // State
  isDone: Record<any, boolean>
  currentStep: Record<any, number>
  isOpen: boolean

  // Actions
  setIsDone: (isShow: boolean) => void
  setCurrentStep: (currentStep: number) => void
  setIsOpen: (isOpen: boolean) => void
}

export const useOnBoardingStore = create<OnBoardingStore>()(
  persist(
    (set) => ({
      // State
      isDone: {},
      currentStep: {},
      isOpen: false,
      // Actions
      setIsDone: (isDone) => {
        const userId = useAuthStore.getState().userId ?? ''
        set((state) => ({
          isDone: { ...state.isDone, [userId]: isDone }
        }))
      },
      setCurrentStep: (currentStep) => {
        const userId = useAuthStore.getState().userId ?? ''
        set((state) => ({
          currentStep: { ...state.currentStep, [userId]: currentStep }
        }))
      },
      setIsOpen: (isOpen) => {
        set(() => ({
          isOpen: isOpen
        }))
      }
    }),
    {
      name: 'on-boarding-storage'
    }
  )
)
