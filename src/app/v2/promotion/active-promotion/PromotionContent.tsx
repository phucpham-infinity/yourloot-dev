import { Promotion } from '@/services/controller/promotions'
import { useEffect, useMemo, useState } from 'react'
import BonusGames from './BonusGames'
import PromoCodeSection from './PromoCodeSection'
import PromotionCardActions from './PromotionCardActions'
import PromotionDetails from './PromotionDetails'
import PromotionTimer from './PromotionTimer'

interface PromotionContentProps {
  promotion: Promotion
  isActive?: boolean
  status?: string
  promoType?: string
}

export default function PromotionContent({
  promotion,
  isActive = false,
  status = 'available',
  promoType
}: PromotionContentProps) {
  // State to track the current active status
  const [currentIsActive, setCurrentIsActive] = useState(isActive)

  // Determine if this is a crypto-type promotion (by URL type or name contains 'crypto')
  const isCrypto =
    promoType === 'crypto' ||
    promoType === 'crypto_bonus' ||
    (promotion?.name || '').toLowerCase().includes('crypto')

  // Check if promotion name contains special keywords (Free spins or Фриспинов)
  const promotionName = (promotion?.name || '').toLowerCase()
  const subTitle = (promotion?.subTitle || '').toLowerCase()
  const isSpecialPromotion =
    promotionName.includes('free spins') ||
    promotionName.includes('фриспинов') ||
    promotionName.includes('вращения') ||
    subTitle.includes('fs')

  useEffect(() => {
    setCurrentIsActive(isActive)
  }, [isActive])

  // Derive the most accurate end date from promotion detail.
  // Prefer explicit endDate/endDateTime, otherwise fall back to known nested fields.
  const derivedEndDate = useMemo(() => {
    const candidates: Array<string | Date | undefined> = []
    // Top-level fields
    // @ts-ignore
    candidates.push((promotion as any)?.endDateTime)
    candidates.push(promotion.endDate)
    // Common nested paths where BE may place expiration
    // @ts-ignore
    if ((promotion as any)?.rewards?.expirationDateTime) {
      // @ts-ignore
      candidates.push((promotion as any).rewards.expirationDateTime)
    }
    // @ts-ignore
    if ((promotion as any)?.conditions?.endDateTime) {
      // @ts-ignore
      candidates.push((promotion as any).conditions.endDateTime)
    }
    // Some APIs embed bonuses with expirationDateTime
    // @ts-ignore
    const bonuses =
      (promotion as any)?.rewards?.bonuses || (promotion as any)?.bonuses
    if (Array.isArray(bonuses) && bonuses.length > 0) {
      // @ts-ignore
      candidates.push(bonuses[0]?.expirationDateTime)
    }

    // Return first truthy candidate; fallback to promotion.endDate
    const first = candidates.find((c) => !!c)
    return (first as string | Date) || promotion.endDate
  }, [promotion])

  // Handler for status change from PromotionCardActions
  const handleStatusChange = (newIsActive: boolean) => {
    setCurrentIsActive(newIsActive)
  }

  // Listen for messages from PromoCodeSection
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Check if the message is from PromoCodeSection
      if (event.data && event.data.type === 'PROMOTION_STATUS_CHANGE') {
        // Check if the message is for this promotion
        if (promotion && event.data.promotionId === promotion.promotionId) {
          // Update the active status
          setCurrentIsActive(event.data.isActive)
        }
      }
    }

    // Add event listener
    window.addEventListener('message', handleMessage)

    // Clean up
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [promotion])

  return (
    <div className="flex flex-col self-stretch w-full gap-4 md:flex-row md:items-start md:justify-start md:gap-4">
      {/* Left column: main content */}
      <div className="flex-1 flex flex-col justify-start items-start w-full md:max-w-[672px]">
        <PromotionCardActions
          promotion={promotion}
          isActive={currentIsActive}
          status={status}
          promoType={promoType}
          onStatusChange={handleStatusChange}
        />
        <PromotionDetails promoType={promoType} promotion={promotion} />
        {/* Mobile timer (keeps previous layout) */}
        <div className="w-full pb-4 md:hidden">
          <PromotionTimer
            isActive={currentIsActive}
            endDate={derivedEndDate}
            status={status}
          />
        </div>
        {/* Promo codes: show in main column on mobile only for crypto */}
        {isCrypto && (
          <div className="w-full md:hidden">
            <PromoCodeSection
              promotion={promotion}
              onStatusChange={handleStatusChange}
            />
          </div>
        )}
        {!isSpecialPromotion && <BonusGames promoType={promoType || ''} />}
      </div>

      {/* Right column: desktop-only auxiliary panel */}
      <div className="flex-col hidden gap-4 md:flex w-52 shrink-0">
        <PromotionTimer
          isActive={currentIsActive}
          endDate={derivedEndDate}
          status={status}
          className="h-44"
        />
        {/* Move PromoCodeSection to the right side on desktop for crypto promos */}
        {isCrypto && (
          <PromoCodeSection
            promotion={promotion}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>
    </div>
  )
}
