import { Game, GameProvider } from '@/services/controller'
import { create } from 'zustand'
interface GamesStore {
  // State
  games: GameProvider[] | null
  allGames: Game[] | null
  gameProviders: string[] | null
  reloadGameSession: string | null

  // Actions
  setGames: (game: GameProvider[]) => void
  setAllGames: (game: Game[]) => void
  setGameProviders: (gameProviders: string[]) => void
  clearGame: () => void

  hacksawGames: Game[] | null
  platipusGames: Game[] | null
  setHacksawGames: (hacksawGames: Game[]) => void
  setPlatipusGames: (platipusGames: Game[]) => void

  popularGames: Game[] | null
  setPopularGames: (popularGames: Game[]) => void

  favoritesGames: string[] | null
  favoritesGamesRoot: string[] | null
  setFavoritesGames: (favoritesGames: string[]) => void
  setFavoritesGamesRoot: (favoritesGamesRoot: string[]) => void

  setReloadGameSession: (reloadGameSession: string | null) => void
}

export const useGamesStore = create<GamesStore>()((set) => ({
  // State
  games: null,
  allGames: null,
  gameProviders: null,

  hacksawGames: null,
  platipusGames: null,
  popularGames: null,
  favoritesGames: null,
  favoritesGamesRoot: null,
  reloadGameSession: null,

  // Actions
  setGames: (games) => set({ games }),
  setGameProviders: (gameProviders) => set({ gameProviders }),
  clearGame: () => set({ games: null }),
  setAllGames: (allGames) => set({ allGames }),
  setPopularGames: (popularGames) => set({ popularGames }),
  setReloadGameSession: (reloadGameSession) => set({ reloadGameSession }),

  setHacksawGames: (hacksawGames) => set({ hacksawGames }),
  setPlatipusGames: (platipusGames) => set({ platipusGames }),

  setFavoritesGames: (favoritesGames) => set({ favoritesGames }),
  setFavoritesGamesRoot: (favoritesGamesRoot) => set({ favoritesGamesRoot })
}))
