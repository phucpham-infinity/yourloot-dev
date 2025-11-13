import CustomButton from '@/components/common/custom-button'
import { cn, css } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
// light
import lightSupport from '@/assets/icons/home/light/lightSupport.svg'

interface SupportProps {
  className?: string
}

export default function Support({ className }: SupportProps) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  return (
    <div
      css={style}
      className={cn(
        'relative h-fit  w-full p-5 bg-[#362c5a] border-app-default rounded-[20px]  flex-col justify-center items-start gap-3 inline-flex overflow-hidden',
        className
      )}
    >
      <img src={lightSupport} className="absolute bottom-0 " />
      <div className="self-stretch flex-col justify-start items-start gap-5 flex">
        <div className="flex-col justify-start items-start gap-2.5 flex">
          <div className="text-white text-xl font-black ">
            {t('contact.contactSupport')}
          </div>
        </div>
      </div>
      <CustomButton
        label={t('contact.title')}
        onClick={() => {
          navigate('/contact')
        }}
        className="w-[200px] h-[38px] text-xs font-medium"
      />
    </div>
  )
}

const style = css`
  background: radial-gradient(
    237.29% 116.82% at 60.95% -22.92%,
    #362c5a 0%,
    #181526 100%
  );
`
