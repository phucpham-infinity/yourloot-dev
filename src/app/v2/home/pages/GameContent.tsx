import ImageCardV2 from '@/components/common/ui/ImageV2'
import LoadingGame from '@/components/v2/loading-game'
import NoGamev2 from '@/components/v2/mo-game-v2'
import { PaginationV2 } from '@/components/v2/pagination'
import { SUMMER_VIBE_GAME_IDS } from '@/constants/game.constants'
import { cn, DOMAIN_IMAGE_LOOT } from '@/lib/utils'
import { gameController } from '@/services/controller/games'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { isDesktop, isMobile } from 'react-device-detect'
import { useNavigate, useSearchParams } from 'react-router-dom'
import HomeLayout from '../layout'

const GameContentV2 = () => {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const category = searchParams.get('category') || ''
  const urlSearch = searchParams.get('search') || ''

  const [total, setTotal] = useState(0)

  const { useGetGamesV2, useGetTopGamesByCategory } = gameController()
  const { data: topGamesByCategory } = useGetTopGamesByCategory(category)

  const {
    data: gamesData,
    fetchNextPage: fetchNextGamesPage,
    hasNextPage: hasNextGamesPage,
    isLoading: isLoadingGames,
    isFetchingNextPage: isFetchingNextGamesPage
  } = useGetGamesV2({
    size: 48,
    ...(category === 'harvestofwins' ? {} : { category }),
    ...(urlSearch ? { title: urlSearch } : {}),
    enabled: true,
    gameIds: category === 'harvestofwins' ? SUMMER_VIBE_GAME_IDS.join(',') : ''
  })

  useEffect(() => {
    setTotal(gamesData?.pages[0]?.content?.totalElements || 0)
  }, [gamesData])

  const gameList = useMemo(() => {
    return gamesData?.pages.flatMap((page) => page.content?.content) || []
  }, [gamesData])

  const topGamesList = useMemo(() => {
    return topGamesByCategory || []
  }, [topGamesByCategory])

  const gameListWithTopGames = useMemo(() => {
    return topGamesList.length > 0
      ? [...topGamesList, ...(gameList || [])]
      : gameList || []
  }, [topGamesList, gameList])

  const handleShowMore = useCallback(() => {
    if (hasNextGamesPage) {
      fetchNextGamesPage()
    }
  }, [hasNextGamesPage, fetchNextGamesPage])

  return (
    <HomeLayout>
      <div className="w-full h-full gap-4 flex flex-col">
        {isLoadingGames ? (
          <LoadingGame />
        ) : (
          <>
            {gameListWithTopGames && gameListWithTopGames?.length > 0 ? (
              <>
                <div
                  className={cn(
                    isDesktop && 'flex flex-wrap justify-start gap-4',
                    isMobile && 'grid grid-cols-3 gap-2 '
                  )}
                >
                  {gameListWithTopGames?.map((game: any) => (
                    <ImageCardV2
                      className="w-full h-full rounded-[10px]"
                      key={game?.id}
                      src={`${DOMAIN_IMAGE_LOOT}/${game?.provider}/${game?.id}.png`}
                      onClick={() =>
                        navigate(`/game-inside/${game?.provider}/${game?.id}`)
                      }
                    />
                  ))}
                </div>
                {/* Loading more */}
                {isFetchingNextGamesPage && hasNextGamesPage && <LoadingGame />}
              </>
            ) : (
              <NoGamev2 isSearch={!!urlSearch} />
            )}
          </>
        )}

        {!isLoadingGames && gameListWithTopGames?.length > 0 && (
          <PaginationV2
            currentPage={gameListWithTopGames?.length}
            totalPages={total + topGamesList?.length}
            loadMore={handleShowMore}
          />
        )}
      </div>
    </HomeLayout>
  )
}

export default GameContentV2
