import BitCoinIcon from '@/assets/icons/coin/bitcoin'
import CoinTotal from '@/assets/icons/coin/coinTotal.svg'
import USDTICon from '@/assets/icons/coin/usdt'
// import AMDICon from '@/assets/icons/fiat/amd'
// import AZNICon from '@/assets/icons/fiat/azn'
// import BYNICon from '@/assets/icons/fiat/byn'
import EUROICon from '@/assets/icons/fiat/euro'
import FiatTotal from '@/assets/icons/fiat/fiatTotal.svg'
import RUBICon from '@/assets/icons/fiat/rub'
import UZSIcon from '@/assets/icons/fiat/uzs'

// import GBPICon from '@/assets/icons/fiat/gbp'
// import KGSICon from '@/assets/icons/fiat/kgs'
// import KZTICon from '@/assets/icons/fiat/kzt'
// import RUBICon from '@/assets/icons/fiat/rub'
// import TJSICON from '@/assets/icons/fiat/tjs'
import USDICon from '@/assets/icons/fiat/usd'
import Bitcoin from '@/assets/images/bitcoin.svg'
import CARDANO from '@/assets/images/cardano.svg'
import ETH from '@/assets/images/eth.svg'
import CurrencyIcons2 from '@/assets/images/header/currency-icons2.svg'
import SOL from '@/assets/images/solana.svg'
import Tether from '@/assets/images/tether.svg'
import TON from '@/assets/images/ton.svg'
import TRX from '@/assets/images/trx.svg'
import UNI from '@/assets/images/uni.svg'
import USDC from '@/assets/images/usdc.svg'
import {
  cryptoCurrencyNetworkKey,
  FiatCurrencySymbolWallet
} from '@/constants/fund.constants'
import { css } from '@/lib/utils'

export const WALLETS = [
  {
    icon: Tether,
    label: 'Tether',
    width: 24,
    currency: 'USDT',
    iconWidth: '21px'
  },
  {
    icon: Bitcoin,
    label: 'Bitcoin',
    width: 24,
    currency: 'BTC',
    iconWidth: '21px'
  },
  {
    icon: ETH,
    label: 'Ethereum',
    width: 32,
    currency: 'ETH',
    iconWidth: '100px'
  },
  {
    icon: USDC,
    label: 'USDC',
    width: 32,
    currency: 'USDC',
    iconWidth: '100px'
  },
  { icon: TRX, label: 'Tron', width: 32, currency: 'TRX', iconWidth: '100px' },
  {
    icon: TON,
    label: 'Toncoin',
    width: 32,
    currency: 'TON',
    iconWidth: '100px'
  },
  { icon: SOL, label: 'Solana', width: 24, currency: 'SOL', iconWidth: '21px' },
  {
    icon: CARDANO,
    label: 'Cardano',
    width: 24,
    currency: 'ADA',
    iconWidth: '21px'
  },
  { icon: UNI, label: 'Uniswap', width: 24, currency: 'UNI', iconWidth: '21px' }
]

export const WALLETS_FIAT = [
  // {
  //   icon: <USDICon />,
  //   label: 'USD',
  //   width: 24,
  //   currency: 'USD',
  //   iconWidth: '21px'
  // }
  // {
  //   icon: <EUROICon />,
  //   label: 'EUR',
  //   width: 24,
  //   currency: 'EUR',
  //   iconWidth: '21px'
  // },
  {
    icon: <RUBICon />,
    label: 'RUB',
    width: 24,
    currency: 'RUB',
    iconWidth: '21px'
  },
  {
    icon: <UZSIcon />,
    label: 'UZS',
    width: 24,
    currency: 'UZS',
    iconWidth: '21px'
  }
  // {
  //   icon: <GBPICon />,
  //   label: 'GBP',
  //   width: 24,
  //   currency: 'GBP',
  //   iconWidth: '21px'
  // },
  // {
  //   icon: <AMDICon />,
  //   label: 'AMD',
  //   width: 32,
  //   currency: 'AMD',
  //   iconWidth: '100px'
  // },
  // {
  //   icon: <AZNICon />,
  //   label: 'AZN',
  //   width: 32,
  //   currency: 'AZN',
  //   iconWidth: '100px'
  // },
  // {
  //   icon: <BYNICon />,
  //   label: 'BYN',
  //   width: 32,
  //   currency: 'BYN',
  //   iconWidth: '100px'
  // },
  // {
  //   icon: <KZTICon />,
  //   label: 'KZT',
  //   width: 32,
  //   currency: 'KZT',
  //   iconWidth: '100px'
  // },
  // {
  //   icon: <KGSICon />,
  //   label: 'KGS',
  //   width: 32,
  //   currency: 'KGS',
  //   iconWidth: '100px'
  // },
  // {
  //   icon: <TJSICON />,
  //   label: 'TJS',
  //   width: 32,
  //   currency: 'TJS',
  //   iconWidth: '100px'
  // }
]

