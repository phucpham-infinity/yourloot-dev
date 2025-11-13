import NoFundsIcon from '@/assets/images/no-funds.svg'
import { useTranslation } from 'react-i18next'

export const NoFunds = () => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <img src={NoFundsIcon} alt="NoFunds" />
      <div className="text-app-bold-14 leading-[14px]">
        {t(
          'withdraw.emptyMethod.title',
          'No withdrawal methods available for this currency'
        )}
      </div>
      <div className="text-app-medium-14 leading-[14px] text-app-brand-medium">
        {t(
          'withdraw.emptyMethod.description',
          'Switch to another currency to continue'
        )}
      </div>
    </div>
  )
}
