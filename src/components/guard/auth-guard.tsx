import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/slices/auth'

interface AuthGuardProps {
  children: React.ReactNode
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  useEffect(() => {
    if (isAuthenticated) return
    const searchParams = new URLSearchParams(location.search)
    const redirectPath = searchParams.has('redirect')
      ? undefined
      : `${location.pathname}${location.search}`

    navigate({
      pathname: '/auth/login',
      search: redirectPath ? `redirect=${redirectPath}` : undefined
    })
  }, [isAuthenticated, location, navigate])

  if (!isAuthenticated) return null

  return <>{children}</>
}
