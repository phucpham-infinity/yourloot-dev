import WelcomeBonusSvg from '@/assets/icons/v2/Welcome bonus.svg'
import CarouselGame from '@/app/v2/home/modules/carousel/Game'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function BonusGames({ promoType }: { promoType?: string }) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const category = promoType === 'halloween_bonus' ? 'halloween' : 'bonus'
  const title =
    promoType === 'halloween_bonus'
      ? t('promotionV2.halloweenGames.title', 'Halloween games')
      : t('promotionV2.bonusGames.title', 'Bonus games')

  return (
    <div className="w-full h-full gap-6 flex flex-col">
      <CarouselGame
        category={category}
        title={title}
        icon={WelcomeBonusSvg}
        onClick={() => {
          navigate(`/game-category?category=${category}&title=${title}`)
        }}
        hiddenIcon={false}
      />
    </div>
  )
}
