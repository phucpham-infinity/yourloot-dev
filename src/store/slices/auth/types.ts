export interface User {
  id?: string
  first_name?: string
  last_name?: string
  username?: string
  photo_url?: string
  email?: string
  auth_date?: string
  hash?: string
  role?: 'admin' | 'user'
  isTelegramAuthenticated: boolean
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  accessToken: string | null
  refreshToken: string | null
  userId: string | null
  userIp: string | null
  sessionNotActive: boolean
  launchParams: any | null
  setUserIp: () => void
  setLaunchParams: (launchParams: any) => void
}

export interface AuthActions {
  setUser: (user: User | null) => void
  setAccessToken: (token: string | null, refreshToken: string | null) => void
  setUserId: (userId: string | null) => void
  setSessionNotActive: (sessionNotActive: boolean) => void
  setUserIp: () => void
  logout: () => void
}

export type AuthStore = AuthState & AuthActions
