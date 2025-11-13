import useToast from '@/hooks/use-toast.tsx'
import { walletsController } from '@/services/controller'
import { useAuthStore } from '@/store'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import {
  WalletItem,
  findWalletById,
  isPlaceholderWallet
} from '../component/utils/walletUtils.ts'

interface SpinnerDialog {
  isOpen: boolean
  message: string
}

interface WalletOperationsProps {
  allAvailableWallets: WalletItem[]
}

export const useWalletOperations = ({
  allAvailableWallets
}: WalletOperationsProps) => {
  const { t } = useTranslation()
  const toast = useToast()
  const location = useLocation()
  const { userId } = useAuthStore()
  const [spinnerDialog, setSpinnerDialog] = useState<SpinnerDialog>({
    isOpen: false,
    message: ''
  })

  const { useCreateWallet, useUpdateMainWallet2 } = walletsController()

  const { mutate: createWallet, isPending: isCreatingWallet } =
    useCreateWallet()

  const { mutate: updateMainWallet, isPending: isUpdatingMainWallet } =
    useUpdateMainWallet2()

  const showSpinner = (message: string) => {
    setSpinnerDialog({ isOpen: true, message })
  }

  const hideSpinner = () => {
    setSpinnerDialog({ isOpen: false, message: '' })
  }

  const showSuccessToast = (message: string) => {
    toast.success(message)
  }

  const showErrorToast = (message: string) => {
    toast.error(message)
  }

  /**
   * Handles creating a new wallet and setting it as primary
   */
  const handleCreateAndSetPrimary = (wallet: WalletItem) => {
    showSpinner(t('wallet.creatingWallet', 'Creating wallet...'))

    createWallet(
      {
        userId: userId!,
        currency: wallet.currency,
        network: wallet.network || undefined,
        initialBalance: 0
      },
      {
        onSuccess: (response) => {
          const newWalletId = response.content.id

          showSpinner(t('wallet.makingPrimary', 'Making wallet primary...'))

          updateMainWallet(
            {
              userId: userId!,
              currency: wallet.currency,
              walletId: newWalletId
            },
            {
              onSuccess: () => {
                hideSpinner()
                showSuccessToast(
                  t(
                    'balance.primaryWalletChangedSuccessfully',
                    'Wallet created and set as primary successfully'
                  )
                )

                // Reload page if currently on promotion page
                if (location.pathname.includes('/promotion')) {
                  setTimeout(() => {
                    window.location.reload()
                  }, 1000)
                }
              },
              onError: () => {
                hideSpinner()
                showErrorToast(
                  t(
                    'balance.errorSettingPrimary',
                    'Error setting wallet as primary'
                  )
                )
              }
            }
          )
        },
        onError: () => {
          hideSpinner()

          // Check if the error is 409 (wallet already exists)
          showErrorToast(
            t('balance.errorCreatingWallet', 'Error creating wallet')
          )
        }
      }
    )
  }

  /**
   * Handles setting an existing wallet as primary
   */
  const handleSetExistingWalletPrimary = (
    walletId: string,
    currency: string
  ) => {
    showSpinner(t('wallet.makingPrimary', 'Making wallet primary...'))

    updateMainWallet(
      {
        userId: userId!,
        currency: currency,
        walletId: walletId
      },
      {
        onSuccess: () => {
          hideSpinner()
          // showSuccessToast(
          //   t(
          //     'balance.primaryWalletChangedSuccessfully',
          //     'Wallet changed successfully'
          //   )
          // )

          // Reload page if currently on promotion page
          if (location.pathname.includes('/promotion')) {
            setTimeout(() => {
              window.location.reload()
            }, 1000)
          }
        },
        onError: () => {
          hideSpinner()
          showErrorToast(
            t('balance.errorSettingPrimary', 'Error setting wallet as primary')
          )
        }
      }
    )
  }

  /**
   * Main handler for setting a wallet as primary
   * Determines whether to create new wallet or use existing one
   */
  const handleSetPrimary = (walletId: string, currency: string) => {
    const wallet = findWalletById(allAvailableWallets, walletId)
    const isPlaceholder = isPlaceholderWallet(walletId)

    if (isPlaceholder && wallet) {
      handleCreateAndSetPrimary(wallet)
    } else {
      handleSetExistingWalletPrimary(walletId, currency)
    }
  }

  return {
    spinnerDialog,
    handleSetPrimary,
    isCreatingWallet,
    isUpdatingMainWallet
  }
}
