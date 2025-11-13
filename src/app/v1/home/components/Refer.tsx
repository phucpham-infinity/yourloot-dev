import CustomButton from '@/components/common/custom-button'
import { cn, css } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

import brid2 from '@/assets/icons/home/bg/character_the_bird2.svg'
import { useNavigate } from 'react-router-dom'

interface ReferProps {
  className?: string
}

export default function Refer({ className }: ReferProps) {
  const router = useNavigate()
  const { t } = useTranslation()
  return (
    <div
      css={styles}
      className={cn(
        'w-full h-full p-5 rounded-[20px] border-app-default flex-col gap-5 flex justify-end relative overflow-hidden',
        className
      )}
    >
      <img src={brid2} className="absolute right-0 top-0" />
      <div className=" flex-col justify-start items-start gap-5 inline-flex">
        <div className=" flex-col justify-start items-start gap-2.5 inline-flex">
          <div className="text-white text-xl font-black leading-5">
            {t('promo.refer.title')}
          </div>
          {/* <div className="text-[#c5c0d7] text-xs font-medium leading-3">
            {t('promo.refer.description')} */}
          {/* </div> */}
        </div>
      </div>

      <CustomButton
        // onClick={() => router('/bonus')}
        onClick={() => router('/promo-code')}
        label={t('promo.refer.button')}
        className="bg-[#644ec7] w-[200px] text-[#d8ceff] text-xs font-medium"
      />
    </div>
  )
}

const styles = css`
  background: radial-gradient(
    237.29% 116.82% at 60.95% -22.92%,
    #362c5a 0%,
    #181526 100%
  );
`
