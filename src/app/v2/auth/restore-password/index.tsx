import { useEffect, useRef, useState } from 'react'

import CustomButton from '@/components/common/custom-button'

import RestorePassExpired from '@/assets/icons/v2/restore-expired.svg'
import RestorePassSuccess from '@/assets/icons/v2/restore-pass-success.svg'
import { FormBuilder } from '@/components/common/form-builder'
import Validate from '@/components/common/validate'
import { useScreen } from '@/hooks'
import { useToast } from '@/hooks/use-toast'
import { emailRegistrationController } from '@/services/controller'
import { useAuthStore, useV2DialogStore } from '@/store'
import { jwtDecode } from 'jwt-decode'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUserPlatformEvent } from '@/hooks'

export default function RestorePasswordV2() {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const formRef = useRef<any>(null)
  const { t } = useTranslation()
  const toast = useToast()
  const [token, setToken] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { logout } = useAuthStore()
  const { isMobile } = useScreen()
  const dialog = useV2DialogStore()
  const location = useLocation()
  const navigate = useNavigate()
  const { postUserPlatformEvent } = useUserPlatformEvent()
  // 1: Enter password
  // 2: Change password success
  // 3: Link expired
  const [step, setStep] = useState<1 | 2 | 3>(1)

  const [validate, setValidate] = useState({
    isValidateEnglish: false,
    isValidateLength: false,
    isValidateUppercase: false,
    isValidateNumber: false
  })

  useEffect(() => {
    const href = window.location.href
    const normalizedHref = href.replace(/&#61;/g, '=')
    const match = normalizedHref.match(/[?&]token=([^&]+)/)

    if (match && match[1]) {
      const token = match[1]
      try {
        const decoded = jwtDecode(token)
        setEmail((decoded as any)?.eml || '')
        setToken(token)
      } catch {
        setStep(3)
      }
    }
  }, [])

  const {
    useValidatePasswordResetMutation,
    useResetPasswordMutation,
    useInitiatePasswordResetMutation
  } = emailRegistrationController()

  const {
    mutate: initiatePasswordReset,
    isPending: isPendingInitiatePasswordReset,
    isSuccess: isSuccessInitiatePasswordReset,
    error: errorInitiatePasswordReset
  } = useInitiatePasswordResetMutation()

  const handleForgotPassword = () => {
    if (!email) return
    initiatePasswordReset(email)
  }

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
    if (isSuccessInitiatePasswordReset) {
      toast.success(t('auth.linkSent'), {
        position: 'top-right'
      })
    }
  }, [isSuccessInitiatePasswordReset])

  useEffect(() => {
    if (errorInitiatePasswordReset) {
      toast.error(
        'You’ve recently requested a password reset. Please try again in a few minutes.',
        {
          position: 'top-right'
        }
      )
    }
  }, [errorInitiatePasswordReset])

  useEffect(() => {
    if (errorResetPassword) {
      setStep(3)
    }

    if (isSuccessResetPassword) {
      setStep(2)
      postUserPlatformEvent({
        eventType: 'passwordReset'
      })
    }
  }, [errorResetPassword, isSuccessResetPassword])

  useEffect(() => {
    if (errorValidatePasswordReset) {
      setStep(3)
    }
  }, [errorValidatePasswordReset])

  const renderContent = () => (
    <div className="w-full h-full">
      {step === 1 && (
        <>
          <div className="w-full relative">
            <FormBuilder
              gap={40}
              ref={formRef}
              onFocus={() => {
                formRef.current?.clearError('username')
              }}
              fields={[
                {
                  name: 'password',
                  type: 'text',
                  label: t('auth.newPassword'),
                  placeholder: '********',
                  inputType: 'password',
                  colSpan: 12,
                  validators: {
                    onChange: ({ value }: any) => {
                      setPassword(value)
                      const newValidate = { ...validate }
                      newValidate.isValidateEnglish = /^[A-Za-z0-9]+$/.test(
                        value
                      )
                      newValidate.isValidateLength = value.length >= 8
                      newValidate.isValidateNumber = /\d/.test(value)
                      newValidate.isValidateUppercase =
                        /[A-Z]/.test(value) && /[a-z]/.test(value)
                      setValidate(newValidate)
                    }
                  },
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
                  ),
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

          <div className="w-full mt-4">
            <CustomButton
              ref={buttonRef}
              onClick={() => {
                formRef.current?.submit()
              }}
              isLoading={
                isPendingValidatePasswordReset || isPendingResetPassword
              }
              disabled={
                isPendingValidatePasswordReset ||
                isPendingResetPassword ||
                !password ||
                !validate?.isValidateEnglish ||
                !validate?.isValidateLength ||
                !validate?.isValidateUppercase ||
                !validate?.isValidateNumber
              }
              label={t('auth.changePassword')}
              textAlign="center"
            />
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="flex flex-col items-center justify-center">
            <img src={RestorePassSuccess} alt="success-send-link" />
            <div className="text-white text-[14px] mt-2">
              {t('auth.newPasswordSet')}
            </div>
            <div className="text-[14px] text-[#9E90CF] mt-2 text-center">
              {t('auth.passwordUpdated')}
            </div>
            <div className="w-full mt-8">
              <CustomButton
                onClick={() => {
                  logout()
                  navigate('/auth/login')
                }}
                label={t('auth.close')}
                textAlign="center"
              />
            </div>
          </div>
        </>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center justify-center">
          <img src={RestorePassExpired} alt="success-send-link" />
          <div className="text-white text-[14px] mt-2">
            {t('auth.linkExpired')}
          </div>
          <div className="text-[14px] text-[#9E90CF] mt-2 text-center">
            {t('auth.linkExpiredMessage')}
          </div>
          <div className="w-full mt-8">
            <CustomButton
              isLoading={isPendingInitiatePasswordReset}
              disabled={isPendingInitiatePasswordReset}
              onClick={handleForgotPassword}
              label={t('auth.sendNewLink')}
              textAlign="center"
            />
          </div>
        </div>
      )}
    </div>
  )

  useEffect(() => {
    if (!isMobile && location.pathname === '/auth/restore-password') {
      dialog.open({
        title: t('auth.restorePassword', 'Restore password'),
        content: renderContent(),
        className: 'w-[350px]!',
        dismissible: false,
        closeCallback: () => {
          logout()
          navigate('/')
        }
      })
    }
    return () => {
      if (!isMobile && (dialog as any)?.close) {
        ;(dialog as any).close()
      }
    }
  }, [
    isMobile,
    location.pathname,
    step,
    password,
    isPendingValidatePasswordReset,
    isPendingResetPassword,
    isPendingInitiatePasswordReset
  ])

  if (!isMobile) return null

  return renderContent()
}
