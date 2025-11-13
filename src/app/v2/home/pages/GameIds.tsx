import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import Search from '@/assets/icons/search'
import ImageCardV2 from '@/components/common/ui/ImageV2'
import LoadingGame from '@/components/v2/loading-game'
import NoGameImagev2 from '@/components/v2/mo-game-v2'
import ChosseProvider from '@/components/v2/providers/ChosseProvider'
import TitleV2 from '@/components/v2/title-v2'
import { cn, css, DOMAIN_IMAGE_LOOT } from '@/lib/utils'
import { gameController } from '@/services/controller/games'
import { useMemo, useRef, useState } from 'react'
import { isDesktop, isMobile } from 'react-device-detect'
import { useNavigate, useSearchParams } from 'react-router-dom'

const GameIdsPageV2 = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const gameIds = useMemo(
    () => searchParams.get('gameIds') || '',
    [searchParams]
  )
  const title = useMemo(() => searchParams.get('title') || '', [searchParams])
  // const urlSearch = searchParams.get('search') || ''
  const [search, setSearch] = useState('')
  const [provider, setProvider] = useState('')
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { useGetGamesV2 } = gameController()
  const { data: gamesData, isLoading: isLoadingGames } = useGetGamesV2({
    size: 400,
    gameIds: gameIds
  })

  const gameList: any[] = useMemo(
    () => [
      ...(gamesData?.pages?.flatMap((page) => page.content?.content) || [])
    ],
    [gamesData]
  )

  // Sync search state with URL params
  // useEffect(() => {
  //   setSearch(urlSearch)
  // }, [urlSearch])

  const handleSearch = (value: string) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    debounceTimer.current = setTimeout(() => setSearch(value), 400)
  }

  const data = useMemo(() => {
    if (!gameList) return []
    const searchLower = search.toLowerCase()
    return gameList.filter((game: any) => {
      if (provider && game?.provider !== provider) return false
      if (search && !game?.title?.toLowerCase().includes(searchLower))
        return false
      return true
    })
  }, [gameList, search, provider])

  return (
    <div className="w-full h-full gap-4 flex flex-col">
      {isMobile ? (
        <>
          <TitleV2
            title={title}
            icon={<ArrowLeftIcon className="w-4 h-4" />}
            onClick={() => {
              navigate('/')
            }}
          />

          <div css={stylesFn} className="relative w-full">
            <input
              onChange={(e) => {
                handleSearch(e.target.value)
              }}
              type="text"
              className="!pl-8"
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
                className="!pl-8"
                placeholder="Search games"
              />
              <Search className="absolute w-3 h-3 left-[15px] top-[15px]" />
            </div>
          </div>
        </div>
      )}

      <>
        {isLoadingGames ? (
          <LoadingGame />
        ) : (
          <>
            {data?.length > 0 ? (
              <div
                className={cn(
                  isDesktop && 'flex flex-wrap justify-start gap-4',
                  isMobile && 'grid grid-cols-3 gap-2 '
                )}
              >
                {data?.map((game) => (
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
            ) : (
              <NoGameImagev2 isSearch={!!search} />
            )}
          </>
        )}
      </>
    </div>
  )
}

export default GameIdsPageV2

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

    color: #6c6395;
    text-align: left;
    font-size: 12px;
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
