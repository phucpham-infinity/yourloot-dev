import { promotionsController } from '@/services/controller/promotions'
import { useTranslation } from 'react-i18next'

/**
 * Custom hook for fetching and transforming promotion data
 *
 * This hook handles:
 * - Fetching active promotions from API
 * - Fetching suggested promotions from API
 * - Transforming raw API data into standardized format
 * - Sorting active promotions (welcome bonus first)
 * - Filtering available promotions (excluding welcome bonus)
 */
export function usePromotionData() {
  const { t } = useTranslation()
  const { useGetActivePromotions, useGetSuggestedPromotions } =
    promotionsController()

  // Fetch active promotions via API
  const { data: activePromotionsData, isLoading: isLoadingActiveApi } =
    useGetActivePromotions('', 0, 20, {
      refetchOnMount: 'always',
      staleTime: 0
    })

  // Build active promotions from API (show all; welcome bonus first)
  const activePromotions = (() => {
    const rawContent: any = (activePromotionsData as any)?.content
    const items: any[] = Array.isArray(rawContent)
      ? rawContent
      : Array.isArray(rawContent?.promotions)
        ? rawContent.promotions
        : []

    // Map all active promotions
    const mapped = items.map((p) => ({
      promotionId: p?.id || p?.promotionId || 'promo',
      name:
        p?.name ||
        t('promotionV2.promotions.generic.name', 'Special Promotion'),
      description:
        p?.description ||
        t(
          'promotionV2.promotions.generic.description',
          'Enjoy this limited-time offer'
        ),
      type: p?.promotionType || p?.type || 'GENERIC',
      startDate: p?.startDateTime || p?.startDate || new Date().toISOString(),
      endDate: p?.endDateTime || p?.endDate || new Date().toISOString(),
      status: p?.status || 'ACTIVE',
      conditions: p?.conditions || {},
      rewards: p?.rewards || {},
      createdAt: p?.createdAt || new Date().toISOString(),
      updatedAt: p?.updatedAt || new Date().toISOString(),
      isBonus: p?.isBonus || false,
      promotionBannerUrl: p?.promotionBannerUrl || '',
      subTitle: p?.subTitle || ''
    }))

    // Sort so welcome bonus (isWb === true by API) appears first if present
    const wbFirst = [...mapped].sort((a: any, b: any) => {
      const aIsWb = items.find(
        (x) => (x?.id || x?.promotionId) === a.promotionId
      )?.isWb
        ? 1
        : 0
      const bIsWb = items.find(
        (x) => (x?.id || x?.promotionId) === b.promotionId
      )?.isWb
        ? 1
        : 0
      return bIsWb - aIsWb
    })

    return wbFirst
  })()

  // Loading state
  const isLoadingActive = isLoadingActiveApi

  // Fetch suggested promotions for Available section
  const { data: suggestedPromotionsData, isLoading: isLoadingSuggestedApi } =
    useGetSuggestedPromotions(0, 20, {
      refetchOnMount: 'always',
      staleTime: 0
    })

  // Map available promotions (exclude Welcome Bonus already shown in Active)
  const suggestedPromotions = (() => {
    const rawContent: any = (suggestedPromotionsData as any)?.content
    const items: any[] = Array.isArray(rawContent)
      ? rawContent
      : Array.isArray(rawContent?.promotions)
        ? rawContent.promotions
        : []

    return items.map((p: any) => ({
      promotionId: p?.id || p?.promotionId || 'promo',
      name:
        p?.name ||
        t('promotionV2.promotions.generic.name', 'Special Promotion'),
      description:
        p?.description ||
        t(
          'promotionV2.promotions.generic.description',
          'Enjoy this limited-time offer'
        ),
      type: p?.promotionType || p?.type || 'GENERIC',
      startDate: p?.startDateTime || p?.startDate || new Date().toISOString(),
      endDate: p?.endDateTime || p?.endDate || new Date().toISOString(),
      status: p?.status || 'ACTIVE',
      conditions: p?.conditions || {},
      rewards: p?.rewards || {},
      createdAt: p?.createdAt || new Date().toISOString(),
      updatedAt: p?.updatedAt || new Date().toISOString(),
      isBonus: p?.isBonus || false,
      promotionBannerUrl: p?.promotionBannerUrl || '',
      subTitle: p?.subTitle || ''
    }))
  })()

  // Loading state for available promotions
  const isLoadingSuggested = isLoadingSuggestedApi

  return {
    activePromotions,
    isLoadingActive,
    suggestedPromotions,
    isLoadingSuggested
  }
}
