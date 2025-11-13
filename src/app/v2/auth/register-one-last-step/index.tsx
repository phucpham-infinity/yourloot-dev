import CustomButton from '@/components/common/custom-button'
import { FormBuilder } from '@/components/common/form-builder'
import { Checkbox } from '@/components/ui/checkbox'

import { COUNTRIES } from '@/constants'
import i18n from '@/lib/i18n'
import { preferencesController } from '@/services/controller'
import { useAuthStore, useDialogStore } from '@/store'
import { useRegisterStore } from '@/store/slices/register'
import { differenceInYears } from 'date-fns'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export function RegisterOneLastStepV2({
  onSuccess,
  currentUserId
}: {
  onSuccess?: (value?: any) => void
  currentUserId?: string | null
}) {
  const formRef = useRef<any>(null)
  const dialog = useDialogStore()
  const { userId, setPreferences, promoCode } = useRegisterStore()
  const { isAuthenticated } = useAuthStore()
  const { t } = useTranslation()

  const handleSubmitLogin = () => {
    formRef?.current?.submit()
  }
  const { usePostPreferences } = preferencesController()

  const {
    mutate: postPreferences,
    isPending: isPostPreferencesPending,
    data: postPreferencesData,
    isError: isPostPreferencesError
  } = usePostPreferences()

  const onSubmit = (value: any) => {
    setPreferences({
      // language: value.language,
      language: i18n.language,
      currency: value.currency,
      dateOfBirth: value.dateOfBirth,
      country: value.country
    })
    if (isAuthenticated) {
      postPreferences({
        userId: userId ?? currentUserId ?? '',
        // language: value.language,
        language: i18n.language,
        currency: value.currency,
        dateOfBirth: value.dateOfBirth,
        country: value.country,
        promoCode: promoCode ?? ''
      })
    } else {
      onSuccess?.()
      dialog.close()
    }
  }

  useEffect(() => {
    if (isPostPreferencesError) {
      onSuccess?.()
      dialog.close()
    }
  }, [isPostPreferencesError])

  useEffect(() => {
    if (postPreferencesData) {
      onSuccess?.(postPreferencesData)
      dialog.close()
    }
  }, [postPreferencesData])

  const [isAgree, setIsAgree] = useState(false)
  const [isConfirm, setIsConfirm] = useState(false)

  return (
    <div className="w-full flex flex-col items-start justify-center gap-5 relative overflow-hidden">
      <div className="flex flex-col items-start gap-4 relative ">
        <div className="relative self-stretch text-app-white text-app-main-20">
          {t('register.oneLastStep')}
        </div>

        <p className="relative w-full text-app-pale text-app-medium-12">
          {t('register.completeSignUp')}
        </p>
      </div>
      <div className="content-wrapper w-full flex flex-col gap-10 ">
        <div className="w-full">
          <FormBuilder
            gap={20}
            ref={formRef}
            fields={[
              {
                name: 'country',
                type: 'select',
                label: t('register.country'),
                placeholder: t('register.country'),
                searchable: true,
                colSpan: 12,
                validators: {
                  onChange: ({ value }: any) => {
                    if (!value) {
                      return (
                        <span className="text-red-500">
                          {t('register.selectCountry')}
                        </span>
                      )
                    }
                    return false
                  }
                },
                selectedRender: (origin, options) => {
                  const item = options?.find((item) => item.value === origin)
                  return (
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full overflow-hidden">
                        <img
                          className="w-full h-full object-cover"
                          src={item?.flag}
                          alt={item?.label}
                        />
                      </span>
                      <span>{item?.label}</span>
                    </div>
                  )
                },
                optionRender: (origin, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={origin.flag}
                        alt={origin.label}
                      />
                    </span>
                    <span>{origin.label}</span>
                  </div>
                ),
                options: COUNTRIES
              },
              {
                name: 'dateOfBirth',
                type: 'date',
                label: t('register.dateOfBirth'),
                placeholder: t('register.birthday'),
                colSpan: 12,
                validators: {
                  onSubmit: ({ value }: any) => {
                    if (!value) {
                      return (
                        <span className="text-red-500">
                          {t('register.selectDateOfBirth')}
                        </span>
                      )
                    }
                    const age = differenceInYears(new Date(), new Date(value))
                    if (age < 18) {
                      return (
                        <span className="text-red-500">
                          {t('register.mustBe18')}
                        </span>
                      )
                    }
                    return false
                  }
                }
              },
              {
                name: 'currency',
                type: 'select',
                label: t('register.preferredCurrency'),
                placeholder: t('register.selectCur'),
                colSpan: 12,
                validators: {
                  onSubmit: ({ value }: any) => {
                    if (!value) {
                      return (
                        <span className="text-red-500">
                          {t('register.selectCurrency')}
                        </span>
                      )
                    }
                    return false
                  }
                },
                options: [
                  {
                    label: 'USD',
                    value: 'USD'
                  },
                  {
                    label: 'EUR',
                    value: 'EUR'
                  },
                  {
                    label: 'UZS',
                    value: 'UZS'
                  },
                  {
                    label: 'KZT',
                    value: 'KZT'
                  },
                  {
                    label: 'RUB',
                    value: 'RUB'
                  },
                  {
                    label: 'GEL',
                    value: 'GEL'
                  },
                  {
                    label: 'AMD',
                    value: 'AMD'
                  },
                  {
                    label: 'AZN',
                    value: 'AZN'
                  }
                ]
              }
            ]}
            onSubmit={onSubmit}
            defaultValues={{
              language: '',
              currency: '',
              dateOfBirth: '',
              country: ''
            }}
          />
        </div>
        <div className="w-full flex flex-col gap-5">
          <div className="flex  items-center justify-start gap-2">
            <Checkbox
              name="isAgree"
              id="isAgree"
              className="data-[state=checked]:bg-[#D9CFF8] cursor-pointer"
              checkIconStyle={{
                color: isAgree ? '#644EC7' : '#9E90CF'
              }}
              value={isAgree.toString()}
              onCheckedChange={(checked) => {
                setIsAgree(checked === 'indeterminate' ? false : checked)
              }}
            />
            <div className="text-xs flex flex-row  font-medium text-[#9E90CF]">
              {t('register.agree')}
              <a
                href="/terms-and-conditions"
                target="_blank"
                rel="noopener noreferrer"
                className=" underline hover:text-[#644EC7] transition-colors"
              >
                {t('register.termsAndConditions')}
              </a>
            </div>
          </div>
          <div className="flex items-center justify-start gap-2">
            <Checkbox
              name="isConfirm"
              id="isConfirm"
              className="data-[state=checked]:bg-[#D9CFF8] cursor-pointer"
              checkIconStyle={{
                color: isConfirm ? '#644EC7' : '#9E90CF'
              }}
              value={isConfirm.toString()}
              onCheckedChange={(checked) => {
                setIsConfirm(checked === 'indeterminate' ? false : checked)
              }}
            />

            <div className="text-[14px] font-medium text-[#9E90CF]">
              {t('register.confirmAge')}
            </div>
          </div>
        </div>
      </div>

      <div className={'w-full '}>
        <CustomButton
          onClick={handleSubmitLogin}
          label={t('login.registerHere')}
          disabled={!isAgree || !isConfirm || isPostPreferencesPending}
          isLoading={isPostPreferencesPending}
        />
      </div>
    </div>
  )
}
