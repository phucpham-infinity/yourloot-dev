import { useMutation } from '@tanstack/react-query'
import { httpClient } from '@/services/api'

// Query Key Constants
export const TARGET_SEGMENT_QUERY_KEYS = {
  TARGET_SEGMENT: 'target-segment'
}

// Interfaces
export interface TargetSegment {
  targetSegmentId: string
  name: string
  description: string
  criteria: Record<string, any>
  status: 'ACTIVE' | 'INACTIVE'
  createdAt: string
  updatedAt: string
}

export interface CreateTargetSegmentRequest {
  name: string
  description: string
  criteria: Record<string, any>
}

export interface TargetSegmentResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: TargetSegment
}

export const targetSegmentController = () => {
  // Create target segment
  const useCreateTargetSegment = () =>
    useMutation<TargetSegmentResponse, Error, CreateTargetSegmentRequest>({
      mutationFn: async (data) => {
        const response = await httpClient.post(
          '/loyalty/target-segment/create',
          data
        )
        return response.data
      }
    })

  // Delete target segment
  const useDeleteTargetSegment = () =>
    useMutation<void, Error, string>({
      mutationFn: async (targetSegmentId) => {
        const response = await httpClient.delete(
          `/loyalty/target-segment/${targetSegmentId}`
        )
        return response.data
      }
    })

  return {
    useCreateTargetSegment,
    useDeleteTargetSegment
  }
}