export const cssFn = () => {
  return css`
    &[data-state='active'] {
      background: var(
        --YourLoot-Brand-Gradient-Hover,
        linear-gradient(
          0deg,
          rgba(154, 103, 255, 0.2) 0%,
          rgba(154, 103, 255, 0.2) 100%
        ),
        radial-gradient(
          103.94% 265.37% at 59.95% -118.74%,
          #654ec8 0%,
          #372864 100%
        )
      );
    }
  `
}

export const cssForCard = () => {
  return css`
    .card-item {
      cursor: pointer;
      border-radius: 15px;
      border: 1px solid #493965;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.5) 0%,
        rgba(0, 0, 0, 0.1) 100%
      );
      box-shadow:
        6px 6px 12px 0 rgba(22, 20, 24, 0.5),
        -6px -6px 24px 0 rgba(148, 95, 255, 0.15);
      :hover {
        background:
          linear-gradient(
            0deg,
            rgba(154, 103, 255, 0.2) 0%,
            rgba(154, 103, 255, 0.2) 100%
          ),
          linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.5) 0%,
            rgba(0, 0, 0, 0.1) 100%
          );
      }
      &.active {
        background:
          linear-gradient(
            0deg,
            rgba(154, 103, 255, 0.2) 0%,
            rgba(154, 103, 255, 0.2) 100%
          ),
          linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.5) 0%,
            rgba(0, 0, 0, 0.1) 100%
          );
      }
    }
    &.no-shadow {
      .card-item {
        box-shadow: none;
      }
    }
  `
}

export const getWalletIcon = (
  currency: string,
  options?: {
    className?: string
    size?: 'sm' | 'md' | 'lg' | '14px'
    alt?: string
  }
) => {
  const { className = 'w-4 h-4', size = 'md', alt = currency } = options || {}

  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
    '14px': 'w-[14px] h-[14px]'
  }

  const finalClassName = className === 'w-4 h-4' ? sizeClasses[size] : className

  const cryptoCurrency = cryptoCurrencyNetworkKey[currency]
  if (cryptoCurrency) {
    return <div className={finalClassName}>{cryptoCurrency.icon}</div>
  }

  const fiatIcon =
    FiatCurrencySymbolWallet[currency as keyof typeof FiatCurrencySymbolWallet]
  if (fiatIcon) {
    return <div className={finalClassName}>{fiatIcon}</div>
  }

  const cryptoWallet = WALLETS.find((wallet) => wallet.currency === currency)
  if (cryptoWallet) {
    return <img src={cryptoWallet.icon} alt={alt} className={finalClassName} />
  }

  const fiatWallet = WALLETS_FIAT.find((wallet) => wallet.currency === currency)
  if (fiatWallet) {
    return <div className={finalClassName}>{fiatWallet.icon}</div>
  }

  return <img src={CurrencyIcons2} alt={alt} className={finalClassName} />
}

export const getWalletInfo = (currency: string) => {
  const cryptoCurrency = cryptoCurrencyNetworkKey[currency]
  if (cryptoCurrency) {
    return {
      icon: cryptoCurrency.icon,
      label: cryptoCurrency.name,
      currency: cryptoCurrency.currency,
      width: 24,
      iconWidth: '21px',
      type: 'crypto' as const
    }
  }

  const fiatIcon =
    FiatCurrencySymbolWallet[currency as keyof typeof FiatCurrencySymbolWallet]
  if (fiatIcon) {
    return {
      icon: fiatIcon,
      label: currency,
      currency: currency,
      width: 24,
      iconWidth: '21px',
      type: 'fiat' as const
    }
  }

  const cryptoWallet = WALLETS.find((wallet) => wallet.currency === currency)
  if (cryptoWallet) {
    return {
      ...cryptoWallet,
      type: 'crypto' as const
    }
  }

  const fiatWallet = WALLETS_FIAT.find((wallet) => wallet.currency === currency)
  if (fiatWallet) {
    return {
      ...fiatWallet,
      type: 'fiat' as const
    }
  }

  return null
}

export const getWalletIconWithInfo = (
  currency: string,
  options?: {
    className?: string
    size?: 'sm' | 'md' | 'lg' | '14px'
    alt?: string
    showLabel?: boolean
  }
) => {
  const walletInfo = getWalletInfo(currency)
  const icon = getWalletIcon(currency, options)

  if (!walletInfo || !options?.showLabel) {
    return icon
  }

  return (
    <div className="flex items-center gap-1">
      {icon}
      <span className="text-xs text-gray-500">{walletInfo.label}</span>
    </div>
  )
}

export { BitCoinIcon, CoinTotal, EUROICon, FiatTotal, USDICon, USDTICon }
