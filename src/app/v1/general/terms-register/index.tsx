import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import CustomButton from '@/components/common/custom-button'

import Logo from '@/assets/images/yourloot-logotype-full-horizontal.png'
import LogoMobile from '@/assets/images/yourloot-logotype.png'
import { cn, css } from '@/lib/utils'
import { isDesktop, isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

export default function TermsRegisterPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <div
      css={isMobile ? styledMobile : styledDesktop}
      className={cn('justify-between items-center flex flex-col gap-10', {
        'max-w-[1200px] pt-10 mx-auto': isDesktop,
        'w-full p-5 rounded-lg border border-red-500 mb-5': isMobile
      })}
    >
      <Link className="relative w-full" to="/">
        <img
          src={isMobile ? LogoMobile : Logo}
          alt="Your Loot"
          className={cn({ 'w-[184px]': isDesktop, 'w-10': isMobile })}
        />
      </Link>
      <div className="h-full w-full overflow-hidden">
        <div className="flex-col gap justify-start items-start">
          <div className="flex items-center pb-5 justify-between w-full">
            <div className="text-white text-2xl gap-6 font-black">
              {t('terms.title')}
            </div>
            <CustomButton
              height="40px"
              variant="muted"
              prefixIcon={<ArrowLeftIcon />}
              label="Back"
              className="w-fit flex text-[#9d90cf] gap-3 hover:bg-[#15121D] transition-all duration-300"
              onClick={() => navigate('/')}
            />
          </div>
          <div className="self-stretch rounded-[20px] p-5 h-[600px]  border border-[#413c4a] justify-start items-start overflow-y-auto">
            <iframe
              src="/terms_and_conditions.html"
              width="100%"
              height="100%"
              style={{ border: 'none', color: 'white' }}
            />
          </div>
        </div>
      </div>
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
