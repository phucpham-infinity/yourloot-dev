import ImageCard from '@/components/common/ui/Image'
import { DOMAIN_IMAGE_LOOT } from '@/lib/utils'
import { Game } from '@/services/controller/games'

export interface GameCardProps {
  game: Game
  onSelectGame: (game: Game) => void
}

export default function GameCard(props: GameCardProps) {
  const { game, onSelectGame } = props

  return (
    <ImageCard
      className="w-full"
      src={`${DOMAIN_IMAGE_LOOT}/${game?.provider}/${game?.id}.png`}
      onClick={() => onSelectGame(game)}
    />
  )
}
