import GiftIcon from '@/assets/icons/home/gift'
import { cn } from '@/lib/utils'

import CustomButton from '@/components/common/custom-button'

// light

import { SerializedStyles } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import NameAndDes from '@/app/v1/home/components/ui-common/NameAndDes'
import { isMobile } from 'react-device-detect'
import GiftMobileIcon from '@/assets/icons/home/giftmobile'

interface OutShopProfileProps {
  className?: string
  title: string
  des: string
  labelBtn: string
  styles?: SerializedStyles
  imgPosition?: React.ReactNode
}

export default function OutShopProfile({
  className,
  title,
  des,
  labelBtn,
  styles,
  imgPosition
}: OutShopProfileProps) {
  const router = useNavigate()

  return (
    <div
      css={styles}
      className={cn(
        'relative flex gap-5 p-10 flex-col rounded-[20px] border-app-default items-start justify-between w-full overflow-hidden',
        className
      )}
    >
      {isMobile ? (
        <>
          <GiftMobileIcon className="absolute bottom-0 right-0" />

          {/* {imgPosition && imgPosition} */}

          <div className="flex flex-col gap-5 items-start justify-between w-full">
            <NameAndDes title={title} des={des} />

            <CustomButton
              onClick={() => router('/store')}
              variant="default"
              label={labelBtn}
              className="w-fit h-[38px] text-xs font-medium z-10"
            />
          </div>
        </>
      ) : (
        <>
          <GiftIcon className="" />

          {imgPosition && imgPosition}

          <div className="flex flex-col gap-5 items-start justify-between w-full">
            <NameAndDes title={title} des={des} />

            <CustomButton
              onClick={() => router('/store')}
              variant="default"
              label={labelBtn}
              className="w-fit h-[38px] text-xs font-medium z-10"
            />
          </div>
        </>
      )}
    </div>
  )
}
