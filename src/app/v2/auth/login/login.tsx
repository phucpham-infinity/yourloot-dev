import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'

import CustomButton from '@/components/common/custom-button'

import { FormBuilder } from '@/components/common/form-builder'
import {
  useUserPlatformEvent,
  useScreen,
  useToast,
  useTelegramMiniApp
} from '@/hooks'
import { authController, registrationController } from '@/services/controller'
import { useAuthStore, useRegisterStore } from '@/store'
import clsx from 'clsx'
// import authLogin from '/public/images/v2/auth/auth-login.png'

import banner_UZ from '/public/images/v2/banner-auth/login-UZ.png'
import banner_RU from '/public/images/v2/banner-auth/login-RU.png'
import banner_EN from '/public/images/v2/banner-auth/login-EN.png'
import { utf8ToBase64 } from '@/lib/tele-widget'
import { httpClient } from '@/services/api'
import CustomTelegramLogin from '../CustomTelegramLogin'
import { DialogAuth } from '@/app/v2/auth/dialog-auth'

export default function SignInV2() {
  const navigate = useNavigate()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const formRef = useRef<any>(null)
  const { setAccessToken, isAuthenticated, setUserId, setUser } = useAuthStore()
  const { providersTelegram, setStep, setProvidersTelegram } =
    useRegisterStore()
  const [searchParams] = useSearchParams()
  const { t, i18n } = useTranslation()
  const toast = useToast()

  const { useLoginMutation } = authController()
  const { isMobile } = useScreen()
  const [isShowError, setIsShowError] = useState(false)

  const { useGetProvidersTelegram } = registrationController()
  const { refetch: refetchProviders } = useGetProvidersTelegram()

  const { postUserPlatformEvent } = useUserPlatformEvent()

  const getBanner = (language: string) => {
    const banners = {
      en: banner_EN,
      ru: banner_RU,
      yz: banner_UZ
    }

    return banners[language as keyof typeof banners] || banners['en']
  }

  const authLogin = getBanner(i18n.language)

  const {
    mutate: login,
    isPending: isPendingLogin,
    data: dataLogin,
    error: errorLogin
  } = useLoginMutation()

  const handleSubmitLogin = (data: any) => {
    if (data?.username) {
      localStorage.setItem('email', data.username)
    }
    login({
      username: data.username,
      password: data.password
    })
  }

  useEffect(() => {
    if (dataLogin) {
      setAccessToken(
        dataLogin.content.token,
        dataLogin.content.refreshToken ?? dataLogin.content.token
      )
      setUserId(dataLogin.content.userId)
    }
  }, [dataLogin])

  useEffect(() => {
    if (errorLogin) {
      setIsShowError(true)
      formRef.current?.setError(
        'password',
        <span className="text-red-500 italic">
          {t('login.wrongPassword', 'Invalid email or password')}{' '}
        </span>
      )
    }
  }, [errorLogin])

  const { isTelegramMiniApp, launchParams } = useTelegramMiniApp()
  console.log('launchParams', launchParams)

  const registerTelegram = async (user: any) => {
    console.log('loginTelegramuser', user)
    try {
      setUser({
        first_name: user?.first_name,
        last_name: user?.last_name,
        username: user.username,
        photo_url: user?.photo_url,
        auth_date: user?.auth_date,
        hash: user?.hash,
        isTelegramAuthenticated: true
      })

      const latest = await refetchProviders()
      const latestProviders = latest?.data || providersTelegram
      if (latest?.data) setProvidersTelegram(latest.data)

      const url = `${
        latestProviders?.content?.telegramLoginPath ?? ''
      }&telegram=${utf8ToBase64(user)}`

      const res = await httpClient.get(url, { withCredentials: true })

      const payload = res.data

      setAccessToken(
        payload.content.token,
        payload.content.refreshToken ?? payload.content.token
      )

      setUserId(payload.content.userId)

      if (!res || res.status >= 400) {
        console.error('Telegram register failed', res?.status, payload)
        toast.error(
          (payload && payload.message) || 'Telegram register failed',
          { position: 'top-right' }
        )
        return
      }

      // toast.success('Telegram register success', { position: 'top-right' })
    } catch (e: any) {
      toast.error(e?.message || 'Network error', { position: 'top-right' })
    }
  }

  const handleLoginSuccess = () => {
    postUserPlatformEvent({ eventType: 'login' })
    navigate('/')
  }

  useEffect(() => {
    if (isAuthenticated) {
      const redirectParam = searchParams.get('redirect')
      if (redirectParam) {
        try {
          const redirectUrl = new URL(redirectParam, window.location.origin)
          const currentParams = new URLSearchParams(window.location.search)
          currentParams.delete('redirect')

          currentParams.forEach((value, key) => {
            redirectUrl.searchParams.set(key, value)
          })

          navigate(redirectUrl.pathname + redirectUrl.search, {
            state: { from: 'default' }
          })
        } catch (error) {
          console.error('Invalid redirect URL:', error)
          handleLoginSuccess()
        }
      } else {
        handleLoginSuccess()
      }
    }
  }, [isAuthenticated])

  const renderContent = () => (
    <div className="w-full flex flex-col justify-start items-start">
      <div className="w-full relative">
        <FormBuilder
          gap={20}
          ref={formRef}
          onFocus={() => {
            formRef.current.clearError('username')
          }}
          fields={[
            {
              name: 'username',
              type: 'text',
              label: t('login.email', 'Email'),
              placeholder: t('login.emailPlaceholder', 'example@example.com'),
              colSpan: 12,
              validators: {
                onBlur: ({ value }: any) => {
                  if (!value) {
                    return (
                      <span className="text-red-500">
                        {t('auth.emailRequired', 'Email is required')}
                      </span>
                    )
                  }
                  if (!value.includes('@')) {
                    return (
                      <span className="text-red-500">
                        {t('auth.emailMustContainAt')}
                      </span>
                    )
                  }
                  if (value.length > 255) {
                    return (
                      <span className="text-red-500">
                        {t('auth.emailMaxLength')}
                      </span>
                    )
                  }
                  return null
                }
              }
            },
            {
              name: 'password',
              type: 'text',
              label: t('login.password'),
              placeholder: t('login.passwordPlaceholder'),
              inputType: 'password',
              colSpan: 12,
              validators: {}
            }
          ]}
          onSubmit={handleSubmitLogin}
          defaultValues={{
            username: localStorage.getItem('email') || '',
            password: ''
          }}
        />
      </div>

      <div className="w-full mt-4 flex flex-col gap-6 overflow-x-hidden">
        <div
          onClick={() => {
            navigate('/auth/forgot-password')
          }}
          className="text-white text-app-medium-14 cursor-pointer hover:underline"
        >
          Reset Password
        </div>

        <CustomButton
          ref={buttonRef}
          onClick={() => {
            formRef.current?.clearError('password')
            setIsShowError(false)
            formRef.current?.submit()
          }}
          className={clsx({ 'mt-5': isShowError })}
          isLoading={isPendingLogin}
          disabled={isPendingLogin}
          label={t('login.loginButton')}
          textAlign="center"
        />

        <div className="text-[#6C6395] text-app-bold-12 flex items-center justify-center gap-2">
          <div className="bg-[#2A2242] w-full h-[1px]"></div>
          <div className="min-w-[70px] text-center">or log in via</div>
          <div className="bg-[#2A2242] w-full h-[1px]"></div>
        </div>

        <CustomTelegramLogin
          isTelegramMiniApp={isTelegramMiniApp}
          launchParams={launchParams?.tgWebAppData}
          registerTelegram={registerTelegram}
          botName={providersTelegram?.content?.telegramBotUsername ?? ''}
        />

        <div className="cursor-pointer flex-col text-center text-[#9E90CF] text-[14px] font-bold">
          <div>{t('login.noAccount')} </div>
          <span
            onClick={() => {
              navigate('/auth/register')
              setStep(1)
            }}
            className="text-white cursor-pointer hover:underline"
          >
            {' '}
            {t('login.registerHere')}{' '}
          </span>
        </div>
      </div>
      <img
        src={authLogin}
        alt="auth-login"
        className="w-full h-[126px] rounded-[10px] mt-[24px]"
      />
    </div>
  )

  if (!isMobile)
    return (
      <DialogAuth
        isOpen={true}
        title={t('login.loginButton')}
        content={renderContent()}
        className="!w-[410px]"
        onClose={() => {
          navigate('/')
        }}
      />
    )

  return renderContent()
}
