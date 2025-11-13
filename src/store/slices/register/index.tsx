import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ProvidersTelegramResponse = {
  content: {
    yandexLoginPath: string
    telegramLoginPath: string
    cookies: string[]
    telegramBotUsername: string
  }
}

interface RegisterStore {
  email: string | null
  userId: string | null
  promoCode: string | null
  currency: string | null
  language: string | null
  dateOfBirth: Date | null
  country: string | null

  password: string | null
  firstName: string | null
  lastName: string | null
  phoneNumber: string | null

  // external providers data (e.g., telegram)
  providersTelegram: ProvidersTelegramResponse | null

  // actions
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  setFirstName: (firstName: string) => void
  setLastName: (lastName: string) => void
  setPhoneNumber: (phoneNumber: string) => void
  setUserId: (userId: string) => void
  setPromoCode: (promoCode: string) => void
  setProvidersTelegram: (data: ProvidersTelegramResponse) => void
  setPreferences: (args: {
    language: string
    currency: string
    dateOfBirth: Date
    country: string
  }) => void
  clearPreferences: () => void
  clearRegisterStore: () => void

  step: 1 | 2 | 3
  setStep: (step: 1 | 2 | 3) => void
}

export const useRegisterStore = create<RegisterStore>()(
  persist(
    (set) => ({
      // State
      email: null,
      userId: null,
      promoCode: null,
      currency: null,
      language: null,
      dateOfBirth: null,
      country: null,
      password: null,
      firstName: null,
      lastName: null,
      phoneNumber: null,
      providersTelegram: null,
      step: 1,
      // actions
      setEmail: (email) => set({ email }),
      setUserId: (userId) => set({ userId }),
      setPromoCode: (promoCode) => set({ promoCode }),
      setPreferences: ({ language, currency, dateOfBirth, country }) => {
        set({ language, currency, dateOfBirth, country })
      },
      setPassword: (password) => set({ password }),
      setFirstName: (firstName) => set({ firstName }),
      setLastName: (lastName) => set({ lastName }),
      setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
      setProvidersTelegram: (data) => set({ providersTelegram: data }),
      setStep: (step) => set({ step }),
      clearPreferences: () => {
        set({
          language: null,
          currency: null,
          dateOfBirth: null,
          country: null
        })
      },
      clearRegisterStore: () => {
        set({
          email: null,
          userId: null,
          promoCode: null,
          currency: null,
          language: null
        })
      }
    }),
    {
      name: 'register-storage',
      partialize: (state) => {
        // loại bỏ email khỏi persist
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { step, ...rest } = state
        return rest
      }
    }
  )
)
