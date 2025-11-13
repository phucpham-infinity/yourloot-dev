import { httpClient } from '@/services/api'
import { useMutation } from '@tanstack/react-query'

export interface SubmitFeedbackRequest {
  userId: string
  email: string
  name: string
  feedbackText: string
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

export const useSubmitFeedback = () =>
  useMutation({
    mutationFn: async (
      data: SubmitFeedbackRequest
    ): Promise<BaseResponseRegistrationResponse> => {
      const response = await httpClient.post('/feedback/submit', data)
      return response.data
    }
  })
