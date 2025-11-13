import AvailablePromotions from '@/app/v2/promotion/promotion/AvailablePromotions'
import Loader from '@/components/common/loader'
import { AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface AvailablePromotionsSectionProps {
  availablePromotions: any[]
  isLoadingAvailable: boolean
}

/**
 * AvailablePromotionsSection Component
 *
 * This component renders the available promotions section, including:
 * - Section title "Available"
 * - Loading state with loader
 * - Grid layout for available promotions
 * - Empty state message when no promotions are available
 */
export default function AvailablePromotionsSection({
  availablePromotions,
  isLoadingAvailable
}: AvailablePromotionsSectionProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-start self-stretch justify-start w-full gap-4">
      <div
        data-bold="false"
        data-icon="false"
        className="inline-flex items-center justify-center h-4 gap-2"
      >
        <div className="justify-center text-white text-base font-medium font-['Satoshi']">
          {t('promotionV2.available', 'Available')}
        </div>
      </div>

      {isLoadingAvailable ? (
        <div className="flex items-center self-stretch justify-center w-full h-24">
          <Loader className="w-10 h-10" size={40} />
        </div>
      ) : availablePromotions.length > 0 ? (
        <div className="grid self-stretch w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {availablePromotions.map((promotion, idx) => (
              <AvailablePromotions
                key={promotion.promotionId + '-' + idx}
                promotion={promotion}
                index={idx}
                status="available"
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex items-center self-stretch justify-center w-full h-24 bg-[#191524] !grid-cols-1 rounded-[10px]">
          <div className="text-center text-v2-app-medium-14 text-[#9E90CF]">
            {t(
              'promotionV2.noAvailablePromotions',
              "You don't have any available promotions yet."
            )}
          </div>
        </div>
      )}
    </div>
  )
}
