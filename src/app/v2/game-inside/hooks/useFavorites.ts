import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { gameController } from '@/services/controller'
import { useToast } from '@/hooks/use-toast'

export const useFavorites = (
  gameId: string,
  provider: string,
  userId: string
) => {
  const { t } = useTranslation()
  const { success, warning } = useToast()
  const { useAddFavoriteGame, useRemoveFavoriteGame, useGetFavoritesGames } =
    gameController()

  const { data: favoritesGames } = useGetFavoritesGames(userId ?? '')

  // Mutations
  const { mutate: addFavoriteGame } = useAddFavoriteGame(userId)
  const { mutate: removeFavoriteGame } = useRemoveFavoriteGame(userId)

  const isFavoriteGame = useMemo(() => {
    const list = (favoritesGames as any)?.content ?? favoritesGames ?? []
    const key = `${provider}:${gameId}`
    if (Array.isArray(list)) {
      if (list.length === 0) return false
      if (typeof list[0] === 'string')
        return list.includes(key) || list.includes(gameId)
      return list.some(
        (item: any) =>
          item?.id === key || item?.id === gameId || item?.gameId === gameId
      )
    }
    return false
  }, [favoritesGames, provider, gameId])

  const handleAddFavoriteGame = useCallback(() => {
    try {
      const formattedGame = [`${provider}:${gameId}`]
      addFavoriteGame(formattedGame)
      success(t('header.addedToFavorites', 'Added to favorite games.'))
    } catch (e) {
      console.error(e)
    }
  }, [addFavoriteGame, provider, gameId, t])

  const handleRemoveFavoriteGame = useCallback(() => {
    try {
      const formattedGame = [`${provider}:${gameId}`]
      removeFavoriteGame(formattedGame)
      warning(t('header.removedFromFavorites', 'Removed from favorite games.'))
    } catch (e) {
      console.error(e)
    }
  }, [removeFavoriteGame, provider, gameId, t])

  return {
    isFavoriteGame,
    handleAddFavoriteGame,
    handleRemoveFavoriteGame
  }
}
