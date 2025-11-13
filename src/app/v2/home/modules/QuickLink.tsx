import ManageFundIcon from '@/assets/icons/v2/manage-fund'
import WalletIcon from '@/assets/icons/v2/Medal.png'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import TitleV2 from '../../../../components/v2/title-v2'
import { useAuthStore } from '@/store'

const QuickLink = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const { t } = useTranslation()
  return (
    <div className="flex flex-col w-full gap-2">
      <TitleV2
        title={t('home.quickLinks', 'Quick Links')}
        hiddenIcon
        onClick={() => {}}
      />
      <div className="flex items-center justify-between w-full gap-2">
        <div
          className={cn(
            'w-full p-3 h-[66px] bg-[#191524] rounded-[10px] flex flex-col justify-between items-start gap-3'
          )}
          onClick={() =>
            isAuthenticated
              ? navigate('/manage-funds')
              : navigate('/auth/login')
          }
        >
          <ManageFundIcon className="w-[20px] h-[20px]" />
          <div className="text-[14px] leading-[14px] text-[#EAE3FF]">
            {t('home.manageFunds', 'Manage Funds')}
          </div>
        </div>
        <div
          className={cn(
            'w-full p-3 h-[66px] bg-[#191524] rounded-[10px] justify-between items-start gap-3 flex flex-col g'
          )}
          onClick={() =>
            isAuthenticated
              ? navigate('/profile?isAutoScroll=1')
              : navigate('/auth/login')
          }
        >
          <img src={WalletIcon} alt="icon" className="w-[22px] h-[22px]" />
          <div className="text-[14px] leading-[14px] text-[#EAE3FF] translate-y-[-1px]">
            {t('home.achievements', 'Achievements')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickLink
