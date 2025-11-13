import CustomButton from '@/components/common/custom-button'
import IconBtn from '@/components/common/icon-button'
import { RestorePasswordDialog } from '@/components/common/restore-password-dialog'
import { cn, css } from '@/lib/utils'

// svg
import ProgressBar from '@/app/v1/achievement/component/ProgressBar'
import ArrowRightIcon from '@/assets/icons/arrowRight'
import CloseIcon from '@/assets/icons/close'
import EditIcon from '@/assets/icons/edit'
import bridProfileBanner from '@/assets/images/profile/brid-profile-banner.svg'
import warningIcon from '@/assets/images/profile/warning.svg'
import { FormBuilder } from '@/components/common/form-builder'
import Loader from '@/components/common/loader'
import { authController, levelsController } from '@/services/controller'
import { UserProfile, userController } from '@/services/controller/users'
import { useAuthStore, useDialogStore } from '@/store'
import { useProfileStore } from '@/store/slices/profile'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
interface ProfileSettingMobileProps {
  className?: string
  userProfile: UserProfile | undefined
  isLoading: boolean
}

const ProfileSettingMobile = ({
  className,
  userProfile,
  isLoading
}: ProfileSettingMobileProps) => {
  const { isEdit, setIsEdit } = useProfileStore()
  const { useGetUserLevel } = levelsController()
  const { data: level } = useGetUserLevel()

  const { t } = useTranslation()

  return (
    <div
      className={cn(
        'relative w-full gap-10 p-5 rounded-[20px] flex flex-col border-app-default',
        className,
        !isEdit && 'mt-[85px]',
        isLoading ? 'justify-center' : 'justify-between'
      )}
      css={styles}
    >
      {isLoading ? (
        <div className="flex justify-center items-center ">
          <Loader />
        </div>
      ) : (
        <>
          {!isEdit && (
            <>
              <div className="h-[150px] w-full"></div>
              <img
                className="absolute top-[58px] left-[160px] -translate-y-1/2 -translate-x-1/2 w-[360px] h-[303px]"
                src={bridProfileBanner}
              />
            </>
          )}

          <div
            className={cn(
              'flex gap-5 items-center  pt-5  h-full',
              !isEdit && 'border-t-[#C3A2F1] border-t border-solid'
            )}
          >
            <div
              css={styleAvatar}
              className="w-[128px] !min-w-[128px] h-[128px]"
            ></div>
            <div className="flex-col justify-between items-start inline-flex ">
              <div className="self-stretch h-full flex-col justify-start items-start gap-3 flex ">
                <div
                  className=" text-white text-2xl font-black"
                  style={{
                    wordBreak: 'break-word'
                  }}
                >
                  {t('profile.welcome')}
                  <br />
                  {userProfile?.username?.split('@')[0]}
                </div>
                <div className="text-[#c5c0d8] text-sm font-medium">
                  {isEdit
                    ? t('profile.exploreUpdate')
                    : t('profile.lookSettings')}
                </div>
                <div className=" text-center text-[#9d90cf] text-xs font-black ">
                  {level?.content?.levelName}
                </div>
              </div>
            </div>
          </div>

          {!isEdit ? (
            <div className="flex gap-5 flex-col h-full">
              {!userProfile?.phoneNumber && (
                <>
                  {!isEdit && (
                    <div className="gap-5 flex flex-col lg:flex-row justify-between items-center z-10 w-full">
                      <WarningUpdate
                        title={t('profile.provideEmail')}
                        des={t('profile.updateEmailKyc')}
                        onClick={() => setIsEdit(true)}
                      />
                      <WarningUpdate
                        title={t('profile.providePhone')}
                        des={t('profile.updatePhoneKyc')}
                        onClick={() => setIsEdit(true)}
                      />
                    </div>
                  )}
                </>
              )}
              <div className="flex gap-2.5 flex-col">
                <div className=" text-[#c5c0d8] text-xs font-medium ">
                  {t('profile.cashback')} {level?.content?.cashBackValue}%
                </div>
                <ProgressBar
                  percentage={level?.content?.currentUserLevelProgress || 0}
                  maxWidth={677}
                />
                <div className="h-[7px] max-w-[667px] items-center inline-flex w-full justify-between">
                  <div className="Level8 text-[#9d90cf] text-[10px] font-bold">
                    {level?.content?.levelName}
                  </div>
                  <div className="Level9 text-[#9d90cf] text-[10px] font-bold">
                    {level?.content?.levelName !== level?.content?.maxUserLevel
                      ? level?.content?.nextUserLevel
                      : ''}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <UpdateProfie userProfile={userProfile} />
          )}
        </>
      )}
    </div>
  )
}

