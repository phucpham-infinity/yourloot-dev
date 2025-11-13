import { useAuthStore, useRegisterStore } from '@/store'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import BalanceSwitcher from './BalanceSwitcher'
import YLCoins from './YLCoins'
import Drawer from './drawer'

import Menu2Icon from '@/assets/icons/menu'
import UserAvatar from '@/assets/images/header/avatar.png'
import Logo from '@/assets/images/yourloot-logotype-full-horizontal.png'
import CustomButton from '@/components/common/custom-button'
import { useScreen } from '@/hooks'
import { css, WIDTH_SIDEBAR, WIDTH_SIDEBAR_EXPANDED } from '@/lib/utils'
import { useV2LayoutStore } from '@/store/slices/v2/layout.store'
import clsx from 'clsx'

export default function HeaderDesktop() {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuthStore()
  const { isOpenSidebar } = useV2LayoutStore()
  const { t } = useTranslation()
  const { setStep } = useRegisterStore()
  const { lg, xl, size } = useScreen()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const handleDepositClick = useCallback(() => {
    if (!isAuthenticated) {
      navigate('/auth/login')
      return
    }
    navigate('/payment/deposit')
  }, [isAuthenticated, navigate])

  const handleProfileClick = useCallback(() => {
    if (!isAuthenticated) {
      navigate('/auth/login')
      return
    }
    navigate('/profile')
  }, [isAuthenticated, navigate])

  return (
    <div
      style={{
        left:
          lg || xl
            ? isOpenSidebar
              ? WIDTH_SIDEBAR_EXPANDED
              : WIDTH_SIDEBAR
            : '0',
        right: 0
      }}
      className="h-[68px] overflow-visible fixed top-0 bg-[#040305] z-[11] transition-all duration-500"
    >
      <div className="px-[48px] py-[14px] flex flex-row items-center justify-between w-full h-full">
        <div className="flex items-center gap-4">
          <Menu2Icon
            onClick={() => setIsDrawerOpen(true)}
            className={clsx(
              'w-5 h-5 cursor-pointer hidden mr-4',
              size === 'md' && 'block!'
            )}
          />
          <div
            onClick={() => navigate('/')}
            className="h-8 cursor-pointer w-36"
          >
            <img
              src={Logo}
              alt={t('common.logo', 'YourLoot')}
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        {isAuthenticated ? (
          <div className="flex flex-row items-center justify-start gap-6">
            <div className="flex flex-row items-center justify-start gap-2">
              <BalanceSwitcher />
              <YLCoins />
              <div css={customButtonStyle()}>
                <CustomButton
                  label={t('common.topUp', 'Top Up')}
                  variant="default"
                  onClick={handleDepositClick}
                  className="!h-[38px] !px-4 !py-3"
                />
              </div>
            </div>

            <div
              className="w-10 h-10 cursor-pointer"
              onClick={handleProfileClick}
            >
              <div className="flex items-center justify-center w-full h-full overflow-hidden border border-transparent rounded-full bg-gradient-to-b from-indigo-300 via-purple-400 to-stone-300">
                <img
                  src={user?.photo_url ?? UserAvatar}
                  alt={t('common.profile', 'Profile')}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-start gap-6">
            <div className="inline-flex w-auto gap-2">
              <div
                css={styles1()}
                onClick={() => {
                  setStep(1)
                  navigate('/auth/login')
                }}
                className="flex cursor-pointer items-center justify-center border-app-default h-10 rounded-[10px] py-[16px] px-[20px] text-[#9E90CF] text-app-medium-14 font-medium"
              >
                {t('login.loginButton')}
              </div>
              <div
                css={styles2()}
                onClick={() => {
                  setStep(1)
                  navigate('/auth/register')
                }}
                className="flex cursor-pointer items-center justify-center border-app-default h-10 rounded-[10px] py-[16px] px-[20px] text-[#D9CEFF] text-app-medium-14 font-medium"
              >
                {t('register.registerButton')}
              </div>
            </div>
          </div>
        )}
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  )
}

const styles1 = () => {
  return css`
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.1) 100%
    );
  `
}

const styles2 = () => {
  return css`
    background: radial-gradient(
      88.61% 265.18% at 59.95% -118.74%,
      #654ec8 0%,
      #372864 100%
    );
  `
}

const customButtonStyle = () => {
  return css`
    button {
      background: #6ef51a !important;
      border: 1px #c3a2f1 !important;

      &:hover {
        background: #5dd015 !important;
      }

      .label {
        color: var(--YourLoot-Brand-Darkest, #0b0a11) !important;
        leading-trim: both;
        text-edge: cap;
        font-family: Inter !important;
        font-size: 14px !important;
        font-style: normal !important;
        font-weight: 600 !important;
        line-height: 20px !important;
      }
    }
  `
}
