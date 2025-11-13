import { RouteObject } from 'react-router-dom'

import MainLayout from '@/components/common/main-layout'
import DepositLayout from './deposit.layout'

import BankcardIndex from './bank-card/index'
import BankcardAmount from './bank-card/amount'
import BankcardInfo from './bank-card/info'
import BankcardProcess from './bank-card/process'
import BankcardDone from './bank-card/done'

import SbpIndex from './sbp/index'
import SbpInfo from './sbp/info'
import SbpProcess from './sbp/process'
import SbpDone from './sbp/done'

import CryptocurrencyIndex from './cryptocurrency/index'
import CryptocurrencyNetwork from './cryptocurrency/network'
import CryptocurrencyInfo from './cryptocurrency/info'
import CryptocurrencyProcess from './cryptocurrency/process'
import CryptocurrencyDone from './cryptocurrency/done'

import KassaIndex from './kassa/index'
import KassaProcess from './kassa/process'
import KassaDone from './kassa/done'

import SbpQrIndex from './sbp-qr/index'
import SbpQrProcess from './sbp-qr/process'
import SbpQrDone from './sbp-qr/done'

export const depositRoutes: RouteObject[] = [
  {
    path: '/deposit/:walletName',
    element: (
      <MainLayout hideHeaderFooter>
        <DepositLayout />
      </MainLayout>
    ),
    children: [
      {
        path: 'bank-card',
        children: [
          {
            path: '',
            index: true,
            element: <BankcardIndex />
          },
          {
            path: ':bankName',
            children: [
              {
                path: 'amount',
                element: <BankcardAmount />
              },
              {
                path: 'info',
                element: <BankcardInfo />
              },
              {
                path: 'process',
                element: <BankcardProcess />
              },
              {
                path: 'done',
                element: <BankcardDone />
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
            index: true,
            element: <SbpIndex />
          },
          {
            path: ':bankName',
            children: [
              {
                path: 'info',
                element: <SbpInfo />
              },
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
        path: 'kassa',
        children: [
          {
            path: '',
            children: [
              {
                path: '',
                index: true,
                element: <KassaIndex />
              },
              {
                path: 'process',
                element: <KassaProcess />
              },
              {
                path: 'done',
                element: <KassaDone />
              }
            ]
          }
        ]
      },
      {
        path: 'sbp-qr',
        children: [
          {
            path: '',
            children: [
              {
                path: '',
                index: true,
                element: <SbpQrIndex />
              },
              {
                path: 'process',
                element: <SbpQrProcess />
              },
              {
                path: 'done',
                element: <SbpQrDone />
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
            element: <CryptocurrencyIndex />
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
                    element: <CryptocurrencyNetwork />
                  },
                  {
                    path: ':networkName',
                    children: [
                      {
                        path: 'info',
                        element: <CryptocurrencyInfo />
                      },
                      {
                        path: 'process',
                        element: <CryptocurrencyProcess />
                      },
                      {
                        path: 'done',
                        element: <CryptocurrencyDone />
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
