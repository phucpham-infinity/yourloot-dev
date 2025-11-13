import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react'

const instance =
  import.meta.env.VITE_APP_MODE === 'production'
    ? createInstance({
        urlBase: import.meta.env.VITE_MATOMO_TRACKER_URL,
        siteId: 1
      })
    : null

function MatomoTracker({ children }: { children: any }) {
  if (import.meta.env.VITE_APP_MODE === 'production') {
    // @ts-expect-error - MatomoProvider types are incorrect
    return <MatomoProvider instance={instance}>{children}</MatomoProvider>
  }
  return children
}

export default MatomoTracker
