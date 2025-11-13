import { FiatCurrencySymbol } from '@/constants/fund.constants'

export const getCurrencySymbol = (currency: string) => {
  return (
    FiatCurrencySymbol?.[currency as keyof typeof FiatCurrencySymbol] || '$'
  )
}
