import { useTranslation } from 'react-i18next'
import CustomButton from '@/components/common/custom-button'
import CloseIcon from '@/assets/images/close.svg'
import SuccessSendLink from '@/assets/icons/v2/success-send-link.svg'

interface ChangePasswordSuccessDialogContentProps {
  onClose?: () => void
}

export default function ChangePasswordSuccessDialogContent(
  props: ChangePasswordSuccessDialogContentProps
) {
  const { onClose } = props
  const { t } = useTranslation()

  return (
    <div className="w-96 bg-zinc-950 rounded-[10px] border border-[#2b2142] backdrop-blur-lg inline-flex flex-col justify-start items-center overflow-hidden">
      <div className="self-stretch h-12 relative bg-zinc-950 border-b border-[#2b2142] backdrop-blur-[10px] flex items-center justify-center">
        <div className="text-white text-base font-medium">{t('profile.changePassword')}</div>
        {onClose && (
          <div className="absolute right-2 top-[10px]">
            <CustomButton
              aria-label="Close"
              variant="invisible"
              height={24}
              onClick={onClose}
              textAlign="center"
              label={
                <div className="w-full h-full flex items-center justify-center">
                  <img src={CloseIcon} alt="" aria-hidden className="w-4 h-4" />
                </div>
              }
              className="min-w-0 w-6 h-6 p-0 border-0 bg-transparent outline-none shadow-none"
              style={{ padding: 0, borderRadius: 0 }}
            />
          </div>
        )}
      </div>

      <div className="self-stretch px-4 py-6 flex flex-col justify-start items-start">
        <div className="self-stretch pb-2 flex flex-col justify-center items-center gap-4">
          <img className="w-20 h-20" src={SuccessSendLink} alt="success-send-link" />
          <div className="self-stretch text-center justify-center text-white text-sm font-medium">
            {t('profile.confirmationLinkSent')}
          </div>
          <div className="self-stretch flex flex-col justify-start items-center gap-2">
            <div className="self-stretch text-center justify-center text-[#9E90CF] text-xs font-medium">
              {t('profile.confirmationLinkSentToEmail')}
            </div>
            <div className="self-stretch text-center justify-center text-[#9E90CF] text-xs font-medium">
              {t('profile.validForFiveMinutes')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
