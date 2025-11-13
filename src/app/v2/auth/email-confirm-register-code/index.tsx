import CustomButton from '@/components/common/custom-button'
import { FormBuilder } from '@/components/common/form-builder'
import { useUserPlatformEvent } from '@/hooks'
import { emailRegistrationController } from '@/services/controller/email-verification'
import { useAuthStore } from '@/store'
import { useRegisterStore } from '@/store/slices/register'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export function EmailConfirmRegisterCodeV2({
  onSuccess
}: {
  onSuccess?: () => void
}) {
  const formRef = useRef<any>(null)
  const handleSubmitCode = () => {
    formRef?.current?.submit()
  }

  const { email, userId } = useRegisterStore()
  const { useEmailVerificationMutation, useResendEmailVerificationMutation } =
    emailRegistrationController()
  const { mutate: resendEmailVerification } =
    useResendEmailVerificationMutation(userId ?? '')
  const [countdown, setCountdown] = useState(60)
  const [isResendCode, setIsResendCode] = useState(true)
  const [isShowError, setIsShowError] = useState(false)
  const [isShowErrorInput, setIsShowErrorInput] = useState(false)
  const { t } = useTranslation()
  const { setAccessToken, setUserId } = useAuthStore()
  const { postUserPlatformEvent } = useUserPlatformEvent()
  useEffect(() => {
    if (isResendCode) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setIsResendCode(false)
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isResendCode])

  const {
    mutate: emailVerification,
    isPending: isEmailVerificationPending,
    isSuccess: isEmailVerificationSuccess,
    error: emailVerificationError,
    data: emailVerificationData
  } = useEmailVerificationMutation()

  useEffect(() => {
    if (emailVerificationError) {
      if ((emailVerificationError as any).content?.message) {
        setIsShowError(true)
        formRef?.current?.setError(
          'code',
          <span className="text-red-500">
            {(emailVerificationError as any)?.content?.message?.split('.')[0] ??
              'Oops! Attempt failed! Please try again 😊'}
          </span>
        )
      }
    }
  }, [emailVerificationError])

  const openRegisterOneLastStepDialog = () => {
    onSuccess?.()
  }

  const handleResendCode = () => {
    resendEmailVerification()
  }

  useEffect(() => {
    if (isEmailVerificationSuccess && emailVerificationData) {
      setAccessToken(
        emailVerificationData?.content?.token,
        emailVerificationData?.content?.refreshToken
      )
      setUserId(emailVerificationData?.content?.userId)
      postUserPlatformEvent({
        eventType: 'signup',
        userId: emailVerificationData?.content?.userId,
        token: emailVerificationData?.content?.token
      })
      openRegisterOneLastStepDialog()
    }
  }, [isEmailVerificationSuccess, emailVerificationData])

  return (
    <div
      className={clsx(
        'relative flex flex-col items-start justify-center w-full gap-5 overflow-hidden'
      )}
    >
      <div className="flex flex-col items-start gap-0 relative self-stretch w-full flex-[0_0_auto]">
        <div className="relative self-stretch text-app-white text-[20px] leading-[24px]">
          {t('auth.checkYourEmail', 'Check your email')}
        </div>

        <div className="relative w-full break-words text-[#9E90CF] text-[14px]">
          {/* You will receive your code in approx {countdown} seconds. */}
          {t(
            'auth.codeSentMessage',
            "We've sent a code to your email. It's valid for 111 seconds"
          ).replace('111', countdown.toLocaleString())}
        </div>
      </div>
      <div className="w-full">
        <FormBuilder
          gap={40}
          ref={formRef}
          onFocus={() => {
            formRef.current.clearError('code')
          }}
          fields={[
            {
              name: 'code',
              type: 'text',
              inputType: 'text-number',
              label: t('auth.confirmationCode', 'Confirmation code:'),
              placeholder: t('auth.confirmationCodePlaceholder', 'YYYY'),
              colSpan: 12,
              validators: {
                onSubmit: ({ value }: any) => {
                  if (!value) {
                    setIsShowErrorInput(true)
                    return (
                      <span className="text-red-500">
                        {' '}
                        {t('auth.codeRequired', 'Code is required')}
                      </span>
                    )
                  }
                  return null
                }
              }
            }
          ]}
          onSubmit={(data) => {
            if (userId && email) {
              emailVerification({
                userId: userId,
                email: email,
                verificationCode: data.code
              })
            }
          }}
          defaultValues={{
            code: ''
          }}
        />
        {countdown == 0 && (
          <div
            onClick={() => {
              setIsResendCode(true)
              setCountdown(60)
              handleResendCode()
            }}
            className={clsx(
              'text-[#6C6395] mt-2 text-left hover:opacity-50 text-[14px] w-full',
              {
                '!mt-6': isShowError || isShowErrorInput
              }
            )}
          >
            {t('auth.didntReceiveCode', "Didn't receive code?")}{' '}
            <span className="underline cursor-pointer text-white">
              {' '}
              {t('auth.resendInSeconds', 'Resend in 59 sec').replace(
                '59',
                '59'
              )}
            </span>
          </div>
        )}
      </div>

      <div className={'w-full'}>
        <CustomButton
          isLoading={isEmailVerificationPending}
          disabled={isEmailVerificationPending}
          onClick={handleSubmitCode}
          label={t('auth.continue', 'Continue')}
        />
      </div>
    </div>
  )
}
