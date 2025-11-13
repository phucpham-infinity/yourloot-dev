import { cn, css } from '@/lib/utils.ts'

interface Props {
  percentage: number
  maxWidth?: number
  className?: string
  classNameBar?: string
}

export default function ProgressBar(props: Props) {
  const { percentage, className, classNameBar } = props
  return (
    <div
      className={cn(
        'relative flex h-[24px] flex-row justify-start items-center p-[5px] rounded-[10px]',
        className
      )}
      css={cssProgressBarFN()}
    >
      <div
        css={cssFn(percentage)}
        className={cn('relative h-[12px]', classNameBar)}
      ></div>
    </div>
  )
}

const cssFn = (percentage: number) => {
  return css`
    border-radius: 6px;
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
      6px 6px 12px 0 rgba(22, 20, 24, 0.5),
      -6px -6px 24px 0 rgba(148, 95, 255, 0.15);
    width: ${percentage}%;
    opacity: ${percentage > 0 ? '1' : '0'};
  `
}

const cssProgressBarFN = () => {
  return css`
    border-radius: 10px;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.1) 100%
    );
    /* Neomorphic shadow similar to CustomButton */
    //box-shadow:
    //  6px 6px 12px 0 rgba(22, 20, 24, 0.5),
    //  -6px -6px 24px 0 rgba(148, 95, 255, 0.15);
    outline: 1px solid #322a3e;
    outline-offset: -1px;
    width: 100%;
  `
}
