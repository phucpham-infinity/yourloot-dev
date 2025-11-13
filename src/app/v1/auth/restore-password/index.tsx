import { css } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useNavigate } from 'react-router-dom'

import Logo from '@/assets/images/yourloot-logotype-full-horizontal.png'
import CustomButton from '@/components/common/custom-button'

import { FormBuilder } from '@/components/common/form-builder'
import { emailRegistrationController } from '@/services/controller'
import { useDialogStore } from '@/store'
import { useTranslation } from 'react-i18next'
import { LanguageButton } from '@/components/common/language-button'

export default function RestorePassword() {
  const navigate = useNavigate()
  const dialog = useDialogStore()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const formRef = useRef<any>(null)
  // const { isAuthenticated } = useAuthStore()
  const { t } = useTranslation()
  // const [searchParams] = useSearchParams()
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const href = window.location.href
    const normalizedHref = href.replace(/&#61;/g, '=')
    const match = normalizedHref.match(/[?&]token=([^&]+)/)

    if (match && match[1]) {
      const token = match[1]
      setToken(token)
    }
  }, [])

  const { useValidatePasswordResetMutation, useResetPasswordMutation } =
    emailRegistrationController()

  const {
    mutate: validatePasswordReset,
    isPending: isPendingValidatePasswordReset,
    error: errorValidatePasswordReset,
    data: dataValidatePasswordReset,
    isSuccess: isSuccessValidatePasswordReset
  } = useValidatePasswordResetMutation()

  const {
    mutate: resetPassword,
    isPending: isPendingResetPassword,
    error: errorResetPassword,
    isSuccess: isSuccessResetPassword
  } = useResetPasswordMutation()

  const handleRestorePassword = (data: any) => {
    setPassword(data?.password)
    if (!token) return
    validatePasswordReset({
      actionToken: token
    })
  }

  useEffect(() => {
    if (dataValidatePasswordReset && isSuccessValidatePasswordReset) {
      resetPassword({
        actionToken: dataValidatePasswordReset?.content?.actionToken,
        newPassword: password,
        passwordConfirmation: password,
        logoutSessions: true
      })
    }
  }, [dataValidatePasswordReset, isSuccessValidatePasswordReset])

  useEffect(() => {
    if (errorResetPassword) {
      dialog.openBasicDialog({
        type: 'warning',
        meta: {
          title: 'auth.linkExpired',
          description: t('auth.contactSupportOrCheckEmail'),
          button: (
            <div className="w-full flex justify-between items-center gap-5">
              <CustomButton
                variant={'default'}
                className="w-[148px] text-center"
                label={'Try again'}
                onClick={() => {
                  dialog.closeBasicDialog()
                }}
              />
              <CustomButton
                variant={'default'}
                className="w-[148px] text-center"
                label={t('login.loginButton')}
                onClick={() => {
                  navigate('/auth/login')
                  dialog.closeBasicDialog()
                }}
              />
            </div>
          )
        }
      })
    }

    if (isSuccessResetPassword) {
      dialog.openBasicDialog({
        type: 'successful',
        meta: {
          title: 'Your password changed successfully',
          button: (
            <div className="w-full">
              <CustomButton
                variant="default"
                label={t('bonus.close')}
                className="w-[140px]"
                onClick={() => {
                  navigate('/auth/login')
                  dialog.closeBasicDialog()
                }}
              />
            </div>
          )
        }
      })
    }
  }, [errorResetPassword, isSuccessResetPassword])

  useEffect(() => {
    if (errorValidatePasswordReset) {
      dialog.openBasicDialog({
        type: 'warning',
        meta: {
          title: t('auth.linkExpired'),
          description: t('auth.contactSupportOrCheckEmail'),
          button: (
            <div className="w-full flex justify-between items-center gap-5">
              <CustomButton
                variant={'default'}
                className="w-[148px] text-center"
                label={t('auth.tryAgain')}
                onClick={() => {
                  dialog.closeBasicDialog()
                }}
              />
              <CustomButton
                variant={'default'}
                className="w-[148px] text-center"
                label={t('login.loginButton')}
                onClick={() => {
                  navigate('/auth/login')
                  dialog.closeBasicDialog()
                }}
              />
            </div>
          )
        }
      })
    }
  }, [errorValidatePasswordReset])

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate(searchParams.get('redirect') ?? '/')
  //   }
  // }, [isAuthenticated])

  return (
    <>
      <div
        css={styles}
        className="border flex-col justify-start items-start p-10 gap-10 inline-flex overflow-hidden"
      >
        <div className="relative flex justify-between items-center w-full">
          <img className="w-[183px]" src={Logo} />
          <LanguageButton />
        </div>

        <h1 className="text-[20px] font-black text-white">
          {t('auth.pleaseChooseNewPassword')}
        </h1>

        <div className="w-full">
          <FormBuilder
            gap={40}
            ref={formRef}
            onFocus={() => {
              formRef.current.clearError('username')
            }}
            fields={[
              {
                name: 'password',
                type: 'text',
                // label: t('login.password'),
                // placeholder: t('login.passwordPlaceholder'),
                label: t('auth.newPassword'),
                placeholder: '********',
                inputType: 'password',
                colSpan: 12,
                validators: {
                  onBlur: ({ value }: any) => {
                    if (!value) {
                      return (
                        <span className="text-red-500">
                          {t('register.passwordRequired')}
                        </span>
                      )
                    }
                    if (value.length < 8) {
                      return (
                        <span className="text-red-500">
                          {t('register.passwordMinLength')}
                        </span>
                      )
                    }
                    if (!/\d/.test(value)) {
                      return (
                        <span className="text-red-500">
                          {t('register.passwordNumberRequired')}
                        </span>
                      )
                    }
                    return null
                  }
                },
                renderDescription: (content) => (
                  <div className="w-full text-right text-[#6b6294] text-[10px] font-bold">
                    {content}
                  </div>
                )
              }
            ]}
            onSubmit={handleRestorePassword}
            defaultValues={{
              password: ''
            }}
          />
        </div>

        <div className="w-full">
          <CustomButton
            ref={buttonRef}
            onClick={() => {
              formRef.current?.submit()
            }}
            isLoading={isPendingValidatePasswordReset || isPendingResetPassword}
            disabled={isPendingValidatePasswordReset || isPendingResetPassword}
            // label={t('login.loginButton')}
            label={t('auth.confirmNewPassword')}
            textAlign="center"
          />
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
