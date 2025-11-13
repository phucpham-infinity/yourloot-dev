import CustomButton from '@/components/common/custom-button'
import { FormBuilder, FormBuilderRef } from '@/components/common/form-builder'
import { css } from '@/lib/utils.ts'
import { promotionsController } from '@/services/controller'
import { useDialogStore } from '@/store'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function PromocodeRightSide() {
  const dialog = useDialogStore()
  const formRef1 = useRef<FormBuilderRef>(null)
  const [disabledApply, setDisabledApply] = useState(true)
  const { useApplyPromoCode } = promotionsController()
  const { mutate: applyPromoCode, isPending } = useApplyPromoCode()
  const { t } = useTranslation()
  const handleApplyCodeSubmit = (value: any) => {
    if (value?.code) {
      applyPromoCode(value?.code, {
        onSuccess: () => {
          dialog.openBasicDialog({
            type: 'successful',
            meta: {
              title: t('bonus.promocodeApplied'),
              description: t('bonus.promocodeAppliedSuccessfully')
            }
          })
        }
      })
    }
  }

  return (
    <div
      className="relative w-1/2 rounded-2xl border border-[#403b4a] flex-col justify-end flex max-lg:w-full"
      css={activeCodeCssFn()}
    >
      <div className="relative w-full h-143">
        <img
          className="absolute max-w-xl -top-40 -right-35"
          src="/images/character_bird.png"
          css={imageCssFn()}
        />
      </div>
      <div className="flex-col items-center justify-start gap-5 p-10">
        <div className="w-[234px] text-white text-xl font-black font-['Satoshi'] pb-3">
          {t('bonus.applyNewPromoCode')}
        </div>
        <div className="w-[289px] text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
          {t('bonus.enterNewPromocodeToApply')}
        </div>
      </div>
      <div className="self-stretch justify-start items-end gap-2.5 inline-flex pl-10 pr-10 pb-5">
        <FormBuilder
          className="flex-1"
          ref={formRef1}
          gap={0}
          fields={[
            {
              name: 'code',
              type: 'text',
              placeholder: t('register.promoCode.title'),
              colSpan: 12,
              listeners: {
                onChange: ({ value }) => {
                  if (value.length > 3) setDisabledApply(false)
                  else setDisabledApply(true)
                }
              }
            }
          ]}
          defaultValues={{
            code: ''
          }}
          onSubmit={handleApplyCodeSubmit}
        />
        <CustomButton
          disabled={disabledApply}
          isLoading={isPending}
          className="w-[120px]"
          onClick={() => {
            formRef1.current?.submit()
            // dialog.open({
            //   content: (
            //     <CodeApplyDialog
            //       canSwitch
            //       promoCode={''}
            //       onClose={() => dialog.close()}
            //     />
            //   ),
            //   width: 400
            // })
          }}
          label={t('bonus.apply')}
          textAlign="center"
        />
      </div>
    </div>
  )
}

const activeCodeCssFn = () => {
  return css`
    background-image: linear-gradient(180deg, #2a2446 20%, #151323 70%);
    overflow: hidden;
  `
}

const imageCssFn = () => {
  return css`
    transform: scaleX(-1) rotate(10deg);
  `
}
