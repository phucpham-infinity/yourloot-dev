import CarouselGame from '@/app/v2/home/modules/carousel/Game'
import WelcomeBonusSvg from '@/assets/icons/v2/Welcome bonus.svg'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const BonusCarousel = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="w-full h-full gap-6 flex flex-col p-4">
      <CarouselGame
        category="bonus"
        title={t('promotionV2.bonusGames.title', 'Bonus games')}
        icon={WelcomeBonusSvg}
        onClick={() => {
          navigate('/game-category?category=bonus&title=Bonus')
        }}
        hiddenIcon={true}
      />
    </div>
  )
}

export default BonusCarousel
