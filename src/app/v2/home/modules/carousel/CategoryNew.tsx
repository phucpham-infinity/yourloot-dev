import { default as SearchIcon } from '@/assets/icons/search'

import Search2Icon from '@/assets/icons/search2'
import BonusIcon from '@/assets/icons/v2/Bonus'
import CrashIcon from '@/assets/icons/v2/Crash'
import NewIcon from '@/assets/icons/v2/New'
import PopularIcon from '@/assets/icons/v2/Popular'
import SlotsIcon from '@/assets/icons/v2/Slots'
import { CustomDrawer } from '@/components/common/custom-drawer'
import IconBtn from '@/components/common/icon-button'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import { useScreen } from '@/hooks'
import { cn, css } from '@/lib/utils'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'
import SearchDialog from '../Search'
const CategoryCarouselNew = memo(() => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { xs, sm } = useScreen()
  const [searchParams, setSearchParams] = useSearchParams()
  const [openSearch, setOpenSearch] = useState(false)
  const [inputValue, setInputValue] = useState(searchParams.get('search') || '')

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isSmallScreen = xs || sm

  // Sync inputValue with URL params when URL changes externally
  useEffect(() => {
    const urlSearchValue = searchParams.get('search') || ''
    setInputValue(urlSearchValue)
  }, [searchParams])

  const categories = [
    {
      title: t('home.all', 'All Games'),
      category: ['all'],
      active: !searchParams.get('category')
    },
    // {
    //   icon: <HalloweenIcon className="w-4 h-4 text-app-brand-medium" />,
    //   title: t('categories.halloween.title', 'Halloween'),
    //   category: ['halloween'],
    //   active: searchParams.get('category') === 'halloween'
    // },
    // {
    //   icon: <HarvestOfWinsIcon className="w-4 h-4 text-app-brand-medium" />,
    //   title: 'Harvest of Wins',
    //   category: ['harvestofwins'],
    //   active: searchParams.get('category') === 'harvestofwins'
    // },
    {
      icon: <SlotsIcon className="w-4 h-4 text-app-brand-medium" />,
      title: t('home.slots', 'Slots'),
      category: ['slots'],
      active: searchParams.get('category') === 'slots'
    },
    // {
    //   icon: <CrashIcon className="w-4 h-4 text-app-brand-light" />,
    //   title: t('home.crash', 'Crash'),
    //   category: ['crash'],
    //   active: searchParams.get('category') === 'crash'
    // },
    {
      icon: <CrashIcon className="w-4 h-4 text-app-brand-light" />,
      title: t('home.fast', 'Fast'),
      category: ['fast'],
      active: searchParams.get('category') === 'fast'
    },
    {
      icon: <PopularIcon className="w-4 h-4 text-app-brand-light" />,
      title: t('home.popular', 'Popular'),
      category: ['popular'],
      active: searchParams.get('category') === 'popular'
    },
    {
      icon: <BonusIcon className="w-4 h-4 text-app-brand-light" />,
      title: t('home.bonus', 'Bonus Games'),
      category: ['bonus'],
      active: searchParams.get('category') === 'bonus'
    },
    {
      icon: <NewIcon className="w-4 h-4 text-app-brand-light" />,
      title: t('home.new', 'New'),
      category: ['new'],
      active: searchParams.get('category') === 'new'
    }
    // {
    //   icon: <LivePokerIcon className="w-4 h-4 text-app-brand-light" />,
    //   title: 'Poker',
    //   category: ['poker'],
    //   active: searchParams.get('category') === 'poker'
    // },
    // {
    //   icon: <LiveBlackjackIcon className="w-4 h-4 text-app-brand-light" />,
    //   title: 'Blackjack',
    //   category: ['blackjack'],
    //   active: searchParams.get('category') === 'blackjack'
    // },
    // {
    //   icon: <RouleteIcon className="w-4 h-4 text-app-brand-light" />,
    //   title: 'Roulette',
    //   category: ['roulette'],
    //   active: searchParams.get('category') === 'roulette'
    // }
  ]

  const [carouselApi, setCarouselApi] = useState<any>(null)
  const [canScrollNext, setCanScrollNext] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!carouselApi) return

    const updateScrollState = () => {
      setCanScrollNext(carouselApi.canScrollNext())
    }

    updateScrollState()
    carouselApi.on('select', updateScrollState)
    carouselApi.on('reInit', updateScrollState)

    return () => {
      carouselApi.off('select', updateScrollState)
      carouselApi.off('reInit', updateScrollState)
    }
  }, [carouselApi])

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      // Only handle horizontal scrolling on desktop
      if (isMobile) return

      // Check if the wheel event is horizontal (touchpad horizontal scroll)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault()

        if (e.deltaX > 0) {
          // Scrolling right
          carouselApi?.scrollNext()
        } else {
          // Scrolling left
          carouselApi?.scrollPrev()
        }
      }
    },
    [carouselApi, isMobile]
  )

  // Add wheel event listener for touchpad scrolling
  useEffect(() => {
    const carouselElement = carouselRef.current
    if (!carouselElement) return

    carouselElement.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      carouselElement.removeEventListener('wheel', handleWheel)
    }
  }, [handleWheel])

  const renderDesktopView = () => (
    <Carousel
      opts={{
        align: 'start',
        loop: false
      }}
      className="w-full h-full"
      setApi={setCarouselApi}
    >
      <CarouselContent ref={carouselRef} className="flex gap-2 !ml-0 h-full">
        {categories?.map((item) => (
          <CarouselItem key={item?.title} className="basis-auto h-[42px] !ml-0">
            <div
              onClick={() => {
                if (item?.category?.[0] === 'all') {
                  navigate('/')
                } else {
                  navigate(`/game-content?category=${item?.category?.[0]}`)
                }
              }}
              className={cn(
                'flex items-center gap-2 h-full rounded-[10px] px-3 cursor-pointer bg-app-surface hover:bg-app-surface-hover',
                item?.active && 'border-1 border-app-brand-light',
                !item?.active && 'border-1 border-transparent'
              )}
            >
              {item?.icon && <div>{item?.icon}</div>}
              <div className="text-[#D9CEFF] text-[14px] font-medium whitespace-nowrap">
                {item.title}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )

  return (
    <div id="category" className="flex flex-col gap-4">
      <div className="flex gap-2 h-[42px]">
        {isSmallScreen && (
          <IconBtn
            className="rounded-[10px]! border-1 border-[#2A2242]"
            icon={<SearchIcon className="w-3 h-3" />}
            onClick={() => setOpenSearch(true)}
          />
        )}
        {isMobile ? (
          <div className="flex w-full h-full gap-2 overflow-x-auto scroll-bar-yloot">
            {categories?.map((item) => (
              <div
                onClick={() => {
                  if (item?.category?.[0] === 'all') {
                    navigate('/')
                  } else {
                    navigate(`/game-content?category=${item?.category?.[0]}`)
                  }
                }}
                key={item?.title}
                className={cn(
                  'flex items-center gap-2 h-full rounded-[10px] px-3 cursor-pointer bg-app-surface hover:bg-app-surface-hover flex-shrink-0',
                  item?.active && 'border-1 border-app-brand-light',
                  !item?.active && 'border-1 border-transparent'
                )}
              >
                {item?.icon && <div>{item?.icon}</div>}
                <div className="text-[#D9CEFF] text-[14px] font-medium whitespace-nowrap">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="flex-1 min-w-0">{renderDesktopView()}</div>
            {!isSmallScreen && (
              <div
                css={stylesFn()}
                className="relative w-1/2 flex-shrink-0 h-full p-2 rounded-[10px] border-[1px] border-[#2e273c]"
              >
                {canScrollNext && (
                  <div
                    className="absolute w-10 h-10 left-[-49px] top-0"
                    style={{
                      background:
                        'linear-gradient(270deg, #040305 0%, rgba(4, 3, 5, 0.00) 100%)'
                    }}
                  ></div>
                )}
                <input
                  type="text"
                  className="!pl-8 w-full h-full font-inter text-v2-app-medium-14 !text-white !border-none !outline-none focus:!border-none focus:!outline-none placeholder:text-white"
                  placeholder={t(
                    'search.placeholder',
                    'Search from 3 characters'
                  )}
                  value={inputValue}
                  onChange={(e) => {
                    const value = e.target.value
                    setInputValue(value)
                    if (debounceTimer.current) {
                      clearTimeout(debounceTimer.current)
                    }
                    debounceTimer.current = setTimeout(() => {
                      if (value && value.length >= 3) {
                        // Update URL params without navigation
                        const newParams = new URLSearchParams(searchParams)
                        newParams.set('search', value)
                        setSearchParams(newParams)
                      } else if (!value) {
                        // Clear search - remove search param
                        const newParams = new URLSearchParams(searchParams)
                        newParams.delete('search')
                        setSearchParams(newParams)
                      }
                    }, 1000)
                  }}
                />
                <Search2Icon className="absolute !w-3 !h-3 left-[15px] top-[15px] " />
              </div>
            )}
          </>
        )}
      </div>
      {(isMobile || isSmallScreen) && (
        <CustomDrawer
          title={t('home.titleSearch', 'Search')}
          open={openSearch}
          onOpenChange={(open) => setOpenSearch(open)}
        >
          <SearchDialog />
        </CustomDrawer>
      )}
    </div>
  )
})

const stylesFn = () => css`
  &:has(input:hover) {
    outline: none;
    border: 1px solid #453561;
    background:
      linear-gradient(
        0deg,
        rgba(154, 103, 255, 0.2) 0%,
        rgba(154, 103, 255, 0.2) 100%
      ),
      linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.1) 100%);
    box-shadow:
      6px 6px 12px 0px rgba(22, 20, 24, 0.5),
      -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
  }
`
export default CategoryCarouselNew
