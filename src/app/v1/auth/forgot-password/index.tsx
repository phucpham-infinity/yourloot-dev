import { css } from '@/lib/utils'
import { useEffect, useRef } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'

import Logo from '@/assets/images/yourloot-logotype-full-horizontal.png'
import CustomButton from '@/components/common/custom-button'

import { FormBuilder } from '@/components/common/form-builder'
import { emailRegistrationController } from '@/services/controller'
import { useAuthStore, useDialogStore } from '@/store'
import { LanguageButton } from '@/components/common/language-button'
import { YourLootSupportBotLink } from '@/constants'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const dialog = useDialogStore()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const formRef = useRef<any>(null)
  const { isAuthenticated } = useAuthStore()
  const { t } = useTranslation()

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

  useEffect(() => {
    if (errorInitiatePasswordReset) {
      dialog.openBasicDialog({
        type: 'warning',
        meta: {
          title: (errorInitiatePasswordReset as any)?.content?.message,
          description: t('auth.contactSupport'),
          button: (
            <div className="w-full flex justify-between items-center gap-5">
              <CustomButton
                variant={'default'}
                className="w-[148px] text-center"
                label={t('bonus.close')}
                onClick={() => {
                  dialog.closeBasicDialog()
                }}
              />
              <CustomButton
                variant={'default'}
                className="w-[148px] text-center"
                label={t('auth.support')}
                onClick={() => {
                  window.open(YourLootSupportBotLink, '_blank')
                  dialog.closeBasicDialog()
                }}
              />
            </div>
          )
        }
      })
    }

    if (isSuccessInitiatePasswordReset) {
      dialog.openBasicDialog({
        type: 'successful',
        meta: {
          title: t('auth.checkYourEmail'),
          description: t('auth.confirmationLink'),
          button: (
            <div className="w-full">
              <CustomButton
                className="w-[140px]"
                variant="default"
                label={t('bonus.close')}
                onClick={() => {
                  dialog.closeBasicDialog()
                }}
              />
            </div>
          )
        }
      })
    }
  }, [errorInitiatePasswordReset, isSuccessInitiatePasswordReset])

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
        className="border flex-col justify-start items-start p-10 gap-10 inline-flex overflow-hidden"
      >
        <div className="relative flex justify-between items-center w-full">
          <img className="w-[183px]" src={Logo} />
          <LanguageButton />
        </div>

        <h1 className="text-[20px] font-black text-white">
          {t('auth.forgotPassword')}
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
                name: 'email',
                type: 'text',
                // label: t('login.password'),
                // placeholder: t('login.passwordPlaceholder'),
                label: t('auth.specifyEmail'),
                placeholder: 'Email',
                inputType: 'text',
                colSpan: 12,
                validators: {
                  onChange: () => {
                    return null
                  }
                }
              }
            ]}
            onSubmit={handleForgotPassword}
            defaultValues={{
              email: ''
            }}
          />
          <div
            onClick={() => {
              navigate('/auth/login')
            }}
            className="cursor-pointer select-none text-right mt-[10px] text-[#6b6294] text-[10px] font-bold underline"
          >
            {t('register.haveAccount')} {t('register.loginHere')}
          </div>
        </div>

        <div className="w-full">
          <CustomButton
            ref={buttonRef}
            onClick={() => {
              formRef.current?.submit()
            }}
            isLoading={isPendingInitiatePasswordReset}
            disabled={isPendingInitiatePasswordReset}
            // label={t('login.loginButton')}
            label={t('auth.send')}
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
