import TrophyIcon from '@/assets/icons/home/trophy'
import getAchievementDataSource from '@/assets/images/achievement/AchivementDataSource'
import Loader from '@/components/common/loader'
import IconSvg from '@/components/common/ui/IconSvg.tsx'
import { cn } from '@/lib/utils'
import { achievementsController } from '@/services/controller/achivements'
import { useAuthStore } from '@/store'
import { lazy } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const CustomButton = lazy(() => import('@/components/common/custom-button'))
const Category = lazy(
  () => import('@/app/v1/home/components/ui-common/Category')
)

interface ImageCardProps {
  className?: string
}

export default function AchievementsProfile({ className }: ImageCardProps) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { useGetAllAchievements } = achievementsController()
  const { userId } = useAuthStore()
  const { data: achievements, isPending } = useGetAllAchievements(userId!)

  return (
    <div
      className={cn(
        'relative p-5 w-full h-full flex gap-10 flex-col border-app-default rounded-[20px]',
        className
      )}
    >
      <div className="w-full  justify-between items-center flex">
        <div className="flex items-center gap-5">
          <TrophyIcon className="w-[40px] h-[40px]" />
          <div className="text-white text-2xl  font-black leading-10">
            {t('achievements.title')}
          </div>
        </div>
        <CustomButton
          onClick={() => navigate('/achievement')}
          variant="default"
          label={t('achievements.seeAll')}
          className="hidden sm:block w-fit h-[38px] text-xs font-medium !py-4"
        />
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center gap-5 w-full h-full">
        {isPending ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loader className="w-[40px] h-[40px]" />
          </div>
        ) : (
          achievements?.content?.slice(0, 3).map((achievement, index) => {
            const achievementImage = getAchievementDataSource(
              achievement.categoryDescription
            )
            return (
              <Category
                key={index}
                className="h-[253px]"
                title={achievement.categoryName}
                partProcess={`${achievement.currentValue}/${achievement.maxValue}`}
                percentProcess={achievement.currentProgress}
                onClick={() => {}}
                textBtn={t('achievements.getPrize')}
                iconLeft={
                  <div data-svg-wrapper className="relative">
                    <IconSvg
                      icon={achievementImage['shadow']}
                      width="64px"
                      height="64px"
                    />
                  </div>
                }
                labelProcess={t('achievements.currentProgress')}
                maxWidthProgressBar={224}
              />
            )
          })
        )}
      </div>

      {/* <CustomButton
        onClick={() => navigate('/achievement')}
        variant="default"
        label="See All"
        className="block sm:hidden w-full h-[38px] text-xs font-medium !py-4"
      /> */}
    </div>
  )
}
