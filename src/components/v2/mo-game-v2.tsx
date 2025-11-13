import GameNotFound from '@/assets/icons/v2/game-not-found.png'
import EmptyGame from '@/assets/icons/v2/no-game.png'
import { useTranslation } from 'react-i18next'

interface NoGameImagev2Props {
  isSearch?: boolean
}

export const NoGameImagev2 = ({ isSearch = false }: NoGameImagev2Props) => {
  const { t } = useTranslation()

  return (
    <div className="w-full h-[195] flex flex-col gap-4 justify-center items-center">
      <div>
        <img
          src={isSearch ? GameNotFound : EmptyGame}
          alt={isSearch ? 'game-not-found' : 'empty-game'}
          className="w-[120px] h-[120px]"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-[14px] font-medium text-white">
          {isSearch
            ? t('noGame.search.title', 'No results found')
            : t('noGame.empty.title', 'Nothing here yet')}
        </div>
        <div className="text-[12px] font-medium text-[#6C6395]">
          {isSearch
            ? t(
                'noGame.search.description',
                'Try searching with a different keyword.'
              )
            : t(
                'noGame.empty.description',
                'This category is being updated. New games will appear soon.'
              )}
        </div>
      </div>
    </div>
  )
}
export default NoGameImagev2
