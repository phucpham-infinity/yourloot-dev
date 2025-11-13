import i18n from '@/lib/i18n'
import { httpClient } from '@/services/api'
import { useAuthStore } from '@/store'
import { useMutation, useQuery } from '@tanstack/react-query'

// Query Key Constants
export const PROMOTIONS_QUERY_KEYS = {
  PROMOTION: 'promotion',
  PROMOTIONS: 'promotions',
  SUGGESTED_PROMOTIONS: 'suggested-promotions',
  COMPLETED_PROMOTIONS: 'completed-promotions',
  CANCELLED_PROMOTIONS: 'cancelled-promotions',
  ACTIVE_PROMOTIONS: 'active-promotions',
  APPLY_PROMO_CODE: 'apply-promo-code',
  PROMO_CODE_ACTIVE: 'promo-code-active',
  PROMO_CODE_AVAILABEL: 'promo-code-available'
}

// Interfaces
export interface Promotion {
  promotionId: string
  name: string
  description: string
  type: string
  startDate: string
  endDate: string
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'HIDDEN'
  conditions: Record<string, any>
  rewards: Record<string, any>
  createdAt: string
  updatedAt: string
  promoCode?: string
  isBonus?: boolean
  termsAndConditions?: string
  promotionBannerUrl?: string
  subTitle?: string
}

export interface BonusDetails {
  bonusType: 'FREE_SPINS' | string
  description: string
  bonusAssignmentType: 'INSTANT' | string
  mechanicId: string
  expirationDateTime: string
  gameId: string
  numberOfSpins: number
  currencyName: string
  betSize: number
  wager: number
  mainAccountPercentage: number
  bonusAccountPercentage: number
}

export interface CreatePromotionRequest {
  name: string
  description: string
  type: string
  startDate: string
  endDate: string
  conditions: Record<string, any>
  rewards: Record<string, any>
}

export interface UpdatePromotionRequest {
  name?: string
  description?: string
  type?: string
  startDate?: string
  endDate?: string
  conditions?: Record<string, any>
  rewards?: Record<string, any>
  status?: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED'
}

export interface PromotionsListResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: {
    promotions: Promotion[]
    total: number
    page: number
    size: number
  }
}

export interface PromoCode {
  name: string
  description: string
  type: string
  validTill: string
  bonuses: BonusDetails[]
}
export interface PromotionsCodeListResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: PromoCode[]
}

export interface PromotionResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: Promotion
}

