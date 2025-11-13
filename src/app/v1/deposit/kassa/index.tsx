import CustomButton from '@/components/common/custom-button'
import { FormBuilder } from '@/components/common/form-builder'
import { getCurrencySymbol } from '@/helper'
import { orderController } from '@/services/controller/orders'
import { useDepositStore } from '@/store/slices/deposit'
import { useProfileStore } from '@/store/slices/profile'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import KassaLayout from './layout'

export default function Index() {
  const navigate = useNavigate()
  const { walletName } = useParams()

  const [currentAmount, setCurrentAmount] = useState(0)

  const fiatSign = getCurrencySymbol(walletName ?? '')

  const isProcessing = useDepositStore((state) => state.isProcessing)
  const setTimeExpires = useDepositStore((state) => state.setTimeExpires)
  const setOrder = useDepositStore((state) => state.setOrderKassa)

  const profile = useProfileStore((s) => s.profile)
  const ip = useProfileStore((s) => s.ip)

  const setAmount = useDepositStore((state) => state.setAmountSbp)
  const setMode = useDepositStore((state) => state.setMode)
  const setIsProcessing = useDepositStore((state) => state.setIsProcessing)
  const formAmountRef = useRef<any>(null)
  const { t } = useTranslation()

  const {
    mutate: createOrder,
    isPending: isCreatingOrder,
    // isSuccess: isOrderCreated,
    data: orderData,
    error: orderError
  } = orderController().useCreateOrderBank()

  useEffect(() => {
    if (currentAmount) {
      createOrder({
        userId: profile?.userId!,
        currency: walletName ?? '',
        paymentMethod: 'kassa',
        paymentSystem: 'kassa',
        userIp: ip ?? '',
        card: '',
        owner: profile?.firstName ?? '',
        amount: Number(currentAmount),
        bank: '',
        orderType: 'DEPOSIT',
        extra: {
          userAgent: navigator.userAgent,
          fingerprint: 'fingerprint',
          registeredAt: new Date().getTime()
        }
      })
    }
  }, [currentAmount])

  // useEffect(() => {
  //   if (isOrderCreated) {
  //     setTimeExpires(900)
  //     setMode('kassa')
  //     setAmount(currentAmount)
  //     setIsProcessing(true)
  //     navigate(`/deposit/${walletName}/kassa/process${location.search}`)
  //   }
  // }, [isOrderCreated])

  useEffect(() => {
    if (orderError) {
      setTimeExpires(900)
      setMode('kassa')
      setAmount(currentAmount)
      setIsProcessing(true)
      navigate(`/deposit/${walletName}/kassa/process${location.search}`)
    }
  }, [orderError])

  useEffect(() => {
    if (orderData) {
      setOrder(orderData)
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

  return (
    <KassaLayout
      title={t('deposit.addDetails')}
      description={'Choose the amount'}
      showLeftContent
      hiddenTimer={!isProcessing}
    >
      <div
        className={
          'flex flex-col lg:flex-row w-full items-end gap-[5px] lg:gap-[10px] lg:h-full'
        }
      >
        <FormBuilder
          className={'w-full flex-1'}
          ref={formAmountRef}
          fields={[
            {
              type: 'text',
              name: 'amount',
              label: 'Amount',
              inputType: 'currency',
              placeholder: `${fiatSign} 1,923,234,99`,
              description: `Сумма одного депозита  ${fiatSign}3000 - ${fiatSign}350000`,
              disabled: isProcessing,
              validators: {
                onChange: ({ value }: any) => {
                  const amount = Number(value)
                  if (amount < 10 || amount > 350000)
                    return (
                      <span className="text-red-500">
                        Amount of one deposit {fiatSign}10 - {fiatSign}350000
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
          defaultValues={{ amount: '' }}
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
            className={'w-fit lg:w-[72px]'}
            label={`+ ${fiatSign}10`}
            onClick={() => handleAddAmount(10)}
            disabled={isProcessing}
          />
          <CustomButton
            className={'w-fit lg:w-fit'}
            label={`+ ${fiatSign}100`}
            onClick={() => handleAddAmount(100)}
            disabled={isProcessing}
          />
          <CustomButton
            className={'w-fit lg:w-[90px]'}
            label={`+ ${fiatSign}1000`}
            onClick={() => handleAddAmount(1000)}
            disabled={isProcessing}
          />
        </div>
      </div>
      <div className={'mt-[20px] lg:mt-[40px] flex w-full justify-end'}>
        <CustomButton
          isLoading={isCreatingOrder}
          disabled={isCreatingOrder}
          onClick={() => {
            formAmountRef.current?.submit()
          }}
          className={'w-full lg:w-[200px]'}
          label={'Next'}
        />
      </div>
    </KassaLayout>
  )
}
