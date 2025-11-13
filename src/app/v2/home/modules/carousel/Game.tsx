import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import ArrowRightIcon from '@/assets/icons/arrowRight'
import ImageCardV2 from '@/components/common/ui/ImageV2'
import {
  Carousel,
  CarouselContent,
  type CarouselApi
} from '@/components/ui/carousel'
import SeeAllBtn from '@/components/v2/see-all'
import TitleV2 from '@/components/v2/title-v2'
import { useIsMobile } from '@/hooks/use-mobile'
import { DOMAIN_IMAGE_LOOT } from '@/lib/utils'
import { gameController } from '@/services/controller/games'
import { saveGameToHistory } from '@/utils/gameHistory'
import { clsx } from 'clsx'
import { useTranslation } from 'react-i18next'

import { useAuthStore } from '@/store'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useNavigate } from 'react-router-dom'

const CarouselGame = ({
  category,
  onClick,
  icon,
  title,
  hiddenIcon: hiddenIcon = true
}: {
  category: string
  onClick: () => void
  icon: string | React.ReactElement
  title: string
  hiddenIcon?: boolean
}) => {
  const { t } = useTranslation()
  const { userId } = useAuthStore()
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const { ref, inView } = useInView({ triggerOnce: true })
  const [api, setApi] = useState<CarouselApi>()
  const carouselRef = useRef<HTMLDivElement>(null)
  const { useGetGamesV2, useGetTopGamesByCategory } = gameController()

  const handleGameClick = (game: any) => {
    // Save game to history before navigating
    saveGameToHistory(
      {
        id: game?.id,
        provider: game?.provider,
        title: game?.title || `${game?.provider}:${game?.id}`
      },
      userId
    )
    navigate(`/game-inside/${game?.provider}/${game?.id}`)
  }

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  const handleRightArrowClick = () => {
    // Check if we're at the end of the current carousel
    const canScrollNext = api?.canScrollNext()

    if (canScrollNext) {
      // If we can scroll, just scroll to next
      api?.scrollNext()
    } else if (hasNextPage && !isFetchingNextPage) {
      // If we can't scroll and there are more pages, load more
      handleLoadMore()
    }
  }

  const { data: topGamesByCategory } = useGetTopGamesByCategory(
    category,
    inView
  )

  const {
    data: gamesData,
    isLoading: isLoadingGames,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetGamesV2({
    size: 10,
    category: category,
    enabled: inView
  })

  const gameList =
    gamesData?.pages.flatMap((page) => page.content?.content) || []

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      // Only handle horizontal scrolling on desktop
      if (isMobile) return

      // Check if the wheel event is horizontal (touchpad horizontal scroll)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault()

        if (e.deltaX > 0) {
          // Scrolling right
          const canScrollNext = api?.canScrollNext()
          if (canScrollNext) {
            api?.scrollNext()
          } else if (hasNextPage && !isFetchingNextPage) {
            handleLoadMore()
          }
        } else {
          // Scrolling left
          api?.scrollPrev()
        }
      }
    },
    [api, hasNextPage, isFetchingNextPage, isMobile, handleLoadMore]
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

  const topGamesList = topGamesByCategory || []
  const gameListWithTopGames = useMemo(() => {
    const allGames =
      topGamesList.length > 0
        ? [...topGamesList, ...(gameList || [])]
        : gameList || []

    // Filter out duplicate games by id
    const uniqueGames = allGames.filter(
      (game: any, index: number, self: any[]) =>
        index === self.findIndex((g: any) => g.id === game.id)
    )

    // Return all unique games without load more button
    return uniqueGames
  }, [gameList, topGamesList, hasNextPage])

  if (!isLoadingGames && gameListWithTopGames?.length === 1 && inView)
    return null

  const renderLoadingItems = () => {
    return Array.from({ length: 20 }).map((_, idx) => (
      <div
        key={idx}
        className={clsx(
          'bg-gray-50 rounded-lg animate-pulse',
          isMobile
            ? 'min-w-[109px] min-h-[151px] w-[109px] h-[151px] rounded-[10px]'
            : 'flex-shrink-0 w-[146px] h-[202px] md:w-[146px] md:h-[202px]'
        )}
      />
    ))
  }

  const renderGameItems = () => {
    if (isLoadingGames) {
      return renderLoadingItems()
    }

    return gameListWithTopGames?.map((game, index) => {
      if (game?.id === 'see-all') {
        return <SeeAllBtn key={index} onClick={onClick} />
      }

      return (
        <ImageCardV2
          key={index}
          src={`${DOMAIN_IMAGE_LOOT}/${game?.provider}/${game?.id}.png`}
          onClick={() => {
            navigate(`/game-inside/${game?.provider}/${game?.id}`)
          }}
        />
      )
    })
  }

  const renderMobileView = () => (
    <div className="flex gap-2 overflow-x-auto scroll-bar-yloot">
      {renderGameItems()}
    </div>
  )

  const renderDesktopView = () => (
    <Carousel
      opts={{
        align: 'start',
        loop: false
      }}
      setApi={setApi}
      className="w-full"
    >
      <div className="flex items-center justify-between mb-4">
        <TitleV2
          title={title}
          icon={icon}
          onClick={onClick}
          hiddenIcon={hiddenIcon}
        />
        <div className="flex gap-2">
          <div
            className="text-[#9E90CF] hover:-translate-y-0.25 text-app-medium-14 font-medium px-2 py-1 rounded-[10px] hover:bg-[#372864] transition-all duration-300 cursor-pointer"
            onClick={onClick}
          >
            {t('game.popular.seeAll', 'View All')}
          </div>
          <div className="flex">
            <button
              className="hidden md:flex items-center justify-center w-6 h-6 rounded-md bg-transparent hover:bg-[#372864] hover:-translate-y-0.25 transition-all duration-300 disabled:opacity-50 cursor-pointer"
              onClick={() => api?.scrollPrev()}
            >
              <ArrowLeftIcon className="w-3 h-3" />
            </button>
            <button
              className="hidden md:flex items-center justify-center w-6 h-6 rounded-md bg-transparent hover:bg-[#372864] hover:-translate-y-0.25 transition-all duration-300 disabled:opacity-50 cursor-pointer"
              onClick={handleRightArrowClick}
              disabled={isFetchingNextPage}
            >
              <ArrowRightIcon className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
      <CarouselContent
        ref={carouselRef}
        className="flex gap-2 !ml-0 pt-2"
        style={{ gap: '8px' }}
      >
        {isLoadingGames
          ? renderLoadingItems()
          : gameListWithTopGames?.map((game, index) => (
              <div key={index} className="flex-shrink-0">
                {game?.id === 'see-all' ? (
                  <SeeAllBtn onClick={onClick} />
                ) : (
                  <ImageCardV2
                    src={`${DOMAIN_IMAGE_LOOT}/${game?.provider}/${game?.id}.png`}
                    onClick={() => handleGameClick(game)}
                  />
                )}
              </div>
            ))}
      </CarouselContent>
    </Carousel>
  )

  return (
    <>
      <div ref={ref} className="flex flex-col gap-4">
        {isMobile ? (
          <>
            <TitleV2
              title={title}
              icon={icon}
              onClick={onClick}
              hiddenIcon={hiddenIcon}
            />
            {renderMobileView()}
          </>
        ) : (
          renderDesktopView()
        )}
      </div>

      {/* Mobile Login Drawer */}
      {/* <CustomDrawer
        title="Login"
        open={isLoginDrawerOpen}
        onOpenChange={setIsLoginDrawerOpen}
      >
        <SignInV2 />
      </CustomDrawer> */}
    </>
  )
}

export default CarouselGame
