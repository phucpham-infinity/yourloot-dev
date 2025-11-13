import { useMutation, useQuery } from '@tanstack/react-query'
import { httpClient } from '@/services/api'

// Query Key Constants
export const TRIGGER_REWARDS_QUERY_KEYS = {
  TRIGGER_REWARD: 'trigger-reward',
  TRIGGER_REWARDS: 'trigger-rewards'
}

// Interfaces
export interface TriggerReward {
  triggerRewardId: string
  name: string
  description: string
  type: string
  value: number
  currency: string
  conditions: Record<string, any>
  status: 'ACTIVE' | 'INACTIVE'
  createdAt: string
  updatedAt: string
}

export interface CreateTriggerRewardRequest {
  name: string
  description: string
  type: string
  value: number
  currency: string
  conditions: Record<string, any>
}

export interface UpdateTriggerRewardRequest {
  name?: string
  description?: string
  type?: string
  value?: number
  currency?: string
  conditions?: Record<string, any>
  status?: 'ACTIVE' | 'INACTIVE'
}

export interface GetAllTriggerRewardsResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: {
    rewards: TriggerReward[]
    total: number
    page: number
    size: number
  }
}

export interface GetTriggerRewardResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: TriggerReward
}

export const triggerRewardsController = () => {
  // Get all trigger rewards
  const useGetAllTriggerRewards = (page: number = 0, size: number = 10) =>
    useQuery<GetAllTriggerRewardsResponse>({
      queryKey: [TRIGGER_REWARDS_QUERY_KEYS.TRIGGER_REWARDS, page, size],
      queryFn: async () => {
        const response = await httpClient.get(
          '/loyalty/trigger-reward/get-all',
          {
            params: { page, size }
          }
        )
        return response.data
      }
    })

  // Get single trigger reward by ID
  const useGetTriggerReward = (triggerRewardId: string) =>
    useQuery<GetTriggerRewardResponse>({
      queryKey: [TRIGGER_REWARDS_QUERY_KEYS.TRIGGER_REWARD, triggerRewardId],
      queryFn: async () => {
        const response = await httpClient.get(
          `/loyalty/trigger-reward/${triggerRewardId}`
        )
        return response.data
      }
    })

  // Create new trigger reward
  const useCreateTriggerReward = () =>
    useMutation<GetTriggerRewardResponse, Error, CreateTriggerRewardRequest>({
      mutationFn: async (data) => {
        const response = await httpClient.post(
          '/loyalty/trigger-reward/create',
          data
        )
        return response.data
      }
    })

  // Update trigger reward
  const useUpdateTriggerReward = () =>
    useMutation<
      GetTriggerRewardResponse,
      Error,
      { triggerRewardId: string; data: UpdateTriggerRewardRequest }
    >({
      mutationFn: async ({ triggerRewardId, data }) => {
        const response = await httpClient.put(
          `/loyalty/trigger-reward/${triggerRewardId}`,
          data
        )
        return response.data
      }
    })

  // Delete trigger reward
  const useDeleteTriggerReward = () =>
    useMutation<void, Error, string>({
      mutationFn: async (triggerRewardId) => {
        const response = await httpClient.delete(
          `/loyalty/trigger-reward/${triggerRewardId}`
        )
        return response.data
      }
    })

  return {
    useGetAllTriggerRewards,
    useGetTriggerReward,
    useCreateTriggerReward,
    useUpdateTriggerReward,
    useDeleteTriggerReward
  }
}
