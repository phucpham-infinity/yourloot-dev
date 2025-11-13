import ProgressBar from './ProgressBar'
import CloseIcon from '@/assets/images/close.svg'
import ValidatePass from '@/assets/images/login/validate-pass.svg'
import FrameIcon from '@/assets/images/frame.svg'
import { css } from '@emotion/react'
import { radialGradientBg } from './styles'
import { Achievement } from '@/services/controller/achivements'
import CustomButton from '@/components/common/custom-button'

interface AchievementDetailDialogContentProps {
  data: Achievement
  onClose: () => void
}

export default function AchievementDetailDialogContent({ data, onClose }: AchievementDetailDialogContentProps) {
  const percentage = data.currentProgress ?? 0
  const currentText = `${data.currentValue}/${data.maxValue} completed`

  return (
    <div className="w-96 bg-zinc-950 rounded-[10px] border border-[#2b2142] backdrop-blur-lg inline-flex flex-col justify-start items-center overflow-hidden">
      {/* Header */}
      <div className="self-stretch h-12 relative bg-zinc-950 border-b border-[#2b2142] backdrop-blur-[10px] flex items-center justify-center">
        <div className="text-white text-base font-medium">{data.categoryName}</div>
        <div className="absolute right-2 top-[10px]">
          <CustomButton
            aria-label="Close"
            variant="invisible"
            height={24}
            onClick={onClose}
            textAlign="center"
            label={
              <div className="w-full h-full flex items-center justify-center">
                <img src={CloseIcon} alt="" aria-hidden className="w-3 h-3" />
              </div>
            }
            className="min-w-0 w-6 h-6 p-0 border-0 bg-transparent outline-none shadow-none"
            style={{ padding: 0, borderRadius: 0 }}
          />
        </div>
      </div>

      {/* Body */}
      <div className="self-stretch px-4 py-6 flex flex-col justify-start items-start gap-6">
        {/* Top progress bar */}
        <div className="self-stretch">
          <div className="w-full relative">
            <ProgressBar
              percentage={percentage}
              className="!h-12 !rounded-2xl !p-2"
              classNameBar="!h-7 !rounded-10"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-slate-400 text-[10px] font-bold">{currentText}</span>
            </div>
          </div>
        </div>

        {/* Items list */}
        <div className="self-stretch flex flex-col justify-start items-start gap-4">
          {data.achievements?.map((item, idx) => {
            const isCompleted = !!item.isCompleted
            return (
              <div key={idx} className="self-stretch inline-flex justify-start items-start gap-4">
                <img
                  src={isCompleted ? ValidatePass : FrameIcon}
                  alt={isCompleted ? 'completed' : 'pending'}
                  className="w-3 h-3 mt-[3px]"
                />
                <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                  <div className="self-stretch text-white text-sm font-medium">{item.achievementName}</div>
                  <div className="self-stretch text-slate-300 text-xs">{item.achievementDescription}</div>
                </div>
              </div>
            )
          })}

          {!data?.achievements?.length && (
            <div css={emptyStyles} className="self-stretch p-4">
              <div className="text-center text-slate-400 text-sm">No details available</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const emptyStyles = css`
  border-radius: 10px;
  ${radialGradientBg};
`
