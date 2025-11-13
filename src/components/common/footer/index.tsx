import { cn } from '@/lib/utils'

import Logo2 from '@/assets/images/footer/logo2.png'
import LogoPaymentsMb from '@/assets/images/footer/payments-mb.svg'
import Logo from '@/assets/images/yourloot-logotype-full-horizontal.png'

import MasterCardIcon from '@/assets/images/footer/masterCard.png'
import MNPIcon from '@/assets/images/footer/mnp.png'
import VisaIcon from '@/assets/images/footer/visa.png'

import C1Icon from '@/assets/images/footer/c1.png'
import C2Icon from '@/assets/images/footer/c2.png'
import C3Icon from '@/assets/images/footer/c3.png'
import C4Icon from '@/assets/images/footer/c4.png'
import { clsx } from 'clsx'
import { useEffect } from 'react'
import { isDesktop } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import CustomButton from '../custom-button'
import FooterV2 from './footerV2'

export default function Footer({ className }: { className?: string }) {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const line1Item = [
    // { name: 'Casino', url: '/casino' },
    { name: t('menu.home'), url: '/' },
    { name: t('menu.about_us'), url: '/about' },
    { name: t('menu.affiliate_program'), url: '/affiliate' },
    { name: t('menu.contact_us'), url: '/contact' },
    { name: t('menu.faq'), url: '/faq' }
  ]
  const footerLinks = [
    { name: t('footer.privacy_policy'), url: '/privacy-policy' },
    { name: t('footer.terms_conditions'), url: '/terms-and-conditions' },
    { name: t('footer.cookie_policy'), url: '/kyc-policy' },
    { name: t('footer.responsible_gaming'), url: '/responsible-gaming' },
    { name: t('footer.loyalty_program'), url: '/loyalty-program' },
    { name: t('footer.bonus_tc'), url: '/bonus-terms-conditions' }
  ]

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      (window as any).anj_5d6911d3_8548_4aeb_8508_7779bfd449f7
    ) {
      ;(window as any).anj_5d6911d3_8548_4aeb_8508_7779bfd449f7.init()
    }
  }, [])

  const handleClick = () => {
    if (location.pathname === '/') {
      // Already on home page, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // Not on home, navigate to home
      navigate('/')
    }
  }

  if (window?.location?.pathname?.startsWith('/')) return <FooterV2 />

  return isDesktop ? (
    <div
      className={cn(
        'w-full max-w-[1200px] mx-auto overflow-hidden mt-10',
        className
      )}
    >
      <div className="flex-col justify-start items-center gap-[50px] inline-flex">
        <div className="cursor-pointer" onClick={() => handleClick()}>
          <img src={Logo} alt="Your Loot" className="w-[256px]" />
        </div>
        <div className="inline-flex flex-col items-center justify-start w-full h-6 gap-5">
          <div className="inline-flex items-start justify-between w-full h-6">
            <div className="w-[86px] min-w-[86px]">
              <div
                className="w-6 h-6"
                id="anj-5d6911d3-8548-4aeb-8508-7779bfd449f7"
                data-anj-seal-id="5d6911d3-8548-4aeb-8508-7779bfd449f7"
                data-anj-image-size="128"
                data-anj-image-type="basic-small"
              ></div>
            </div>
            <div className="inline-flex flex-row items-center justify-center gap-5">
              <img className="h-6" src={VisaIcon} />
              <img className="h-6" src={MasterCardIcon} />
              <img className="h-6" src={MNPIcon} />
              <img className="h-6" src={C1Icon} />
              <img className="h-6" src={C2Icon} />
              <img className="h-6" src={C3Icon} />
              <img className="h-6" src={C4Icon} />
            </div>
            <div className="w-[86px] min-w-[86px]">
              <img className="" src={Logo2} />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start w-full gap-5">
          <div className="flex flex-row items-center justify-between w-full gap-5 ">
            <div className="text-xs font-medium text-center text-white">
              {t('menu.casino')}
            </div>
            <div className="flex flex-row flex-1 gap-5">
              {line1Item.map((x, index) => (
                <div className={cn(x.name === 'FAQ', 'flex-1')} key={index * 3}>
                  <CustomButton
                    label={x.name}
                    variant="invisible"
                    className="w-full"
                    onClick={() => navigate(x.url)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-row items-center justify-between w-full gap-5">
            <div className="text-xs font-medium text-center text-white">
              {t('menu.legal')}
            </div>
            <div className="flex flex-row flex-1 gap-5">
              {footerLinks.map((x, index) => (
                <div
                  className={'flex flex-1 items-center justify-center'}
                  key={index * 2}
                >
                  <CustomButton
                    label={x.name}
                    variant="invisible"
                    onClick={() => navigate(x.url)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-col justify-center items-center gap-5 inline-flex pb-[50px]">
          <div className="text-center text-[#413d58] text-[10px] font-bold">
            The Service is owned by Cintra Soft Ltd. a limited liability company
            registered in British Virgin Islands with company registration
            number 2151527 with registered address at 1st Floor, Columbus
            Centre, PO Box 2283, Road Town Tortola VG 1110, British Virgin
            Islands (“Company”), licensed in the State of Anjouan under the
            Computer Gaming Licensing Act 007 of 2005.
          </div>
          <div className="text-center text-[#413d58] text-[10px] font-bold">
            © 2025 YourLoot
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      className={cn(
        'w-full max-w-[94vw] mx-auto overflow-hidden mt-10 flex flex-col gap-[50px]',
        className
      )}
    >
      <div className="flex justify-center w-full" onClick={() => handleClick()}>
        <img src={Logo} alt="Your Loot" className="w-[256px]" />
      </div>
      <div className="flex justify-between w-full">
        <div className="w-[86px] min-w-[86px]">
          <div
            className="w-6 h-6"
            id="anj-5d6911d3-8548-4aeb-8508-7779bfd449f7"
            data-anj-seal-id="5d6911d3-8548-4aeb-8508-7779bfd449f7"
            data-anj-image-size="128"
            data-anj-image-type="basic-small"
          ></div>
        </div>
        <div className="w-[86px] min-w-[86px]">
          <img className="" src={Logo2} />
        </div>
      </div>
      <div className="flex justify-center w-full">
        <img src={LogoPaymentsMb} alt="Your Loot" className="w-full" />
      </div>
      <div className="flex items-start justify-center w-full gap-5 px-5">
        <div className="flex flex-col items-center justify-center flex-1 gap-5 text-center">
          {line1Item.map((x, index) => (
            <div
              className={clsx('text-app-brand-medium text-app-medium-12', {
                'text-white': index === 0
              })}
              key={index}
              onClick={() => navigate(x.url)}
            >
              {x.name}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center flex-1 gap-5 text-center">
          {footerLinks.map((x, index) => (
            <div
              className={clsx('text-app-brand-medium text-app-medium-12', {
                'text-white': index === 0
              })}
              key={index}
              onClick={() => navigate(x.url)}
            >
              {x.name}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-col justify-center items-center gap-5 inline-flex px-10 pb-[50px]">
        <div className="text-center text-[#413d58] text-[10px] font-bold">
          The Service is owned by Cintra Soft Ltd. a limited liability company
          registered in British Virgin Islands with company registration number
          2151527 with registered address at 1st Floor, Columbus Centre, PO Box
          2283, Road Town Tortola VG 1110, British Virgin Islands (“Company”),
          licensed in the State of Anjouan under the Computer Gaming Licensing
          Act 007 of 2005.
        </div>
        <div className="text-center text-[#413d58] text-[10px] font-bold">
          © 2025 YourLoot
        </div>
      </div>
    </div>
  )
}
