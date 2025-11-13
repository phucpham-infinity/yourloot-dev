import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { walletsController } from '@/services/controller'
import { useAuthStore } from '@/store'

export function useBalanceManager() {
  const { t } = useTranslation()
  const { userId } = useAuthStore()
  
  const { useUserActiveBalance, useCheckUserActiveBalanceWallet } =
    walletsController()

  const { data: userActiveBalanceWallet } = useCheckUserActiveBalanceWallet(
    userId!
  )

  const [activeBalance, setActiveBalance] = useState(
    userActiveBalanceWallet?.content?.isBonus
  )

  const {
    mutate: updateActiveBalance,
    isSuccess: isSuccessUpdateActiveBalance,
    isError: isErrorUpdateActiveBalance
  } = useUserActiveBalance(userId!)

  // Update active balance state when API data changes
  useEffect(() => {
    if (userActiveBalanceWallet) {
      setActiveBalance(userActiveBalanceWallet?.content?.isBonus)
    }
  }, [userActiveBalanceWallet])

  // Handle API response feedback
  useEffect(() => {
    if (isSuccessUpdateActiveBalance) {
      toast.success(
        userActiveBalanceWallet?.content?.isBonus
          ? t('header.bonusWalletActive', 'Bonus balance activated.')
          : t('header.defaultWalletActive', 'Primary balance activated.')
      )
    }

    if (isErrorUpdateActiveBalance) {
      toast.warning(
        t('balance.errorSwitchWallet', "The bonus balance isn't available yet.")
      )
    }
  }, [
    isSuccessUpdateActiveBalance, 
    isErrorUpdateActiveBalance, 
    userActiveBalanceWallet?.content?.isBonus,
    t
  ])

  const handleUpdateActiveBalance = () => {
    // Immediately toggle UI state without showing confirmation dialog
    setActiveBalance((prev) => !prev)
    // Call API to persist the change
    updateActiveBalance()
  }

  return {
    activeBalance,
    handleUpdateActiveBalance,
    isLoading: false // You can add loading state if needed
  }
}