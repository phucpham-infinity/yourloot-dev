import { RouteObject } from 'react-router-dom'

import NewWalletLayout from './new-wallet.layout'
import NewWalletMain from './main'
import NewWalletCoinWallet from './coin-wallet'
import NewWalletFiatWallet from './fiat-wallet'

export const newWalletRoutes: RouteObject[] = [
  {
    path: '/new-wallet',
    element: <NewWalletLayout />,
    children: [
      {
        path: '',
        element: <NewWalletMain />
      },
      {
        path: 'coin',
        element: <NewWalletCoinWallet />
      },
      {
        path: 'fiat',
        element: <NewWalletFiatWallet />
      }
    ]
  }
]
