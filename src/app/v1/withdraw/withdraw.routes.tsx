import { RouteObject } from 'react-router-dom'

import WithdrawLayout from './withdraw.layout'
import MainLayout from '@/components/common/main-layout'

import BankCardIndex from './bank-card/index'
import BankCardProcess from './bank-card/process'
import BankCardDone from './bank-card/done'

import CryptoCurrencyIndex from './cryptocurrency/index'
import CryptoCurrencyInfo from './cryptocurrency/info'
import CryptoCurrencyProcess from './cryptocurrency/process'
import CryptoCurrencyDone from './cryptocurrency/done'
import CryptoCurrencyNetwork from './cryptocurrency/network'

import SbpIndex from './sbp/index'
import SbpProcess from './sbp/process'
import SbpDone from './sbp/done'

export const withdrawRoutes: RouteObject[] = [
  {
    path: '/withdraw/:walletName',
    element: (
      <MainLayout hideHeaderFooter>
        <WithdrawLayout />
      </MainLayout>
    ),
    children: [
      {
        path: 'bank-card',
        children: [
          {
            path: '',
            element: <BankCardIndex />
          },
          {
            path: ':bankName',
            children: [
              {
                path: 'process',
                element: <BankCardProcess />
              },
              {
                path: 'done',
                element: <BankCardDone />
              }
            ]
          }
        ]
      },
      {
        path: 'sbp',
        children: [
          {
            path: '',
            element: <SbpIndex />
          },
          {
            path: ':bankName',
            children: [
              {
                path: 'process',
                element: <SbpProcess />
              },
              {
                path: 'done',
                element: <SbpDone />
              }
            ]
          }
        ]
      },
      {
        path: 'cryptocurrency',
        children: [
          {
            path: '',
            index: true,
            element: <CryptoCurrencyIndex />
          },
          {
            path: ':cryptocurrencyName',
            children: [
              {
                path: 'network',
                children: [
                  {
                    path: '',
                    index: true,
                    element: <CryptoCurrencyNetwork />
                  },
                  {
                    path: ':networkName',
                    children: [
                      {
                        path: 'info',
                        element: <CryptoCurrencyInfo />
                      },

                      {
                        path: 'process',
                        element: <CryptoCurrencyProcess />
                      },
                      {
                        path: 'done',
                        element: <CryptoCurrencyDone />
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]
