import { AxiosInstance } from 'axios'
import { useAuthStore } from '@/store'
import { tokenController } from '@/services/controller/token'
import { getUserIpAddress } from '@/helper'

let refreshTokenPromise: Promise<any> | null = null

export const setupAuthInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    async (config) => {
      const { accessToken, userIp, userId } = useAuthStore.getState()

      let _userIp = userIp
      if (!_userIp) {
        _userIp = await getUserIpAddress()
      }
      if (accessToken && !config.url?.includes('/auth/login')) {
        if (!config.url?.includes('/auth/register')) {
          config.headers.Authorization = `Bearer ${accessToken}`
        }
        config.headers['User-Id'] = userId
      }
      config.headers['User-IP'] = _userIp || '127.0.0.1'
      config.timeout = 300000
      return config
    },
    (error) => Promise.reject(error)
  )

  instance.interceptors.response.use(
    function (response) {
      return response
    },
    async function (error) {
      const config = error.config

      // Prevent infinite loops
      if (error?.response?.status === 401 && !config._retry) {
        if (location.pathname.includes('auth')) return Promise.reject(error)

        const {
          logout,
          refreshToken,
          userId,
          setAccessToken,
          setSessionNotActive
        } = useAuthStore.getState()

        if (refreshToken && userId) {
          try {
            config._retry = true
            if (!refreshTokenPromise) {
              const { refreshToken: refreshTokenFn } = tokenController()
              refreshTokenPromise = (async () => {
                const data = await refreshTokenFn({
                  refreshToken,
                  userId
                })
                if (
                  (data as any)?.message?.includes('Session not active') ||
                  (data as any)?.message?.includes('Token is not active')
                ) {
                  setSessionNotActive(true)
                }
                setAccessToken(data.token, data.refreshToken)
                return data
              })().finally(() => {
                refreshTokenPromise = null
              })
            }

            const data = await refreshTokenPromise
            config.headers.Authorization = `Bearer ${data.token}`
            return instance(config)
          } catch (e) {
            logout()
            return Promise.reject(e)
          }
        } else {
          console.error('refreshToken', JSON.stringify(error))
          logout()
          return Promise.reject(error)
        }
      } else {
        return Promise.reject(error?.response?.data || error)
      }
    }
  )
}
