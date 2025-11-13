import { lazy } from 'react'
import { cn } from '@/lib/utils'
import { SerializedStyles } from '@emotion/react'
import { useNavigate } from 'react-router-dom'

const NameAndDes = lazy(
  () => import('@/app/v1/home/components/ui-common/NameAndDes')
)
const CustomButton = lazy(() => import('@/components/common/custom-button'))

// light

interface ShopStoreProps {
  className?: string
  title: string
  des: string
  labelBtn: string
  styles?: SerializedStyles
  imgPosition?: React.ReactNode
  bgPosition?: React.ReactNode
  giftIcon?: React.ReactNode
}

export default function ShopStore({
  className,
  title,
  des,
  labelBtn,
  styles,
  imgPosition,
  bgPosition,
  giftIcon
}: ShopStoreProps) {
  const router = useNavigate()

  return (
    <div
      css={styles}
      className={cn(
        'relative flex gap-5 p-10 flex-col rounded-[20px] border-app-default items-start justify-between border-app-default',
        className
      )}
    >
      {/* <GiftIcon className="w-[300px] h-[300px]" /> */}

      {giftIcon && giftIcon}

      {imgPosition && imgPosition}
      {bgPosition && bgPosition}

      <div className="flex flex-col gap-5 items-start justify-between w-full">
        <NameAndDes title={title} des={des} />
      </div>

      <CustomButton
        onClick={() => router('/store')}
        variant="default"
        label={labelBtn}
        className="w-[128px] text-xs font-medium z-10 absolute top-10 right-10"
      />
    </div>
  )
}
