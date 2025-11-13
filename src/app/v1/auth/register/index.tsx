import EyeOff from '@/assets/images/login/view-disable.svg'
import EyeOn from '@/assets/images/login/view-enabled.svg'
import { css } from '@/lib/utils'
import styled from '@emotion/styled'
import clsx from 'clsx'
import { getUnixTime } from 'date-fns'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'

import Logo from '@/assets/images/yourloot-logotype-full-horizontal.png'
import CustomButton from '@/components/common/custom-button'
import { EmailConfirmRegisterCodeDialog } from '@/components/common/email-confirm-register-code'

import bgDark from '@/assets/images/register/light/bg-light-bottm.png'
import bgLight from '@/assets/images/register/light/bg-light.svg'
import banner from '@/assets/images/register/yourloot-banner-register.png'
import { FormBuilder } from '@/components/common/form-builder'
import { LanguageButton } from '@/components/common/language-button'
import Validate from '@/components/common/validate'
import {
  backofficeController,
  promotionsController
} from '@/services/controller'
import { registrationController } from '@/services/controller/registration'
import { useDialogStore } from '@/store'
import { useRegisterStore } from '@/store/slices/register'
import { isDesktop, isMobile } from 'react-device-detect'

const generateRandomPhone = () => {
  return Math.floor(Math.random() * 9000000000 + 1000000000).toString()
}

