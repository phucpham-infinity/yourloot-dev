import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { DialogAuth } from '@/app/v2/auth/dialog-auth'
import CustomButton from '@/components/common/custom-button'
import { FormBuilder } from '@/components/common/form-builder'
import Validate from '@/components/common/validate'
import { useScreen } from '@/hooks/use-screen'
import useToast from '@/hooks/use-toast'
import { cn, css } from '@/lib/utils'
import { backofficeController } from '@/services/controller'
import { registrationController } from '@/services/controller/registration'
import { useAuthStore, useProfileStore } from '@/store'
import { useRegisterStore } from '@/store/slices/register'
import { getUnixTime } from 'date-fns'
import { EmailConfirmRegisterCodeV2 } from '../email-confirm-register-code'

//banner

import banner_EN from '/public/images/v2/banner-auth/signup-EN.png'
import banner_RU from '/public/images/v2/banner-auth/signup-RU.png'
import banner_UZ from '/public/images/v2/banner-auth/signup-UZ.png'

import { useTelegramMiniApp, useUserPlatformEvent } from '@/hooks'
import { utf8ToBase64 } from '@/lib/tele-widget'
import { httpClient } from '@/services/api'
import CustomTelegramLogin from '../CustomTelegramLogin'
import m_banner_EN from '/public/images/v2/banner-auth/signup-m-EN.png'
import m_banner_RU from '/public/images/v2/banner-auth/signup-m-RU.png'
import m_banner_UZ from '/public/images/v2/banner-auth/signup-m-UZ.png'

const generateRandomPhone = () => {
  return Math.floor(Math.random() * 9000000000 + 1000000000).toString()
}

const getDefaultBrowserLang = () => {
  const raw =
    typeof navigator !== 'undefined'
      ? (navigator as any)?.languages?.[0] || (navigator as any)?.language
      : 'en'
  const base = (raw ?? 'en').split('-')[0].toLowerCase()
  // Map browser language -> app language codes
  if (base === 'en' || base === 'ru' || base === 'es') return base
  if (base === 'uz') return 'yz' // Uzbek → yz
  if (base === 'kk') return 'kz' // Kazakh → kz
  if (base === 'az') return 'az' // Azerbaijani → az
  return 'en'
}

