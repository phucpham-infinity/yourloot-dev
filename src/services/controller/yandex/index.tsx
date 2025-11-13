import { useMutation } from '@tanstack/react-query'
import { httpClient } from '@/services/api'

export interface YandexLoginRequest {
  requestParams: Record<string, string>
  Cookie: string
}

export interface YandexEndpointRequest {
  requestParams: Record<string, string>
  Cookie: string
}

export interface YandexEndpointResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: string
}

export const yandexController = () => {
  const useYandexLoginMutation = () =>
    useMutation<void, Error, YandexLoginRequest>({
      mutationFn: async (data: YandexLoginRequest): Promise<void> => {
        const response = await httpClient.get('/auth/broker/yandex/login', {
          params: data.requestParams,
          headers: {
            Cookie: data.Cookie
          }
        })
        return response.data
      }
    })

  const useYandexEndpointMutation = () =>
    useMutation<YandexEndpointResponse, Error, YandexEndpointRequest>({
      mutationFn: async (
        data: YandexEndpointRequest
      ): Promise<YandexEndpointResponse> => {
        const response = await httpClient.get('/auth/broker/yandex/endpoint', {
          params: data.requestParams,
          headers: {
            Cookie: data.Cookie
          }
        })
        return response.data
      }
    })

  return {
    useYandexLoginMutation,
    useYandexEndpointMutation
  }
}
