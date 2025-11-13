export enum WebSocketEventName {
  REFRESH_WALLET_BALANCES = 'REFRESH_WALLET_BALANCES',
  DISPLAY_NOTIFICATION = 'DISPLAY_NOTIFICATION',
  QUIT_USER_CURRENT_GAME_SESSION = 'QUIT_USER_CURRENT_GAME_SESSION'
}

export interface WebSocketMessage {
  serviceName: string
  eventName: WebSocketEventName
  userId: string
  message?: string
  timestamp: string
  parameters?: Record<string, any>
}

export interface RefreshWalletBalancesMessage extends WebSocketMessage {
  eventName: WebSocketEventName.REFRESH_WALLET_BALANCES
  parameters: Record<string, string | number>
}

export interface DisplayNotificationMessage extends WebSocketMessage {
  eventName: WebSocketEventName.DISPLAY_NOTIFICATION
  message: string
}

export interface QuitGameSessionMessage extends WebSocketMessage {
  eventName: WebSocketEventName.QUIT_USER_CURRENT_GAME_SESSION
  message: string
}
