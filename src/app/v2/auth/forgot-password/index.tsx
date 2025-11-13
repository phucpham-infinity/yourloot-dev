import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'

import SuccessSendLink from '@/assets/icons/v2/success-send-link.svg'
import CustomButton from '@/components/common/custom-button'

import { FormBuilder } from '@/components/common/form-builder'
import { YourLootSupportBotLink } from '@/constants'
import { emailRegistrationController } from '@/services/controller'
import { useAuthStore, useV2DialogStore } from '@/store'
import clsx from 'clsx'
import { useScreen } from '@/hooks'

export default function ForgotPasswordV2() {
  const navigate = useNavigate()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const formRef = useRef<any>(null)
  const { isAuthenticated } = useAuthStore()
  const { t } = useTranslation()
  const dialog = useV2DialogStore()
  const { isMobile } = useScreen()
  const [isShowError, setIsShowError] = useState(false)
  const [email, setEmail] = useState('')
  const [isShowSuccess, setIsShowSuccess] = useState(false)

  const { useInitiatePasswordResetMutation } = emailRegistrationController()

  const {
    mutate: initiatePasswordReset,
    isPending: isPendingInitiatePasswordReset,
    error: errorInitiatePasswordReset,
    isSuccess: isSuccessInitiatePasswordReset
  } = useInitiatePasswordResetMutation()

  const handleForgotPassword = (data: any) => {
    initiatePasswordReset(data.email)
  }

  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(searchParams.get('redirect') ?? '/')
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (isSuccessInitiatePasswordReset) {
      setIsShowSuccess(true)
    } else {
      setIsShowSuccess(false)
    }
  }, [isSuccessInitiatePasswordReset])

  useEffect(() => {
    if (errorInitiatePasswordReset) {
      setIsShowError(true)
      // Check if it's a 404 error (no account found)
      if ((errorInitiatePasswordReset as any)?.content?.message.includes('not found')) {
        formRef?.current?.setError(
          'email',
          <span className="text-red-500">
            {'No account found with this email.'}
          </span>
        )
      } else if ((errorInitiatePasswordReset as any).content?.message) {
        formRef?.current?.setError(
          'email',
          <span className="text-red-500">
            {(errorInitiatePasswordReset as any)?.content?.message?.split(
              '.'
            )[0] ?? 'Oops! Attempt failed! Please try again 😊'}
          </span>
        )
      } else {
        // Set error state for any other error type
        formRef?.current?.setError(
          'email',
          <span className="text-red-500">
            {'Oops! Attempt failed! Please try again 😊'}
          </span>
        )
      }
    } else {
      // Reset error state when there's no error
      setIsShowError(false)
    }
  }, [errorInitiatePasswordReset])

  const renderContent = () => (
    <>
      {!isShowSuccess ? (
        <>
          <div className="w-full">
            <FormBuilder
              gap={40}
              ref={formRef}
              onFocus={() => {
                formRef.current.clearError('username')
              }}
              fields={[
                {
                  name: 'email',
                  type: 'text',
                  label: t('login.email', 'Email'),
                  placeholder: t(
                    'login.emailPlaceholder',
                    'example@example.com'
                  ),
                  inputType: 'text',
                  colSpan: 12,
                  validators: {
                    onChange: (e: any) => {
                      setEmail(e.value)
                    }
                  }
                }
              ]}
              onSubmit={handleForgotPassword}
              defaultValues={{
                email: ''
              }}
            />
          </div>

          <div className={clsx('w-full mt-4', { '!mt-8': isShowError })}>
            <CustomButton
              ref={buttonRef}
              onClick={() => {
                formRef.current?.clearError('email')
                formRef.current?.submit()
              }}
              isLoading={isPendingInitiatePasswordReset}
              disabled={isPendingInitiatePasswordReset || !email}
              label={t('auth.continue', 'Continue')}
              textAlign="center"
            />
          </div>

          <div
            onClick={() => {
              window.open(YourLootSupportBotLink, '_blank')
            }}
            className="cursor-pointer select-none text-left mt-4 text-[#6C6395] text-[14px] font-bold underline"
          >
            {t('auth.forgotEmailQuestion', 'Forgot Email?')}{' '}
            <span className="underline">
              {t('auth.contactSupportLink', 'Contact Support')}{' '}
            </span>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img src={SuccessSendLink} alt="success-send-link" />
          <div className="text-white text-[14px]">
            {t(
              'auth.confirmationLink',
              'We send the confirmation link to your mail.'
            )}
          </div>
          <div className="text-[14px] text-[#9E90CF] mt-2 text-center">
            {t(
              'auth.contactSupportOrCheckEmail',
              'Please contact support or check the email.'
            )}
          </div>
        </div>
      )}
    </>
  )

  useEffect(() => {
    if (!isMobile) {
      dialog.open({
        title: t('auth.forgotPassword', 'Forgot password'),
        content: renderContent(),
        className: '!w-[350px]',
        closeCallback: () => {
          navigate('/')
        }
      })
    }

    return () => {
      if (!isMobile && (dialog as any)?.close) {
        ;(dialog as any).close()
      }
    }
  }, [isMobile, isShowSuccess, isPendingInitiatePasswordReset, email, isShowError])

  if (!isMobile) return null

  return renderContent()
}
