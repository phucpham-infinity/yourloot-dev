import { useMutation, useQuery } from '@tanstack/react-query'
import { httpClient } from '@/services/api'
import { BaseResponseRegistrationResponse } from '../email-verification'

export interface RegistrationRequest {
  username: string
  password: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
}

export interface RegistrationResponse {
  userId: string
  message: string
}

export interface RegistrationRequestV2 {
  username: string
  password: string
  currency: string
  promoCode: string
}

export interface ProvidersResponseContent {
  timestamp: string
  contentType: string
  content: {
    yandexLoginPath: string
    telegramLoginPath: string
    cookies: string[]
    telegramBotUsername: string
  }
}

// Registration controller function
export const registrationController = () => {
  const useRegisterMutation = () =>
    useMutation<any, any, any>({
      mutationFn: async (
        data: RegistrationRequest
      ): Promise<BaseResponseRegistrationResponse> => {
        const response = await httpClient.post('/auth/registration', data)
        return response?.data
      }
    })

  const useRegisterV2Mutation = () =>
    useMutation<any, any, any>({
      mutationFn: async (
        data: RegistrationRequestV2
      ): Promise<BaseResponseRegistrationResponse> => {
        const response = await httpClient.post('/auth/v2/registration', data)
        return response?.data
      }
    })

  const useGetProvidersTelegram = () =>
    useQuery<any, any, any, any>({
      queryKey: ['providers'],
      queryFn: async (): Promise<ProvidersResponseContent> => {
        const response = await httpClient.get('/auth/providers')
        return response?.data
      }
    })

  return {
    useRegisterMutation,
    useRegisterV2Mutation,
    useGetProvidersTelegram
  }
}
