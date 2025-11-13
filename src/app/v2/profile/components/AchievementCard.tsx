import { css } from '@emotion/react'
import ProgressBar from './ProgressBar'
// import { radialGradientBg } from './styles'

interface AchievementCardProps {
  partProcess: string
  percentProcess: number
  icon: React.ReactNode
  title: string
  onClick?: () => void
}

export const AchievementCard = ({
  partProcess,
  percentProcess,
  icon,
  title,
  onClick
}: AchievementCardProps) => {
  return (
    <div
      css={styles}
      onClick={onClick}
      className={`p-4 space-y-4 min-w-[175px] w-[175px] h-full md:w-full ${onClick ? 'cursor-pointer' : ''}`}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="flex items-center gap-2">
        {icon}
        <div className="flex flex-col gap-2">
          <span className="text-white text-xs font-medium">{title}</span>
          <span className="text-[#C5C0D8] text-xs font-medium">
            {partProcess}
          </span>
        </div>
      </div>

      <ProgressBar
        percentage={percentProcess}
        classNameBar="!h-[6px]"
        className="!h-[20px] w-full"
      />
    </div>
  )
}

const styles = css`
    border-radius: 10px;
    background: linear-gradient(
            180deg,
            rgba(25, 21, 36, 1) 0%,
            rgba(25, 21, 36, 1) 100%
    );
`
