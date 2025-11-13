import { cn, css } from '@/lib/utils'

import Logo2 from '@/assets/images/footer/logo2.png'
import Logo from '@/assets/images/yourloot-logotype-full-horizontal.png'
// import LanguagePopover from '@/components/common/language-v2/language-popover'
import LanguagePopover from '@/components/common/language-v2/language-popover'
import { YourLootSupportBotLink } from '@/constants'
// import { useAuthStore } from '@/store'
import ArrowDown2 from '@/assets/icons/arrowDown2'
import { useScreen } from '@/hooks'
import { useV2LayoutStore } from '@/store/slices/v2/layout.store'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import BitCoinIcon from '@/assets/icons/coin/bitcoin'
import ETH2Icon from '@/assets/icons/coin/eth2'
import TetherIcon from '@/assets/icons/coin/tether'
import TonIcon from '@/assets/icons/coin/ton'
import FPSIcon from '@/assets/icons/footer/fps'
import MIRIcon from '@/assets/icons/footer/mir'
import MNPIcon from '@/assets/icons/footer/mnp'
import YMIcon from '@/assets/icons/footer/YMIcon'
import CardPayments from '@/components/common/footer/card-payments'
import LogoGame from '@/components/common/footer/logo-game'
import { Separator } from '@/components/ui/separator'
import ContactFooter from './contact-footer'

