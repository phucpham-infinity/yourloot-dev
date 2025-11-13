import { css } from '@emotion/react'
import { useTranslation } from 'react-i18next'

import IconBtn from '@/components/common/icon-button'
import ImageCard from '@/components/common/ui/Image'
import Piggy from '../../../../../components/common/Piggy'
import Popular from '../../../../../components/common/Popular'
import PopularGame from '../PopularGame'

import ArrowRightIcon from '@/assets/icons/arrowRight'
import lightProvider from '@/assets/icons/home/light/lightProvider.svg'
// import queenIcon from '@/assets/icons/home/queen.svg'
// import CatogePokerIcon from '@/assets/icons/home/category/catogePokerIcon'
import CatogerSlotIcon from '@/assets/icons/home/category/catogerSlotIcon'
// import CatogeryBlackjackAndRouletteIcon from '@/assets/icons/home/category/catogeryBlackjackAndRouletteIcon'
import CatogeryBonuesIcon from '@/assets/icons/home/category/catogeryBonuesIcon'
import CatogeryCrushIcon from '@/assets/icons/home/category/catogeryCrushIcon'
// import LiveBlackJackIcon from '@/assets/icons/home/category/catogeryLiveBlackIcon'
// import CatogeryNewIcon from '@/assets/icons/home/category/catogeryNewIcon'
import CasualIcon from '@/assets/icons/home/category/casual'
import CatogeryShowIcon from '@/assets/icons/home/category/catogeryShowIcon'
import CatogerySpotIcon from '@/assets/icons/home/category/catogerySpotIcon'
import CrapsIcon from '@/assets/icons/home/category/craps'
import FishingGames from '@/assets/icons/home/category/fishingGames'
import LotteryIcon from '@/assets/icons/home/category/lottery'
import MinesGamesIcon from '@/assets/icons/home/category/minesGames'
import PokerIcon from '@/assets/icons/home/category/poker'
import ScratchIcon from '@/assets/icons/home/category/scratch'
import { userController, UserEventType } from '@/services/controller'
import { useGamesStore } from '@/store'
import { useHomeStore } from '@/store/slices/home'
import { useUserEventStore } from '@/store/slices/user-event'
import { useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { useNavigate, useSearchParams } from 'react-router-dom'
// import LiveRouletteIcon from '@/assets/icons/home/category/liveRoulette'
import CatogeryRouletteIcon from '@/assets/icons/home/category/catogeryRouletteIcon copy'
import { DOMAIN_IMAGE_LOOT } from '@/lib/utils'
export default function CategoryTab() {
  const { setType } = useHomeStore()
  const { allGames } = useGamesStore()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { setIsDoneCategoryPage, isDoneCategoryPage } = useUserEventStore()
  const { useUserEvent } = userController()
  const { mutate: userEvent } = useUserEvent()
  const [searchParams, setSearchParams] = useSearchParams()

  const updateQueryParam = (name: string, value: string[]) => {
    if (!name || !value) return
    searchParams.set(name, value.join(','))
    setSearchParams(searchParams)
  }

  useEffect(() => {
    if (!isDoneCategoryPage) {
      userEvent(
        {
          userEvent: UserEventType.FIRST_PERSONAL_ACCOUNT_VISIT
        },
        {
          onSuccess: () => {
            setIsDoneCategoryPage(true)
          }
        }
      )
    }
  }, [isDoneCategoryPage, setIsDoneCategoryPage, userEvent])

  const randomGame = allGames?.slice(0, 1)[0]

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-5">
        {categoryList?.map((item, index) => (
          <Popular
            key={index}
            css={stylesProvider}
            imgPosition={
              <img
                src={lightProvider}
                className="absolute bottom-0 right-0 z-0"
              />
            }
            className="w-full h-[142px] lg:h-[140px] gap-5"
            iconLeft={item.iconLeft}
            title={t(`categories.${item.translationKey}.title`)}
            // des={t(`categories.${item.translationKey}.description`)}
            onClick={() => {
              setType('liveGame')
              if (item?.category?.length) {
                updateQueryParam('category', item?.category)
              }
              if (item?.title?.length) {
                updateQueryParam('titleCategory', [item?.title])
              }
              window.scrollTo(0, 0)
            }}
            numberLineTitle={2}
            numberLineDes={2}
            styleTitle={{
              lineHeight:
                item?.translationKey === 'blackjackAndRoulette'
                  ? '26px'
                  : '20px',
              wordBreak: 'break-word',
              maxWidth:
                item?.translationKey === 'blackjackAndRoulette'
                  ? '105px'
                  : 'unset'
            }}
            iconRight={
              <IconBtn
                className="hidden md:flex"
                icon={<ArrowRightIcon />}
                onClick={() => {
                  setType('liveGame')
                  if (item?.category?.length) {
                    updateQueryParam('category', item?.category)
                  }
                  if (item?.title?.length) {
                    updateQueryParam('titleCategory', [item?.title])
                  }
                  window.scrollTo(0, 0)
                }}
              />
            }
          />
        ))}
      </div>

      <div className="w-full flex flex-col gap-5">
        <PopularGame className="w-full" />
        <div className="w-full flex gap-5">
          <Piggy className="w-full max-w-[610px]" randomGame={randomGame!} />

          {!isMobile && (
            <>
              {!!allGames?.length &&
                allGames.slice(1, 2).map((game) => {
                  return (
                    <ImageCard
                      key={game?.id}
                      src={`${DOMAIN_IMAGE_LOOT}/${game?.provider}/${game?.id}.png`}
                      onClick={() =>
                        navigate(`/game-inside/${game?.provider}/${game?.id}`)
                      }
                    />
                  )
                })}
            </>
          )}
        </div>

        <div className="w-full grid grid-cols-3 lg:grid-cols-4 gap-5">
          {!!allGames?.length &&
            allGames
              .slice(2, isMobile ? 11 : 6)
              .map((game, index) => (
                <ImageCard
                  key={index}
                  src={`${DOMAIN_IMAGE_LOOT}/${game?.provider}/${game?.id}.png`}
                  onClick={() =>
                    navigate(`/game-inside/${game?.provider}/${game?.id}`)
                  }
                />
              ))}
        </div>
      </div>
    </div>
  )
}

