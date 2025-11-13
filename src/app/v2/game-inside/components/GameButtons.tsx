import CustomButton from '@/components/common/custom-button'
import Curtain from '@/assets/icons/curtain.tsx'
import StarIcon from '@/assets/images/star.svg'
import FullscreenIcon from '@/assets/images/fullscreen.svg'
import { useTranslation } from 'react-i18next'
import { RefObject } from 'react'

interface GameButtonsProps {
  isFavoriteGame: boolean
  isToggle: boolean
  iframeRef: RefObject<HTMLIFrameElement>
  onAddFavorite: () => void
  onRemoveFavorite: () => void
  onToggleCurtains: () => void
}

const GameButtons = ({
  isFavoriteGame,
  isToggle,
  iframeRef,
  onAddFavorite,
  onRemoveFavorite,
  onToggleCurtains
}: GameButtonsProps) => {
  const { t } = useTranslation()

  const handleFullscreen = () => {
    if (iframeRef.current && iframeRef.current.requestFullscreen) {
      iframeRef.current.requestFullscreen()
    }
  }

  const handleFavoriteClick = () => {
    if (isFavoriteGame) {
      onRemoveFavorite()
    } else {
      onAddFavorite()
    }
  }

  return (
    <div className="flex justify-end items-center gap-2">
      <CustomButton
        variant="default"
        className="w-fit h-10 p-5 bg-[radial-gradient(ellipse_265.37%_103.94%_at_59.95%_-118.74%,_#654EC8_0%,_#372864_100%)] rounded-md outline-1 outline-offset-[-1px] outline-violet-300 flex justify-center items-center gap-0.5"
        label={
          isFavoriteGame
            ? t('gameInside.removeFromFavorites', 'Remove from Favorites')
            : t('gameInside.addToFavorites', 'Add to Favorites')
        }
        prefixIcon={<img src={StarIcon} alt="star" className="w-4 h-4" />}
        onClick={handleFavoriteClick}
      />
      <CustomButton
        variant="muted"
        className="w-fit h-10 p-5 bg-gradient-to-b from-black/50 to-black/10 rounded-md outline-1 outline-offset-[-1px] outline-violet-300 flex justify-start items-center gap-0.5"
        label={t('gameInside.fullScreen', 'Full Screen')}
        prefixIcon={
          <img src={FullscreenIcon} alt="fullscreen" className="w-4 h-4" />
        }
        onClick={handleFullscreen}
      />
      <CustomButton
        variant={isToggle ? 'default' : 'muted'}
        className="w-fit h-10 p-5 bg-gradient-to-b from-black/50 to-black/10 rounded-md outline-1 outline-offset-[-1px] outline-violet-300 flex justify-start items-center gap-0.5"
        label={t('gameInside.toggleCurtains', 'Curtains')}
        prefixIcon={<Curtain />}
        onClick={onToggleCurtains}
      />
    </div>
  )
}

export default GameButtons
