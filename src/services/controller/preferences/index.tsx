import { useMutation } from '@tanstack/react-query'
import { httpClient } from '@/services/api'
import { queryClient } from '@/services'
import { WALLETS_QUERY_KEYS } from '../wallets'

// Query Key Constants
export const PREFERENCES_QUERY_KEYS = {
  PREFERENCES: 'preferences'
}

// Interfaces
export interface Address {
  addressId: string
  street: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface Preferences {
  preferencesId: string
  language: string
  currency: string
}

export interface UserPreferences {
  userId: string
  username: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  dateOfBirth: string
  address: Address
  preferences: Preferences
  emailVerified: boolean
}

export interface PreferencesResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: UserPreferences
}

export interface CreatePreferencesRequest {
  userId: string
  language: string
  currency: string
  dateOfBirth: Date
  country: string
  promoCode: string
}

export const preferencesController = () => {
  // Create preferences
  const usePostPreferences = () =>
    useMutation<PreferencesResponse, Error, CreatePreferencesRequest>({
      mutationFn: async (data) => {
        const response = await httpClient.post('/users/preferences', data)
        return response.data
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: [WALLETS_QUERY_KEYS.USER_WALLETS, variables.userId]
        })
      }
    })

  return {
    usePostPreferences
  }
}
