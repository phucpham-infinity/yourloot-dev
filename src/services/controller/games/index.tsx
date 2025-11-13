/* eslint-disable no-unsafe-optional-chaining */
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { httpClient } from '@/services/api'
import { getUserIpAddress } from '@/helper'
import { queryClient } from '@/services'
// import { queryClient } from '@/services'

// Query Key Constants
export const GAMES_QUERY_KEYS = {
  GAME: 'game',
  GAME_PROVIDERS: 'game_providers',
  GAME_IP: 'ip',
  GAME_V2: 'game_v2',
  GAME_BONUS: 'game_bonus',
  GAME_HALLOWEEN: 'game_halloween',
  GAME_LIVE: 'game_live',
  TOP12_GAMES_BY_PROVIDER: 'top12_games_by_provider',
  POPULAR_GAMES: 'popular_games',
  FAVORITES_GAMES: 'favorites_games'
}

// Interfaces
export interface Game {
  bonusBuy: boolean
  category: string
  customised: boolean
  devices: ['desktop', 'mobile']
  featureGroup: string
  forbidBonusPlay: boolean
  hasFreespins: boolean
  hd: boolean
  hitRate: string
  id: string
  id2: string
  jackpotType: string
  licences: string[]
  lines: string
  multiplier: string
  params: any
  payout: string
  producer: string
  provider: string
  releasedAt: string
  restrictions: any
  theme: string
  title: string
  volatilityRating: string
}

export interface CreateGameRequest {
  title: string
  description: string
  genre: string
  platform: string[]
  developer: string
  publisher: string
  releaseDate: string
  rating: string
  price: number
  currency: string
  imageUrl?: string
  status?: 'ACTIVE' | 'INACTIVE' | 'COMING_SOON'
}

export interface GameProvider {
  name: string
  games: Game[]
}

export interface GameResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: {
    providers: GameProvider[]
  }
}

export interface GameV2 {
  bonusBuy: boolean
  category: string
  customised: boolean
  devices: string[]
  featureGroup: string
  forbidBonusPlay: boolean
  hasFreespins: boolean
  hd: boolean
  id: string
  id2: string
  jackpotType: string
  licences: string[]
  lines: string
  multiplier: string
  params: Record<string, unknown>
  payout: string
  producer: string
  provider: string
  releasedAt: string
  restrictions: {
    default: {
      blackList: string[]
      whiteList: string[]
    }
  }
  theme: string
  title: string
  volatilityRating: string
}

export interface GameResponseV2 {
  empty: boolean
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  size: number
  sort: any[]
  totalElements: number
  totalPages: number
  content: { content: GameV2[] }
}

export interface GameProviderResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: {
    providers: string[]
  }
}

export interface PotsGameRequest {
  mode: string
  userId: string
  clientType: string
  game: string
  ip: string
  jurisdiction: string
  locale: string
  returnUrl: string
  depositUrl: string
  walletId: string
  currency: string
}

// Get Games V2

type GameV2Response = {
  content: { content: GameV2[]; totalElements: number }
  pageable: {
    pageNumber: number
    pageSize: number
  }
  totalPages: number
}

type GetGamesParams = {
  size: number
  providers?: string
  category?: string
  title?: string
  gameIds?: string
  enabled?: boolean
}

