import getAchievementDataSource from '@/assets/images/achievement/AchivementDataSource'
import IconSvg from '@/components/common/ui/IconSvg'
import { useDialogStore } from '@/store'
import { AchievementCard } from './AchievementCard'
import AchievementDetailDialogContent from './AchievementDetailDialogContent'

interface Achievement {
  categoryDescription: string
  categoryName: string
  currentValue: number
  maxValue: number
  currentProgress: number
}

interface DesktopAchievementsTabProps {
  achievements: Achievement[]
}

const DesktopAchievementsTab = ({ achievements }: DesktopAchievementsTabProps) => {
  const dialog = useDialogStore()

  return (
    <div className="rounded-[10px]">
      <div className="grid grid-cols-3 gap-2">
        {achievements?.map((achievement, index) => {
          const achievementImage = getAchievementDataSource(
            achievement?.categoryDescription
          )
          return (
            <AchievementCard
              key={index}
              icon={
                <IconSvg
                  icon={achievementImage['shadow']}
                  width="32px"
                  height="32px"
                />
              }
              title={achievement?.categoryName}
              partProcess={`${achievement.currentValue}/${achievement.maxValue}`}
              percentProcess={achievement.currentProgress}
              onClick={() => {
                  dialog.open({
                  width: 384,
                  noBorder: true,
                  content: (
                    <AchievementDetailDialogContent
                        // @ts-ignore
                      data={achievement}
                      onClose={() => dialog.close()}
                    />
                  )
                })
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default DesktopAchievementsTab