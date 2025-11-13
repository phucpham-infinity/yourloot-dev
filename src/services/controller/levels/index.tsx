import { httpClient } from '@/services/api'
import { useMutation, useQuery } from '@tanstack/react-query'

// Query Key Constants
export const LEVELS_QUERY_KEYS = {
  LEVEL: 'level',
  LEVELS: 'levels',
  PLAYER_LEVEL: 'player-level',
  USER_LEVEL: 'user-level',
  LEVEL_PROGRESS: 'level-progress'
}

// Interfaces
export interface Level {
  id: string
  levelId: string
  name: string
  description: string
  level: number
  requirements: Record<string, any>
  benefits: Record<string, any>
  status: 'ACTIVE' | 'INACTIVE'
  createdAt: string
  updatedAt: string
}

export interface PlayerLevel extends Level {
  playerId: string
  assignedAt: string
  currentPoints: number
  nextLevelPoints: number
}

export interface CreateLevelRequest {
  name: string
  description: string
  level: number
  requirements: Record<string, any>
  benefits: Record<string, any>
}

export interface UpdateLevelRequest {
  name?: string
  description?: string
  level?: number
  requirements?: Record<string, any>
  benefits?: Record<string, any>
  status?: 'ACTIVE' | 'INACTIVE'
}

export interface LevelsListResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: {
    levels: Level[]
    total: number
    page: number
    size: number
  }
}

export interface LevelResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: Level
}

export interface UserLevel {
  levelName: string
  nextUserLevel: string
  experiencePoints: number
  cashBackValue: number
  currentCashBackLevel: number
  nextCashBackLevel: number
  maxCashBackLevel: number
  currentCashBackProgress: number
  currentUserLevelProgress: number
  maxUserLevel: string
}
export interface UserLevelResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: UserLevel
}

export interface PlayerLevelResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: PlayerLevel
}

export interface LevelProgress {
  name: string
  currentLoyaltyPoints: number
  requiredLoyaltyPoints: number
  currentBetsSum: number
  requiredBetsSum: number
}

export interface LevelProgressResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: LevelProgress
}

export const levelsController = () => {
  // Get all levels
  const useGetAllLevels = (page: number = 0, size: number = 10) =>
    useQuery<LevelsListResponse>({
      queryKey: [LEVELS_QUERY_KEYS.LEVELS, page, size],
      queryFn: async () => {
        const response = await httpClient.get('/loyalty/level/get-all', {
          params: { page, size }
        })
        return response.data
      },
      retry: false
    })

  // Get single level by ID
  const useGetLevel = () =>
    useQuery<LevelResponse>({
      queryKey: [LEVELS_QUERY_KEYS.LEVEL],
      queryFn: async () => {
        const response = await httpClient.get(`/loyalty/user/level`)
        return response.data
      }
    })

  // Get single level by ID
  const useGetUserLevel = () =>
    useQuery<UserLevelResponse>({
      queryKey: [LEVELS_QUERY_KEYS.USER_LEVEL],
      queryFn: async () => {
        const response = await httpClient.get(`/loyalty/user/info`)
        return response.data
      }
    })

  // Create new level
  const useCreateLevel = () =>
    useMutation<LevelResponse, Error, CreateLevelRequest>({
      mutationFn: async (data) => {
        const response = await httpClient.post('/loyalty/level/create', data)
        return response.data
      }
    })

  // Update level
  const useUpdateLevel = () =>
    useMutation<
      LevelResponse,
      Error,
      { levelId: string; data: UpdateLevelRequest }
    >({
      mutationFn: async ({ levelId, data }) => {
        const response = await httpClient.put(`/loyalty/level/${levelId}`, data)
        return response.data
      }
    })

  // Delete level
  const useDeleteLevel = () =>
    useMutation<void, Error, string>({
      mutationFn: async (levelId) => {
        const response = await httpClient.delete(`/loyalty/level/${levelId}`)
        return response.data
      }
    })

  // Get player's level
  const useGetPlayerLevel = (playerId: string) =>
    useQuery<PlayerLevelResponse>({
      queryKey: [LEVELS_QUERY_KEYS.PLAYER_LEVEL, playerId],
      queryFn: async () => {
        const response = await httpClient.get(
          `/loyalty/level/get-player/${playerId}`
        )
        return response.data
      }
    })

  // Assign level to player
  const useAssignLevelToPlayer = () =>
    useMutation<
      PlayerLevelResponse,
      Error,
      { levelId: string; playerId: string }
    >({
      mutationFn: async ({ levelId, playerId }) => {
        const response = await httpClient.post(
          `/loyalty/level/assign/${levelId}/to-player/${playerId}`
        )
        return response.data
      }
    })

  // Remove level from player
  const useRemoveLevelFromPlayer = () =>
    useMutation<void, Error, { levelId: string; playerId: string }>({
      mutationFn: async ({ levelId, playerId }) => {
        const response = await httpClient.delete(
          `/loyalty/level/remove-level/${levelId}/from-player/${playerId}`
        )
        return response.data
      }
    })

  // Get level progress
  const useGetLevelProgress = (userId?: string) =>
    useQuery<LevelProgressResponse>({
      queryKey: [LEVELS_QUERY_KEYS.LEVEL_PROGRESS],
      queryFn: async () => {
        const response = await httpClient.get(`/loyalty/level/progress`)
        return response.data
      },
      enabled: !!userId
    })

  return {
    useGetAllLevels,
    useGetLevel,
    useCreateLevel,
    useUpdateLevel,
    useDeleteLevel,
    useGetPlayerLevel,
    useAssignLevelToPlayer,
    useRemoveLevelFromPlayer,
    useGetUserLevel,
    useGetLevelProgress
  }
}