const FooterDesktop = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { lg, xl, xs, sm, isMobile } = useScreen()
  const { isOpenSidebar } = useV2LayoutStore()
  const [openSections, setOpenSections] = useState<{
    support: boolean
    legal: boolean
    information: boolean
  }>({
    support: false,
    legal: false,
    information: false
  })
  const [viewportWidth, setViewportWidth] = useState<number | null>(null)
  const shouldForceMobileContact =
    isOpenSidebar && viewportWidth !== null && viewportWidth < 1240

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const updateWidth = () => {
      setViewportWidth(window.innerWidth)
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)

    return () => {
      window.removeEventListener('resize', updateWidth)
    }
  }, [])
  // const { isAuthenticated } = useAuthStore()

  const isCollapsible = xs || sm

  const toggleSection = (section: 'support' | 'legal' | 'information') => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleClick = () => {
    if (!location.pathname.includes('/')) {
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
    // { name: 'Casino', url: '/casino' },
    // { name: t('menu.home', 'Home'), url: '/' },
    // { name: t('menu.about_us', 'About Us'), url: '/about' },
    // { name: t('menu.affiliate_program', 'Affiliate Program'), url: '/affiliate' },
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

  if (xs || sm) {
    return null
  }

  return (
    <div
      className={cn(
        'w-full mt-[84px] flex flex-col bg-[#191524]  rounded-[10px] p-8 gap-[30px]'
      )}
    >
      <div className="flex items-center justify-between w-full gap-[24px]">
        <div
          className="flex justify-start flex-shrink-0 mt-1 cursor-pointer"
          onClick={() => handleClick()}
        >
          <img
            src={Logo}
            alt="Your Loot"
            width={148}
            height={32}
            className="w-[148px] h-[32px] min-w-[148px] object-contain flex-shrink-0"
          />
        </div>
        <div className="bg-[#2A2242] h-[1px]  w-full" />
        <LanguagePopover
          className="!w-[111px] h-[40px] cursor-pointer !mt-0 !mb-0 !rounded-[6px]"
          triggerClassName="justify-start gap-2 px-[12px] p-5"
          contentClassName="w-[250px] p-4 pb-2"
          contentAlign="end"
          contentAlignOffset={8}
          contentSideOffset={6}
        />
      </div>
      <div className="flex flex-col gap-10">
        <div
          className={cn(
            'flex items-start gap-5',
            lg || xl ? 'flex-row justify-between' : 'flex-col',
            shouldForceMobileContact && (lg || xl) && 'flex-wrap'
          )}
        >
          <div
            className={cn(
              'flex gap-10',
              isCollapsible ? 'flex-col w-full' : 'flex-row w-full'
            )}
          >
            <div
              className={cn(
                'flex flex-col items-start justify-start flex-1 gap-4',
                !isCollapsible && 'min-w-[140px]'
              )}
            >
              <div
                className={cn(
                  'text-app-medium-14 flex items-center justify-between w-full   ',
                  isCollapsible && 'cursor-pointer'
                )}
                onClick={() => isCollapsible && toggleSection('support')}
              >
                <span className=" text-[#F9F7FF] text-app-medium-14">
                  Support
                </span>
                {isCollapsible && (
                  <ArrowDown2
                    className={cn(
                      'w-3 h-3 transition-transform duration-200 flex-shrink-0',
                      openSections.support && 'rotate-180'
                    )}
                  />
                )}
              </div>
              {(openSections.support || !isCollapsible) &&
                line1Item.map((x, index) => (
                  <div
                    css={stylesItem()}
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
              <div
                className={cn(
                  'text-app-medium-14 flex items-center justify-between w-full   ',
                  isCollapsible && 'cursor-pointer'
                )}
                onClick={() => isCollapsible && toggleSection('legal')}
              >
                <span className=" text-[#F9F7FF] text-app-medium-14">
                  Legal
                </span>
                {isCollapsible && (
                  <ArrowDown2
                    className={cn(
                      'w-3 h-3 transition-transform duration-200 flex-shrink-0',
                      openSections.legal && 'rotate-180'
                    )}
                  />
                )}
              </div>
              {(openSections.legal || !isCollapsible) &&
                line2Item.map((x, index) => (
                  <div
                    css={stylesItem()}
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
              <div
                className={cn(
                  'text-app-medium-14 flex items-center justify-between w-full   ',
                  isCollapsible && 'cursor-pointer'
                )}
                onClick={() => isCollapsible && toggleSection('information')}
              >
                <span className=" text-[#F9F7FF] text-app-medium-14">
                  Infomation
                </span>
                {isCollapsible && (
                  <ArrowDown2
                    className={cn(
                      'w-3 h-3 transition-transform duration-200 flex-shrink-0',
                      openSections.information && 'rotate-180'
                    )}
                  />
                )}
              </div>
              {(openSections.information || !isCollapsible) &&
                footerLinks.map((x, index) => (
                  <div
                    css={stylesItem()}
                    className="cursor-pointer text-app-brand-medium text-app-medium-14"
                    key={index}
                    onClick={() => navigate(x.url)}
                  >
                    {x.name}
                  </div>
                ))}
            </div>
          </div>
          <div
            className={cn(
              'flex flex-col gap-[10px]',
              shouldForceMobileContact ? 'w-full' : lg || xl ? '' : 'w-full'
            )}
          >
            <ContactFooter
              forceMobileLayout={shouldForceMobileContact}
              onMessageClick={() => {
                window.open(YourLootSupportBotLink, '_blank')
              }}
            />
          </div>
        </div>
        <Separator className="bg-[#2A2242] h-[3px] " />
      </div>

      <div className="flex justify-between items-center w-full gap-[24px]">
        {!isMobile && <LogoGame />}
        <div className="w-[86px] min-w-[86px]">
          <img className="" src={Logo2} />
        </div>
        {!isMobile && (
          <div className="flex  items-center w-full gap-[24px] flex-wrap ">
            <div className="flex gap-2">
              <TonIcon className="!w-6 !h-6" />
              <BitCoinIcon className="!w-6 !h-6" />
              <ETH2Icon className="!w-6 !h-6" />
              <TetherIcon className="!w-6 !h-6" />
              <MIRIcon className="!w-6 !h-6" />
            </div>
            <div className="flex gap-2">
              <FPSIcon className="!w-6 !h-6" />
              <YMIcon className="!w-6 !h-6" />
              <MNPIcon className="!w-6 !h-6" />
              <CardPayments />
            </div>
          </div>
        )}
      </div>
      <Separator className="bg-[#2A2242] h-[3px] w-full" />

      <div className="inline-flex flex-col items-start justify-start gap-6 ">
        <div className="text-start text-[#9E90CF] text-app-medium-12 ">
          {t(
            'footer.company_info',
            'The Service is owned by Cintra Soft Ltd. a limited liability company registered in British Virgin Islands with company registration number 2151527 with registered address at 1st Floor, Columbus Centre, PO Box 2283, Road Town Tortola VG 1110, British Virgin Islands ("Company"), licensed in the State of Anjouan under the Computer Gaming Licensing Act 007 of 2005.'
          )}
        </div>
        <div className="text-start text-[#9E90CF] text-app-medium-12 ">
          {'© ' + new Date().getFullYear() + ' YourLoot. All Rights Reserved.'}
        </div>
      </div>
    </div>
  )
}

export default FooterDesktop

const stylesItem = () => {
  return css`
    border-radius: 10px;
    &:hover {
      background: radial-gradient(
        103.94% 265.37% at 59.95% -118.74%,
        rgba(101, 78, 200, 0.4) 0%,
        rgba(55, 40, 100, 0.4) 100%
      );
      cursor: pointer;
      transition: all 0.2s ease;
    }
  `
}
