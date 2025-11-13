import { useMutation } from '@tanstack/react-query'
import { httpClient } from '@/services/api'

// Query Key Constants
export const PLAYER_CALLBACK_QUERY_KEYS = {
  PLAYER_CALLBACK: 'player-callback'
}

// Interfaces
export interface PlayerBalanceRequest {
  playerId: string
  sessionId: string
  gameId: string
  currency: string
  timestamp: string
  requestId: string
  metadata?: Record<string, any>
}

export interface PlayerBalanceResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: {
    playerId: string
    balance: number
    currency: string
    status: 'SUCCESS' | 'ERROR'
    errorCode?: string
    errorMessage?: string
  }
}

export const playerCallbackController = () => {
  // Handle player balance callback
  const usePlayerBalanceCallback = () =>
    useMutation<PlayerBalanceResponse, Error, PlayerBalanceRequest>({
      mutationFn: async (data) => {
        const response = await httpClient.post(
          '/games/v2/a8r_casino.Player/Balance',
          data
        )
        return response.data
      }
    })

  return {
    usePlayerBalanceCallback
  }
}
