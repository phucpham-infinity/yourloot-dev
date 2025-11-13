import { useMutation } from '@tanstack/react-query'
import { httpClient } from '@/services/api'

export const BACKOFFICE_QUERY_KEYS = {
  BACKOFFICE: 'backoffice'
}

export const backofficeController = () => {
  const useGetBackofficeUtm = () => {
    return useMutation({
      mutationFn: async (data: {
        userId: string
        utmSource: string
        utmCampaign: string
        utmMedium: string
        utmContent: string
        sourceLink: string
      }) => {
        const response = await httpClient.post('/backoffice/save/utm', data)
        return response.data
      }
    })
  }

  const useGetBackofficeAffiliate = () => {
    return useMutation({
      mutationFn: async (data: {
        userId: string
        stag: string
        trSrc: string
        trackingLink: string
        visitId: string
        sub: string
        sourceLink: string
        subId1?: string
        subId2?: string
      }) => {
        const response = await httpClient.post(
          '/backoffice/save/affiliate',
          data
        )
        return response.data
      }
    })
  }

  return {
    useGetBackofficeUtm,
    useGetBackofficeAffiliate
  }
}
