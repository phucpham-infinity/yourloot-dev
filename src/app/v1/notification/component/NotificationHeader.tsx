import NewNotification from '@/assets/images/notification/new-notification.svg'
import CustomButton from '@/components/common/custom-button'
import { useNavigate } from 'react-router-dom'

interface NotificationHeaderProps {
  onClose?: () => void
}

// const RAW_CONTEXT =
//   'If you object to any such changes, you must immediately stop using the Service. Your continued use of the Website\n' +
//   '                            following such publication will indicate your agreement to be bound by the Terms as amended.\n' +
//   '                            Any\n' +
//   '                            bets not settled prior to the changed Terms taking effect will be subject to the\n' +
//   '                            pre-existing\n' +
//   '                            Terms.'

// const newNotifications: any[] = [
//   {
//     title: 'Notification Name',
//     time: '01.02.25 / 14:24',
//     context: RAW_CONTEXT,
//     button: false
//   },
//   {
//     title: 'Notification Name',
//     time: '01.02.25 / 14:24',
//     context: RAW_CONTEXT,
//     button: true
//   }
// ]
// const renderNotifications = (list: any[]) => {
//   return list.map((item, index) => {
//     const { title, time, context, button } = item
//     return (
//       <NotificationDetail
//         title={title}
//         time={time}
//         content={context}
//         button={button}
//         hasAnchor={true}
//         key={index}
//       />
//     )
//   })
// }

export default function NotificationHeader(props: NotificationHeaderProps) {
  const navigate = useNavigate()
  const { onClose } = props
  return (
    <div className="p-3 max-lg:w-full max-lg:max-h-[600px] w-full overflow-auto overflow-x-hidden">
      <div className="justify-between mx-auto items-center inline-flex">
        <div className="justify-start items-center gap-5 flex">
          <div data-svg-wrapper className="relative p-3 pr-0 pl-0">
            <img src={NewNotification} alt="Logo" className="w-[43px]" />
          </div>
          <div className="text-white text-2xl font-black font-['Satoshi']">
            New Notifications
          </div>
        </div>
      </div>
      {/* <div className="inline-flex flex-col overflow-y-scroll max-h-[400px]">
        {renderNotifications(newNotifications)}
      </div> */}
      <div className="p-3 justify-center flex gap-3">
        <CustomButton
          label="Close"
          className="w-1/2 pl-7 pr-7 items-center text-center text-[#9d90cf] text-xs font-medium font-['Satoshi']"
          variant="muted"
          onClick={onClose}
        />
        <CustomButton
          label="See all"
          className="w-1/2 pl-7 pr-7 items-center text-center text-[#9d90cf] text-xs font-medium font-['Satoshi']"
          variant="default"
          onClick={() => {
            navigate('/notification')
            onClose?.call(null)
          }}
        />
      </div>
    </div>
  )
}
