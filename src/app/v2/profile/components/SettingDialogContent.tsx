import ChangePasswordV2Icon from '@/assets/icons/v2/change-password-v2-icon'
import LogoutV2Icon from '@/assets/icons/v2/logout-v2-icon'
import SuccessSendLink from '@/assets/icons/v2/success-send-link.svg'
import CloseIcon from '@/assets/images/close.svg'
import CustomButton from '@/components/common/custom-button'
import { FormBuilder } from '@/components/common/form-builder'
import { useDialogStore } from '@/store'
import { css } from '@emotion/react'
import clsx from 'clsx'
import { RefObject } from 'react'
import { useTranslation } from 'react-i18next'
import ChangePasswordDialogContent from './ChangePasswordDialogContent'
import { radialGradientBg } from './styles'
import Loader from '@/components/common/loader'

interface SettingDialogContentProps {
  onClose: () => void
  step: 1 | 2
  setStep: (s: 1 | 2) => void
  logout: () => void
  formRef: any
  buttonRef: RefObject<HTMLButtonElement>
  handleForgotPassword: (data: any) => void
  email: string
  setEmail: (v: string) => void
  isShowSuccess: boolean
  isShowError: boolean
  isPendingInitiatePasswordReset: boolean
  isPendingLogout: boolean
}

export default function SettingDialogContent(props: SettingDialogContentProps) {
  const { t } = useTranslation()
  const dialog = useDialogStore()
  const {
    onClose,
    step,
    logout,
    formRef,
    buttonRef,
    handleForgotPassword,
    email,
    setEmail,
    isShowSuccess,
    isShowError,
    isPendingInitiatePasswordReset,
    isPendingLogout
  } = props

  return (
    <div className="w-96 bg-zinc-950 rounded-[10px] border border-[#2b2142] backdrop-blur-lg inline-flex flex-col justify-start items-center overflow-hidden">
      <div className="self-stretch h-12 relative bg-zinc-950 border-b border-[#2b2142] backdrop-blur-[10px] flex items-center justify-center">
        <div className="text-base font-medium text-white">
          {t('profile.settings')}
        </div>
        <div className="absolute right-2 top-[10px]">
          <CustomButton
            aria-label="Close"
            variant="invisible"
            height={24}
            onClick={onClose}
            textAlign="center"
            label={
              <div className="flex items-center justify-center w-full h-full">
                <img src={CloseIcon} alt="" aria-hidden className="w-4 h-4" />
              </div>
            }
            className="w-6 h-6 min-w-0 p-0 bg-transparent border-0 shadow-none outline-none"
            style={{ padding: 0, borderRadius: 0 }}
          />
        </div>
      </div>
      <div className="flex flex-col items-start self-stretch justify-start px-4 py-6">
        {step === 1 && (
          <div className="flex flex-col items-start self-stretch justify-start gap-4">
            <div className="flex flex-col items-start self-stretch justify-start gap-2">
              <div
                css={actionButtonStyles}
                onClick={() => {
                  // Desktop-only: this component is used in desktop dialog.
                  // Close current settings dialog and open the Change Password dialog.
                  onClose?.()
                  dialog.open({
                    width: 384,
                    noBorder: true,
                    content: (
                      <ChangePasswordDialogContent
                        onClose={() => dialog.close()}
                      />
                    )
                  })
                }}
                className="flex items-center w-full h-10 gap-2 p-4 cursor-pointer border-app-default"
              >
                <ChangePasswordV2Icon className="w-4 h-4" />
                <span className="text-white text-[14px] font-medium">
                  {t('profile.changePassword')}
                </span>
              </div>

              <div
                css={actionButtonStyles}
                onClick={() => {
                  onClose?.()
                  logout()
                }}
                className="flex items-center w-full h-10 gap-2 p-4 cursor-pointer border-app-default"
              >
                {isPendingLogout ? (
                  <Loader size={16} className="w-4 h-4" />
                ) : (
                  <LogoutV2Icon className="w-4 h-4 " />
                )}
                <span className="text-white text-[14px] font-medium">
                  {t('profile.logOut', 'Log out')}
                </span>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
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
                        label: t('profile.email'),
                        placeholder: t('profile.emailPlaceholder'),
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
                    label={t('auth.continue')}
                    textAlign="center"
                  />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <img src={SuccessSendLink} alt="success-send-link" />
                <div className="text-white text-[14px]">
                  {t('profile.confirmationLinkSent')}
                </div>
                <div className="text-[14px] text-[#9E90CF] mt-2 text-center">
                  {t('profile.confirmationLinkSentToEmail')}
                  <br />
                  {t('profile.validForFiveMinutes')}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

const actionButtonStyles = css`
  border-radius: 10px;
  ${radialGradientBg};
`
