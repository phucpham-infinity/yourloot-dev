import WelcomeBonus from '@/assets/images/achievement/Welcome bonus.svg'
import WelcomeBonusNoShadow from '@/assets/images/achievement/Welcome bonus_no_shadow.svg'
import PermanentBonus from '@/assets/images/achievement/Player permanent.svg'
import PermanentBonusNoShadow from '@/assets/images/achievement/Player permanent_no_shadow.svg'

import Explorer from '@/assets/images/achievement/explore.svg'
import ExplorerNoShadow from '@/assets/images/achievement/explore_no_shadow.svg'
// import ExplorerNoShadowV2 from '@/assets/icons/v2/achievements/explore.svg'
// import ExplorerV2 from '@/assets/icons/v2/achievements/explore.svg'

import CryptoWallet from '@/assets/images/achievement/crypto.svg'
import CryptoWalletNoShadow from '@/assets/images/achievement/crypto.svg'
// import CoinCollector from '@/assets/images/achievement/Coins.svg'
// import CoinCollectorNoShadow from '@/assets/images/achievement/Coins_no_shadow.svg'
import SecurityFirst from '@/assets/images/achievement/security.svg'
import SecurityFirstNoShadow from '@/assets/images/achievement/security_no_shadow.svg'
import Master from '@/assets/images/achievement/Crown.svg'
import MasterNoShadow from '@/assets/images/achievement/Crown_no_shadow.svg'
import FirstStep from '@/assets/images/achievement/Step.svg'
import FirstStepNoShadow from '@/assets/images/achievement/Step_no_shadow.svg'
// import InGameReward from '@/assets/images/achievement/Reward.svg'
// import InGameRewardNoShadow from '@/assets/images/achievement/Reward_no_shadow.svg'
import PaymentMethod from '@/assets/images/achievement/payment.svg'
import PaymentMethodNoShadow from '@/assets/images/achievement/payment_no_shadow.svg'
import PlayLikePro from '@/assets/images/achievement/Pro.svg'
import PlayLikeProNoShadow from '@/assets/images/achievement/Pro_no_shadow.svg'
import SlotAdventure from '@/assets/images/achievement/Slot.svg'
import SlotAdventureNoShadow from '@/assets/images/achievement/Slot.svg'

// Desktop-only V2 icons (fallback to old if not present in environment)
import WelcomeBonusV2 from '@/assets/images/achievenment_v2/gift.svg'
import PermanentBonusV2 from '@/assets/images/achievenment_v2/user.svg'
import ExplorerV2Desktop from '@/assets/images/achievenment_v2/explore.svg'
import CryptoWalletV2 from '@/assets/images/achievenment_v2/whale.svg'
// import CoinCollectorV2 from '@/assets/images/achievenment_v2/Coins.svg'
import SecurityFirstV2 from '@/assets/images/achievenment_v2/Shield Done.svg'
import MasterV2 from '@/assets/images/achievenment_v2/Star_circle.svg'
import FirstStepV2 from '@/assets/images/achievenment_v2/Stairs.svg'
// import InGameRewardV2 from '@/assets/images/achievenment_v2/Reward.svg'
import PaymentMethodV2 from '@/assets/images/achievenment_v2/Master Card.svg'
import PlayLikeProV2 from '@/assets/images/achievenment_v2/King.svg'
import SlotAdventureV2 from '@/assets/images/achievenment_v2/cherry.svg'

import { isMobile } from 'react-device-detect'

interface Map {
  [key: string]: any | undefined
}

const ICON_MAP: Map = {
  WB_BONUS: {
    shadow: isMobile ? WelcomeBonus : WelcomeBonusV2,
    noShadow: isMobile ? WelcomeBonusNoShadow : WelcomeBonusV2
  },
  PERMANENT_PLAYER: {
    shadow: isMobile ? PermanentBonus : PermanentBonusV2,
    noShadow: isMobile ? PermanentBonusNoShadow : PermanentBonusV2
  },
  EXPLORER: {
    shadow: isMobile ? Explorer : ExplorerV2Desktop,
    noShadow: isMobile ? ExplorerNoShadow : ExplorerV2Desktop
  },
  CRYPTO_WHALE: {
    shadow: isMobile ? CryptoWallet : CryptoWalletV2,
    noShadow: isMobile ? CryptoWalletNoShadow : CryptoWalletV2
  },
  // BBK_IN_ACTION: {
  //   shadow: isMobile ? CoinCollector : CoinCollectorV2,
  //   noShadow: isMobile ? CoinCollectorNoShadow : CoinCollectorV2
  // },
  SECURITY_FIRST: {
    shadow: isMobile ? SecurityFirst : SecurityFirstV2,
    noShadow: isMobile ? SecurityFirstNoShadow : SecurityFirstV2
  },
  GURU: {
    shadow: isMobile ? Master : MasterV2,
    noShadow: isMobile ? MasterNoShadow : MasterV2
  },
  FIRST_STEPS: {
    shadow: isMobile ? FirstStep : FirstStepV2,
    noShadow: isMobile ? FirstStepNoShadow : FirstStepV2
  },
  // IN_GAME_BONUSES: {
  //   shadow: isMobile ? InGameReward : InGameRewardV2,
  //   noShadow: isMobile ? InGameRewardNoShadow : InGameRewardV2
  // },
  PAYMENT_METHODS: {
    shadow: isMobile ? PaymentMethod : PaymentMethodV2,
    noShadow: isMobile ? PaymentMethodNoShadow : PaymentMethodV2
  },
  PLAYING_THE_BEST: {
    shadow: isMobile ? PlayLikePro : PlayLikeProV2,
    noShadow: isMobile ? PlayLikeProNoShadow : PlayLikeProV2
  },
  SLOT_TRAVELLER: {
    shadow: isMobile ? SlotAdventure : SlotAdventureV2,
    noShadow: isMobile ? SlotAdventureNoShadow : SlotAdventureV2
  }
}

export default function getAchievementDataSource(key: string) {
  return ICON_MAP[key]
    ? ICON_MAP[key]
    : {
        shadow: WelcomeBonus,
        noShadow: WelcomeBonusNoShadow
      }
}
