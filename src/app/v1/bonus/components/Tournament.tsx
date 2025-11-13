import NameAndDes from '@/app/v1/home/components/ui-common/NameAndDes'
import CustomButton from '@/components/common/custom-button'
import { cn } from '@/lib/utils'
import { SerializedStyles } from '@emotion/react'

interface ITournamentProps {
  className?: string
  title: string
  des: string
  labelBtn: string
  labelBtn2: string
  labelBtn3: string
  srcIcon: React.ReactNode
  imgPosition?: React.ReactNode
  onClick?: () => void
  css?: SerializedStyles
}

export default function Tournament({
  className,
  title,
  des,
  srcIcon,
  labelBtn2,
  labelBtn3,
  labelBtn,
  imgPosition,
  css,
  onClick = () => {}
}: ITournamentProps) {
  return (
    <div
      css={css}
      className={cn(
        'relative flex justify-between items-start h-[200px] w-full p-10 rounded-[10px] border-app-default  gap-10 overflow-hidden ',
        className
      )}
    >
      {imgPosition && imgPosition}
      {srcIcon && srcIcon}
      <div>
        <div className="flex-col items-start gap-5 inline-flex">
          <NameAndDes
            title={title}
            des={des}
            className="gap-2.5 max-w-[274px] leading-3.5"
          />
          <CustomButton
            label={labelBtn}
            className="w-fit h-[38px] z-10 !py-5 text-xs font-medium leading-3 whitespace-nowrap"
            onClick={onClick}
          />
        </div>
      </div>
      <div className="flex gap-2.5">
        <CustomButton
          label={labelBtn2}
          className="w-fit h-[38px] z-10 !py-5 text-xs font-medium leading-3 whitespace-nowrap"
          onClick={onClick}
          variant="muted"
        />
        <CustomButton
          label={labelBtn3}
          className="w-fit h-[38px] z-10 !py-5 text-xs font-medium leading-3 whitespace-nowrap"
          onClick={onClick}
          variant="muted"
        />
      </div>
    </div>
  )
}
