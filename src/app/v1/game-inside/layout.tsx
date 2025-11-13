import GameCard from '@/app/v1/game-inside/components/GameCard'
import Curtain from '@/assets/icons/curtain.tsx'
import FireIcon from '@/assets/icons/fire.tsx'
import IconStar from '@/assets/icons/iconStar.tsx'
import CustomButton from '@/components/common/custom-button'
import { cn } from '@/lib/utils.ts'
import { queryClient } from '@/services'
import { gameController, GAMES_QUERY_KEYS } from '@/services/controller/games'
import { useAuthStore, useWalletStore } from '@/store'
import { useGamesStore } from '@/store/slices/games'
import { useHomeStore } from '@/store/slices/home'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { Outlet, useNavigate } from 'react-router-dom'

function ContentOverlay({
  className,
  isToggle,
  ...props
}: React.ComponentProps<any>) {
  return (
    <div
      data-slot="overlay"
      className={
        isToggle
          ? cn(
              'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/95',
              className
            )
          : ''
      }
      {...props}
    />
  )
}

export default function GameInsideLayout() {
  const [isToggle, setIsToggle] = useState(false)
  const navigate = useNavigate()
  const { userId } = useAuthStore()
  const { allGames: games } = useGamesStore()
  const { setLayoutActive, setIsScroll } = useHomeStore()
  const { t } = useTranslation()
  const walletDefault = useWalletStore((state) =>
    state.wallets.find((wallet) => wallet.isDefault)
  )

  const handleSelectGame = (id: string, provider: string) => {
    navigate(`/game-inside/${provider}/${id}`)
  }

  const randomNumber = new Date().getHours() + new Date().getMinutes()

  const { useAddFavoriteGame, useRemoveFavoriteGame } = gameController()

  const {
    mutate: addFavoriteGame,
    isSuccess: isSuccessAddFavoriteGame,
    isPending: isLoadingAddFavoriteGame
  } = useAddFavoriteGame(userId!)
  const {
    mutate: removeFavoriteGame,
    isSuccess: isSuccessRemoveFavoriteGame,
    isPending: isLoadingRemoveFavoriteGame
  } = useRemoveFavoriteGame(userId!)

  const pathParts = window.location.pathname.split('/')
  const provider = pathParts[2]
  const gameName = pathParts[3]
  const formattedGame = [`${provider}:${gameName}`]
  // Check with localStorage as well as favoritesGames from store

  const localFavorites =
    localStorage.getItem('favoritesGames') || ([] as string[])
  let isFavoriteGame = false
  try {
    isFavoriteGame = localFavorites.includes(gameName)
  } catch {
    isFavoriteGame = false
  }

  const handleAddFavoriteGame = () => {
    // Update localStorage
    try {
      addFavoriteGame(formattedGame)
      const localFavorites = JSON.parse(
        localStorage.getItem('favoritesGames') || '[]'
      )
      const updatedFavorites = [...localFavorites, ...formattedGame]
      localStorage.setItem('favoritesGames', JSON.stringify(updatedFavorites))
    } catch (e) {
      console.error(e)
      // handle error if needed
    }
  }

  const handleRemoveFavoriteGame = () => {
    // Update localStorage
    try {
      removeFavoriteGame(formattedGame)
      const localFavorites = JSON.parse(
        localStorage.getItem('favoritesGames') || '[]'
      )
      const updatedFavorites = localFavorites.filter(
        (item: string) => item !== gameName
      )
      localStorage.setItem('favoritesGames', JSON.stringify(updatedFavorites))
    } catch (e) {
      console.error(e)
      // handle error if needed
    }
  }

  useEffect(() => {
    if (isSuccessAddFavoriteGame || isSuccessRemoveFavoriteGame) {
      queryClient.invalidateQueries({
        queryKey: [GAMES_QUERY_KEYS.FAVORITES_GAMES]
      })
    }
  }, [isSuccessAddFavoriteGame, isSuccessRemoveFavoriteGame])

  return (
    <div className="flex-col gap-5 w-full">
      <ContentOverlay isToggle={isToggle}>
        <div
          className={
            isToggle
              ? 'absolute w-[1200px] top-[50%] left-[50%] grid z-50 lg:translate-x-[-50%] lg:translate-y-[-50%] max-lg:w-full max-lg:top-10 max-lg:left-0 '
              : ''
          }
        >
          <div className="justify-center items-center inline-flex overflow-hidden w-full">
            <Outlet />
          </div>
          <div className="justify-between w-full mx-auto items-center inline-flex pt-7">
            <div className="justify-start items-center gap-3 flex backdrop-blur">
              <CustomButton
                label={t('about.back')}
                // prefixIcon={<ArrowLeft />}
                className="w-fit items-center text-center text-[#9d90cf] text-xs font-medium   inline-flex gap-2"
                onClick={() => {
                  if (isToggle) {
                    setIsToggle(false)
                  } else {
                    if (!isMobile) {
                      setLayoutActive('right')
                      setIsScroll(false)
                    }
                    navigate(-1)
                  }
                }}
                variant="muted"
              />
              <CustomButton
                label={isMobile ? '' : t('gameInside.toggleCurtains')}
                prefixIcon={<Curtain />}
                className="w-fit items-center text-center text-[#9d90cf] text-xs font-medium inline-flex gap-2"
                variant={isToggle ? 'default' : 'muted'}
                onClick={() => setIsToggle(!isToggle)}
              />
              <CustomButton
                label={
                  isMobile
                    ? ''
                    : isFavoriteGame
                      ? t('gameInside.removeFromFavorites')
                      : t('gameInside.addToFavorites')
                }
                prefixIcon={
                  isLoadingAddFavoriteGame ||
                  isLoadingRemoveFavoriteGame ? null : isFavoriteGame ? null : (
                    <IconStar />
                  )
                }
                isLoading={
                  isLoadingAddFavoriteGame || isLoadingRemoveFavoriteGame
                }
                onClick={() => {
                  if (isFavoriteGame) {
                    handleRemoveFavoriteGame()
                  } else {
                    handleAddFavoriteGame()
                  }
                }}
                className={cn(
                  `w-fit items-center text-center text-[#9d90cf] text-xs font-medium inline-flex gap-2`,
                  (isLoadingAddFavoriteGame || isLoadingRemoveFavoriteGame) &&
                    'min-w-[100px]'
                )}
                variant="default"
              />
            </div>
            <div>
              <CustomButton
                label={t('gameInside.deposit')}
                className="w-35 items-center text-center text-[#9d90cf] text-xs font-medium"
                variant="CTA"
                onClick={() => {
                  navigate(
                    `/deposit/${walletDefault?.currency}/cryptocurrency?close-back=${location.pathname}`
                  )
                }}
              />
            </div>
          </div>
        </div>
      </ContentOverlay>
      <div className="pt-5 w-full justify-between mx-auto items-center inline-flex">
        <div className="justify-start items-center gap-5 flex">
          <FireIcon />
          <div className="text-white text-2xl font-black">
            {t('gameInside.otherGames')}
          </div>
        </div>
        {/* <CustomButton
          label={t('gameInside.seeMore')}
          className="w-fit items-center text-center text-[#9d90cf] text-xs font-medium  "
          variant="muted"
          onClick={() => {
            navigate('/#popular-games')
          }}
        /> */}

        {/* <CustomButton
          label={t('about.back')}
          className="w-fit items-center text-center text-[#9d90cf] text-xs font-medium  "
          variant="muted"
          onClick={() => {
            navigate('/')
          }}
        /> */}
      </div>
      <div className="pt-5 grid lg:grid-cols-6 justify-center grid-cols-3 gap-5">
        {!!games?.length &&
          games
            .slice(randomNumber, randomNumber + (isMobile ? 9 : 12))
            .map((game) => {
              return (
                <GameCard
                  key={game.id}
                  game={game}
                  onSelectGame={(game) =>
                    handleSelectGame(game.id, game.provider)
                  }
                />
              )
            })}
      </div>
    </div>
  )
}
