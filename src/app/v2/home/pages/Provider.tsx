import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import Search from '@/assets/icons/search'
import ImageCardV2 from '@/components/common/ui/ImageV2'
import LoadingGame from '@/components/v2/loading-game'
import NoGameImagev2 from '@/components/v2/mo-game-v2'
import { PaginationV2 } from '@/components/v2/pagination'
import TitleV2 from '@/components/v2/title-v2'
import {
  cn,
  css,
  DOMAIN_IMAGE_LOOT,
  DOMAIN_IMAGE_PROVIDER_LOOT
} from '@/lib/utils'
import { gameController } from '@/services/controller/games'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { isDesktop, isMobile } from 'react-device-detect'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

const GameProviderPageV2 = () => {
  const navigate = useNavigate()
  const params = useParams()
  const providerName = params.provider || ''
  const [searchParams] = useSearchParams()
  const title = searchParams.get('title') || ''
  const urlSearch = searchParams.get('search') || ''

  const [search, setSearch] = useState(urlSearch)
  const [total, setTotal] = useState(0)
  const { useGetGamesV2, useGetTop12GamesByProvider } = gameController()

  const handleSearch = (value: string) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    debounceTimer.current = setTimeout(() => {
      setSearch(value)
    }, 500)
  }

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Sync search state with URL params
  useEffect(() => {
    setSearch(urlSearch)
  }, [urlSearch])

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useGetGamesV2({
      size: 48,
      providers: providerName,
      title: search
      // enabled: providerName !== 'popular'
    })

  const { data: top12Games } = useGetTop12GamesByProvider(providerName)

  // Map with top12Games at the start of the list
  // NOTE: GAME_LIST by provider different new and popular
  const top12List = top12Games || []
  const gameList = useMemo(() => {
    if (top12List.length > 0) {
      return [
        ...top12List,
        ...(data?.pages.flatMap((page) => page.content?.content) || [])

        // .filter(
        //   (game: any) =>
        //     !top12List.some((topGame: any) => topGame.id === game.id)
        // )
      ]
    }
    return data?.pages.flatMap((page) => page.content?.content) || []
  }, [data?.pages, top12List])

  // Set total from API response
  useEffect(() => {
    setTotal(data?.pages[0]?.content?.totalElements || 0)
  }, [data?.pages])

  const handleShowMore = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, fetchNextPage])

  return (
    <div className="flex flex-col w-full h-full gap-4">
      <TitleV2
        title={`${title}`}
        icon={<ArrowLeftIcon className="w-4 h-4" />}
        onClick={() => {
          navigate('/')
        }}
        hiddenTitle={true}
        iconTitle={
          <img
            src={`${DOMAIN_IMAGE_PROVIDER_LOOT}/logos/providers_small/white/${providerName}.svg`}
            className="object-cover w-6 h-6"
          />
        }
      />

      <div css={stylesFn} className="relative w-full">
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

      {isLoading ? (
        <LoadingGame />
      ) : (
        <>
          {gameList?.length > 0 ? (
            <>
              <div
                className={cn(
                  isDesktop && 'flex flex-wrap justify-start md:gap-4',
                  isMobile && 'grid grid-cols-3 gap-2'
                )}
              >
                {gameList?.map((game) => (
                  <ImageCardV2
                    key={game?.id}
                    src={`${DOMAIN_IMAGE_LOOT}/${game?.provider}/${game?.id}.png`}
                    onClick={() =>
                      navigate(`/game-inside/${game?.provider}/${game?.id}`)
                    }
                  />
                ))}
              </div>

              {/* Loading more */}
              {isFetchingNextPage && <LoadingGame />}
            </>
          ) : (
            <NoGameImagev2 isSearch={!!urlSearch} />
          )}
        </>
      )}

      {!isLoading && gameList?.length > 0 && (
        <PaginationV2
          currentPage={gameList?.length}
          totalPages={total + top12List?.length}
          loadMore={handleShowMore}
        />
      )}
    </div>
  )
}

export default GameProviderPageV2

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
