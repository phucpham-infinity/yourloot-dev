import { useMutation, useQuery } from '@tanstack/react-query'
import { httpClient } from '@/services/api'

// Query Key Constants
export const TRIGGER_QUERY_KEYS = {
  LOYALTY_TRIGGER: 'loyalty-trigger',
  LOYALTY_TRIGGERS: 'loyalty-triggers'
}

// Interfaces
export interface LoyaltyTrigger {
  triggerId: string
  name: string
  description: string
  type: string
  conditions: Record<string, any>
  rewards: Record<string, any>
  status: 'ACTIVE' | 'INACTIVE'
  createdAt: string
  updatedAt: string
}

export interface CreateLoyaltyTriggerRequest {
  name: string
  description: string
  type: string
  conditions: Record<string, any>
  rewards: Record<string, any>
}

export interface UpdateLoyaltyTriggerRequest {
  name?: string
  description?: string
  type?: string
  conditions?: Record<string, any>
  rewards?: Record<string, any>
  status?: 'ACTIVE' | 'INACTIVE'
}

export interface GetAllTriggersResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: {
    triggers: LoyaltyTrigger[]
    total: number
    page: number
    size: number
  }
}

export interface GetTriggerResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: LoyaltyTrigger
}

export const triggerController = () => {
  // Get all loyalty triggers
  const useGetAllTriggers = (page: number = 0, size: number = 10) =>
    useQuery<GetAllTriggersResponse>({
      queryKey: [TRIGGER_QUERY_KEYS.LOYALTY_TRIGGERS, page, size],
      queryFn: async () => {
        const response = await httpClient.get('/loyalty/trigger/get-all', {
          params: { page, size }
        })
        return response.data
      }
    })

  // Get single loyalty trigger by ID
  const useGetTrigger = (triggerId: string) =>
    useQuery<GetTriggerResponse>({
      queryKey: [TRIGGER_QUERY_KEYS.LOYALTY_TRIGGER, triggerId],
      queryFn: async () => {
        const response = await httpClient.get(`/loyalty/trigger/${triggerId}`)
        return response.data
      }
    })

  // Create new loyalty trigger
  const useCreateTrigger = () =>
    useMutation<GetTriggerResponse, Error, CreateLoyaltyTriggerRequest>({
      mutationFn: async (data) => {
        const response = await httpClient.post('/loyalty/trigger/create', data)
        return response.data
      }
    })

  // Update loyalty trigger
  const useUpdateTrigger = () =>
    useMutation<
      GetTriggerResponse,
      Error,
      { triggerId: string; data: UpdateLoyaltyTriggerRequest }
    >({
      mutationFn: async ({ triggerId, data }) => {
        const response = await httpClient.put(
          `/loyalty/trigger/${triggerId}`,
          data
        )
        return response.data
      }
    })

  // Delete loyalty trigger
  const useDeleteTrigger = () =>
    useMutation<void, Error, string>({
      mutationFn: async (triggerId) => {
        const response = await httpClient.delete(
          `/loyalty/trigger/${triggerId}`
        )
        return response.data
      }
    })

  return {
    useGetAllTriggers,
    useGetTrigger,
    useCreateTrigger,
    useUpdateTrigger,
    useDeleteTrigger
  }
}
