import { httpClient } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

export const ONBOARDING_STATUS_QUERY_KEYS = {
  ONBOARDING_STATUS: 'onboarding-status'
}

export const useGetOnboardingStatus = () =>
  useQuery<any>({
    queryKey: [ONBOARDING_STATUS_QUERY_KEYS.ONBOARDING_STATUS],
    queryFn: async () => {
      const response = await httpClient.get(
        `/loyalty/user/achievements/OBG_FINISH/status`
      )
      return response.data
    }
  })
