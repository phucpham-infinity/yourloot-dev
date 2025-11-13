import CustomButton from '@/components/common/custom-button'
import { DialogPosition, useDialogStore } from '@/store'
import { useRef } from 'react'
import NotificationPopupDetail from '@/app/v1/notification/component/NotificationPopupDetail'
import { isMobile } from 'react-device-detect'

interface NotificationInfo {
  title: string
  time: string
  content: string
  button: boolean
  hasAnchor?: boolean
  image?: string
}

export default function NotificationDetail(props: NotificationInfo) {
  const dialog = useDialogStore()
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const {
    title,
    time,
    content,
    button,
    hasAnchor = false,
    image = null
  } = props
  const anchorConfig = {
    target: buttonRef,
    anchor: DialogPosition.BottomRight,
    self: DialogPosition.BottomLeft,
    offset: [0, 20]
  }
  return (
    <div className="p-3 rounded-2xl justify-start items-start inline-flex flex-col">
      <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex pb-5 border-b-1 border-[#2e2447]">
        <div className="justify-start items-start inline-flex flex-col gap-1">
          <div className="text-white text-2xl font-black font-['Satoshi']">
            {title}
          </div>
          <div className="text-[#9d90cf] text-[10px] font-bold font-['Satoshi'] pb-5">
            {time}
          </div>
        </div>
        <div className="justify-start items-start inline-flex flex-col gap-3">
          <div className="text-[#c5c0d8] text-xs font-medium font-['Satoshi'] ">
            {content}
          </div>
          {button ? (
            <CustomButton
              ref={buttonRef}
              className="items-center w-fit"
              label="Notification button"
              variant="default"
              onClick={() => {
                dialog.open({
                  content: (
                    <NotificationPopupDetail
                      title={title}
                      content={content}
                      image={image}
                      onClose={() => {
                        dialog.close()
                      }}
                    />
                  ),
                  width: 400,
                  config: hasAnchor && !isMobile ? anchorConfig : null
                })
              }}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}
