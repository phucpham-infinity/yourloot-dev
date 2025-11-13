import { Achievement, AchievementItem } from '@/services/controller/achivements'
import { AchievementCard } from './AchievementCard'

import done from '@/assets/icons/v2/achievements/done.svg'
import notDone from '@/assets/icons/v2/achievements/not-done.svg'
import BonusIcon from '@/assets/icons/v2/Bonus'
import CryptoWalletIcon from '@/assets/icons/v2/CryptoWalletIcon'
import ExplorerIcon from '@/assets/icons/v2/ExplorerIcon'
import FirstStepIcon from '@/assets/icons/v2/FirstStepIcon'
import MasterIcon from '@/assets/icons/v2/MasterIcon'
import PaymentMethodIcon from '@/assets/icons/v2/PaymentMethodIcon'
import PermanentBonusIcon from '@/assets/icons/v2/PermanentBonusIcon'
import PlayLikeProIcon from '@/assets/icons/v2/PlayLikeProIcon'
import SecurityFirstIcon from '@/assets/icons/v2/SecurityFirstIcon'
import SlotsIcon from '@/assets/icons/v2/Slots'
import { CustomDrawer } from '@/components/common/custom-drawer'
import { cn } from '@/lib/utils'
import React, { forwardRef, useState } from 'react'
import ProgressBar from './ProgressBar'

interface AchievementsProps {
  achievements: Achievement[]
  t: (key: string) => string
  getAchievementDataSource: (desc: string) => any
  IconSvg: React.ComponentType<any>
}

const ICON_MAP_ACHIEVEMENTS = {
  WB_BONUS: <BonusIcon className="w-5 h-5 text-[#9E90CF]" />,
  PERMANENT_PLAYER: <PermanentBonusIcon className="w-5 h-5 text-[#9E90CF]" />,
  EXPLORER: <ExplorerIcon className="w-5 h-5 text-[#9E90CF]" />,
  FIRST_STEPS: <FirstStepIcon className="w-5 h-5 text-[#9E90CF]" />,
  CRYPTO_WHALE: <CryptoWalletIcon className="w-5 h-5 text-[#9E90CF]" />,
  SECURITY_FIRST: <SecurityFirstIcon className="w-5 h-5 text-[#9E90CF]" />,
  GURU: <MasterIcon className="w-5 h-5 text-[#9E90CF]" />,
  PAYMENT_METHODS: <PaymentMethodIcon className="w-5 h-5 text-[#9E90CF]" />,
  PLAYING_THE_BEST: <PlayLikeProIcon className="w-5 h-5 text-[#9E90CF]" />,
  SLOT_TRAVELLER: <SlotsIcon className="w-5 h-5 text-[#9E90CF]" />
}

const Achievements = forwardRef<HTMLDivElement, AchievementsProps>(
  ({ achievements, t }, ref) => {
    const [openDrawer, setOpenDrawer] = useState(false)

    const [stepCurrent, setStepCurrent] = useState<{
      percentProcess: number
      partProcess: string
      selectedAchievements: AchievementItem[]
    }>({
      percentProcess: 0,
      partProcess: '',
      selectedAchievements: []
    })

    return (
      <>
        <div ref={ref} className="mb-6">
          <h3 className="mb-4 text-base font-medium text-white">
            {t('profile.achievements')}
          </h3>
          <div className="flex w-full gap-2 overflow-x-auto scroll-bar-yloot">
            {achievements?.map((achievement, index) => {
              // const achievementImage = getAchievementDataSource(
              //   achievement?.categoryDescription
              // )

              return (
                <AchievementCard
                  key={index}
                  onClick={() => {
                    setStepCurrent({
                      percentProcess: achievement.currentProgress,
                      partProcess: `${achievement.currentValue}/${achievement.maxValue}`,
                      selectedAchievements: achievement?.achievements ?? []
                    })
                    setOpenDrawer(true)
                  }}
                  icon={
                    ICON_MAP_ACHIEVEMENTS[
                      achievement?.categoryDescription as keyof typeof ICON_MAP_ACHIEVEMENTS
                    ]
                  }
                  title={achievement?.categoryName}
                  partProcess={`${achievement.currentValue}/${achievement.maxValue}`}
                  percentProcess={achievement.currentProgress}
                />
              )
            })}
          </div>
        </div>

        <CustomDrawer
          open={openDrawer}
          onOpenChange={() => {
            setOpenDrawer(false)
          }}
          title="First Steps"
        >
          <div>
            <div className="relative">
              <ProgressBar
                className="h-10 mb-4 !rounded-[10px]"
                classNameBar="h-7 !rounded-[10px]"
                percentage={stepCurrent?.percentProcess ?? 0}
                maxWidth={361}
              />
              <div className="absolute text-[#9E90CF] text-[10px] font-bold left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                {stepCurrent?.partProcess} Complete
              </div>
            </div>

            <div className="overflow-y-auto scroll-bar-yloot max-h-[500px] flex flex-col gap-4">
              {stepCurrent?.selectedAchievements
                ?.slice()
                .sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted))
                .map((achievement, index) => (
                  <AchievementItemFirstSteps
                    key={index}
                    achievement={achievement}
                  />
                ))}
            </div>
          </div>
        </CustomDrawer>
      </>
    )
  }
)

export default Achievements

const AchievementItemFirstSteps = ({
  achievement
}: {
  achievement: AchievementItem
}) => {
  return (
    <div className="flex items-center gap-4 pb-4  border-b-[rgba(92,70,123,0.5)] border-b border-solid">
      <div>
        {achievement.isCompleted ? (
          <img src={done} className="w-[12px] h-[12px]" />
        ) : (
          <img src={notDone} className="w-[12px] h-[12px]" />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <div
          className={cn(
            'text-white text-[14px] font-medium',
            achievement.isCompleted && 'text-[#6C6395]'
          )}
        >
          {achievement.achievementName}
        </div>
        <div
          className={cn(
            'text-[#6C6395] text-[14px] font-medium',
            achievement.isCompleted && 'text-[#6C6395]'
          )}
        >
          {achievement.achievementDescription}
        </div>
      </div>
    </div>
  )
}
