import CustomButton from '@/components/common/custom-button'
import { cn } from '@/lib/utils'
// light
import NameAndDes from '@/app/v1/home/components/ui-common/NameAndDes'
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
  const {
    useApplyPromoCode,
    useGetAvaiblePromoCode,
    useValidatePromoCodeMutation,
    useApplyPromoCodeMutation
  } = promotionsController()
  const { mutate: applyPromoCode, isPending } = useApplyPromoCode()
  const { mutate: applyPromoCodeMutation, isPending: isApplyPromoCodePending } =
    useApplyPromoCodeMutation()
  const { mutate: validatePromoCode, isPending: isValidatePromoCodePending } =
    useValidatePromoCodeMutation()
  const dialog = useDialogStore()
  const { t } = useTranslation()

  const { data: promoAvailableCodes } = useGetAvaiblePromoCode('')

  // const handleApplyPromoCode = (value: any) => {
  //   applyPromoCode(value?.promocode, {
  //     onSuccess: () => {
  //       dialog.openBasicDialog({
  //         type: 'successful',
  //         meta: {
  //           title: t('register.promoCode.applied'),
  //           description: t('register.promoCode.appliedDescriptionNew', {
  //             newCode: value?.promocode
  //           }),
  //           button: (
  //             <div className="w-full">
  //               <CustomButton
  //                 variant={'default'}
  //                 className="w-full text-center"
  //                 label={t('register.promoCode.great')}
  //                 onClick={() => {
  //                   dialog.closeBasicDialog()
  //                 }}
  //               />
  //             </div>
  //           )
  //         }
  //       })
  //     }
  //   })
  // }

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
              label={t('register.promoCode.great', 'Great!')}
            />
          </div>
        )
      }
    })
  }

  const handleSubmitLogin = (value: any) => {
    // const activeCode =
    //   !!promoActiveCodes && promoActiveCodes?.content?.[0]
    //     ? promoActiveCodes?.content?.[0]?.name
    //     : 'Welcome Bonus'
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

      // dialog.openBasicDialog({
      //   type: 'warning',
      //   meta: {
      //     title: t('bonus.detail.warning'),
      //     description: t('bonus.detail.messageActive', {
      //       currentCode: activeCode,
      //       newCode: value?.promocode
      //     }),
      //     button: (
      //       <div className="inline-flex items-center justify-between w-full gap-3 pr-5">
      //         <CustomButton
      //           variant={'muted'}
      //           className="w-3/5"
      //           label={t('balance.switchWallet.cancel')}
      //           onClick={() => dialog.closeBasicDialog()}
      //         />
      //         <CustomButton
      //           variant={'default'}
      //           isLoading={isPending}
      //           disabled={isPending}
      //           className="w-2/5 text-center"
      //           label={t('balance.switchWallet.confirm')}
      //           onClick={() => handleApplyPromoCode(value)}
      //         />
      //       </div>
      //     )
      //   }
      // })
    }
  }

  const handleOnClickPromoCode = (code: string) => {
    formRef?.current?.setFieldValue('promocode', code)
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-[#211d38] rounded-[20px] p-10 w-full h-full flex items-start flex-col ',
        className
      )}
    >
      <img src={lightPromocode} className="absolute top-0" />
      <NameAndDes
        title={t('promo.code.title', 'Got a promo code?')}
        // des={t('bonus.promoCodeDes')}
        des=""
        className="gap-5 max-w-[230px]"
      />
      <div className="justify-start items-end gap-2.5 inline-flex w-3/5 mt-4">
        <FormBuilder
          ref={formRef}
          className="flex-1 lg:min-w-[230px] min-w-[190px]"
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
          label={t('bonus.apply', 'Apply')}
        />
      </div>

      {!!promoAvailableCodes && !!promoAvailableCodes?.content?.length && (
        <div className="flex flex-wrap gap-2 z-10 mt-4 max-w-[60%]">
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

      {/* <img
        src={brid3}
        alt="promocode"
        className="absolute top-0 right-[-25px] lg:right-[-50px] h-full lg:w-7/11 w-5/11"
      /> */}
    </div>
  )
}

export default Promocode
