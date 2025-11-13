import CustomButton from '@/components/common/custom-button'
import { httpClient } from '@/services/api'
import { walletsController } from '@/services/controller'
import { useAuthStore, useDialogStore } from '@/store'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

interface WalletData {
  id: string
  currency: string
}

interface UseChangeMainWalletDialogOptions {
  zIndex?: number
  onSuccess?: () => void
}

export const useChangeMainWalletDialog = (
  options: UseChangeMainWalletDialogOptions = {}
) => {
  const { zIndex = 99999, onSuccess } = options
  const dialog = useDialogStore()
  const { t } = useTranslation()
  const { useUpdateMainWallet } = walletsController()
  const { userId } = useAuthStore()

  // Store current wallet data in refs
  const walletDataRef = useRef<WalletData>({ id: '', currency: '' })
  const tRef = useRef(t)
  const errorRef = useRef<any>(null)

  const {
    mutate: updateMainWallet,
    isSuccess: isSuccessSwitchMain,
    isError: isErrorSwitchMain,
    error: errorSwitchMain,
    isPending: isUpdatingMainWallet
  } = useUpdateMainWallet(walletDataRef.current.id)

  useEffect(() => {
    if (isUpdatingMainWallet) {
      dialog.openBasicDialog({
        type: 'loading',
        meta: {
          zIndex,
          description: 'Your wallet is switching. Please wait a little bit ...'
        }
      })
    }
  }, [isUpdatingMainWallet])

  const { mutate: checkBonusWalletCanBeUsed, isPending: isCheckingBonus } =
    useMutation({
      mutationFn: async () => {
        const response = await httpClient.get(
          `/wallets/bonus/${userId}/can-be-used`
        )
        return response.data
      },
      onSuccess: () => {
        updateMainWallet({
          userId: userId || '',
          currency: walletDataRef.current.currency || ''
        })
      },
      onError: () => {
        dialog.openBasicDialog({
          type: 'warning',
          meta: {
            zIndex,
            description: `The bonus balance isn't available it`,
            button: (
              <div className="w-full">
                <CustomButton
                  variant={'default'}
                  className="w-full text-center"
                  label={'Ok'}
                  onClick={() => {
                    dialog.closeBasicDialog()
                  }}
                />
              </div>
            )
          }
        })
      }
    })

  // Update refs when values change
  tRef.current = t
  errorRef.current = errorSwitchMain

  useEffect(() => {
    if (isSuccessSwitchMain) {
      if (onSuccess) {
        dialog.closeBasicDialog()
        onSuccess()
      } else {
        dialog.openBasicDialog({
          type: 'successful',
          meta: {
            zIndex,
            title: tRef.current('balance.walletChanged.title'),
            description: tRef
              .current('balance.walletChanged.description')
              .replace('USDT', walletDataRef.current.currency),
            button: (
              <div className="w-full">
                <CustomButton
                  variant={'default'}
                  className="w-full text-center"
                  label={tRef.current('balance.walletChanged.great')}
                  onClick={() => {
                    dialog.closeBasicDialog()
                  }}
                />
              </div>
            )
          }
        })
      }
    }

    if (isErrorSwitchMain) {
      dialog.openBasicDialog({
        type: 'warning',
        meta: {
          zIndex,
          title: 'Switching main wallet error',
          description:
            (errorRef.current as any)?.content?.message ||
            `Switching main wallet to ${walletDataRef.current.currency} is failed, please see the error message for more detail!`,
          button: (
            <div className="w-full">
              <CustomButton
                variant={'default'}
                className="w-full text-center"
                label={tRef.current('bonus.close')}
                onClick={() => {
                  dialog.closeBasicDialog()
                }}
              />
            </div>
          )
        }
      })
    }
  }, [isSuccessSwitchMain, isErrorSwitchMain])

  const showConfirmationDialog = (walletData: WalletData) => {
    // Update the ref with current wallet data
    walletDataRef.current = walletData

    dialog.openBasicDialog({
      type: 'warning',
      meta: {
        zIndex,
        title: t('balance.switchWallet.title'),
        description: t('balance.switchWallet.description'),
        button: (
          <div className="w-full inline-flex justify-between items-center gap-3 pr-5">
            <CustomButton
              variant={'muted'}
              className="w-3/5"
              label={t('balance.switchWallet.cancel')}
              onClick={() => dialog.closeBasicDialog()}
            />
            <CustomButton
              variant={'default'}
              className="w-2/5 text-center"
              label={t('balance.switchWallet.confirm')}
              onClick={() => checkBonusWalletCanBeUsed()}
            />
          </div>
        )
      }
    })
  }

  return {
    showConfirmationDialog,
    isSuccessSwitchMain,
    isErrorSwitchMain,
    isLoading: isCheckingBonus
  }
}
