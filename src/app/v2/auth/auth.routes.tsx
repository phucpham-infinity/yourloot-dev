import React, { Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import AuthLayoutV2 from './auth.layout'

import FallbackLoading from '@/components/common/fallback-loading'
import ForgotPasswordV2 from './forgot-password'
import RestorePasswordV2 from './restore-password'

const SignInV2 = React.lazy(() => import('./login/login'))
const SignUpV2 = React.lazy(() => import('./register'))
import TrackingView from '@/components/v2/tracking-view'

export const authRoutesV2: RouteObject[] = [
  {
    path: 'auth',
    element: <AuthLayoutV2 />,
    children: [
      {
        path: 'login',
        element: (
          <Suspense fallback={<FallbackLoading />}>
            <TrackingView title="Login">
              <SignInV2 />
            </TrackingView>
          </Suspense>
        )
      },
      {
        path: 'register',
        element: (
          <Suspense fallback={<FallbackLoading />}>
            <TrackingView title="Register">
              <SignUpV2 />
            </TrackingView>
          </Suspense>
        )
      },
      {
        path: 'forgot-password',
        element: (
          <Suspense fallback={<FallbackLoading />}>
            <TrackingView title="Forgot Password">
              <ForgotPasswordV2 />
            </TrackingView>
          </Suspense>
        )
      },
      {
        path: 'restore-password',
        element: (
          <Suspense fallback={<FallbackLoading />}>
            <TrackingView title="Restore Password">
              <RestorePasswordV2 />
            </TrackingView>
          </Suspense>
        )
      }
    ]
  }
]