export default function SignUpV2() {
  const navigate = useNavigate()
  const dialog = useDialogStore()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const promoCodeRef = useRef<any>(null)
  const [disabledApply, setDisabledApply] = useState(true)

  const { t, i18n } = useTranslation()

  const formRef = useRef<any>(null)

  const { useRegisterMutation } = registrationController()
  const { setUserId, setEmail, setPromoCode } = useRegisterStore()
  const { useValidatePromoCodeMutation } = promotionsController()

  const { useGetBackofficeAffiliate, useGetBackofficeUtm } =
    backofficeController()
  const { mutate: postBackofficeAffiliate } = useGetBackofficeAffiliate()
  const { mutate: postBackofficeUtm } = useGetBackofficeUtm()

  const [searchParams] = useSearchParams()
  const [isShowPassword, setIsShowPassword] = useState(false)

  const [validate, setValidate] = useState({
    isValidateEnglish: false,
    isValidateLength: false,
    isValidateUppercase: false,
    isValidateNumber: false
  })

  const [isShowValidate, setIsShowValidate] = useState(false)

  const {
    mutate: register,
    isPending: isRegisterPending,
    data: dataRegister,
    error: errorRegister
  } = useRegisterMutation()

  const {
    mutate: validatePromoCodeMutation,
    isPending: isValidatePromoCodePending
  } = useValidatePromoCodeMutation()

  useEffect(() => {
    if (errorRegister) {
      dialog.openBasicDialog({
        type: 'warning',
        meta: {
          description:
            errorRegister?.content?.message ??
            'Oops! Attempt failed! Please try again 😊',
          button: (
            <div className="w-full">
              <CustomButton
                variant={'default'}
                className="w-full text-center"
                label={'Ok'}
                onClick={() => {
                  dialog.closeBasicDialog()
                }}
              />
            </div>
          )
        }
      })
    }
  }, [errorRegister])

  const showOTPEmailDialog = () => {
    dialog.open({
      width: 390,
      disabledCloseOverlay: false,
      content: (
        <EmailConfirmRegisterCodeDialog
          onSuccess={() => {
            dialog.closeBasicDialog()
            dialog.close()
            navigate('/')
          }}
        />
      )
    })
  }

  useEffect(() => {
    if (dataRegister?.content?.userId) {
      setUserId(dataRegister?.content?.userId)
      showOTPEmailDialog()
      if (
        dataRegister?.content?.userId &&
        searchParams.get('stag') &&
        searchParams.get('tracking_link')
      ) {
        postBackofficeAffiliate({
          userId: dataRegister?.content?.userId,
          stag: searchParams.get('stag') ?? '',
          trSrc: searchParams.get('tr_src') ?? '',
          trackingLink: searchParams.get('tracking_link') ?? '',
          sourceLink: searchParams.get('source_link') ?? window.location.href,
          visitId: searchParams.get('visit_id') ?? '',
          sub: searchParams.get('sub') ?? ''
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
    setEmail(data.email)

    register({
      username: data.email,
      password: data.password,
      email: data.email,
      firstName: 'YourLootPlayer' + getUnixTime(new Date()),
      lastName: 'YourLootPlayer' + getUnixTime(new Date()),
      phoneNumber: generateRandomPhone()
    })
  }

  return (
    <div className="flex gap-5 h-[700px] lg:h-[595px]">
      <div
        className={clsx(
          'grow shrink basis-0 flex-col justify-start items-start inline-flex',
          { 'gap-2.5': isDesktop }
        )}
      >
        {isMobile && (
          <div
            css={stylesTop}
            className={
              'text-white bg-white w-[90vw] p-8 pt-[20px]  h-[18vh] flex flex-col items-start justify-start relative m-w-[90vw]'
            }
          >
            <BannerContent>
              <>
                {i18n.language !== 'ru' && (
                  <GradientText> {t('register.welcomeBonus')}</GradientText>
                )}
                {i18n.language === 'ru' && (
                  <GradientText>
                    {t('register.welcomeBonusMobile1')}
                  </GradientText>
                )}
                {i18n.language === 'ru' && (
                  <GradientText>
                    {t('register.welcomeBonusMobile2')}
                  </GradientText>
                )}
                <SubtitleText>{t('register.depositBonusMobile1')}</SubtitleText>
                <SubtitleText>{t('register.depositBonusMobile2')}</SubtitleText>
              </>
            </BannerContent>
          </div>
        )}
        <div
          css={stylesLeft}
          className={clsx(
            'border flex-col justify-start items-start p-10 gap-[75px] inline-flex overflow-hidden w-full h-full',
            { '!gap-[25px]': isShowValidate }
          )}
        >
          <div className="relative flex items-center justify-between w-full">
            <img className="w-[183px]" src={Logo} />
            <LanguageButton />
          </div>
          <div className="w-full">
            <div className="relative w-full">
              <FormBuilder
                gap={20}
                ref={formRef}
                onFocus={() => {
                  formRef.current.clearError('email')
                  formRef.current.clearError('password')
                }}
                fields={[
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
                        return null
                      }
                    }
                  },
                  {
                    name: 'password',
                    type: 'text',
                    label: t('register.password'),
                    placeholder: t('register.passwordPlaceholder'),
                    inputType: isShowPassword ? 'text' : 'password',
                    colSpan: 12,
                    onFocus: () => {
                      setIsShowValidate(true)
                    },
                    listeners: {
                      onBlur: () => {
                        setIsShowValidate(false)
                      }
                    },
                    // description: t('register.passwordRequirements'),
                    validators: {
                      onChange: ({ value }: any) => {
                        // Nếu chỉ chứa chữ cái tiếng Anh
                        // Kiểm tra từng điều kiện một cách tuần tự
                        const newValidate = { ...validate }

                        // 1. Kiểm tra chỉ chứa chữ cái tiếng Anh
                        newValidate.isValidateEnglish = /^[A-Za-z0-9]+$/.test(
                          value
                        )

                        // 2. Kiểm tra độ dài tối thiểu 8 ký tự
                        newValidate.isValidateLength = value.length >= 8

                        // 3. Kiểm tra có chứa số
                        newValidate.isValidateNumber = /\d/.test(value)

                        // 4. Kiểm tra có cả chữ hoa và chữ thường
                        newValidate.isValidateUppercase =
                          /[A-Z]/.test(value) && /[a-z]/.test(value)

                        // Cập nhật state một lần duy nhất
                        setValidate(newValidate)
                      }
                    },
                    renderDescription: (content) => (
                      <div className="w-full text-right text-[#6b6294] text-[10px] font-bold">
                        {content}
                      </div>
                    )
                  }
                ]}
                onSubmit={handleSubmit}
                defaultValues={{
                  email: '',
                  password: ''
                }}
              />

              <div className="absolute bottom-[14px] right-[15px] w-[12px] h-[12px]">
                {isShowPassword ? (
                  <img
                    src={EyeOn}
                    className="w-full h-full cursor-pointer"
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  />
                ) : (
                  <img
                    className="w-full h-full cursor-pointer"
                    src={EyeOff}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  />
                )}
              </div>
            </div>

            {isShowValidate && (
              <Validate
                isValidateEnglish={validate?.isValidateEnglish}
                isValidateLength={validate?.isValidateLength}
                isValidateUppercase={validate?.isValidateUppercase}
                isValidateNumber={validate?.isValidateNumber}
              />
            )}

            <div className="w-full mt-5">
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
              <div
                onClick={() => {
                  navigate('/auth/login')
                }}
                className="cursor-pointer select-none text-left mt-5 text-[#6b6294] text-[14px] font-bold"
              >
                {t('register.haveAccount')}{' '}
                <span className="underline"> {t('register.loginHere')} </span>
              </div>
            </div>
          </div>
          {/* <div className="w-full separator">
            <img src={separator} />
          </div> */}
        </div>
        <div className="self-stretch justify-start items-end gap-2.5 inline-flex">
          <FormBuilder
            className="flex-1"
            gap={0}
            ref={promoCodeRef}
            fields={[
              {
                name: 'code',
                type: 'text',
                placeholder: t('register.promoCode.placeholder'),
                colSpan: 12,
                listeners: {
                  onChange: ({ value }) => {
                    if (value.length > 0) setDisabledApply(false)
                    else setDisabledApply(true)
                  }
                }
              }
            ]}
            onSubmit={(data) => {
              validatePromoCodeMutation(data.code, {
                onSuccess: (response) => {
                  // true -> applied
                  // false -> not applied
                  if (response?.isValid) {
                    setPromoCode(data.code)
                    dialog.openBasicDialog({
                      type: 'successful',
                      meta: {
                        title: t('register.promoCode.applied'),
                        // description: t('register.promoCode.appliedDescription'),
                        button: (
                          <div className={'w-full'}>
                            <CustomButton
                              onClick={() => {
                                dialog.closeBasicDialog()
                                dialog.close()
                              }}
                              label={t('register.promoCode.great')}
                            />
                          </div>
                        )
                      }
                    })
                  } else {
                    dialog.openBasicDialog({
                      type: 'warning',
                      meta: {
                        title: t(
                          'register.promoCode.error',
                          'You are not eligible for this promo code.'
                        ),
                        // description: t(
                        //   'register.promoCode.appliedDescriptionError'
                        // ),
                        button: (
                          <div className={'w-full'}>
                            <CustomButton
                              onClick={() => {
                                dialog.closeBasicDialog()
                                dialog.close()
                              }}
                              // label={t('register.promoCode.ok')}
                              label="Ok"
                            />
                          </div>
                        )
                      }
                    })
                  }
                }
              })
            }}
            defaultValues={{
              code: ''
            }}
          />
          <CustomButton
            disabled={disabledApply}
            isLoading={isValidatePromoCodePending}
            ref={buttonRef}
            className="w-[120px]"
            onClick={() => {
              promoCodeRef.current?.submit()
            }}
            label={t('register.promoCode.apply')}
            textAlign="center"
          />
        </div>
      </div>
      <div
        css={stylesRight}
        className="relative grow shrink basis-0 self-stretch p-10 bg-black rounded-[20px] flex-col justify-end items-start inline-flex overflow-hidden"
      >
        <img
          className="absolute z-[1] w-full h-full bottom-0 left-0 right-0"
          src={banner}
        />
        <img
          className="absolute z-[3] w-full h-full top-0 right-0"
          src={bgLight}
        />
        <img
          className="absolute z-[4] w-full h-full bottom-0 left-0"
          src={bgDark}
        />

        {/* <div className="absolute z-[1] top-[150px] whitespace-nowrap left-[50%] translate-x-[-50%] text-[#FFFFFF] opacity-40 text-[21px] font-medium">
          {t('register.registerBonus')}
        </div> */}
        <div className="relative z-[5] flex-col justify-start items-start gap-5 flex">
          <div className="text-xl font-black text-white ">
            {t('register.welcomeBonus')}
          </div>
          <div className="text-[#c5c0d8] text-xs font-medium  ">
            {t('register.depositBonus')}
          </div>
        </div>
      </div>
    </div>
  )
}

const stylesTop = css`
  background: url('/images/banner/promotions-mobile-wb02.png') no-repeat center
    center;
  background-size: cover;
  border: 1px #3a334a solid;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  .noted {
    font-size: 21px;
    font-style: normal;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.2);
  }
`

const stylesLeft = css`
  width: ${isMobile ? '90vw' : '390px'};
  max-width: ${isMobile ? '90vw' : '390px'};
  min-width: ${isMobile ? '90vw' : '390px'};

  border-radius: 20px;
  border-top-left-radius: ${isMobile ? 0 : '20px'};
  border-top-right-radius: ${isMobile ? 0 : '20px'};

  border: 1px solid #504271;
  // background: url('/images/bg-register-left.svg') no-repeat center center;
  background: radial-gradient(
    237.29% 116.82% at 60.95% -22.92%,
    #362c5a 0%,
    #181526 100%
  );
  background-size: cover;

  .separator {
    box-shadow:
      6px 6px 12px 0px rgba(22, 20, 24, 0.5),
      -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
  }
`

const stylesRight = css`
  display: ${isMobile ? 'none' : 'flex'};
  width: 390px;
  max-width: 390px;
  min-width: 390px;
  border: 1px solid #3e3650;

  border-radius: 20px;
  box-shadow: 6px 6px 16px 0px rgba(22, 28, 22, 0.25);
  background: url('/images/register/yourloot-banner-register.png') no-repeat
    center center;
  background-size: cover;
`
export const BannerContainer = styled.div`
  width: 100%;
  height: 274px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
`

export const BannerContent = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${isMobile ? 'left: 20px;' : 'left: 40px;'}
  z-index: 1;
  display: flex;
  flex-direction: column;
`

export const BannerTitle = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`

export const TitleText = styled.span`
  ${isMobile ? 'font-size: 20px;' : 'font-size: 60px;'}
  font-weight: 800;
  line-height: 100%;
  text-shadow: 0px 5.583px 44.662px rgba(255, 255, 255, 0.5);
  color: white;
`

export const GradientText = styled(TitleText)`
  background: -webkit-linear-gradient(
    135deg,
    #bcc9f9 0%,
    #e0bfef 50%,
    #f1d7d7 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

export const SubtitleText = styled.div`
  ${isMobile ? 'font-size: 16px;' : 'font-size: 36px;'}
  font-weight: 800;
  line-height: 100%;
  text-shadow: 0px 5.289px 42.309px rgba(255, 255, 255, 0.5);
  color: white;
  margin-top: 8px;
`
