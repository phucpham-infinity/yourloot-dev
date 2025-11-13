import React, { Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import AuthLayout from './auth.layout'

import FallbackLoading from '@/components/common/fallback-loading'
import RestorePassword from './restore-password'
import ForgotPassword from './forgot-password'

const SignIn = React.lazy(() => import('./login'))
const SignUp = React.lazy(() => import('./register'))

export const authRoutes: RouteObject[] = [
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: (
          <Suspense fallback={<FallbackLoading />}>
            <SignIn />
          </Suspense>
        )
      },
      {
        path: 'register',
        element: (
          <Suspense fallback={<FallbackLoading />}>
            <SignUp />
          </Suspense>
        )
      },
      {
        path: 'forgot-password',
        element: (
          <Suspense fallback={<FallbackLoading />}>
            <ForgotPassword />
          </Suspense>
        )
      },
      {
        path: 'restore-password',
        element: (
          <Suspense fallback={<FallbackLoading />}>
            <RestorePassword />
          </Suspense>
        )
      }
    ]
  }
]
