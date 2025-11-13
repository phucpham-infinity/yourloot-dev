import PgSoftIcon from '@/assets/icons/home/PGSoft.svg'
import { css } from '@emotion/react'

import GameTitleHeader from '@/components/common/GameTitleHeader'
import Loader from '@/components/common/loader'
import ImageCard from '@/components/common/ui/Image'
import { gameController } from '@/services/controller/games'
import { useHomeStore } from '@/store/slices/home'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Piggy from '../../../../../components/common/Piggy'
import { isMobile } from 'react-device-detect'
import { DOMAIN_IMAGE_LOOT, DOMAIN_IMAGE_PROVIDER_LOOT } from '@/lib/utils'
import { useGamesStore } from '@/store'
import PopularIcon from '@/assets/images/profile/PopularIcon'

export default function GameSoftTab() {
  const navigate = useNavigate()
  const { setType } = useHomeStore()
  const { popularGames } = useGamesStore()
  const { useGetGamesV2, useGetTop12GamesByProvider } = gameController()

  const [searchParams, setSearchParams] = useSearchParams()
  const providerName = searchParams.get('gamesoft') || ''
  const title = searchParams.get('title') || ''
  const { ref, inView } = useInView()

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useGetGamesV2({
      size: 30,
      providers: providerName
      // enabled: providerName !== 'popular'
    })

  const { data: top12Games } = useGetTop12GamesByProvider(providerName)

  // Map with top12Games at the start of the list
  // NOTE: GAME_LIST by provider different new and popular
  const top12List = top12Games || []
  const gameList =
    top12List.length > 0
      ? [
          ...top12List,
          ...(data?.pages.flatMap((page) => page.content?.content) || [])
            // Đoạn filter này dùng để loại bỏ các game đã nằm trong danh sách top12Games khỏi danh sách game tổng, tránh bị trùng lặp.
            .filter(
              (game: any) =>
                !top12List.some((topGame: any) => topGame.id === game.id)
            )
        ]
      : data?.pages.flatMap((page) => page.content?.content) || []

  // NOTE: POPULAR_GAMES
  const randomGame =
    providerName === 'popular' ? popularGames?.[0] : gameList?.slice(0, 1)[0]
  const randomGame2 =
    providerName === 'popular'
      ? popularGames?.slice(1, 2)
      : gameList?.slice(1, 2)
  const randomGame3 =
    providerName === 'popular'
      ? popularGames?.slice(2, popularGames?.length)
      : gameList?.slice(2, gameList?.length)

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  const renderIcon = () => {
    if (providerName === 'popular') {
      return <PopularIcon />
      // NOTE: NEW_GAMES
    } else if (providerName === 'new') {
      return <img className="w-full h-full object-cover" src={PgSoftIcon} />
    } else if (providerName === '') {
      return <img className="w-full h-full object-cover" src={PgSoftIcon} />
    } else {
      return (
        <img
          className="w-full h-full object-cover"
          src={`${DOMAIN_IMAGE_PROVIDER_LOOT}/logos/providers/white/${providerName}.svg`}
        />
      )
    }
  }

  return (
    <div css={styles} className="w-full flex flex-col gap-5">
      <GameTitleHeader
        hiddenTitle={providerName !== 'popular' && providerName !== 'new'}
        hiddenIcon={false}
        icon={renderIcon()}
        title={title || providerName?.toLocaleUpperCase()}
        label="Back"
        onClick={() => {
          // TODO: need refactor
          const type = searchParams.get('type')
          if (type === 'provider') {
            setType('provider')
          } else {
            setType('')
            setSearchParams({})
          }
        }}
      />

      {isLoading ? (
        <div className="w-full h-[400px] flex justify-center items-center">
          <Loader className="" size={40} />
        </div>
      ) : (
        <>
          <div className="w-full flex gap-5">
            <Piggy
              className="w-full max-w-[610px]"
              randomGame={randomGame as any}
            />

            {!isMobile && (
              <>
                {!!randomGame2?.length &&
                  randomGame2?.map((game, idx) => {
                    return (
                      <ImageCard
                        key={idx}
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
            {randomGame3?.map((game, idx) => {
              return (
                <ImageCard
                  key={idx}
                  src={`${DOMAIN_IMAGE_LOOT}/${game?.provider}/${game?.id}.png`}
                  onClick={() =>
                    navigate(`/game-inside/${game?.provider}/${game?.id}`)
                  }
                />
              )
            })}
          </div>

          {/* Position for loading more */}
          <div
            ref={ref}
            className="w-full flex justify-center items-center "
          ></div>

          {/* Loading more */}
          {isFetchingNextPage && (
            <div className="w-full flex justify-center items-center h-[40px]">
              <Loader className="w-[10px] h-[10px]" size={40} />
            </div>
          )}
        </>
      )}
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
