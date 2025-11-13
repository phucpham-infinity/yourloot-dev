import RectangleSvg from '@/assets/images/warning-icon.svg'
import useToast from '@/hooks/use-toast'
import { queryClient } from '@/services'
import {
  PROMOTIONS_QUERY_KEYS,
  promotionsController
} from '@/services/controller/promotions'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Custom hook for promo code functionality
 *
 * This hook handles:
 * - Promo code state management
 * - Promo code validation and application
 * - Success/error handling with dialogs and toasts
 * - Query cache invalidation
 */
export function usePromoCode() {
  const { t } = useTranslation()
  const toast = useToast()
  const [promoCode, setPromoCode] = useState('')
  const [promoCodeError, setPromoCodeError] = useState('')
  const [isConfirmationDrawerOpen, setIsConfirmationDrawerOpen] =
    useState(false)
  const [confirmationData, setConfirmationData] = useState<{
    onCancel: () => void
    onConfirm: () => void
  } | null>(null)

  // CustomDialog state management
  const [isCustomDialogOpen, setIsCustomDialogOpen] = useState(false)
  const [customDialogData, setCustomDialogData] = useState<{
    title?: string
    message?: string
    primaryButtonLabel?: string
    primaryButtonVariant?: string
    secondaryButtonLabel?: string
    onPrimaryButtonClick?: () => void
    onSecondaryButtonClick?: () => void
    imageSrc?: string
    isProcessing?: boolean
    processingLabel?: string
    disableActions?: boolean
  }>({})

  // Loading dialog state for spinner (no buttons)
  const [isLoadingDialogOpen, setIsLoadingDialogOpen] = useState(false)
  const [loadingDialogData, setLoadingDialogData] = useState<{
    message?: string
  }>({})

  const {
    useApplyPromoCode,
    useValidatePromoCodeMutation,
    useApplyPromoCodeMutation
  } = promotionsController()

  const { mutate: applyPromoCode, isPending } = useApplyPromoCode()
  const { mutate: applyPromoCodeMutation, isPending: isApplyPromoCodePending } =
    useApplyPromoCodeMutation()
  const { mutate: validatePromoCode, isPending: isValidatePromoCodePending } =
    useValidatePromoCodeMutation()

  const handleErrorApplyPromoCode = () => {
    setIsCustomDialogOpen(false)
    setIsLoadingDialogOpen(false)
    setCustomDialogData({})
    setLoadingDialogData({})
    const apiMsg = t(
      'register.promoCode.error',
      'You are not eligible for this promo code.'
    )
    setPromoCodeError(apiMsg)
    toast.error(apiMsg)
  }

  const handleSuccessApplyPromoCode = () => {
    setIsCustomDialogOpen(false)
    setIsLoadingDialogOpen(false)
    setCustomDialogData({})
    setLoadingDialogData({})
    // Invalidate all promotion-related queries to reload lists immediately
    queryClient.invalidateQueries({
      queryKey: [PROMOTIONS_QUERY_KEYS.PROMO_CODE_AVAILABEL]
    })
    queryClient.invalidateQueries({
      queryKey: [PROMOTIONS_QUERY_KEYS.ACTIVE_PROMOTIONS]
    })
    queryClient.invalidateQueries({
      queryKey: [PROMOTIONS_QUERY_KEYS.SUGGESTED_PROMOTIONS]
    })
    toast.success(
      t(
        'promotionV2.promoCodeApplied',
        'The code {{code}} is applied successfully'
      ).replace('{{code}}', promoCode)
    )
    setPromoCode('')
  }

  // Combined loading state for applying promo code (always use API state)
  const isApplyingPromoCode =
    isApplyPromoCodePending || isValidatePromoCodePending || isPending

  const handleApplyPromoCode = () => {
    // Clear any previous error
    setPromoCodeError('')

    const code = promoCode.trim()
    if (!code) return

    validatePromoCode(code, {
      onSuccess: (response) => {
        if (response?.isProm && response?.isValid) {
          // Check if mobile to decide between drawer and dialog
          const isMobile =
            typeof window !== 'undefined' && window.innerWidth < 768

          // Return callback functions for dialog/drawer handling
          const onCancel = () => {
            if (isMobile) {
              setIsConfirmationDrawerOpen(false)
              setConfirmationData(null)
            } else {
              setIsCustomDialogOpen(false)
              setCustomDialogData({})
            }
          }

          const onConfirm = () => {
            if (isMobile) {
              setIsConfirmationDrawerOpen(false)
              setConfirmationData(null)
            } else {
              setIsCustomDialogOpen(false)
              setCustomDialogData({})
            }
            // Show loading spinner dialog (no buttons)
            setIsLoadingDialogOpen(true)
            setLoadingDialogData({
              message: t(
                'promotionV2.applyingMessage',
                'Applying promo code. Please wait a little bit ...'
              )
            })
            applyPromoCode(code, {
              onSuccess: handleSuccessApplyPromoCode,
              onError: handleErrorApplyPromoCode
            })
          }

          if (isMobile) {
            // Show drawer for mobile
            setConfirmationData({ onCancel, onConfirm })
            setIsConfirmationDrawerOpen(true)
          } else {
            // Open warning dialog for desktop using CustomDialog
            setCustomDialogData({
              title: t('promotionV2.areYouSure', 'Are you sure?'),
              message: t(
                'promotionV2.warningMessage',
                'All active bonuses will be cancelled if you apply this promo code.'
              ),
              primaryButtonLabel: t('promotionV2.confirm', 'Confirm'),
              primaryButtonVariant: 'default',
              secondaryButtonLabel: t('promotionV2.cancel', 'Cancel'),
              onPrimaryButtonClick: onConfirm,
              onSecondaryButtonClick: onCancel,
              imageSrc: RectangleSvg,
              isProcessing: false,
              disableActions: false
            })
            setIsCustomDialogOpen(true)
          }
        } else if (response?.isValid && !response?.isProm) {
          applyPromoCodeMutation(code, {
            onSuccess: handleSuccessApplyPromoCode,
            onError: handleErrorApplyPromoCode
          })
        } else {
          handleErrorApplyPromoCode()
        }
      },
      onError: handleErrorApplyPromoCode
    })
  }

  const handlePromoCodeClick = (code: string) => {
    setPromoCode(code)
  }

  return {
    promoCode,
    setPromoCode,
    promoCodeError,
    isApplyingPromoCode,
    handleApplyPromoCode,
    handlePromoCodeClick,
    isConfirmationDrawerOpen,
    setIsConfirmationDrawerOpen,
    confirmationData,
    // CustomDialog states
    isCustomDialogOpen,
    setIsCustomDialogOpen,
    customDialogData,
    setCustomDialogData,
    // Loading dialog states (spinner with no buttons)
    isLoadingDialogOpen,
    setIsLoadingDialogOpen,
    loadingDialogData,
    setLoadingDialogData
  }
}