const stylesProvider = css`
  background: radial-gradient(
    237.29% 116.82% at 60.95% -22.92%,
    #362c5a 0%,
    #181526 100%
  );
`

// eslint-disable-next-line react-refresh/only-export-components
export const categoryList = [
  {
    iconLeft: <CatogeryBonuesIcon className="absolute top-5 left-5" />,
    translationKey: 'bonus',
    title: 'Games for Bonus',
    category: ['bonus'] //call api
  },
  // {
  //   iconLeft: <CatogeryNewIcon className="absolute top-[10px] left-[4px]" />,
  //   translationKey: 'new',
  //   title: 'New',
  //   category: ['new'] // chua co
  // },
  {
    iconLeft: <CatogerSlotIcon className="absolute top-5 left-5" />,
    translationKey: 'slotGames',
    title: 'Slots',
    category: ['slots']
  },
  {
    iconLeft: <CatogeryCrushIcon className="absolute top-5 left-5" />,
    translationKey: 'crash',
    title: 'Crash Games',
    category: ['crash']
  },
  {
    iconLeft: <CatogeryShowIcon className="absolute top-5 left-5" />,
    translationKey: 'shows',
    title: 'Game Shows',
    category: ['game_show']
  },
  // {
  //   iconLeft: (
  //     <CatogeryBlackjackAndRouletteIcon className="absolute top-[10px] left-[4px]" />
  //   ),
  //   translationKey: 'blackjackAndRoulette',
  //   title: 'Live Games',
  //   category: [''] // chua co
  // },
  // {
  //   iconLeft: <LiveRouletteIcon className="absolute top-[10px] left-[4px]" />,
  //   translationKey: 'liveRoulette',
  //   title: 'Live Roulette',
  //   category: [''] // chua co
  // },
  // {
  //   iconLeft: <LiveBlackJackIcon className="absolute top-[10px] left-[4px]" />,
  //   translationKey: 'liveBlackjack',
  //   title: 'Live Blackjack',
  //   category: [''] // chua co
  // },
  // {
  //   iconLeft: <CatogePokerIcon className="absolute top-[10px] left-[4px]" />,
  //   translationKey: 'livePoker',
  //   title: 'Live Poker',
  //   category: [''] // chua co
  // },
  {
    iconLeft: <CatogerySpotIcon className="absolute top-5 left-5" />,
    translationKey: 'sport',
    title: 'Sport',
    category: ['virtual_sports']
  },
  {
    iconLeft: <LotteryIcon className="absolute top-5 left-5" />,
    translationKey: 'lottery',
    title: 'Lottery',
    category: ['lottery']
  },
  {
    iconLeft: <CatogeryRouletteIcon className="absolute top-5 left-5" />,
    translationKey: 'roulette',
    title: 'Roulette',
    category: ['roulette']
  },
  {
    iconLeft: <CasualIcon className="absolute top-5 left-5" />,
    translationKey: 'casual',
    title: 'Casual',
    category: ['casual']
  },
  {
    iconLeft: <CrapsIcon className="absolute top-5 left-5" />,
    translationKey: 'craps',
    title: 'Craps',
    category: ['craps']
  },
  {
    iconLeft: <ScratchIcon className="absolute top-5 left-5" />,
    translationKey: 'scratch',
    title: 'Scratch',
    category: ['scratch']
  },
  {
    iconLeft: <PokerIcon className="absolute top-5 left-5" />,
    translationKey: 'poker',
    title: 'Poker',
    category: ['poker']
  },
  {
    iconLeft: <FishingGames className="absolute top-5 left-5" />,
    translationKey: 'fishing',
    title: 'Fishing Games',
    category: ['fishing']
  },
  {
    iconLeft: <MinesGamesIcon className="absolute top-5 left-5" />,
    translationKey: 'mines',
    title: 'Mines Games',
    category: ['mines']
  },
  {
    iconLeft: <LotteryIcon className="absolute top-5 left-5" />,
    translationKey: 'summerVibe',
    title: 'Harvest of Wins',
    category: ['summerVibe']
  }
]

// [
//   "slots",
//   "card",
//   "craps",
//   "crash",
//   "casual",
//   "lottery",
//   "mines",
//   "roulette",
//   "scratch",
//   "game_show",
//   "poker",
//   "video_poker",
//   "virtual_sports",
//   "fishing"
// ]
