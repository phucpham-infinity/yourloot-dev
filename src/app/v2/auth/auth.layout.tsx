import CloseIcon from '@/assets/icons/close'
import { BasicDialog } from '@/components/common/basic-dialog'
import { CustomDialog } from '@/components/common/custom-dialog'
import { Separator } from '@/components/ui/separator'
import { BasicDialogV2 } from '@/components/v2/dialog'
import { gameController, walletsController } from '@/services/controller'
import { useAuthStore, useProfileStore } from '@/store'
import { css } from '@emotion/react'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import HomeV2 from '../home'
import HeaderV2 from '@/components/common/header-footer/headerV2'
import { cn } from '@/lib/utils'
import { isMobile } from 'react-device-detect'
import SafeAreaTelegramMiniApp from '@/components/v2/safearea-telegram-miniapp'
import { registrationController } from '@/services/controller/registration'
import { useRegisterStore } from '@/store/slices/register'

export default function AuthLayoutV2() {
  const { pathname } = useLocation()
  const { userId } = useAuthStore()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { data: ip } = gameController().getMyIp()
  const { setIp } = useProfileStore()
  const { useGetUserWallets } = walletsController()
  useGetUserWallets(userId!)
  const { useGetProvidersTelegram } = registrationController()
  const { data: dataProviders } = useGetProvidersTelegram()
  const { setProvidersTelegram } = useRegisterStore()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    if (ip) {
      setIp(ip)
    }
  }, [ip])

  useEffect(() => {
    if (dataProviders) {
      setProvidersTelegram(dataProviders)
    }
  }, [dataProviders])

  const title = useMemo(() => {
    if (pathname === '/auth/login') {
      return t('login.loginButton', 'Login')
    }
    if (pathname === '/auth/register') {
      return t('register.registerButton', 'Register')
    }
    if (pathname === '/auth/forgot-password') {
      return t('auth.forgotPassword', 'Forgot password')
    }
    if (pathname === '/auth/restore-password') {
      return t('auth.restorePassword', 'Restore password')
    }
    return ''
  }, [pathname])

  return (
    <SafeAreaTelegramMiniApp
      css={styles}
      className="overflow-y-hidden relative min-h-screen"
    >
      <div
        className={cn(
          'absolute top-0 left-0 w-full h-full filter blur-md overflow-y-hidden',
          isMobile && ''
        )}
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
        }}
      >
        <HeaderV2 />
        <div className="w-full h-full p-4">
          <HomeV2 isHomePage={false} />
        </div>
      </div>
      <div
        className={cn(
          'fixed bg-[#0B0A11] bottom-0  h-[80dvh] right-0 left-0 w-full flex flex-col justify-start items-start text-[16px] font-medium border-app-default rounded-tl-[10px] rounded-tr-[10px]',
          !isMobile && 'bg-transparent!'
        )}
      >
        {isMobile && (
          <>
            <div className="w-full h-12 relative text-white text-center">
              <div className="text-app-medium-16 w-full h-full flex items-center justify-center">
                {title}
              </div>
              <div
                onClick={() => {
                  navigate('/')
                }}
                className="p-3 w-3 h-3 absolute right-6 top-4"
              >
                <CloseIcon className="w-3 h-3 absolute right-0 top-0" />
              </div>
            </div>

            <Separator className="h-[1px] bg-[#2A2242]" />
          </>
        )}
        <div className="w-full py-[24px] px-[16px] overflow-y-scroll scroll-bar-yloot ">
          <Outlet />
        </div>
      </div>

      <CustomDialog />
      <BasicDialog />
      <BasicDialogV2 />
      <Toaster
        visibleToasts={1}
        swipeDirections={['top', 'left', 'right', 'bottom']}
      />
    </SafeAreaTelegramMiniApp>
  )
}

const styles = css`
  background: #000;
  overflow: hidden;
`
