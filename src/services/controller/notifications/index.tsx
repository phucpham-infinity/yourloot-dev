import { useMutation, useQuery } from '@tanstack/react-query'
import { httpClient } from '@/services/api'

// Query Key Constants
export const NOTIFICATIONS_QUERY_KEYS = {
  NOTIFICATIONS: 'notifications',
  USER_NOTIFICATIONS: 'user-notifications'
}

// Interfaces
export interface Notification {
  notificationId: string
  userId: string
  type: string
  title: string
  message: string
  data?: Record<string, any>
  isRead: boolean
  createdAt: string
}

export interface SendNotificationRequest {
  userId: string
  type: string
  title: string
  message: string
  data?: Record<string, any>
}

export interface NotificationsListResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: {
    notifications: Notification[]
    total: number
    page: number
    size: number
  }
}

export interface NotificationResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: Notification
}

export const notificationsController = () => {
  // Send notification
  const useSendNotification = () =>
    useMutation<NotificationResponse, Error, SendNotificationRequest>({
      mutationFn: async (data) => {
        const response = await httpClient.post('/notifications/send', data)
        return response.data
      }
    })

  // Get user notifications
  const useGetUserNotifications = (
    userId: string,
    page: number = 0,
    size: number = 10
  ) =>
    useQuery<NotificationsListResponse>({
      queryKey: [
        NOTIFICATIONS_QUERY_KEYS.USER_NOTIFICATIONS,
        userId,
        page,
        size
      ],
      queryFn: async () => {
        const response = await httpClient.get(`/notifications/${userId}`, {
          params: { page, size }
        })
        return response.data
      },
      enabled: !!userId
    })

  return {
    useSendNotification,
    useGetUserNotifications
  }
}
