import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import { CustomDrawer } from '@/components/common/dw-drawer'
import { FormBuilder } from '@/components/common/form-builder'
import { BANK_METHOD, FiatCurrencySymbol, UZS_BANK_METHOD } from '@/constants'
import { promotionsController } from '@/services/controller/promotions'
import { useV2DepositStore, useWalletStore } from '@/store'
import clsx from 'clsx'
import { useEffect, useRef } from 'react'
import { useScreen } from '@/hooks'
import { useTranslation } from 'react-i18next'
import CustomButton from '@/components/common/custom-button'
import { useCreateOrderBank } from '@/components/v2/hooks/use-create-order-bank'

const DepositInputInfo = () => {
  const { t } = useTranslation()
  const { isMobile } = useScreen()
  const formEl = useRef<any>(null)
  promotionsController()
  const { useGetActivePromotions } = promotionsController()
  const { data: availablePromoCode } = useGetActivePromotions()

  const isWelcomeBonus = Array.isArray(availablePromoCode?.content)
    ? availablePromoCode.content.length === 0
      ? false
      : Boolean(availablePromoCode.content[0]?.isWb)
    : false

  const amount = useV2DepositStore((s) => s.amount)
  const setAmount = useV2DepositStore((s) => s.setAmount)
  const isOpenInputInfo = useV2DepositStore((s) => s.isOpenInputInfo)
  const setMethod = useV2DepositStore((s) => s.setMethod)
  const orderData = useV2DepositStore((s) => s.orderData)
  const method = useV2DepositStore((s) => s.method)
  const status = useV2DepositStore((s) => s.status)

  const setIsOpenInputInfo = useV2DepositStore((s) => s.setIsOpenInputInfo)
  const setSelectedMethod = useV2DepositStore((s) => s.setSelectedMethod)
  const setOpenDepositInporcess = useV2DepositStore(
    (s) => s.setOpenDepositInporcess
  )
  const defaultWallet = useWalletStore((s) =>
    s.wallets?.find((w) => w.isDefault)
  )
  const defaultWalletCurrency = defaultWallet?.currency

  const currencySymbol =
    FiatCurrencySymbol[defaultWalletCurrency as keyof typeof FiatCurrencySymbol]

  const { createOrder, isLoading } = useCreateOrderBank()

  const amountBtn = [
    {
      label: `3 030 ${currencySymbol}`,
      value: 3030
    },
    {
      label: `4 040 ${currencySymbol}`,
      value: 4040
    },
    {
      label: `5 050 ${currencySymbol}`,
      value: 5050
    },
    {
      label: `6 060 ${currencySymbol}`,
      value: 6060
    },
    {
      label: `7 070 ${currencySymbol}`,
      value: 7070
    },
    {
      label: `8 080 ${currencySymbol}`,
      value: 8080
    },
    {
      label: `9 090 ${currencySymbol}`,
      value: 9090
    },
    {
      label: `10 100 ${currencySymbol}`,
      value: 10100
    },
    {
      label: `25 250 ${currencySymbol}`,
      value: 25250
    },
    {
      label: `50 500 ${currencySymbol}`,
      value: 50500
    }
  ]

  const mobileAmountBtn = [
    {
      label: `130 ${currencySymbol}`,
      value: 130
    },
    {
      label: `240 ${currencySymbol}`,
      value: 240
    },
    {
      label: `350 ${currencySymbol}`,
      value: 350
    },
    {
      label: `460 ${currencySymbol}`,
      value: 460
    },
    {
      label: `570 ${currencySymbol}`,
      value: 570
    },
    {
      label: `680 ${currencySymbol}`,
      value: 680
    },
    {
      label: `790 ${currencySymbol}`,
      value: 790
    },
    {
      label: `900 ${currencySymbol}`,
      value: 900
    },
    {
      label: `999 ${currencySymbol}`,
      value: 999
    }
  ]

  const uzsAmountBtn = [
    {
      label: `10 100 ${currencySymbol}`,
      value: 10100
    },
    {
      label: `20 200 ${currencySymbol}`,
      value: 20200
    },
    {
      label: `30 300 ${currencySymbol}`,
      value: 30300
    },
    {
      label: `50 500 ${currencySymbol}`,
      value: 50500
    },
    {
      label: `75 750 ${currencySymbol}`,
      value: 75750
    },
    {
      label: `100 100 ${currencySymbol}`,
      value: 100100
    },
    {
      label: `250 250 ${currencySymbol}`,
      value: 250250
    },
    {
      label: `500 500 ${currencySymbol}`,
      value: 500500
    }
  ]

  useEffect(() => {
    if (isOpenInputInfo && status === 'inProgress') {
      setMethod(orderData?.method)
      setIsOpenInputInfo(false)
      setOpenDepositInporcess(true)
    }
  }, [isOpenInputInfo])

  const handleContinue = () => {
    formEl.current?.submit()
  }

  const handleSubmit = (value: any) => {
    createOrder({
      method: value.method,
      amount: Number(value.amount)
    })
  }

  return (
    <CustomDrawer
      title={
        <div className="flex items-center justify-center w-full gap-2">
          <div className="text-app-medium-16">
            {t('deposit.v3.bankPayment', 'Bank Payment')}
          </div>
        </div>
      }
      open={isOpenInputInfo}
      onOpenChange={(open) => setIsOpenInputInfo(open, null)}
      name="DepositInputInfo"
      type="deposit"
      contentClassName={'h-[80dvh]'}
      bodyClassName="overflow-y-auto h-full"
      mode={!isMobile ? 'drawer' : 'drawer'}
    >
      <div className="w-full h-full">
        {!isMobile && (
          <div
            onClick={() => setIsOpenInputInfo(false, null)}
            className="text-app-main-20 pb-6 flex items-center gap-1"
          >
            <div className="cursor-pointer w-5 h-5 flex items-center justify-center">
              <ArrowLeftIcon />
            </div>
            <div>
              {method === 'cryptocurrency'
                ? t('deposit.cryptoPayment', 'Crypto payment')
                : t('deposit.bankPayment', 'Bank payment')}
            </div>
          </div>
        )}
        <div
          data-name="DepositInputInfo"
          className={clsx('flex flex-col justify-between w-full h-full gap-2', {
            'px-[24px] pt-[24px] border-app-v2 rounded-[10px]': !isMobile
          })}
        >
          <div className={clsx('w-full h-full')}>
            <FormBuilder
              className={clsx('w-full', isMobile && 'flex-1')}
              ref={formEl}
              gap={16}
              fields={[
                {
                  type: 'select',
                  name: 'method',
                  label: t('deposit.method', 'Method'),
                  listeners: {
                    onChange: ({ value }: any) => {
                      setMethod(value)
                      setSelectedMethod(value)
                    }
                  },
                  options:
                    defaultWalletCurrency === 'UZS'
                      ? UZS_BANK_METHOD?.filter((x) => x.isShow)
                      : BANK_METHOD?.filter((x) => x.isShow)
                },
                {
                  type: 'text',
                  name: 'amount',
                  showCopyBtn: true,
                  label: t('deposit.amount', 'Amount'),
                  inputType: 'currency',
                  placeholder: t(
                    'deposit.amountPlaceholder',
                    `Enter amount (${defaultWalletCurrency})`,
                    { currency: defaultWalletCurrency }
                  ),
                  listeners: {
                    onChange: ({ value }: any) => {
                      setAmount(Number(value))
                    }
                  },
                  validators: {
                    onSubmit: ({ value }: any) => {
                      const amount = Number(value)
                      if (['humo', 'uzcard'].includes(method)) {
                        if (amount < 10100)
                          return (
                            <span className="text-red-500">
                              {t(
                                'deposit.amountTooLow',
                                `Too low. Minimum is 100 ${currencySymbol}.`,
                                {
                                  currency: currencySymbol,
                                  minAmount: '10 100'
                                }
                              )}
                            </span>
                          )
                      }
                      if (method === 'mobile') {
                        if (amount < 100)
                          return (
                            <span className="text-red-500">
                              {t(
                                'deposit.amountTooLow',
                                `Too low. Minimum is 100 ${currencySymbol}.`,
                                { currency: currencySymbol, minAmount: 100 }
                              )}
                            </span>
                          )
                        if (amount > 999)
                          return (
                            <span className="text-red-500">
                              {t(
                                'deposit.amountTooHigh',
                                `Too high. Maximum is 999 ${currencySymbol}.`,
                                { currency: currencySymbol, maxAmount: 999 }
                              )}
                            </span>
                          )
                        return null
                      } else {
                        if (amount < 500)
                          return (
                            <span className="text-red-500">
                              {t(
                                'deposit.amountTooLow',
                                `Too low. Minimum is 500 ${currencySymbol}.`,
                                { currency: currencySymbol, minAmount: 500 }
                              )}
                            </span>
                          )
                        return null
                      }
                    }
                  }
                }
              ]}
              onSubmit={handleSubmit}
              defaultValues={{ amount: amount, method: method }}
            />
            <div className="flex w-full flex-wrap gap-2 pt-4">
              {(['uzcard', 'humo'].includes(method)
                ? uzsAmountBtn
                : method === 'mobile'
                  ? mobileAmountBtn
                  : amountBtn
              )?.map((x) => (
                <CustomButton
                  className="w-fit leading-normal !h-[30px] [&>.label]:!leading-[14px] [&>.label]:!text-bold [&>.label]:!text-white [&>.label]:!text-[14px] !px-[12px] !py-[16px]"
                  label={x.value?.toLocaleString() + ' ' + currencySymbol}
                  key={x.value}
                  variant={x.value === amount ? 'default' : 'muted'}
                  onClick={() => {
                    formEl.current?.clearError('amount')
                    formEl.current?.setFieldValue('amount', x.value)
                    setAmount(x.value)
                  }}
                />
              ))}
            </div>
            {isWelcomeBonus && (
              <div className="w-full mt-4">
                <div className="flex flex-col gap-2 p-3 bg-[#191524] rounded-t-[10px]">
                  <div className="text-white text-app-bold-12 leading-[12px]">
                    {t('deposit.v3.bonusOnDeposit', 'Bonus on deposit')}
                  </div>
                  <div className="text-[#9E90CF] text-app-medium-12 leading-[12px]">
                    {t(
                      'deposit.v3.bonusDescription',
                      '100% extra credited instantly'
                    )}
                  </div>
                </div>
                <div>
                  <img
                    src="/images/v2/deposit/bank-payment-banner.png"
                    alt="bank-payment-banner"
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="w-full flex flex-col gap-4 pt-6 pb-6">
            <div className="flex flex-col gap-3">
              <div className="flex flex-row items-center justify-between">
                <div className="text-white text-app-medium-12 leading-[12px]">
                  {t('deposit.v3.depositAmount', 'Deposit amount')}
                </div>
                <div className="text-white text-app-bold-12 leading-[12px]">
                  {amount?.toLocaleString()} {currencySymbol}
                </div>
              </div>
              {isWelcomeBonus && (
                <div className="flex flex-row items-center justify-between">
                  <div className="text-white text-app-medium-12 leading-[12px]">
                    {t('deposit.v3.bonusBalance', 'Bonus balance')}
                  </div>
                  <div className="text-white text-app-bold-12 leading-[12px]">
                    {amount?.toLocaleString()} {currencySymbol}
                  </div>
                </div>
              )}
            </div>
            <CustomButton
              isLoading={isLoading}
              disabled={isLoading}
              onClick={handleContinue}
              className="w-full text-[10px]"
              label={t('auth.continue', 'Continue')}
            />
          </div>
        </div>
      </div>
    </CustomDrawer>
  )
}

export default DepositInputInfo
