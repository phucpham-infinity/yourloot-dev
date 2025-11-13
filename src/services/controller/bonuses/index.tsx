import { useMutation } from '@tanstack/react-query'
import { httpClient } from '@/services/api'

// Query Key Constants
export const BONUSES_QUERY_KEYS = {
  BONUS: 'bonus'
}

// Interfaces
export interface Bonus {
  bonusId: string
  playerId: string
  gameId: string
  type: 'FREE_SPINS' | 'CASH' | 'MULTIPLIER' | 'EXTRA_CREDITS'
  value: number
  currency?: string
  expiryDate: string
  status: 'ACTIVE' | 'USED' | 'EXPIRED'
  restrictions?: {
    minBet?: number
    maxBet?: number
    gameIds?: string[]
    wageringRequirement?: number
  }
  createdAt: string
  updatedAt: string
}

export interface CreateBonusRequest {
  playerId: string
  gameId: string
  type: 'FREE_SPINS' | 'CASH' | 'MULTIPLIER' | 'EXTRA_CREDITS'
  value: number
  currency?: string
  expiryDate: string
  restrictions?: {
    minBet?: number
    maxBet?: number
    gameIds?: string[]
    wageringRequirement?: number
  }
}

export interface BonusResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: Bonus
}

export const bonusController = () => {
  // Create bonus
  const useCreateBonus = () =>
    useMutation<BonusResponse, Error, CreateBonusRequest>({
      mutationFn: async (data) => {
        const response = await httpClient.post('/games/bonuses', data)
        return response.data
      }
    })

  return {
    useCreateBonus
  }
}
