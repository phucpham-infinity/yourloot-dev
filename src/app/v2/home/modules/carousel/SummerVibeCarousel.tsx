import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import ArrowRightIcon from '@/assets/icons/arrowRight'
import LotteryIcon from '@/assets/icons/home/category/lottery'
import ImageCardV2 from '@/components/common/ui/ImageV2'
import {
  Carousel,
  CarouselContent,
  type CarouselApi
} from '@/components/ui/carousel'
import SeeAllBtn from '@/components/v2/see-all'
import TitleV2 from '@/components/v2/title-v2'
import { SUMMER_VIBE_GAME_IDS } from '@/constants/game.constants'
import { useIsMobile } from '@/hooks/use-mobile'
import { DOMAIN_IMAGE_LOOT } from '@/lib/utils'
import { gameController } from '@/services/controller/games'
import { useAuthStore } from '@/store'
import { saveGameToHistory } from '@/utils/gameHistory'
import { clsx } from 'clsx'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useInView } from 'react-intersection-observer'
import { useNavigate } from 'react-router-dom'

const SummerVibeCarousel = () => {
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const { t } = useTranslation()
  const { useGetGamesV2 } = gameController()
  const { ref, inView } = useInView({ triggerOnce: true })
  const [api, setApi] = useState<CarouselApi>()
  const { userId } = useAuthStore()
  const gameIds = useMemo(() => SUMMER_VIBE_GAME_IDS.join(','), [])
  const { data: gamesData, isLoading: isLoadingGames } = useGetGamesV2({
    size: 30,
    gameIds: gameIds,
    enabled: inView
  })

  const gameList: any[] = useMemo(
    () => [
      ...(
        gamesData?.pages.flatMap((page) => page.content?.content) || []
      ).slice(0, 10)
    ],
    [gamesData]
  )

  const handleNavigate = useCallback(() => {
    navigate(
      `/game-ids?gameIds=${gameIds}&title=${t('categories.summerVibe.title', 'Harvest of Wins')}`
    )
  }, [navigate, gameIds, t])

  if (!isLoadingGames && gameList?.length === 0 && inView) return null

  const renderLoadingItems = () => {
    return Array.from({ length: 10 }).map((_, idx) => (
      <div
        key={idx}
        className={clsx(
          'bg-gray-50 rounded-lg animate-pulse',
          isMobile
            ? 'min-w-[115px] min-h-[157px] w-[115px] h-[157px] rounded-[10px]'
            : 'flex-shrink-0 w-[152px] h-[208px] md:w-[152px] md:h-[208px]'
        )}
      />
    ))
  }

  const renderGameItems = () => {
    if (isLoadingGames) {
      return renderLoadingItems()
    }

    return gameList?.map((game, index) => {
      if (game?.id === 'see-all') {
        return <SeeAllBtn key={index} onClick={handleNavigate} />
      }

      return (
        <ImageCardV2
          key={index}
          src={`${DOMAIN_IMAGE_LOOT}/${game?.provider}/${game?.id}.png`}
          onClick={() => {
            // Save game to history before navigation
            saveGameToHistory(
              {
                id: game?.id,
                provider: game?.provider,
                title:
                  game?.title || game?.name || `${game?.provider}/${game?.id}`
              },
              userId
            )
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
      <div className="flex items-center justify-between mb-5">
        <TitleV2
          title={t('categories.summerVibe.title', 'Harvest of Wins')}
          icon={<LotteryIcon className="w-4 h-4" />}
          onClick={handleNavigate}
          hiddenIcon
        />
        <div className="flex gap-2">
          <div
            className="text-[#9E90CF] hover:-translate-y-0.25 text-app-medium-14 px-2 py-1 rounded-[10px] hover:bg-[#372864] transition-all duration-300 cursor-pointer"
            onClick={handleNavigate}
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
              onClick={() => api?.scrollNext()}
            >
              <ArrowRightIcon className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
      <CarouselContent className="flex gap-2 !ml-0 pt-2" style={{ gap: '8px' }}>
        {isLoadingGames
          ? renderLoadingItems()
          : gameList?.map((game, index) => (
              <div key={index} className="flex-shrink-0">
                {game?.id === 'see-all' ? (
                  <SeeAllBtn onClick={handleNavigate} />
                ) : (
                  <ImageCardV2
                    src={`${DOMAIN_IMAGE_LOOT}/${game?.provider}/${game?.id}.png`}
                    onClick={() => {
                      // Save game to history before navigation
                      saveGameToHistory(
                        {
                          id: game?.id,
                          provider: game?.provider,
                          title:
                            game?.title ||
                            game?.name ||
                            `${game?.provider}/${game?.id}`
                        },
                        userId
                      )
                      navigate(`/game-inside/${game?.provider}/${game?.id}`)
                    }}
                  />
                )}
              </div>
            ))}
      </CarouselContent>
    </Carousel>
  )

  return (
    <div ref={ref} className="flex flex-col gap-4">
      {isMobile ? (
        <>
          <TitleV2
            title={t('categories.summerVibe.title', 'Harvest of Wins')}
            icon={<LotteryIcon className="w-4 h-4" />}
            onClick={handleNavigate}
            hiddenIcon
          />
          {renderMobileView()}
        </>
      ) : (
        renderDesktopView()
      )}
    </div>
  )
}

export default SummerVibeCarousel
