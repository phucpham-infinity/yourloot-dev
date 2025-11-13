import { css } from '@emotion/react'

import Piggy from '../../../../../components/common/Piggy'
import PopularGame from '../PopularGame'

import Loader from '@/components/common/loader'
import ImageCard from '@/components/common/ui/Image'
import { gameController } from '@/services/controller'
import { useGamesStore } from '@/store/slices/games'
import { useEffect, useMemo } from 'react'
import { isMobile } from 'react-device-detect'
import { useInView } from 'react-intersection-observer'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { DOMAIN_IMAGE_LOOT } from '@/lib/utils'
import { SUMMER_VIBE_GAME_IDS } from '@/constants/game.constants'
export default function LiveGameTab() {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const category = searchParams.get('category') || ''
  const { useGetBonusGames, useGetGamesV2, useGetTopGamesByCategory } =
    gameController()
  const { ref, inView } = useInView()
  const { allGames } = useGamesStore()

  const isBonus = category === 'bonus'
  const isSummerVibe = category === 'summerVibe'

  const { data: topGamesByCategory } = useGetTopGamesByCategory(category)

  // category bonus
  const {
    data: bonusGames,
    fetchNextPage: fetchNextBonusPage,
    hasNextPage: hasNextBonusPage,
    isLoading: isLoadingBonus,
    isFetchingNextPage: isFetchingNextBonusPage
  } = useGetBonusGames({
    size: 33,
    enabled: isBonus
  })

  // category other
  const {
    data: gamesData,
    fetchNextPage: fetchNextGamesPage,
    hasNextPage: hasNextGamesPage,
    isLoading: isLoadingGames,
    isFetchingNextPage: isFetchingNextGamesPage
  } = useGetGamesV2({
    size: 33,
    category: category,
    enabled: !isBonus
  })

  // category summerVibe
  const { data: gamesDataSummerVibe, isLoading: isLoadingGamesSummerVibe } =
    useGetGamesV2({
      size: 400,
      gameIds: SUMMER_VIBE_GAME_IDS.join(',')
    })

  useEffect(() => {
    if (inView) {
      if (isBonus && hasNextBonusPage) {
        fetchNextBonusPage()
      } else if (!isBonus && hasNextGamesPage) {
        fetchNextGamesPage()
      }
    }
  }, [
    inView,
    isBonus,
    hasNextBonusPage,
    hasNextGamesPage,
    fetchNextBonusPage,
    fetchNextGamesPage
  ])

  const gameList = useMemo(() => {
    if (isSummerVibe) {
      return (
        gamesDataSummerVibe?.pages.flatMap(
          (page: any) => page.content?.content
        ) || []
      )
    } else if (isBonus) {
      return bonusGames?.pages.flatMap((page) => page.content?.content) || []
    } else {
      return gamesData?.pages.flatMap((page) => page.content?.content) || []
    }
  }, [isBonus, bonusGames, gamesData])

  const topGamesList = topGamesByCategory || []
  const gameListWithTopGames = (() => {
    const allGames =
      topGamesList.length > 0
        ? [...topGamesList, ...(gameList || [])]
        : gameList || []

    // Filter out duplicate games by id
    const uniqueGames = allGames.filter(
      (game: any, index: number, self: any[]) =>
        index === self.findIndex((g: any) => g.id === game.id)
    )

    return uniqueGames
  })()

  const randomGame = gameListWithTopGames?.slice(0, 1)[0]
  const randomGame2 = gameListWithTopGames?.slice(1, 2) || []
  const randomGame3 =
    gameListWithTopGames?.slice(2, gameListWithTopGames?.length) || []

  const popuular2 = allGames?.slice(1, 2)
  const popuular3 = allGames?.slice(2, allGames?.length - 1)

  return (
    <div css={styles} className="w-full flex flex-col gap-5">
      {isLoadingBonus || isLoadingGames || isLoadingGamesSummerVibe ? (
        <div className="w-full h-[400px] flex justify-center items-center">
          <Loader className="" size={40} />
        </div>
      ) : (
        <>
          <div className="w-full flex gap-5">
            <Piggy
              className="w-full max-w-[610px]"
              randomGame={randomGame! as any}
            />

            {!isMobile && (
              <>
                {randomGame2.map((game) => (
                  <ImageCard
                    key={game?.id}
                    src={`${DOMAIN_IMAGE_LOOT}/${game?.provider}/${game?.id}.png`}
                    onClick={() =>
                      navigate(`/game-inside/${game?.provider}/${game?.id}`)
                    }
                  />
                ))}
              </>
            )}
          </div>

          <div className="grid grid-cols-3 lg:grid-cols-4 gap-5">
            {randomGame3.map((game) => (
              <ImageCard
                key={game?.id}
                className="w-full"
                src={`${DOMAIN_IMAGE_LOOT}/${game?.provider}/${game?.id}.png`}
                onClick={() =>
                  navigate(`/game-inside/${game?.provider}/${game?.id}`)
                }
              />
            ))}
          </div>
        </>
      )}

      {/* Position for loading more */}
      <div ref={ref} className="w-full flex justify-center items-center "></div>

      {/* Loading more */}
      {(isFetchingNextBonusPage || isFetchingNextGamesPage) && (
        <div className="w-full flex justify-center items-center h-[40px]">
          <Loader className="w-[10px] h-[10px]" size={40} />
        </div>
      )}

      <PopularGame className="w-full" />

      <div className="w-full flex gap-5">
        <Piggy
          className="w-full max-w-[610px]"
          randomGame={randomGame! as any}
        />

        {!isMobile && (
          <>
            {!!popuular2?.length &&
              [...popuular2].slice(0, 2).map((game) => {
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

      <div className="grid grid-cols-3 lg:grid-cols-4 gap-5">
        {!!popuular3?.length &&
          popuular3?.slice(0, isMobile ? 9 : 4).map((game) => {
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
      </div>
    </div>
  )
}

const styles = css`
  border-radius: 20px;
  // background: linear-gradient(
  //   180deg,
  //   rgba(64, 53, 85, 0.2) 0%,
  //   rgba(0, 0, 0, 0.1) 100%
  // );
`
