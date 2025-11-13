import { useMutation, useQuery } from '@tanstack/react-query'
import { httpClient } from '@/services/api'

// Query Key Constants
export const MECHANIC_REWARDS_QUERY_KEYS = {
  MECHANIC_REWARD: 'mechanic-reward',
  MECHANIC_REWARDS: 'mechanic-rewards'
}

// Interfaces
export interface MechanicReward {
  mechanicRewardId: string
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

export interface CreateMechanicRewardRequest {
  name: string
  description: string
  type: string
  value: number
  currency: string
  conditions: Record<string, any>
}

export interface UpdateMechanicRewardRequest {
  name?: string
  description?: string
  type?: string
  value?: number
  currency?: string
  conditions?: Record<string, any>
  status?: 'ACTIVE' | 'INACTIVE'
}

export interface MechanicRewardsListResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: {
    rewards: MechanicReward[]
    total: number
    page: number
    size: number
  }
}

export interface MechanicRewardResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: MechanicReward
}

export const mechanicRewardsController = () => {
  // Get all mechanic rewards
  const useGetAllMechanicRewards = (page: number = 0, size: number = 10) =>
    useQuery<MechanicRewardsListResponse>({
      queryKey: [MECHANIC_REWARDS_QUERY_KEYS.MECHANIC_REWARDS, page, size],
      queryFn: async () => {
        const response = await httpClient.get(
          '/loyalty/mechanic-reward/get-all',
          {
            params: { page, size }
          }
        )
        return response.data
      }
    })

  // Get single mechanic reward by ID
  const useGetMechanicReward = (mechanicRewardId: string) =>
    useQuery<MechanicRewardResponse>({
      queryKey: [MECHANIC_REWARDS_QUERY_KEYS.MECHANIC_REWARD, mechanicRewardId],
      queryFn: async () => {
        const response = await httpClient.get(
          `/loyalty/mechanic-reward/${mechanicRewardId}`
        )
        return response.data
      }
    })

  // Create new mechanic reward
  const useCreateMechanicReward = () =>
    useMutation<MechanicRewardResponse, Error, CreateMechanicRewardRequest>({
      mutationFn: async (data) => {
        const response = await httpClient.post(
          '/loyalty/mechanic-reward/create',
          data
        )
        return response.data
      }
    })

  // Update mechanic reward
  const useUpdateMechanicReward = () =>
    useMutation<
      MechanicRewardResponse,
      Error,
      { mechanicRewardId: string; data: UpdateMechanicRewardRequest }
    >({
      mutationFn: async ({ mechanicRewardId, data }) => {
        const response = await httpClient.put(
          `/loyalty/mechanic-reward/${mechanicRewardId}`,
          data
        )
        return response.data
      }
    })

  // Delete mechanic reward
  const useDeleteMechanicReward = () =>
    useMutation<void, Error, string>({
      mutationFn: async (mechanicRewardId) => {
        const response = await httpClient.delete(
          `/loyalty/mechanic-reward/${mechanicRewardId}`
        )
        return response.data
      }
    })

  return {
    useGetAllMechanicRewards,
    useGetMechanicReward,
    useCreateMechanicReward,
    useUpdateMechanicReward,
    useDeleteMechanicReward
  }
}
