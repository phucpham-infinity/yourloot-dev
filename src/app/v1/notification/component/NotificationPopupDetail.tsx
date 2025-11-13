import NewNotification from '@/assets/images/notification/new-notification.svg'
import CustomButton from '@/components/common/custom-button'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface PopupDetailsProps {
  onClose?: () => void
  title: string
  content: string
  image: string | null
}

export default function NotificationPopupDetail(props: PopupDetailsProps) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { onClose, title, content, image } = props
  return (
    <div className="p-3">
      <div className="w-full justify-between mx-auto items-center inline-flex pt-3">
        <div data-svg-wrapper className="relative">
          <img src={NewNotification} alt="Logo" className="w-[70px]" />
        </div>
        <CustomButton
          label={t('bonus.seeAll')}
          className="w-fit items-center text-center text-[#9d90cf] text-xs font-medium font-['Satoshi']"
          variant="default"
          onClick={() => {
            navigate('/notification')
            onClose?.call(null)
          }}
        />
      </div>
      <div>
        {image ? (
          <img
            className="w-full h-[200] bg-cover bg-center bg-no-repeat border-0"
            src={image}
          />
        ) : (
          ''
        )}
        <div className="p-3 text-white text-2xl font-black font-['Satoshi']">
          {title}
        </div>
        <div className="p-3 text-[#c5c0d8] text-xs font-medium font-['Satoshi'] ">
          {content}
        </div>
      </div>
      <div className="p-3 justify-center flex overflow-hidden gap-3">
        <CustomButton
          label={t('bonus.close')}
          className="w-1/2 pl-7 pr-7 items-center text-center text-[#9d90cf] text-xs font-medium font-['Satoshi']"
          variant="muted"
          onClick={onClose}
        />
        <CustomButton
          label="Notification button"
          className="w-1/2 pl-7 pr-7 items-center text-center text-[#9d90cf] text-xs font-medium font-['Satoshi']"
          variant="default"
          onClick={onClose}
        />
      </div>
    </div>
  )
}
