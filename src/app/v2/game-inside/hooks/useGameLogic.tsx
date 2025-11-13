import { httpClient } from '@/services/api'
import { gameController, walletsController } from '@/services/controller'
import type { WalletsListResponse } from '@/services/controller/wallets'
import { useWalletStore } from '@/store'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export const useGameLogic = (userId: string, isAuthenticated: boolean) => {
  const { gameId, provider } = useParams()
  const [searchParams] = useSearchParams()
  const { wallets, isLoading: isWalletLoading } = useWalletStore()
  const mode = searchParams.get('mode')
  const { t } = useTranslation()
  const [isOpenBonusWalletErrorDialog, setIsOpenBonusWalletErrorDialog] =
    useState(false)

  const { usePostGame, getMyIp } = gameController()
  const {
    mutate: postGame,
    data: launchUrl,
    isPending: isPostingGame,
    error: postGameError
  } = usePostGame()

  const { data: ip } = getMyIp()

  const { useCheckUserActiveBalanceWallet, useUserActiveBalance } =
    walletsController()

  const {
    mutate: updateActiveBalance,
    isError: isErrorUpdateActiveBalance,
    isSuccess: isSuccessUpdateActiveBalance,
    isPending: isPendingUpdateActiveBalance
  } = useUserActiveBalance(userId!)

  const { data: userActiveBalanceWallet, isLoading: activeBalaceLoading } =
    useCheckUserActiveBalanceWallet(userId!)

  const handleUpdateActiveBalance = () => {
    updateActiveBalance()
  }
  const hasPostedRef = useRef(false)

  // Reset hasPostedRef when gameId or provider changes
  useEffect(() => {
    hasPostedRef.current = false
  }, [gameId, provider])

  const fetchUserWallets = useCallback(async (userId: string) => {
    try {
      const response = await httpClient.get<WalletsListResponse>(
        `/wallets/users/${userId}`
      )
      if (response?.data?.content?.content) {
        useWalletStore.getState().setWallets(response?.data?.content?.content)
      }
    } catch (error) {
      console.error('Failed to fetch user wallets:', error)
    }
  }, [])

  useEffect(() => {
    const hasWallets = Array.isArray(wallets) && wallets.length > 0
    if (
      // !hasPostedRef.current &&
      userId &&
      ip &&
      hasWallets &&
      gameId &&
      provider &&
      !activeBalaceLoading &&
      !isPendingUpdateActiveBalance &&
      !isWalletLoading
    ) {
      // hasPostedRef.current = true
      postGame({
        mode: mode ?? 'real',
        userId: userId || '',
        walletId:
          (userActiveBalanceWallet?.content?.isBonus
            ? wallets.find((wallet) => wallet.isBonus)?.id
            : wallets.find((wallet) => wallet.isDefault)?.id) || '',
        currency:
          (userActiveBalanceWallet?.content?.isBonus
            ? wallets.find((wallet) => wallet.isBonus)?.currency
            : wallets.find((wallet) => wallet.isDefault)?.currency) || 'USD',
        clientType: 'mobile',
        game: `${provider}:${gameId}`,
        ip: ip,
        jurisdiction: 'US',
        locale: navigator.language.split('-')[0] || 'en',
        returnUrl: window?.location?.href,
        depositUrl: window?.location?.href
      })
    }
  }, [
    ip,
    mode,
    userActiveBalanceWallet,
    gameId,
    provider,
    isAuthenticated,
    userId,
    activeBalaceLoading,
    isWalletLoading
  ])

  useEffect(() => {
    return () => {
      fetchUserWallets(userId)
    }
  }, [userId])

  useEffect(() => {
    if (isErrorUpdateActiveBalance) {
      toast.warning(
        t('balance.errorSwitchWallet', "The bonus balance isn't available yet.")
      )
    }
  }, [isErrorUpdateActiveBalance])

  useEffect(() => {
    if (
      postGameError &&
      ((postGameError as any)?.content?.message ===
        "Player can't use bonus wallet now" ||
        (postGameError as any)?.content?.message ===
          'Player can play only bonus games using bonus wallet')
    ) {
      setIsOpenBonusWalletErrorDialog(true)
    }
  }, [postGameError])

  return {
    gameId: gameId!,
    provider: provider!,
    launchUrl,
    isPostingGame,
    postGameError,
    isErrorUpdateActiveBalance,
    handleUpdateActiveBalance,
    isSuccessUpdateActiveBalance,
    isOpenBonusWalletErrorDialog,
    setIsOpenBonusWalletErrorDialog
  }
}
