import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import ArrowRightIcon from '@/assets/icons/arrowRight'
import Search2Icon from '@/assets/icons/search2'
import BonusIcon from '@/assets/icons/v2/Bonus'
// import CrashIcon from '@/assets/icons/v2/Crash'
import FastIcon from '@/assets/icons/v2/FastIcon'
import NewIcon from '@/assets/icons/v2/New'
import PopularIcon from '@/assets/icons/v2/Popular'
import SlotsIcon from '@/assets/icons/v2/Slots'
import loginIcon from '@/assets/images/login-icon.svg'
import ImageCardV2 from '@/components/common/ui/ImageV2'
import {
  Carousel,
  CarouselContent,
  type CarouselApi
} from '@/components/ui/carousel'
import { NoGameImagev2 } from '@/components/v2/mo-game-v2'
import { SUMMER_VIBE_GAME_IDS } from '@/constants/game.constants'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn, DOMAIN_IMAGE_LOOT, DOMAIN_IMAGE_PROVIDER_LOOT } from '@/lib/utils'
import { gameController } from '@/services/controller'
import { useV2DialogStore } from '@/store/slices/v2/dialog.store'
import { css } from '@emotion/react'
import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { isDesktop, isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useInView } from 'react-intersection-observer'
import { useNavigate } from 'react-router-dom'

