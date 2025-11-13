import ArrowLeft from '@/assets/icons/arrowLeft.tsx'
import Promocode from '@/assets/images/promocode/promocode.svg'
import CustomButton from '@/components/common/custom-button'
import { FormBuilder, FormBuilderRef } from '@/components/common/form-builder'
import { css } from '@/lib/utils.ts'
import { promotionsController } from '@/services/controller'
import { useDialogStore } from '@/store'
import { Search } from 'lucide-react'
import { useRef } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface CodeSearchBarProps {
  onSearch: (code: string) => void
}

export default function CodeSearchBar({ onSearch }: CodeSearchBarProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const formRef = useRef<FormBuilderRef>(null)
  const formRef1 = useRef<FormBuilderRef>(null)
  const { useApplyPromoCode } = promotionsController()
  const { mutate: applyPromoCode, isPending } = useApplyPromoCode()
  const dialog = useDialogStore()

  const handleSubmit = (values: { code: string }) => {
    const promoCode = values.code?.trim() ?? ''
    // Always call onSearch, even with empty string
    onSearch(promoCode)
  }

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
    <div className="inline-flex w-full pt-3 pb-3 mx-auto mb-4 max-lg:w-full max-lg:flex-col lg:mb-0 max-lg:justify-start max-lg:pb-0 lg:justify-between lg:items-center">
      <div className="flex items-center justify-start gap-1 max-lg:w-full">
        <div data-svg-wrapper>
          <img src={Promocode} alt="Logo" className="w-[53px]" />
        </div>
        <div className="text-white text-2xl font-black font-['Satoshi']">
          {t('bonus.myPromoCode')}
        </div>
      </div>
      <div
        className="items-center justify-start gap-2 max-lg:w-full"
        css={isMobile ? griMobileButtonFnc() : gridButtonFnc()}
      >
        <CustomButton
          label={t('bonus.back')}
          prefixIcon=<ArrowLeft />
          className="items-start text-left text-[#9d90cf] text-xs font-medium font-['Satoshi'] inline-flex gap-2 justify-start item-1"
          variant="muted"
          onClick={() => {
            navigate(-1)
          }}
        />
        <div className="item-2 relative inline-flex items-start text-left text-[#9d90cf] text-xs font-medium font-['Satoshi'] w-full z-10">
          <FormBuilder
            className="flex-1 pb-2"
            ref={formRef}
            gap={0}
            fields={[
              {
                name: 'code',
                type: 'text',
                placeholder: t('bonus.enterPromoCode'),
                colSpan: 12
              }
            ]}
            defaultValues={{ code: '' }}
            onSubmit={handleSubmit}
          />
          <span
            className="absolute w-3 h-3 right-[26px] top-[25px] cursor-pointer flex items-center"
            onClick={() => {
              formRef.current?.submit()
            }}
          >
            <Search />
          </span>
        </div>
        <FormBuilder
          className="flex-1 pb-2 item-3"
          ref={formRef1}
          gap={0}
          fields={[
            {
              name: 'code',
              type: 'text',
              placeholder: t('bonus.enterPromoCode'),
              colSpan: 12
            }
          ]}
          defaultValues={{
            code: ''
          }}
          onSubmit={handleApplyCodeSubmit}
        />
        <CustomButton
          isLoading={isPending}
          onClick={() => {
            formRef1.current?.submit()
          }}
          label={t('bonus.applyNewPromoCode')}
          className="items-start text-center text-[#9d90cf] text-xs font-medium font-['Satoshi'] item-4"
          variant="default"
        />
      </div>
    </div>
  )
}

const gridButtonFnc = () => {
  return css`
        display: grid;
        grid-template-columns: auto 1fr 2fr 1fr;
    );
  `
}

const griMobileButtonFnc = () => {
  return css`
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-areas:
                "item-1 item-2 item-2 item-2"
                "item-4 item-4 item-3 item-3";
        .item-1 {
            grid-area: item-1;
        }

        .item-2 {
            grid-area: item-2;
        }

        .item-3 {
            grid-area: item-3;
        }

        .item-4 {
            grid-area: item-4;
        }
    );
  `
}
