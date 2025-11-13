import characterBg from '@/assets/icons/home/bg/character_the_bird.svg'
import CrowIcon from '@/assets/icons/home/crow'
import SettingIcon from '@/assets/icons/home/setting'
import { cn, css } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'

import CustomButton from '@/components/common/custom-button'
import { useProfileStore } from '@/store'
import { useTranslation } from 'react-i18next'

interface Props {
  className?: string
}

export default function Profile({ className }: Props) {
  const navigate = useNavigate()
  const { profile } = useProfileStore()
  const { t } = useTranslation()

  return (
    <div
      css={styles}
      className={cn(
        'w-full h-full p-5 bg-[#362c5a] rounded-[20px] border-app-default flex gap-5 flex-col relative justify-between overflow-hidden',
        className
      )}
    >
      <div className="flex w-full justify-between items-center h-24">
        <div
          css={styleCrow}
          className="w-[96px] h-[96px] rounded-full align-center flex justify-center items-center"
        >
          <CrowIcon className="" />
        </div>
        <SettingIcon
          className="cursor-pointer hover:opacity-70 translate-x-5 -translate-y-5 z-10"
          onClick={() => navigate('/profile')}
        />
      </div>

      <div className="flex-col justify-start items-start gap-5 inline-flex">
        <div className="flex flex-col gap-2.5">
          <div className="text-white text-xl font-black leading-5">
            {profile?.email}
          </div>
          <div className="text-[#c5c0d7] text-xs leading-3 font-medium">
            {t('profile.checkUpdateProfile')}
          </div>
        </div>

        <CustomButton
          onClick={() => navigate('/profile')}
          label={t('profile.gotoProfile')}
          className="w-[200px] text-[#d8ceff] text-xs font-medium"
        />

        <img className="absolute right-0 bottom-0 z-0" src={characterBg} />
      </div>
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

const styleCrow = css`
  border-radius: 100px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.1) 100%
  );
  box-shadow:
    6px 6px 12px 0px rgba(22, 20, 24, 0.5),
    -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
`