const SearchDialog = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dialog = useV2DialogStore()
  const isMobileDevice = useIsMobile()

  const { ref, inView } = useInView({ triggerOnce: true })
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { useGetGameProviders, useGetGamesV2 } = gameController()

  const [search, setSearch] = useState('')
  const [searchType, setSearchType] = useState<string>('all')
  const [bonusCarouselApi, setBonusCarouselApi] = useState<CarouselApi>()

  // game: slot + crash + new + popular
  const {
    data,
    fetchNextPage,
    isLoading: isLoadingGame,
    hasNextPage,
    isFetchingNextPage
  } = useGetGamesV2({
    size: 24,
    title: search,
    ...(searchType !== 'all' && searchType !== 'harvestofwins'
      ? { category: searchType }
      : {}),
    enabled: searchType !== 'provider',
    gameIds:
      searchType === 'harvestofwins' ? SUMMER_VIBE_GAME_IDS.join(',') : ''
  })

  const { data: bonusGames, isLoading: isLoadingBonus } = useGetGamesV2({
    size: 48,
    enabled: searchType === 'all',
    category: 'bonus'
  })

  // get providers
  const { data: dataGameProviders } = useGetGameProviders()

  // Handle search game with debounce
  const handleSearchGame = (value: string) => {
    // if (value?.length < 3) return
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    debounceTimer.current = setTimeout(() => {
      setSearch(value)
    }, 1000)
  }

  // Fetch next page
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  const gameList = useMemo(
    () => data?.pages.flatMap((page) => page.content?.content) || [],
    [data]
  )

  const listProviders = useMemo(() => {
    const providers: string[] = dataGameProviders?.content?.providers || []
    const keyword = search?.trim().toLowerCase()

    if (!keyword) return providers

    return providers.filter((provider) =>
      provider.toLowerCase().includes(keyword)
    )
  }, [dataGameProviders, search])

  const handleNavigateProvider = (provider: string) => {
    dialog.close()
    navigate(`/game-provider/${provider}?title=${provider}`)
  }

  const categories = [
    {
      title: t('home.all', 'All Games'),
      category: ['all']
    },
    {
      title: t('home.providers', 'Providers'),
      category: ['provider']
    },
    {
      icon: <SlotsIcon className="w-4 h-4 text-[#9E90CF]" />,
      title: t('home.slots', 'Slots'),
      category: ['slots']
    },
    // {
    //   icon: <CrashIcon className="w-4 h-4 text-[#9E90CF]" />,
    //   title: t('home.crash', 'Crash'),
    //   category: ['crash']
    // },
    {
      icon: <FastIcon className="w-4 h-4 text-[#9E90CF]" />,
      title: t('home.fast', 'Fast'),
      category: ['fast']
    },
    {
      icon: <PopularIcon className="w-4 h-4 text-[#9E90CF]" />,
      title: t('home.popular', 'Popular'),
      category: ['popular']
    },
    {
      icon: <BonusIcon className="w-4 h-4 text-[#9E90CF]" />,
      title: t('home.bonus', 'Bonus Games'),
      category: ['bonus']
    },
    {
      icon: <NewIcon className="w-4 h-4 text-[#9E90CF]" />,
      title: t('home.new', 'New'),
      category: ['new']
    }
  ]

  return (
    <div
      className={cn('flex flex-col w-full ', isMobile && 'translate-y-[-8px]')}
    >
      <div css={stylesFn} className="relative w-full">
        <input
          onChange={(e) => {
            handleSearchGame(e?.target?.value)
          }}
          type="text"
          className="!pl-8 text-white "
          placeholder={t('search.placeholder', 'Search')}
        />
        <Search2Icon className="absolute w-3 h-3 left-[15px] top-[15px]" />
      </div>

      {/* category */}
      <div className={cn('mt-4 mb-[26px] overflow-hidden', search && 'mb-4')}>
        {isMobileDevice ? (
          <div className="flex gap-2 overflow-x-auto whitespace-nowrap scroll-bar-yloot">
            {categories?.map((item) => (
              <div
                onClick={() => {
                  setSearch('')
                  setSearchType(item?.category?.[0])
                }}
                key={item?.title}
                className={cn(
                  'flex cursor-pointer items-center h-[40px] gap-2 bg-[#191524] rounded-[10px] px-3',
                  item?.category?.[0] === searchType &&
                    'border-1 border-[#D9CEFF]'
                )}
              >
                {item?.icon && <div>{item?.icon}</div>}
                <div
                  className={cn(
                    'text-[#D9CEFF] text-[14px] font-medium whitespace-nowrap'
                  )}
                >
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Carousel
            opts={{
              align: 'start',
              loop: false
            }}
            className="w-full"
          >
            <CarouselContent
              className="flex gap-2 !ml-0"
              style={{ gap: '8px' }}
            >
              {categories?.map((item) => (
                <div key={item?.title} className="flex-shrink-0">
                  <div
                    onClick={() => {
                      setSearchType(item?.category?.[0])
                    }}
                    className={cn(
                      'flex cursor-pointer items-center h-[40px] gap-2 bg-[#191524] rounded-[10px] px-3',
                      item?.category?.[0] === searchType &&
                        'border-1 border-[#D9CEFF]'
                    )}
                  >
                    {item?.icon && <div>{item?.icon}</div>}
                    <div
                      className={cn(
                        'text-[#D9CEFF] text-[14px] font-medium whitespace-nowrap'
                      )}
                    >
                      {item.title}
                    </div>
                  </div>
                </div>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>

      {/* all */}
      {searchType === 'all' && (
        <>
          {!search ? (
            <BonusGamesCarousel
              bonusGamesList={
                bonusGames?.pages.flatMap((page) => page.content?.content) || []
              }
              isLoadingBonus={isLoadingBonus}
              carouselApi={bonusCarouselApi}
              setCarouselApi={setBonusCarouselApi}
              navigate={navigate}
              dialog={dialog}
            />
          ) : (
            <SearchGameList
              search={search}
              gameList={gameList}
              isLoadingGame={isLoadingGame}
              infiniteScrollRef={ref}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
            />
          )}
        </>
      )}

      {/* game slot + crash + new + bonus*/}
      {searchType !== 'all' && searchType !== 'provider' && (
        <SearchGameList
          search={search}
          gameList={gameList}
          isLoadingGame={isLoadingGame}
          infiniteScrollRef={ref}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
        />
      )}

      {/* provider */}
      {searchType === 'provider' && (
        <div className="flex flex-col gap-4">
          {search && <SearchResult />}
          {listProviders && listProviders?.length > 0 ? (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2 scroll-bar-yloot overflow-y-auto max-h-[490px]">
              {listProviders?.map((provider, index) => (
                <div
                  onClick={() => {
                    handleNavigateProvider(provider)
                  }}
                  key={index}
                  className="flex cursor-pointer gap-3 flex-col p-3 bg-[#191524] w-full h-[75px] border-solid rounded-[10px] items-center justify-center"
                >
                  <div className="w-[50px] h-[30px]">
                    <img
                      onError={(e) => {
                        e.currentTarget.src = loginIcon
                      }}
                      className="object-contain w-full h-full"
                      src={`${DOMAIN_IMAGE_PROVIDER_LOOT}/logos/providers/white/${provider}.svg`}
                      alt="provider-card"
                    />
                  </div>
                  <div className="text-[#EAE3FF] text-[14px] font-medium whitespace-nowrap">
                    {provider}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <NoGameImagev2 />
          )}
        </div>
      )}
    </div>
  )
}

interface SearchGameListProps {
  search: string
  gameList: any[]
  isLoadingGame: boolean
  infiniteScrollRef: (node?: Element | null) => void
  isFetchingNextPage: boolean
  hasNextPage: boolean
}

const SearchGameList = memo(
  ({
    search,
    gameList,
    isLoadingGame,
    infiniteScrollRef,
    isFetchingNextPage,
    hasNextPage
  }: SearchGameListProps) => {
    const navigate = useNavigate()
    const dialog = useV2DialogStore()
    return (
      <div className="flex flex-col gap-4">
        {search && <SearchResult />}
        <div className="max-h-[490px] w-full overflow-y-auto scroll-bar-yloot">
          {isLoadingGame ? (
            <Loading />
          ) : (
            <>
              {gameList && gameList?.length > 0 ? (
                <div className="grid w-full grid-cols-3 gap-4 md:grid-cols-4">
                  {gameList?.map((game) => (
                    <ImageCardV2
                      key={game.id}
                      src={`${DOMAIN_IMAGE_LOOT}/${game.provider}/${game.id}.png`}
                      onClick={() => {
                        dialog.close()
                        navigate(`/game-inside/${game.provider}/${game.id}`)
                      }}
                    />
                  ))}
                </div>
              ) : (
                <NoGameImagev2 />
              )}
              <div
                ref={infiniteScrollRef}
                className="flex items-center justify-center w-full "
              ></div>

              {isFetchingNextPage && hasNextPage && (
                <div
                  className={cn(
                    isDesktop &&
                      'w-full mt-4 flex flex-wrap justify-start gap-2 md:gap-4',
                    isMobile && 'w-full mt-4 grid grid-cols-3 gap-2 md:gap-4'
                  )}
                >
                  {Array.from({ length: 9 }).map((_, index) => (
                    <div
                      key={index}
                      className="min-w-[115px] min-h-[151px] w-full h-[151px] md:min-w-[146px] md:min-h-[202px] md:w-[146px] md:h-[202px] bg-gray-50 rounded-[10px] animate-pulse"
                    ></div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    )
  }
)

export default memo(SearchDialog)

const Loading = memo(() => {
  return (
    <div
      className={cn('w-full', 'grid grid-cols-3 md:grid-cols-4 gap-4 w-full')}
    >
      {Array.from({
        length: isMobile ? 9 : 20
      }).map((_, index) => (
        <div
          key={index}
          className="min-w-[115px] min-h-[151px] w-full h-[151px] md:min-w-[146px] md:min-h-[202px] md:w-[146px] md:h-[202px] bg-gray-50 rounded-[10px] animate-pulse"
        ></div>
      ))}
    </div>
  )
})

const SearchResult = () => {
  const { t } = useTranslation()
  return (
    <div className="text-white text-[16px] font-medium leading-4">
      {t('search.result', 'Search result')}
    </div>
  )
}

const TitleSearch = ({
  title,
  subtitle,
  onClick
}: {
  title: string
  subtitle: string
  onClick: () => void
}) => {
  return (
    <div className="flex items-center justify-start gap-4">
      <div className="text-[16px] font-medium text-white">{title}</div>
      <div
        className="text-[#9E90CF] hover:-translate-y-0.25 text-app-medium-14 font-medium px-2 py-1 rounded-[10px] hover:bg-[#372864] transition-all duration-300 cursor-pointer"
        onClick={onClick}
      >
        {subtitle}
      </div>
    </div>
  )
}

interface BonusGamesCarouselProps {
  bonusGamesList: any[]
  isLoadingBonus: boolean
  carouselApi: CarouselApi | undefined
  setCarouselApi: (api: CarouselApi | undefined) => void
  navigate: (path: string) => void
  dialog: any
}

const BonusGamesCarousel = memo(
  ({
    bonusGamesList,
    isLoadingBonus,
    carouselApi,
    setCarouselApi,
    navigate,
    dialog
  }: BonusGamesCarouselProps) => {
    const { t } = useTranslation()
    const isMobileDevice = useIsMobile()

    const renderLoadingItems = () => {
      return Array.from({ length: isMobile ? 9 : 20 }).map((_, idx) => (
        <div
          key={idx}
          className={cn(
            'bg-gray-50 rounded-lg animate-pulse',
            isMobile
              ? 'min-w-[115px] min-h-[151px] w-full h-[151px] rounded-[10px]'
              : 'flex-shrink-0 w-[146px] h-[202px] md:w-[146px] md:h-[202px]'
          )}
        />
      ))
    }

    const renderGameItems = () => {
      if (isLoadingBonus) {
        return renderLoadingItems()
      }

      return bonusGamesList?.map((game) => (
        <ImageCardV2
          onClick={() => {
            dialog.close()
            navigate(`/game-inside/${game.provider}/${game.id}`)
          }}
          key={game.id}
          src={`${DOMAIN_IMAGE_LOOT}/${game.provider}/${game.id}.png`}
        />
      ))
    }

    const renderMobileView = () => (
      <div className="flex flex-col gap-[26px]">
        <TitleSearch
          title={t('search.bonusGames', 'Bonus Games')}
          subtitle={t('game.popular.seeAll', 'View All')}
          onClick={() => {
            navigate('/game-category?category=bonus&title=Bonus')
            if (!isMobile) dialog.close()
          }}
        />
        {bonusGamesList && bonusGamesList?.length > 0 && (
          <div className="flex gap-2 overflow-x-auto scroll-bar-yloot">
            {renderGameItems()}
          </div>
        )}
      </div>
    )

    const renderDesktopView = () => (
      <div className="flex flex-col gap-[26px]">
        <div className="flex items-center justify-between">
          <TitleSearch
            title={t('search.bonusGames', 'Bonus Games')}
            subtitle={t('game.popular.seeAll', 'View All')}
            onClick={() => {
              navigate('/game-category?category=bonus&title=Bonus')
              if (!isMobile) dialog.close()
            }}
          />
          <div className="flex">
            <button
              className="hidden md:flex items-center justify-center w-6 h-6 rounded-md bg-transparent hover:bg-[#372864] hover:-translate-y-0.25 transition-all duration-300 disabled:opacity-50 cursor-pointer"
              onClick={() => {
                carouselApi?.scrollPrev()
              }}
            >
              <ArrowLeftIcon className="w-3 h-3" />
            </button>
            <button
              className="hidden md:flex items-center justify-center w-6 h-6 rounded-md bg-transparent hover:bg-[#372864] hover:-translate-y-0.25 transition-all duration-300 disabled:opacity-50 cursor-pointer"
              onClick={() => {
                carouselApi?.scrollNext()
              }}
            >
              <ArrowRightIcon className="w-3 h-3" />
            </button>
          </div>
        </div>
        {bonusGamesList && bonusGamesList?.length > 0 && (
          <Carousel
            opts={{
              align: 'start',
              loop: false
            }}
            setApi={setCarouselApi}
            className="w-full"
          >
            <CarouselContent
              className="flex gap-2 !ml-0"
              style={{ gap: '8px' }}
            >
              {isLoadingBonus
                ? renderLoadingItems()
                : bonusGamesList?.map((game) => (
                    <div key={game.id} className="flex-shrink-0">
                      <ImageCardV2
                        onClick={() => {
                          dialog.close()
                          navigate(`/game-inside/${game.provider}/${game.id}`)
                        }}
                        src={`${DOMAIN_IMAGE_LOOT}/${game.provider}/${game.id}.png`}
                      />
                    </div>
                  ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    )

    return (
      <div className="flex flex-col gap-4">
        {isMobileDevice ? renderMobileView() : renderDesktopView()}
      </div>
    )
  }
)

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

    color: #ffffff;
    text-align: left;
    font-size: 14px;
    font-weight: 500;
    line-height: normal;
    cursor: pointer;

    &::placeholder {
      color: #ffffff;
    }

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
      //   box-shadow:
      //     6px 6px 12px 0px rgba(22, 20, 24, 0.5),
      //     -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
    }

    &:focus {
      border: 1px solid #2a2339;
      background:
        linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%),
        linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.1) 100%);
      //   box-shadow:
      //     6px 6px 12px 0px rgba(22, 20, 24, 0.5),
      //     -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
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
        // box-shadow:
        //   6px 6px 12px 0px rgba(22, 20, 24, 0.5),
        //   -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
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
