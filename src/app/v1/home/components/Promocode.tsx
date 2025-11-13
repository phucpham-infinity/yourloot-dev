import CustomButton from '@/components/common/custom-button'
import { cn } from '@/lib/utils'
import NameAndDes from './ui-common/NameAndDes'
// light
import brid3 from '@/assets/icons/home/bg/character_the_bird3.svg'
import lightPromocode from '@/assets/icons/home/light/lightPromocode.svg'
import { FormBuilder } from '@/components/common/form-builder'
import { queryClient } from '@/services'
import {
  PROMOTIONS_QUERY_KEYS,
  promotionsController
} from '@/services/controller'
import { useDialogStore } from '@/store'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

interface PromocodeProps {
  className?: string
}

const Promocode = ({ className }: PromocodeProps) => {
  const formRef = useRef<any>(null)
  const dialog = useDialogStore()
  const {
    useApplyPromoCode,
    useGetAvaiblePromoCode,
    useValidatePromoCodeMutation,
    useApplyPromoCodeMutation
  } = promotionsController()

  const { mutate: applyPromoCode, isPending } = useApplyPromoCode()
  const { mutate: applyPromoCodeMutation, isPending: isApplyPromoCodePending } =
    useApplyPromoCodeMutation()
  const { t } = useTranslation()
  const { mutate: validatePromoCode, isPending: isValidatePromoCodePending } =
    useValidatePromoCodeMutation()
  const { data: promoAvailableCodes } = useGetAvaiblePromoCode()

  const handleErrorApplyPromoCode = () => {
    dialog.openBasicDialog({
      type: 'warning',
      meta: {
        title: t(
          'register.promoCode.error',
          'You are not eligible for this promo code.'
        ),
        button: (
          <div className={'w-full'}>
            <CustomButton
              onClick={() => {
                dialog.closeBasicDialog()
                dialog.close()
              }}
              label={t('promo.code.ok', 'Ok')}
            />
          </div>
        )
      }
    })
  }

  const handleSuccessApplyPromoCode = () => {
    queryClient.invalidateQueries({
      queryKey: [PROMOTIONS_QUERY_KEYS.PROMO_CODE_AVAILABEL]
    })
    // reset form
    formRef?.current?.setFieldValue('promocode', '')
    dialog.openBasicDialog({
      type: 'successful',
      meta: {
        title: t('bonus.promocodeApplied', 'Promocode applied successfully'),
        button: (
          <div className={'w-full'}>
            <CustomButton
              onClick={() => {
                dialog.closeBasicDialog()
                dialog.close()
              }}
              label={t('promo.code.ok', 'Ok')}
            />
          </div>
        )
      }
    })
  }

  // TODO: Check logic here
  // https://trello.com/c/AEs14lqh/433-refactor-promo-code-activation-logic

  const handleSubmitLogin = (value: any) => {
    if (value?.promocode) {
      validatePromoCode(value?.promocode, {
        onSuccess: (response) => {
          // true -> applied
          // false -> not applied
          if (response?.isProm && response?.isValid) {
            dialog.openBasicDialog({
              type: 'warning',
              meta: {
                title: t(
                  'promo.code.warningMessage',
                  'All active bonuses will be cancelled if you apply this promo code.'
                ),
                button: (
                  <div className="flex w-full gap-4">
                    <CustomButton
                      className="w-[148px]"
                      onClick={() => {
                        dialog.closeBasicDialog()
                        dialog.close()
                      }}
                      label={t('promo.code.cancel', 'Cancel')}
                    />
                    <CustomButton
                      className="w-[148px]"
                      isLoading={isPending}
                      onClick={() => {
                        dialog.openBasicDialog({
                          type: 'loading',
                          meta: {
                            description: t(
                              'promo.code.applyingMessage',
                              'Applying promo code. Please wait a little bit ...'
                            )
                          }
                        })
                        applyPromoCode(value?.promocode, {
                          onSuccess: () => {
                            handleSuccessApplyPromoCode()
                          },
                          onError: () => {
                            handleErrorApplyPromoCode()
                          }
                        })
                      }}
                      label={t('promo.code.confirm', 'Confirm')}
                    />
                  </div>
                )
              }
            })
          } else if (response?.isValid && !response?.isProm) {
            applyPromoCodeMutation(value?.promocode, {
              onSuccess: () => {
                handleSuccessApplyPromoCode()
              },
              onError: () => {
                handleErrorApplyPromoCode()
              }
            })
          } else if (!response?.isValid) {
            handleErrorApplyPromoCode()
          } else {
            handleErrorApplyPromoCode()
          }
        }
      })
    }
  }

  const handleOnClickPromoCode = (code: string) => {
    formRef?.current?.setFieldValue('promocode', code)
  }

  return (
    <div
      id="home-promocode"
      className={cn(
        'relative overflow-hidden bg-[#211d38] border-app-default rounded-[20px]  p-5 w-full h-full flex items-start flex-col ',
        className
      )}
    >
      <img src={lightPromocode} className="absolute top-0 " />

      <NameAndDes
        title={t('promo.code.title', 'Got a promo code?')}
        des=""
        className="gap-5"
      />
      <div className="justify-start items-end gap-2.5 inline-flex mt-4">
        <FormBuilder
          ref={formRef}
          className="flex-1"
          gap={14}
          fields={[
            {
              name: 'promocode',
              type: 'text',
              placeholder: t('promo.code.placeholder', 'Enter it here...')
            }
          ]}
          onSubmit={handleSubmitLogin}
          defaultValues={{
            promocode: ''
          }}
        />
        <CustomButton
          isLoading={
            isPending || isValidatePromoCodePending || isApplyPromoCodePending
          }
          onClick={() => {
            formRef.current?.submit()
          }}
          className="w-[120px] !py-4"
          label={t('promo.code.apply', 'Apply')}
        />
      </div>

      {!!promoAvailableCodes && !!promoAvailableCodes?.content?.length && (
        <div className="flex flex-wrap gap-2 z-10 mt-2 max-w-[60%]">
          {promoAvailableCodes?.content?.map((code, index) => (
            <div
              onClick={() => handleOnClickPromoCode(code?.name)}
              className="border-app-default cursor-pointer hover:opacity-80 text-[#9E90CF] font-medium text-xs rounded-[10px] px-[20px] py-[10px] uppercase "
              key={index}
              style={{
                background:
                  'linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.1) 100%)'
              }}
            >
              {code.name}
            </div>
          ))}
        </div>
      )}
      <img
        src={brid3}
        alt="promocode"
        className="absolute top-0 right-0 hidden lg:block"
      />
    </div>
  )
}

export default Promocode