export const gameController = () => {
  // Create game
  const useCreateGame = () =>
    useMutation<GameResponse, Error, CreateGameRequest>({
      mutationFn: async (data) => {
        const response = await httpClient.post('/games', data)
        return response.data
      }
    })

  const useGetGamesV2 = ({
    size = 30,
    providers = '',
    category = '',
    title = '',
    gameIds = '',
    enabled = true
  }: GetGamesParams) =>
    useInfiniteQuery<GameV2Response, Error>({
      queryKey: [
        GAMES_QUERY_KEYS.GAME_V2,
        size,
        providers,
        category,
        title,
        gameIds,
        enabled
      ],
      initialPageParam: 0,
      enabled: enabled,
      queryFn: async ({ pageParam = 0 }) => {
        const response = await httpClient.get('/games/v2', {
          params: {
            size,
            ...(providers && { providers }),
            ...(category && { category }),
            ...(title && { title }),
            ...(gameIds && { gameIds: gameIds }),
            page: pageParam
          }
        })
        return response.data
      },
      retry: 2,
      retryDelay: 1000,
      refetchOnWindowFocus: false,
      staleTime: 30 * 60 * 1000, // 30 phút
      gcTime: 30 * 60 * 1000, // 30 phút

      getNextPageParam: (lastPage: any) => {
        const { pageable, totalPages } = lastPage?.content

        const nextPage = pageable?.pageNumber + 1
        return nextPage <= totalPages ? nextPage : undefined
      }
    })

  const useGetGamesV3 = ({
    size = 30,
    providers = '',
    category = '',
    title = '',
    enabled = true
  }: GetGamesParams) =>
    useInfiniteQuery<GameV2Response, Error>({
      queryKey: [GAMES_QUERY_KEYS.GAME_V2, size, providers, category, title],
      initialPageParam: 0,
      enabled: enabled,
      queryFn: async ({ pageParam = 0 }) => {
        const response = await httpClient.get('/backoffice/games/all', {
          params: {
            size,
            ...(providers && { providers }),
            ...(category && { category }),
            ...(title && { title }),
            page: pageParam
          }
        })
        return response.data
      },
      refetchOnWindowFocus: false,
      staleTime: 30 * 60 * 1000, // 30 phút
      gcTime: 30 * 60 * 1000, // 30 phút

      getNextPageParam: (lastPage: any) => {
        const { pageable, totalPages } = lastPage?.content

        const nextPage = pageable?.pageNumber + 1
        return nextPage <= totalPages ? nextPage : undefined
      }
    })

  const useGetGameProviders = () =>
    useQuery<GameProviderResponse, Error>({
      queryKey: [GAMES_QUERY_KEYS.GAME_PROVIDERS],
      queryFn: async () => {
        const response = await httpClient.get('/games/providers')
        return response.data
      },
      refetchOnWindowFocus: false,
      staleTime: 30 * 60 * 1000, // 30 phút
      gcTime: 30 * 60 * 1000 // 30 phút
    })

  const useGetBonusGames = ({
    size = 30,
    enabled = true,
    title = '',
    providers = ''
  }: {
    size?: number
    enabled?: boolean
    title?: string
    providers?: string
  }) =>
    useInfiniteQuery<GameV2Response, Error>({
      queryKey: [GAMES_QUERY_KEYS.GAME_BONUS, enabled, title, providers],
      initialPageParam: 0,
      enabled,
      queryFn: async ({ pageParam = 0 }) => {
        const response = await httpClient.get('/games/bonus-games', {
          params: {
            page: pageParam,
            size,
            ...(title && { title }),
            ...(providers && { providers })
          }
        })
        return response.data
      },
      refetchOnWindowFocus: false,
      staleTime: 30 * 60 * 1000, // 30 phút
      gcTime: 30 * 60 * 1000, // 30 phút
      getNextPageParam: (lastPage: any) => {
        const { pageable, totalPages } = lastPage?.content
        const nextPage = pageable?.pageNumber + 1
        return nextPage <= totalPages ? nextPage : undefined
      }
    })

  const useGetLiveGames = ({
    size = 30,
    enabled = true,
    title = '',
    providers = ''
  }: {
    size?: number
    enabled?: boolean
    title?: string
    providers?: string
  }) =>
    useInfiniteQuery<GameV2Response, Error>({
      queryKey: [GAMES_QUERY_KEYS.GAME_LIVE, enabled, title, providers],
      initialPageParam: 0,
      enabled,
      queryFn: async ({ pageParam = 0 }) => {
        const response = await httpClient.get('/games/live-games', {
          params: {
            page: pageParam,
            size,
            ...(title && { title }),
            ...(providers && { providers })
          }
        })
        return response.data
      },
      refetchOnWindowFocus: false,
      staleTime: 30 * 60 * 1000, // 30 phút
      gcTime: 30 * 60 * 1000, // 30 phút
      getNextPageParam: (lastPage: any) => {
        const { pageable, totalPages } = lastPage?.content
        const nextPage = pageable?.pageNumber + 1
        return nextPage <= totalPages ? nextPage : undefined
      }
    })

  const useGetHalloweenGames = ({
    size = 30,
    enabled = true,
    title = '',
    providers = ''
  }: {
    size?: number
    enabled?: boolean
    title?: string
    providers?: string
  }) =>
    useInfiniteQuery<GameV2Response, Error>({
      queryKey: [GAMES_QUERY_KEYS.GAME_HALLOWEEN, enabled, title, providers],
      initialPageParam: 0,
      enabled,
      queryFn: async ({ pageParam = 0 }) => {
        const response = await httpClient.get('/games/halloween-games', {
          params: {
            page: pageParam,
            size,
            ...(title && { title }),
            ...(providers && { providers })
          }
        })
        return response.data
      },
      refetchOnWindowFocus: false,
      staleTime: 30 * 60 * 1000, // 30 phút
      gcTime: 30 * 60 * 1000, // 30 phút
      getNextPageParam: (lastPage: any) => {
        const { pageable, totalPages } = lastPage?.content
        const nextPage = pageable?.pageNumber + 1
        return nextPage <= totalPages ? nextPage : undefined
      }
    })

  const usePostGame = () =>
    useMutation<string, Error, PotsGameRequest>({
      mutationFn: async (data: PotsGameRequest) => {
        const response = await httpClient.post(
          data.mode === 'real' ? `/games` : `/games/demo`,
          {
            ...data,
            mode: undefined
          }
        )
        return response.data?.content?.launchUrl
      }
    })

  const getMyIp = () =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQuery<string, Error>({
      queryKey: [GAMES_QUERY_KEYS.GAME_IP],
      queryFn: async () => {
        const response = await getUserIpAddress()
        return response || '127.0.0.1'
      }
    })

  const useGetTop12GamesByProvider = (provider: string) =>
    useQuery<any, Error>({
      queryKey: [GAMES_QUERY_KEYS.TOP12_GAMES_BY_PROVIDER, provider],
      queryFn: async () => {
        const response = await httpClient.get(
          `/backoffice/games/top12/${provider}`
        )
        return response.data
      },
      enabled: !!provider
    })

  const useGetTopGamesByCategory = (category: string, enabled?: boolean) =>
    useQuery<any, Error>({
      queryKey: [GAMES_QUERY_KEYS.TOP12_GAMES_BY_PROVIDER, category],
      queryFn: async () => {
        const response = await httpClient.post(`/backoffice/games/category`, {
          category
        })
        return response.data
      },
      retry: false,
      enabled: !!category && enabled,
      staleTime: 30 * 60 * 1000, // 30 phút
      gcTime: 30 * 60 * 1000 // 30 phút
    })

  const useGetPopularGames = (enabled?: boolean) =>
    useQuery<any, Error>({
      queryKey: [GAMES_QUERY_KEYS.POPULAR_GAMES],
      queryFn: async () => {
        const response = await httpClient.get('/backoffice/games/top100')
        return response.data
      },
      enabled: enabled,
      retry: 2,
      retryDelay: 1000,
      refetchOnWindowFocus: false,
      staleTime: 30 * 60 * 1000, // 30 phút
      gcTime: 30 * 60 * 1000 // 30 phút
    })

  const useGetFavoritesGames = (userId: string) =>
    useQuery<any, Error>({
      queryKey: [GAMES_QUERY_KEYS.FAVORITES_GAMES, userId],
      queryFn: async () => {
        const response = await httpClient.get(
          `/users/${userId}/favourite-games`
        )
        return response.data.content
      },
      enabled: !!userId,
      refetchOnWindowFocus: false,
      staleTime: 30 * 60 * 1000, // 30 phút
      gcTime: 30 * 60 * 1000 // 30 phút
    })

  const useAddFavoriteGame = (userId: string) =>
    useMutation<any, Error, any>({
      mutationFn: async (games: string[]) => {
        const response = await httpClient.patch(
          `/users/${userId}/favourite-games`,
          {
            games
          }
        )
        return response?.data
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [GAMES_QUERY_KEYS.FAVORITES_GAMES, userId]
        })
      }
    })

  const useRemoveFavoriteGame = (userId: string) =>
    useMutation<any, Error, any>({
      mutationFn: async (games: string[]) => {
        // Convert the games array to a comma-separated string
        const gamesParam = games.join(',')
        const response = await httpClient.delete(
          `/users/${userId}/favourite-games?games=${gamesParam}`
        )
        return response?.data
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [GAMES_QUERY_KEYS.FAVORITES_GAMES, userId]
        })
      }
    })

  return {
    useCreateGame,
    useGetGameProviders,
    usePostGame,
    getMyIp,
    useGetGamesV2,
    useGetHalloweenGames,
    useGetGamesV3,
    useGetBonusGames,
    useGetLiveGames,
    useGetTop12GamesByProvider,
    useGetTopGamesByCategory,
    useGetPopularGames,
    useGetFavoritesGames,
    useAddFavoriteGame,
    useRemoveFavoriteGame
  }
}
