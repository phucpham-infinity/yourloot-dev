import CustomButton from '@/components/common/custom-button'
import { FormBuilder } from '@/components/common/form-builder'
import { getCurrencySymbol } from '@/helper'
import { getFingerprint } from '@/lib/fingerprint'
import { orderController } from '@/services/controller/orders'
import { useDepositStore, useProfileStore } from '@/store'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import BankCardLayout from './layout'

const BankCardAmount = () => {
  const { walletName, bankName } = useParams()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const fiatSign = getCurrencySymbol(walletName ?? '')

  const amount = useDepositStore((state) => state.amountBankCard)
  const setAmount = useDepositStore((state) => state.setAmountBankCard)
  const setTimeExpires = useDepositStore((state) => state.setTimeExpires)
  const setOrder = useDepositStore((state) => state.setOrderBankCard)
  const setIsProcessing = useDepositStore((state) => state.setIsProcessing)
  const setMode = useDepositStore((state) => state.setMode)
  const isProcessing = useDepositStore((state) => state.isProcessing)

  // const paymentMethod = useDepositStore((state) => state.paymentMethod)
  const [fingerprint, setFingerprint] = useState<string | null>(null)

  const [values, setValues] = useState<number[]>([])

  const formEl = useRef<any>(null)

  useEffect(() => {
    // Get fingerprint on component mount
    getFingerprint().then(setFingerprint)
  }, [])

  const handleAddAmount = (value: number) => {
    formEl.current?.clearError('amount')
    const currentAmount = formEl?.current?.getFieldValue('amount')
    formEl?.current?.setFieldValue('amount', Number(currentAmount) + value)
  }
  setTimeExpires(900)

  const {
    mutate: createOrder,
    isPending: isCreatingOrder,
    isSuccess: isOrderCreated,
    data: orderData
    // isError: isOrderError
  } = orderController().useCreateCardOrder()
  const { profile, ip } = useProfileStore()

  useEffect(() => {
    if (isOrderCreated) {
      setTimeExpires(900)
      setIsProcessing(true)
      setMode('bank-card')
      navigate(
        `/deposit/${walletName}/bank-card/${bankName}/info${location.search}`
      )
      if (orderData) setOrder({ ...orderData, walletName, bankName })
    }
  }, [isOrderCreated])

  // useEffect(() => {
  //   if (isOrderError) {
  //     setTimeExpires(5)
  //     setMode('bank-card')
  //     setIsProcessing(true)
  //     setOrder({
  //       success: false,
  //       externalID: '',
  //       phoneNumber: '',
  //       amount: 0,
  //       orderId: '3e121f3c-4604-437d-aed0-c7697711dc89',
  //       status: 'COMPLETED_WITH_FAILURE',
  //       successUrl: 'https://google.com',
  //       bankName: bankName ?? '',
  //       walletName: walletName ?? ''
  //     })
  //     navigate(
  //       `/deposit/${walletName}/bank-card/${bankName}/process${location.search}`
  //     )
  //   }
  // }, [isOrderError])

  useEffect(() => {
    if (walletName === 'RUB') {
      setValues([100, 1500, 3000, 1000, 100000])
    } else {
      setValues([10, 100, 1000, 10, 100000])
    }
  }, [walletName])

  return (
    <BankCardLayout
      description={t('deposit.amountDescription')}
      title={t('deposit.chooseAmount')}
      showLeftContent
      hiddenTimer={!isProcessing}
    >
      <div
        className={
          'flex w-full items-start lg:items-end gap-[5px] lg:gap-[10px] flex-col lg:flex-row lg:h-full'
        }
      >
        <FormBuilder
          className={'w-full flex-1'}
          ref={formEl}
          fields={[
            {
              type: 'text',
              name: 'amount',
              label: t('deposit.amount'),
              inputType: 'currency',
              placeholder: `${fiatSign} 1,923,234,99`,
              description:
                // t('deposit.from') +
                // ` ${fiatSign}` +
                // ` ${values[3]} ` +
                // t('deposit.to') +
                // ` ${fiatSign}` +
                // ` ${values[4]} ` +
                t('deposit.description'),
              disabled: isProcessing,
              validators: {
                onSubmit: ({ value }: any) => {
                  const amount = Number(value)
                  if (amount < 500 || amount > 350000)
                    return (
                      <span className="text-red-500">
                        {t('deposit.description')},
                      </span>
                    )
                  return null
                }
              }
            }
          ]}
          onSubmit={(value) => {
            setAmount(value.amount)
            createOrder({
              userId: profile?.userId!,
              currency: walletName ?? '',
              userIp: ip ?? '',
              amount: Number(value.amount),
              bank: bankName ?? '',
              extra: {
                userAgent: navigator.userAgent,
                fingerprint: fingerprint,
                registeredAt: new Date().getTime()
              }
            })
          }}
          defaultValues={{ amount: amount || '' }}
        />
        <div
          className={clsx(
            'flex-1 gap-[10px] w-full flex items-center justify-between',
            {
              'justify-start mt-6': isMobile
            }
          )}
        >
          <CustomButton
            onClick={() => handleAddAmount(values[0])}
            className={'w-fit'}
            label={`+ ${fiatSign} ${values[0]}`}
            disabled={isProcessing}
          />
          <CustomButton
            onClick={() => handleAddAmount(values[1])}
            className={'w-fit'}
            label={`+ ${fiatSign} ${values[1]}`}
            disabled={isProcessing}
          />
          <CustomButton
            onClick={() => handleAddAmount(values[2])}
            className={'w-fit'}
            label={`+ ${fiatSign} ${values[2]}`}
            disabled={isProcessing}
          />
        </div>
      </div>
      <div className={'mt-[20px] lg:mt-[40px] flex w-full justify-end'}>
        <CustomButton
          disabled={isCreatingOrder}
          isLoading={isCreatingOrder}
          onClick={() => {
            formEl?.current?.submit()
          }}
          className={'w-full lg:w-[200px]'}
          label={t('deposit.next')}
        />
      </div>
    </BankCardLayout>
  )
}

export default BankCardAmount
