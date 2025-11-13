import { css } from '@emotion/react'
import { Star } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import loginIcon from '@/assets/images/login-icon.svg'
import { cn } from '@/lib/utils'
import { gameController } from '@/services/controller'
import { useAuthStore } from '@/store'
interface ImageCardProps {
  src: string
  className?: string
  onClick?: () => void
}

const ImageCard: React.FC<ImageCardProps> = ({
  src,
  className = '',
  onClick = () => {}
}) => {
  const [isError, setIsError] = useState(false)
  const { userId } = useAuthStore()
  const { useAddFavoriteGame, useRemoveFavoriteGame } = gameController()

  const gameName = useMemo(() => {
    return src?.split('/').pop()?.replace('.png', '') || ''
  }, [src])

  const provider = useMemo(() => {
    const segments = src.split('/')
    return segments[segments.length - 2]
  }, [src])

  const formattedGame = [`${provider}:${gameName}`]

  const { mutate: addFavoriteGame } = useAddFavoriteGame(userId!)
  const { mutate: removeFavoriteGame } = useRemoveFavoriteGame(userId!)

  const localFavorites = JSON.parse(
    localStorage.getItem('favoritesGames') || '[]'
  )
  const isFavoriteGame = localFavorites.includes(gameName)

  const handleAddFavoriteGame = () => {
    // Update localStorage
    try {
      addFavoriteGame(formattedGame)
      const localFavorites = JSON.parse(
        localStorage.getItem('favoritesGames') || '[]'
      )
      const updatedFavorites = [...localFavorites, gameName]
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

  return (
    <div
      onClick={() => {
        if (!isError) {
          onClick()
        }
      }}
      className={cn(
        `group relative w-full h-[120px] lg:w-[190px] lg:h-[200px] cursor-pointer overflow-hidden rounded-[10px] border border-app-default transition-transform duration-300 hover:-translate-y-2`,
        className
      )}
    >
      <div className="absolute inset-0 z-[2] opacity-0 rounded-[10px] transition-opacity duration-300 group-hover:opacity-100 pointer-events-none shadow-[inset_0px_0px_30px_0px_rgba(195,162,241,0.45)]" />
      <div
        style={{
          background:
            'linear-gradient(0deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.25) 100%)',
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
        }}
        className="absolute inset-0 z-[2] opacity-0 rounded-[10px] transition-opacity duration-300 group-active:opacity-100 "
      />
      <div
        css={styles}
        className="h-10 min-h-10 w-10 min-w-10 z-20 rounded-[15px] flex items-center justify-center bg-header-balance absolute top-2 right-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-0 "
      >
        <Star
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            if (isFavoriteGame) {
              handleRemoveFavoriteGame()
            } else {
              handleAddFavoriteGame()
            }
          }}
          fill={isFavoriteGame ? 'yellow' : 'grey'}
          strokeWidth={0}
          size={16}
        />
      </div>

      <img
        onError={(e) => {
          setIsError(true)
          e.currentTarget.src = loginIcon
        }}
        className="w-full h-full absolute top-0 left-0 z-[1] object-cover 
                  group-hover:scale-[1.11] group-active:scale-100 
                  transition-all duration-300 rounded-[10px]
                  active:shadow-[inset_0px_0px_30px_0px_rgba(195,162,241,0.45)]"
        src={src}
        alt="Image Card"
      />
    </div>
  )
}

export default ImageCard

const styles = css`
  background: radial-gradient(
    103.94% 265.37% at 59.95% -118.74%,
    #654ec8 0%,
    #372864 100%
  );
`
