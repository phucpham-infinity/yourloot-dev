import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import ImageCardV2 from '@/components/common/ui/ImageV2'
import LoadingGame from '@/components/v2/loading-game'
import NoGameImagev2 from '@/components/v2/mo-game-v2'
import TitleV2 from '@/components/v2/title-v2'
import { cn, DOMAIN_IMAGE_LOOT } from '@/lib/utils'
import { gameController } from '@/services/controller/games'
import { useAuthStore } from '@/store'
import { useMemo } from 'react'
import { isDesktop, isMobile } from 'react-device-detect'
import { useNavigate, useSearchParams } from 'react-router-dom'

const FavoriesPageV2 = () => {
  const navigate = useNavigate()
  const { userId } = useAuthStore()
  const { useGetFavoritesGames } = gameController()
  const [searchParams] = useSearchParams()
  const urlSearch = searchParams.get('search') || ''

  const { data: favoritesGames, isLoading: isLoadingFavorites } =
    useGetFavoritesGames(userId ?? '')

  const listFavorites = useMemo(() => {
    let filteredFavorites = favoritesGames || []

    if (urlSearch.trim()) {
      const keyword = urlSearch.trim().toLowerCase()
      filteredFavorites = (favoritesGames || []).filter((game: any) =>
        game?.title?.toLowerCase().includes(keyword)
      )
    }

    return [...filteredFavorites.slice(0, 10)]
  }, [favoritesGames, urlSearch])

  return (
    <div className="w-full h-full gap-4 flex flex-col">
      <TitleV2
        title="Favorites"
        hiddenViewAll={isDesktop}
        icon={<ArrowLeftIcon className="w-4 h-4" />}
        onClick={() => {
          navigate('/')
        }}
      />

      {isLoadingFavorites ? (
        <LoadingGame />
      ) : (
        <>
          {listFavorites && listFavorites?.length > 0 ? (
            <div
              className={cn(
                isDesktop && 'flex flex-wrap justify-start gap-4',
                isMobile && 'grid grid-cols-3 gap-2'
              )}
            >
              {listFavorites &&
                listFavorites?.map((game, index) => (
                  <ImageCardV2
                    key={index}
                    src={`${DOMAIN_IMAGE_LOOT}/${game.split(':')[0]}/${game.split(':')[1]}.png`}
                    onClick={() => {
                      navigate(
                        `/game-inside/${game.split(':')[0]}/${game.split(':')[1]}`
                      )
                    }}
                  />
                ))}
            </div>
          ) : (
            <NoGameImagev2 isSearch={!!urlSearch} />
          )}
        </>
      )}
    </div>
  )
}

export default FavoriesPageV2
