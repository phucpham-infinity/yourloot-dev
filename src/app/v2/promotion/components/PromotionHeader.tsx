import { useTranslation } from 'react-i18next'

/**
 * PromotionHeader Component
 *
 * This component renders both mobile and desktop headers for the promotion page.
 * - Mobile header: Shows icon with "Promotions" title
 * - Desktop header: Shows "Bonuses" title with subtitle
 */
export default function PromotionHeader() {
  const { t } = useTranslation()

  return (
    <>
      {/* Mobile header (previous version) */}
      {/* <div
        data-bold="true"
        data-icon="true"
        className="inline-flex items-center justify-center h-4 gap-2 md:hidden"
      >
        <img src={BonusSvg} className="relative w-4 h-4" />
        <div className="justify-center text-white text-base font-black font-['Satoshi']">
          {t('promotionV2.title', 'Promotions')}
        </div>
      </div> */}

      {/* Desktop header (new layout) */}
      <div className="inline-flex flex-col items-start justify-start gap-3">
        <div className="self-stretch justify-start text-white text-xl font-black font-['Inter'] leading-[12px]">
          {t('promotionV2.bonuses', 'Bonuses')}
        </div>
        <div className="justify-center text-[#9E90CF] text-sm font-medium font-['Inter'] leading-[18px]">
          {t(
            'promotionV2.header.description',
            'Discover offers and exclusive rewards. Activate promotions to boost your gaming experience.'
          )}
        </div>
      </div>
    </>
  )
}
