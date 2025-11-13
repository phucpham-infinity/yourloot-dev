import { cn, css } from '@/lib/utils'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import ArrowLeftIcon from '@/assets/icons/arrowLeft.tsx'
import CloseIcon from '@/assets/icons/close.tsx'
import BankCardLogo from '@/assets/images/deposit/bank-card-logo.svg'
import CryptocurrencyIcon from '@/assets/images/deposit/cryptocurrency-icon.svg'
import DepositIcon2 from '@/assets/images/deposit/deposit.svg'
import DepositShadowIcon2 from '@/assets/images/deposit/deposit_shadow.svg'
import SbpLogos from '@/assets/images/deposit/sbp-logos.svg'
import CustomButton from '@/components/common/custom-button'
import IconButton from '@/components/common/icon-button'
import InstructionsButton from '@/components/common/instructions'
import { WalletButton } from '@/components/common/wallet-button'
import { PageModal } from '@/components/common/page-modal'
import {
  orderController,
  userController,
  UserEventType
} from '@/services/controller'
import { useDepositStore } from '@/store/slices/deposit'
import { useHomeStore } from '@/store/slices/home'
import { useUserEventStore } from '@/store/slices/user-event'
import { isMobile } from 'react-device-detect'
import IconWidthShadow from '@/components/common/ui/IconWidthShadow'
import {
  Outlet,
  useNavigate,
  useParams,
  useLocation,
  useSearchParams
} from 'react-router-dom'

import { FiatCurrencyCode, CryptoCurrencyCode } from '@/constants'
import { useProfileStore } from '@/store'
import clsx from 'clsx'

