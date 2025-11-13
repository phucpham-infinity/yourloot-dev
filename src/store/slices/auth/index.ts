import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthStore } from './types'
import { clearLocalStorageExcept, getUserIpAddress } from '@/helper'

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // State
      user: null,
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      userId: null,
      userIp: null,
      sessionNotActive: false,
      launchParams: null,
      // Actions
      setUser: (user) => set({ user }),
      setUserIp: async () => {
        const response = await getUserIpAddress()
        set({ userIp: response || '127.0.0.1' })
      },
      setAccessToken: async (token, refreshToken) => {
        set({
          accessToken: token,
          isAuthenticated: !!token,
          refreshToken
        })
      },
      setSessionNotActive: (sessionNotActive) => set({ sessionNotActive }),
      setUserId: (userId) => set({ userId }),
      setLaunchParams: (launchParams) => set({ launchParams }),
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          accessToken: null,
          userId: null,
          launchParams: null
        })
        clearLocalStorageExcept(['on-boarding-storage', 'i18nextLng'])
        // appRoutes.navigate('/auth/login')
        // appRoutes.navigate(isMobile ? '/auth/login' : '/')
        // location.reload()
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { sessionNotActive, ...rest } = state
        return rest
      }
    }
  )
)
