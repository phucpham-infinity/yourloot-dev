import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import ArrowRightIcon from '@/assets/icons/arrowRight'
import HistoryIcon from '@/assets/icons/history'
import ImageCardV2 from '@/components/common/ui/ImageV2'
import {
  Carousel,
  CarouselContent,
  type CarouselApi
} from '@/components/ui/carousel'
import TitleV2 from '@/components/v2/title-v2'
import { useIsMobile } from '@/hooks/use-mobile'
import { DOMAIN_IMAGE_LOOT } from '@/lib/utils'
import { useAuthStore } from '@/store'
import {
  getGameHistoryForDisplay,
  saveGameToHistory
} from '@/utils/gameHistory'
import { clsx } from 'clsx'
import { memo, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const GameHistoryCarousel = memo(() => {
  const { userId } = useAuthStore()
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const [api, setApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [historyGames, setHistoryGames] = useState<any[]>([])
  const [isLoadingHistory, setIsLoadingHistory] = useState(true)
  const navigate = useNavigate()

  // Get game history from localStorage
  useEffect(() => {
    setIsLoadingHistory(true)
    try {
      const history = getGameHistoryForDisplay(20, userId)
      setHistoryGames(history)
    } catch (error) {
      console.error('Failed to load game history:', error)
      setHistoryGames([])
    } finally {
      setIsLoadingHistory(false)
    }
  }, [userId])

  const listHistory = useMemo(() => {
    return historyGames || []
  }, [historyGames])

  useEffect(() => {
    if (!api) {
      return
    }

    const updateScrollButtons = () => {
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }

    updateScrollButtons()
    api.on('select', updateScrollButtons)

    return () => {
      api.off('select', updateScrollButtons)
    }
  }, [api])

  if (!isLoadingHistory && listHistory?.length === 0) return null

  const renderLoadingItems = () => {
    return Array.from({ length: 20 }).map((_, idx) => (
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
    if (isLoadingHistory) {
      return renderLoadingItems()
    }

    return listHistory?.map((game: any, index: number) => {
      return (
        <ImageCardV2
          className="max-w-[115px] md:max-w-[132px]"
          key={index}
          src={`${DOMAIN_IMAGE_LOOT}/${game.provider}/${game.id}.png`}
          onClick={() => {
            // Save game to history before navigating
            saveGameToHistory(
              {
                id: game.id,
                provider: game.provider,
                title: game.title || `${game.provider}:${game.id}`
              },
              userId
            )
            navigate(`/game-inside/${game.provider}/${game.id}`)
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
          hiddenIcon={false}
          title={t('home.gameHistory', 'Game History')}
          icon={<HistoryIcon className="w-4 h-4" />}
          onClick={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
        <div className="flex gap-2">
          {/* Only show arrows, no "View All" button */}
          <div className="flex">
            <button
              className={clsx(
                'hidden md:flex items-center justify-center w-6 h-6 rounded-md bg-transparent hover:bg-[#372864] hover:-translate-y-0.25 transition-all duration-300 cursor-pointer',
                !canScrollPrev &&
                  'opacity-50 cursor-not-allowed hidden md:hidden'
              )}
              onClick={() => {
                api?.scrollPrev()
              }}
              disabled={!canScrollPrev}
            >
              <ArrowLeftIcon className="w-3 h-3" />
            </button>
            <button
              className={clsx(
                'hidden md:flex items-center justify-center w-6 h-6 rounded-md bg-transparent hover:bg-[#372864] hover:-translate-y-0.25 transition-all duration-300 cursor-pointer',
                !canScrollNext &&
                  'opacity-50 cursor-not-allowed hidden md:hidden'
              )}
              onClick={() => {
                api?.scrollNext()
              }}
              disabled={!canScrollNext}
            >
              <ArrowRightIcon className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
      <CarouselContent className="flex gap-2 !ml-0 pt-2" style={{ gap: '8px' }}>
        {isLoadingHistory
          ? renderLoadingItems()
          : listHistory?.map((game: any, index: number) => (
              <div key={index} className="flex-shrink-0">
                <ImageCardV2
                  src={`${DOMAIN_IMAGE_LOOT}/${game.provider}/${game.id}.png`}
                  onClick={() => {
                    // Save game to history before navigating
                    saveGameToHistory(
                      {
                        id: game.id,
                        provider: game.provider,
                        title: game.title || `${game.provider}:${game.id}`
                      },
                      userId
                    )
                    navigate(`/game-inside/${game.provider}/${game.id}`)
                  }}
                />
              </div>
            ))}
      </CarouselContent>
    </Carousel>
  )

  return (
    <div id="game-history" className="flex flex-col gap-4">
      {isMobile ? (
        <>
          <TitleV2
            hiddenIcon={false}
            title={t('home.gameHistory', 'Game History')}
            icon={<HistoryIcon className="w-4 h-4" />}
            onClick={function (): void {
              throw new Error('Function not implemented.')
            }}
          />
          {renderMobileView()}
        </>
      ) : (
        renderDesktopView()
      )}
    </div>
  )
})

export default GameHistoryCarousel