export default ProfileSettingMobile

const styles = css`
  background: radial-gradient(
    237.29% 116.82% at 60.95% -22.92%,
    #362c5a 0%,
    #181526 100%
  );
`

const styleAvatar = css`
  border-radius: 50%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.1) 100%
  );
  box-shadow:
    6px 6px 12px 0px rgba(22, 20, 24, 0.5),
    -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
`

const WarningUpdate = ({
  title,
  des,
  onClick
}: {
  title: string
  des: string
  onClick: () => void
}) => {
  return (
    <div className="w-full justify-between items-center  inline-flex">
      <div className="flex gap-2.5 items-center">
        <img src={warningIcon} className="" />
        <div className="flex-col justify-start items-start gap-2.5 inline-flex">
          <div className="text-[#e3af74] text-sm leading-3.5 font-medium font-['Satoshi']">
            {title}
          </div>
          <div className=" text-[#c5c0d8] text-[10px] leading-[10px] font-bold font-['Satoshi']">
            {des}
          </div>
        </div>
      </div>
      <IconBtn icon={<ArrowRightIcon />} onClick={onClick} />
    </div>
  )
}

const UpdateProfie = ({
  userProfile
}: {
  userProfile: UserProfile | undefined
}) => {
  const formRefEmail = useRef<any>(null)
  const formRefCountry = useRef<any>(null)
  const formRefBirthDate = useRef<any>(null)
  // const formRefPhoneNumber = useRef<any>(null)

  const dialog = useDialogStore()
  const {
    setIsEdit,
    isEditEmail,
    isEditBirthDate,
    // isEditPhoneNumber,
    setIsEditEmail,
    setIsEditBirthDate,
    // setIsEditPhoneNumber,
    isLoadingEmail,
    isLoadingBirthDate,
    // isLoadingPhoneNumber,
    setIsLoadingEmail,
    setIsLoadingBirthDate
    // setIsLoadingPhoneNumber
  } = useProfileStore()

  const { userId, logout, refreshToken } = useAuthStore()

  const { useUpdateUserProfile, useGetUserProfile } = userController()
  const { mutate: updateUserProfile } = useUpdateUserProfile()

  const { refetch } = useGetUserProfile(userId!)
  const { t } = useTranslation()

  const submitEmail = (value: any) => {
    console.log('handleSubmitLogin', value)
    setIsLoadingEmail(true)

    updateUserProfile(
      {
        userId: userProfile?.userId || '',
        data: {
          ...userProfile,
          email: value?.email || ''
        }
      },
      {
        onSuccess: () => {
          setIsLoadingEmail(false)
          dialog.openBasicDialog({
            type: 'successful',
            meta: {
              title: t('profile.emailApplied'),
              description: t('profile.emailAdded'),
              button: (
                <div className={'w-full'}>
                  <CustomButton
                    onClick={() => {
                      dialog.closeBasicDialog()
                      dialog.close()
                      refetch()
                      setIsEditEmail(true)
                    }}
                    label={t('profile.great')}
                  />
                </div>
              )
            }
          })
        },
        onError: () => {
          setIsLoadingEmail(false)
        }
      }
    )
  }

  const submitBirthDate = (value: any) => {
    console.log('handleSubmitLogin', value)
    setIsLoadingBirthDate(true)

    updateUserProfile(
      {
        userId: userProfile?.userId || '',
        data: {
          ...userProfile,
          dateOfBirth: value?.dateOfBirth || ''
        }
      },
      {
        onSuccess: () => {
          setIsLoadingBirthDate(false)
          dialog.openBasicDialog({
            type: 'successful',
            meta: {
              title: 'Settings birth date applied',
              description: 'Birth date successfully added!',
              button: (
                <div className={'w-full'}>
                  <CustomButton
                    onClick={() => {
                      dialog.closeBasicDialog()
                      dialog.close()
                      refetch()
                      setIsEditBirthDate(true)
                    }}
                    label="Great"
                  />
                </div>
              )
            }
          })
        },
        onError: () => {
          setIsLoadingBirthDate(false)
        }
      }
    )
  }

  const { useLogoutAllMutation, useLogoutMutation } = authController()

  const { mutate: logoutAll, isPending: isPendingLogoutAll } =
    useLogoutAllMutation()
  const { mutate: logoutCurrent, isPending: isPendingLogoutCurrent } =
    useLogoutMutation()

  const handleLogout = (type: 'all' | 'current') => {
    if (type === 'all') {
      logoutAll({ userId: userId! }, { onSuccess: () => logout() })
    } else {
      logoutCurrent(
        { userId: userId!, refreshToken: refreshToken! },
        { onSuccess: () => logout() }
      )
    }
  }

  return (
    <div className="flex gap-5 items-start justify-between flex-col  z-10">
      <div className="flex justify-between w-full items-center text-white text-2xl font-black ">
        <div className="text-white text-2xl font-black">
          {' '}
          {t('profile.settings')}
        </div>
        <IconBtn
          icon={<CloseIcon />}
          onClick={() => {
            setIsEdit(false)
          }}
        />
      </div>

      <div className="w-full flex flex-col gap-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
          <div className="self-stretch flex flex-row justify-between items-end gap-2.5">
            <FormBuilder
              ref={formRefEmail}
              className="flex-1"
              gap={14}
              fields={[
                {
                  name: 'email',
                  type: 'text',
                  label: t('profile.yourEmail'),
                  placeholder: 'email@email.com',
                  colSpan: 12,
                  disabled: !!userProfile?.email && isEditEmail
                }
              ]}
              onSubmit={submitEmail}
              defaultValues={{
                email: ''
              }}
            />
            {userProfile?.email && isEditEmail ? (
              <IconBtn
                icon={<EditIcon />}
                className="h-[42px] w-[42px]"
                onClick={() => {
                  setIsEditEmail(!isEditEmail)
                }}
              />
            ) : (
              <CustomButton
                isLoading={isLoadingEmail}
                onClick={() => {
                  formRefEmail.current?.submit()
                }}
                label={t('profile.add')}
                className="w-fit"
              />
            )}
          </div>
          <FormBuilder
            ref={formRefCountry}
            className="w-full"
            gap={14}
            fields={[
              {
                name: 'country',
                type: 'text',
                label: t('profile.yourCountry'),
                placeholder: 'Russian Federation',
                colSpan: 12,
                disabled: true,
                renderDescription: (content) => (
                  <div className="w-full text-right text-[#6b6294] text-[10px] font-bold">
                    {content}
                  </div>
                )
              }
            ]}
            onSubmit={() => {}}
            defaultValues={{
              country: userProfile?.address?.country || ''
            }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
          <div className=" flex flex-row justify-between items-end gap-2.5">
            <FormBuilder
              ref={formRefBirthDate}
              className="flex-1"
              gap={14}
              fields={[
                {
                  name: 'dateOfBirth',
                  type: 'text',
                  label: t('profile.birthDate'),
                  placeholder: '14.01.2025',
                  description: !userProfile?.dateOfBirth
                    ? t('profile.missingBirthDate')
                    : '',
                  disabled: !!userProfile?.dateOfBirth && isEditBirthDate,
                  colSpan: 12,
                  renderDescription: (content) => (
                    <div className="w-full text-left text-[#E3B075] text-[10px] font-bold">
                      {content}
                    </div>
                  )
                }
              ]}
              onSubmit={submitBirthDate}
              defaultValues={{
                dateOfBirth: ''
              }}
            />
            {userProfile?.dateOfBirth && isEditBirthDate ? (
              <IconBtn
                icon={<EditIcon />}
                className="h-[42px] w-[42px]"
                onClick={() => {
                  setIsEditBirthDate(!isEditBirthDate)
                }}
              />
            ) : (
              <CustomButton
                isLoading={isLoadingBirthDate}
                onClick={() => {
                  formRefBirthDate.current?.submit()
                }}
                label={t('profile.add')}
                className="w-fit"
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2.5 w-full mt-5 flex-wrap">
        <RestorePasswordDialog
          onSuccess={() => {
            // formRef.current.reset()
          }}
        >
          <CustomButton label={t('profile.changePassword')} className="w-fit" />
        </RestorePasswordDialog>

        <CustomButton
          onClick={() => handleLogout('all')}
          label={t('profile.logOut')}
          className="w-fit"
          isLoading={isPendingLogoutAll}
        />
        <CustomButton
          onClick={() => handleLogout('current')}
          label={t('profile.signOut')}
          variant="muted"
          className="w-fit"
          isLoading={isPendingLogoutCurrent}
        />
      </div>
    </div>
  )
}
