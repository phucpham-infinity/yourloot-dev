import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import Search from '@/assets/icons/search'
import ImageCardV2 from '@/components/common/ui/ImageV2'
import LoadingGame from '@/components/v2/loading-game'
import NoGameImagev2 from '@/components/v2/mo-game-v2'
import { PaginationV2 } from '@/components/v2/pagination'
import ChosseProvider from '@/components/v2/providers/ChosseProvider'
import TitleV2 from '@/components/v2/title-v2'
import { cn, css, DOMAIN_IMAGE_LOOT } from '@/lib/utils'
import { gameController } from '@/services/controller/games'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { isDesktop, isMobile } from 'react-device-detect'
import { useNavigate, useSearchParams } from 'react-router-dom'

const GameCategoryPageV2 = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category') || ''
  const title = searchParams.get('title') || ''
  const [search, setSearch] = useState('')
  const [provider, setProvider] = useState('')
  const [total, setTotal] = useState(0)

  const { useGetGamesV2, useGetTopGamesByCategory } = gameController()
  const { data: topGamesByCategory } = useGetTopGamesByCategory(category)

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleSearch = (value: string) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    debounceTimer.current = setTimeout(() => {
      setSearch(value)
    }, 500)
  }

  const {
    data: gamesData,
    fetchNextPage: fetchNextGamesPage,
    hasNextPage: hasNextGamesPage,
    isLoading: isLoadingGames,
    isFetchingNextPage: isFetchingNextGamesPage
  } = useGetGamesV2({
    size: 48,
    category: category,
    title: search,
    enabled: true,
    providers: provider
  })

  useEffect(() => {
    setTotal(gamesData?.pages[0]?.content?.totalElements || 0)
  }, [gamesData])

  const gameList = useMemo(() => {
    return gamesData?.pages.flatMap((page) => page.content?.content) || []
  }, [gamesData])

  const topGamesList = useMemo(
    () => topGamesByCategory || [],
    [topGamesByCategory]
  )

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

  const hasGame = gameListWithTopGames && gameListWithTopGames?.length > 0

  return (
    <div className="w-full h-full gap-4 flex flex-col">
      {isMobile ? (
        <>
          <TitleV2
            title={`${title}`}
            icon={<ArrowLeftIcon className="w-4 h-4" />}
            onClick={() => {
              navigate('/')
            }}
          />

          <div css={stylesFn} className="relative w-full ">
            <input
              onChange={(e) => {
                handleSearch(e.target.value)
              }}
              type="text"
              className="!pl-8 placeholder:text-app-medium-14 placeholder:text-white"
              placeholder="Search games"
            />
            <Search className="absolute w-3 h-3 left-[15px] top-[15px]" />
          </div>
        </>
      ) : (
        <div className="flex justify-between items-center w-full h-[40px]">
          <TitleV2
            hiddenViewAll={true}
            title={`${title}`}
            icon={<ArrowLeftIcon className="w-4 h-4" />}
            onClick={() => {
              navigate('/')
            }}
          />

          <div className="flex items-center gap-4">
            <ChosseProvider
              className="w-[200px] !m-0 !p-0 translate-y-[-10px]"
              onChange={(value) => {
                setProvider(value)
              }}
              provider={provider}
            />
            <div css={stylesFn} className="relative w-[200px]">
              <input
                onChange={(e) => {
                  handleSearch(e.target.value)
                }}
                type="text"
                className="!pl-8 placeholder:text-app-medium-14 placeholder:text-white"
                placeholder="Search games"
              />
              <Search className="absolute w-3 h-3 left-[15px] top-[15px]" />
            </div>
          </div>
        </div>
      )}

      {isLoadingGames ? (
        <LoadingGame />
      ) : (
        <>
          {hasGame ? (
            <>
              <div
                className={cn(
                  isDesktop && 'flex flex-wrap justify-start gap-4',
                  isMobile && 'grid grid-cols-3 gap-2 '
                )}
              >
                {gameListWithTopGames?.map((game) => (
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
            <NoGameImagev2 isSearch={!!search} />
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
  )
}

export default GameCategoryPageV2

const stylesFn = css`
  gap: 10px;
  input {
    width: 100%;
    display: flex;
    height: 40px;
    padding: 20px;
    justify-content: flex-end;
    align-items: center;
    border-radius: 10px;
    border: 1px solid #2e273c;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.1) 100%
    );
    outline: none;
    // box-shadow:
    //   6px 6px 12px 0px rgba(22, 20, 24, 0.5),
    //   -6px -6px 24px 0px rgba(148, 95, 255, 0.15);

    color: white;
    text-align: left;
    font-size: 14px;
    font-weight: 500;
    line-height: normal;
    cursor: pointer;

    &:hover {
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

    &:focus {
      border: 1px solid #2a2339;
      background:
        linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%),
        linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.1) 100%);
      box-shadow:
        6px 6px 12px 0px rgba(22, 20, 24, 0.5),
        -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
    }
    &:disabled {
      cursor: not-allowed;
      border: 1px solid #3a3248;
      background:
        linear-gradient(
          0deg,
          rgba(97, 97, 97, 0.2) 0%,
          rgba(97, 97, 97, 0.2) 100%
        ),
        linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.1) 100%);
      box-shadow:
        6px 6px 12px 0px rgba(22, 20, 24, 0.5),
        -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
      &:hover,
      &:focus {
        background:
          linear-gradient(
            0deg,
            rgba(97, 97, 97, 0.2) 0%,
            rgba(97, 97, 97, 0.2) 100%
          ),
          linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.5) 0%,
            rgba(0, 0, 0, 0.1) 100%
          );
        box-shadow:
          6px 6px 12px 0px rgba(22, 20, 24, 0.5),
          -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
      }
    }
  }
  .description {
    color: #6c6395;
    font-size: 10px;
    font-weight: 700;
    line-height: normal;
    padding-top: 10px;
  }
`
