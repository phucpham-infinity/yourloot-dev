import { DOMAIN_IMAGE_LOOT } from '@/lib/utils'

import ImageCard from '@/components/common/ui/Image'
import { useGamesStore } from '@/store/slices/games'
import { useNavigate } from 'react-router-dom'

export default function FavoriteTab() {
  const navigate = useNavigate()

  const { favoritesGamesRoot } = useGamesStore()

  console.log('favoritesGamesRoot', favoritesGamesRoot)

  return (
    <div className="w-full flex flex-col gap-5">
      {favoritesGamesRoot && favoritesGamesRoot?.length > 0 ? (
        <div className="w-full grid grid-cols-3 lg:grid-cols-4 gap-5">
          {favoritesGamesRoot?.map((game: string) => (
            <ImageCard
              key={game}
              src={`${DOMAIN_IMAGE_LOOT}/${game.split(':')[0]}/${game.split(':')[1]}.png`}
              onClick={() =>
                navigate(
                  `/game-inside/${game.split(':')[0]}/${game.split(':')[1]}`
                )
              }
            />
          ))}
        </div>
      ) : (
        <div className="text-[rgba(108,99,149,1)] flex justify-center items-center text-[12px] h-[80px] bg-[rgba(0,0,0,0.35)] text-center">
          You haven't added any games to favorites yet.
        </div>
      )}
    </div>
  )
}
