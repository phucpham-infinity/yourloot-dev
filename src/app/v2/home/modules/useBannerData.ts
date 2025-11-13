import { useScreen } from '@/hooks'
import { promotionsController } from '@/services/controller/promotions'
import { useAuthStore, useWalletStore } from '@/store'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { BannerItem } from './banner'

// Banner assets imports
import d_banner_L_1_RU from '/public/images/banner/image-L1-RU.png'
import d_banner_L_1_UZ from '/public/images/banner/image-L1-UZ.png'
import d_banner_L_1 from '/public/images/banner/image-L1.png'
import d_banner_L_2_RU from '/public/images/banner/image-L2-RU.png'
import d_banner_L_2_UZ from '/public/images/banner/image-L2-UZ.png'
import d_banner_L_2 from '/public/images/banner/image-L2.png'
// import harvestDesktopRU from '/public/images/banner/image-L3-RU.png'
// import harvestDesktop from '/public/images/banner/image-L3.png'
// import d_banner_L_4_RU from '/public/images/banner/image-L4-RU.png'
// import d_banner_L_4 from '/public/images/banner/image-L4.png'

//desktop M
// import d_banner_M from '/public/images/banner/image-M.png'
// import d_banner_M_RU from '/public/images/banner/image-M-RU.png'
// import d_banner_M_UZ from '/public/images/banner/image-M-UZ.png'
// mobile M
// import banner_M from '/public/images/banner/m-image-M.png'

// import d_banner_S_RU from '/public/images/banner/image-S-ru.png'
// import d_banner_S from '/public/images/banner/image-S.png'
import banner_L_1_RU from '/public/images/banner/m-image-L1-RU.png'
import banner_L_1_UZ from '/public/images/banner/m-image-L1-UZ.png'
import banner_L_1 from '/public/images/banner/m-image-L1.png'
import banner_L_2_RU from '/public/images/banner/m-image-L2-RU.png'
import banner_L_2_UZ from '/public/images/banner/m-image-L2-UZ.png'
import banner_L_2 from '/public/images/banner/m-image-L2.png'
// import harvestMobileRU from '/public/images/banner/m-image-L3-RU.png'
// import harvestMobile from '/public/images/banner/m-image-L3.png'
// import banner_L_4_RU from '/public/images/banner/m-image-L4-RU.png'
// import banner_L_4 from '/public/images/banner/m-image-L4.png'
// import banner_M_RU from '/public/images/banner/m-image-M-RU.png'
// import banner_M_UZ from '/public/images/banner/m-image-M-UZ.png'

import banner_S_RU from '/public/images/banner/S/m-image-S-ru.png'
import banner_S from '/public/images/banner/S/m-image-S.png'
import banner_S_UZ from '/public/images/banner/S/m-image-S-uz.png'

// import d_banner_L_5_RU from '/public/images/banner/image-L5-RU.png'
// import d_banner_L_5_UZ from '/public/images/banner/image-L5-UZ.png'
// import d_banner_L_5 from '/public/images/banner/image-L5.png'
// import banner_L_5_RU from '/public/images/banner/m-image-L5-RU.png'
// import banner_L_5_UZ from '/public/images/banner/m-image-L5-UZ.png'
// import banner_L_5 from '/public/images/banner/m-image-L5.png'

// banner Month 4/11
import mobile_M_ENG from '/public/images/banner/mobile-M-ENG.png'
import mobile_M_RU from '/public/images/banner/mobile-M-RU.png'
import mobile_M_UZ from '/public/images/banner/mobile-M-UZB.png'

import desktop_banner_M_ENG from '/public/images/banner/desktop-M-ENG.png'
import desktop_banner_M_RU from '/public/images/banner/desktop-M-RU.png'
import desktop_banner_M_UZ from '/public/images/banner/desktop-M-UZB.png'

// banner Month 7/11
import mobile_L_ENG from '/public/images/banner/Mobile-L_ENG_cashback.png'
import mobile_L_RU from '/public/images/banner/Mobile-L_RU_cashback.png'
import mobile_L_UZ from '/public/images/banner/Mobile-L_UZB_cashback.png'

