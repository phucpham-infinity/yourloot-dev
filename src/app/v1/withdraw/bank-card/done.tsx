import { css } from '@/lib/utils.ts'

import BankCardLayout from './layout'
import BankCardLogo from '@/assets/images/deposit/bank-card-logo.svg'
import CustomButton from '@/components/common/custom-button'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
const BankCardWithdrawDone = () => {
  const navigate = useNavigate()
  const { bankId, walletName } = useParams()
  const { t } = useTranslation()
  return (
    <BankCardLayout
      title={t('withdraw.bankCard.done.title')}
      description={t('withdraw.bankCard.done.description')}
    >
      <div css={style} className="flex w-full items-center gap-[10px]">
        <div className="info-item w-full p-5 rounded-[15px] border  inline-flex justify-between items-center overflow-hidden">
          <div className="inline-flex flex-col justify-start items-start gap-5">
            <div className=" flex flex-col justify-start items-start gap-2.5">
              <div className="justify-center text-white text-xl font-black">
                $ 1,923,234,99
              </div>
              <div className="justify-center text-[#c5c0d8] text-xs font-medium">
                12.02.25 / 12:43
              </div>
            </div>
          </div>
          <div className="w-[92px] h-10  overflow-hidden">
            <img className="w-[92px]" src={BankCardLogo} alt={'Bank Card'} />
          </div>
        </div>
      </div>
      <div className={'mt-[60px] gap-[20px] flex w-full justify-start'}>
        <CustomButton
          onClick={() => {
            navigate(`/withdraw/${walletName}/bank-card/${bankId}/detail`)
          }}
          className={'lg:w-[200px] w-[150px]'}
          label={t('withdraw.bankCard.done.details')}
          variant={'muted'}
        />
        <CustomButton
          onClick={() => {
            navigate(`/withdraw/${walletName}/bank-card`)
          }}
          className={'lg:w-[200px] w-[150px]'}
          label={t('withdraw.bankCard.done.backHome')}
        />
      </div>
    </BankCardLayout>
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

export default BankCardWithdrawDone
