import { useMutation } from '@tanstack/react-query'
import { httpClient } from '@/services/api'

// Define the request and response interfaces
export interface EmailVerificationRequest {
  userId: string
  email: string
  verificationCode: string
}

export interface BaseResponseRegistrationResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: {
    userId: string
    message: string
    refreshToken: string
    token: string
  }
}

interface EmailActionTokenValidationResponse {
  timestamp: string
  contentType: string
  content: {
    userId: string
    actionToken: string
  }
}

// Registration controller function
export const emailRegistrationController = () => {
  const useEmailVerificationMutation = () =>
    useMutation({
      mutationFn: async (
        data: EmailVerificationRequest
      ): Promise<BaseResponseRegistrationResponse> => {
        const response = await httpClient.post('/auth/email-verification', data)
        return response.data
      }
    })

  const useResendEmailVerificationMutation = (userId: string) =>
    useMutation({
      mutationFn: async (): Promise<BaseResponseRegistrationResponse> => {
        const response = await httpClient.patch(
          `/auth/email-verification/${userId}`
        )
        return response.data
      }
    })

  const useInitiatePasswordResetMutation = () =>
    useMutation({
      mutationFn: async (
        email: string
      ): Promise<BaseResponseRegistrationResponse> => {
        try {
          const response = await httpClient.post(
            '/auth/password-reset/initiate',
            { email }
          )
          return response.data
        } catch (err: any) {
            throw err
        }
      }
    })

  const useValidatePasswordResetMutation = () =>
    useMutation({
      mutationFn: async ({
        actionToken
      }: {
        actionToken: string
      }): Promise<EmailActionTokenValidationResponse> => {
        const response = await httpClient.post(
          '/auth/password-reset/validate',
          { actionToken }
        )

        return response.data
      }
    })

  const useResetPasswordMutation = () =>
    useMutation({
      mutationFn: async (data: {
        actionToken: string
        newPassword: string
        passwordConfirmation: string
        logoutSessions: boolean
      }): Promise<BaseResponseRegistrationResponse> => {
        const response = await httpClient.post(
          '/auth/password-reset/reset',
          data
        )
        return response.data
      }
    })

  return {
    useEmailVerificationMutation,
    useResendEmailVerificationMutation,
    useInitiatePasswordResetMutation,
    useValidatePasswordResetMutation,
    useResetPasswordMutation
  }
}
