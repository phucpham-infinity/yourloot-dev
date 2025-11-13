import Logo from '@/assets/images/yourloot-logotype-full-horizontal.png'
import CustomButton from '@/components/common/custom-button'
import { FormBuilder } from '@/components/common/form-builder'
import { RegisterOneLastStepDialog } from '@/components/common/register-one-last-step'
import { css } from '@/lib/utils'
import { emailRegistrationController } from '@/services/controller/email-verification'
import { useAuthStore, useDialogStore } from '@/store'
import { useRegisterStore } from '@/store/slices/register'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageButton } from '../language-button'

export function EmailConfirmRegisterCodeDialog({
  onSuccess
}: {
  onSuccess?: () => void
}) {
  const formRef = useRef<any>(null)
  const dialog = useDialogStore()
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
  const { t } = useTranslation()
  const { setAccessToken, setUserId } = useAuthStore()

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
            {(emailVerificationError as any)?.content?.message?.split('.')[0]}
          </span>
        )
      }
    }
  }, [emailVerificationError])

  const openRegisterOneLastStepDialog = () => {
    dialog.close()
    dialog.open({
      width: 390,
      disabledCloseOverlay: false,
      content: (
        <RegisterOneLastStepDialog
          onSuccess={() => {
            onSuccess?.()
            formRef.current?.reset()
          }}
        />
      )
    })
  }

  const handleResendCode = () => {
    resendEmailVerification()
  }

  useEffect(() => {
    if (isEmailVerificationSuccess && emailVerificationData) {
      openRegisterOneLastStepDialog()

      setAccessToken(
        emailVerificationData?.content?.token,
        emailVerificationData?.content?.refreshToken
      )
      setUserId(emailVerificationData?.content?.userId)
    }
  }, [isEmailVerificationSuccess, emailVerificationData])

  return (
    <div
      css={styled}
      className="w-full flex flex-col items-start justify-center gap-10 p-9 relative bg-white overflow-hidden"
    >
      <div className="relative flex justify-between items-center w-full">
        <img className="w-[183px]" src={Logo} />
        <LanguageButton />
      </div>
      <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <div className="relative self-stretch text-app-white text-app-main-20">
          {t('auth.checkYourEmail')}
        </div>

        <div className="relative w-full text-app-pale text-app-medium-12 break-words">
          {/* You will receive your code in approx {countdown} seconds. */}
          {t('auth.codeSentMessage').replace('111', countdown.toLocaleString())}
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
              label: t('auth.confirmationCode'),
              placeholder: 'YYYY',
              colSpan: 12,
              validators: {
                onSubmit: ({ value }: any) => {
                  if (!value) {
                    return (
                      <span className="text-red-500">
                        {' '}
                        {t('auth.codeRequired')}
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
        {countdown > 0 && (
          <div
            onClick={() => {
              setIsResendCode(true)
              setCountdown(60)
              handleResendCode()
            }}
            className={clsx(
              'text-[#6C6395] mt-[5px] text-left hover:opacity-50 text-[12px] w-full',
              {
                '!mt-8': isShowError
              }
            )}
          >
            {t('auth.didntReceiveCode')}{' '}
            <span className="underline cursor-pointer">
              {' '}
              {t('auth.resendInSeconds').replace(
                '59',
                countdown.toLocaleString()
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
          label={t('auth.continue')}
        />
      </div>
    </div>
  )
}

export const styled = css`
  width: 390px;
  background: url('/images/dialog-bg.svg') no-repeat center center;
  background-size: cover;
  background-color: #362c5a;
`
