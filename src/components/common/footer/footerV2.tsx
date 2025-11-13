import { cn, css } from '@/lib/utils'

import ArrowDown2 from '@/assets/icons/arrowDown2'
import BitCoinIcon from '@/assets/icons/coin/bitcoin'
import ETH2Icon from '@/assets/icons/coin/eth2'
import TetherIcon from '@/assets/icons/coin/tether'
import TonIcon from '@/assets/icons/coin/ton'
import FPSIcon from '@/assets/icons/footer/fps'
import MIRIcon from '@/assets/icons/footer/mir'
import MNPIcon from '@/assets/icons/footer/mnp'
import YMIcon from '@/assets/icons/footer/YMIcon'
import BonusesIcon from '@/assets/icons/v2/Bonus'
import BonusActiveIcon from '@/assets/icons/v2/BonusActive'
import CasinoIcon from '@/assets/icons/v2/Casino'
import CasinoUnActiveIcon from '@/assets/icons/v2/CasinoUnActive'
import DepositFooterIcon from '@/assets/icons/v2/DepositFooter'
import MenuIcon from '@/assets/icons/v2/Menu'
import PlusIcon from '@/assets/icons/v2/Plus'
import SupportIcon from '@/assets/icons/v2/Support'
import SupportActiveIcon from '@/assets/icons/v2/SupportActive'
import Logo2 from '@/assets/images/footer/logo2.png'
import Logo from '@/assets/images/yourloot-logotype-full-horizontal.png'
import CustomButton from '@/components/common/custom-button'
import LanguagePopover from '@/components/common/language-v2/language-popover'
import { Separator } from '@/components/ui/separator'
import ContactFooter from '@/components/v2/layout/footer-web/contact-footer'
import { YourLootSupportBotLink } from '@/constants'
import { useScreen } from '@/hooks'
import { useTelegramMiniApp } from '@/hooks/use-telegram-miniapp'
import { useAuthStore } from '@/store'
import { useHomeStoreV2 } from '@/store/slices/v2/home.store'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { CustomDrawer } from '../custom-drawer'
import CardPayments from './card-payments'
import LogoGame from './logo-game'
import MenuFooterV2 from './MenuFooterV2'

