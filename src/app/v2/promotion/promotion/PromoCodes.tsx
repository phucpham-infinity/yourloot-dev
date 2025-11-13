import CustomButton from '@/components/common/custom-button'
import { promotionsController } from '@/services/controller/promotions'
import { useTranslation } from 'react-i18next'
import PromoCodeButton from './PromoCodeButton'
import { css } from '@/lib/utils'

interface PromoCodesProps {
  promoCode: string
  setPromoCode: (code: string) => void
  isApplyingPromoCode: boolean
  handleApplyPromoCode: () => void
  handlePromoCodeClick: (code: string) => void
  error?: string
}

/**
 * PromoCodes Component
 *
 * This component displays the promo codes section, including:
 * - A header with the "Promo Codes" title
 * - An input field for entering promo codes
 * - An apply button
 * - Buttons for predefined promo codes
 */
const placeholderStyles = css`
  &::placeholder {
    color: #FFF !important;
  }
`

export default function PromoCodes({
  promoCode,
  setPromoCode,
  isApplyingPromoCode,
  handleApplyPromoCode,
  handlePromoCodeClick,
  error
}: PromoCodesProps) {
  const { t } = useTranslation()
  const { useGetAvaiblePromoCode } = promotionsController()
  // @ts-ignore
  const { data, isPending } = useGetAvaiblePromoCode('')

  return (
    <div className="flex flex-col items-start self-stretch justify-start gap-4">
      <div
        data-bold="false"
        data-icon="false"
        className="inline-flex items-center justify-center h-4 gap-2"
      >
        <div className="justify-center text-white text-base font-medium font-['Satoshi']">
          {t('promotionV2.promoCodes')}
        </div>
      </div>
      <div className="self-stretch p-4 relative bg-[#191524] rounded-[10px]  flex flex-col justify-start items-start gap-4 overflow-hidden">
        <div className="w-56 h-56 left-[-197.29px] top-[16.93px] absolute rounded-full " />
        <div className="self-stretch flex flex-col gap-2.5">
          <div className="w-full self-stretch inline-flex justify-start items-center gap-2.5">
            <div
              data-show-description-bottom="false"
              data-show-description-top="false"
              data-show-icon-left="false"
              data-show-icon-right="false"
              data-state="Rest"
              className="flex-1 outline-none"
            >
              <div
                className={`w-full self-stretch h-10 p-5 bg-gradient-to-b from-black/50 to-black/10 rounded-[10px]  outline-1 outline-offset-[-1px] ${error ? 'outline-red-500' : 'outline-[#3a3049]'} inline-flex justify-between items-center overflow-hidden`}
              >
                <div className="w-full flex-1 flex justify-start items-center gap-2.5">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder={t('bonus.enterPromoCode', 'Enter promo code')}
                    className="w-full bg-transparent !text-[#FFF] text-app-medium-14 font-medium outline-none"
                    css={placeholderStyles}
                  />
                </div>
              </div>
            </div>
            <CustomButton
              onClick={handleApplyPromoCode}
              variant="default"
              disabled={isApplyingPromoCode || !promoCode.trim()}
              label={
                isApplyingPromoCode
                  ? t('promotionV2.applying')
                  : t('promotionV2.apply')
              }
              isLoading={isApplyingPromoCode}
              className="h-10 w-fit px-2 rounded-2xl md:rounded-[10px]]"
            />
          </div>
          {error && <div className="text-xs text-red-500">{error}</div>}
        </div>
        <div className="flex items-start justify-start w-full gap-2 py-1 overflow-x-auto">
          {isPending ? (
            <div className="text-xs text-slate-300">
              {t('promotionV2.loadingPromoCodes')}
            </div>
          ) : data?.content && data.content.length > 0 ? (
            data.content.map((promoCode, index) => (
              <PromoCodeButton
                key={index}
                code={promoCode.name}
                onClick={handlePromoCodeClick}
              />
            ))
          ) : (
            <div className="text-v2-app-medium-12 text-[#9E90CF]">
              {t('promotionV2.noActivePromoCodes')}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
