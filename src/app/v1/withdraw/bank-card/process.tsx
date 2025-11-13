import Loader from '@/components/common/loader'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import BankCardLayout from './layout'
import { useNavigate, useParams } from 'react-router-dom'

const BankCardWithdrawProcess = () => {
  const navigate = useNavigate()
  const { bankId, walletName } = useParams()
  const { t } = useTranslation()
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate(`/withdraw/${walletName}/bank-card/${bankId}/done`)
    }, 3000)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <BankCardLayout hiddenTitle>
      <div>
        <div className={'flex w-full items-start h-[220px]'}>
          <Loader />
        </div>
        <div className="text-white text-xl font-black">
          {t('withdraw.bankCard.pleaseWait')}
        </div>
        <div className="w-[270] text-[#c5c0d8] text-xs font-medium">
          {t('withdraw.bankCard.processDescription')}
        </div>
      </div>
    </BankCardLayout>
  )
}

export default BankCardWithdrawProcess
