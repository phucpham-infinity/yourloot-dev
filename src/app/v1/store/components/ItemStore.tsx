import { useDialogStore } from '@/store'
import { cn, css } from '@/lib/utils'

import { lazy } from 'react'

const CustomButton = lazy(() => import('@/components/common/custom-button'))
const IconBtn = lazy(() => import('@/components/common/icon-button'))

import CoinGoldIcon from '@/assets/images/homes/coingold'
import StarIcon from '@/assets/icons/iconStar'
import WishlistIcon from '@/assets/images/store/wishtItem.svg'

interface ItemStoreProps {
  title: string
  btnStart: string
  btnAmount: string
  isStar: boolean
  isOwned: boolean
  className?: string
  imgPosition?: React.ReactNode
  isWishlist?: boolean
}

const ItemStore = ({
  title,
  btnStart,
  btnAmount,
  isStar,
  isOwned,
  className,
  imgPosition,
  isWishlist
}: ItemStoreProps) => {
  const dialog = useDialogStore()

  const handleCongratulationAlert = () => {
    dialog.openBasicDialog({
      type: 'congratulation',
      meta: {
        title: 'Congratulations!',
        description: 'You are proud owner of new super item 123!',
        button: (
          <div className="w-full">
            <CustomButton
              variant={'default'}
              className="w-full text-center"
              label="Horray!"
              onClick={() => {
                dialog.closeBasicDialog()
              }}
            />
          </div>
        )
      }
    })
  }

  const confirmationDialog = () => {
    dialog.openBasicDialog({
      type: 'purchase',
      meta: {
        title: 'Confirm purchase?',
        description: 'This will remove $ 12,312 from your balance.',
        button: (
          <div className="w-full inline-flex justify-between items-center gap-3 pr-5">
            <CustomButton
              variant={'muted'}
              className="w-2/5"
              label="Cancel"
              onClick={() => dialog.closeBasicDialog()}
            />
            <CustomButton
              variant={'default'}
              className="w-3/5 text-center"
              label="Confirm"
              onClick={handleCongratulationAlert}
            />
          </div>
        )
      }
    })
  }

  return (
    <div
      className={cn(
        'relative flex items-center w-full flex-col h-full rounded-[20px] overflow-hidden border-app-default',
        className
      )}
    >
      <div className="relative w-full flex items-center justify-center h-[214px]">
        {isWishlist && (
          <img src={WishlistIcon} className="absolute top-[10px] left-[10px]" />
        )}

        {isStar && !isWishlist && (
          <IconBtn
            icon={<StarIcon />}
            className="absolute top-[20px] left-[20px]"
          />
        )}
        {isOwned && !isWishlist && (
          <CustomButton
            label="Owned"
            variant="CTA"
            className="absolute w-fit !h-[27px] !p-2.5 top-[20px] right-[20px] !rounded-[15px] text-[10px] font-bold"
          />
        )}

        {imgPosition && imgPosition}

        <CoinGoldIcon className="w-[91px] h-[91px]" />
      </div>
      <div css={styles} className="w-full flex flex-col gap-5 px-2.5 py-5">
        <div className="text-white text-xs font-black">{title}</div>
        <div className="flex flex-col lg:flex-row gap-2.5 w-full items-center justify-between ">
          <CustomButton
            className="w-full lg:w-fit  gap-2.5"
            label={btnStart}
            variant="muted"
            prefixIcon={<StarIcon />}
            onClick={confirmationDialog}
          />
          <CustomButton
            className="w-full lg:w-fit  gap-2.5"
            label={`$ ${btnAmount}`}
            variant="default"
            onClick={confirmationDialog}
          />
        </div>
      </div>
    </div>
  )
}

export default ItemStore

const styles = css`
  background: radial-gradient(
    237.29% 116.82% at 60.95% -22.92%,
    #362c5a 0%,
    #181526 100%
  );
`
