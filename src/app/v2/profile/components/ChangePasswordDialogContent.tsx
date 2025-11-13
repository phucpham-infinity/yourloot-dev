import { RefObject, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import CustomButton from '@/components/common/custom-button'
import CloseIcon from '@/assets/images/close.svg'
import { FormBuilder } from '@/components/common/form-builder'
import clsx from 'clsx'
import { css } from '@emotion/react'
import { radialGradientBg } from './styles'
import { emailRegistrationController } from '@/services/controller/email-verification'
import { useDialogStore } from '@/store'
import ChangePasswordSuccessDialogContent from './ChangePasswordSuccessDialogContent'

interface ChangePasswordDialogContentProps {
  onClose?: () => void
  buttonRef?: RefObject<HTMLButtonElement>
}

export default function ChangePasswordDialogContent(props: ChangePasswordDialogContentProps) {
  const { onClose, buttonRef } = props
  const { t } = useTranslation()
  const dialog = useDialogStore()

  const formRef = useRef<any>(null)
  const [email, setEmail] = useState('')
  const [hasError, setHasError] = useState(false)

  const { useInitiatePasswordResetMutation } = emailRegistrationController()
  const {
    mutate: initiatePasswordReset,
    isPending: isPendingInitiatePasswordReset,
    isSuccess: isSuccessInitiatePasswordReset,
    error: errorInitiatePasswordReset
  } = useInitiatePasswordResetMutation()

  // On success, open the new Change Password modal
  useEffect(() => {
    if (isSuccessInitiatePasswordReset) {
      try {
        onClose?.()
      } catch (e) {}
      dialog.open({
        width: 384,
        noBorder: true,
        content: (
          <ChangePasswordSuccessDialogContent onClose={() => dialog.close()} />
        )
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessInitiatePasswordReset])

  // When error from API -> show custom message and mark input red
  useEffect(() => {
    if (errorInitiatePasswordReset) {
      setHasError(true)
      const message = 'No account found with this email.'
      // Set field error with red styling to avoid showing a separate message block
      formRef?.current?.setError(
        'email',
        <span className="text-red-500">{message}</span>
      )
    }
  }, [errorInitiatePasswordReset])

  // Clear error when email changes
  useEffect(() => {
    if (hasError) {
      setHasError(false)
      formRef?.current?.clearError?.('email')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email])

  const handleSubmit = (data: any) => {
    // naive client email format check to prevent unnecessary request
    const emailVal: string = data?.email?.trim?.() || ''
    if (!emailVal) return
    initiatePasswordReset(emailVal)
  }

  return (
    <div className="w-96 bg-zinc-950 rounded-[10px] border border-[#2b2142] backdrop-blur-lg inline-flex flex-col justify-start items-center overflow-hidden">
      <div className="self-stretch h-12 relative bg-zinc-950 border-b border-[#2b2142] backdrop-blur-[10px] flex items-center justify-center">
        <div className="text-white text-base font-medium">{t('profile.changePassword')}</div>
        {onClose && (
          <div className="absolute right-2 top-[10px]">
            <CustomButton
              aria-label="Close"
              variant="invisible"
              height={24}
              onClick={onClose}
              textAlign="center"
              label={
                <div className="w-full h-full flex items-center justify-center">
                  <img src={CloseIcon} alt="" aria-hidden className="w-4 h-4" />
                </div>
              }
              className="min-w-0 w-6 h-6 p-0 border-0 bg-transparent outline-none shadow-none"
              style={{ padding: 0, borderRadius: 0 }}
            />
          </div>
        )}
      </div>

      <div className="self-stretch px-4 py-6 flex flex-col justify-start items-start">
        <div className="self-stretch flex flex-col justify-start items-start gap-4">
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            <div className="w-full">
              <FormBuilder
                gap={40}
                ref={formRef}
                fields={[
                  {
                    name: 'email',
                    type: 'text',
                    label: t('profile.email'),
                    placeholder: 'example@mail.com',
                    inputType: 'text',
                    colSpan: 12,
                    validators: {
                      onChange: (e: any) => setEmail(e.value)
                    }
                  }
                ]}
                onSubmit={handleSubmit}
                defaultValues={{ email: '' }}
              />
            </div>

          </div>

          <div className={clsx('w-full', { 'mt-0': !hasError, 'mt-4': hasError })}>
            <CustomButton
              ref={buttonRef}
              onClick={() => {
                formRef.current?.clearError('email')
                formRef.current?.submit()
              }}
              isLoading={isPendingInitiatePasswordReset}
              disabled={isPendingInitiatePasswordReset || !email || hasError}
              label={t('auth.continue')}
              textAlign="center"
              variant="default"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Keep style parity with SettingDialogContent clickable areas if needed
export const actionButtonStyles = css`
  border-radius: 10px;
  ${radialGradientBg};
`