import CustomButton from '@/components/common/custom-button'
import { css } from '@/lib/utils.ts'
import { useTranslation } from 'react-i18next'

interface Props {
  onClose?: () => void
  canSwitch?: boolean
  promoCode: string
}

export default function CodeApplyDialog(props: Props) {
  const { onClose } = props
  const { t } = useTranslation()
  return (
    <div className="flex-col justify-center w-full p-10" css={cssFn()}>
      <div className="pb-5">
        <div className="text-white text-5xl font-black font-['Satoshi']">
          👍
        </div>
      </div>
      <div className="flex-col items-center justify-start pb-5">
        <div className="w-[234px] text-white text-xl font-black font-['Satoshi'] pb-3">
          {t('register.promoCode.applied')}
        </div>
        <div className="w-[289px]">
          <span className="text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
            {t('register.promoCode.appliedDescription')}
          </span>
        </div>
      </div>
      <div className="inline-flex items-center justify-between w-full">
        <CustomButton
          label={t('register.promoCode.great')}
          className="w-full items-center text-center text-[#9d90cf] text-xs font-medium font-['Satoshi'] inline-flex gap-1 justify-start"
          variant="default"
          onClick={() => {
            onClose?.()
          }}
        />
      </div>
    </div>
  )
}

const cssFn = () => {
  return css`
    background-image: linear-gradient(180deg, #2a2446 20%, #151323 70%);
  `
}
