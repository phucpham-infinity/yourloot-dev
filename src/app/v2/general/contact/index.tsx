import TelegramIcon from '@/assets/icons/social/telegram'
import CustomButton from '@/components/common/custom-button'
import { FormBuilder } from '@/components/common/form-builder'
import IconBtn from '@/components/common/icon-button'
import { useSubmitFeedback } from '@/services/controller/feedback'
import { useDialogStore, useProfileStore } from '@/store'

import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import { YourLootSupportBotLink } from '@/constants'
import useToast from '@/hooks/use-toast'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import TitleGeneralV2 from '../TitleGeneralV2'

export default function ContactPageV2() {
  const [showFeedback, setShowFeedback] = useState(false)
  const formRefMobile = useRef<any>(null)
  const formRefDesktop = useRef<any>(null)
  const navigate = useNavigate()
  const dialog = useDialogStore()
  const userId = useProfileStore((s) => s.userId || s.profile?.userId || '')
  const {
    mutate: submitFeedback,
    isSuccess: isSuccessSubmitFeedback,
    isError: isErrorSubmitFeedback
  } = useSubmitFeedback()
  const { t } = useTranslation()
  const toast = useToast()

  useEffect(() => {
    if (isErrorSubmitFeedback) {
      toast.error(
        t('contact.form.error') ||
          'Oops! Something went wrong. Please try again.',
        {
          duration: 4000,
          position: 'bottom-center'
        }
      )
    }
  }, [isErrorSubmitFeedback, toast, t])

  useEffect(() => {
    if (isSuccessSubmitFeedback) {
      handleSubmitLogin()
    }
  }, [isSuccessSubmitFeedback])

  const handleClick = () => {
    window.open(YourLootSupportBotLink, '_blank')
  }

  const handleSubmitLogin = () => {
    dialog.openBasicDialog({
      type: 'successful',
      meta: {
        title: t('contact.form.success'),
        description: (
          <>
            <span>{t('contact.form.thanks')}</span>
          </>
        ),
        button: (
          <div className="w-full">
            <CustomButton
              variant={'default'}
              className="w-full text-center"
              label={t('contact.form.great')}
              onClick={() => {
                dialog.closeBasicDialog()
              }}
            />
          </div>
        )
      }
    })
  }
  return (
    <div className="h-full overflow-y-auto md:w-[904px] md:py-[24px] md:mx-auto">
      <div className="flex flex-col h-full lg:flex-row lg:gap-6">
        <div className="flex-1">
          <div className="text-[12px] text-[#9E90CF] justify-start items-start lg:h-[600px] lg:overflow-y-scroll lg:scrollbar-thin lg:scrollbar-track-transparent lg:scrollbar-thumb-[#322849]">
            <TitleGeneralV2
              titleClassName="text-v2-app-medium-16 font-black text-white "
              title="Contact Us"
              icon={<ArrowLeftIcon className="w-4 h-4" />}
              onClick={() => {
                navigate('/')
              }}
            />
            <div className="text-v2-app-medium-12 !leading-[16px] font-['Satoshi']  flex flex-col gap-[24px] pt-5">
              <div>
                <span className=" text-[#9E90CF] text-v2-app-medium-12 !leading-[16px] font-['Satoshi']">
                  {t('contact.description')}
                </span>
                <span className="text-white text-v2-app-medium-12 !leading-[16px] font-['Satoshi'] underline">
                  info@yourloot.xyz
                </span>
              </div>
              <div className=" text-[#9E90CF] text-v2-app-medium-12 !leading-[16px] font-['Satoshi']">
                {t('contact.form.message')}
              </div>
              <div className="flex gap-2">
                <CustomButton
                  onClick={() => setShowFeedback(true)}
                  label={t('contact.sendFeedback')}
                  className="w-fit flex gap-3 bg[#0F0D13]"
                />

                <IconBtn
                  icon={<TelegramIcon />}
                  className="border-0"
                  onClick={handleClick}
                />
              </div>
            </div>

            {/* Feedback form - Mobile: inside scrollable content, Desktop: separate column */}
            {showFeedback && (
              <div className="w-full mt-6 lg:hidden">
                <div className="border border-[#413c4a] rounded-[20px] bg-[#1A1526] text-[#9E90CF] p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-white text-v2-app-medium-16">
                      {t('contact.form.feedback.title')}
                    </h2>
                    <button
                      onClick={() => setShowFeedback(false)}
                      className="text-[#9E90CF] text-v2-app-medium-12 !leading-[16px] hover:text-white transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-[#9d90cf] text-v2-app-medium-12 !leading-[16px] mb-6">
                    {t('contact.form.feedback.description')}
                  </p>

                  <div className="w-full">
                    <FormBuilder
                      gap={24}
                      ref={formRefMobile}
                      fields={[
                        {
                          name: 'name',
                          type: 'text',
                          label: t('contact.form.feedback.yourName'),
                          placeholder: t('contact.form.feedback.yourName'),
                          colSpan: 12,
                          validators: {
                            onChange: ({ value }: { value: any }) =>
                              !value ? t('common.required') : undefined
                          }
                        },
                        {
                          name: 'email',
                          type: 'text',
                          inputType: 'email',
                          label: t('contact.form.feedback.yourEmail'),
                          placeholder: 'example@example.com',
                          colSpan: 12,
                          validators: {
                            onChange: ({ value }: { value: any }) => {
                              if (!value) return t('register.emailRequired')
                              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                              return emailRegex.test(
                                String(value).toLowerCase()
                              )
                                ? undefined
                                : t('register.invalidEmail')
                            }
                          }
                        },
                        {
                          name: 'question',
                          type: 'textarea',
                          rows: 10,
                          label: t('contact.form.feedback.yourQuestion'),
                          placeholder: t('contact.form.feedback.yourQuestion'),
                          colSpan: 12,
                          validators: {
                            onChange: ({ value }: { value: any }) =>
                              !value ? t('common.required') : undefined
                          }
                        }
                      ]}
                      onSubmit={(value) => {
                        if (!userId) return
                        submitFeedback({
                          userId: userId,
                          email: value.email,
                          name: value.name,
                          feedbackText: value.question
                        })
                      }}
                      defaultValues={{
                        email: '',
                        name: '',
                        question: ''
                      }}
                    />
                    <div className="flex flex-col justify-between w-full gap-3 pt-5">
                      <CustomButton
                        onClick={() => setShowFeedback(false)}
                        variant="muted"
                        label={t('contact.form.feedback.cancel')}
                        className="w-full flex gap-3 bg[#0F0D13]"
                      />
                      <CustomButton
                        onClick={() => {
                          formRefMobile.current?.submit()
                        }}
                        label={t('contact.form.feedback.sendMessage')}
                        className="w-full flex gap-3 bg[#0F0D13]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Feedback form - Desktop only */}
        {showFeedback && (
          <div className="hidden w-full lg:block lg:w-1/3 lg:max-w-md">
            <div className="border border-[#413c4a] rounded-[20px] bg-[#1A1526] text-[#9E90CF] p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-white text-v2-app-medium-16">
                  {t('contact.form.feedback.title')}
                </h2>
                <button
                  onClick={() => setShowFeedback(false)}
                  className="text-[#9E90CF] text-v2-app-medium-12 !leading-[16px] hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <p className="text-[#9d90cf] text-v2-app-medium-12 !leading-[16px] mb-6">
                {t('contact.form.feedback.description')}
              </p>

              <div className="w-full">
                <FormBuilder
                  gap={24}
                  ref={formRefDesktop}
                  fields={[
                    {
                      name: 'name',
                      type: 'text',
                      label: t('contact.form.feedback.yourName'),
                      placeholder: t('contact.form.feedback.yourName'),
                      colSpan: 12,
                      validators: {
                        onChange: ({ value }: { value: any }) =>
                          !value ? t('common.required') : undefined
                      }
                    },
                    {
                      name: 'email',
                      type: 'text',
                      inputType: 'email',
                      label: t('contact.form.feedback.yourEmail'),
                      placeholder: 'example@example.com',
                      colSpan: 12,
                      validators: {
                        onChange: ({ value }: { value: any }) => {
                          if (!value) return t('register.emailRequired')
                          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                          return emailRegex.test(String(value).toLowerCase())
                            ? undefined
                            : t('register.invalidEmail')
                        }
                      }
                    },
                    {
                      name: 'question',
                      type: 'textarea',
                      rows: 10,

                      label: t('contact.form.feedback.yourQuestion'),
                      placeholder: t('contact.form.feedback.yourQuestion'),

                      validators: {
                        onChange: ({ value }: { value: any }) =>
                          !value ? t('common.required') : undefined
                      }
                    }
                  ]}
                  onSubmit={(value) => {
                    if (!userId) return
                    submitFeedback({
                      userId: userId,
                      email: value.email,
                      name: value.name,
                      feedbackText: value.question
                    })
                  }}
                  defaultValues={{
                    email: '',
                    name: '',
                    question: ''
                  }}
                />
                <div className="flex flex-row justify-between w-full gap-3 pt-5">
                  <CustomButton
                    onClick={() => setShowFeedback(false)}
                    variant="muted"
                    label={t('contact.form.feedback.cancel')}
                    className="w-fit flex gap-3 bg[#0F0D13]"
                  />
                  <CustomButton
                    onClick={() => {
                      formRefDesktop.current?.submit()
                    }}
                    label={t('contact.form.feedback.sendMessage')}
                    className="w-[70%] flex gap-3 bg[#0F0D13]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
