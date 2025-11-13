import ArrowLeft from '@/assets/icons/arrowLeft.tsx'
import Checkmark from '@/assets/images/notification/checkmark.svg'
import NewNotification from '@/assets/images/notification/new-notification.svg'
import CustomButton from '@/components/common/custom-button'
import Loader from '@/components/common/loader'
import { notificationsController } from '@/services/controller'
import { useAuthStore } from '@/store'
import { useNavigate } from 'react-router-dom'

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
//     button: true,
//     image: '/images/notification-img.png'
//   },
//   {
//     title: 'Notification Name',
//     time: '01.02.25 / 14:24',
//     context: RAW_CONTEXT,
//     button: false
//   }
// ]

// const preNotifications: any[] = [
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
//     button: true,
//     image: '/images/notification-img.png'
//   },
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
//     button: true,
//     image: '/images/notification-img.png'
//   },
//   {
//     title: 'Notification Name',
//     time: '01.02.25 / 14:24',
//     context: RAW_CONTEXT,
//     button: false
//   }
// ]

// const renderNotifications = (list: any[]) => {
//   return list.map((item) => {
//     const { title, time, context, button, image } = item
//     return (
//       <NotificationDetail
//         title={title}
//         time={time}
//         content={context}
//         button={button}
//         image={image}
//       />
//     )
//   })
// }

export default function Notification() {
  const navigate = useNavigate()
  const { useGetUserNotifications } = notificationsController()
  const { userId } = useAuthStore()
  const { isLoading: isLoadingNotifications } = useGetUserNotifications(userId!)

  return isLoadingNotifications ? (
    <Loader />
  ) : (
    <div>
      <div>
        <div className="justify-between w-full mx-auto items-center inline-flex">
          <div className="justify-start items-center gap-5 flex">
            <div data-svg-wrapper className="relative p-3 pr-0 pl-0">
              <img src={NewNotification} alt="Logo" className="w-[43px]" />
            </div>
            <div className="text-white text-2xl font-black font-['Satoshi']">
              New Notifications
            </div>
          </div>
          <div className="p-5 justify-start items-center gap-5 flex pr-0">
            <CustomButton
              label="Back"
              prefixIcon={<ArrowLeft />}
              className="w-fit items-center text-center text-[#9d90cf] text-xs font-medium font-['Satoshi'] inline-flex gap-1"
              variant="muted"
              onClick={() => {
                navigate(-1)
              }}
            />
            <CustomButton
              label="Read all"
              className="w-fit items-center text-center text-[#9d90cf] text-xs font-medium font-['Satoshi']"
              variant="muted"
            />
          </div>
        </div>
        <div className="p-5 rounded-2xl border border-[#403b4a] justify-start items-start flex-col self-stretch overflow-y-auto overflow-x-hidden max-lg:pl-10">
          <div className="w-150 h-150 ml-100 -mt-145 bg-[#6330aa] rounded-full blur-[400px]"></div>
          {/* <div className="justify-start items-start inline-flex overflow-hidden flex-col z-20">
            {renderNotifications(newNotifications)}
          </div> */}
        </div>
      </div>
      <div className="pt-10">
        <div className="h-10 justify-between w-full mx-auto items-center inline-flex">
          <div className="justify-start items-center gap-5 flex">
            <div data-svg-wrapper className="relative p-3 pr-0 pl-0">
              <img src={Checkmark} alt="Logo" className="w-[43px]" />
            </div>
            <div className="text-white text-2xl font-black font-['Satoshi']">
              Previous Notifications
            </div>
          </div>
        </div>
        <div className="p-5 h-150 rounded-2xl border border-[#403b4a] self-stretch overflow-auto overflow-x-hidden max-lg:pl-10">
          <div className="w-150 h-150 ml-100 -mt-145 bg-[#6330aa] rounded-full blur-[400px]"></div>
          {/* <div className="justify-start items-start inline-flex flex-col">
            {renderNotifications(preNotifications)}
          </div> */}
        </div>
      </div>
    </div>
  )
}
