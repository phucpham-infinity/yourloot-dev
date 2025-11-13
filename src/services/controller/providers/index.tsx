import { useMutation } from '@tanstack/react-query'
import { httpClient } from '@/services/api'

export interface FirstBrokerLoginRequest {
  username: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
}

export interface FirstBrokerLoginResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: {
    userId: string
    message: string
  }
}

export const providersController = () => {
  const useFirstBrokerLoginMutation = () =>
    useMutation<
      FirstBrokerLoginResponse,
      Error,
      { data: FirstBrokerLoginRequest; cookie: string }
    >({
      mutationFn: async ({ data, cookie }) => {
        const response = await httpClient.post<FirstBrokerLoginResponse>(
          '/auth/providers/first-broker-login',
          data,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Cookie: cookie
            }
          }
        )
        return response.data
      }
    })

  return {
    useFirstBrokerLoginMutation
  }
}
