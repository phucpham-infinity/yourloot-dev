import { useRef, useEffect, useCallback } from 'react'
import { Client, IMessage } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import { useAuthStore } from '@/store'
import { WebSocketMessage } from './types'

interface UseStompWebSocketOptions {
  onMessage?: (message: WebSocketMessage) => void
  onConnect?: () => void
  onDisconnect?: () => void
  onError?: (error: Error) => void
}

export const useStompWebSocket = (options?: UseStompWebSocketOptions) => {
  const clientRef = useRef<Client | null>(null)
  const { accessToken, userId } = useAuthStore()

  const connect = useCallback(() => {
    if (!accessToken || !userId) {
      if (clientRef.current?.active) {
        clientRef.current.deactivate()
      }
      console.warn('Missing accessToken or userId')
      return
    }

    const wsUrl = `${import.meta.env.VITE_WS_NOTIFICATIONS_URI}/notifications/ws`

    const client = new Client({
      webSocketFactory: () => new SockJS(wsUrl),
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('Connected to STOMP WebSocket')
        options?.onConnect?.()
        client.subscribe(`/users/${userId}/feed`, (message: IMessage) => {
          try {
            const data: WebSocketMessage = JSON.parse(message.body)
            options?.onMessage?.(data)
          } catch (error) {
            console.error('Failed to parse WebSocket message:', error)
          }
        })
      },
      onDisconnect: () => {
        console.log('Disconnected from STOMP WebSocket')
        options?.onDisconnect?.()
      },
      onWebSocketError: (event: any) => {
        console.log('WebSocket error:', event)
      },
      onStompError: (frame) => {
        console.log('STOMP error:', frame.headers['message'])
        options?.onError?.(new Error(frame.headers['message']))
      }
    })

    clientRef.current = client
    client.activate()
  }, [accessToken, userId])

  const disconnect = useCallback(() => {
    if (clientRef.current?.active) {
      clientRef.current.deactivate()
    }
  }, [])

  useEffect(() => {
    connect()
    return () => {
      disconnect()
    }
  }, [accessToken, userId])

  return {
    client: clientRef.current,
    disconnect,
    reconnect: connect
  }
}

export const useReactQuerySubscription = useStompWebSocket

export * from './types'
