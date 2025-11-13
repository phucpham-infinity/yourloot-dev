import ClockerIcon from '@/assets/icons/clocker'
import { CustomDrawer } from '@/components/common/dw-drawer'
import { FormBuilder } from '@/components/common/form-builder'
import { orderController } from '@/services/controller/orders'
import { useV2DepositStore } from '@/store'
import formatAmount from '@/utils/format-amount'
import clsx from 'clsx'
import { compact } from 'lodash-es'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import QRCode from 'react-qr-code'
import { toast } from 'react-toastify'
import CustomButton from '@/components/common/custom-button'
import ClockerCountdown from '@/components/v2/payment/clocker-countdown'
import Warning2Icon from '@/assets/icons/warning2'
import ClockIcon from '@/assets/icons/clock'
import OnClickIcon from '@/assets/icons/on-click'
import CommentsIcon from '@/assets/icons/comments'
import ReloadIcon from '@/assets/icons/reload'
import { useScreen } from '@/hooks'

const DepositDataInfo = () => {
  const { isMobile } = useScreen()
  const { t } = useTranslation()
  const formEl = useRef<any>(null)

  const orderData = useV2DepositStore((s) => s.orderData)
  const method = useV2DepositStore((s) => s.method)
  const isOpenDepositDataInfo = useV2DepositStore(
    (s) => s.isOpenDepositDataInfo
  )
  const setIsOpenDataInfo = useV2DepositStore((s) => s.setIsOpenDataInfo)
  const setIsOpenCancel = useV2DepositStore((s) => s.setIsOpenCancel)
  const setIsOpenInputInfo = useV2DepositStore((s) => s.setIsOpenInputInfo)
  const setIsAmountConfirmed = useV2DepositStore((s) => s.setIsAmountConfirmed)
  const setOpenDepositInporcess = useV2DepositStore(
    (s) => s.setOpenDepositInporcess
  )
  const setOrderData = useV2DepositStore((s) => s.setOrderData)
  const isAmountConfirmed = useV2DepositStore((s) => s.isAmountConfirmed)

  const { useConfirmationSbpOrder } = orderController()
  const {
    mutateAsync: confirmationSbpOrder,
    isPending: isConfirmationSbpOrderPending,
    isSuccess: isConfirmationSbpOrderSuccess,
    isError: isConfirmationSbpOrderError
  } = useConfirmationSbpOrder()

  const isOpenRedirectPayLink = useV2DepositStore(
    (s) => s.isOpenRedirectPayLink
  )
  const setIsOpenRedirectPayLink = useV2DepositStore(
    (s) => s.setIsOpenRedirectPayLink
  )

  const handleCancel = () => {
    if (!isMobile) {
      setIsOpenCancel(true)
    } else {
      setIsOpenDataInfo(false)
      setIsOpenCancel(true)
    }
  }

  useEffect(() => {
    if (isConfirmationSbpOrderSuccess) {
      setOrderData({
        ...orderData,
        isConfirmationSbpOrder: true
      })
    }
  }, [isConfirmationSbpOrderSuccess])

  useEffect(() => {
    if (isConfirmationSbpOrderError) {
      toast.error(
        t(
          'deposit.error.attemptFailed',
          'Oops! Attempt failed! Please try again 😊'
        )
      )
    }
  }, [isConfirmationSbpOrderError])

  const hanldePaidClick = async () => {
    if (['fps', 'fps-cis'].includes(method))
      confirmationSbpOrder({
        orderId: orderData?.orderId,
        userId: orderData?.userId
      })
    else {
      setIsOpenDataInfo(false)
      setOpenDepositInporcess(true)
    }
  }

  useEffect(() => {
    if (isConfirmationSbpOrderSuccess) {
      setIsOpenDataInfo(false)
      setOpenDepositInporcess(true)
    }
  }, [isConfirmationSbpOrderSuccess])

  const methodName = {
    'fps-qr': t('depositWithdrawV2.methods.fpsQr', 'FPS QR'),
    't-pay': t('depositWithdrawV2.methods.tPay', 'T-Pay'),
    'sber-pay': t('depositWithdrawV2.methods.sberPay', 'Sber Pay'),
    yukassa: t('depositWithdrawV2.methods.yukassa', 'Yukassa'),
    '1-click-pay': t('deposit.methods.oneClickPay', '1 Click Pay'),
    mobile: t('deposit.methods.mobile', 'Mobile')
  }

  const warningItems = [
    {
      isShow: method === 'cryptocurrency',
      icon: <Warning2Icon />,
      message: t('deposit.v3.networkWarning', {
        crypto: orderData?.cryptocurrencyName,
        network: orderData?.network,
        defaultValue: `You are sending ${orderData?.cryptocurrencyName} via the ${orderData?.network} network. Using a different network will result in loss of funds.`
      })
    },
    {
      isShow: method === 'cryptocurrency',
      icon: <Warning2Icon />,
      message: t('deposit.v3.minimumAmountWarning', {
        defaultValue:
          'Please ensure the deposit meets the minimum amount. Deposits below the minimum will not be credited.'
      })
    },
    {
      isShow: method !== 'cryptocurrency',
      icon: <OnClickIcon />,
      message: t('deposit.v3.oneTransaction', {
        defaultValue: 'Make payment in one transaction'
      })
    },
    {
      isShow: method !== 'cryptocurrency',
      icon: <CommentsIcon />,
      message: t('deposit.v3.noComments', {
        defaultValue: 'Do not leave comments for the transfer.'
      })
    },
    {
      isShow: method !== 'cryptocurrency',
      icon: <ReloadIcon />,
      message: t('deposit.v3.requisitesChange', {
        defaultValue: 'Requistes always change.'
      })
    }
  ]

  const isRedirectPay =
    [
      'fps-qr',
      't-pay',
      'sber-pay',
      'yukassa',
      'mobile',
      '1-click-pay'
    ].includes(method || '') && orderData?.successUrl

  useEffect(() => {
    if (isOpenDepositDataInfo) {
      if (isRedirectPay) {
        if (isOpenRedirectPayLink) return
        setTimeout(() => {
          const newWindow = window.open(orderData?.successUrl, '_blank')
          if (!newWindow) {
            window.open(orderData?.successUrl)
          } else {
            setIsOpenRedirectPayLink(true)
          }
        }, 2000)
      }
    }
  }, [isOpenDepositDataInfo])

  return (
    <CustomDrawer
      title={
        <div className="flex items-center justify-center w-full gap-2">
          <div className="text-app-medium-16">
            {method === 'cryptocurrency'
              ? t('deposit.v3.cryptoPayment', 'Crypto Payment')
              : t('deposit.v3.bankPayment', 'Bank Payment')}
          </div>
        </div>
      }
      showBackButton={false}
      hideCloseButton
      onBackButtonClick={() => {
        setIsOpenDataInfo(false)
        setIsOpenInputInfo(true)
      }}
      open={isOpenDepositDataInfo}
      name="DepositDataInfo"
      type="deposit"
      contentClassName={'h-[80dvh]'}
      mode={!isMobile ? 'drawer' : 'dialog'}
      bodyClassName="overflow-y-auto h-full"
    >
      <div className="w-full h-full">
        {!isMobile && (
          <div className="text-app-main-20 pb-6 flex items-center gap-1">
            <div>
              {method === 'cryptocurrency'
                ? t('deposit.cryptoPayment', 'Crypto payment')
                : t('deposit.bankPayment', 'Bank payment')}
            </div>
          </div>
        )}
        <div
          data-name="DepositDataInfo"
          className={clsx('flex flex-col items-center gap-4', {
            'px-[24px] pt-[24px] pb-[20px] border-app-v2 rounded-[10px]':
              !isMobile
          })}
        >
          {method === 'cryptocurrency' && (
            <div
              className={clsx(
                'flex flex-col justify-center items-center gap-4 text-[#9E90CF] w-full',
                !isMobile && 'bg-black/35 rounded-[10px] p-4'
              )}
            >
              <div className="text-app-medium-12 text-center text-[#E3B075]">
                {t('deposit.minDeposit', 'Min. deposit')} {'>'} 5{' '}
                {orderData?.cryptocurrencyName} <br />{' '}
              </div>
              <QRCode
                className="w-20 h-20"
                size={80}
                bgColor="transparent"
                fgColor="#C5C0D8"
                value={orderData?.address ?? ''}
              />
              <div className="text-app-medium-12 text-center text-[#9E90CF]">
                {t('deposit.scanQR', 'Scan QR or copy address below')}
              </div>
            </div>
          )}
          {isRedirectPay ? (
            <div className="flex flex-col items-center gap-4">
              <img
                onClick={() => {
                  window.open(orderData?.successUrl, '_blank')
                }}
                src={'/images/redirec-pay.png'}
                alt=""
                className="w-20 h-20"
              />
              <div className="text-center text-white text-app-bold-14 leading-[14px]">
                {t('deposit.redirectingOn', 'Redirecting on')}{' '}
                {methodName[method as keyof typeof methodName]}
              </div>
              <div
                className={clsx(
                  'text-app-medium-14 text-center text-[#9E90CF]'
                )}
              >
                {t('deposit.completePayment', 'Please complete payment on')}{' '}
                {methodName[method as keyof typeof methodName]}{' '}
                {t('deposit.andReturn', 'and return here.')}
                {t(
                  'deposit.processedAutomatically',
                  'Your deposit will be processed automatically'
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-full gap-4">
              <FormBuilder
                className={'w-full flex-1'}
                ref={formEl}
                defaultValues={{
                  amount: formatAmount(orderData?.amount ?? 0),
                  bankName: orderData?.bankName,
                  cardNumber: orderData?.card,
                  cardHolder: orderData?.cardHolderName,
                  externalId: orderData?.externalId,
                  phoneNumber: orderData?.phoneNumber,
                  information: orderData?.information,
                  address: orderData?.address,
                  memo: orderData?.memo,
                  network: orderData?.network
                }}
                gap={16}
                fields={compact([
                  method !== 'cryptocurrency' && {
                    className:
                      '[&>.label]:text-[#C5C0D8] [&>.label]:text-app-medium-12',
                    type: 'text-info-confirm',
                    onCopy: () => {
                      setIsAmountConfirmed(true)
                    },
                    confirmContent: (
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2 rounded-[10px] bg-[#0B0A11] p-3">
                          <div className="text-app-bold-12">
                            {t('deposit.v3.copyAmount', 'Copy the amount')}
                          </div>
                          <div className="text-app-medium-12">
                            {t('deposit.v3.adjustedAmount', {
                              defaultValue:
                                "We've adjusted your transfer amount to verify this is your payment and process it automatically."
                            })}
                          </div>
                        </div>
                        {!isAmountConfirmed && (
                          <CustomButton
                            variant="default"
                            className=""
                            label={t('deposit.v3.understood', 'Understood')}
                            onClick={() => {
                              setIsAmountConfirmed(true)
                            }}
                          />
                        )}
                      </div>
                    ),
                    name: 'amount',
                    label: t('deposit.amount', 'Amount'),
                    placeholder: '$ 1,923,234,99',
                    showCopyBtn: true,
                    disabled: true
                  },
                  ['bank-card', 'humo', 'uzcard'].includes(method || '') && {
                    className:
                      '[&>.label]:text-[#C5C0D8] [&>.label]:text-app-medium-12',
                    type: 'text-info',
                    name: 'cardNumber',
                    label: t('deposit.cardNumber', 'Card Number'),
                    placeholder: 'Card Number',
                    showCopyBtn: true,
                    disabled: true,
                    isHidden: !isAmountConfirmed
                  },
                  ['bank-card', 'fps-sber', 'fps', 'humo', 'uzcard'].includes(
                    method || ''
                  ) && {
                    type: 'text-info',
                    name: 'bankName',
                    className:
                      '[&>.label]:text-[#C5C0D8] [&>.label]:text-app-medium-12',
                    label: t('deposit.bankName', 'Bank Name'),
                    placeholder: 'Bank Name',
                    showCopyBtn: true,
                    disabled: true,
                    isHidden: !isAmountConfirmed
                  },
                  ['fps', 'fps-sber', 'fps-alfa', 'ozon'].includes(
                    method || ''
                  ) && {
                    className: '[&>.label]:text-[#C5C0D8]',
                    type: 'text-info',
                    name: 'phoneNumber',
                    label: t('deposit.phoneNumber', 'Phone Number'),
                    placeholder: 'Phone Number',
                    showCopyBtn: true,
                    disabled: true,
                    isHidden: !isAmountConfirmed
                  },
                  [
                    'bank-card',
                    'fps-sber',
                    'fps',
                    'fps-alfa',
                    'ozon',
                    'humo',
                    'uzcard'
                  ].includes(method || '') && {
                    className:
                      '[&>.label]:text-[#C5C0D8] [&>.label]:text-app-medium-12',
                    type: 'text-info',
                    name: 'cardHolder',
                    label: t('deposit.recipient', 'Recipient'),
                    placeholder: t('deposit.recipient', 'Recipient'),
                    showCopyBtn: true,
                    disabled: true,
                    isHidden: !isAmountConfirmed
                  },
                  ['cryptocurrency'].includes(method || '') && {
                    className: '[&>.label]:text-[#C5C0D8]',
                    type: 'text-info',
                    name: 'address',
                    label: t(
                      'deposit.cryptoAddress',
                      'Your {{name}} ({{network}}) deposit address',
                      {
                        name: orderData?.cryptocurrencyName,
                        network: orderData?.network
                      }
                    ),
                    placeholder: t(
                      'deposit.cryptoAddress',
                      'Your {{name}} ({{network}}) deposit address',
                      {
                        name: orderData?.cryptocurrencyName,
                        network: orderData?.network
                      }
                    ),
                    iconColor: 'white',
                    showCopyBtn: true,
                    disabled: true
                  },
                  ['cryptocurrency'].includes(method || '') && {
                    className: '[&>.label]:text-[#C5C0D8] text-white',
                    type: 'text-info',
                    name: 'memo',
                    label: t('deposit.memo', 'Memo (Optional)'),
                    placeholder: 'Memo (Optional)',
                    iconColor: 'white',
                    showCopyBtn: true,
                    disabled: true
                  },
                  ['cryptocurrency'].includes(method || '') && {
                    type: 'text-info',
                    name: 'network',
                    label: t('deposit.network', 'Network'),
                    placeholder: 'Network',
                    className:
                      'text-white [&>.label]:text-[#C5C0D8] [&>.helper-text]:text-white',
                    showCopyBtn: true,
                    iconColor: 'white',
                    disabled: true,
                    helperText: t(
                      'deposit.estimatedArrival',
                      'Est. arrival ≈ 1 mins'
                    )
                  }
                ])}
                onSubmit={(value) => {
                  console.log('value', value)
                }}
              />
            </div>
          )}

          {!isRedirectPay && method !== 'cryptocurrency' && (
            <div
              className={clsx(
                'flex flex-row justify-between items-center text-white w-full p-3 bg-[#191524] rounded-[10px]',
                !isMobile && 'bg-black/35 rounded-[10px] p-4 w-full',
                !isAmountConfirmed && 'opacity-20'
              )}
            >
              <div className="flex items-center gap-2 ">
                <ClockIcon />
                <div className="flex-1 mx-auto text-left text-app-medium-12">
                  {t(
                    'deposit.v3.awaitingTransfer',
                    'Awaiting your transfer...'
                  )}
                </div>
              </div>

              <div
                className={`flex items-center gap-2 text-center text-app-medium-12 `}
              >
                <ClockerIcon fill="#E3B075" />
                <ClockerCountdown
                  dense
                  startTime={orderData?.createdAt}
                  timeRemainingMinutes={orderData?.orderTimeRemainingMinutes}
                />
              </div>
            </div>
          )}

          {!isRedirectPay && (
            <div
              className={clsx(
                'flex flex-row w-full gap-3',
                !isAmountConfirmed &&
                  method !== 'cryptocurrency' &&
                  'opacity-20'
              )}
            >
              {warningItems
                .filter((item) => item.isShow)
                .map((item, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col gap-3 bg-[#191524] text-app-medium-12 text-[#FFF] rounded-[10px] p-3"
                  >
                    {item.icon}
                    <div>{item.message}</div>
                  </div>
                ))}
            </div>
          )}

          {isRedirectPay ? (
            <div className="flex flex-col w-full gap-3">
              <CustomButton
                variant="default"
                label={t('deposit.v3.proceedToPayment', 'Proceed to payment')}
                className="w-full"
                onClick={() => {
                  window.open(orderData?.successUrl, '_blank')
                }}
              />
              <CustomButton
                variant="invisible"
                onClick={handleCancel}
                color="#D94244"
                className={clsx('w-full text-[10px] text-[#D94244]!')}
                label={t('deposit.cancelPayment', 'Cancel Payment')}
              />
            </div>
          ) : (
            <div
              className={clsx(
                'flex flex-col w-full gap-3',
                !isAmountConfirmed &&
                  method !== 'cryptocurrency' &&
                  'opacity-20'
              )}
            >
              {method !== 'cryptocurrency' && (
                <CustomButton
                  variant="default"
                  label={t('deposit.v3.paymentDone', 'Payment Done')}
                  className="w-full"
                  onClick={hanldePaidClick}
                  isLoading={isConfirmationSbpOrderPending}
                />
              )}
              <CustomButton
                variant="invisible"
                onClick={handleCancel}
                disabled={orderData?.isConfirmationSbpOrder}
                color="#D94244"
                className={clsx(
                  'w-full mb-6 text-[10px] text-[#D94244]!',
                  orderData?.isConfirmationSbpOrder && 'opacity-30'
                )}
                label={t('deposit.cancelPayment', 'Cancel Payment')}
              />
            </div>
          )}
          {/* {!isMobile && method === 'cryptocurrency' && (
            <div
              css={styles}
              className="flex items-center gap-2 px-[12px] py-4 text-app-medium-12 warning-alert"
            >
              <WarningIcon className="w-4 h-4" />
              <div>
                {t(
                  'deposit.warningMessage',
                  'Please note that if the deposited amount is less than the minimum limit, the funds will be lost irreversibly.'
                )}
              </div>
            </div>
          )} */}
        </div>
      </div>
    </CustomDrawer>
  )
}

export default DepositDataInfo
