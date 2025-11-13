import { useNavigate, useSearchParams } from 'react-router-dom'
import './index.css'
import HomeLayout, { defaultCategoryList } from './layout'
import CarouselGame from './modules/carousel/Game'
import ProvidersCarousel from './modules/carousel/Providers'

import ImageCardV2 from '@/components/common/ui/ImageV2'
import LoadingGame from '@/components/v2/loading-game'
import NoGamev2 from '@/components/v2/mo-game-v2'
import { PaginationV2 } from '@/components/v2/pagination'
import { useTelegramMiniApp } from '@/hooks/use-telegram-miniapp'
import { cn, DOMAIN_IMAGE_LOOT } from '@/lib/utils'
import { gameController } from '@/services/controller/games'
import { useAuthStore } from '@/store'
import { saveGameToHistory } from '@/utils/gameHistory'
import { useEffect, useMemo } from 'react'
import { isDesktop, isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import GameHistoryCarousel from './modules/carousel/GameHistory'
import CryptoDepositNow from './modules/CtytoDeposit'
import QuickLink from './modules/QuickLink'

interface IHomeV2Props {
  isHomePage?: boolean
}

export default function HomeV2({ isHomePage = true }: IHomeV2Props) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { userId } = useAuthStore()
  const { isTelegramMiniApp, backButton } = useTelegramMiniApp()
  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get('search') || ''

  // Search logic
  const { useGetGamesV2 } = gameController()

  const {
    data: searchData,
    fetchNextPage,
    isLoading: isLoadingSearch,
    hasNextPage,
    isFetchingNextPage
  } = useGetGamesV2({
    size: 48,
    title: searchTerm,
    enabled: !!searchTerm && searchTerm.length >= 3
  })

  const searchGameList = useMemo(
    () => searchData?.pages.flatMap((page) => page.content?.content) || [],
    [searchData]
  )

  useEffect(() => {
    if (!isTelegramMiniApp) return
    if (backButton.hide.isAvailable()) {
      backButton.hide()
    }
    return () => {
      if (backButton.show.isAvailable()) {
        backButton.show()
      }
    }
  }, [isTelegramMiniApp])

  return (
    <HomeLayout>
      {searchTerm ? (
        <>
          <div className="flex flex-col gap-4">
            {isLoadingSearch ? (
              <LoadingGame />
            ) : (
              <>
                {searchGameList && searchGameList?.length > 0 ? (
                  <div
                    className={cn(
                      isDesktop && 'flex flex-wrap justify-start gap-4',
                      isMobile && 'grid grid-cols-3 gap-2 '
                    )}
                  >
                    {searchGameList?.map((game: any) => (
                      <ImageCardV2
                        key={game.id}
                        src={`${DOMAIN_IMAGE_LOOT}/${game.provider}/${game.id}.png`}
                        onClick={() => {
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
                        className="w-full h-full rounded-[10px]"
                      />
                    ))}
                  </div>
                ) : (
                  <NoGamev2 isSearch={true} />
                )}

                {isFetchingNextPage && hasNextPage && <LoadingGame />}
              </>
            )}
          </div>
          {!isLoadingSearch && searchGameList?.length > 0 && (
            <PaginationV2
              currentPage={searchGameList?.length}
              totalPages={searchData?.pages[0]?.content?.totalElements || 0}
              loadMore={fetchNextPage}
            />
          )}
        </>
      ) : (
        <>
          <GameHistoryCarousel />
          {isHomePage && (
            <>
              {/* <PopularCarousel /> */}
              {defaultCategoryList
                .slice(0, 2)
                ?.filter((item: any) => item?.isShow)
                .map((item: any) => (
                  <CarouselGame
                    key={item?.title}
                    title={String(
                      t(`categories.${item?.translationKey}.title`, item?.title)
                    )}
                    icon={item?.iconLeft}
                    category={item?.category[0]}
                    onClick={() => {
                      navigate(
                        `/game-category?category=${item?.category[0]}&title=${t(`categories.${item?.translationKey}.title`, item?.title)}`
                      )
                    }}
                  />
                ))}

              {/* <SummerVibeCarousel /> */}

              {defaultCategoryList
                .slice(2, 3)
                ?.filter((item: any) => item?.isShow)
                .map((item: any) => (
                  <CarouselGame
                    key={item?.title}
                    title={String(
                      t(`categories.${item?.translationKey}.title`, item?.title)
                    )}
                    icon={item?.iconLeft}
                    category={item?.category[0]}
                    onClick={() => {
                      navigate(
                        `/game-category?category=${item?.category[0]}&title=${t(`categories.${item?.translationKey}.title`, item?.title)}`
                      )
                    }}
                  />
                ))}

              {isDesktop && <CryptoDepositNow />}

              {defaultCategoryList
                .slice(3, defaultCategoryList?.length)
                ?.filter((item: any) => item?.isShow)
                .map((item: any) => (
                  <CarouselGame
                    key={item?.title}
                    title={String(
                      t(`categories.${item?.translationKey}.title`, item?.title)
                    )}
                    icon={item?.iconLeft}
                    category={item?.category[0]}
                    onClick={() => {
                      navigate(
                        `/game-category?category=${item?.category[0]}&title=${t(`categories.${item?.translationKey}.title`, item?.title)}`
                      )
                    }}
                  />
                ))}

              <ProvidersCarousel />
              {isMobile && <QuickLink />}
            </>
          )}
        </>
      )}
    </HomeLayout>
  )
}
