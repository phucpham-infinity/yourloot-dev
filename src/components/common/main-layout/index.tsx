import { cn } from '@/lib/utils'
import { queryClient } from '@/services'
import {
  preferencesController,
  userController,
  USERS_QUERY_KEYS
} from '@/services/controller'
import { gameController } from '@/services/controller/games'
import {
  LEVELS_QUERY_KEYS,
  levelsController
} from '@/services/controller/levels'
import {
  WALLETS_QUERY_KEYS,
  walletsController
} from '@/services/controller/wallets'
import {
  useAuthStore,
  useDialogStore,
  useGamesStore,
  useLevelStore,
  useOnBoardingStore
} from '@/store'
import { useProfileStore } from '@/store/slices/profile'
import { useRegisterStore } from '@/store/slices/register'
import clsx from 'clsx'
import { useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { useLocation } from 'react-router-dom'
import Footer from '../footer'
import Header from '../header-footer'
import { RegisterOneLastStepDialog } from '../register-one-last-step'

export default function MainLayout({
  children,
  hideHeaderFooter = false
}: {
  children: React.ReactNode
  hideHeaderFooter?: boolean
}) {
  const { useGetUserProfile } = userController()
  const { usePostPreferences } = preferencesController()
  const { useGetUserWallets } = walletsController()
  const { useGetUserLevel } = levelsController()
  const { useGetGameProviders, getMyIp } = gameController()
  const { setLevel } = useLevelStore()
  const { data: ip } = getMyIp()

  const dialog = useDialogStore()

  const {
    language,
    currency,
    clearPreferences,
    promoCode,
    dateOfBirth,
    country
  } = useRegisterStore()
  const { userId, setUserIp } = useAuthStore()
  const { setProfile, setIp } = useProfileStore()
  const { setIsOpen } = useOnBoardingStore()
  const {
    setGameProviders,
    setAllGames,
    setHacksawGames,
    setPlatipusGames,
    setPopularGames,
    setFavoritesGames,
    setFavoritesGamesRoot
  } = useGamesStore()

  const { data: userProfile } = useGetUserProfile(userId)

  useGetUserWallets(userId!)
  const { mutate: postPreferences, isSuccess: isSuccessPostPreferences } =
    usePostPreferences()
  const { useGetGamesV2, useGetPopularGames, useGetFavoritesGames } =
    gameController()

  const { data: favoritesGames } = useGetFavoritesGames(userId ?? '')

  useEffect(() => {
    if (favoritesGames) {
      // favoritesGames là list string dạng "provider:game", chỉ lấy phần sau dấu ":"
      // root: lấy cả provider:game
      setFavoritesGamesRoot(favoritesGames)

      const gameNames = favoritesGames.map((item: string) => item.split(':')[1])
      localStorage.setItem('favoritesGames', JSON.stringify(gameNames))

      setFavoritesGames(gameNames)
    }
  }, [favoritesGames, setFavoritesGames])

  useEffect(() => {
    setUserIp()
  }, [])

  const { data: userLevel } = useGetUserLevel()

  const { data: dataGames } = useGetGamesV2({
    size: 100
  })

  const { data: dataPopularGames } = useGetPopularGames(true)

  useEffect(() => {
    if (dataPopularGames && dataPopularGames?.length > 0) {
      setPopularGames((dataPopularGames || []) as any)
    }
  }, [dataPopularGames, setPopularGames])

  // Fetch Hacksaw and Platipus games for the home page - providers
  const { data: dataHacksaw } = useGetGamesV2({
    size: 30,
    providers: import.meta.env.MODE === 'production' ? 'hacksaw' : 'softswiss'
  })

  const { data: dataPlatipus } = useGetGamesV2({
    size: 30,
    providers: import.meta.env.MODE === 'production' ? 'platipus' : 'acceptance'
  })

  useEffect(() => {
    if (dataHacksaw && dataHacksaw?.pages[0]?.content?.content?.length > 0) {
      setHacksawGames((dataHacksaw?.pages[0]?.content?.content || []) as any)
    }

    if (dataPlatipus && dataPlatipus?.pages[0]?.content?.content?.length > 0) {
      setPlatipusGames((dataPlatipus?.pages[0]?.content?.content || []) as any)
    }
  }, [dataHacksaw, dataPlatipus, setHacksawGames, setPlatipusGames])
  // End

  const { data: dataGameProviders } = useGetGameProviders()

  useEffect(() => {
    if (dataGames && dataGames?.pages[0]?.content?.content?.length > 0) {
      setAllGames((dataGames?.pages[0]?.content?.content || []) as any)
    }
  }, [dataGames, setAllGames])

  useEffect(() => {
    if (dataGameProviders?.content?.providers) {
      setGameProviders(dataGameProviders.content.providers)
    }
  }, [dataGameProviders, setGameProviders])

  const refetchMainData = () => {
    queryClient.invalidateQueries({
      queryKey: [USERS_QUERY_KEYS.USER_PROFILE]
    })
    queryClient.invalidateQueries({
      queryKey: [WALLETS_QUERY_KEYS.USER_WALLETS]
    })
    queryClient.invalidateQueries({
      queryKey: [LEVELS_QUERY_KEYS.USER_LEVEL]
    })
  }

  useEffect(() => {
    if (userProfile) {
      setProfile(userProfile.content)
      if (!userProfile.content?.dateOfBirth) {
        if (language && currency && dateOfBirth && country) {
          postPreferences({
            userId: userId!,
            language: language,
            currency: currency,
            dateOfBirth: dateOfBirth,
            country: country,
            promoCode: promoCode ?? ''
          })
        } else {
          setIsOpen(false)
          dialog.open({
            width: 390,
            disabledCloseOverlay: false,
            content: (
              <RegisterOneLastStepDialog
                currentUserId={userId}
                onSuccess={(data) => {
                  if (data) {
                    clearPreferences()
                    refetchMainData()
                    location.reload()
                  }
                }}
              />
            )
          })
        }
      }
    }
  }, [userProfile])

  useEffect(() => {
    if (isSuccessPostPreferences) {
      clearPreferences()
      refetchMainData()
    }
  }, [isSuccessPostPreferences])

  useEffect(() => {
    if (userLevel) {
      setLevel(userLevel.content)
    }
  }, [userLevel])

  useEffect(() => {
    if (ip) {
      setIp(ip)
    }
  }, [ip])

  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen bg-[#0B0A11] bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat overflow-hidden">
      <Header className={clsx('pb-10', hideHeaderFooter && 'opacity-0')} />
      <div
        className={cn(
          'max-w-[1200px] px-[18px] md:px-0 mx-auto  ',
          isMobile && 'px-[16px] py-[16px] bg-[#040305]'
        )}
      >
        {children}
      </div>

      <Footer className={clsx('pt-10', hideHeaderFooter && 'opacity-0')} />
    </div>
  )
}
