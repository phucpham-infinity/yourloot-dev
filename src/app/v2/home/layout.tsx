import { ReactNode, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import BannerCarousel from './modules/banner'

import { backofficeController } from '@/services/controller/backoffice'
import { useProfileStore } from '@/store'

import CatogerSlotIcon from '@/assets/icons/home/category/catogerSlotIcon'
import CatogeryBonuesIcon from '@/assets/icons/home/category/catogeryBonuesIcon'
import CatogeryCrushIcon from '@/assets/icons/home/category/catogeryCrushIcon'
import CatogeryRouletteIcon from '@/assets/icons/home/category/catogeryRouletteIcon copy'
import CatogeryShowIcon from '@/assets/icons/home/category/catogeryShowIcon'
// import CatogerySpotIcon from '@/assets/icons/home/category/catogerySpotIcon'
// import CrapsIcon from '@/assets/icons/home/category/craps'
// import FishingGames from '@/assets/icons/home/category/fishingGames'
// import LotteryIcon from '@/assets/icons/home/category/lottery'
// import MinesGamesIcon from '@/assets/icons/home/category/minesGames'
import PokerIcon from '@/assets/icons/home/category/poker'
// import ScratchIcon from '@/assets/icons/home/category/scratch'
// import { SUMMER_VIBE_GAME_IDS } from '@/constants/game.constants'
import FireIcon from '@/assets/icons/fire'
import LiveGameIcon from '@/assets/icons/v2/LiveGame'
import NewIcon from '@/assets/icons/v2/New'
import CategoryCarouselNew from './modules/carousel/CategoryNew'

interface HomeLayoutProps {
  children?: ReactNode
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  const { useGetBackofficeUtm, useGetBackofficeAffiliate } =
    backofficeController()
  const { mutate: postBackofficeUtm } = useGetBackofficeUtm()
  const { mutate: postBackofficeAffiliate } = useGetBackofficeAffiliate()

  const [searchParams] = useSearchParams()
  const userId = useProfileStore((s) => s.profile?.userId)

  useEffect(() => {
    if (
      userId &&
      (searchParams.get('stag') ||
        searchParams.get('tr_src') ||
        searchParams.get('tracking_link') ||
        searchParams.get('source_link') ||
        searchParams.get('visit_id') ||
        searchParams.get('sub') ||
        searchParams.get('sub_id1') ||
        searchParams.get('sub_id2'))
    ) {
      postBackofficeAffiliate({
        userId: userId ?? '',
        trackingLink: searchParams.get('tracking_link') ?? '',
        sourceLink: searchParams.get('source_link') ?? window.location.href,
        visitId: searchParams.get('visit_id') ?? '',
        sub: searchParams.get('sub') ?? '',
        stag: searchParams.get('sub_id1') ?? searchParams.get('stag') ?? '',
        trSrc: searchParams.get('sub_id2') ?? searchParams.get('tr_src') ?? ''
      })
    }
    if (userId && searchParams.get('utm_source'))
      postBackofficeUtm({
        userId: userId ?? '',
        utmSource: searchParams.get('utm_source') ?? '',
        utmCampaign: searchParams.get('utm_campaign') ?? '',
        utmMedium: searchParams.get('utm_medium') ?? '',
        utmContent: searchParams.get('utm_content') ?? '',
        sourceLink: searchParams.get('source_link') ?? window.location.href
      })
  }, [userId])

  return (
    <div className="w-full h-full gap-6 md:gap-8 flex flex-col">
      <BannerCarousel />
      <CategoryCarouselNew />

      {children}
    </div>
  )
}

export { type HomeLayoutProps }

export const defaultCategoryList = [
  {
    iconLeft: <FireIcon className="w-4 h-4" />,
    translationKey: 'popular',
    title: 'Popular',
    category: ['popular'],
    isShow: true
  },
  // {
  //   iconLeft: <HalloweenIcon className="w-4 h-4" />,
  //   translationKey: 'halloween',
  //   title: 'Halloween',
  //   category: ['halloween'],
  //   isShow: true
  // },
  {
    iconLeft: <CatogeryBonuesIcon className="w-4 h-4" />,
    translationKey: 'bonus',
    title: 'Bonus',
    category: ['bonus'],
    isShow: true
  },
  // {
  //   iconLeft: <LotteryIcon className="w-4 h-4" />,
  //   translationKey: 'summerVibe',
  //   title: 'Harvest of Wins',
  //   category: ['summerVibe'],
  //   isShow: true,
  //   type: 'ids',
  //   gameIds: SUMMER_VIBE_GAME_IDS.join(',')
  // },
  {
    iconLeft: <CatogerSlotIcon className="w-4 h-4" />,
    translationKey: 'slotGames',
    title: 'Slots',
    category: ['slots'],
    isShow: true
  },
  // {
  //   iconLeft: <CatogeryCrushIcon className="w-4 h-4" />,
  //   translationKey: 'crash',
  //   title: 'Crash',
  //   category: ['crash'],
  //   isShow: true
  // },
  {
    iconLeft: <CatogeryCrushIcon className="w-4 h-4" />,
    translationKey: 'fast',
    title: 'Fast',
    category: ['fast'],
    isShow: true
  },
  {
    iconLeft: <LiveGameIcon className="w-4 h-4" />,
    translationKey: 'liveGames',
    title: 'Live',
    category: ['live'],
    isShow: true
  },
  {
    iconLeft: <CatogeryShowIcon className="w-4 h-4" />,
    translationKey: 'shows',
    title: 'Game Shows',
    category: ['game_show'],
    isShow: true
  },
  // {
  //   iconLeft: <CatogerySpotIcon className="w-4 h-4" />,
  //   translationKey: 'sport',
  //   title: 'Sport',
  //   category: ['virtual_sports'],
  //   isShow: true
  // },
  // {
  //   iconLeft: <LotteryIcon className="w-4 h-4" />,
  //   translationKey: 'lottery',
  //   title: 'Lottery',
  //   category: ['lottery'],
  //   isShow: true
  // },
  {
    iconLeft: <NewIcon className="w-4 h-4 text-[#9E90CF]" />,
    title: 'New',
    category: ['new'],
    translationKey: 'new',
    isShow: true
  },
  {
    iconLeft: <CatogeryRouletteIcon className="w-4 h-4" />,
    translationKey: 'roulette',
    title: 'Roulette',
    category: ['roulette'],
    isShow: true
  },
  // {
  //   iconLeft: <CasualIcon className="w-4 h-4" />,
  //   translationKey: 'casual',
  //   title: 'Casual',
  //   category: ['casual'],
  //   isShow: true
  // },
  // {
  //   iconLeft: <CrapsIcon className="w-4 h-4" />,
  //   translationKey: 'craps',
  //   title: 'Craps',
  //   category: ['craps'],
  //   isShow: true
  // },
  // {
  //   iconLeft: <ScratchIcon className="w-4 h-4" />,
  //   translationKey: 'scratch',
  //   title: 'Scratch',
  //   category: ['scratch'],
  //   isShow: true
  // },
  {
    iconLeft: <PokerIcon className="w-4 h-4" />,
    translationKey: 'poker',
    title: 'Poker',
    category: ['poker'],
    isShow: true
  }
  // {
  //   iconLeft: <FishingGames className="w-4 h-4" />,
  //   translationKey: 'fishing',
  //   title: 'Fishing',
  //   category: ['fishing'],
  //   isShow: true
  // }
  // {
  //   iconLeft: <MinesGamesIcon className="w-4 h-4" />,
  //   translationKey: 'mines',
  //   title: 'Mines',
  //   category: ['mines']
  // }
]
