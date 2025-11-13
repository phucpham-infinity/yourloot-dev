import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import SettingIcon from '@/assets/icons/setting'
import { cn } from '@/lib/utils'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { LanguageButton } from '@/components/common/language-button'
import { useProfileStore } from '@/store/slices/profile'
import { lazy } from 'react'
const CustomButton = lazy(() => import('@/components/common/custom-button'))
// const IconBtn = lazy(() => import('@/components/common/icon-button'))
// import ProfileIcon from '/images/profile.png'

interface MyProfileProps {
  className?: string
}

export default function MyProfile({ className }: MyProfileProps) {
  const router = useNavigate()
  const { setIsEdit } = useProfileStore()
  const { t } = useTranslation()

  return (
    <div
      className={cn(
        'w-full justify-between gap-5 sm:gap-0 flex flex-col sm:flex-row',
        className
      )}
    >
      <div className="gap-5 flex items-center">
        {/* <ProfileIcon className="w-10 h-10" /> */}
        <img src="/images/profile.png" alt="profile" className="w-9 h-10" />
        <div className="text-white text-2xl font-black">
          {t('profile.title')}
        </div>
      </div>
      <div className={cn('gap-2.5 flex', isMobile && 'gap-1 justify-between')}>
        <CustomButton
          onClick={() => router('/')}
          prefixIcon={<ArrowLeftIcon />}
          label={t('profile.back')}
          variant="muted"
          className="w-fit h-[40px] flex justify-center items-center gap-2.5 !py-3.5 !px-5"
        />

        <CustomButton
          onClick={() => router('/store')}
          label={t('profile.store')}
          className="w-fit h-[40px] text-xs font-medium !py-3.5 !px-5"
        />

        <CustomButton
          onClick={() => setIsEdit(true)}
          label={t('profile.setting')}
          variant="muted"
          prefixIcon={<SettingIcon className="w-5 h-5" />}
          className="h-[40px] w-fit max-w-[150px] text-xs gap-2.5 font-medium flex justify-between items-center whitespace-nowrap !py-3.5 !px-5"
        />
        <LanguageButton />
      </div>
    </div>
  )
}
