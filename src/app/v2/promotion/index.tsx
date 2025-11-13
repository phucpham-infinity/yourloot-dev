import CustomDialog from '@/app/v2/promotion/active-promotion/CustomDialog.tsx'
import AvailablePromotionsSection from '@/app/v2/promotion/components/AvailablePromotionsSection'
import PromotionHeader from '@/app/v2/promotion/components/PromotionHeader'
import { usePromoCode } from '@/app/v2/promotion/hooks/usePromoCode'
import { usePromotionData } from '@/app/v2/promotion/hooks/usePromotionData'
import ActivePromotions from '@/app/v2/promotion/promotion/ActivePromotions'
import PromoCodes from '@/app/v2/promotion/promotion/PromoCodes'
import RectangleSvg from '@/assets/images/warning-icon.svg'
import { CustomDrawer } from '@/components/common/custom-drawer'
import Loader from '@/components/common/loader'
import { useDialogStore } from '@/store/slices/dialog'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Promotion Component
 *
 * This component displays active and available promotions, and allows users to apply promo codes.
 */

export default function Promotion() {
  const { t } = useTranslation()

  // Use custom hooks for data fetching and promo code logic
  const {
    activePromotions,
    isLoadingActive,
    suggestedPromotions,
    isLoadingSuggested
  } = usePromotionData()
  const {
    promoCode,
    setPromoCode,
    promoCodeError,
    isApplyingPromoCode,
    handleApplyPromoCode,
    handlePromoCodeClick,
    isConfirmationDrawerOpen,
    setIsConfirmationDrawerOpen,
    confirmationData,
    // CustomDialog states for desktop
    isCustomDialogOpen,
    customDialogData,
    // Loading dialog states for spinner
    isLoadingDialogOpen,
    loadingDialogData
  } = usePromoCode()

  // Handle desktop dialog rendering for warning dialog
  useEffect(() => {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024
    if (isDesktop && isCustomDialogOpen) {
      const dialog = useDialogStore.getState()
      dialog.open({
        content: (
          <CustomDialog
            title={customDialogData.title}
            message={customDialogData.message}
            primaryButtonLabel={customDialogData.primaryButtonLabel}
            primaryButtonVariant={customDialogData.primaryButtonVariant}
            secondaryButtonLabel={customDialogData.secondaryButtonLabel}
            onPrimaryButtonClick={() => {
              customDialogData.onPrimaryButtonClick?.()
              useDialogStore.getState().close()
            }}
            onSecondaryButtonClick={() => {
              customDialogData.onSecondaryButtonClick?.()
              useDialogStore.getState().close()
            }}
            imageSrc={customDialogData.imageSrc}
            isProcessing={customDialogData.isProcessing}
            processingLabel={customDialogData.processingLabel}
            disableActions={customDialogData.disableActions}
          />
        ),
        width: 400
      })
    } else if (!isCustomDialogOpen) {
      useDialogStore.getState().close()
    }
  }, [isCustomDialogOpen, customDialogData])

  // Handle desktop dialog rendering for loading dialog (spinner, no buttons)
  useEffect(() => {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024
    if (isDesktop && isLoadingDialogOpen) {
      const dialog = useDialogStore.getState()
      dialog.open({
        content: (
          <div className="w-96 md:w-full px-4 py-6 bg-zinc-950 rounded-tl-[20px] rounded-tr-[20px] backdrop-blur-lg inline-flex flex-col justify-center items-center">
            <div className="flex flex-col items-center self-stretch justify-center gap-4 pb-8">
              <Loader className="w-10 h-10" size={40} />
              <div className="self-stretch text-center justify-center text-slate-400 text-xs font-medium font-['Satoshi']">
                {loadingDialogData.message}
              </div>
            </div>
          </div>
        ),
        width: 400
      })
    } else if (!isLoadingDialogOpen) {
      useDialogStore.getState().close()
    }
  }, [isLoadingDialogOpen, loadingDialogData])

  return (
    <div className="self-stretch flex flex-col justify-center items-center gap-1 w-full md:max-w-[904px] md:mx-auto md:p-6">
      <div className="w-full md:max-w-[904px] md:mx-auto md:inline-flex md:flex-col md:justify-start md:items-center">
        <div className="flex flex-col items-start self-stretch justify-start w-full gap-8 ">
          {/* Header Section */}
          <PromotionHeader />

          {/* Active Promotions Section */}
          <ActivePromotions
            // @ts-ignore
            activePromotions={activePromotions}
            isLoadingActive={isLoadingActive}
            status="active"
          />

          {/* Available Promotions Section */}
          <AvailablePromotionsSection
            availablePromotions={suggestedPromotions || []}
            isLoadingAvailable={isLoadingSuggested}
          />

          {/* Promo Codes Section */}
          <PromoCodes
            promoCode={promoCode}
            setPromoCode={setPromoCode}
            isApplyingPromoCode={isApplyingPromoCode}
            handleApplyPromoCode={handleApplyPromoCode}
            handlePromoCodeClick={handlePromoCodeClick}
            error={promoCodeError}
          />
        </div>
      </div>

      {/* Mobile Confirmation Drawer */}
      <CustomDrawer
        hideHeader={true}
        open={isConfirmationDrawerOpen}
        onOpenChange={setIsConfirmationDrawerOpen}
        title=""
      >
        {confirmationData && (
          <CustomDialog
            title={t('promotionV2.areYouSure', 'Are you sure?')}
            message={t(
              'promotionV2.warningMessage',
              'All active bonuses will be cancelled if you apply this promo code.'
            )}
            primaryButtonLabel={t('promotionV2.confirm', 'Confirm')}
            primaryButtonVariant="default"
            secondaryButtonLabel={t('promotionV2.cancel', 'Cancel')}
            onPrimaryButtonClick={confirmationData.onConfirm}
            onSecondaryButtonClick={confirmationData.onCancel}
            imageSrc={RectangleSvg}
            disableActions={isApplyingPromoCode}
            isProcessing={isApplyingPromoCode}
            processingLabel={t('promotionV2.processing', 'Processing...')}
          />
        )}
      </CustomDrawer>
    </div>
  )
}
