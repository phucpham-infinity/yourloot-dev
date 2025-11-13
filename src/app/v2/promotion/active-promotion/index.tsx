import Loader from '@/components/common/loader'
import {
  Promotion,
  promotionsController
} from '@/services/controller/promotions'
import { useAuthStore } from '@/store'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import PromotionContent from './PromotionContent'
import PromotionHeader from './PromotionHeader'

export default function ActivePromotionDetail() {
  const { t } = useTranslation()
  const { promotionId, status } = useParams<{
    promotionId: string
    status: string
  }>()
  const [searchParams] = useSearchParams()

  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      const promoPath = window.location.href.replace(
        window.location.origin + '/',
        ''
      )
      navigate(`/auth/login?redirect=${promoPath}`)
    }
  }, [isAuthenticated])

  const { useGetPromotionInfo, useGetActivePromotions } = promotionsController()

  // Get isBonus from URL query parameters
  const isBonus = searchParams.get('isBonus') === 'true'

  // Fetch detailed promotion info with isBonus parameter
  const {
    data: promotionResponse,
    isLoading: isDetailLoading,
    isError: isDetailError
  } = useGetPromotionInfo(promotionId as string, isBonus, {
    refetchOnMount: 'always',
    staleTime: 0
  })

  const isLoading = isDetailLoading
  const isError = isDetailError

  // Fetch active promotions list to check if current promotion is active
  const {
    data: activePromotionsResponse,
    isLoading: isActivePromotionsLoading
  } = useGetActivePromotions('', 0, 100, {
    refetchOnMount: 'always',
    staleTime: 0
  })

  const promotion: Promotion | null = useMemo(() => {
    const c: any = promotionResponse?.content
    if (!c) return null
    // Normalize to ensure correct promotionId is used for activate/deactivate
    const normalized: Promotion = {
      promotionId: c.promotionId || c.id,
      name: c.name,
      description: c.description,
      type: c.type || c.promotionType,
      startDate: c.startDate || c.startDateTime || new Date().toISOString(),
      endDate:
        c.endDate ||
        c.endDateTime ||
        new Date(Date.now() + 3600_000).toISOString(),
      status: c.status || 'ACTIVE',
      conditions: c.conditions || {},
      rewards: c.rewards || {},
      createdAt: c.createdAt || new Date().toISOString(),
      updatedAt: c.updatedAt || new Date().toISOString(),
      promoCode: c.promoCode,
      isBonus: c.isBonus || false,
      subTitle: c.subTitle || null,
      termsAndConditions: c.termsAndConditions || null,
      promotionBannerUrl: c.promotionBannerUrl || null
    }
    return normalized
  }, [promotionResponse])

  // Determine if this promotion should be considered active for UI purposes
  const [isActive, setIsActive] = useState(false)
  useEffect(() => {
    // First, check if the promotion is in the active promotions list from the API
    if (activePromotionsResponse?.content && promotionId) {
      const isInActiveList = (activePromotionsResponse.content as any).some(
        (activePromotion: any) =>
          activePromotion.id === promotionId ||
          activePromotion.promotionId === promotionId
      )
      // If promotion is in the active list, set isActive to true
      setIsActive(isInActiveList)
      return
    }

    // Check for user-specific activation status from API response
    if (promotion && promotionResponse?.content) {
      const apiContent = promotionResponse.content as any

      // Check various possible user activation fields from API
      const userActivated =
        apiContent.isActivated ||
        apiContent.activated ||
        apiContent.userActivated ||
        apiContent.isUserActivated ||
        apiContent.activationStatus === 'ACTIVE'

      // If user has specifically activated this promotion, prioritize that
      if (userActivated) {
        setIsActive(true)
        return
      }

      // For expired/canceled promotions, they were previously active but are now inactive
      const wasActiveButExpired = status === 'expired' || status === 'canceled'
      setIsActive(wasActiveButExpired)
    } else {
      // Default fallback: only set active for expired/canceled (previously active) promotions
      setIsActive(status === 'expired' || status === 'canceled')
    }
  }, [
    promotion?.status,
    promotion?.promotionId,
    status,
    promotionResponse,
    activePromotionsResponse,
    promotionId
  ])

  if (isLoading || isActivePromotionsLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader className="w-10 h-10" size={40} />
      </div>
    )
  }

  if (isError || !promotion) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-white">{t('promotionV2.promotionNotFound')}</div>
      </div>
    )
  }

  // Show header text: if crypto by name/type, force "Crypto bonus"; otherwise use the promotion name
  const isCryptoByNameOrType =
    (promotion?.name || '').toLowerCase().includes('crypto') ||
    (promotion?.name || '').toLowerCase().includes('риптобонус')

  const isHallowenByNameOrType =
    (promotion?.name || '').toLowerCase().includes('halloween') ||
    (promotion?.name || '').toLowerCase().includes('эллоуин')

  const promoType = isCryptoByNameOrType
    ? 'crypto_bonus'
    : isHallowenByNameOrType
      ? 'halloween_bonus'
      : ''
  const headerTitle = t(promotion.name, promotion.name)
  return (
    <div className="w-full max-w-lg md:max-w-[904px] mx-auto ">
      <PromotionHeader name={headerTitle} />
      <PromotionContent
        promotion={promotion}
        isActive={isActive}
        status={status || 'available'}
        promoType={promoType}
      />
    </div>
  )
}
