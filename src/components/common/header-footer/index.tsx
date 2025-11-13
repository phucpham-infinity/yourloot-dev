import PlusGreen from '@/assets/icons/plusGreen'
import CoinSilver from '@/assets/images/header/bonus-balance.svg'
import CoinBronze from '@/assets/images/header/coin-diamond.svg'
import CoinTotal from '@/assets/images/header/coin-exp.svg'
import CoinGold from '@/assets/images/header/coin-gold.svg'
import Logo from '@/assets/images/yourloot-logotype-full-horizontal.png'
import LogoMobile from '@/assets/images/yourloot-logotype.png'
import { cn, css } from '@/lib/utils'
import formatAmount from '@/utils/format-amount'
import { useLocation } from 'react-router-dom'

import NotificationHeader from '@/app/v1/notification/component/NotificationHeader'
import NotificationIcon from '@/assets/icons/notification'
import {
  DialogPosition,
  useAuthStore,
  useDialogStore,
  useLevelStore,
  useOnBoardingStore
} from '@/store'
import { useWalletStore } from '@/store/slices/wallet'
import { useEffect, useRef, useState } from 'react'
import { isDesktop, isMobile } from 'react-device-detect'
import { Link, useNavigate } from 'react-router-dom'
import AccountLevel from '../account-level'
import IconBtn from '../icon-button'