export default function DepositLayout() {
  const { t } = useTranslation()
  const location = useLocation()
  const { setIsDoneDepositPage, isDoneDepositPage } = useUserEventStore()
  const { useUserEvent } = userController()
  const { useGetOrderStatus } = orderController()
  const { mutate: userEvent } = useUserEvent()
  const [searchParams] = useSearchParams()

  const { walletName } = useParams()
  const { profile } = useProfileStore()

  const { setIsScroll } = useHomeStore()
  const navigate = useNavigate()

  const handleClose = () => {
    setIsScroll(false)
    const closeBack = searchParams.get('close-back') ?? '/'
    navigate(closeBack)
  }
  const handleSelectMethod = (path: string) => {
    if (isProcessing) {
      return
    }
    navigate(`/deposit/${walletName}/${path}${location.search}`)
  }

  useEffect(() => {
    if (!isDoneDepositPage) {
      userEvent(
        {
          userEvent: UserEventType.FIRST_PERSONAL_ACCOUNT_VISIT
        },
        {
          onSuccess: () => {
            setIsDoneDepositPage(true)
          }
        }
      )
    }
  }, [isDoneDepositPage, setIsDoneDepositPage, userEvent])

  const MethodList = [
    {
      label: t('deposit.paymentMethods.cryptocurrency'),
      id: 'cryptocurrency',
      icon: CryptocurrencyIcon,
      isActive: [...FiatCurrencyCode, ...CryptoCurrencyCode].includes(
        walletName ?? ''
      )
    },
    {
      label: t('deposit.paymentMethods.bankCard'),
      id: 'bank-card',
      icon: BankCardLogo,
      isActive: ['RUB'].includes(walletName ?? '')
    },
    {
      label: t('deposit.paymentMethods.sbp'),
      id: 'sbp',
      icon: SbpLogos,
      isActive: ['RUB'].includes(walletName ?? '')
    },
    {
      label: t('deposit.paymentMethods.sbpQr'),
      id: 'sbp-qr',
      icon: SbpLogos,
      isActive: ['RUB'].includes(walletName ?? '')
    }
    // {
    //   label: 'ЮKassa',
    //   id: 'kassa',
    //   icon: KassaLogos,
    //   isActive: ['RUB'].includes(walletName ?? '')
    // }
  ]

  const mode = useDepositStore((state) => state.mode)
  const orderBankCard = useDepositStore((state) => state.orderBankCard)
  const orderSbp = useDepositStore((state) => state.orderSbp)
  const orderCrypto = useDepositStore((state) => state.orderCrypto)
  const orderSbpQr = useDepositStore((state) => state.orderSbpQr)
  const setIsSuccess = useDepositStore((s) => s.setIsSuccess)

  const isProcessing = useDepositStore((state) => state.isProcessing)
  const clearDeposit = useDepositStore((state) => state.clearDeposit)

  const { data: orderData } = useGetOrderStatus({
    userId: profile?.userId || '',
    orderId:
      orderCrypto?.orderId ||
      orderSbpQr?.orderId ||
      orderSbp?.orderId ||
      orderBankCard?.orderId ||
      '',
    isProcessing
  })

  useEffect(() => {
    if (isProcessing) {
      if (orderData?.status === 'COMPLETED_WITH_SUCCESS') {
        setIsSuccess(true)
        if (mode === 'cryptocurrency') {
          navigate(
            `/deposit/${orderCrypto?.walletName}/cryptocurrency/${orderCrypto?.cryptocurrencyName}/network/${orderCrypto?.network}/done${location.search}`
          )
          return
        }
        if (mode === 'sbp-qr') {
          navigate(`/deposit/RUB/sbp-qr/done${location.search}`)
          return
        }
        if (mode === 'sbp') {
          navigate(
            `/deposit/RUB/sbp/${orderSbp?.bankName}/done${location.search}`
          )
          return
        }
        if (mode === 'bank-card') {
          navigate(
            `/deposit/${orderBankCard?.walletName}/bank-card/${orderBankCard?.bankName}/done${location.search}`
          )
          return
        }
      }
      if (
        orderData?.status === 'COMPLETED_WITH_FAILURE' ||
        orderData?.status === 'CANCELED_ON_TIMEOUT'
      ) {
        setIsSuccess(false)
        if (mode === 'cryptocurrency') {
          navigate(
            `/deposit/${orderCrypto?.walletName}/cryptocurrency/${orderCrypto?.cryptocurrencyName}/network/${orderCrypto?.network}/done${location.search}`
          )
          return
        }
        if (mode === 'sbp-qr') {
          navigate(`/deposit/RUB/sbp-qr/done${location.search}`)
          return
        }
        if (mode === 'sbp') {
          navigate(
            `/deposit/RUB/sbp/${orderSbp?.bankName}/done${location.search}`
          )
          return
        }
        if (mode === 'bank-card') {
          navigate(
            `/deposit/${orderBankCard?.walletName}/bank-card/${orderBankCard?.bankName}/done${location.search}`
          )
          return
        }
      }
      if (
        location.pathname.includes('process') ||
        location.pathname.includes('done')
      ) {
        return
      } else if (mode === 'bank-card' && orderBankCard) {
        navigate(
          `/deposit/${orderBankCard.walletName}/bank-card/${orderBankCard.bankName}/info${location.search}`
        )
        return
      } else if (mode === 'sbp' && orderSbp) {
        navigate(`/deposit/RUB/sbp/${orderSbp.bankName}/info${location.search}`)
        return
      } else if (mode === 'cryptocurrency' && orderCrypto) {
        navigate(
          `/deposit/${orderCrypto.walletName}/cryptocurrency/${orderCrypto.cryptocurrencyName}/network/${orderCrypto.network}/info${location.search}`
        )
        return
      } else if (mode === 'kassa') {
        navigate(`/deposit/RUB/kassa/process${location.search}`)
        return
      } else if (mode === 'sbp-qr') {
        navigate(`/deposit/RUB/sbp-qr/process${location.search}`)
        return
      }
    } else {
      clearDeposit()
      if (
        location.pathname.includes('info') ||
        location.pathname.includes('process') ||
        location.pathname.includes('done')
      ) {
        navigate(`/deposit/${walletName}/cryptocurrency${location.search}`)
        return
      }
    }
  }, [location.pathname, orderData])

  const handleBack = () => {
    if (isProcessing) {
      return
    }
    navigate(-1)
  }
  const checkActive = (id: string) => {
    return location.pathname.split('/').includes(id)
  }

  return (
    <PageModal onClose={handleClose}>
      <div className="w-full flex items-center justify-between mb-[20px]">
        <div className=" flex items-center gap-[20px] relative">
          <div className="flex items-center gap-[20px] text-white text-2xl font-black relative">
            <IconWidthShadow
              icon={DepositIcon2}
              iconShadow={DepositShadowIcon2}
            />
            <div className="text-app-main-24">{t('deposit.title')}</div>
          </div>
        </div>
        <div className="flex gap-[10px]">
          <CustomButton
            onClick={handleBack}
            variant={'muted'}
            prefixIcon={<ArrowLeftIcon className="lg:mr-[10px]" />}
            className="w-fit lg:w-[90px] "
            label={isMobile ? '' : t('home.back')}
          />
          <InstructionsButton />
          <WalletButton
            onChange={(currency) => {
              clearDeposit()
              navigate(`/deposit/${currency}/cryptocurrency${location.search}`)
            }}
            disabled={isProcessing}
          />
          <IconButton onClick={handleClose} icon={<CloseIcon />} />
        </div>
      </div>
      <div className="" css={styleFn()}>
        <div className="left">
          {isMobile ? (
            <>
              <div className="w-full grid grid-cols-2 gap-5">
                {MethodList.slice(0, 2)
                  .filter((x) => x.isActive)
                  .map((x, id) => (
                    <div
                      onClick={() => handleSelectMethod(x.id)}
                      key={id}
                      className={cn(
                        'card-item h-[89px] w-full flex-col justify-start items-start gap-2.5 inline-flex',
                        { active: checkActive(x.id) }
                      )}
                    >
                      <div
                        className={cn(
                          'self-stretch h-[89px] p-5 rounded-[15px]  flex-col justify-start items-start gap-5 flex overflow-hidden'
                        )}
                      >
                        <div className="relative">
                          <img src={x.icon} alt={'BankCardLogo'} />
                        </div>
                        <div className="self-stretch text-[#c5c0d8] text-xs font-medium">
                          {x.label}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              {!!MethodList.slice(2, 4).filter((x) => x.isActive).length && (
                <div className="w-full grid grid-cols-2 gap-5">
                  {MethodList.slice(2, 4)
                    .filter((x) => x.isActive)
                    .map((x, id) => (
                      <div
                        onClick={() => handleSelectMethod(x.id)}
                        key={id}
                        className={cn(
                          'card-item h-[89px] w-full flex-col justify-start items-start gap-2.5 inline-flex',
                          { active: checkActive(x.id) }
                        )}
                      >
                        <div
                          className={cn(
                            'self-stretch h-[89px] p-5 rounded-[15px]  flex-col justify-start items-start gap-5 flex overflow-hidden'
                          )}
                        >
                          <div className="relative">
                            <img src={x.icon} alt={'BankCardLogo'} />
                          </div>
                          <div className="self-stretch text-[#c5c0d8] text-xs font-medium">
                            {x.label}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </>
          ) : (
            <div className="grid grid-cols-2 gap-[10px]">
              {MethodList.filter((x) => x.isActive).map((x, id) => (
                <div
                  onClick={() => handleSelectMethod(x.id)}
                  key={id}
                  className={cn(
                    'card-item  w-full flex-col justify-start items-start gap-2 inline-flex',
                    { active: checkActive(x.id) }
                  )}
                >
                  <div
                    className={cn(
                      'self-stretch  p-5 rounded-[15px]  flex-col justify-start items-start gap-5 flex overflow-hidden'
                    )}
                  >
                    <div className="relative">
                      <img src={x.icon} alt={'BankCardLogo'} />
                    </div>
                    <div className="self-stretch text-[#c5c0d8] text-xs font-medium text-nowrap">
                      {x.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div
          className={clsx([
            `right w-full rounded-tr-[20px] rounded-br-[20px] flex-col justify-start items-end gap-10 inline-flex overflow-hidden`,
            { 'min-w-[90vw]': isMobile }
          ])}
        >
          <Outlet />
        </div>
      </div>
    </PageModal>
  )
}

const styleFn = () => css`
  display: grid;
  grid-template-columns: ${isMobile ? '1fr' : '1fr 3fr'};
  gap: ${isMobile ? '20px' : '0'};
  .left {
    height: 100%;
    display: flex;
    width: ${isMobile ? '100%' : '240px'};
    padding: 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;

    border-radius: ${isMobile ? '15px' : '15px 0 0 15px'};
    border: 1px solid #47415b;
    background: url('/images/bg-deposit-left.svg') no-repeat center center;
    background-size: cover;

    .card-item {
      cursor: pointer;
      border-radius: 15px;
      border: 1px solid #493965;

      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.5) 0%,
        rgba(0, 0, 0, 0.1) 100%
      );
      box-shadow:
        6px 6px 12px 0 rgba(22, 20, 24, 0.5),
        -6px -6px 24px 0 rgba(148, 95, 255, 0.15);
      :hover {
        background:
          linear-gradient(
            0deg,
            rgba(154, 103, 255, 0.2) 0%,
            rgba(154, 103, 255, 0.2) 100%
          ),
          linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.5) 0%,
            rgba(0, 0, 0, 0.1) 100%
          );
      }
      &.active {
        background:
          linear-gradient(
            0deg,
            rgba(154, 103, 255, 0.2) 0%,
            rgba(154, 103, 255, 0.2) 100%
          ),
          linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.5) 0%,
            rgba(0, 0, 0, 0.1) 100%
          );
      }
    }
  }

  .right {
    flex: 1;
    height: 100%;
    border-radius: ${isMobile ? '15px' : '0 20px 20px 0'};
    border: 1px solid #524577;
    background: url('/images/bg-deposit-right.svg') no-repeat center center;
    background-size: cover;
  }
`
