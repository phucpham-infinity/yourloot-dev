import { RouteObject } from 'react-router'
import PaymentRoutes from './payment/payment.router'

import BalanceV2 from './balance'
import AboutPageV2 from './general/about'
import BonusTermsConditionsPageV2 from './general/bonus-terms'
import ContactPageV2 from './general/contact'
import CookiePolicyPageV2 from './general/cookie'
import LoyaltyProgramV2 from './general/loyalty'
import PolicyPageV2 from './general/policy'
import ResponsibleGamingPageV2 from './general/responsible'
import TermsPageV2 from './general/terms'
import HomeV2 from './home'
import GameCategoryPageV2 from './home/pages/Category'
import FavoriesPageV2 from './home/pages/Favories'
import GameProviderPageV2 from './home/pages/Provider'

import { authRoutesV2 } from './auth/auth.routes'
import GameInsideV2 from './game-inside'
import FAQPageV2 from './general/faq'
import GameIdsPageV2 from './home/pages/GameIds'
import NewWalletLayoutV2 from './new-wallet'
import NotificationsV2 from './notification'
import ProfilePageV2 from './profile'
import Promotion from './promotion'
import ActivePromotionDetail from './promotion/active-promotion'
import V2Layout from './main.layout'
import WalletRoutes from './wallet/wallet.router'
import GameContentV2 from './home/pages/GameContent'
import BonusLanding from './landing/bonus-landing'
import Store from './store'
import TrackingView from '@/components/v2/tracking-view'

export const v2Routes: RouteObject[] = [
  {
    path: '/',
    element: <V2Layout />,
    children: [
      {
        path: '',
        element: (
          <TrackingView title="Home">
            <HomeV2 />
          </TrackingView>
        )
      },
      {
        path: 'profile',
        element: (
          <TrackingView title="Profile">
            <ProfilePageV2 />
          </TrackingView>
        )
      },
      {
        path: 'favorites',
        element: (
          <TrackingView title="Favorites">
            <FavoriesPageV2 />
          </TrackingView>
        )
      },
      {
        path: 'game-ids',
        element: (
          <TrackingView title="Game IDs">
            <GameIdsPageV2 />
          </TrackingView>
        )
      },
      {
        path: 'game-category',
        element: (
          <TrackingView title="Game Category">
            <GameCategoryPageV2 />
          </TrackingView>
        )
      },
      {
        path: 'game-content',
        element: (
          <TrackingView title="Game Content">
            <GameContentV2 />
          </TrackingView>
        )
      },
      {
        path: 'game-provider/:provider',
        element: (
          <TrackingView title="Game Provider">
            <GameProviderPageV2 />
          </TrackingView>
        )
      },
      {
        path: 'game-inside/:provider/:gameId',
        element: (
          <TrackingView title="Game Inside">
            <GameInsideV2 />
          </TrackingView>
        )
      },
      {
        path: 'terms-and-conditions',
        element: (
          <TrackingView title="Terms and Conditions">
            <TermsPageV2 />
          </TrackingView>
        )
      },
      {
        path: 'privacy-policy',
        element: (
          <TrackingView title="Privacy Policy">
            <PolicyPageV2 />
          </TrackingView>
        )
      },
      {
        path: 'kyc-policy',
        element: (
          <TrackingView title="KYC Policy">
            <CookiePolicyPageV2 />
          </TrackingView>
        )
      },
      {
        path: 'responsible-gaming',
        element: (
          <TrackingView title="Responsible Gaming">
            <ResponsibleGamingPageV2 />
          </TrackingView>
        )
      },
      {
        path: 'loyalty-program',
        element: (
          <TrackingView title="Loyalty Program">
            <LoyaltyProgramV2 />
          </TrackingView>
        )
      },
      {
        path: 'bonus-terms-conditions',
        element: (
          <TrackingView title="Bonus Terms and Conditions">
            <BonusTermsConditionsPageV2 />
          </TrackingView>
        )
      },
      {
        path: 'contact',
        element: (
          <TrackingView title="Contact">
            <ContactPageV2 />
          </TrackingView>
        )
      },
      {
        path: 'about',
        element: (
          <TrackingView title="About">
            <AboutPageV2 />
          </TrackingView>
        )
      },
      {
        path: 'faq',
        element: (
          <TrackingView title="FAQ">
            <FAQPageV2 />
          </TrackingView>
        )
      },
      {
        path: 'manage-funds',
        element: (
          <TrackingView title="Manage Funds">
            <BalanceV2 />
          </TrackingView>
        )
      },
      {
        path: 'new-wallet',
        element: (
          <TrackingView title="New Wallet">
            <NewWalletLayoutV2 />
          </TrackingView>
        )
      },
      {
        path: 'promotion',
        element: (
          <TrackingView title="Promotion">
            <Promotion />
          </TrackingView>
        )
      },
      {
        path: 'promotion/:status/:promotionId/:promoType',
        element: (
          <TrackingView title="Active Promotion Detail">
            <ActivePromotionDetail />
          </TrackingView>
        )
      },
      {
        path: 'notification',
        element: (
          <TrackingView title="Notifications">
            <NotificationsV2 />
          </TrackingView>
        )
      },
      {
        path: 'bonus-landing',
        element: (
          <TrackingView title="Bonus Landing">
            <BonusLanding />
          </TrackingView>
        )
      },
      {
        path: 'store',
        element: (
          <TrackingView title="Store">
            <Store />
          </TrackingView>
        )
      },
      ...WalletRoutes,
      ...PaymentRoutes
    ]
  },
  {
    path: '/',
    children: [...authRoutesV2]
  }
]
