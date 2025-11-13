import { AxiosInstance } from 'axios'

export const setupErrorInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        console.error('[API Error]', error.response)
        return Promise.reject(error.response)
      }

      return Promise.reject(error)
    }
  )
}
