import CustomButton from '@/components/common/custom-button'
import { FormBuilder } from '@/components/common/form-builder'
import { getCurrencySymbol } from '@/helper'
import { orderController } from '@/services/controller/orders'
import { useDepositStore } from '@/store/slices/deposit'
import { useProfileStore } from '@/store/slices/profile'
import * as Sentry from '@sentry/react'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import SbpQrLayout from './layout'

export default function Index() {
  const navigate = useNavigate()
  const { walletName } = useParams()

  const [currentAmount, setCurrentAmount] = useState(0)

  const fiatSign = getCurrencySymbol(walletName ?? '')

  const isProcessing = useDepositStore((state) => state.isProcessing)
  const setTimeExpires = useDepositStore((state) => state.setTimeExpires)
  const setOrder = useDepositStore((state) => state.setOrderSbpQr)

  const profile = useProfileStore((s) => s.profile)
  const ip = useProfileStore((s) => s.ip)

  const setMode = useDepositStore((state) => state.setMode)
  const setIsProcessing = useDepositStore((state) => state.setIsProcessing)
  const formAmountRef = useRef<any>(null)
  const { t } = useTranslation()

  const {
    mutate: createOrder,
    isPending: isCreatingOrder,
    isSuccess: isOrderSuccess,
    data: orderData
  } = orderController().useCreateRedirectPayOrder()

  useEffect(() => {
    if (currentAmount) {
      createOrder({
        userId: profile?.userId!,
        currency: walletName ?? '',
        userIp: ip ?? '',
        amount: Number(currentAmount),
        extra: {
          userAgent: navigator.userAgent,
          fingerprint: 'fingerprint',
          registeredAt: new Date().getTime()
        }
      })
    }
  }, [currentAmount])

  useEffect(() => {
    if (isOrderSuccess) {
      setTimeExpires(900)
      setMode('sbp-qr')
      setIsProcessing(true)
      navigate(`/deposit/${walletName}/sbp-qr/process${location.search}`)
    }
  }, [isOrderSuccess])

  useEffect(() => {
    if (orderData) {
      setOrder(orderData)
      if (orderData.successUrl) {
        const newWindow = window.open(orderData.successUrl, '_blank')
        if (!newWindow) {
          Sentry.captureException(
            new Error(
              `Can not open success url ${orderData.successUrl} ${JSON.stringify(orderData)}`
            )
          )
          toast.error(`Can not open success url ${orderData.successUrl}`)
        }
      } else {
        Sentry.captureException(
          new Error(`No success url ${JSON.stringify(orderData)}`)
        )
        toast.error('No success url')
      }
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
    <SbpQrLayout
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
              description: `Limits by transaction ₽500 - ₽350.000 Amount of one`,
              disabled: isProcessing,
              validators: {
                onChange: ({ value }: any) => {
                  const amount = Number(value)
                  if (amount < 500 || amount > 350000)
                    return (
                      <span className="text-red-500">
                        Limits by transaction ₽500 - ₽350.000 Amount of one
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
            label={`+ ${fiatSign}100`}
            onClick={() => handleAddAmount(100)}
            disabled={isProcessing}
          />
          <CustomButton
            className={'w-fit lg:w-fit'}
            label={`+ ${fiatSign}1000`}
            onClick={() => handleAddAmount(1000)}
            disabled={isProcessing}
          />
          <CustomButton
            className={'w-fit lg:w-[90px]'}
            label={`+ ${fiatSign}3000`}
            onClick={() => handleAddAmount(3000)}
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
    </SbpQrLayout>
  )
}
