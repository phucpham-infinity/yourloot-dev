import { useEffect } from 'react'
import { useMatomo } from '@datapunt/matomo-tracker-react'

const TrackingView = ({
  children,
  title
}: {
  children: React.ReactNode
  title: string
}) => {
  const { trackPageView } = useMatomo()

  useEffect(() => {
    if (import.meta.env.VITE_APP_MODE === 'production') {
      trackPageView({ documentTitle: title })
    }
  }, [trackPageView, title])

  return <>{children}</>
}

export default TrackingView
