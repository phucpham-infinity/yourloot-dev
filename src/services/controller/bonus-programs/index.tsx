import { useMutation, useQuery } from '@tanstack/react-query'
import { httpClient } from '@/services/api'

// Query Key Constants
export const BONUS_PROGRAMS_QUERY_KEYS = {
  BONUS_PROGRAM: 'bonus-program',
  BONUS_PROGRAMS: 'bonus-programs'
}

// Interfaces
export interface BonusProgram {
  programId: string
  name: string
  description: string
  type: string
  startDate: string
  endDate: string
  rules: Record<string, any>
  rewards: Record<string, any>
  status: 'ACTIVE' | 'INACTIVE'
  createdAt: string
  updatedAt: string
}

export interface CreateBonusProgramRequest {
  name: string
  description: string
  type: string
  startDate: string
  endDate: string
  rules: Record<string, any>
  rewards: Record<string, any>
}

export interface UpdateBonusProgramRequest {
  name?: string
  description?: string
  type?: string
  startDate?: string
  endDate?: string
  rules?: Record<string, any>
  rewards?: Record<string, any>
  status?: 'ACTIVE' | 'INACTIVE'
}

export interface BonusProgramsListResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: {
    programs: BonusProgram[]
    total: number
    page: number
    size: number
  }
}

export interface BonusProgramResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: BonusProgram
}

export const bonusProgramsController = () => {
  // Get all bonus programs
  const useGetAllBonusPrograms = (page: number = 0, size: number = 10) =>
    useQuery<BonusProgramsListResponse>({
      queryKey: [BONUS_PROGRAMS_QUERY_KEYS.BONUS_PROGRAMS, page, size],
      queryFn: async () => {
        const response = await httpClient.get('/loyalty/bonus-programs', {
          params: { page, size }
        })
        return response.data
      }
    })

  // Get single bonus program by ID
  const useGetBonusProgram = (programId: string) =>
    useQuery<BonusProgramResponse>({
      queryKey: [BONUS_PROGRAMS_QUERY_KEYS.BONUS_PROGRAM, programId],
      queryFn: async () => {
        const response = await httpClient.get(
          `/loyalty/bonus-programs/${programId}`
        )
        return response.data
      }
    })

  // Create new bonus program
  const useCreateBonusProgram = () =>
    useMutation<BonusProgramResponse, Error, CreateBonusProgramRequest>({
      mutationFn: async (data) => {
        const response = await httpClient.post('/loyalty/bonus-programs', data)
        return response.data
      }
    })

  // Update bonus program
  const useUpdateBonusProgram = () =>
    useMutation<
      BonusProgramResponse,
      Error,
      { programId: string; data: UpdateBonusProgramRequest }
    >({
      mutationFn: async ({ programId, data }) => {
        const response = await httpClient.put(
          `/loyalty/bonus-programs/${programId}`,
          data
        )
        return response.data
      }
    })

  // Delete bonus program
  const useDeleteBonusProgram = () =>
    useMutation<void, Error, string>({
      mutationFn: async (programId) => {
        const response = await httpClient.delete(
          `/loyalty/bonus-programs/${programId}`
        )
        return response.data
      }
    })

  return {
    useGetAllBonusPrograms,
    useGetBonusProgram,
    useCreateBonusProgram,
    useUpdateBonusProgram,
    useDeleteBonusProgram
  }
}
