import { Navigate, RouteObject } from 'react-router-dom'

import { WalletLayout } from './wallet.layout'

import { AuthGuard } from '@/components/guard/auth-guard'
import { CreateWallet } from './create-wallet'
import { ManageFunds } from './manage-funds'
import { TransactionHistory } from './transaction-history'
import TrackingView from '@/components/v2/tracking-view'

export const WalletRoutes: RouteObject[] = [
  {
    path: 'wallet',
    element: (
      <AuthGuard>
        <WalletLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: '',
        index: true,
        element: <Navigate to="manage-funds" replace />
      },
      {
        path: 'manage-funds',
        element: (
          <TrackingView title="Manage Funds">
            <ManageFunds />
          </TrackingView>
        )
      },
      {
        path: 'create',
        element: (
          <TrackingView title="Create Wallet">
            <CreateWallet />
          </TrackingView>
        )
      },
      {
        path: 'transaction-history/:walletId',
        element: (
          <TrackingView title="Transaction History">
            <TransactionHistory />
          </TrackingView>
        )
      }
    ]
  }
]
export default WalletRoutes
