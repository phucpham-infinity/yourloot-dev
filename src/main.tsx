import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { appRoutes } from './app/app.routes'
import { QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import { queryClient } from './services'
import * as Sentry from '@sentry/react'
import { FlagsmithProvider } from 'flagsmith/react'
import { initFeatureFlags, featureFlags } from '@/lib/feature-flags'
import { bootstrapTelegramApp } from '@/lib/telegram-miniapp/bootstrap'
import { initEruda } from '@/lib/eruda/init'
import MatomoTracker from '@/lib/matomo-tracker'

import './lib/i18n'
import '@/lib/telegram-miniapp/mock-env'

if (import.meta.env.VITE_APP_MODE === 'production') {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.VITE_APP_MODE,
    tracesSampleRate: 1.0
  })
}

if (import.meta.env.VITE_APP_MODE !== 'production') {
  console.log('import.meta.env', import.meta.env)
}

;(async () => {
  try {
    // Init mobile debugger (Eruda) at app root based on env
    await initEruda()
    await bootstrapTelegramApp()
    await initFeatureFlags()
    createRoot(document.getElementById('root')!).render(
      <MatomoTracker>
        <FlagsmithProvider flagsmith={featureFlags}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={appRoutes} />
            <ToastContainer position="top-right" theme="dark" />
          </QueryClientProvider>
        </FlagsmithProvider>
      </MatomoTracker>
    )
  } catch (e) {
    console.error(e)
  }
})()
