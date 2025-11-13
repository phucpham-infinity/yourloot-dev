import CategoriesIcon from '@/assets/icons/sidebar/categories.svg'
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger
} from '@/components/animate-ui/base/accordion'
import { Separator } from '@/components/ui/separator'
import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

//list
import CasualIcon from '@/assets/icons/home/category/casual'
import CatogerSlotIcon from '@/assets/icons/home/category/catogerSlotIcon'
import CatogeryBonuesIcon from '@/assets/icons/home/category/catogeryBonuesIcon'
import CatogeryCrushIcon from '@/assets/icons/home/category/catogeryCrushIcon'
import CatogeryRouletteIcon from '@/assets/icons/home/category/catogeryRouletteIcon copy'
import CatogeryShowIcon from '@/assets/icons/home/category/catogeryShowIcon'
import CatogerySpotIcon from '@/assets/icons/home/category/catogerySpotIcon'
import CrapsIcon from '@/assets/icons/home/category/craps'
import FishingGames from '@/assets/icons/home/category/fishingGames'
import LotteryIcon from '@/assets/icons/home/category/lottery'
import MinesGamesIcon from '@/assets/icons/home/category/minesGames'
import PokerIcon from '@/assets/icons/home/category/poker'
import ScratchIcon from '@/assets/icons/home/category/scratch'
import { SUMMER_VIBE_GAME_IDS } from '@/constants/game.constants'

interface CategoriesMenuProps {
  isOpenSidebar: boolean
}

export const CategoriesMenu = ({ isOpenSidebar }: CategoriesMenuProps) => {
  const [value, setValue] = useState<any>([])
  const { t } = useTranslation()
  const navigate = useNavigate()

  const categoryList = [
    {
      iconLeft: <CatogeryBonuesIcon className="w-4 h-4" />,
      translationKey: 'bonus',
      title: 'Bonus',
      category: ['bonus'],
      isShow: true
    },
    {
      iconLeft: <CatogerSlotIcon className="w-4 h-4" />,
      translationKey: 'slotGames',
      title: 'Slots',
      category: ['slots'],
      isShow: true
    },
    {
      iconLeft: <CatogeryCrushIcon className="w-4 h-4" />,
      translationKey: 'crash',
      title: 'Crash',
      category: ['crash'],
      isShow: true
    },
    {
      iconLeft: <CatogeryShowIcon className="w-4 h-4" />,
      translationKey: 'shows',
      title: 'Game Shows',
      category: ['game_show'],
      isShow: true
    },
    {
      iconLeft: <CatogerySpotIcon className="w-4 h-4" />,
      translationKey: 'sport',
      title: 'Sport',
      category: ['virtual_sports'],
      isShow: true
    },
    {
      iconLeft: <LotteryIcon className="w-4 h-4" />,
      translationKey: 'lottery',
      title: 'Lottery',
      category: ['lottery'],
      isShow: true
    },
    {
      iconLeft: <CatogeryRouletteIcon className="w-4 h-4" />,
      translationKey: 'roulette',
      title: 'Roulette',
      category: ['roulette'],
      isShow: true
    },
    {
      iconLeft: <CasualIcon className="w-4 h-4" />,
      translationKey: 'casual',
      title: 'Casual',
      category: ['casual'],
      isShow: true
    },
    {
      iconLeft: <CrapsIcon className="w-4 h-4" />,
      translationKey: 'craps',
      title: 'Craps',
      category: ['craps'],
      isShow: true
    },
    {
      iconLeft: <ScratchIcon className="w-4 h-4" />,
      translationKey: 'scratch',
      title: 'Scratch',
      category: ['scratch'],
      isShow: true
    },
    {
      iconLeft: <PokerIcon className="w-4 h-4" />,
      translationKey: 'poker',
      title: 'Poker',
      category: ['poker'],
      isShow: true
    },
    {
      iconLeft: <FishingGames className="w-4 h-4" />,
      translationKey: 'fishing',
      title: 'Fishing',
      category: ['fishing'],
      isShow: true
    },
    {
      iconLeft: <MinesGamesIcon className="w-4 h-4" />,
      translationKey: 'mines',
      title: 'Mines',
      category: ['mines']
    },
    {
      iconLeft: <LotteryIcon className="w-4 h-4" />,
      translationKey: 'summerVibe',
      title: t('categories.summerVibe.title', 'Harvest of Wins'),
      category: ['summerVibe'],
      isShow: false,
      type: 'ids',
      gameIds: SUMMER_VIBE_GAME_IDS.join(',')
    }
  ]

  const handleNavigate = (category: any) => {
    if (category?.type === 'ids' && category?.gameIds) {
      navigate(
        `/game-ids?gameIds=${category?.gameIds}&title=${category?.title}`
      )
    } else {
      navigate(
        `/game-category?category=${category?.category[0]}&title=${category?.title}`
      )
    }
  }

  return (
    <div className="w-full">
      {' '}
      {isOpenSidebar ? (
        <Accordion
          onValueChange={(data) => {
            setValue(data)
          }}
          value={value}
          className={clsx(
            'w-full mb-2',
            value?.length > 0 && 'outline-app-default rounded-[6px]'
          )}
        >
          <AccordionItem className="border-b-0" value="item-1">
            <AccordionTrigger className={'hover:decoration-none'}>
              <div className="flex items-center gap-2 pl-[12px] cursor-pointer">
                <img src={CategoriesIcon} className="w-4 h-4" />
                <span className="leading-none text-app-medium-14">
                  Categories
                </span>
              </div>
            </AccordionTrigger>
            <AccordionPanel className="max-h-[300px] overflow-y-auto scroll-bar-yloot">
              {categoryList.map((category) => (
                <div
                  onClick={() => {
                    handleNavigate(category)
                  }}
                  key={category.translationKey}
                  className="flex items-center gap-2 pl-[16px] py-2 cursor-pointer"
                >
                  {category.iconLeft}
                  <span className="leading-none text-app-medium-14">
                    {t(
                      `categories.${category?.translationKey}.title`,
                      category?.title
                    )}
                  </span>
                </div>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      ) : (
        <div className="flex items-center gap-2 pl-[12px] py-[10px] cursor-pointer mb-2 hover:bg-sidebar-active-light rounded-[6px]">
          <img src={CategoriesIcon} className="w-4 h-4" />
        </div>
      )}
      <Separator className="my-4 bg-[#2A2242]" />
    </div>
  )
}
