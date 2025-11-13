import { useState } from 'react'
import {
  Promotion,
  promotionsController
} from '@/services/controller/promotions'
import CustomButton from '@/components/common/custom-button'
import CheckmarkSvg from '@/assets/icons/v2/checkmark.svg'
import { useTranslation } from 'react-i18next'
import Loader from '@/components/common/loader'
import {css} from "@/lib/utils.ts";

/**
 * PromoCodeButton Component
 *
 * This component displays a button for a predefined promo code.
 */
interface PromoCodeButtonProps {
  code: string
  onClick: (code: string) => void
}

function PromoCodeButton({ code, onClick }: PromoCodeButtonProps) {
  return (
    <button
      onClick={() => onClick(code)}
      data-show-icon-left="false"
      data-show-icon-right="false"
      data-show-text="true"
      data-state="Rest"
      className="h-7 px-2.5 py-5 bg-gradient-to-b from-black/50 to-black/10 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-[#3a3049] flex justify-center items-center gap-[5px]"
    >
      <div className="flex justify-start items-center gap-[5px]">
        <div className="text-center justify-center text-[#FFF] text-xs font-medium font-['Satoshi']">
          {code}
        </div>
      </div>
    </button>
  )
}

interface PromoCodeSectionProps {
  promotion: Promotion
  onStatusChange?: (isActive: boolean) => void
}

// @ts-ignore
export default function PromoCodeSection({
  promotion,
  onStatusChange
}: PromoCodeSectionProps) {
  const { t } = useTranslation()
  const [promoCode, setPromoCode] = useState('')
  const [isApplying, setIsApplying] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)


  const { useApplyPromoCode, useGetAvaiblePromoCode } = promotionsController()
  const { data: promoCodesData, isPending: isLoadingPromoCodes } =
    useGetAvaiblePromoCode('', 0, 10)
  const { mutate: applyPromoCodeMutation } = useApplyPromoCode()

  const handleApplyPromoCode = () => {
    if (!promoCode.trim()) {
      setError(
        t(
          'promotionV2.promoCodeSection.enterPromoCode',
          'Please enter a promo code'
        )
      )
      return
    }

    setIsApplying(true)
    setError('')
    setSuccess(false)

    try {
      // Throw an error for certain promo codes (for demonstration purposes)
      if (promoCode.toLowerCase() === 'invalid') {
        throw new Error('This promo code is invalid')
      }

      if (promoCode.toLowerCase() === 'expired') {
        throw new Error('This promo code has expired')
      }

      // Real API call
      applyPromoCodeMutation(promoCode, {
        onSuccess: () => {
          setIsApplying(false)
          setSuccess(true)
          setPromoCode('') // Clear the input after successful application

          // Notify parent component that the promotion should be considered active
          // This ensures the bonus is active when a promo code is entered, even without a crypto deposit
          if (promotion && promotion.promotionId) {
            // If we have access to the parent's onStatusChange callback, use it
            if (onStatusChange) {
              onStatusChange(true)
            }
            // Also use postMessage as a fallback
            if (window.parent && window.parent.postMessage) {
              window.parent.postMessage(
                {
                  type: 'PROMOTION_STATUS_CHANGE',
                  promotionId: promotion.promotionId,
                  isActive: true
                },
                '*'
              )
            }
          }
        },
        onError: (error: any) => {
          setIsApplying(false)
          setError(
            error.message || 'An error occurred while applying the promo code'
          )
        }
      })
    } catch (error: any) {
      // Handle the error
      setIsApplying(false)
      setError(
        error.message || 'An error occurred while applying the promo code'
      )
      console.error('Error applying promo code:', error)
    }
  }

  const handlePromoCodeClick = (code: string) => {
    setPromoCode(code)
    setError('')
    setSuccess(false)
  }

  return (
    <div className="self-stretch flex flex-col justify-start items-start gap-4 mb-4">
      <div className="self-stretch p-4 bg-[#191524] rounded-[10px] inline-flex flex-col justify-center items-start gap-4 overflow-hidden">
        <div
          data-bold="false"
          data-icon="false"
          className="h-4 inline-flex justify-center items-center gap-2"
        >
          <div className="justify-center text-white text-base font-medium font-['Satoshi']">
            {t('promotionV2.promoCodeSection.title', 'Promo Codes')}
          </div>
        </div>
        <div className="self-stretch flex flex-col justify-center items-start gap-2">
          <div className="w-full self-stretch flex flex-col justify-start items-stretch gap-2.5">
            <div
              data-show-description-bottom="false"
              data-show-description-top="false"
              data-show-icon-left="false"
              data-show-icon-right="false"
              data-state="Rest"
              className="flex-1"
            >
              <div
                className={`w-full self-stretch h-10 p-5 bg-gradient-to-b from-black/50 to-black/10 rounded-[10px] outline outline-1 outline-offset-[-1px] ${error ? 'outline-red-500' : 'outline-[#3a3049]'} inline-flex justify-between items-center overflow-hidden`}
              >
                <div className="w-full flex-1 flex justify-start items-center gap-2.5">
                  <input
                    type="text"
                    css={placeholderStyles}
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder={t('bonus.enterPromoCode', 'Enter promo code')}
                    className="w-full bg-transparent text-slate-300 text-xs font-medium font-['Satoshi'] outline-none"
                  />
                </div>
              </div>
            </div>
            <CustomButton
              onClick={handleApplyPromoCode}
              disabled={isApplying || !promoCode.trim()}
              label={
                isApplying
                  ? t('promotionV2.promoCodeSection.applying', 'Applying...')
                  : t('promotionV2.promoCodeSection.apply', 'Apply')
              }
              isLoading={isApplying}
              className="h-10 px-5 w-full bg-[radial-gradient(ellipse_265.37%_103.94%_at_59.95%_-118.74%,_#654EC8_0%,_#372864_100%)] rounded-[10px] outline outline-1 outline-offset-[-1px] outline-violet-300 disabled:opacity-50"
            />
          </div>
          {error && <div className="text-red-500 text-xs">{error}</div>}
          {success && (
            <div className="flex items-center gap-1 text-white text-xs">
              <img src={CheckmarkSvg} alt="Success" className="w-6 h-6" />
              <span>
                {t(
                  'promotionV2.promoCodeSection.activatedPromoCode',
                  'You activated additional promo code.'
                )}
              </span>
            </div>
          )}
        </div>
        <div className="inline-flex justify-start items-start gap-2">
          {isLoadingPromoCodes ? (
            <div className="flex items-center justify-center">
              <Loader className="w-6 h-6" size={24} />
            </div>
          ) : promoCodesData?.content && promoCodesData.content.length > 0 ? (
            // Use real API data
            promoCodesData.content.map((promoCode, index) => (
              <PromoCodeButton
                key={index}
                code={promoCode.name}
                onClick={handlePromoCodeClick}
              />
            ))
          ) : (
            <div className="text-slate-300 text-xs">
              {t(
                'promotionV2.promoCodeSection.noActivePromoCodes',
                'No active promo codes available'
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const placeholderStyles = css`
  &::placeholder {
    color: #FFF !important;
  }
`