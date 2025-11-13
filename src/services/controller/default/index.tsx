import { useMutation, useQuery } from '@tanstack/react-query'
import { httpClient } from '@/services/api'
import { UserProfile } from '../users'

// Query Key Constants
export const DEFAULT_QUERY_KEYS = {
  USER_PROFILE: 'user-profile',
  KYC_STATUS: 'kyc-status',
  FRAUD_RISK: 'fraud-risk'
}

// User Profile Interfaces
export interface UserProfileResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: UserProfile
}
export interface UpdateUserProfileRequest {
  firstName?: string
  lastName?: string
  phoneNumber?: string
  dateOfBirth?: string
  address?: {
    street?: string
    city?: string
    state?: string
    postalCode?: string
    country?: string
  }
  preferences?: {
    language?: string
    currency?: string
  }
}

// KYC Interfaces
export interface KycSubmitRequest {
  clientId: string
  documentType: string
  documentNumber: string
  documentImage: File
  selfieImage: File
  additionalInfo?: Record<string, any>
}

export interface KycStatusResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: {
    clientId: string
    status: 'PENDING' | 'APPROVED' | 'REJECTED'
    submissionDate: string
    lastUpdated: string
    rejectionReason?: string
  }
}

export interface KycUpdateRequest {
  clientId: string
  documentType?: string
  documentNumber?: string
  documentImage?: File
  selfieImage?: File
  additionalInfo?: Record<string, any>
}

// Payment Interfaces
export interface DepositRequest {
  clientId: string
  amount: number
  currency: string
  paymentMethod: string
  paymentDetails: Record<string, any>
}

export interface WithdrawRequest {
  clientId: string
  amount: number
  currency: string
  withdrawalMethod: string
  withdrawalDetails: Record<string, any>
}

// Support Interfaces
export interface SupportTicketRequest {
  clientId: string
  subject: string
  message: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  category: string
  attachments?: File[]
}

// Communication Interfaces
export interface SendMessageRequest {
  clientId: string
  messageType: 'EMAIL' | 'SMS' | 'PUSH'
  subject?: string
  content: string
  templateId?: string
  variables?: Record<string, any>
}

// Anti-fraud Interfaces
export interface TransactionCheckRequest {
  clientId: string
  transactionId: string
  transactionType: string
  amount: number
  currency: string
  paymentMethod: string
  ipAddress: string
  deviceInfo: Record<string, any>
}

export interface ReportSuspiciousActivityRequest {
  clientId: string
  reportType: string
  description: string
  evidenceAttachments?: File[]
  reportedBy: string
}

export interface FraudRiskResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: {
    clientId: string
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'
    riskScore: number
    lastAssessed: string
    riskFactors: string[]
  }
}

export const defaultController = () => {
  // User Profile
  const useGetUserProfile = (clientId: string) =>
    useQuery<UserProfileResponse>({
      queryKey: [DEFAULT_QUERY_KEYS.USER_PROFILE, clientId],
      queryFn: async () => {
        const response = await httpClient.get(`/users/${clientId}/profile`)
        return response.data
      }
    })

  const useUpdateUserProfile = () =>
    useMutation<
      UserProfileResponse,
      Error,
      { clientId: string; data: UpdateUserProfileRequest }
    >({
      mutationFn: async ({ clientId, data }) => {
        const response = await httpClient.put(
          `/users/${clientId}/profile`,
          data
        )
        return response.data
      }
    })

  // KYC
  const useSubmitKyc = () =>
    useMutation<any, Error, KycSubmitRequest>({
      mutationFn: async (data) => {
        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
          if (value instanceof File) {
            formData.append(key, value)
          } else if (typeof value === 'object') {
            formData.append(key, JSON.stringify(value))
          } else {
            formData.append(key, String(value))
          }
        })

        const response = await httpClient.post('/kyc/submit', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        return response.data
      }
    })

  const useGetKycStatus = (clientId: string) =>
    useQuery<KycStatusResponse>({
      queryKey: [DEFAULT_QUERY_KEYS.KYC_STATUS, clientId],
      queryFn: async () => {
        const response = await httpClient.get(`/kyc/status/${clientId}`)
        return response.data
      }
    })

  const useUpdateKyc = () =>
    useMutation<any, Error, KycUpdateRequest>({
      mutationFn: async (data) => {
        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
          if (value instanceof File) {
            formData.append(key, value)
          } else if (typeof value === 'object') {
            formData.append(key, JSON.stringify(value))
          } else {
            formData.append(key, String(value))
          }
        })

        const response = await httpClient.put('/kyc/update', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        return response.data
      }
    })

  // Payments
  const useDepositFunds = () =>
    useMutation<any, Error, DepositRequest>({
      mutationFn: async (data) => {
        const response = await httpClient.post('/payments/deposit', data)
        return response.data
      }
    })

  const useWithdrawFunds = () =>
    useMutation<any, Error, WithdrawRequest>({
      mutationFn: async (data) => {
        const response = await httpClient.post('/payments/withdraw', data)
        return response.data
      }
    })

  // Support
  const useCreateSupportTicket = () =>
    useMutation<any, Error, SupportTicketRequest>({
      mutationFn: async (data) => {
        const formData = new FormData()
        const { attachments, ...rest } = data

        Object.entries(rest).forEach(([key, value]) => {
          if (typeof value === 'object') {
            formData.append(key, JSON.stringify(value))
          } else {
            formData.append(key, String(value))
          }
        })

        if (attachments) {
          attachments.forEach((file, index) => {
            formData.append(`attachment${index}`, file)
          })
        }

        const response = await httpClient.post('/support/ticket', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        return response.data
      }
    })

  // Communications
  const useSendMessage = () =>
    useMutation<any, Error, SendMessageRequest>({
      mutationFn: async (data) => {
        const response = await httpClient.post('/communications/send', data)
        return response.data
      }
    })

  // Anti-fraud
  const useCheckTransaction = () =>
    useMutation<any, Error, TransactionCheckRequest>({
      mutationFn: async (data) => {
        const response = await httpClient.post(
          '/antifraud/transaction/check',
          data
        )
        return response.data
      }
    })

  const useReportSuspiciousActivity = () =>
    useMutation<any, Error, ReportSuspiciousActivityRequest>({
      mutationFn: async (data) => {
        const formData = new FormData()
        const { evidenceAttachments, ...rest } = data

        Object.entries(rest).forEach(([key, value]) => {
          if (typeof value === 'object') {
            formData.append(key, JSON.stringify(value))
          } else {
            formData.append(key, String(value))
          }
        })

        if (evidenceAttachments) {
          evidenceAttachments.forEach((file, index) => {
            formData.append(`evidence${index}`, file)
          })
        }

        const response = await httpClient.post('/antifraud/report', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        return response.data
      }
    })

  const useGetFraudRisk = (clientId: string) =>
    useQuery<FraudRiskResponse>({
      queryKey: [DEFAULT_QUERY_KEYS.FRAUD_RISK, clientId],
      queryFn: async () => {
        const response = await httpClient.get(`/antifraud/risk/${clientId}`)
        return response.data
      }
    })

  return {
    // User Profile
    useGetUserProfile,
    useUpdateUserProfile,

    // KYC
    useSubmitKyc,
    useGetKycStatus,
    useUpdateKyc,

    // Payments
    useDepositFunds,
    useWithdrawFunds,

    // Support
    useCreateSupportTicket,

    // Communications
    useSendMessage,

    // Anti-fraud
    useCheckTransaction,
    useReportSuspiciousActivity,
    useGetFraudRisk
  }
}
