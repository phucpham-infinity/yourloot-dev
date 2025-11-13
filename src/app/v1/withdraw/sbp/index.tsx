import CustomButton from '@/components/common/custom-button'
import { FormBuilder } from '@/components/common/form-builder'
import { getCurrencySymbol } from '@/helper'
import { getFingerprint } from '@/lib/fingerprint'
import { orderController } from '@/services/controller/orders'
import { walletsController } from '@/services/controller/wallets'
import { useProfileStore } from '@/store/slices/profile'
import { useWithdrawStore } from '@/store/slices/withdraw'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import SBPLayout from './layout'

export default function Index() {
  const navigate = useNavigate()
  const { walletName } = useParams()
  const { t } = useTranslation()
  const {
    setSbpAmount,
    setSbpBankNumber,
    setSbpBankCode,
    setInProgress,
    setSbpOrder,
    setCurrentWalletAmount,
    setMode
  } = useWithdrawStore()
  const { useCreateSbpWithdrawOrder } = orderController()

  const formAmountRef = useRef<any>(null)
  const formBankRef = useRef<any>(null)

  const fiatSign = getCurrencySymbol(walletName ?? '')
  const handleAddAmount = (value: number) => {
    formAmountRef.current?.clearError('amount')
    const currentAmount = formAmountRef?.current?.getFieldValue('amount')
    formAmountRef?.current?.setFieldValue(
      'amount',
      Number(currentAmount) + value
    )
  }

  const {
    mutate: createSbpWithdrawOrder,
    error: createSbpWithdrawOrderError,
    data: createSbpWithdrawOrderData,
    isSuccess: createSbpWithdrawOrderIsSuccess,
    isPending: createSbpWithdrawOrderIsPending
  } = useCreateSbpWithdrawOrder()
  const { profile, ip } = useProfileStore()
  const [fingerprint, setFingerprint] = useState<string | null>(null)

  useEffect(() => {
    // Get fingerprint on component mount
    getFingerprint().then(setFingerprint)
  }, [])

  const { data: wallet } = walletsController().useGetUserWalletByCurrency({
    userId: profile?.userId!,
    currency: 'RUB',
    refetchInterval: 0
  })

  useEffect(() => {
    if (wallet) {
      setCurrentWalletAmount(wallet.amount)
    }
  }, [wallet])

  useEffect(() => {
    if (createSbpWithdrawOrderError) {
      toast.error(
        createSbpWithdrawOrderError?.content?.message ??
          'Oops! Attempt failed! Please try again 😊'
      )
    }
  }, [createSbpWithdrawOrderError])

  useEffect(() => {
    if (createSbpWithdrawOrderIsSuccess) {
      setMode('sbp')
      setInProgress(true)
      setSbpOrder({
        ...createSbpWithdrawOrderData,
        amount: formAmountRef.current.getFieldValue('amount'),
        bank: 'bank',
        bankCode: 'bank',
        phoneNumber: formBankRef.current.getFieldValue('cardNumber'),
        owner: formBankRef.current.getFieldValue('owner'),
        walletName: walletName ?? ''
      })
      navigate(`/withdraw/${walletName}/sbp/bank/process`)
    }
  }, [createSbpWithdrawOrderIsSuccess])

  // useEffect(() => {
  //   if (createSbpWithdrawOrderError) {
  //     setInProgress(true)
  //     setMode('sbp')
  //     setSbpOrder({
  //       orderId: Math.floor(10000 + Math.random() * 90000),
  //       amount: formAmountRef.current.getFieldValue('amount'),
  //       bank: 'bank',
  //       phoneNumber: formBankRef.current.getFieldValue('cardNumber'),
  //       owner: formBankRef.current.getFieldValue('owner'),
  //       walletName: walletName ?? '',
  //       bankCode: 'bank'
  //     })
  //     navigate(`/withdraw/${walletName}/sbp/bank/process`)
  //   }
  // }, [createSbpWithdrawOrderError])

  return (
    <SBPLayout
      title={t('deposit.addDetails')}
      description={t('deposit.chooseBank')}
      showLeftContent
    >
      <div
        className={
          'flex w-full items-start lg:items-end gap-[5px] lg:gap-[10px] flex-col lg:flex-row lg:h-full'
        }
      >
        <FormBuilder
          className={'w-full flex-1'}
          ref={formAmountRef}
          defaultValues={{ amount: '' }}
          fields={[
            {
              type: 'text',
              name: 'amount',
              inputType: 'currency',
              label: t('withdraw.bankCard.amount'),
              placeholder: t('withdraw.bankCard.amountPlaceholder', {
                currency: fiatSign
              }),
              description: t('withdraw.bankCard.amountDescription', {
                currency: fiatSign
              }),
              validators: {
                onSubmit: ({ value }: any) => {
                  const amount = Number(value)
                  if (amount < 5000 || amount > 100000) {
                    return (
                      <span className="text-red-500">
                        {t('withdraw.bankCard.amountDescription', {
                          currency: fiatSign
                        })}
                      </span>
                    )
                  }
                  return null
                }
              }
            }
          ]}
          onSubmit={(value) => {
            setSbpAmount(value.amount)
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
            className={'w-fit'}
            label={`+${fiatSign}100`}
            onClick={() => handleAddAmount(100)}
          />
          <CustomButton
            className={'w-fit'}
            label={`+${fiatSign}1000`}
            onClick={() => handleAddAmount(1000)}
          />
          <CustomButton
            className={'w-fit'}
            label={`+${fiatSign}3000`}
            onClick={() => handleAddAmount(3000)}
          />
        </div>
      </div>
      <div className={'flex w-full items-end pt-0 lg:pt-[20px]'}>
        <FormBuilder
          className={'w-full flex-1'}
          ref={formBankRef}
          gap={26}
          defaultValues={{
            cardNumber: '',
            owner: '',
            bankCode: ''
          }}
          fields={[
            {
              type: 'text',
              name: 'cardNumber',
              label: t('withdraw.bankCard.yourPhoneNumber'),
              placeholder: t('withdraw.bankCard.yourPhoneNumberPlaceholder'),
              validators: {
                onSubmit: ({ value }: any) => {
                  if (!value) {
                    return (
                      <span className="text-red-500">
                        Phone number is required
                      </span>
                    )
                  }
                  return null
                }
              }
            }
            // {
            //   type: 'text',
            //   name: 'owner',
            //   label: t('withdraw.bankCard.owner'),
            //   placeholder: t('withdraw.bankCard.ownerPlaceholder'),
            //   validators: {
            //     onSubmit: ({ value }: any) => {
            //       if (!value) {
            //         return (
            //           <span className="text-red-500">Owner is required</span>
            //         )
            //       }
            //       return null
            //     }
            //   }
            // },
            // {
            //   type: 'select',
            //   name: 'bankCode',
            //   label: t('withdraw.bankCard.yourBank'),
            //   selectedRender: (origin, options) => {
            //     const item = options?.find((item) => item.value === origin)
            //     return item?.label
            //   },
            //   options: spbBanks,
            //   validators: {
            //     onSubmit: ({ value }: any) => {
            //       if (!value) {
            //         return (
            //           <span className="text-red-500">Bank is required</span>
            //         )
            //       }
            //       return null
            //     }
            //   }
            // }
          ]}
          onSubmit={(value) => {
            setSbpBankNumber(value.cardNumber)
            setSbpBankCode(value.bankCode)

            createSbpWithdrawOrder({
              amount: formAmountRef.current.getFieldValue('amount'),
              phoneNumber: value.cardNumber,
              walletName: walletName ?? '',
              userId: profile?.userId!,
              currency: walletName ?? '',
              userIp: ip ?? '',
              // owner: value.owner,
              extra: {
                userAgent: navigator.userAgent,
                fingerprint: fingerprint,
                registeredAt: new Date().getTime()
              }
            })
          }}
        />
      </div>
      <div className={'mt-[10px] lg:mt-[60px] flex w-full justify-end'}>
        <CustomButton
          onClick={() => {
            formAmountRef.current.submit()
            formBankRef.current.submit()
          }}
          isLoading={createSbpWithdrawOrderIsPending}
          className={'w-full lg:w-[200px]'}
          label={t('withdraw.bankCard.withdraw')}
        />
      </div>
    </SBPLayout>
  )
}
