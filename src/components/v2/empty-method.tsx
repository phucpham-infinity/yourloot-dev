import EmptyMethodIcon from '@/assets/images/empty-method.svg'
import { useTranslation } from 'react-i18next'

export const EmptyMethod = () => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col items-center gap-[10px]">
      <img src={EmptyMethodIcon} alt="empty-method" />
      <div className="text-white text-app-medium-14 leading-[14px]">
        {t('withdraw.emptyMethod.title', {
          defaultValue: 'No withdrawal methods available for this currency'
        })}
      </div>
      <div className="text-app-medium-12 text-[#9E90CF]">
        {t('withdraw.emptyMethod.description', {
          defaultValue: 'Switch to another currency to continue'
        })}
      </div>
    </div>
  )
}
