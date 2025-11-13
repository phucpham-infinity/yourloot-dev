import { cn, css } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import TrophyIcon from '../../../../assets/icons/home/trophy'

import getAchievementDataSource from '@/assets/images/achievement/AchivementDataSource.ts'
import CustomButton from '@/components/common/custom-button'
import Loader from '@/components/common/loader'
import IconSvg from '@/components/common/ui/IconSvg.tsx'
import { achievementsController } from '@/services/controller/achivements'
import Category from './ui-common/Category'
import { useAuthStore } from '@/store'
interface ImageCardProps {
  className?: string
}

export default function Achievements({ className }: ImageCardProps) {
  const router = useNavigate()
  const { t } = useTranslation()

  const { useGetAllAchievements } = achievementsController()
  const { userId } = useAuthStore()
  const { data: achievements, isPending } = useGetAllAchievements(userId!)

  return (
    <div
      className={cn(
        'relative p-5 w-full h-full flex gap-5 flex-col rounded-[20px] border-app-default',
        className
      )}
      css={style}
    >
      <div className="w-full justify-between items-center inline-flex max-h-[50px] lg:max-h-[40px]">
        <div className="flex items-center gap-2.5 ">
          <TrophyIcon className="w-8 h-8" />
          <div className="text-white text-2xl  font-black leading-10">
            {t('achievements.title')}
          </div>
        </div>
        <CustomButton
          variant="default"
          label={t('achievements.seeAll')}
          onClick={() => router('/achievement')}
          className="w-fit h-[38px] text-xs font-medium !py-4"
        />
      </div>

      <div className="flex justify-between items-center gap-5 w-full flex-col lg:flex-row">
        {isPending ? (
          <div className="w-full h-full min-h-[253px] flex justify-center items-center translate-y-[-40px]">
            <Loader className="w-[40px] h-[40px]" />
          </div>
        ) : (
          achievements?.content?.slice(0, 2)?.map((achievement, index) => {
            const achievementImage = getAchievementDataSource(
              achievement.categoryDescription
            )
            return (
              <Category
                key={index}
                className="w-full lg:w-[210px] h-[253px]"
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
    </div>
  )
}

const style = css`
  background: radial-gradient(
    237.29% 116.82% at 60.95% -22.92%,
    #362c5a 0%,
    #181526 100%
  );
`

{
  /* <div className="p-5 h-16 bg-[#4a3c7d] rounded-[15px] shadow-[-6px_-6px_24px_0px_rgba(148,95,255,0.15)] border border-[#433970] justify-start items-center  inline-flex overflow-hidden">
        <FireIcon className="w-[40px] h-[40px]" />
        <div className="flex-col justify-start items-start gap-2 inline-flex">
          <div className="text-[#c5c0d8] text-xs leading-3 font-black ]">
            Achievement name
          </div>
          <div className="text-[#9d90cf] text-[10px] leading-[10px] font-medium ]">
            Description
          </div>
        </div>
      </div>

      <div className="p-5 h-16 bg-[#4a3c7d] rounded-[15px] shadow-[-6px_-6px_24px_0px_rgba(148,95,255,0.15)] border border-[#433970] justify-start items-center  inline-flex overflow-hidden">
        <div className="flex -transform-x-20px">
          <FireIcon className="w-[40px] h-[40px]" />
          <div className="flex-col justify-start items-start gap-2 inline-flex">
            <div className="text-[#c5c0d8] text-xs font-black leading-3">
              Achievement name
            </div>
            <div className="text-[#9d90cf] text-[10px] font-medium leading-[10px]">
              Description
            </div>
          </div>
        </div>
      </div> */
}

{
  /* <div className="flex-col justify-start items-start gap-2.5 inline-flex">
        <div className="text-white text-xl leading-5 ≈ font-black ">
          Locked Achievements
        </div>
        <div className="text-[#c5c0d7] text-xs font-medium leading-3">
          Play to unlock achievements and gain exp!{" "}
        </div>
      </div>

      <div className="p-5 h-16 bg-[#2d2c31] rounded-[20px] shadow-[0px_12px_24px_0px_rgba(9,7,19,0.20)] border border-white justify-start items-center gap-3 inline-flex overflow-hidden">
        <FireTransparent className="" />
        <div className="flex-col justify-start items-start gap-2 inline-flex">
          <div className="text-[#858097] text-xs font-black ]">
            Achievement name
          </div>
          <div className="text-[#645c82] text-[10px] font-medium ]">
            Description
          </div>
        </div>
        <div className="h-[26px] p-2.5 bg-[#2d2c31] rounded-[20px] shadow-[0px_12px_24px_0px_rgba(9,7,19,0.20)] border border-white justify-start items-center gap-3 flex overflow-hidden">
          <div className="text-[#858097] text-[8px] font-bold ]">+120 xp</div>
        </div>
      </div>

      <div className="text-center justify-center8-108-5 bg-[#644ec7] rounded-[15px] shadow-[6px_6px_16px_0px_rgba(22,28,22,0.25)] border border-[#c2a1f1] items-center inline-flex overflow-hidden">
        <div className="text-[#d8ceff] text-xs font-bold ]">See all</div>
      </div> */
}
