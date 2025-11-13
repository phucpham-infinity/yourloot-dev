import { useMutation } from '@tanstack/react-query'
import { httpClient } from '@/services/api'

// Query Key Constants
export const USER_EVENTS_QUERY_KEYS = {
  USER_EVENT: 'user-event'
}

// Interfaces
export interface UserEvent {
  eventId: string
  userId: string
  eventType: string
  eventData: Record<string, any>
  timestamp: string
  source: string
  processed: boolean
  createdAt: string
}

export interface CreateUserEventRequest {
  userId: string
  eventType: string
  eventData: Record<string, any>
  source?: string
}

export interface UserEventResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: UserEvent
}

export const userEventsController = () => {
  // Create user event
  const useCreateUserEvent = () =>
    useMutation<UserEventResponse, Error, CreateUserEventRequest>({
      mutationFn: async (data) => {
        const response = await httpClient.post(
          '/loyalty/user-event/create',
          data
        )
        return response.data
      }
    })

  return {
    useCreateUserEvent
  }
}
