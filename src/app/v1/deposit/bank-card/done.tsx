import BankCardLogo from '@/assets/images/deposit/bank-card-logo.svg'
import CustomButton from '@/components/common/custom-button'
import { css } from '@/lib/utils.ts'
import { walletsController } from '@/services/controller/wallets'
import { useProfileStore } from '@/store'
import { useDepositStore } from '@/store/slices/deposit'
import formatAmount from '@/utils/format-amount'
import { format } from 'date-fns'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import BankCardLayout from './layout'
const BankCardDone = () => {
  const { walletName, bankName } = useParams()

  const navigate = useNavigate()
  const { t } = useTranslation()
  const isSuccess = useDepositStore((state) => state.isSuccess)
  const clearDeposit = useDepositStore((state) => state.clearDeposit)
  const setIsProcessing = useDepositStore((state) => state.setIsProcessing)
  const { profile } = useProfileStore()
  const { data: wallet, refetch } =
    walletsController().useGetUserWalletByCurrency({
      userId: profile?.userId!,
      currency: walletName!
    })

  useEffect(() => {
    refetch()
    setTimeout(() => {
      setIsProcessing(false)
    }, 1000)
    return () => {
      clearDeposit()
    }
  }, [])

  return (
    <BankCardLayout
      title={t('deposit.inProgress')}
      description={t('deposit.inProgressDescription')}
    >
      <div css={style} className="flex w-full items-center gap-[10px]">
        <div className="info-item w-full p-5 rounded-[15px] border  inline-flex justify-between items-center overflow-hidden">
          <div className="inline-flex flex-col items-start justify-start gap-5">
            {isSuccess ? (
              <div className=" flex flex-col justify-start items-start gap-2.5">
                <div className="justify-center text-xl font-black text-white">
                  {formatAmount(wallet?.amount)}
                </div>
                <div className="justify-center text-[#c5c0d8] text-xs font-medium">
                  {format(new Date(), 'dd.MM.yy / HH:mm')}
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center gap-2.5">
                <div className="text-xl font-black text-white">
                  {t('deposit.paymentFail')}
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
        {isSuccess ? (
          <CustomButton
            onClick={() => {
              navigate(
                `/deposit/${walletName}/bank-card/${bankName}/detail${location.search}`
              )
            }}
            className={'w-[150px] lg:w-[200px]'}
            label={t('withdraw.bankCard.done.details')}
            variant={'muted'}
          />
        ) : (
          <CustomButton
            onClick={() => {
              navigate(`/deposit/${walletName}/bank-card${location.search}`)
            }}
            className={'w-[150px] lg:w-[200px]'}
            label={'Try again'}
            variant={'muted'}
          />
        )}
        <CustomButton
          onClick={() => {
            navigate(`/deposit/${walletName}/bank-card${location.search}`)
          }}
          className={'w-[150px] lg:w-[200px]'}
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

export default BankCardDone
