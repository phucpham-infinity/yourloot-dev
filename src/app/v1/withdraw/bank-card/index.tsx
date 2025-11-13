import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { isMobile } from 'react-device-detect'
import { useNavigate, useParams } from 'react-router-dom'

import { BANK_LIST } from '@/constants'
import CustomButton from '@/components/common/custom-button'
import { FormBuilder } from '@/components/common/form-builder'
import BankCardLayout from './layout'
import { getCurrencySymbol } from '@/helper'
import { useWithdrawStore } from '@/store/slices/withdraw'

export default function IndexWithdraw() {
  const [bankId, setBankId] = useState('')
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { walletName } = useParams()
  const { setBankAmount, setBankCode, setBankNumber } = useWithdrawStore()

  const formAmountRef = useRef<any>(null)
  const formBankRef = useRef<any>(null)

  const fiatSign = getCurrencySymbol(walletName ?? '')
  const handleAddAmount = (value: number) => {
    const currentAmount = formAmountRef?.current?.getFieldValue('amount')
    formAmountRef?.current?.setFieldValue(
      'amount',
      Number(currentAmount) + value
    )
  }

  return (
    <BankCardLayout
      description={t('withdraw.bankCard.selectBankDescription')}
      title={t('withdraw.bankCard.enterInfo')}
    >
      <div
        className={
          'flex w-full items-start lg:items-end gap-[5px] lg:gap-[10px] flex-col lg:flex-row lg:h-full'
        }
      >
        <FormBuilder
          className={'w-full flex-1'}
          ref={formAmountRef}
          fields={[
            {
              type: 'text',
              name: 'amount',
              inputType: 'currency',
              label: t('withdraw.bankCard.amount'),
              placeholder: t('withdraw.bankCard.amountPlaceholder'),
              description: t('withdraw.bankCard.amountDescription', {
                currency: fiatSign
              })
            }
          ]}
          onSubmit={(value) => {
            setBankAmount(value.amount)
          }}
          defaultValues={{ amount: 0 }}
        />
        <div
          className={clsx(
            'flex-1 gap-[10px] flex items-center justify-between w-full',
            {
              'justify-start mt-6': isMobile
            }
          )}
        >
          <CustomButton
            className={'w-fit'}
            label={`+${fiatSign}10`}
            onClick={() => handleAddAmount(10)}
          />
          <CustomButton
            className={'w-fit'}
            label={`+${fiatSign}100`}
            onClick={() => handleAddAmount(100)}
          />
          <CustomButton
            className={'w-fit'}
            label={`+${fiatSign}1000`}
            onClick={() => handleAddAmount(1000)}
          />
        </div>
      </div>
      <div className={'flex w-full items-end pt-0 lg:pt-[20px] '}>
        <FormBuilder
          className={'w-full flex-1'}
          ref={formBankRef}
          fields={[
            {
              type: 'text',
              name: 'cardNumber',
              label: t('withdraw.bankCard.bankNumber'),
              placeholder: t('withdraw.bankCard.bankNumberPlaceholder')
            },
            {
              type: 'select',
              name: 'bankId',
              label: t('withdraw.bankCard.yourBank'),
              selectedRender: (origin, options) => {
                const item = options?.find((item) => item.value === origin)
                return item?.label
              },
              options: BANK_LIST
            }
          ]}
          onSubmit={(value) => {
            setBankNumber(value.cardNumber)
            setBankCode(value.bankId)
            setBankId(value.bankId)
          }}
          defaultValues={{ amount: 0 }}
        />
      </div>
      <div className={'mt-[10px] lg:mt-[60px] flex w-full justify-end'}>
        <CustomButton
          onClick={() => {
            formAmountRef.current.submit()
            formBankRef.current.submit()
            navigate(`/withdraw/${walletName}/bank-card/${bankId}/process`)
          }}
          className={'w-full lg:w-[200px]'}
          label={t('withdraw.bankCard.withdraw')}
        />
      </div>
    </BankCardLayout>
  )
}
