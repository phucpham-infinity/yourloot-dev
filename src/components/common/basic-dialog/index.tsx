import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useDialogStore } from '@/store'
import { css } from '@/lib/utils'
import { isMobile } from 'react-device-detect'
import GiftIcon from '@/assets/icons/home/gift'
import Loader from '@/components/common/loader'
import NewNotification from '@/assets/images/notification/new-notification.svg'

export function BasicDialog() {
  const { isOpenBasic, type, metaBasic, closeBasicDialog } = useDialogStore()

  return (
    <Dialog open={isOpenBasic} onOpenChange={closeBasicDialog}>
      <DialogContent
        style={{ zIndex: metaBasic?.zIndex }}
        className={'p-0 bg-transparent border-0 w-[390px]'}
      >
        <DialogHeader style={{ display: 'none' }}>
          <DialogTitle style={{ display: 'none' }}></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {type === 'successful' && (
          <div
            css={styled}
            className="w-full flex flex-col items-start justify-center gap-10 p-10 relative bg-white overflow-hidden"
          >
            <div className="relative self-stretch font-black text-yourlootwhite text-5xl ">
              👍
            </div>

            <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
              {!!metaBasic?.title && (
                <div className="relative self-stretch text-app-white text-app-main-20">
                  {metaBasic?.title}
                </div>
              )}

              {!!metaBasic?.description && (
                <p className="relative w-[289px] text-app-pale text-app-medium-12">
                  {metaBasic?.description}
                </p>
              )}
            </div>
            {metaBasic && metaBasic?.button}
          </div>
        )}
        {type === 'warning' && (
          <div
            css={styled}
            className="w-full flex flex-col items-start justify-center gap-10 p-5 pl-10 relative bg-white overflow-hidden"
          >
            <div className="relative self-stretch font-black text-yourlootwhite text-5xl ">
              ⚠️
            </div>

            <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
              {!!metaBasic?.title && (
                <div className="relative self-stretch text-app-white text-app-main-20">
                  {metaBasic?.title}
                </div>
              )}

              {!!metaBasic?.description && (
                <p className="relative w-[289px] text-app-pale text-app-medium-12 whitespace-pre-line">
                  {metaBasic?.description}
                </p>
              )}
            </div>
            {metaBasic && metaBasic?.button}
          </div>
        )}

        {type === 'purchase' && (
          <div
            css={styled}
            className="w-full flex flex-col items-start justify-center gap-10 p-5 pl-10 relative bg-white overflow-hidden"
          >
            <div className="relative self-stretch font-black text-yourlootwhite text-5xl ">
              <GiftIcon className="" />
            </div>

            <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
              {!!metaBasic?.title && (
                <div className="relative self-stretch text-app-white text-app-main-20">
                  {metaBasic?.title}
                </div>
              )}

              {!!metaBasic?.description && (
                <p className="relative w-[289px] text-app-pale text-app-medium-12">
                  {metaBasic?.description}
                </p>
              )}
            </div>
            {metaBasic && metaBasic?.button}
          </div>
        )}

        {type === 'congratulation' && (
          <div
            css={styled}
            className="w-full flex flex-col items-start justify-center gap-10 p-5 pl-10 relative bg-white overflow-hidden"
          >
            <div className="relative self-stretch font-black text-yourlootwhite text-5xl ">
              <GiftIcon className="" />
            </div>

            <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
              {!!metaBasic?.title && (
                <div className="relative self-stretch text-app-white text-app-main-20">
                  {metaBasic?.title}
                </div>
              )}

              {!!metaBasic?.description && (
                <p className="relative w-[289px] text-app-pale text-app-medium-12">
                  {metaBasic?.description}
                </p>
              )}
            </div>
            {metaBasic && metaBasic?.button}
          </div>
        )}

        {type === 'loading' && (
          <div css={styled} className="p-10 max-w-[390px] gap-10 flex flex-col">
            <div className={'flex items-start h-full'}>
              <Loader />
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-white text-xl font-black">Please wait</div>
              {!!metaBasic?.description && (
                <p className="relative w-[289px] text-app-pale text-app-medium-12">
                  {metaBasic?.description}
                </p>
              )}
            </div>
          </div>
        )}

        {type === 'notification' && (
          <div
            css={styled}
            className="w-full flex flex-col items-start justify-center gap-10 p-10 relative bg-white overflow-hidden"
          >
            <div className="relative self-stretch font-black text-yourlootwhite text-5xl ">
              <img src={NewNotification} alt="Logo" className="w-[43px]" />
            </div>

            <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
              {!!metaBasic?.title && (
                <div className="relative self-stretch text-app-white text-app-main-20">
                  {metaBasic?.title}
                </div>
              )}

              {!!metaBasic?.description && (
                <p className="relative w-[289px] text-app-pale text-app-medium-12 whitespace-pre-line">
                  {metaBasic?.description}
                </p>
              )}
            </div>
            {metaBasic && metaBasic?.button}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export const styled = css`
  width: ${isMobile ? '90vw' : '390px'};
  border-radius: 20px;
  border: 1px solid #544a80;
  background: url('/images/dialog-bg.svg') no-repeat center center;
  background-size: cover;
  background-color: #362c5a;
`
