import Loader from '@/components/common/loader'
import { useTranslation } from 'react-i18next'
import CryptocurrencyLayout from './layout'

const CryptocurrencyProcess = () => {
  const { t } = useTranslation()

  return (
    <CryptocurrencyLayout showLeftContent>
      <div>
        <div className={'flex w-full items-start h-[120px]'}>
          <Loader />
        </div>
        <div className="text-white text-xl font-black">Please wait</div>
        <div className="w-[250px] text-[#c5c0d8] text-xs font-medium">
          {t('withdraw.bankCard.processDescription')}
        </div>
      </div>
    </CryptocurrencyLayout>
  )
}

export default CryptocurrencyProcess
