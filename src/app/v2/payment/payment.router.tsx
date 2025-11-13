import { Navigate, RouteObject } from 'react-router-dom'

import { PaymentLayout } from './payment.layout'

import { Deposit } from './deposit'
import { Withdraw } from './withdraw'
import { History } from './history'
import { AuthGuard } from '@/components/guard/auth-guard'
import TrackingView from '@/components/v2/tracking-view'

export const PaymentRoutes: RouteObject[] = [
  {
    path: 'payment',
    element: (
      <AuthGuard>
        <PaymentLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: '',
        index: true,
        element: <Navigate to="deposit" replace />
      },
      {
        path: 'deposit',
        element: (
          <TrackingView title="Deposit">
            <Deposit />
          </TrackingView>
        )
      },
      {
        path: 'withdraw',
        element: (
          <TrackingView title="Withdraw">
            <Withdraw />
          </TrackingView>
        )
      },
      {
        path: 'history',
        element: (
          <TrackingView title="History">
            <History />
          </TrackingView>
        )
      }
    ]
  }
]
export default PaymentRoutes