export const promotionsController = () => {
  // Apply promo code
  const useApplyPromoCode = () =>
    useMutation<{ traceId: string; timestamp: string }, Error, string>({
      mutationKey: [PROMOTIONS_QUERY_KEYS.APPLY_PROMO_CODE],
      mutationFn: async (promoCode) => {
        const response = await httpClient.post(
          // `/loyalty/user/promo-code?promoCode=${promoCode}`
          `/loyalty/promotions/promo-code/activate?promoCode=${promoCode}`
        )
        return response.data
      }
    })

  // Get all promotions
  const useGetAllPromotions = (page: number = 0, size: number = 10) => {
    const { userId } = useAuthStore()
    return useQuery<PromotionsListResponse>({
      queryKey: [PROMOTIONS_QUERY_KEYS.PROMOTIONS, page, size],
      queryFn: async () => {
        const response = await httpClient.get('/loyalty/promotions', {
          params: { page, size }
        })
        return response.data
      },
      enabled: !!userId
    })
  }

  // Get single promotion by ID
  const useGetPromotion = (
    promotionId: string,
    options: Record<string, any> = {}
  ) => {
    const { userId } = useAuthStore()
    return useQuery<PromotionResponse>({
      queryKey: [PROMOTIONS_QUERY_KEYS.PROMOTION, promotionId],
      queryFn: async () => {
        const response = await httpClient.get(
          `/loyalty/promotions/${promotionId}`
        )
        return response.data
      },
      enabled: !!userId,
      ...options
    })
  }

  // Get promotion info with isBonus parameter
  const useGetPromotionInfo = (
    promotionId: string,
    isBonus: boolean,
    options: Record<string, any> = {}
  ) => {
    const { userId } = useAuthStore()
    const locale = i18n.language || 'en'
    return useQuery<PromotionResponse>({
      queryKey: [
        PROMOTIONS_QUERY_KEYS.PROMOTION,
        promotionId,
        'info',
        isBonus,
        locale
      ],
      queryFn: async () => {
        const response = await httpClient.get(
          `/loyalty/promotions/${promotionId}/info?isBonus=${isBonus}&locale=${locale}`
        )
        return response.data
      },
      enabled: !!userId,
      ...options
    })
  }

  // Create new promotion
  const useCreatePromotion = () =>
    useMutation<PromotionResponse, Error, CreatePromotionRequest>({
      mutationFn: async (data) => {
        const response = await httpClient.post('/loyalty/promotions', data)
        return response.data
      }
    })

  // Update promotion
  const useUpdatePromotion = () =>
    useMutation<
      PromotionResponse,
      Error,
      { promotionId: string; data: UpdatePromotionRequest }
    >({
      mutationFn: async ({ promotionId, data }) => {
        const response = await httpClient.put(
          `/loyalty/promotions/${promotionId}`,
          data
        )
        return response.data
      }
    })

  const usePostUserPromoCode = () =>
    useMutation<void, Error, string>({
      mutationFn: async (promoCode) => {
        const response = await httpClient.post(
          `/loyalty/user/promo-code?promoCode=${promoCode}`
        )
        return response.data
      },
      retry: 1
    })

  // Delete promotion
  const useDeletePromotion = () =>
    useMutation<void, Error, string>({
      mutationFn: async (promotionId) => {
        const response = await httpClient.delete(
          `/loyalty/promotions/${promotionId}`
        )
        return response.data
      }
    })

  // Cancel promotion
  const useCancelPromotion = () =>
    useMutation<PromotionResponse, Error, string>({
      mutationFn: async (promotionId) => {
        const response = await httpClient.post(
          `/loyalty/promotions/${promotionId}/cancel`
        )
        return response.data
      }
    })

  // Cancel bonus
  const useCancelBonus = () =>
    useMutation<PromotionResponse, Error, string>({
      mutationFn: async (bonusId) => {
        const response = await httpClient.post(
          `/loyalty/bonuses/${bonusId}/cancel`
        )
        return response.data
      }
    })

  // Activate bonus
  const useActivateBonus = () =>
    useMutation<PromotionResponse, Error, string>({
      mutationFn: async (bonusId) => {
        const response = await httpClient.post(
          `/loyalty/bonuses/${bonusId}/activate`
        )
        return response.data
      }
    })

  // Activate promotion
  const useActivatePromotion = () =>
    useMutation<PromotionResponse, Error, string>({
      mutationFn: async (promotionId) => {
        const response = await httpClient.post(
          `/loyalty/promotions/${promotionId}/activate`
        )
        return response.data
      }
    })

  // Get suggested promotions
  const useGetSuggestedPromotions = (
    page: number = 0,
    size: number = 10,
    options: Record<string, any> = {}
  ) => {
    const { userId } = useAuthStore()
    const locale = i18n.language || 'en'
    return useQuery<PromotionsListResponse>({
      queryKey: [
        PROMOTIONS_QUERY_KEYS.SUGGESTED_PROMOTIONS,
        page,
        size,
        locale
      ],
      queryFn: async () => {
        const response = await httpClient.get('/loyalty/promotions/suggested', {
          params: { page, size, locale }
        })
        return response.data
      },
      enabled: !!userId,
      ...options
    })
  }

  // Get completed promotions
  const useGetCompletedPromotions = (page: number = 0, size: number = 10) => {
    const { userId } = useAuthStore()
    return useQuery<PromotionsListResponse>({
      queryKey: [PROMOTIONS_QUERY_KEYS.COMPLETED_PROMOTIONS, page, size],
      queryFn: async () => {
        const response = await httpClient.get('/loyalty/promotions/completed', {
          params: { page, size }
        })
        return response.data
      },
      enabled: !!userId
    })
  }

  // Get cancelled promotions
  const useGetCancelledPromotions = (page: number = 0, size: number = 10) => {
    const { userId } = useAuthStore()
    return useQuery<PromotionsListResponse>({
      queryKey: [PROMOTIONS_QUERY_KEYS.CANCELLED_PROMOTIONS, page, size],
      queryFn: async () => {
        const response = await httpClient.get('/loyalty/promotions/cancelled', {
          params: { page, size }
        })
        return response.data
      },
      enabled: !!userId
    })
  }

  // Get active promotions
  const useGetActivePromotions = (
    promoCode: string = '',
    page: number = 0,
    size: number = 20,
    options: Record<string, any> = {}
  ) => {
    const { userId } = useAuthStore()
    const locale = i18n.language || 'en'
    return useQuery<PromotionsListResponse>({
      queryKey: [
        PROMOTIONS_QUERY_KEYS.ACTIVE_PROMOTIONS,
        promoCode,
        page,
        size,
        locale
      ],
      queryFn: async () => {
        const response = await httpClient.get('/loyalty/promotions/active', {
          params: { page, size, locale }
        })
        return response.data
      },
      enabled: !!userId,
      ...options
    })
  }

  // Get active promotions
  const useGetActivePromoCode = (page: number = 0, size: number = 10) => {
    const { userId } = useAuthStore()
    return useQuery<PromotionsCodeListResponse>({
      queryKey: [PROMOTIONS_QUERY_KEYS.PROMO_CODE_ACTIVE, page, size],
      queryFn: async () => {
        const response = await httpClient.get(
          `/loyalty/promotions/promo-code/active`,
          {
            params: { page, size }
          }
        )
        return response.data
      },
      enabled: !!userId,
      refetchOnMount: 'always',
      staleTime: 0
    })
  }

  // Get available promo code
  const useValidatePromoCodeMutation = () =>
    useMutation<
      {
        isValid: boolean
        isProm: boolean
      },
      any,
      string
    >({
      mutationFn: async (promoCode: string) => {
        const response = await httpClient.get(
          `/backoffice/promocodes/name/${promoCode}/validate`
        )
        return response?.data
      }
    })

  // Get available promo code
  const useApplyPromoCodeMutation = () =>
    useMutation<
      {
        isValid: boolean
        isProm: boolean
      },
      any,
      string
    >({
      mutationFn: async (promoCode: string) => {
        const response = await httpClient.post(
          `/loyalty/promotions/promo-code/apply?promoCode=${promoCode}`
        )
        return response?.data
      }
    })

  const useGetAvaiblePromoCode = (
    query: string = '',
    page: number = 0,
    size: number = 10
  ) => {
    const { userId } = useAuthStore()
    const locale = i18n.language || 'en'
    return useQuery<PromotionsCodeListResponse>({
      queryKey: [
        PROMOTIONS_QUERY_KEYS.PROMO_CODE_AVAILABEL,
        query,
        page,
        size,
        locale
      ],
      queryFn: async () => {
        const params: Record<string, any> = { page, size }
        if (query !== '') {
          params.query = query
        }

        const response = await httpClient.get(
          '/loyalty/promotions/promo-code/available',

          { params }
        )
        return response.data
      },
      enabled: !!userId,
      refetchOnMount: 'always',
      staleTime: 0
    })
  }

  return {
    useGetAllPromotions,
    useGetPromotion,
    useGetPromotionInfo,
    useCreatePromotion,
    useUpdatePromotion,
    useDeletePromotion,
    useCancelPromotion,
    useCancelBonus,
    useActivateBonus,
    useActivatePromotion,
    useGetSuggestedPromotions,
    useGetCompletedPromotions,
    useGetCancelledPromotions,
    useGetActivePromotions,
    usePostUserPromoCode,
    useApplyPromoCode,
    useGetActivePromoCode,
    useGetAvaiblePromoCode,
    useValidatePromoCodeMutation,
    useApplyPromoCodeMutation
  }
}
