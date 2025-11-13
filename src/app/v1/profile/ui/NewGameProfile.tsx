import { cn, css } from '@/lib/utils'
import { lazy } from 'react'
const CustomButton = lazy(() => import('@/components/common/custom-button'))
const NameAndDes = lazy(
  () => import('@/app/v1/home/components/ui-common/NameAndDes')
)

interface IGameNameProfileProps {
  className?: string
  title: string
  des: string
  labelBtn: string
  srcIcon: string
  imgPosition?: React.ReactNode
  onClick?: () => void
}

export default function GameNameProfile({
  className,
  title,
  des,
  srcIcon,
  labelBtn,
  imgPosition,
  onClick = () => {}
}: IGameNameProfileProps) {
  return (
    <div
      css={styles}
      className={cn(
        'relative flex justify-between items-center h-[200px] w-full p-10 rounded-[10px] border-app-default  gap-10 overflow-hidden ',
        className
      )}
    >
      {imgPosition && imgPosition}
      <div className="flex-col justify-center items-start gap-5 inline-flex">
        <NameAndDes
          title={title}
          des={des}
          className="gap-2.5 max-w-[170px] leading-3.5"
        />
        <CustomButton
          label={labelBtn}
          className="w-fit h-[38px] z-10 !py-5 text-xs font-medium leading-3 whitespace-nowrap"
          onClick={onClick}
        />
      </div>
      <img
        className="lg:translate-x-10 w-[300px] z-[2] h-[200px] lg:w-[296px] lg:h-[216px]"
        src={srcIcon}
      />
    </div>
  )
}

const styles = css`
  background: linear-gradient(
    180deg,
    rgba(64, 53, 85, 0.2) 0%,
    rgba(0, 0, 0, 0.1) 100%
  );
`
