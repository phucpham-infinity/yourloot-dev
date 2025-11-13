import { DOMAIN_IMAGE_LOOT } from '@/lib/utils'
import GameButtons from './GameButtons'
import { RefObject } from 'react'

interface GameBarProps {
  gameId: string
  provider: string
  isFavoriteGame: boolean
  isToggle: boolean
  iframeRef: RefObject<HTMLIFrameElement>
  onAddFavorite: () => void
  onRemoveFavorite: () => void
  onToggleCurtains: () => void
}

const GameBar = ({
  gameId,
  provider,
  isFavoriteGame,
  isToggle,
  iframeRef,
  onAddFavorite,
  onRemoveFavorite,
  onToggleCurtains
}: GameBarProps) => {
  return (
    <div className="self-stretch p-4 bg-[#191524] rounded-bl-md rounded-br-md grid grid-cols-2 items-center">
      <div className="flex justify-start items-center gap-4">
        <div className="w-10 h-10 rounded-md inline-flex flex-col justify-start items-start gap-2 overflow-hidden">
          <img className="self-stretch flex-1" src={`${DOMAIN_IMAGE_LOOT}/${provider}/${gameId}.png`} />
        </div>
        <div className="inline-flex flex-col justify-center items-start gap-3 leading-[12px]">
          <div className="justify-start text-purple-50 text-base font-medium font-['Inter'] leading-[12px]">
            {gameId}
          </div>
          <div className="justify-start text-violet-400 text-sm font-medium font-['Inter'] leading-[12px]">
            {provider}
          </div>
        </div>
      </div>
      <GameButtons
        isFavoriteGame={isFavoriteGame}
        isToggle={isToggle}
        iframeRef={iframeRef}
        onAddFavorite={onAddFavorite}
        onRemoveFavorite={onRemoveFavorite}
        onToggleCurtains={onToggleCurtains}
      />
    </div>
  )
}

export default GameBar