import desktop_L_ENG from '/public/images/banner/Desktop-L_ENG_cashback.png'
import desktop_L_RU from '/public/images/banner/Desktop-L_RU_cashback.png'
import desktop_L_UZ from '/public/images/banner/Desktop-L_UZB_cashback.png'

// banner Month 10/11
// import mobile_S_ENG from '/public/images/banner/S/m-image-S.png'
// import mobile_S_RU from '/public/images/banner/S/m-image-S-ru.png'
// import mobile_S_UZ from '/public/images/banner/S/m-image-S-uz.png'

import desktop_S_ENG from '/public/images/banner/S/d-image-S.png'
import desktop_S_RU from '/public/images/banner/S/d-image-S-ru.png'
import desktop_S_UZ from '/public/images/banner/S/d-image-S-uz.png'

// Types
type Language = 'en' | 'ru' | 'yz'
type BannerAssets = {
  desktop: string
  mobile: string
}
type LocalizedBannerAssets = {
  [key in Language]: BannerAssets
}

// Banner assets configuration
const BANNER_ASSETS = {
  L1: {
    en: { desktop: d_banner_L_1, mobile: banner_L_1 },
    ru: { desktop: d_banner_L_1_RU, mobile: banner_L_1_RU },
    yz: { desktop: d_banner_L_1_UZ, mobile: banner_L_1_UZ }
  } as LocalizedBannerAssets,
  L2: {
    en: { desktop: d_banner_L_2, mobile: banner_L_2 },
    ru: { desktop: d_banner_L_2_RU, mobile: banner_L_2_RU },
    yz: { desktop: d_banner_L_2_UZ, mobile: banner_L_2_UZ }
  } as LocalizedBannerAssets,
  L3: {
    en: { desktop: desktop_L_ENG, mobile: mobile_L_ENG },
    ru: { desktop: desktop_L_RU, mobile: mobile_L_RU },
    yz: { desktop: desktop_L_UZ, mobile: mobile_L_UZ }
  } as LocalizedBannerAssets,
  M: {
    en: { desktop: desktop_banner_M_ENG, mobile: mobile_M_ENG },
    ru: { desktop: desktop_banner_M_RU, mobile: mobile_M_RU },
    yz: { desktop: desktop_banner_M_UZ, mobile: mobile_M_UZ }
  } as LocalizedBannerAssets,
  S: {
    en: { desktop: desktop_S_ENG, mobile: banner_S },
    ru: { desktop: desktop_S_RU, mobile: banner_S_RU },
    yz: { desktop: desktop_S_UZ, mobile: banner_S_UZ }
  } as LocalizedBannerAssets
}

// Helper functions
const normalizeLanguage = (language: string): Language => {
  if (language === 'ru') return 'ru'
  if (language === 'yz') return 'yz'
  return 'en'
}

const getBannerAsset = (
  bannerType: keyof typeof BANNER_ASSETS,
  language: string,
  isMobile: boolean
): string => {
  const normalizedLang = normalizeLanguage(language)
  const assets = BANNER_ASSETS[bannerType][normalizedLang]
  return isMobile ? assets.mobile : assets.desktop
}

const extractPromotionItems = (data: any): any[] => {
  if (Array.isArray(data?.content)) {
    return data.content
  }
  if (Array.isArray(data?.content?.promotions)) {
    return data.content.promotions
  }
  return []
}

const createBannerItem = (
  src: string,
  to: string,
  title = '',
  description = '',
  isShowText = true
): BannerItem => ({
  title,
  description,
  src,
  isShowText,
  to
})

