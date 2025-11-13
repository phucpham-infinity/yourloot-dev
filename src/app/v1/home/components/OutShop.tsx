import GiftIcon from '@/assets/icons/home/gift'
import { cn } from '@/lib/utils'

import CustomButton from '@/components/common/custom-button'
import NameAndDes from './ui-common/NameAndDes'

// light

import { SerializedStyles } from '@emotion/react'
import { useNavigate } from 'react-router-dom'

interface OutShopProps {
  className?: string
  title: string
  des: string
  labelBtn: string
  styles?: SerializedStyles
  imgPosition?: React.ReactNode
}

export default function OutShop({
  className,
  title,
  des,
  labelBtn,
  styles,
  imgPosition
}: OutShopProps) {
  const router = useNavigate()

  return (
    <div
      css={styles}
      className={cn(
        'relative flex gap-5 p-5 flex-col rounded-[20px] border-app-default items-start justify-between w-full overflow-hidden',
        className
      )}
    >
      <GiftIcon className="" />

      {imgPosition && imgPosition}

      <div className="flex flex-col gap-5 items-start justify-between w-full">
        <NameAndDes title={title} des={des} />

        <CustomButton
          onClick={() => router('/store')}
          variant="default"
          label={labelBtn}
          className="w-[200px] h-[38px] text-xs font-medium z-10"
        />
      </div>
    </div>
  )
}
