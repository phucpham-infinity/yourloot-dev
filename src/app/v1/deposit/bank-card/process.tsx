import Loader from '@/components/common/loader'
import { useTranslation } from 'react-i18next'
import BankCardLayout from './layout'

const BankCardProcess = () => {
  const { t } = useTranslation()

  return (
    <BankCardLayout showLeftContent>
      <div>
        <div className={'flex w-full items-start h-[220px]'}>
          <Loader />
        </div>
        <div className="text-white text-xl font-black">
          {' '}
          {t('withdraw.bankCard.pleaseWait')}
        </div>
        <div className="w-[270] text-[#c5c0d8] text-xs font-medium">
          {t('withdraw.bankCard.processDescription')}
        </div>
      </div>
    </BankCardLayout>
  )
}

export default BankCardProcess