export default function SignUpV2() {
  const navigate = useNavigate()
  const toast = useToast()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { ip: userIp } = useProfileStore()
  const { isMobile } = useScreen()
  const { isTelegramMiniApp, launchParams } = useTelegramMiniApp()

  const { t, i18n } = useTranslation()

  const formRef = useRef<any>(null)

  console.log(
    'getDefaultBrowserLang',
    navigator.languages,
    getDefaultBrowserLang()
  )

  const { useRegisterV2Mutation, useGetProvidersTelegram } =
    registrationController()
  const {
    providersTelegram,
    setUserId,
    setEmail,
    setPromoCode,
    promoCode,
    step,
    setStep,
    setProvidersTelegram
  } = useRegisterStore()

  const { refetch: refetchProviders } = useGetProvidersTelegram()

  const { useGetBackofficeAffiliate, useGetBackofficeUtm } =
    backofficeController()
  const { mutate: postBackofficeAffiliate } = useGetBackofficeAffiliate()
  const { mutate: postBackofficeUtm } = useGetBackofficeUtm()

  const [searchParams] = useSearchParams()
  // const [isAgree, setIsAgree] = useState(false)
  // const [isConfirm, setIsConfirm] = useState(false)
  const [isShowError, setIsShowError] = useState(false)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const [validate, setValidate] = useState({
    isValidateEnglish: false,
    isValidateLength: false,
    isValidateUppercase: false,
    isValidateNumber: false
  })

  const {
    mutate: register,
    isPending: isRegisterPending,
    data: dataRegister,
    error: errorRegister
  } = useRegisterV2Mutation()

  useEffect(() => {
    if (errorRegister) {
      toast.error(
        errorRegister?.content?.message ??
          'Oops! Attempt failed! Please try again 😊',
        {
          position: 'top-right'
        }
      )
    }
  }, [errorRegister])

  const showOTPEmailDialog = () => {
    setStep(2)
  }

  useEffect(() => {
    if (dataRegister?.content?.userId) {
      setUserId(dataRegister?.content?.userId)
      showOTPEmailDialog()
      if (
        dataRegister?.content?.userId &&
        (searchParams.get('stag') ||
          searchParams.get('tr_src') ||
          searchParams.get('tracking_link') ||
          searchParams.get('source_link') ||
          searchParams.get('visit_id') ||
          searchParams.get('sub') ||
          searchParams.get('sub_id1') ||
          searchParams.get('sub_id2'))
      ) {
        postBackofficeAffiliate({
          userId: dataRegister?.content?.userId,
          trackingLink: searchParams.get('tracking_link') ?? '',
          sourceLink: searchParams.get('source_link') ?? window.location.href,
          visitId: searchParams.get('visit_id') ?? '',
          sub: searchParams.get('sub') ?? '',
          stag: searchParams.get('sub_id1') ?? searchParams.get('stag') ?? '',
          trSrc: searchParams.get('sub_id2') ?? searchParams.get('tr_src') ?? ''
        })
      }

      if (dataRegister?.content?.userId && searchParams.get('utm_source')) {
        postBackofficeUtm({
          userId: dataRegister?.content?.userId,
          utmSource: searchParams.get('utm_source') ?? '',
          utmCampaign: searchParams.get('utm_campaign') ?? '',
          utmMedium: searchParams.get('utm_medium') ?? '',
          utmContent: searchParams.get('utm_content') ?? '',
          sourceLink: searchParams.get('source_link') ?? window.location.href
        })
      }
    }
  }, [dataRegister])

  const handleSubmit = (data: any) => {
    setEmail(data?.email)

    register({
      username: data?.email,
      email: data?.email,
      password: data?.password,
      firstName: 'YourLootPlayer' + getUnixTime(new Date()),
      lastName: 'YourLootPlayer' + getUnixTime(new Date()),
      phoneNumber: generateRandomPhone() ?? '',
      language: getDefaultBrowserLang(),
      currency: 'RUB',
      userIp: userIp ?? '',

      sourceLink: searchParams.get('source_link') ?? window.location.href,
      promoCode: promoCode ?? ''
    })
  }

  const getBanner = (language: string, isMobile: boolean) => {
    const banners = {
      en: isMobile ? m_banner_EN : banner_EN,
      ru: isMobile ? m_banner_RU : banner_RU,
      yz: isMobile ? m_banner_UZ : banner_UZ
    }

    return banners[language as keyof typeof banners] || banners['en']
  }

  const imageBanner = getBanner(i18n.language, isMobile)

  const {
    setAccessToken,
    isAuthenticated,
    setUserId: setUserIdAuth,
    setUser
  } = useAuthStore()

  const registerTelegram = async (user: any) => {
    console.log('registerTelegramuser', user)
    try {
      setUser({
        id: user?.id ?? '',
        first_name: user?.first_name ?? '',
        last_name: user?.last_name ?? '',
        username: user?.username ?? '',
        photo_url: user?.photo_url ?? '',
        auth_date: user?.auth_date ?? '',
        hash: user?.hash ?? '',
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
      setUserIdAuth(payload.content.userId)

      if (!res || res.status >= 400) {
        console.error('Telegram register failed', res?.status, payload)
        toast.error(
          (payload && payload.message) || 'Telegram register failed',
          { position: 'top-right' }
        )
        return
      }
    } catch (e: any) {
      toast.error(e?.message || 'Network error', { position: 'top-right' })
    }
  }

  const { postUserPlatformEvent } = useUserPlatformEvent()

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

  useEffect(() => {
    i18n.changeLanguage('ru')
  }, [])

  const renderContent = () => (
    <div className={cn('flex w-full h-full gap-6', isMobile && 'gap-0 h-fit')}>
      <div
        className={cn('w-full h-full', !isMobile && step == 1 && 'w-[306px]')}
      >
        {step === 1 && (
          <>
            {isMobile && (
              <div className="relative w-full h-[126px] mb-6">
                <div className="flex z-10 flex-col items-start gap-2 absolute top-1/2 left-[24px] -translate-y-1/2"></div>
                <img
                  className="absolute w-full rounded-[10px] md:hidden block h-[126px] mb-6"
                  src={imageBanner}
                />
              </div>
            )}

            <div className={cn('w-full overflow-y-hidden')}>
              {/* <div className="text-app-medium-14 text-white mb-[10px] font-bold">
                {t('register.language')}
              </div>
              <LanguagePopover
                className="w-full h-[40px] cursor-pointer !mt-0 mb-4"
                triggerClassName="justify-start gap-2 px-4 rounded-[10px]"
                contentClassName="!w-[306px] h-full p-4 pb-2"
                contentAlign="start"
                contentSideOffset={10}
              /> */}
              <div className="relative w-full">
                <FormBuilder
                  gap={16}
                  ref={formRef}
                  onFocus={() => {
                    formRef.current.clearError('email')
                    formRef.current.clearError('password')
                  }}
                  fields={[
                    // {
                    //   name: 'currency',
                    //   type: 'select',
                    //   label: t('register.preferredCurrency'),
                    //   placeholder: t('register.selectCur'),
                    //   colSpan: 12,
                    //   validators: {
                    //     onSubmit: ({ value }: any) => {
                    //       if (!value) {
                    //         return (
                    //           <span className="text-red-500">
                    //             {t('register.selectCurrency')}
                    //           </span>
                    //         )
                    //       }
                    //       return false
                    //     }
                    //   },
                    //   options: [
                    //     // {
                    //     //   label: 'USD',
                    //     //   value: 'USD'
                    //     // },
                    //     // {
                    //     //   label: 'EUR',
                    //     //   value: 'EUR'
                    //     // },
                    //     {
                    //       label: 'UZS',
                    //       value: 'UZS'
                    //     },
                    //     // {
                    //     //   label: 'KZT',
                    //     //   value: 'KZT'
                    //     // },
                    //     {
                    //       label: 'RUB',
                    //       value: 'RUB'
                    //     }
                    //     // {
                    //     //   label: 'GEL',
                    //     //   value: 'GEL'
                    //     // },
                    //     // {
                    //     //   label: 'AMD',
                    //     //   value: 'AMD'
                    //     // },
                    //     // {
                    //     //   label: 'AZN',
                    //     //   value: 'AZN'
                    //     // }
                    //   ]
                    // },
                    {
                      name: 'email',
                      type: 'text',
                      label: t('register.email'),
                      placeholder: t('register.emailPlaceholder'),
                      colSpan: 12,
                      validators: {
                        onBlur: ({ value }: any) => {
                          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                          if (!value) {
                            return (
                              <span className="text-red-500">
                                {t('register.emailRequired')}
                              </span>
                            )
                          }
                          if (!emailRegex.test(value)) {
                            return (
                              <span className="text-red-500">
                                {t('register.invalidEmail')}
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
                      label: t('register.password'),
                      placeholder: t('register.passwordPlaceholder'),
                      inputType: 'password',
                      colSpan: 12,

                      validators: {
                        onChange: ({ value }: any) => {
                          if (!value) {
                            setPasswordError(null)
                            return
                          }

                          const newValidate = { ...validate }

                          newValidate.isValidateEnglish = /^[A-Za-z0-9]+$/.test(
                            value
                          )
                          newValidate.isValidateLength = value.length >= 8
                          newValidate.isValidateNumber = /\d/.test(value)
                          newValidate.isValidateUppercase =
                            /[A-Z]/.test(value) && /[a-z]/.test(value)

                          setValidate(newValidate)

                          if (!Object.values(newValidate).every(Boolean)) {
                            setPasswordError(
                              "Password doesn't meet all requirements."
                            )
                            setIsShowError(true)
                          } else {
                            setIsShowError(false)
                            setPasswordError(null)
                          }
                        }
                      },
                      customError: passwordError,
                      renderDescription: (content) => (
                        <div className="w-full text-right text-[#6b6294] text-[10px] font-bold">
                          {content}
                        </div>
                      ),
                      dropdownMenu: (
                        <div className="w-fit">
                          <Validate
                            isFocus={true}
                            isValidateEnglish={validate?.isValidateEnglish}
                            isValidateLength={validate?.isValidateLength}
                            isValidateUppercase={validate?.isValidateUppercase}
                            isValidateNumber={validate?.isValidateNumber}
                          />
                        </div>
                      )
                    },
                    {
                      name: 'code',
                      type: 'text',
                      label: t('register.promoCode.title'),
                      placeholder: t('register.promoCode.placeholder'),
                      colSpan: 12,
                      styleItem: {
                        marginTop: isShowError ? '12px' : '0'
                      },
                      validators: {
                        onChange: ({ value }: any) => {
                          setPromoCode(value)
                        }
                      }
                    }
                  ]}
                  onSubmit={handleSubmit}
                  defaultValues={{
                    email: '',
                    password: '',
                    code: ''
                  }}
                />
              </div>

              <div className="w-full mt-6">
                <CustomButton
                  ref={buttonRef}
                  isLoading={isRegisterPending}
                  onClick={() => {
                    formRef?.current?.submit()
                  }}
                  disabled={
                    isRegisterPending ||
                    !validate?.isValidateEnglish ||
                    !validate?.isValidateLength ||
                    !validate?.isValidateUppercase ||
                    !validate?.isValidateNumber
                  }
                  label={t('register.registerButton')}
                  textAlign="center"
                />
              </div>

              <div className="flex flex-col w-full gap-2 mt-3 h-fit">
                <div className="flex items-center justify-start gap-2">
                  {/* <Checkbox
                    name="isAgree"
                    id="isAgree"
                    className="data-[state=checked]:bg-[#D9CFF8] cursor-pointer"
                    checkIconStyle={{
                      color: isAgree ? '#644EC7' : '#9E90CF'
                    }}
                    value={isAgree.toString()}
                    onCheckedChange={(checked) => {
                      setIsAgree(checked === 'indeterminate' ? false : checked)
                    }}
                  /> */}
                  <div className="text-[14px] font-medium text-[#9E90CF]">
                    {t(
                      'register.signUpConfirm18Agree',
                      'By signing up, you confirm you’re 18+ and agree to the'
                    )}
                    <a
                      href="/terms-and-conditions"
                      className="underline text-[#FFFFFF] ml-[5px] hover:opacity-80 transition-colors"
                    >
                      {t('register.termsAndConditions')}
                    </a>
                  </div>
                </div>
                {/* <div className="flex items-center justify-start gap-2">
                  <Checkbox
                    name="isConfirm"
                    id="isConfirm"
                    className="data-[state=checked]:bg-[#D9CFF8] cursor-pointer"
                    checkIconStyle={{
                      color: isConfirm ? '#644EC7' : '#9E90CF'
                    }}
                    value={isConfirm.toString()}
                    onCheckedChange={(checked) => {
                      setIsConfirm(
                        checked === 'indeterminate' ? false : checked
                      )
                    }}
                  />

                  <div className="text-[14px] font-medium text-[#9E90CF]">
                    {t('register.confirmAge')}
                  </div>
                </div> */}
              </div>
            </div>

            <div className="w-full flex flex-col gap-6 mt-6">
              <div className="text-[#6C6395] text-app-bold-12 flex items-center justify-center gap-2">
                <div className="bg-[#2A2242] w-full h-[1px]"></div>
                <div className="min-w-[80px] text-center">or sign up via</div>
                <div className="bg-[#2A2242] w-full h-[1px]"></div>
              </div>

              <CustomTelegramLogin
                isTelegramMiniApp={isTelegramMiniApp}
                launchParams={launchParams?.tgWebAppData}
                registerTelegram={registerTelegram}
                botName={providersTelegram?.content?.telegramBotUsername ?? ''}
              />

              <div className="cursor-pointer flex-col text-center text-[#9E90CF] text-[14px] font-bold">
                <div>{t('register.haveAccount')} </div>
                <span
                  onClick={() => {
                    navigate('/auth/login')
                  }}
                  className="text-white cursor-pointer hover:underline"
                >
                  {t('register.loginHere')}{' '}
                </span>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <EmailConfirmRegisterCodeV2
            onSuccess={() => {
              navigate('/')
              setStep(1)
            }}
          />
        )}
      </div>
      {step == 1 && !isMobile && (
        <>
          <div
            css={stylesRight}
            className={cn(
              'relative grow h-full shrink min-h-[647px] basis-0 self-stretch p-10 bg-black rounded-[20px] flex-col justify-end items-start inline-flex overflow-hidden'
            )}
          >
            <img
              className="absolute z-[1] w-full h-full bottom-0 left-0 right-0"
              src={imageBanner}
            />
          </div>
        </>
      )}
    </div>
  )

  if (!isMobile)
    return (
      <DialogAuth
        isOpen={true}
        title={t('register.registerButton')}
        content={renderContent()}
        className={cn(
          '!w-full ',
          step === 2 ? 'max-w-[350px]!' : 'min-h-[695px]!'
        )}
        dismissible={step === 2 ? false : true}
        hideCloseButton={step === 2 ? true : false}
        onClose={() => {
          if (step === 2) {
            return
          }
          navigate('/')
        }}
      />
    )

  return renderContent()
}

const stylesRight = css`
  width: 306px;
  border: 1px solid #3e3650;

  border-radius: 10px;
  box-shadow: 6px 6px 16px 0px rgba(22, 28, 22, 0.25);
  background: url('/images/register/yourloot-banner-register.png') no-repeat
    center center;
  background-size: cover;
`
