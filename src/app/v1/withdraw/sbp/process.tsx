import Loader from '@/components/common/loader'
import SBPLayout from './layout'
import { useTranslation } from 'react-i18next'

const SBPProcess = () => {
  const { t } = useTranslation()
 
  return (
    <SBPLayout>
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
    </SBPLayout>
  )
}

export default SBPProcess
