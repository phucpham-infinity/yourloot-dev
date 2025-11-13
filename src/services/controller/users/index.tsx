import { useMutation, useQuery } from '@tanstack/react-query'
import { httpClient } from '@/services/api'

// Query Key Constants
export const USERS_QUERY_KEYS = {
  USER_PROFILE: 'user-profile',
  EMAIL_VERIFIED: 'email-verified',
  USER_EVENT: 'user-event'
}

// Interfaces
export interface UserProfile {
  userId: string
  username: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  dateOfBirth: string
  emailVerified?: boolean
  address: {
    addressId: string
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  country: string
  preferences: {
    preferencesId: string
    language: string
    currency: string
    notifications: boolean
    country: string
    dateOfBirth: string
  }
  createdAt: string
  updatedAt: string
}

export interface CreateUserRequest {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
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
    notifications?: boolean
  }
}

interface UpdateUserProfileRequest {
  firstName?: string
  lastName?: string
  phoneNumber?: string
  dateOfBirth?: string
  email?: string
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
    notifications?: boolean
  }
}

export interface EmailVerificationStatus {
  verified: boolean
  verifiedAt?: string
}

interface UserProfileResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: UserProfile
}

export interface EmailVerificationResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: EmailVerificationStatus
}

export enum UserEventType {
  FIRST_PERSONAL_ACCOUNT_VISIT = 'FIRST_PERSONAL_ACCOUNT_VISIT',
  FIRST_VISIT_BONUS_SECTION = 'FIRST_VISIT_BONUS_SECTION',
  FIRST_DEPOSIT_SECTION_VISIT = 'FIRST_DEPOSIT_SECTION_VISIT',
  VISIT_SLOT_CATEGORY = 'VISIT_SLOT_CATEGORY',
  FIRST_VISIT_FAQ = 'FIRST_VISIT_FAQ',
  OBG_NEXT_1 = 'OBG_NEXT_1',
  OBG_NEXT_2 = 'OBG_NEXT_2',
  OBG_NEXT_3 = 'OBG_NEXT_3',
  OBG_NEXT_4 = 'OBG_NEXT_4',
  OBG_SKIP_1 = 'OBG_SKIP_1',
  OBG_SKIP_2 = 'OBG_SKIP_2',
  OBG_SKIP_3 = 'OBG_SKIP_3',
  OBG_SKIP_4 = 'OBG_SKIP_4'
}

export interface UserEventRequest {
  userEvent: UserEventType
  slotCategory?: string
}

export type PlatformEventType =
  | 'login'
  | 'failedLogin'
  | 'signup'
  | 'passwordReset'
  | 'twoFaReset'
  | 'general'

export interface UserPlatformEventRequest {
  userId: string
  diToken: string
  eventType: PlatformEventType
}

export const userController = () => {
  // Get user profile
  const useGetUserProfile = (userId?: string | null) =>
    useQuery<UserProfileResponse>({
      queryKey: [USERS_QUERY_KEYS.USER_PROFILE, userId],
      enabled: !!userId,
      queryFn: async () => {
        const response = await httpClient.get(`/users/${userId}/profile`)
        return response.data
      }
    })

  const useUserEvent = () =>
    useMutation<any, Error, UserEventRequest>({
      mutationFn: async (data) => {
        const response = await httpClient.post('/loyalty/user-event', data)
        return response.data
      }
    })

  const useUserPlatformEvents = () =>
    useMutation<any, Error, UserPlatformEventRequest>({
      mutationFn: async (data) => {
        const response = await httpClient.post(
          '/users/user-platform-events',
          data
        )
        return response.data
      }
    })

  // Update user profile
  const useUpdateUserProfile = () =>
    useMutation<
      UserProfileResponse,
      Error,
      { userId: string; data: UpdateUserProfileRequest }
    >({
      mutationFn: async ({ userId, data }) => {
        const response = await httpClient.put(`/users/${userId}/profile`, data)
        return response.data
      }
    })

  // Create user
  const useCreateUser = () =>
    useMutation<UserProfileResponse, Error, CreateUserRequest>({
      mutationFn: async (data) => {
        const response = await httpClient.post('/users', data)
        return response.data
      }
    })

  // Check email verification status
  const useCheckEmailVerification = (userId: string) =>
    useQuery<EmailVerificationResponse>({
      queryKey: [USERS_QUERY_KEYS.EMAIL_VERIFIED, userId],
      queryFn: async () => {
        const response = await httpClient.get(`/users/${userId}/email-verified`)
        return response.data
      }
    })

  // Get user di access token
  const useGetUserDeviceIdToken = () =>
    useMutation<any, Error, string>({
      mutationFn: async (sessionId: string) => {
        const response = await httpClient.post(
          `/users/generate-di-access-token`,
          {
            sessionId
          }
        )
        return response.data?.content?.token || ''
      }
    })

  // Verify email
  const useVerifyEmail = () =>
    useMutation<EmailVerificationResponse, Error, string>({
      mutationFn: async (userId) => {
        const response = await httpClient.patch(
          `/users/${userId}/email-verified`
        )
        return response.data
      }
    })

  return {
    useGetUserProfile,
    useUpdateUserProfile,
    useCreateUser,
    useCheckEmailVerification,
    useVerifyEmail,
    useUserEvent,
    useGetUserDeviceIdToken,
    useUserPlatformEvents
  }
}