const FooterV2 = ({ className }: { className?: string }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { isTelegramMiniApp } = useTelegramMiniApp()

  const { isAuthenticated } = useAuthStore()
  const { openMenu, setOpenMenu } = useHomeStoreV2()
  const [toggleState, setToggleState] = useState(false)
  const { xs, sm, isMobile } = useScreen()
  const [openSections, setOpenSections] = useState<{
    support: boolean
    legal: boolean
    information: boolean
  }>({
    support: false,
    legal: false,
    information: false
  })

  const isCollapsible = xs || sm

  const toggleSection = (section: 'support' | 'legal' | 'information') => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setToggleState((prevState) => !prevState)
    }, 2000)

    return () => clearTimeout(interval)
  }, [])

  const handleClick = () => {
    if (!location.pathname.includes('')) {
      // Already on home page, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // Not on home, navigate to home
      navigate('/')
    }
  }

  // useEffect(() => {
  //   if (
  //     typeof window !== 'undefined' &&
  //     (window as any).anj_5d6911d3_8548_4aeb_8508_7779bfd449f7
  //   ) {
  //     ;(window as any).anj_5d6911d3_8548_4aeb_8508_7779bfd449f7.init()
  //   }
  // }, [])

  const line1Item = [
    { name: t('menu.contact_us', 'Contact Us'), url: '/contact' },
    {
      name: t('menu.affiliate_program', 'Affiliate Program'),
      url: '/affiliate'
    },
    { name: t('menu.faq', 'FAQ'), url: '/faq' }
  ]

  const line2Item = [
    {
      name: t('footer.privacy_policy', 'Privacy Policy'),
      url: '/privacy-policy'
    },
    {
      name: t('footer.terms_conditions', 'Terms & Conditions'),
      url: '/terms-and-conditions'
    },
    { name: t('footer.cookie_policy', 'KYC Policy'), url: '/kyc-policy' }
  ]

  const footerLinks = [
    {
      name: t('footer.responsible_gaming', 'Responsible Gaming'),
      url: '/responsible-gaming'
    },
    {
      name: t('footer.loyalty_program', 'Loyalty Program'),
      url: '/loyalty-program'
    },
    {
      name: t('footer.bonus_tc', 'Bonus T&C'),
      url: '/bonus-terms-conditions'
    }
  ]

  const activeMenu = useMemo(() => {
    const path = location.pathname

    if (
      path !== '/promotion' &&
      path !== '/payment/deposit' &&
      path !== '/payment/withdraw' &&
      path !== '/support' &&
      path !== '/profile'
    ) {
      return 'casino'
    } else if (path.includes('/promotion')) {
      return 'bonuses'
    } else if (path.includes('/deposit')) {
      return 'deposit'
    } else if (path.includes('/support')) {
      return 'support'
    } else {
      return null
    }
  }, [location.pathname])

  const menuItems = [
    {
      id: 'casino',
      label: t('footer.menu.casino', 'Casino'),
      icon: activeMenu === 'casino' ? <CasinoIcon /> : <CasinoUnActiveIcon />,
      active: activeMenu === 'casino',
      onClick: () => {
        if (isAuthenticated) {
          navigate('/')
        } else {
          navigate('/auth/login')
        }
      }
    },
    {
      id: 'bonuses',
      label: t('footer.menu.bonuses', 'Bonuses'),
      icon:
        activeMenu === 'bonuses' ? (
          <BonusActiveIcon />
        ) : (
          <BonusesIcon className="text-[#9E90CF]" />
        ),
      active: activeMenu === 'bonuses',
      onClick: () => {
        if (isAuthenticated) {
          navigate('/promotion')
        } else {
          navigate('/auth/login')
        }
      }
    },
    {
      id: 'deposit',
      label: t('footer.menu.deposit', 'Deposit'),
      icon: toggleState ? <DepositFooterIcon /> : <PlusIcon />,
      active: activeMenu === 'deposit',
      onClick: () => {
        if (isAuthenticated) {
          navigate('/payment/deposit')
        } else {
          navigate('/auth/login')
        }
      }
    },
    {
      id: 'support',
      label: t('footer.menu.support', 'Support'),
      icon: activeMenu === 'support' ? <SupportActiveIcon /> : <SupportIcon />,
      active: activeMenu === 'support',
      onClick: () => {
        window.open(YourLootSupportBotLink, '_blank')
      }
    },
    {
      id: 'menu',
      label: t('footer.menu.menu', 'Menu'),
      icon: <MenuIcon />,
      active: false,
      onClick: () => {
        setOpenMenu(true)
      }
    }
  ]

  return (
    <div
      className={cn(
        'w-full px-5 bg-[#191524] mx-auto pt-10 mt-[50px] mb-[40px] flex flex-col p-6 gap-[30px]',
        className
      )}
    >
      <div className="flex flex-col gap-8">
        <div className="flex items-start justify-between gap-5 ">
          <div
            className="flex justify-start w-full mt-1 cursor-pointer"
            onClick={() => handleClick()}
          >
            <img src={Logo} alt="Your Loot" className="w-[146px] h-[32px]" />
          </div>

          <LanguagePopover
            className="w-[111px] h-[40px] cursor-pointer !mt-0 !mb-0 !rounded-[6px]"
            triggerClassName="justify-start gap-2 px-[12px]"
            contentClassName="w-[250px] p-4 pb-2"
            contentAlign="end"
            contentAlignOffset={8}
            contentSideOffset={6}
          />
        </div>

        <div
          className={cn(
            'flex w-full items-start gap-5 ',
            isCollapsible ? 'flex-col' : 'flex-row justify-between'
          )}
        >
          <div
            className={cn(
              'flex gap-2',
              isCollapsible ? 'flex-col w-full' : 'flex-row w-full'
            )}
          >
            <div
              className={cn(
                'flex flex-col items-start justify-start flex-1 gap-4',
                !isCollapsible && 'min-w-[140px]'
              )}
            >
              {isCollapsible ? (
                <div className="flex items-center justify-between w-full">
                  <span className="font-black text-white text-v2-app-medium-14">
                    Support
                  </span>
                  <CustomButton
                    variant="invisible"
                    label={
                      <ArrowDown2
                        className={cn(
                          'w-3 h-3 transition-transform duration-200 flex-shrink-0',
                          openSections.support && 'rotate-180'
                        )}
                      />
                    }
                    onClick={() => toggleSection('support')}
                    className="!w-auto !justify-center !p-2 !h-auto !bg-app-border rounded-[10px]"
                  />
                </div>
              ) : (
                <div className="font-black text-white text-v2-app-medium-14">
                  Support
                </div>
              )}
              {(openSections.support || !isCollapsible) &&
                line1Item.map((x, index) => (
                  <div
                    className="cursor-pointer text-app-brand-medium text-app-medium-14"
                    key={index}
                    onClick={() => navigate(x.url)}
                  >
                    {x.name}
                  </div>
                ))}
            </div>

            <div
              className={cn(
                'flex flex-col items-start justify-start flex-1 gap-4',
                !isCollapsible && 'min-w-[140px]'
              )}
            >
              {isCollapsible ? (
                <div className="flex items-center justify-between w-full rounded-[10px]     ">
                  <span className="font-black text-white text-app-medium-14">
                    Legal
                  </span>
                  <CustomButton
                    variant="invisible"
                    label={
                      <ArrowDown2
                        className={cn(
                          'w-3 h-3 transition-transform duration-200 flex-shrink-0',
                          openSections.legal && 'rotate-180'
                        )}
                      />
                    }
                    onClick={() => toggleSection('legal')}
                    className="!w-auto !justify-center !p-2 !h-auto !bg-app-border rounded-[10px]"
                  />
                </div>
              ) : (
                <div className="font-black text-white text-app-medium-14">
                  Legal
                </div>
              )}
              {(openSections.legal || !isCollapsible) &&
                line2Item.map((x, index) => (
                  <div
                    className="cursor-pointer text-app-brand-medium text-app-medium-14"
                    key={index}
                    onClick={() => navigate(x.url)}
                  >
                    {x.name}
                  </div>
                ))}
            </div>

            <div
              className={cn(
                'flex flex-col items-start justify-start flex-1 gap-4',
                !isCollapsible && 'min-w-[140px]'
              )}
            >
              {isCollapsible ? (
                <div className="flex items-center justify-between w-full rounded-[10px]     ">
                  <span className="font-black text-white text-app-medium-14">
                    Infomation
                  </span>
                  <CustomButton
                    variant="invisible"
                    label={
                      <ArrowDown2
                        className={cn(
                          'w-3 h-3 transition-transform duration-200 flex-shrink-0',
                          openSections.information && 'rotate-180'
                        )}
                      />
                    }
                    onClick={() => toggleSection('information')}
                    className="!w-auto !justify-center !p-2 !h-auto !bg-app-border rounded-[10px]"
                  />
                </div>
              ) : (
                <div className="font-black text-white text-app-medium-14">
                  Infomation
                </div>
              )}
              {(openSections.information || !isCollapsible) &&
                footerLinks.map((x, index) => (
                  <div
                    className="cursor-pointer text-app-brand-medium text-app-medium-14"
                    key={index}
                    onClick={() => navigate(x.url)}
                  >
                    {x.name}
                  </div>
                ))}
            </div>
          </div>

          {!isCollapsible && (
            <div className="flex flex-col gap-[10px]">
              <ContactFooter
                onMessageClick={() => {
                  window.open(YourLootSupportBotLink, '_blank')
                }}
              />
            </div>
          )}
        </div>

        {isCollapsible && (
          <div className="flex flex-col w-full">
            <ContactFooter
              onMessageClick={() => {
                window.open(YourLootSupportBotLink, '_blank')
              }}
            />
            <Separator className="bg-[#2A2242] h-[3px] mt-[40px]" />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-[30px]">
        <div className="flex flex-col w-full gap-6 ">
          <div className="flex flex-row items-center gap-6">
            {isMobile && <LogoGame />}

            <div className="w-[86px] min-w-[86px]">
              <img className="" src={Logo2} />
            </div>
          </div>
          {isMobile && (
            <>
              <div className="flex justify-start gap-2">
                <TonIcon className="!w-6 !h-6" />
                <BitCoinIcon className="!w-6 !h-6" />
                <ETH2Icon className="!w-6 !h-6" />
                <TetherIcon className="!w-6 !h-6" />
                <MIRIcon className="!w-6 !h-6" />
              </div>
              <div className="flex items-center justify-start gap-2">
                <FPSIcon className="!w-6 !h-6" />
                <YMIcon className="!w-6 !h-6" />
                <MNPIcon className="!w-6 !h-6" />
                <CardPayments />
              </div>
            </>
          )}
        </div>
        <Separator className="bg-[#2A2242] h-[3px] " />
        {/* <LanguageV2 className="mt-4" /> */}
        <div className="inline-flex flex-col items-start justify-start gap-6 mb-[40px]">
          <div className="text-start text-[#9E90CF] text-app-medium-12 ">
            {t(
              'footer.company_info',
              'The Service is owned by Cintra Soft Ltd. a limited liability company registered in British Virgin Islands with company registration number 2151527 with registered address at 1st Floor, Columbus Centre, PO Box 2283, Road Town Tortola VG 1110, British Virgin Islands ("Company"), licensed in the State of Anjouan under the Computer Gaming Licensing Act 007 of 2005.'
            )}
          </div>
          <div className="text-start text-[#9E90CF] text-app-medium-12 ">
            © 2025 YourLoot. All Rights Reserved.
          </div>
        </div>{' '}
      </div>

      <div css={styledMobileMenu({ isTelegramMiniApp })}>
        <div className="flex items-center justify-around flex-1">
          {menuItems.map((item, idx) => {
            return (
              <div
                className="flex flex-col items-center justify-center w-10 h-10"
                key={item.id}
                onClick={item.onClick}
                id={`mobile-menu-${item.id}`}
              >
                <div className="transition-all duration-300">{item.icon}</div>
                <div
                  className={cn(
                    'label',
                    idx === 2 && '!text-[#48E364]',
                    item?.active && '!text-white'
                  )}
                >
                  {item.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <CustomDrawer
        open={openMenu}
        onOpenChange={setOpenMenu}
        title={t('footer.menu.menu', 'Menu')}
        bodyClassName="h-full max-h-[80dvh]"
      >
        <MenuFooterV2 />
      </CustomDrawer>
    </div>
  )
}

export default FooterV2

const styledMobileMenu = ({
  isTelegramMiniApp
}: {
  isTelegramMiniApp: boolean
}) => css`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  padding-top: 15px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: ${isTelegramMiniApp ? '48px' : '15px'};
  z-index: 20;

  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
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