import checkmarkIcon from '@/assets/icons/balance/checkmark.svg'
import GameMenu from '@/assets/icons/gameMenu'
import HomeMenu from '@/assets/icons/homeMenu'
import PromoMenu from '@/assets/icons/promoMenu'
import SupportMenu from '@/assets/icons/supportMenu'
import { walletsController } from '@/services/controller'
import { useHomeStore } from '@/store/slices/home'
import { useTranslation } from 'react-i18next'
import CustomButton from '../custom-button'
import HeaderV2 from './headerV2'
export default function Header({ className }: { className?: string }) {
  const dialog = useDialogStore()
  const location = useLocation()
  const { innerWidth: width } = window
  const buttonRef = useRef<HTMLDivElement | null>(null)
  const notificationWidth = isMobile ? width * 0.89 : 400
  const { isAuthenticated, logout, userId, sessionNotActive } = useAuthStore()
  const { wallets } = useWalletStore()
  const { level } = useLevelStore()
  const { isDone } = useOnBoardingStore()
  const { t } = useTranslation()
  const { setActiveTab, setType } = useHomeStore()
  const walletDefault = useWalletStore((state) =>
    state.wallets.find((wallet) => wallet.isDefault)
  )

  const navigate = useNavigate()

  const { useCheckUserActiveBalanceWallet, useUserActiveBalance } =
    walletsController()

  const { data: userActiveBalanceWallet } = useCheckUserActiveBalanceWallet(
    userId!
  )

  const [activeBalance, setActiveBalance] = useState(
    userActiveBalanceWallet?.content?.isBonus
  )

  useEffect(() => {
    if (userActiveBalanceWallet) {
      setActiveBalance(userActiveBalanceWallet?.content?.isBonus)
    }
  }, [userActiveBalanceWallet])

  const accounts = [
    {
      id: 'gold',
      icon: <img src={CoinGold} alt="Logo" className="w-[18px]" />,
      total: wallets.find((x) => x.isDefault)?.amount ?? 0,
      show: isDesktop || isMobile
    },
    {
      id: 'silver',
      icon: <img src={CoinSilver} alt="Logo" className="w-[18px]" />,
      total: wallets?.find((item) => item?.isBonus)?.amount || 0,
      show: isDesktop
    },
    {
      id: 'bronze',
      icon: <img src={CoinBronze} alt="Logo" className="w-[18px]" />,
      total: wallets?.find((item) => item?.currency === 'BBK')?.amount || 0,
      show: isDesktop
    },
    {
      id: 'total',
      icon: <img src={CoinTotal} alt="Logo" className="w-[18px]" />,
      total: level?.experiencePoints ?? 0,
      show: isDesktop
    }
  ]

  const menuLeftItems = [
    {
      id: 'home',
      label: 'Home',
      icon: <HomeMenu fill="#6C6395" />,
      onClick: () => {
        navigate('/')
      }
    },
    {
      id: 'game',
      label: 'Games',
      icon: <GameMenu fill="#6C6395" />,
      onClick: () => {
        navigate('/?gamesoft=5men')
        setActiveTab('game')
        setType('gamesoft')
        window.scrollTo(0, 0)
      }
    }
  ]

  const menuRightItems = [
    {
      id: 'promo',
      label: 'Promo',
      icon: <PromoMenu fill="#6C6395" />,
      onClick: () => {
        navigate('/bonus')
      }
    },
    {
      id: 'support',
      label: 'Support',
      icon: <SupportMenu fill="#6C6395" />,
      onClick: () => {}
    }
  ]

  const notiConfig = isMobile
    ? undefined
    : {
        target: buttonRef,
        anchor: DialogPosition.BottomRight,
        self: DialogPosition.BottomLeft,
        offset: [0, 20]
      }

  // const isIdle = useIdle() // 20 minutes

  useEffect(() => {
    if (sessionNotActive && isDesktop) {
      dialog.openBasicDialog({
        type: 'notification',
        meta: {
          title: 'You have been inactive for a long time',
          description: 'Your session is over. Come back again 😊',
          button: (
            <div className="w-full">
              <CustomButton
                label="Close"
                className="w-full text-[#9d90cf] text-xs font-medium"
                variant="muted"
                onClick={() => {
                  logout()
                  dialog.closeBasicDialog()
                }}
              />
            </div>
          )
        }
      })
    }
  }, [sessionNotActive, isDesktop])

  const {
    mutate: updateActiveBalance,
    isSuccess: isSuccessUpdateActiveBalance,
    isError: isErrorUpdateActiveBalance,
    // error: errorUpdateActiveBalance
    data: dataActiveBalance
  } = useUserActiveBalance(userId!)

  const handleUpdateActiveBalance = () => {
    updateActiveBalance()

    // dialog.openBasicDialog({
    //   type: 'warning',
    //   meta: {
    //     title: t('balance.switchWallet.title'),
    //     description: t('balance.switchWallet.description'),
    //     button: (
    //       <div className="w-full inline-flex justify-between items-center gap-3 pr-5">
    //         <CustomButton
    //           variant={'muted'}
    //           className="w-3/5"
    //           label={t('balance.switchWallet.cancel')}
    //           onClick={() => dialog.closeBasicDialog()}
    //         />
    //         <CustomButton
    //           variant={'default'}
    //           className="w-2/5 text-center"
    //           label={t('balance.switchWallet.confirm')}
    //           onClick={() => {
    //             updateActiveBalance()
    //             dialog.openBasicDialog({
    //               type: 'loading',
    //               meta: {
    //                 description:
    //                   'Your wallet is switching. Please wait a little bit ...'
    //               }
    //             })
    //           }}
    //         />
    //       </div>
    //     )
    //   }
    // })
  }

  useEffect(() => {
    if (isSuccessUpdateActiveBalance) {
      dialog.openBasicDialog({
        type: 'successful',
        meta: {
          title: t('balance.walletChanged.title'),
          // TODO: change to dynamic:
          description: !dataActiveBalance?.content?.isBonus
            ? 'Default wallet balance set as active'
            : 'Bonus wallet balance set as active',
          button: (
            <div className="w-full">
              <CustomButton
                variant={'default'}
                className="w-full text-center"
                label={t('balance.walletChanged.great')}
                onClick={() => {
                  dialog.closeBasicDialog()
                }}
              />
            </div>
          )
        }
      })
    }

    if (isErrorUpdateActiveBalance) {
      setActiveBalance(false)
      dialog.openBasicDialog({
        type: 'warning',
        meta: {
          title: 'Warning',
          // description: (errorUpdateActiveBalance as any)?.content?.message,
          description: t('balance.errorSwitchWallet'),
          button: (
            <div className="w-full">
              <CustomButton
                variant={'default'}
                className="w-full text-center"
                label="Close"
                onClick={() => {
                  dialog.closeBasicDialog()
                }}
              />
            </div>
          )
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isSuccessUpdateActiveBalance,
    isErrorUpdateActiveBalance,
    dataActiveBalance
  ])

  if (location.pathname.startsWith('/') && isMobile) {
    return <HeaderV2 />
  }

  return (
    <div
      css={isMobile ? styledMobile : styledDesktop}
      className={cn('justify-between items-center flex', className, {
        'max-w-[1200px] pt-10 mx-auto': isDesktop,
        'w-full p-5 rounded-lg border border-red-500 mb-5': isMobile
      })}
    >
      {isDesktop && (
        <div
          id="mobile-menu-support"
          className="text-white w-10 h-10 absolute top-10 left-10"
          style={{
            position: 'fixed',
            top: '90vh',
            left: '94vw',
            zIndex: 99
          }}
        >
          <div className="absolute top-0 left-0 w-[60px] h-[60px] flex flex-col items-center justify-center border border-white/30 rounded-full">
            <SupportMenu fill="#6C6395" />
            <div
              style={{ fontSize: 10 }}
              className="text-white text-xs font-medium"
            >
              Support
            </div>
          </div>
        </div>
      )}

      <Link className="relative" to="/">
        <img
          src={isMobile ? LogoMobile : Logo}
          alt="Your Loot"
          className={cn({ 'w-[184px]': isDesktop, 'w-10': isMobile })}
        />
      </Link>
      <div className="h-10 justify-start items-center gap-2.5 inline-flex">
        <div className="h-10 justify-start items-center inline-flex">
          <div className="bg-header-balance border border-[#3a3049] shadow-header-balance h-10 p-5 rounded-tl-[15px] rounded-bl-[15px] justify-start items-center gap-2.5 inline-flex">
            <div className="h-3 transition-all duration-300 justify-start items-center gap-5 inline-flex">
              {accounts
                .filter((x) => x.show)
                .slice(0, 1)
                .map((account) => {
                  return (
                    <div
                      key={account.id}
                      className="h-3 justify-center items-center gap-[5px] inline-flex"
                    >
                      <div>{account.icon}</div>
                      <div className="text-center text-[#9d90cf] text-xs font-medium">
                        {formatAmount(account.total)}
                      </div>
                    </div>
                  )
                })}

              {isDesktop && (
                <div
                  key="silver"
                  className="group relative hover:cursor-pointer transition-all duration-300 h-3 justify-center items-center gap-[5px] inline-flex"
                  onClick={() => {
                    setActiveBalance(true)
                    handleUpdateActiveBalance()
                  }}
                >
                  <div>
                    <img src={CoinSilver} alt="Logo" className="w-[18px]" />
                  </div>
                  <div
                    style={{
                      color: activeBalance
                        ? 'oklch(0.723 0.219 149.579)'
                        : '#9d90cf'
                    }}
                    className="text-center text-[#9d90cf] group-active:text-green-500 text-xs font-medium"
                  >
                    {formatAmount(wallets?.find((item) => item?.isBonus)?.amount || 0)}
                  </div>
                  <img
                    src={checkmarkIcon}
                    className="hidden group-hover:block  w-[12px] h-[12px]"
                  />
                  <div className="absolute hidden group-hover:block top-[25px] left-0 w-full h-[1px] bg-gray-500" />
                </div>
              )}

              {accounts
                .filter((x) => x.show)
                .slice(2, 4)
                .map((account) => {
                  return (
                    <div
                      key={account.id}
                      className="h-3 justify-center items-center gap-[5px] inline-flex"
                    >
                      <div>{account.icon}</div>
                      <div className="text-center text-[#9d90cf] text-xs font-medium">
                        {formatAmount(account.total)}
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
          <div
            onClick={() => {
              navigate(
                `/deposit/${walletDefault?.currency}/cryptocurrency?close-back=${location.pathname}`
              )
            }}
            className="cursor-pointer shadow-header-deposit h-10 p-5 bg-header-deposit border border-[#3a885c] rounded-tr-[15px] rounded-br-[15px] justify-start items-center gap-2.5 inline-flex"
          >
            <div className=" h-[9px] justify-start items-center gap-2.5 inline-flex">
              <div className="text-center text-[#97ffaa] text-xs font-medium ">
                {t('deposit.title')}
              </div>
            </div>
          </div>
        </div>
        <AccountLevel isAuthenticated={isAuthenticated} level={level} />
        <div ref={buttonRef}>
          <IconBtn
            ref={buttonRef}
            icon={<NotificationIcon />}
            onClick={() => {
              dialog.open({
                content: (
                  <NotificationHeader
                    onClose={() => {
                      dialog.close()
                    }}
                  />
                ),
                width: notificationWidth,
                config: notiConfig
              })
            }}
          />
        </div>
      </div>
      {isMobile && isDone && (
        <div css={styledMobileMenu}>
          <div className="flex flex-1 items-center justify-around">
            {menuLeftItems.map((item) => {
              return (
                <div
                  className="w-10 h-10 flex flex-col items-center justify-center"
                  key={item.id}
                  onClick={item.onClick}
                >
                  <div className="icon">{item.icon}</div>
                  <div className="label">{item.label}</div>
                </div>
              )
            })}
          </div>
          <div
            onClick={() => {
              navigate(
                `/deposit/${walletDefault?.currency}/cryptocurrency?close-back=${location.pathname}`
              )
            }}
            className="cta-btn"
          >
            <PlusGreen className="w-[16px] h-[16px]" />
          </div>
          <div className="flex flex-1 items-center justify-around">
            {menuRightItems.map((item) => {
              return (
                <div
                  className="w-10 h-10 flex flex-col items-center justify-center"
                  key={item.id}
                  onClick={item.onClick}
                  id={`mobile-menu-${item.id}`}
                >
                  <div className="icon">{item.icon}</div>
                  <div className="label">{item.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

const styledDesktop = css``

const styledMobile = css`
  position: sticky;
  top: 0;
  z-index: 50;
  border-radius: 0px 0px 20px 20px;
  border: 1px solid #251e3a;
  border-top: none;
  background: #0b0a11;
`

const styledMobileMenu = css`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 95%;
  padding: 15px 20px;

  border-radius: 20px;
  border: 1px solid #332b41;
  background: #0b0a11;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .label {
    color: #6c6395;
    text-align: center;

    font-size: 10px;
    font-weight: 700;
    line-height: normal;
    margin-top: 4px;
  }
  .icon {
    width: 24px;
    height: 24px;
  }
  .cta-btn {
    cursor: pointer;
    display: flex;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    border: 0.8px solid #459f63;
    background: radial-gradient(
      103.94% 265.37% at 59.95% -118.74%,
      #43f45e 0%,
      #107a27 100%
    );
    box-shadow:
      4.8px 4.8px 9.6px 0px rgba(22, 20, 24, 0.5),
      -4.8px -4.8px 19.2px 0px rgba(113, 255, 95, 0.15);
  }
`
