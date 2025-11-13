import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import ArrowRightIcon from '@/assets/icons/arrowRight'
import StarIcon from '@/assets/icons/iconStar'
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
import { useAuthStore } from '@/store'
import { clsx } from 'clsx'
import { memo, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const FavoritesCarousel = memo(() => {
  const { userId } = useAuthStore()
  const { useGetFavoritesGames } = gameController()
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const [api, setApi] = useState<CarouselApi>()

  const { data: favoritesGames, isLoading: isLoadingFavorites } =
    useGetFavoritesGames(userId ?? '')
  const navigate = useNavigate()

  const listFavorites = useMemo(() => {
    return [...(favoritesGames || [])]
  }, [favoritesGames])

  if (!isLoadingFavorites && listFavorites?.length === 0) return null

  const renderLoadingItems = () => {
    return Array.from({ length: 20 }).map((_, idx) => (
      <div
        key={idx}
        className={clsx(
          'bg-gray-50 rounded-lg animate-pulse',
          isMobile
            ? 'min-w-[115px] min-h-[115px] w-full h-[115px] rounded-[10px]'
            : 'flex-shrink-0 w-[115px] h-[115px] md:w-[132px] md:h-[132px]'
        )}
      />
    ))
  }

  const renderGameItems = () => {
    if (isLoadingFavorites) {
      return renderLoadingItems()
    }

    return listFavorites?.map((game, index) => {
      if (game === 'see-all') {
        return <SeeAllBtn key={index} onClick={() => navigate('/favorites')} />
      }

      return (
        <ImageCardV2
          className="max-w-[115px] md:max-w-[132px]"
          key={index}
          src={`${DOMAIN_IMAGE_LOOT}/${game.split(':')[0]}/${game.split(':')[1]}.png`}
          onClick={() => {
            navigate(`/game-inside/${game.split(':')[0]}/${game.split(':')[1]}`)
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
          hiddenIcon
          title={t('home.favorites', 'Favorites')}
          icon={<StarIcon className="w-4 h-4" />}
          onClick={() => navigate('/favorites')}
        />
        <div className="flex gap-2">
          <div
            className="text-[#9E90CF] hover:-translate-y-0.25 text-xs font-medium px-2 py-1 rounded-[10px] hover:bg-[#372864] transition-all duration-300 cursor-pointer"
            onClick={() => navigate('/favorites')}
          >
            {t('game.popular.seeAll', 'View All')}
          </div>
          <div className="flex">
            <button
              className="hidden md:flex items-center justify-center w-6 h-6 rounded-md bg-transparent hover:bg-[#372864] hover:-translate-y-0.25 transition-all duration-300 disabled:opacity-50 cursor-pointer"
              onClick={() => {
                api?.scrollPrev()
              }}
            >
              <ArrowLeftIcon className="w-3 h-3" />
            </button>
            <button
              className="hidden md:flex items-center justify-center w-6 h-6 rounded-md bg-transparent hover:bg-[#372864] hover:-translate-y-0.25 transition-all duration-300 disabled:opacity-50 cursor-pointer"
              onClick={() => {
                api?.scrollNext()
              }}
            >
              <ArrowRightIcon className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
      <CarouselContent className="flex gap-2 !ml-0 pt-2" style={{ gap: '8px' }}>
        {isLoadingFavorites
          ? renderLoadingItems()
          : listFavorites?.map((game, index) => (
              <div key={index} className="flex-shrink-0">
                {game === 'see-all' ? (
                  <SeeAllBtn onClick={() => navigate('/favorites')} />
                ) : (
                  <ImageCardV2
                    src={`${DOMAIN_IMAGE_LOOT}/${game.split(':')[0]}/${game.split(':')[1]}.png`}
                    onClick={() => {
                      navigate(
                        `/game-inside/${game.split(':')[0]}/${game.split(':')[1]}`
                      )
                    }}
                  />
                )}
              </div>
            ))}
      </CarouselContent>
    </Carousel>
  )

  return (
    <div id="favorites" className="flex flex-col gap-4">
      {isMobile ? (
        <>
          <TitleV2
            hiddenIcon
            title={t('home.favorites', 'Favorites')}
            icon={<StarIcon className="w-4 h-4" />}
            onClick={() => {
              navigate('/favorites')
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

export default FavoritesCarousel
