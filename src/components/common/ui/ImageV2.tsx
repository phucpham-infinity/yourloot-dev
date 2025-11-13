// import ArrowRightIcon from '@/assets/icons/v2/arrow-right.svg'
import loginIcon from '@/assets/images/login-icon.svg'
// import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { gameController } from '@/services/controller/games'
import { useAuthStore } from '@/store'
// import { css } from '@emotion/react'
// import { Star } from 'lucide-react'
import StarIcon from '@/assets/images/yellow-star.svg'
import React, { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
// import CustomButton from '../custom-button'
// import IconBtn from '../icon-button'
interface ImageCardProps {
  src: string
  className?: string
  onClick?: () => void
}

const ImageCardV2: React.FC<ImageCardProps> = ({
  src,
  className = '',
  onClick = () => {}
}) => {
  const navigate = useNavigate()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  const { isAuthenticated, userId } = useAuthStore()
  const { useGetFavoritesGames } = gameController()
  const { data: favoritesGames } = useGetFavoritesGames(userId ?? '')
  const location = useLocation()

  const gameName = useMemo(() => {
    return src?.split('/')?.pop()?.replace('.png', '') || ''
  }, [src])

  const provider = useMemo(() => {
    const segments = src.split('/')
    return segments[segments.length - 2]
  }, [src])

  const handlePlay = () => {
    if (!isAuthenticated) {
      const currentPath = location.pathname + location.search
      navigate(`/auth/login?redirect=${encodeURIComponent(currentPath)}`)
      return
    }
    onClick()
  }

  const isFavoriteGame = useMemo(() => {
    if (!favoritesGames || !provider || !gameName) return false
    const key = `${provider}:${gameName}`
    return Array.isArray(favoritesGames) && favoritesGames.includes(key)
  }, [favoritesGames, provider, gameName])

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        handlePlay()
      }}
      className={cn(
        `noselect group relative
        min-w-[115px] min-h-[157px] w-[115px] h-[157px]
        sm:min-w-[152px] sm:min-h-[208px] sm:w-[152px] p-[1px]
        sm:h-[208px] rounded-[10px] flex justify-center items-center
        transition-transform duration-300 hover:-translate-y-2`,
        !isFavoriteGame && 'border border-app-default',
        className
      )}
      style={
        isFavoriteGame
          ? {
              border: '2px solid transparent',
              borderRadius: '10px',
              background: '#E3B075 border-box'
            }
          : {
              border: '2px solid transparent',
              borderRadius: '10px',
              background: '#191524 border-box'
            }
      }
    >
      {/* Favorites hover overlay */}
      {isFavoriteGame && (
        <div
          className=" inset-0 z-[2]
              bg-gradient-to-b from-black/20 to-black/90 opacity-0
              group-hover:opacity-100 transition-opacity duration-300
              rounded-[10px] overflow-hidden"
        >
          <div className="w-4 h-4 left-[12px] top-[calc(100%-32px)] absolute overflow-hidden">
            <img src={StarIcon} alt="star" className="w-4 h-4" />
          </div>
          <div className="left-[34px] top-[calc(100%-32px)] absolute justify-start text-white text-sm font-medium leading-tight">
            Favorites
          </div>
        </div>
      )}

      {src === 'https://usercontent.cc/i/s6/acceptance/test.png' &&
      import.meta.env.VITE_APP_MODE !== 'production' ? (
        <img
          onLoad={() => {
            setIsLoaded(true)
            setIsError(false)
          }}
          className={cn(
            'w-full h-full  top-0 left-0  object-cover rounded-[10px]',
            'active:shadow-[inset_0px_0px_30px_0px_rgba(195,162,241,0.45)] ',
            'transition-all duration-500 ease-out',
            isLoaded && !isError
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-110'
          )}
          src={'/images/ava_rush.png'}
          alt="Image-Card"
        />
      ) : (
        <img
          onLoad={() => {
            setIsLoaded(true)
            setIsError(false)
          }}
          onError={(e) => {
            setIsError(true)
            setIsLoaded(false)
            e.currentTarget.src = loginIcon
          }}
          className={cn(
            'w-full h-full  top-0 left-0 z-[1] object-cover rounded-[10px]',
            'active:shadow-[inset_0px_0px_30px_0px_rgba(195,162,241,0.45)] outline-1 outline-gray-900',
            'transition-all duration-500 ease-out',
            isLoaded && !isError
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-110'
          )}
          src={src}
          alt="Image-Card"
        />
      )}
    </div>
  )
}

export default ImageCardV2
