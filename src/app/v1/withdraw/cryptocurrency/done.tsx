import { css } from '@/lib/utils.ts'
import formatAmount from '@/utils/format-amount'

import BankCardLogo from '@/assets/images/deposit/bank-card-logo.svg'
import CustomButton from '@/components/common/custom-button'
import { walletsController } from '@/services/controller/wallets'
import { useProfileStore, useWithdrawStore } from '@/store'
import { format } from 'date-fns'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import CryptocurrencyLayout from './layout'

const CryptocurrencyDone = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { walletName } = useParams()
  const { clearWithdraw, isSuccess } = useWithdrawStore()
  const { profile } = useProfileStore()
  const { data: wallet } = walletsController().useGetUserWalletByCurrency({
    userId: profile?.userId!,
    currency: 'RUB',
    refetchInterval: 0,
    enabled: isSuccess
  })

  useEffect(() => {
    setTimeout(() => {
      // setInProgress(false)
      clearWithdraw()
    }, 100)
  }, [])

  return (
    <CryptocurrencyLayout
      title={t('withdraw.cryptocurrency.doneTitle')}
      description={t('withdraw.cryptocurrency.doneDescription')}
    >
      <div css={style} className="flex w-full items-center gap-[10px]">
        <div className="info-item w-full p-5 rounded-[15px] border  inline-flex justify-between items-center overflow-hidden">
          <div className="inline-flex flex-col justify-start items-start gap-5">
            {isSuccess ? (
              <div className=" flex flex-col justify-start items-start gap-2.5">
                <div className="justify-center text-white text-xl font-black">
                  {formatAmount(wallet?.amount ?? 0)}
                </div>
                <div className="justify-center text-[#c5c0d8] text-xs font-medium">
                  {format(new Date(), 'dd.MM.yy / HH:mm')}
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center gap-2.5">
                <div className="text-white text-xl font-black">
                  Payment failed
                </div>
              </div>
            )}
          </div>
          <div className="w-[92px] h-10  overflow-hidden">
            <img className="w-[92px]" src={BankCardLogo} alt={'Bank Card'} />
          </div>
        </div>
      </div>
      <div className={'mt-[60px] gap-[20px] flex w-full justify-start'}>
        <CustomButton
          onClick={() => {
            // navigate(`/withdraw/${walletName}/cryptocurrency/detail`)
          }}
          className={'w-[200px]'}
          label={t('withdraw.cryptocurrency.details')}
          variant={'muted'}
        />
        <CustomButton
          onClick={() => {
            navigate(`/withdraw/${walletName}/cryptocurrency`)
          }}
          className={'w-[200px]'}
          label={t('withdraw.cryptocurrency.backHome')}
        />
      </div>
    </CryptocurrencyLayout>
  )
}

const style = css`
  .info-item {
    border: 1px solid #3e3454;
    box-shadow:
      6px 6px 12px 0 rgba(22, 20, 24, 0.5),
      -6px -6px 24px 0 rgba(148, 95, 255, 0.15);
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.1) 100%
    );
  }
`

export default CryptocurrencyDone
