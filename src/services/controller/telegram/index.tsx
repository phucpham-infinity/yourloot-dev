import { useMutation } from '@tanstack/react-query'
import { httpClient } from '@/services/api'

export interface TelegramLoginRequest {
  requestParams: Record<string, string>
  Cookie: string
}

export interface TelegramEndpointRequest {
  requestParams: Record<string, string>
  Cookie: string
}

export interface TelegramEndpointResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: string
}

export const telegramController = () => {
  const useTelegramLoginMutation = () =>
    useMutation<void, Error, TelegramLoginRequest>({
      mutationFn: async (data: TelegramLoginRequest): Promise<void> => {
        const response = await httpClient.get('/auth/broker/telegram/login', {
          params: data.requestParams,
          headers: {
            Cookie: data.Cookie
          }
        })
        return response.data
      }
    })

  const useTelegramEndpointMutation = () =>
    useMutation<TelegramEndpointResponse, Error, TelegramEndpointRequest>({
      mutationFn: async (
        data: TelegramEndpointRequest
      ): Promise<TelegramEndpointResponse> => {
        const response = await httpClient.get(
          '/auth/broker/telegram/endpoint',
          {
            params: data.requestParams,
            headers: {
              Cookie: data.Cookie
            }
          }
        )
        return response.data
      }
    })

  return {
    useTelegramLoginMutation,
    useTelegramEndpointMutation
  }
}
