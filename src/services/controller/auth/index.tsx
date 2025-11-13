import { useMutation } from '@tanstack/react-query'
import { httpClient } from '@/services/api'

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  refreshToken: string
  userId: string
}

export interface BaseResponseLoginResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: LoginResponse
}

export interface LogoutRequest {
  userId: string
  refreshToken: string
}

export interface LogoutAllRequest {
  userId: string
}

export const authController = () => {
  const useLoginMutation = () =>
    useMutation<BaseResponseLoginResponse, Error, LoginRequest>({
      mutationFn: async (
        data: LoginRequest
      ): Promise<BaseResponseLoginResponse> => {
        const response = await httpClient.post('/auth/login', data)
        return response.data
      }
    })

  const useLogoutMutation = () =>
    useMutation<BaseResponseLoginResponse, Error, LogoutRequest>({
      mutationFn: async (
        data: LogoutRequest
      ): Promise<BaseResponseLoginResponse> => {
        const response = await httpClient.post('/auth/logout/current', data)
        return response.data
      }
    })

  const useLogoutAllMutation = () =>
    useMutation<BaseResponseLoginResponse, Error, LogoutAllRequest>({
      mutationFn: async (
        data: LogoutAllRequest
      ): Promise<BaseResponseLoginResponse> => {
          const response = await httpClient.post('/auth/logout/all', data)
          return response.data
        }
      })


  return {
    useLoginMutation,
    useLogoutMutation,
    useLogoutAllMutation
  }
}
