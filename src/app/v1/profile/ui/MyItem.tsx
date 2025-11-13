import { lazy } from 'react'
const NameAndDes = lazy(
  () => import('@/app/v1/home/components/ui-common/NameAndDes')
)
import GiftIcon from '@/assets/icons/home/gift'
import { cn, css } from '@/lib/utils'
interface MyItemProps {
  className?: string
  title: string
  des: string
  type: string
}

export default function MyItem({ className, title, des }: MyItemProps) {
  return (
    <div
      className={cn(
        'flex gap-5 p-5 flex-col bg-[#1c172c] rounded-[20px] border-app-default items-start justify-between w-full',
        className
      )}
      css={styles}
    >
      {/* {type === 'owned' && ( */}
      <>
        <GiftIcon className="" />
        <div className="flex flex-col gap-5 items-start justify-between w-full">
          <NameAndDes title={title} des={des} />
        </div>
      </>
      {/* )} */}
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