export const useBannerData = () => {
  const { i18n } = useTranslation()
  const { userId } = useAuthStore()
  const { isMobile } = useScreen()
  const { wallets } = useWalletStore()
  const { useGetActivePromotions, useGetSuggestedPromotions } =
    promotionsController()

  // Fetch promotions to compute dynamic links
  const { data: activePromotionsData } = useGetActivePromotions('', 0, 10, {
    refetchOnMount: 'always',
    staleTime: 0
  })
  const { data: suggestedPromotionsData } = useGetSuggestedPromotions(0, 10, {
    refetchOnMount: 'always',
    staleTime: 0
  })

  const welcomeBonus = useMemo(() => {
    const items = extractPromotionItems(activePromotionsData)
    const wb = items.find((p) => p?.isWb === true)
    return wb !== undefined
  }, [activePromotionsData])

  const getPromotionLinkByKeyword = useCallback(
    (keyword: string) => {
      const items = extractPromotionItems(suggestedPromotionsData)
      const promotion = items.find((p) =>
        (p?.name || '').toLowerCase().includes(keyword.toLowerCase())
      )
      const id = promotion?.id || promotion?.promotionId
      const type =
        promotion?.promotionType || promotion?.type || keyword + '_bonus'
      return id ? `/promotion/available/${id}/${type}` : null
    },
    [suggestedPromotionsData]
  )

  const cashbackBannerLink = useMemo(() => {
    const walletDefault = wallets.find((w) => w.isDefault)
    switch (walletDefault?.currency) {
      case 'RUB':
        return '/promotion/available/bb4008ef-d426-46f3-9746-48525ae4108c/GENERIC?isBonus=false'
      case 'UZS':
        return '/promotion/available/c211d4e4-b85c-4239-accf-42ca2bf22ecf/GENERIC?isBonus=false'
      case 'USDT':
        return '/promotion/available/d1d0e941-2ae7-4d24-b38a-d5918118c093/GENERIC?isBonus=false'
      case 'USDC':
        return '/promotion/available/16b84a5c-8e43-4e77-a44b-694b2877a784/GENERIC?isBonus=false'
      case 'BTC':
        return '/promotion/available/cc549cdd-796e-4c50-898d-e6aeb52df178/GENERIC?isBonus=false'
      case 'BNB':
        return '/promotion/available/23d638c1-04af-4f9b-bb66-cdcf5a92d9bb/GENERIC?isBonus=false'
      case 'TRX':
        return '/promotion/available/fedc08da-2dc8-41f6-a492-732c8ead2213/GENERIC?isBonus=false'
      case 'SOL':
        return '/promotion/available/2361ab9d-5745-477f-b2ce-a1c048db1fd1/GENERIC?isBonus=false'
      case 'ADA':
        return '/promotion/available/6d005c50-f1eb-42db-b9dd-2cb20b4624ae/GENERIC?isBonus=false'
      case 'ETH':
        return '/promotion/available/f0ad94d9-63b4-4bd9-abdf-398106c38674/GENERIC?isBonus=false'
      case 'TON':
        return '/promotion/available/1e4f3794-9035-472c-80ca-3f40c95671bb/GENERIC?isBonus=false'
      case 'LTC':
        return '/promotion/available/375a1474-8766-4ca3-a7e4-0625b03555b2/GENERIC?isBonus=false'
      default:
        return '/promotion/available/8b9937d9-c5aa-4618-984d-f62023b1fc96/GENERIC?isBonus=false'
    }
  }, [wallets])

  // Static banner lists with dynamic links
  const listL: BannerItem[] = useMemo(() => {
    const result: BannerItem[] = []
    if (welcomeBonus || userId === null || userId === undefined) {
      result.push(
        createBannerItem(
          getBannerAsset('L1', i18n.language, isMobile),
          '/bonus-landing'
        )
      )
    }

    // Add static banners
    const staticBanners: BannerItem[] = [
      createBannerItem(
        getBannerAsset('L2', i18n.language, isMobile),
        getPromotionLinkByKeyword('crypto') || '/promotion'
      )
    ]

    result.push(...staticBanners)

    if (cashbackBannerLink) {
      result.push(
        createBannerItem(
          getBannerAsset('L3', i18n.language, isMobile),
          cashbackBannerLink
        )
      )
    }
    return result
  }, [
    welcomeBonus,
    getPromotionLinkByKeyword,
    i18n.language,
    isMobile,
    userId,
    cashbackBannerLink
  ])

  const listM: BannerItem[] = useMemo(
    () => [
      createBannerItem(
        getBannerAsset('M', i18n.language, isMobile),
        '/game-provider/1spin4win?title=1spin4win'
      )
    ],
    [i18n.language, isMobile]
  )

  const listS: BannerItem[] = useMemo(
    () => [
      createBannerItem(
        getBannerAsset('S', i18n.language, isMobile),
        '/game-inside/pragmaticexternal/GatesOfOlympus1'
      )
    ],
    [i18n.language, isMobile]
  )

  return {
    listL,
    listM,
    listS
  }
}
