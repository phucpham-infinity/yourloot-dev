import { CustomDrawer } from '@/components/common/dw-drawer'
import { FormBuilder } from '@/components/common/form-builder'
import {
  banks,
  cryptoCurrencyNetworkKey,
  FiatCurrencySymbol
} from '@/constants'
import { getFingerprint } from '@/lib/fingerprint'
import { orderController } from '@/services/controller/orders'
import { useProfileStore, useV2WithdrawStore, useWalletStore } from '@/store'
import { compact } from 'lodash-es'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import CustomButton from '@/components/common/custom-button'
import { useScreen } from '@/hooks'
import clsx from 'clsx'
import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import useToast from '@/hooks/use-toast'

const WithdrawInputInfo = () => {
  const { t } = useTranslation()
  const { isMobile } = useScreen()
  const formEl = useRef<any>(null)
  const toast = useToast()

  const amount = useV2WithdrawStore((s) => s.amount)
  const bankCode = useV2WithdrawStore((s) => s.bankCode)
  const setAmount = useV2WithdrawStore((s) => s.setAmount)
  const setBankCode = useV2WithdrawStore((s) => s.setBankCode)
  const method = useV2WithdrawStore((s) => s.method)
  const setStatus = useV2WithdrawStore((s) => s.setStatus)
  const isOpenInputInfo = useV2WithdrawStore((s) => s.isOpenInputInfo)
  const setIsOpenInputInfo = useV2WithdrawStore((s) => s.setIsOpenInputInfo)
  const setIsOpenWithdrawRequested = useV2WithdrawStore(
    (s) => s.setIsOpenWithdrawRequested
  )
  const setOrderData = useV2WithdrawStore((s) => s.setOrderData)
  const setBeforeMethod = useV2WithdrawStore((s) => s.setBeforeMethod)

  const clearWithdraw = useV2WithdrawStore((s) => s.clearWithdraw)
  const wallets = useWalletStore((state) => state.wallets)
  const { profile, ip } = useProfileStore()
  const [fingerprint, setFingerprint] = useState<string | null>(null)

  const defaultWallet = wallets.find((wallet) => wallet.isDefault)
  const defaultWalletCurrency = defaultWallet?.currency || ''
  const defaultWalletAmount = defaultWallet?.amount || 0

  const currencySymbol =
    FiatCurrencySymbol[defaultWalletCurrency as keyof typeof FiatCurrencySymbol]

  useEffect(() => {
    getFingerprint().then(setFingerprint)
  }, [])

  const {
    useCreateBankCardWithdrawOrder,
    useCreateSbpWithdrawOrder,
    useCreateCryptoWithdrawOrder
  } = orderController()

  const {
    mutate: createBankCardWithdrawOrder,
    isPending: isPendingCreateBankCardWithdrawOrder,
    data: bankCardWithdrawOrderData,
    isError: isErrorCreateBankCardWithdrawOrder
  } = useCreateBankCardWithdrawOrder()

  const {
    mutate: createSbpWithdrawOrder,
    isPending: isPendingCreateSbpWithdrawOrder,
    isError: isErrorCreateSbpWithdrawOrder,
    data: sbpWithdrawOrderData,
    error: createSbpWithdrawOrderError
  } = useCreateSbpWithdrawOrder()

  const {
    mutate: createCryptoWithdrawOrder,
    data: cryptoWithdrawOrder,
    isPending: isPendingCreateCryptoWithdrawOrder,
    isError: isErrorCreateCryptoWithdrawOrder
  } = useCreateCryptoWithdrawOrder()

  const handleSubmit = (value: any) => {
    setAmount(value.amount)
    setBankCode(value.bankCode)

    setBeforeMethod(method)
    if (method === 'bank-card') {
      createBankCardWithdrawOrder({
        userId: profile?.userId,
        walletId: defaultWallet?.id,
        amount: value.amount,
        bankCode: value.bankCode,
        cardNumber: value.cardNumber,
        userIp: ip,
        extra: {
          userAgent: navigator.userAgent,
          fingerprint: fingerprint
        }
      })
    } else if (method === 'fps') {
      createSbpWithdrawOrder({
        userId: profile?.userId,
        walletId: defaultWallet?.id,
        bank: value.bankCode,
        amount: value.amount,
        phoneNumber: value.phoneNumber,
        walletName: defaultWalletCurrency,
        currency: defaultWalletCurrency,
        userIp: ip,
        extra: {
          userAgent: navigator.userAgent,
          fingerprint: fingerprint,
          registeredAt: new Date().getTime()
        }
      })
    } else if (method === 'cryptocurrency') {
      createCryptoWithdrawOrder({
        userId: profile?.userId,
        currency: defaultWalletCurrency,
        walletId: defaultWallet?.id,
        amount: value.amount,
        addressTo: value.walletAddress,
        network: value.network
      })
    }
  }

  useEffect(() => {
    if (
      bankCardWithdrawOrderData ||
      sbpWithdrawOrderData ||
      cryptoWithdrawOrder
    ) {
      setStatus('inProgress')
      setOrderData({
        ...(bankCardWithdrawOrderData ||
          sbpWithdrawOrderData ||
          cryptoWithdrawOrder),
        method,
        currency: defaultWalletCurrency,
        createdAt: new Date().getTime(),
        orderTimeRemainingMinutes: 15,
        walletId: defaultWallet?.id,
        userId: profile?.userId!
      })
      setIsOpenInputInfo(false)
      setIsOpenWithdrawRequested(true)
    }
  }, [bankCardWithdrawOrderData, sbpWithdrawOrderData, cryptoWithdrawOrder])

  useEffect(() => {
    if (
      isErrorCreateBankCardWithdrawOrder ||
      isErrorCreateSbpWithdrawOrder ||
      isErrorCreateCryptoWithdrawOrder
    ) {
      clearWithdraw()
    }
  }, [
    isErrorCreateBankCardWithdrawOrder,
    isErrorCreateSbpWithdrawOrder,
    isErrorCreateCryptoWithdrawOrder
  ])

  useEffect(() => {
    if (createSbpWithdrawOrderError) {
      toast.error(
        createSbpWithdrawOrderError?.content?.message ||
          t('withdraw.processAlert.failedToast', {
            defaultValue:
              'Withdrawal failed, please try again or contact support.'
          })
      )
    }
  }, [createSbpWithdrawOrderError])

  const handleContinue = () => {
    formEl.current?.submit()
  }

  return (
    <CustomDrawer
      title={
        <div className="flex items-center justify-center w-full gap-2">
          <div className="text-app-medium-16">
            {t('withdraw.title', 'Withdraw')}
          </div>
        </div>
      }
      mode={!isMobile ? 'drawer' : 'dialog'}
      open={isOpenInputInfo}
      onOpenChange={(open) => setIsOpenInputInfo(open, null)}
      contentClassName={'h-[80dvh]'}
      type="withdraw"
      name="WithdrawInputInfo"
    >
      <div>
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
                ? t('withdraw.cryptoPayment', 'Crypto payment')
                : t('withdraw.bankPayment', 'Bank payment')}
            </div>
          </div>
        )}
        <div
          className={clsx('flex flex-col gap-4', {
            'px-[24px] pt-[24px] pb-[20px] border-app-v2 rounded-[10px]':
              !isMobile
          })}
        >
          {isMobile && (
            <div className="text-app-medium-12 text-[#6C6395] flex gap-1 flex-col">
              <div>{t('balance.primaryWallet', 'Primary Wallet')}</div>
              <div className="text-white text-app-medium-14">
                {defaultWalletAmount?.toLocaleString()} {defaultWalletCurrency}
              </div>
            </div>
          )}
          <div className="flex flex-col w-full gap-2">
            <FormBuilder
              className={'w-full flex-1'}
              ref={formEl}
              gap={16}
              fields={compact([
                ['bank-card', 'fps'].includes(method || '') && {
                  type: 'select',
                  name: 'bankCode',
                  label: t('withdraw.bankCard.chooseBank', 'Select Your Bank'),
                  placeholder: t(
                    'withdraw.bankCard.chooseBank',
                    'Select Your Bank'
                  ),
                  options: banks.map((bank) => ({
                    label: bank.bankName,
                    value: bank.bankCode
                  })),
                  validators: {
                    onSubmit: ({ value }: any) => {
                      if (!value) {
                        return (
                          <span className="text-red-500">
                            {t(
                              'withdraw.bankCard.selectBankDescription',
                              'Select your bank'
                            )}
                          </span>
                        )
                      }
                      return null
                    }
                  }
                },
                method === 'bank-card' && {
                  type: 'text',
                  name: 'cardNumber',
                  label: t('deposit.cardNumber', 'Card Number'),
                  inputType: 'text',
                  placeholder: t(
                    'withdraw.bankCard.bankNumberPlaceholder',
                    'Enter card number'
                  ),
                  validators: {
                    onSubmit: ({ value }: any) => {
                      if (!value) {
                        return (
                          <span className="text-red-500">
                            {t(
                              'withdraw.bankCard.bankNumberPlaceholder',
                              'Enter card number'
                            )}
                          </span>
                        )
                      }
                      return null
                    }
                  }
                },
                method === 'fps' && {
                  type: 'text',
                  name: 'phoneNumber',
                  label: t('deposit.phoneNumber', 'Phone Number'),
                  inputType: 'text',
                  placeholder: t(
                    'withdraw.bankCard.phoneNumberPlaceholder',
                    'Enter phone number'
                  ),
                  validators: {
                    onSubmit: ({ value }: any) => {
                      if (!value) {
                        return (
                          <span className="text-red-500">
                            {t(
                              'withdraw.bankCard.phoneNumberPlaceholder',
                              'Enter phone number'
                            )}
                          </span>
                        )
                      }
                      return null
                    }
                  }
                },
                method === 'cryptocurrency' && {
                  type: 'text',
                  name: 'walletAddress',
                  label: t(
                    'withdraw.cryptocurrency.walletAddress',
                    'Wallet Address'
                  ),
                  inputType: 'text',
                  placeholder: t(
                    'withdraw.cryptocurrency.walletAddressPlaceholder',
                    'Enter wallet address'
                  ),
                  validators: {
                    onSubmit: ({ value }: any) => {
                      if (!value) {
                        return (
                          <span className="text-red-500">
                            {t(
                              'withdraw.cryptocurrency.walletAddressPlaceholder',
                              'Enter wallet address'
                            )}
                          </span>
                        )
                      }
                      return null
                    }
                  }
                },
                method === 'cryptocurrency' &&
                  defaultWalletCurrency !== 'BBK' && {
                    type: 'select',
                    name: 'network',
                    label: t('deposit.network', 'Network'),
                    inputType: 'text',
                    placeholder: t('deposit.selectNetwork', 'Enter network'),
                    options:
                      cryptoCurrencyNetworkKey[
                        defaultWalletCurrency as keyof typeof FiatCurrencySymbol
                      ]?.networks?.map((network) => ({
                        label: network.network,
                        value: network.network
                      })) || [],
                    validators: {
                      onSubmit: ({ value }: any) => {
                        if (!value) {
                          return (
                            <span className="text-red-500">
                              {t('deposit.selectNetwork', 'Enter network')}
                            </span>
                          )
                        }
                        return null
                      }
                    }
                  },
                {
                  type: 'text',
                  name: 'amount',
                  label: t('deposit.amount', 'Amount'),
                  inputType: 'currency',
                  placeholder: t(
                    'withdraw.bankCard.amountPlaceholder',
                    `Enter amount ${defaultWalletCurrency}`,
                    { currency: defaultWalletCurrency }
                  ),
                  description: t(
                    'withdraw.bankCard.amountDescription',
                    `Available: ${defaultWalletAmount?.toLocaleString()} ${defaultWalletCurrency}`,
                    {
                      amount: defaultWalletAmount?.toLocaleString(),
                      currency: defaultWalletCurrency
                    }
                  ),
                  validators: {
                    onSubmit: ({ value }: any) => {
                      const amount = Number(value)
                      if (amount < 0)
                        return (
                          <span className="text-red-500">
                            {t(
                              'withdraw.amountTooLow',
                              'Too low. Minimum is 500 {{currency}}.',
                              { currency: currencySymbol }
                            )}
                          </span>
                        )
                      if (amount > defaultWalletAmount)
                        return (
                          <span className="text-red-500">
                            {t(
                              'withdraw.insufficientFunds',
                              "You don't have enough funds."
                            )}
                          </span>
                        )
                      return null
                    }
                  }
                }
              ])}
              onSubmit={handleSubmit}
              defaultValues={{
                amount: amount,
                bankCode: bankCode,
                walletAddress: '',
                network:
                  cryptoCurrencyNetworkKey[
                    defaultWalletCurrency as keyof typeof FiatCurrencySymbol
                  ]?.networks?.[0]?.network || ''
              }}
            />
            <div className="w-full pt-6">
              <CustomButton
                isLoading={
                  isPendingCreateBankCardWithdrawOrder ||
                  isPendingCreateSbpWithdrawOrder ||
                  isPendingCreateCryptoWithdrawOrder
                }
                onClick={handleContinue}
                className="w-full text-[10px]"
                label={t('withdraw.bankCard.next', 'Continue')}
              />
            </div>
          </div>
        </div>
      </div>
    </CustomDrawer>
  )
}

export default WithdrawInputInfo
