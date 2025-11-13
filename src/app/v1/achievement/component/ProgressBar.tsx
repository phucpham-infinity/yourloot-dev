import { cn, css } from '@/lib/utils.ts'

interface Props {
  percentage: number
  maxWidth?: number
  className?: string
}

export default function ProgressBar(props: Props) {
  const { percentage, className } = props
  return (
    <div
      className={cn(
        'relative flex flex-row justify-start items-center p-[5px] rounded-[15px] border border-[#3f335b]',
        className
      )}
      css={cssProgressBarFN()}
    >
      <div
        css={cssFn(percentage)}
        className="relative h-[28px] bg-[#18132c] border-[#6b5b9a] rounded-[10px] border"
      ></div>
      <div className="absolute text-[#c5c0d7] text-[10px] font-bold w-full text-center">
        {percentage.toFixed(0)}%
      </div>
    </div>
  )
}

const cssFn = (percentage: number) => {
  return css`
    background-image:
      linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0.1) 100%
      ),
      radial-gradient(
        103.94% 265.37% at 59.95% -118.74%,
        #654ec8 0%,
        #372864 100%
      );
    box-shadow:
      6px 6px 12px 0px rgba(22, 20, 24, 0.5),
      -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
    width: ${percentage}%;
    opacity: ${percentage > 0 ? '1' : '0'};
  `
}

const cssProgressBarFN = () => {
  return css`
    box-shadow:
      6px 6px 12px 0px rgba(22, 20, 24, 0.5),
      -6px -6px 12px 0px rgba(148, 95, 255, 0.15);
    background-image: linear-gradient(
      0deg,
      rgba(22, 20, 24, 0.3) 0%,
      rgba(22, 20, 24, 0.3) 100%
    );
    width: 100%;
  `
}
