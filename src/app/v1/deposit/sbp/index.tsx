import CustomButton from '@/components/common/custom-button'
import { FormBuilder } from '@/components/common/form-builder'
import { spbBanks } from '@/constants'
import { getCurrencySymbol } from '@/helper'
import { getFingerprint } from '@/lib/fingerprint'
import { orderController } from '@/services/controller/orders'
import { useDepositStore } from '@/store/slices/deposit'
import { useProfileStore } from '@/store/slices/profile'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import SBPLayout from './layout'

export default function Index() {
  const bankSbp = useDepositStore((state) => state.bankSbp)
  const navigate = useNavigate()
  const { walletName } = useParams()

  const [bankId, setBankId] = useState<string>(bankSbp)
  const [currentAmount, setCurrentAmount] = useState(0)
  const [fingerprint, setFingerprint] = useState<string | null>(null)

  const fiatSign = getCurrencySymbol(walletName ?? '')

  const isProcessing = useDepositStore((state) => state.isProcessing)
  const amount = useDepositStore((state) => state.amountSbp)
  const setTimeExpires = useDepositStore((state) => state.setTimeExpires)
  const setOrderSbp = useDepositStore((state) => state.setOrderSbp)

  const profile = useProfileStore((s) => s.profile)
  const ip = useProfileStore((s) => s.ip)

  const setMode = useDepositStore((state) => state.setMode)
  const setIsProcessing = useDepositStore((state) => state.setIsProcessing)
  const setBankSbp = useDepositStore((state) => state.setBankSbp)
  const formAmountRef = useRef<any>(null)
  const formBankRef = useRef<any>(null)
  const { t } = useTranslation()
  const [values, setValues] = useState<number[]>([])

  const {
    mutate: createOrder,
    isPending: isCreatingOrder,
    isSuccess: isOrderCreated,
    data: orderData
    // isError: isOrderError
  } = orderController().useCreateSbpOrder()

  useEffect(() => {
    if (currentAmount && bankId) {
      createOrder({
        userId: profile?.userId!,
        userIp: ip ?? '',
        currency: walletName ?? '',
        amount: Number(currentAmount),
        bank: bankId,
        bankName: bankId,
        extra: {
          userAgent: navigator.userAgent,
          fingerprint: fingerprint,
          registeredAt: new Date().getTime()
        }
      })
    }
  }, [currentAmount, bankId])

  // useEffect(() => {
  //   if (isOrderError) {
  //     setTimeExpires(20)
  //     setMode('sbp')
  //     setIsProcessing(true)
  //     setOrderSbp({
  //       success: false,
  //       externalID: '',
  //       phoneNumber: '',
  //       amount: 0,
  //       bankName: bankId,
  //       orderId: 'fe8c7150-5861-4541-9a16-2aebd50accd1',
  //       successUrl: 'https://google.com',
  //       status: 'COMPLETED_WITH_FAILURE'
  //     })
  //   }
  // }, [isOrderError])

  useEffect(() => {
    // Get fingerprint on component mount
    getFingerprint().then(setFingerprint)
  }, [])

  useEffect(() => {
    if (isOrderCreated) {
      setTimeExpires(900)
      setMode('sbp')
      setIsProcessing(true)
      setBankSbp(bankId)
      navigate(`/deposit/${walletName}/sbp/${bankId}/info${location.search}`)
    }
  }, [isOrderCreated])

  useEffect(() => {
    if (orderData) {
      setOrderSbp(orderData)
    }
  }, [orderData])

  const handleAddAmount = (value: number) => {
    formAmountRef.current?.clearError('amount')
    const currentAmount = formAmountRef?.current?.getFieldValue('amount')
    formAmountRef?.current?.setFieldValue(
      'amount',
      Number(currentAmount) + value
    )
  }

  useEffect(() => {
    if (walletName === 'RUB') {
      setValues([100, 1500, 3000, 1000, 100000])
    } else {
      setValues([10, 100, 1000, 10, 100000])
    }
  }, [walletName])

  return (
    <SBPLayout
      title={t('deposit.addDetails')}
      description={t('deposit.chooseBank')}
      showLeftContent
      hiddenTimer={!isProcessing}
    >
      <div
        className={
          'flex flex-col lg:flex-row w-full items-end gap-[5px] lg:gap-[10px] lg:h-full'
        }
      >
        <FormBuilder
          defaultValues={{ amount: amount || '' }}
          className={'w-full flex-1'}
          ref={formAmountRef}
          fields={[
            {
              type: 'text',
              name: 'amount',
              label: 'Amount',
              inputType: 'currency',
              placeholder: `${fiatSign} 1,923,234,99`,
              description: t('deposit.description'),
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
            setCurrentAmount(value.amount)
          }}
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
            className={'w-fit lg:w-fit'}
            label={`+ ${fiatSign} ${values[0]}`}
            onClick={() => handleAddAmount(values[0])}
            disabled={isProcessing}
          />
          <CustomButton
            className={'w-fit lg:w-fit'}
            label={`+ ${fiatSign} ${values[1]}`}
            onClick={() => handleAddAmount(values[1])}
            disabled={isProcessing}
          />
          <CustomButton
            className={'w-fit lg:w-[90px]'}
            label={`+ ${fiatSign} ${values[2]}`}
            onClick={() => handleAddAmount(values[2])}
            disabled={isProcessing}
          />
        </div>
      </div>
      <div className={'flex w-full items-end pt-0 lg:pt-[20px]'}>
        <FormBuilder
          className={'w-full flex-1'}
          ref={formBankRef}
          fields={[
            {
              type: 'select',
              name: 'bankId',
              label: t('deposit.yourBank'),
              placeholder: t('deposit.bankName'),
              options: spbBanks,
              disabled: isProcessing,
              selectedRender: (origin, options) => {
                const item = options?.find((item) => item.value === origin)
                return item?.label
              },
              validators: {
                onSubmit: ({ value }: any) => {
                  if (!value)
                    return (
                      <span className="text-red-500">Please select a bank</span>
                    )
                  return null
                }
              }
            }
          ]}
          onSubmit={(value) => {
            setBankId(value.bankId)
          }}
          defaultValues={{ bankId: bankSbp }}
        />
      </div>
      <div className={'mt-[20px] lg:mt-[40px] flex w-full justify-end'}>
        <CustomButton
          isLoading={isCreatingOrder}
          disabled={isCreatingOrder}
          onClick={() => {
            formAmountRef.current?.submit()
            formBankRef.current?.submit()
          }}
          className={'w-full lg:w-[200px]'}
          label={t('deposit.next')}
        />
      </div>
    </SBPLayout>
  )
}
