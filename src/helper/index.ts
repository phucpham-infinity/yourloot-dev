/**
 * Clears all items in localStorage except for the specified keys
 * @param keysToKeep Array of localStorage keys to preserve
 */
export const clearLocalStorageExcept = (keysToKeep: string[]): void => {
  // Store the values of keys we want to keep
  const preservedValues: Record<string, string> = {}

  // Save values of keys we want to keep
  keysToKeep.forEach((key) => {
    const value = localStorage.getItem(key)
    if (value !== null) {
      preservedValues[key] = value
    }
  })

  // Also preserve all game history keys (gameHistory_*)
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith('gameHistory_')) {
      const value = localStorage.getItem(key)
      if (value !== null) {
        preservedValues[key] = value
      }
    }
  }

  // Clear all localStorage
  localStorage.clear()

  // Restore preserved values
  Object.entries(preservedValues).forEach(([key, value]) => {
    localStorage.setItem(key, value)
  })
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const getCurrencySymbol = (currency: string) => {
  switch (currency) {
    case 'USD':
      return '$' // US Dollars
    case 'RUB':
      return '₽' // Russian Rubles
    case 'EUR':
      return '€' // Euro
    case 'GBP':
      return '£' // Pound
    case 'AMD':
      return '֏' // Armenian dram
    case 'AZN':
      return '₼' // Manat Azerbaijan
    case 'BYN':
      return 'Br' // Belarusian rubles
    case 'KZT':
      return '₸' // Kazakhstani Tenge
    case 'KGS':
      return 'KGS' // Kyrgyz som
    case 'TJS':
      return 'TJS' // Tajikistani somoni
    default:
      return currency ?? '$' // fallback: return code itself
  }
}

export const getUserIpAddress = async (): Promise<string | null> => {
  const ipApis = [
    {
      url: 'https://api.ipify.org?format=json',
      parser: (data: any) => data.ip
    },
    {
      url: 'https://ipinfo.io/json',
      parser: (data: any) => data.ip
    },
    {
      url: 'https://httpbin.org/ip',
      parser: (data: any) => data.origin
    }
  ]

  for (const api of ipApis) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      const response = await fetch(api.url, {
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        return '127.0.0.1'
      }

      const data = await response.json()
      const ip = api.parser(data)

      if (ip) {
        return ip
      }
    } catch (error) {
      console.error(`Failed to get IP from ${api.url}:`, error)
      continue
    }
  }

  return '127.0.0.1'
}
