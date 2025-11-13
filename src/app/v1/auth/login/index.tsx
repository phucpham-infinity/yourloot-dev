import { css } from '@/lib/utils'
// import { useDialogStore } from '@/store'
import { useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'

// import CloseIcon from '@/assets/icons/close'
// import separator from '@/assets/images/login/separator.svg'

// import TelegramLogo from '@/assets/images/login/telegram.svg'
// import YandexLogo from '@/assets/images/login/yandex.svg'
import EyeOff from '@/assets/images/login/view-disable.svg'
import EyeOn from '@/assets/images/login/view-enabled.svg'
import Logo from '@/assets/images/yourloot-logotype-full-horizontal.png'
import CustomButton from '@/components/common/custom-button'

import { FormBuilder } from '@/components/common/form-builder'
// import IconBtn from '@/components/common/icon-button'
import { LanguageButton } from '@/components/common/language-button'
import { RestorePasswordDialog } from '@/components/common/restore-password-dialog'
import { authController } from '@/services/controller'
import { useAuthStore } from '@/store'
import { useHomeStore } from '@/store/slices/home'
import clsx from 'clsx'
// import Validate from '@/components/common/validate'

export default function SignIn() {
  const navigate = useNavigate()
  // const dialog = useDialogStore()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const formRef = useRef<any>(null)
  const { setAccessToken, isAuthenticated, setUserId } = useAuthStore()
  const { t } = useTranslation()

  const { useLoginMutation } = authController()
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowError, setIsShowError] = useState(false)

  const {
    mutate: login,
    isPending: isPendingLogin,
    data: dataLogin,
    error: errorLogin
  } = useLoginMutation()

  const { setIsScroll } = useHomeStore()

  const handleSubmitLogin = (data: any) => {
    login({
      username: data.username,
      password: data.password
    })
    setIsScroll(false)
  }

  // const [validate, setValidate] = useState({
  //   isValidateEnglish: false,
  //   isValidateLength: false,
  //   isValidateUppercase: false,
  //   isValidateNumber: false
  // })

  // const [isShowValidate, setIsShowValidate] = useState(false)

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
      // formRef.current?.setError(
      //   'username',
      //   <span className="text-red-500">{t('login.wrongEmail')}</span>
      // )
      setIsShowError(true)
      formRef.current?.setError(
        'password',
        <span className="text-red-500">
          {t('login.wrongPassword')}{' '}
          <span className="cursor-pointer text-[#6b6294]">
            {t('login.restorePassword')}{' '}
            <RestorePasswordDialog>
              <span className="underline cursor-pointer">
                {' '}
                {t('login.restoreHere')}
              </span>
            </RestorePasswordDialog>
          </span>
        </span>
      )
    }
  }, [errorLogin])

  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(searchParams.get('redirect') ?? '/')
    }
  }, [isAuthenticated])

  return (
    <>
      <div
        css={styles}
        className="border flex-col justify-start items-start p-10 inline-flex overflow-hidden"
      >
        <div className="w-full flex flex-col justify-start items-start">
          <div className="relative flex justify-between items-center w-full">
            <img className="w-[183px]" src={Logo} />
            <LanguageButton />
          </div>

          <div className="w-full relative mt-10">
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
                  label: t('login.email'),
                  placeholder: t('login.emailPlaceholder'),
                  colSpan: 12,
                  validators: {
                    onBlur: ({ value }: any) => {
                      formRef.current.clearError('username')
                      if (!value) {
                        return (
                          <span className="text-red-500">
                            {t('login.emailRequired')}
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
                  inputType: isShowPassword ? 'text' : 'password',
                  colSpan: 12,
                  validators: {
                    // onChange: ({ value }: any) => {
                    //   // Nếu chỉ chứa chữ cái tiếng Anh
                    //   // Kiểm tra từng điều kiện một cách tuần tự
                    //   const newValidate = { ...validate }
                    //   // 1. Kiểm tra chỉ chứa chữ cái tiếng Anh
                    //   newValidate.isValidateEnglish = /^[A-Za-z0-9]+$/.test(
                    //     value
                    //   )
                    //   // 2. Kiểm tra độ dài tối thiểu 8 ký tự
                    //   newValidate.isValidateLength = value.length >= 8
                    //   // 3. Kiểm tra có chứa số
                    //   newValidate.isValidateNumber = /\d/.test(value)
                    //   // 4. Kiểm tra có cả chữ hoa và chữ thường
                    //   newValidate.isValidateUppercase =
                    //     /[A-Z]/.test(value) && /[a-z]/.test(value)
                    //   // Cập nhật state một lần duy nhất
                    //   setValidate(newValidate)
                    //   setIsShowValidate(true)
                    //   // onBlur: ({ value }: any) => {
                    //   //   formRef.current.clearError('password')
                    //   //   if (!value) {
                    //   //     return (
                    //   //       <span className="text-red-500">
                    //   //         {t('login.passwordRequired')}
                    //   //       </span>
                    //   //     )
                    //   //   }
                    //   //   if (value.length < 2) {
                    //   //     return (
                    //   //       <span className="text-red-500">
                    //   //         {t('login.passwordMinLength')}
                    //   //       </span>
                    //   //     )
                    //   //   }
                    //   //   return null
                    //   // }
                    // }
                  }
                }
              ]}
              onSubmit={handleSubmitLogin}
              defaultValues={{
                username: '',
                password: ''
              }}
            />
            <div className="absolute bottom-[14px] right-[15px] w-[12px] h-[12px]">
              {isShowPassword ? (
                <img
                  src={EyeOn}
                  className="cursor-pointer w-full h-full"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                />
              ) : (
                <img
                  src={EyeOff}
                  className="cursor-pointer w-full h-full"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                />
              )}
            </div>
          </div>

          <div className="w-full mt-5">
            <CustomButton
              ref={buttonRef}
              onClick={() => {
                formRef.current?.submit()
              }}
              className={clsx({ 'mt-5': isShowError })}
              isLoading={isPendingLogin}
              disabled={isPendingLogin}
              label={t('login.loginButton')}
              textAlign="center"
            />

            <div
              onClick={() => {
                navigate('/auth/register')
              }}
              className="cursor-pointer select-none text-left mt-5 text-[#6b6294] text-[14px] font-bold"
            >
              {t('login.noAccount')}{' '}
              <span className="underline"> {t('login.registerHere')} </span>
            </div>

            <div
              onClick={() => {
                navigate('/auth/forgot-password')
              }}
              className="cursor-pointer select-none text-left mt-2 text-[#6b6294] text-[14px] font-bold"
            >
              {t('auth.forgotPasswordQuestion')}{' '}
              <span className="underline">
                {t('auth.forgotPasswordQuestion2')}
              </span>
            </div>
          </div>
          {/* <div className="w-full separator">
            <img src={separator} />
          </div> */}
          {/* <div className="w-full text-left text-[#9d90cf] text-[10px] font-bold">
          {t('login.orLoginWith')}
        </div> */}
          {/* <div className="w-full flex justify-start items-center gap-5">
          <img
            onClick={handleLoginTelegram}
            className="w-10 h-10 cursor-pointer"
            src={TelegramLogo}
          />
          <img
            onClick={handleLoginYandex}
            className="w-10 h-10 cursor-pointer"
            src={YandexLogo}
          />
        </div> */}
        </div>
      </div>
    </>
  )
}

export const styles = css`
  width: ${isMobile ? '90vw' : '390px'};
  border-radius: 20px;
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
