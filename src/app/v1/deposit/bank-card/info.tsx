import { useTranslation } from 'react-i18next'

import CustomButton from '@/components/common/custom-button'
import { FormBuilder } from '@/components/common/form-builder'
import { useDepositStore } from '@/store/slices/deposit'
import formatAmount from '@/utils/format-amount'
import { useNavigate, useParams } from 'react-router-dom'
import BankCardLayout from './layout'
const BankCardInfo = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { walletName, bankName } = useParams()

  const order = useDepositStore((state) => state.orderBankCard)

  return (
    <BankCardLayout
      title={t('deposit.makeDeposit')}
      description={t('deposit.makeTransfer')}
      showLeftContent
    >
      <div className={'flex w-full gap-[10px]'}>
        <FormBuilder
          className={'w-full flex-1'}
          fields={[
            {
              type: 'text',
              name: 'amount',
              label: t('deposit.amount'),
              placeholder: '$ 1,923,234,99',
              inputType: 'currency',
              showCopyBtn: true,
              disabled: true
            },
            {
              type: 'text',
              name: 'cardNumber',
              label: t('deposit.cardNumber'),
              placeholder: '2200 4324 1231 4321',
              showCopyBtn: true,
              disabled: true
            },
            {
              type: 'text',
              name: 'bankName',
              label: t('deposit.bankName'),
              placeholder: 'BANK NAME',
              showCopyBtn: true,
              disabled: true
            },
            {
              type: 'text',
              name: 'information',
              label: t('deposit.information'),
              placeholder: t('deposit.details'),
              showCopyBtn: true,
              disabled: true
            }
          ]}
          onSubmit={(value) => {
            console.log(value)
          }}
          defaultValues={{
            amount: formatAmount(order?.amount),
            cardNumber: order?.card ?? order?.externalID,
            bankName: order?.bankName,
            information: order?.cardHolderName
          }}
        />
      </div>
      <div className={'mt-[30px] flex w-full justify-end'}>
        <CustomButton
          onClick={() => {
            navigate(
              `/deposit/${walletName}/bank-card/${bankName}/process${location.search}`
            )
          }}
          className={'w-full lg:w-[200px]'}
          label={t('deposit.paymentMade')}
        />
      </div>
    </BankCardLayout>
  )
}

export default BankCardInfo
