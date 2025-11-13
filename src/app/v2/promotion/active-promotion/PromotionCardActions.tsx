import CustomDialog from '@/app/v2/promotion/active-promotion/CustomDialog.tsx'
import TermsAndConditions from '@/app/v2/promotion/active-promotion/TermsAndConditions'
import TermsDialogContent from '@/app/v2/promotion/active-promotion/TermsDialogContent'
import RectangleSvg from '@/assets/icons/v2/rectangle.svg'
import CustomButton from '@/components/common/custom-button'
import { CustomDrawer } from '@/components/common/custom-drawer'
import useToast from '@/hooks/use-toast'
import {
  Promotion,
  promotionsController
} from '@/services/controller/promotions'
import { useDialogStore } from '@/store'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { formatDuration } from '../utils/formatDuration'
import promotionMobile from '/public/images/v2/home/promotion-mobile.png'

interface PromotionCardActionsProps {
  promotion: Promotion
  isActive?: boolean
  status?: string
  promoType?: string
  onStatusChange?: (isActive: boolean) => void
}

export default function PromotionCardActions({
  promotion,
  isActive = false,
  status = 'available',
  promoType,
  onStatusChange
}: PromotionCardActionsProps) {
  const { t } = useTranslation()
  const toast = useToast()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isTermsDrawerOpen, setIsTermsDrawerOpen] = useState(false)
  const [isPromotionActive, setIsPromotionActive] = useState(isActive)
  const [dialogType, setDialogType] = useState<'normal' | 'switch'>('normal')
  
  // Real-time timer state for countdown updates
  const [now, setNow] = useState<Date>(new Date())

  useEffect(() => {
    // Update every second for accurate countdown; cleans up on unmount
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  // Initialize the promotions controller hooks
  const {
    useCancelPromotion,
    useCancelBonus,
    useActivatePromotion,
    useActivateBonus,
    useApplyPromoCode,
    useGetActivePromotions
  } = promotionsController()
  const cancelPromotion = useCancelPromotion()
  const cancelBonus = useCancelBonus()
  const activatePromotion = useActivatePromotion()
  const activateBonus = useActivateBonus()
  const applyPromoCode = useApplyPromoCode()
  const { data: activePromotionsData } = useGetActivePromotions('', 0, 100, {
    refetchOnMount: 'always',
    staleTime: 0
  })

  // Keep local active state in sync when parent prop changes
  useEffect(() => {
    setIsPromotionActive(isActive)
  }, [isActive])

  // Memoized computed values
  const promotionState = useMemo(() => {
    const countdownTime = formatDuration(promotion.endDate)
    const isExpired = countdownTime === 'Expired'
    const isCanceled = status === 'canceled'
    const isHidden = promotion?.status === 'HIDDEN'
    const isMutating =
      cancelPromotion.isPending ||
      cancelBonus.isPending ||
      activatePromotion.isPending ||
      applyPromoCode.isPending

    return { isExpired, isCanceled, isHidden, isMutating }
  }, [
    promotion.endDate,
    promotion.status,
    status,
    now,
    cancelPromotion.isPending,
    cancelBonus.isPending,
    activatePromotion.isPending,
    applyPromoCode.isPending
  ])

  // Helper functions
  const isDesktop = useCallback(() => {
    return typeof window !== 'undefined' && window.innerWidth >= 1024
  }, [])

  const closeUI = useCallback(() => {
    if (isDesktop()) {
      useDialogStore.getState().close()
    } else {
      setIsDrawerOpen(false)
    }
  }, [])

  const handleStatusSuccess = useCallback(
    (newStatus: boolean) => {
      const statusKey = newStatus
        ? 'promotionActivated'
        : 'promotionDeactivated'
      toast.success(t(`promotionV2.${statusKey}`, { name: promotion.name }))
      setIsPromotionActive(newStatus)
      closeUI()
      onStatusChange?.(newStatus)
    },
    [t, toast, promotion.name, closeUI, onStatusChange]
  )

  const handleStatusError = useCallback(
    (newStatus: boolean, error: any) => {
      const statusKey = newStatus ? 'failedToActivate' : 'failedToDeactivate'
      toast.error(t(`promotionV2.${statusKey}`, { name: promotion.name }))
      console.error(
        `Error ${newStatus ? 'activating' : 'deactivating'} promotion:`,
        error
      )
    },
    [t, toast, promotion.name]
  )

  const getDialogContent = useCallback(() => {
    if (dialogType === 'switch') {
      return {
        title: t(
          'promotionV2.switchActivePromotion',
          'Switch Active Promotion?'
        ),
        message: t(
          'promotionV2.switchPromotionMessage',
          'You already have an active promotion. Switching to a new one will reset your current progress.'
        ),
        secondaryButtonLabel: t('promotionV2.keepCurrent', 'Keep Current'),
        secondaryButtonVariant: 'muted',
        primaryButtonLabel: t('promotionV2.switch', 'Switch'),
        primaryButtonVariant: 'muted-danger'
      }
    }

    const title = isPromotionActive
      ? t('promotionV2.areYouSure', 'Deactivate promotion?')
      : t('promotionV2.activatePromotion', 'Activate promotion')

    const message = isPromotionActive
      ? t(
          'promotionV2.loseProgress',
          "You'll lose any progress made with this bonus."
        )
      : t(
          'promotionV2.wantToActivate',
          `You'll about active ${promotion.name}`
        ).replace('${promotion.name}', promotion.name)

    return {
      title,
      message,
      primaryButtonLabel: isPromotionActive
        ? t('promotionV2.cancel', 'Keep Active')
        : t('promotionV2.cancel', 'Cancel'),
      primaryButtonVariant: 'muted-danger',
      secondaryButtonLabel: isPromotionActive
        ? t('promotionV2.deactivate', 'Deactivate')
        : t('promotionV2.activate', 'Activate'),
      secondaryButtonVariant: 'muted'
    }
  }, [dialogType, isPromotionActive, t, promotion.name])

  const handleDeactivatePromotion = useCallback(() => {
    const cancelMutation = promotion.isBonus ? cancelBonus : cancelPromotion
    cancelMutation.mutate(promotion.promotionId, {
      onSuccess: () => handleStatusSuccess(false),
      onError: (error) => handleStatusError(false, error)
    })
  }, [
    promotion.isBonus,
    promotion.promotionId,
    cancelBonus,
    cancelPromotion,
    handleStatusSuccess,
    handleStatusError
  ])

  const handleActivatePromotion = useCallback(() => {
    const isBonus = promotion?.isBonus
    const code = (promotion as any)?.promoCode

    if (isBonus) {
      activateBonus.mutate(promotion.promotionId, {
        onSuccess: () => handleStatusSuccess(true),
        onError: (error) => handleStatusError(true, error)
      })
    } else if (code) {
      applyPromoCode.mutate(code, {
        onSuccess: () => handleStatusSuccess(true),
        onError: (error) => handleStatusError(true, error)
      })
    } else {
      activatePromotion.mutate(promotion.promotionId, {
        onSuccess: () => handleStatusSuccess(true),
        onError: (error) => handleStatusError(true, error)
      })
    }
  }, [
    promotion,
    activateBonus,
    applyPromoCode,
    activatePromotion,
    handleStatusSuccess,
    handleStatusError
  ])

  const handleConfirm = useCallback(() => {
    if (isPromotionActive) {
      handleDeactivatePromotion()
    } else {
      handleActivatePromotion()
    }
  }, [isPromotionActive, handleDeactivatePromotion, handleActivatePromotion])

  const renderCustomDialog = useCallback(() => {
    const dialogContent = getDialogContent()

    return (
      <CustomDialog
        title={dialogContent.title}
        message={dialogContent.message}
        primaryButtonLabel={dialogContent.primaryButtonLabel}
        primaryButtonVariant={dialogContent.primaryButtonVariant}
        secondaryButtonLabel={dialogContent.secondaryButtonLabel}
        secondaryButtonVariant={dialogContent.secondaryButtonVariant}
        onPrimaryButtonClick={dialogType === 'switch' ? handleConfirm : closeUI}
        onSecondaryButtonClick={
          dialogType === 'switch' ? closeUI : handleConfirm
        }
        imageSrc={RectangleSvg}
        disableActions={promotionState.isMutating}
        isProcessing={promotionState.isMutating}
        processingLabel={t('promotionV2.processing', 'Processing...')}
      />
    )
  }, [
    getDialogContent,
    dialogType,
    closeUI,
    handleConfirm,
    promotionState.isMutating,
    t
  ])

  useEffect(() => {
    // @ts-ignore
    if (!isPromotionActive && activePromotionsData?.content?.length > 0) {
      setDialogType('switch')
    } else {
      setDialogType('normal')
    }
  }, [activePromotionsData, isPromotionActive])

  const handleButtonClick = useCallback(() => {
    // Check if trying to activate and there are existing active promotions
    if (isDesktop()) {
      const dialog = useDialogStore.getState()
      dialog.open({
        content: renderCustomDialog(),
        width: 400
      })
    } else {
      setIsDrawerOpen(true)
    }
  }, [isDesktop, renderCustomDialog])

  useCallback(() => {
    closeUI()
  }, [closeUI])

  const handleTermsClick = useCallback(() => {
    if (isDesktop()) {
      const dialog = useDialogStore.getState()
      dialog.open({
        content: (
          <TermsDialogContent
            promoType={promoType}
            promotion={promotion}
            onClose={dialog.close}
          />
        ),
        width: 644
      })
    } else {
      setIsTermsDrawerOpen(true)
    }
  }, [isDesktop, promoType, promotion])
  const getButtonVariant = useCallback(() => {
    const { isExpired, isCanceled, isHidden } = promotionState
    if (isExpired || isCanceled || isHidden) return 'deactivate'
    return isPromotionActive ? 'deactivate' : 'default'
  }, [promotionState, isPromotionActive])

  const getButtonLabel = useCallback(() => {
    const { isExpired, isCanceled } = promotionState
    if (isExpired) return t('promotionV2.expired', 'Expired')
    if (isCanceled) return t('promotionV2.canceled', 'Canceled')
    return isPromotionActive
      ? t('promotionV2.deactivate', 'Deactivate')
      : t('promotionV2.activate', 'Activate')
  }, [promotionState, isPromotionActive, t])

  const isButtonDisabled = useCallback(() => {
    const { isExpired, isCanceled, isHidden, isMutating } = promotionState
    return isExpired || isCanceled || isHidden || isMutating
  }, [promotionState])

  const renderPromotionBanner = useCallback(() => {
    const bannerStyle = {
      backgroundImage: promotion.promotionBannerUrl
        ? `url(${promotion.promotionBannerUrl})`
        : `url(${promotionMobile})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover'
    }

    return (
      <div
        style={bannerStyle}
        className="self-stretch h-[216px] md:h-[228px] mb-2 rounded-[10px] shadow-[6px_6px_16px_0px_rgba(22,28,22,0.25)]"
      />
    )
  }, [promotion.promotionBannerUrl])

  return (
    <>
      {renderPromotionBanner()}

      <div className="self-stretch pb-8 flex flex-row justify-start items-center gap-2.5 w-full">
        <CustomButton
          variant={getButtonVariant()}
          label={getButtonLabel()}
          className="flex-1 h-10"
          onClick={isButtonDisabled() ? undefined : handleButtonClick}
          disabled={isButtonDisabled()}
        />
        <CustomButton
          variant="muted"
          label={t('promotionV2.termsAndConditions1', 'Terms & Conditions')}
          className="flex-1 h-10"
          onClick={handleTermsClick}
        />
      </div>

      <CustomDrawer
        hideHeader={true}
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        title=""
      >
        {renderCustomDialog()}
      </CustomDrawer>

      <CustomDrawer
        hideHeader={false}
        open={isTermsDrawerOpen}
        onOpenChange={setIsTermsDrawerOpen}
        title={t('promotionV2.termsAndConditions1', 'Terms & Conditions')}
      >
        <TermsAndConditions promoType={promoType} promotion={promotion} />
      </CustomDrawer>
    </>
  )
}
