import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { isMobile } from 'react-device-detect'

interface MobileRedirectGuardProps {
  children: React.ReactNode
  replace?: boolean
}

export function MobileRedirectGuard({
  children,
  replace
}: MobileRedirectGuardProps) {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // If mobile and path doesn't include '/v2', redirect to v2 home
    if (isMobile && !location.pathname.includes('/v2')) {
      if (replace) {
        const resultUrl = window.location.href
          .replace(/\/auth/g, '/v2/auth')
          .replace(window.location.origin, '')
        navigate(resultUrl, { replace: true })
      } else {
        navigate(`/${location.search}`, { replace: true })
      }
    }
  }, [isMobile, location.pathname, navigate])

  return <>{children}</>
}
