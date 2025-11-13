import { httpClient } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

// Query Key Constants
export const ACHIEVEMENTS_QUERY_KEYS = {
  ACHIEVEMENTS: 'achievements'
}

// Interfaces
export interface AchievementsListResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: Achievement[]
}

export interface AchievementItem {
  isCompleted: boolean
  achievementName: string
  achievementDescription: string
}

export interface Achievement {
  userId: string
  categoryName: string
  categoryDescription: string
  currentProgress: number
  achievements: AchievementItem[]
  currentValue: number
  maxValue: number
}

export const achievementsController = () => {
  // Get all achievements
  const useGetAllAchievements = (userId?: string) =>
    useQuery<AchievementsListResponse>({
      queryKey: [ACHIEVEMENTS_QUERY_KEYS.ACHIEVEMENTS],
      queryFn: async () => {
        const response = await httpClient.get('/loyalty/user/achievements')
        return response.data
      },
      enabled: !!userId,
      retry: false
    })

  return {
    useGetAllAchievements
  }
}
