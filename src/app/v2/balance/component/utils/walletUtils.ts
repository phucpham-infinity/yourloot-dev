import { cryptoCurrencyNetwork, FiatCurrencyCode } from '@/constants'

export interface WalletItem {
  id: string
  currency: string
  network?: string | null
  amount: number
  isDefault: boolean
  isCreated?: boolean
  isBonus?: boolean
}

export interface PlaceholderWallet extends WalletItem {
  isCreated: false
}

export interface SeeMoreButton extends WalletItem {
  id: 'see-more-button'
  isSeeMoreButton: true
  remainingCount: number
}

export type DisplayWallet = WalletItem | PlaceholderWallet | SeeMoreButton

/**
 * Creates a placeholder wallet for currencies that haven't been created yet
 */
export const createPlaceholderWallet = (
  currency: string,
  network?: string | null
): PlaceholderWallet => ({
  id: `placeholder_${currency}_${network || 'default'}`,
  currency,
  network,
  amount: 0,
  isDefault: false,
  isCreated: false
})

/**
 * Generates a complete list of all available wallets including placeholders
 */
export const generateCompleteWalletList = (
  existingWallets: WalletItem[]
): WalletItem[] => {
  // Create a map for quick lookup of existing wallets
  const existingWalletMap = new Map<string, WalletItem>()
  existingWallets
    .filter((wallet) => !wallet.isBonus)
    .forEach((wallet) => {
      const key = `${wallet.currency}_${wallet.network || 'default'}`
      existingWalletMap.set(key, wallet)
    })

  const completeWallets: WalletItem[] = []

  // Add fiat currencies first, with RUB prioritized
  // Create a custom order with RUB first, then the rest
  const fiatCurrenciesWithRubFirst = [
    'RUB',
    'UZS',
    ...FiatCurrencyCode.filter((code) => code !== 'RUB')
  ]

  fiatCurrenciesWithRubFirst.forEach((currencyCode) => {
    // First check if there's an existing wallet with this currency (regardless of network)
    // Prioritize default wallets over bonus wallets to prevent bonus wallet selection when both exist
    const matchingWallets = existingWallets.filter(
      (wallet) =>
        wallet.currency === currencyCode &&
        (wallet.network === null || wallet.network === undefined)
    )

    // Find default wallet first, fallback to any wallet if no default exists
    const existingWallet =
      matchingWallets.find((wallet) => wallet.isDefault) || matchingWallets[0]

    if (existingWallet) {
      completeWallets.push(existingWallet)
    } else {
      completeWallets.push(createPlaceholderWallet(currencyCode, null))
    }
  })

  // Add crypto currencies with networks after fiat currencies
  cryptoCurrencyNetwork.forEach((currency) => {
    // Check if there's a default wallet for this currency (e.g., BTC_default)
    const defaultKey = `${currency.currency}_default`
    const defaultWallet = existingWalletMap.get(defaultKey)

    if (defaultWallet) {
      // If there's a default wallet, only show that and skip all networks
      completeWallets.push(defaultWallet)
    } else if (currency.networks && currency.networks.length > 0) {
      // Check if there are any existing wallets for this currency
      const hasExistingWallets = existingWallets.some(
        (wallet) => wallet.currency === currency.currency
      )
      if (hasExistingWallets) {
        // If currency already has wallets, only show existing networks
        currency.networks.forEach((network) => {
          const key = `${currency.currency}_${network.network}`
          const existingWallet = existingWalletMap.get(key)
          if (existingWallet) {
            completeWallets.push(existingWallet)
          }
        })
      } else {
        // Special rule: For USDC with no existing wallets, show a single placeholder with network null
        if (
          [
            'BTC',
            'USDT',
            'USDC',
            'BNB',
            'ETH',
            'TRX',
            'SOL',
            'ADA',
            'TON',
            'LTC'
          ].includes(currency.currency)
        ) {
          completeWallets.push(createPlaceholderWallet(currency.currency, null))
          return
        }
        // If currency has no wallets, show all available networks
        currency.networks.forEach((network) => {
          const key = `${currency.currency}_${network.network}`
          const existingWallet = existingWalletMap.get(key)

          if (existingWallet) {
            completeWallets.push(existingWallet)
          } else {
            completeWallets.push(
              createPlaceholderWallet(currency.currency, network.network)
            )
          }
        })
      }
    } else {
      // For currencies without networks
      const key = `${currency.currency}_default`
      const existingWallet = existingWalletMap.get(key)

      if (existingWallet) {
        completeWallets.push(existingWallet)
      } else {
        completeWallets.push(createPlaceholderWallet(currency.currency, null))
      }
    }
  })

  return completeWallets
}

/**
 * Creates display wallets with "See More" button when needed
 */
export const createDisplayWallets = (
  allWallets: WalletItem[],
  showAll: boolean,
  maxDisplay: number = 11,
  page: number = 0
): DisplayWallet[] => {
  if (showAll) {
    return allWallets
  }
  const showNum = maxDisplay + page * maxDisplay
  const walletsToShow = allWallets.slice(0, showNum)
  const remaining = allWallets.length - showNum

  if (remaining > 0) {
    walletsToShow.push({
      id: 'see-more-button',
      isSeeMoreButton: true,
      remainingCount: remaining
    } as SeeMoreButton)
  }

  return walletsToShow
}

/**
 * Checks if a wallet is a placeholder
 */
export const isPlaceholderWallet = (walletId: string): boolean => {
  return walletId.startsWith('placeholder_')
}

/**
 * Finds a wallet by ID in the wallet list
 */
export const findWalletById = (
  wallets: WalletItem[],
  walletId: string
): WalletItem | undefined => {
  return wallets.find((w) => w.id === walletId)
}
