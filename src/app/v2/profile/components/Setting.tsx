import LanguageV2 from '@/app/v1/home/components/LanguageV2'
import ChangePasswordV2Icon from '@/assets/icons/v2/change-password-v2-icon'
import LogoutV2Icon from '@/assets/icons/v2/logout-v2-icon'
import SettingIcon from '@/assets/icons/v2/Setting'
import SuccessSendLink from '@/assets/icons/v2/success-send-link.svg'
import DefaultAvatar from '@/assets/images/header/avatar.png'
import CustomButton from '@/components/common/custom-button'
import { CustomDrawer } from '@/components/common/custom-drawer'
import { FormBuilder } from '@/components/common/form-builder'
import { GAME_LEVELS } from '@/constants'
import {
  emailRegistrationController,
  levelsController
} from '@/services/controller'
import { useAuthStore, useDialogStore, useProfileStore } from '@/store'
import { css } from '@emotion/react'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SettingDialogContent from './SettingDialogContent'
import { radialGradientBg } from './styles'
import { UserAvatar } from './UserAvatar'
import { useLogout } from '@/components/v2/hooks'

const Setting = () => {
  const { t } = useTranslation()
  const { logout, isPendingLogout } = useLogout()
  const { profile } = useProfileStore()
  const { user } = useAuthStore()

  const formRef = useRef<any>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [openDrawer, setOpenDrawer] = useState(false)
  const dialog = useDialogStore()
  const [didOpenDialog, setDidOpenDialog] = useState(false)
  const [isShowError, setIsShowError] = useState(false)

  //NOTE: 1: Setting, 2: Input change Password, 3: Change Password Success
  const [step, setStep] = useState<1 | 2>(1)

  const [email, setEmail] = useState('')
  const [isShowSuccess, setIsShowSuccess] = useState(false)

  const { useInitiatePasswordResetMutation } = emailRegistrationController()
  const { useGetUserLevel } = levelsController()
  const { data: level } = useGetUserLevel()

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
    if (isSuccessInitiatePasswordReset) {
      setIsShowSuccess(true)
    } else {
      setIsShowSuccess(false)
    }
  }, [isSuccessInitiatePasswordReset])

  // reset local states when custom dialog (desktop) closes
  useEffect(() => {
    if (didOpenDialog && !dialog.isOpen) {
      setIsShowError(false)
      setIsShowSuccess(false)
      setEmail('')
      setStep(1)
      setDidOpenDialog(false)
    }
  }, [dialog.isOpen, didOpenDialog])

  useEffect(() => {
    if (errorInitiatePasswordReset) {
      if ((errorInitiatePasswordReset as any).content?.message) {
        setIsShowError(true)
        formRef?.current?.setError(
          'email',
          <span className="text-red-500">
            {
              (errorInitiatePasswordReset as any)?.content?.message?.split(
                '.'
              )[0]
            }
          </span>
        )
      }
    }
  }, [errorInitiatePasswordReset])

  return (
    <>
      {/* Desktop header (centered card content) */}
      <div className="flex-col items-center justify-start hidden gap-6 lg:flex">
        {/* Avatar (desktop only). If no avatar from response, fallback to default */}
        {(() => {
          const anyProfile = user?.photo_url || ((profile || {}) as any)
          const fromResponse =
            anyProfile?.avatar ||
            anyProfile?.avatarUrl ||
            anyProfile?.image ||
            anyProfile?.imageUrl ||
            ''
          const [src] = [
            fromResponse && typeof fromResponse === 'string'
              ? fromResponse
              : DefaultAvatar
          ]
          return (
            <img
              className="rounded-full w-[112px] h-[112px]"
              src={user?.photo_url ?? src}
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement
                if (img.src !== DefaultAvatar) img.src = DefaultAvatar
              }}
              alt="user-avatar"
            />
          )
        })()}

        <div className="flex flex-col items-center justify-center gap-4">
          <div className="justify-center text-white text-v2-app-medium-16">
            {profile?.email?.split('@')[0] || profile?.username}
          </div>
          <div className="justify-center w-40 text-v2-app-medium-12 text-center text-[#9E90CF]">
            {
              GAME_LEVELS[level?.content?.levelName as keyof typeof GAME_LEVELS]
                ?.name
            }
          </div>
        </div>
        <CustomButton
          className="!w-auto !p-3 !border-0"
          onClick={() => {
            setDidOpenDialog(true)
            dialog.open({
              width: 384,
              noBorder: true,
              content: (
                <SettingDialogContent
                  isPendingLogout={isPendingLogout}
                  onClose={() => dialog.close()}
                  step={step}
                  setStep={setStep}
                  logout={logout}
                  formRef={formRef}
                  buttonRef={buttonRef as any}
                  handleForgotPassword={handleForgotPassword}
                  email={email}
                  setEmail={setEmail}
                  isShowSuccess={isShowSuccess}
                  isShowError={isShowError}
                  isPendingInitiatePasswordReset={
                    isPendingInitiatePasswordReset
                  }
                />
              )
            })
          }}
          prefixIcon={<SettingIcon fill="#C5C0D8" width="12px" height="12px" />}
          label={t('profile.settings')}
          labelStyle={{
            fontSize: '12px',
            color: '#9E90CF'
          }}
          textAlign="center"
          variant="invisible"
          height={40}
        />
      </div>

      {/* Tablet header (horizontal layout matching raw.tsx) */}
      <div className="hidden md:flex lg:hidden items-center gap-6">
        <div className="w-full p-4 bg-[#191524] rounded-[10px] flex justify-center items-center gap-6 mb-4">
          <div className="flex-1 flex justify-start items-center gap-6">
            <div className="inline-flex flex-col justify-start items-center gap-2">
              {(() => {
                const anyProfile = (profile || {}) as any
                const fromResponse =
                  anyProfile?.avatar ||
                  anyProfile?.avatarUrl ||
                  anyProfile?.image ||
                  anyProfile?.imageUrl ||
                  ''
                const [src] = [
                  fromResponse && typeof fromResponse === 'string'
                    ? fromResponse
                    : DefaultAvatar
                ]
                return (
                  <img
                    className="w-28 h-28 p-0 rounded-[87.50px]"
                    src={src}
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement
                      if (img.src !== DefaultAvatar) img.src = DefaultAvatar
                    }}
                    alt="user-avatar"
                  />
                )
              })()}
            </div>
            <div className="inline-flex flex-col justify-center items-start gap-4">
              <div className="justify-center text-white text-base font-black text-[16px] leading-[16px]">
                {profile?.email?.split('@')[0]}
              </div>
              <div className="text-center justify-center text-[#9E90CF] text-[12px] font-medium leading-[16px]">
                {
                  GAME_LEVELS[
                    level?.content?.levelName as keyof typeof GAME_LEVELS
                  ]?.name
                }
              </div>
            </div>
          </div>
          <CustomButton
            className="!w-auto !p-3 !border-0"
            onClick={() => {
              setDidOpenDialog(true)
              dialog.open({
                width: 384,
                noBorder: true,
                content: (
                  <SettingDialogContent
                    isPendingLogout={isPendingLogout}
                    onClose={() => dialog.close()}
                    step={step}
                    setStep={setStep}
                    logout={logout}
                    formRef={formRef}
                    buttonRef={buttonRef as any}
                    handleForgotPassword={handleForgotPassword}
                    email={email}
                    setEmail={setEmail}
                    isShowSuccess={isShowSuccess}
                    isShowError={isShowError}
                    isPendingInitiatePasswordReset={
                      isPendingInitiatePasswordReset
                    }
                  />
                )
              })
            }}
            prefixIcon={
              <SettingIcon fill="#C5C0D8" width="12px" height="12px" />
            }
            label={t('profile.settings')}
            labelStyle={{
              fontSize: '12px',
              color: '#9E90CF'
            }}
            textAlign="center"
            variant="invisible"
            height={40}
          />
        </div>
      </div>

      {/* Mobile header (unchanged) */}
      <div className="flex items-center justify-between pr-6 mb-6 md:hidden">
        <div className="flex items-center gap-3">
          <UserAvatar />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">
              {profile?.email?.split('@')[0]}
            </span>
            <span className="text-sm font-medium text-purple-200">
              {
                GAME_LEVELS[
                  level?.content?.levelName as keyof typeof GAME_LEVELS
                ]?.name
              }
            </span>
          </div>
        </div>
        <SettingIcon
          onClick={() => setOpenDrawer(true)}
          fill="#9E90CF"
          width="16px"
          height="16px"
        />
      </div>

      <CustomDrawer
        open={openDrawer}
        onOpenChange={() => {
          setIsShowError(false)
          setIsShowSuccess(false)
          setEmail('')
          setStep(1)
          setOpenDrawer(false)
        }}
        title={t('profile.settings')}
      >
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div
                css={actionButtonStyles}
                onClick={() => setStep(2)}
                className="flex items-center w-full h-10 gap-2 p-4 border-app-default "
              >
                <ChangePasswordV2Icon className="w-4 h-4 transition-colors text-app-brand-medium hover:text-app-primary" />
                <span className="text-white text-[14px] font-medium">
                  {t('profile.changePassword')}
                </span>
              </div>

              <div
                css={actionButtonStyles}
                onClick={logout}
                className="flex items-center w-full h-10 gap-2 p-4 border-app-default"
              >
                <LogoutV2Icon className="w-4 h-4" />
                <span className="text-white text-[14px] font-medium">
                  {t('profile.logOut')}
                </span>
              </div>
            </div>

            <LanguageV2 className="w-full h-full !mt-0 !mb-0 !translate-y-[-4px]" />
          </div>
        )}

        <>
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

                  <div
                    className={clsx('w-full mt-4', { '!mt-8': isShowError })}
                  >
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
        </>
      </CustomDrawer>
    </>
  )
}

export default Setting

const actionButtonStyles = css`
  border-radius: 10px;
  ${radialGradientBg};
`
