import ProIcon from '@/assets/images/achievement/Pro.svg'
import IconSvg from '@/components/common/ui/IconSvg'
import { GAME_LEVELS } from '@/constants'
import { useProfileStore } from '@/store'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import ProgressBar from './ProgressBar'

export const LevelProgress = () => {
  const { t } = useTranslation()
  const { levelProgress } = useProfileStore()

  const levelData = useMemo(() => {
    return {
      currentLoyaltyPoints: Math.ceil(levelProgress?.currentLoyaltyPoints || 0),
      requiredLoyaltyPoints: Math.ceil(
        levelProgress?.requiredLoyaltyPoints || 0
      ),
      currentBetsSum: Math.ceil(levelProgress?.currentBetsSum || 0),
      requiredBetsSum: Math.ceil(levelProgress?.requiredBetsSum || 0)
    }
  }, [levelProgress])

  const levelName = useMemo(() => {
    const nameKey = levelProgress?.name as keyof typeof GAME_LEVELS
    return GAME_LEVELS[nameKey]?.name || ''
  }, [levelProgress?.name])

  const isMaxLevel = levelProgress?.name === 'LEVEL_6'
  const shouldShowBetPercentage = levelData.requiredBetsSum !== 0

  const safePercent = (current: number, total: number) => {
    if (!total || total <= 0) return 0
    const p = (current / total) * 100
    if (Number.isNaN(p) || !Number.isFinite(p)) return 0
    return Math.max(0, Math.min(100, p))
  }

  const loyaltyPercent = safePercent(
    levelData.currentLoyaltyPoints,
    levelData.requiredLoyaltyPoints
  )
  const betsPercent = safePercent(
    levelData.currentBetsSum,
    levelData.requiredBetsSum
  )

  return (
    <div className="mb-6">
      {/* Mobile title (outside the block) */}
      <h3 className="mb-4 text-white text-v2-app-medium-16 md:hidden">
        {levelName}
      </h3>
      <div className="p-4 rounded-[10px] gap-4 md:bg-transparent md:outline md:outline-offset-[-1px] md:outline-[#322a3e] bg-[#181624]">
        {/* Desktop title inside the block */}
        <div className="items-center hidden gap-2 mb-4 md:flex">
          <IconSvg icon={ProIcon} width="20px" height="20px" />
          <h3 className="text-white text-v2-app-medium-16">{levelName}</h3>
        </div>

        {/* Note: top on desktop only */}
        <div className="hidden md:block text-[#C5C0D8] text-v2-app-medium-12 mb-4 ">
          {isMaxLevel
            ? t('profile.maxLevelReached')
            : t('profile.earnLoyaltyPoints', {
                points: levelData.requiredLoyaltyPoints,
                percentage: shouldShowBetPercentage
                  ? `and bet 50% of your deposits`
                  : '',
                level: Math.min(
                  6,
                  parseInt(levelName.split(' ')[1] || '0', 10) + 1
                )
              })}
        </div>

        {/* Two metrics in one row on desktop via grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Loyalty Points */}
          <div className="space-y-4">
            {/* Mobile: label above progress; Desktop: hidden */}
            <div className="text-[#C5C0D8] text-v2-app-medium-12 md:hidden">
              {t('profile.loyaltyPoints', {
                current: levelData.currentLoyaltyPoints,
                total: levelData.requiredLoyaltyPoints
              })}
            </div>
            <ProgressBar percentage={loyaltyPercent} />
            {/* Desktop: label below progress; Mobile: hidden */}
            <div className="text-[#C5C0D8] text-v2-app-medium-12 hidden md:block">
              {t('profile.loyaltyPoints', {
                current: levelData.currentLoyaltyPoints,
                total: levelData.requiredLoyaltyPoints
              })}
            </div>
          </div>

          {/* Bets Progress */}
          <div className="space-y-4">
            {/* Mobile: label above progress; Desktop: hidden */}
            <div className="text-[#C5C0D8] text-v2-app-medium-12 md:hidden">
              {t('profile.bets', {
                current: levelData.currentBetsSum,
                total: levelData.requiredBetsSum
              })}
            </div>
            <ProgressBar percentage={betsPercent} />
            {/* Desktop: label below progress; Mobile: hidden */}
            <div className="text-[#C5C0D8] text-v2-app-medium-12 hidden md:block">
              {t('profile.bets', {
                current: levelData.currentBetsSum,
                total: levelData.requiredBetsSum
              })}
            </div>
          </div>
        </div>

        {/* Mobile: keep note at bottom; Desktop already shown at top via order */}
        <div className="text-[#C5C0D8] text-v2-app-medium-12 order-3 md:hidden mt-4">
          {isMaxLevel
            ? t('profile.maxLevelReached')
            : t('profile.earnLoyaltyPoints', {
                points: levelData.requiredLoyaltyPoints,
                percentage: shouldShowBetPercentage
                  ? `and bet 50% of your deposits`
                  : '',
                level: Math.min(
                  6,
                  parseInt(levelName.split(' ')[1] || '0', 10) + 1
                )
              })}
        </div>
      </div>
    </div>
  )
}
