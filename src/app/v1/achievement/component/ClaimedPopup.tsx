import Gift from '@/assets/icons/home/gift.tsx'
import CustomButton from '@/components/common/custom-button'
import { useTranslation } from 'react-i18next'

interface Props {
  onClose?: () => void
}
export default function ClaimedPopup(props: Props) {
  const { t } = useTranslation()
  const { onClose } = props
  return (
    <div className="p-7 flex flex-col gap-5">
      <div className="w-full justify-between mx-auto items-center inline-flex">
        <div>
          <Gift />
        </div>
      </div>
      <div>
        <div className="text-white text-xl font-black font-['Satoshi'] pb-3">
          {t('achievements.congratulations')}
        </div>
        <div className="w-[289px] text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
          {t('achievements.receivedPrize')}
        </div>
      </div>
      <div className="justify-center flex overflow-hidden gap-3">
        <CustomButton
          label={t('achievements.horray')}
          className="w-full items-center text-center text-[#9d90cf] text-xs font-medium font-['Satoshi']"
          variant="default"
          onClick={onClose}
        />
      </div>
    </div>
  )
}
