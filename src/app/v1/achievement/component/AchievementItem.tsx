// import CustomButton from "@/components/common/custom-button";
import ProgressBar from '@/app/v1/achievement/component/ProgressBar'
import { cn, css } from '@/lib/utils.ts'
// import {useDialogStore} from "@/store";
// import {useRef} from "react";
// import ClaimedPopup from "@/app/achievement/component/ClaimedPopup.tsx";
import getAchievementDataSource from '@/assets/images/achievement/AchivementDataSource.ts'
import IconSvg from '@/components/common/ui/IconSvg.tsx'
import { useTranslation } from 'react-i18next'

interface AchieItemProps {
  buttonType?: string | undefined
  title: string
  desc: string
  currentProgress: string
  percentage: number
  isRare?: boolean
  gotPrize?: boolean
  cssName?: string
  achievements?: any
  onClick: (a: any, b: any) => void
}

export default function AchievementItem(props: AchieItemProps) {
  const { t } = useTranslation()
  // const dialog = useDialogStore();
  // const buttonRef = useRef<HTMLButtonElement | null>(null);
  const {
    title,
    desc,
    percentage,
    currentProgress,
    cssName,
    achievements = [],
    onClick
  } = props

  const achievementImage = getAchievementDataSource(desc)

  return (
    <div
      className={cn(
        'w-full p-5 bg-[#282244] rounded-[15px] border border-[#483b69] flex-col justify-start items-start gap-5 inline-flex overflow-hidden',
        cssName
      )}
      css={achievementCssFn()}
      onClick={() => onClick(percentage, achievements)}
    >
      <div className="w-full self-stretch justify-between items-start inline-flex">
        <div data-svg-wrapper className="relative">
          <IconSvg
            icon={achievementImage['shadow']}
            width="64px"
            height="64px"
          />
        </div>
      </div>
      <div className="self-stretch flex-col justify-start items-start gap-2.5 flex">
        <div className="h-12 self-stretch text-white text-xl font-black font-['Satoshi'] text-ellipsis break-words grid place-items-center justify-start">
          <p>{title}</p>
        </div>
        <div className="self-stretch text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
          {/*{desc}*/}
        </div>
      </div>
      <div className="w-full">
        <div className="justify-between w-full mx-auto items-center inline-flex pb-2">
          <div className="text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
            {t('achievements.currentProgress')}
          </div>
          <div className="text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
            {currentProgress}
          </div>
        </div>
        <ProgressBar percentage={percentage} />
      </div>
    </div>
  )
}

const achievementCssFn = () => {
  return css`
    border: 1px solid rgba(92, 70, 123, 0.5);
    box-shadow:
      6px 6px 12px 0px rgba(22, 20, 24, 0.5),
      -6px -6px 24px 0px rgba(148, 95, 255, 0.15);

    &:hover {
      background:
        linear-gradient(
          0deg,
          rgba(154, 103, 255, 0.2) 0%,
          rgba(154, 103, 255, 0.2) 100%
        ),
        radial-gradient(
          103.94% 265.37% at 59.95% -118.74%,
          #402c64 0%,
          #402c64 100%
        );
    }

    &:active {
      background:
        linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%),
        radial-gradient(
          103.94% 265.37% at 59.95% -118.74%,
          #654ec8 0%,
          #372864 100%
        );
    }

    &.disabled {
      cursor: not-allowed;
      border: 1px solid #534b5f;
      .label {
        color: #605e68;
      }
      background: radial-gradient(
        103.94% 265.37% at 59.95% -118.74%,
        #474747 0%,
        #1c1c1c 100%
      );

      &:hover,
      &:active {
        background: radial-gradient(
          103.94% 265.37% at 59.95% -118.74%,
          #474747 0%,
          #1c1c1c 100%
        );
      }
    }
  `
}
