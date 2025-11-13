import { useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams, Outlet } from 'react-router-dom'

import { cn, css } from '@/lib/utils'
import ArrowLeftIcon from '@/assets/icons/arrowLeft.tsx'
import CloseIcon from '@/assets/icons/close.tsx'
import CryptocurrencyIcon from '@/assets/images/deposit/cryptocurrency-icon.svg'
import SbpLogos from '@/assets/images/deposit/sbp-logos.svg'
import CustomButton from '@/components/common/custom-button'
import IconButton from '@/components/common/icon-button'
import InstructionsButton from '@/components/common/instructions'
import WithdrawIcon2 from '@/assets/images/withdraw/withdraw.svg'
import WithdrawShadowIcon2 from '@/assets/images/withdraw/withdraw_shadow.svg'
import { WalletButton } from '@/components/common/wallet-button'
import { useHomeStore } from '@/store/slices/home'

import IconWidthShadow from '@/components/common/ui/IconWidthShadow'
import PageModal from '@/components/common/page-modal'
import { useLocation } from 'react-router-dom'
import { useWithdrawStore } from '@/store/slices/withdraw'
import {
  CryptoCurrencyCode,
  FiatCurrencyCode
} from '@/constants/fund.constants'
import { orderController } from '@/services/controller/orders'
import { useProfileStore } from '@/store'

export default function WithdrawLayout() {
  const navigate = useNavigate()
  const { walletName } = useParams()
  const { setIsScroll } = useHomeStore()
  const location = useLocation()
  const { state } = location

  // const [selected, setSelected] = useState<string>('bank-card')
  const {
    // clearWithdraw,
    inProgress,
    mode,
    cryptoWithdrawOrder,
    sbpOrder,
    setIsSuccess
  } = useWithdrawStore()
  // const { inProgress, sbpOrder } = useWithdrawStore()

  const handleBack = () => {
    navigate(-1)
  }
  const handleClose = () => {
    // clearWithdraw()
    setIsScroll(false)
    navigate(state?.closeBack ?? '/')
  }
  const handleSelectMethod = (path: string) => {
    if (inProgress) return
    // setSelected(path)
    navigate(`/withdraw/${walletName}/` + path)
  }

  const MethodList = [
    // {
    //   label: 'Bank Card',
    //   id: 'bank-card',
    //   icon: BankCardLogo,
    //   isActive: [...FiatCurrencyCode, ...CryptoCurrencyCode].includes(
    //     walletName ?? ''
    //   )
    // },
    {
      label: 'Cryptocurrency',
      id: 'cryptocurrency',
      icon: CryptocurrencyIcon,
      isActive: [...FiatCurrencyCode, ...CryptoCurrencyCode].includes(
        walletName ?? ''
      )
    },
    {
      label: 'SBP',
      id: 'sbp',
      icon: SbpLogos,
      isActive: ['USD', 'RUB'].includes(walletName ?? '')
    }
  ]

  const { t } = useTranslation()

  const { useGetOrderStatus } = orderController()
  const { profile } = useProfileStore()

  const { data: orderData } = useGetOrderStatus({
    userId: profile?.userId || '',
    orderId: cryptoWithdrawOrder?.orderId || sbpOrder?.orderId || '',
    isProcessing: inProgress
  })

  useEffect(() => {
    if (
      inProgress &&
      ['ACTIVE', 'WAITING_APPROVAL'].includes(orderData?.status)
    ) {
      if (mode === 'cryptocurrency') {
        navigate(
          `/withdraw/${walletName}/cryptocurrency/${cryptoWithdrawOrder?.currency}/network/${cryptoWithdrawOrder?.network}/process${location.search}`
        )
      }
      if (mode === 'sbp') {
        navigate(
          `/withdraw/${walletName}/sbp/${sbpOrder?.bankCode}/process${location.search}`
        )
      }
    }
    if (inProgress && orderData?.status === 'COMPLETED_WITH_SUCCESS') {
      setIsSuccess(true)
      if (mode === 'cryptocurrency') {
        navigate(
          `/withdraw/${walletName}/cryptocurrency/${cryptoWithdrawOrder?.currency}/network/${cryptoWithdrawOrder?.network}/done${location.search}`
        )
      }
      if (mode === 'sbp') {
        navigate(
          `/withdraw/${walletName}/sbp/${sbpOrder?.bankCode}/done${location.search}`
        )
      }
    }
    if (
      inProgress &&
      ['COMPLETED_WITH_FAILURE', 'COMPLETED_WITH_ERROR', 'DENIED'].includes(
        orderData?.status
      )
    ) {
      setIsSuccess(false)
      if (mode === 'cryptocurrency') {
        navigate(
          `/withdraw/${walletName}/cryptocurrency/${cryptoWithdrawOrder?.currency}/network/${cryptoWithdrawOrder?.network}/done${location.search}`
        )
      }
      if (mode === 'sbp') {
        navigate(
          `/withdraw/${walletName}/sbp/${sbpOrder?.bankCode}/done${location.search}`
        )
      }
    }
  }, [orderData, inProgress, mode, cryptoWithdrawOrder, sbpOrder])

  const checkActive = (id: string) => {
    return location.pathname.split('/').includes(id)
  }

  return (
    <PageModal onClose={handleClose}>
      <div className="flex items-center justify-between mb-[20px] w-full">
        <div className="flex items-center gap-[20px] text-white text-2xl font-black relative">
          <IconWidthShadow
            icon={WithdrawIcon2}
            iconShadow={WithdrawShadowIcon2}
          />
          <div className="text-app-main-24">{t('withdraw.title')}</div>
        </div>
        <div className="flex gap-[10px]">
          <CustomButton
            onClick={handleBack}
            variant={'muted'}
            prefixIcon={<ArrowLeftIcon className="mr-0 lg:mr-[10px]" />}
            className="w-fit lg:w-[90px]"
            disabled={inProgress}
            label={isMobile ? '' : t('home.back')}
          />
          <InstructionsButton />
          <WalletButton
            disabled={inProgress}
            showWallets={['RUB']}
            onChange={() => {
              navigate(`/withdraw/RUB/sbp${location.search}`)
            }}
          />
          <IconButton onClick={handleClose} icon={<CloseIcon />} />
        </div>
      </div>
      <div className="" css={styleFn()}>
        <div className="left">
          {isMobile ? (
            <>
              <div className="flex flex-row gap-5 w-full">
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
              {!!MethodList.slice(2, 3).length && (
                <div className="w-full">
                  {MethodList.slice(2, 3)
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
            <>
              {MethodList.filter((x) => x.isActive).map((x, id) => (
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
            </>
          )}
        </div>
        <div className="right w-full rounded-tr-[20px] rounded-br-[20px]  flex-col justify-start items-end gap-10 inline-flex overflow-hidden">
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
  width: 100%;
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
