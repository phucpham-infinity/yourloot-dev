import Logo from '@/assets/images/yourloot-logotype-full-horizontal.png'
import CustomButton from '@/components/common/custom-button'
import { FormBuilder } from '@/components/common/form-builder'
import { css } from '@/lib/utils'
import { useRef } from 'react'
import { isMobile } from 'react-device-detect'

export function EmailConfirmCodeDialog({
  onSuccess
}: {
  onSuccess?: () => void
}) {
  const formRef = useRef<any>(null)

  const handleSubmitLogin = () => {
    formRef?.current?.submit()
  }

  return (
    <div
      css={styled}
      className="w-full flex flex-col items-start justify-center gap-10 p-10 relative  overflow-hidden"
    >
      <img src={Logo} alt="logo" />
      <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
        <div className="relative self-stretch text-app-white text-app-main-20">
          Enter confirmation code
        </div>

        <p className="relative w-[289px] text-app-pale text-app-medium-12">
          You will receive your code in approx. 1 minute.
        </p>
      </div>
      <div className="w-full">
        <FormBuilder
          gap={40}
          ref={formRef}
          fields={[
            {
              name: 'code',
              type: 'text',
              label: 'Confirmation code:',
              placeholder: 'YYYY',
              colSpan: 12
            }
          ]}
          onSubmit={() => {
            onSuccess?.()
          }}
          defaultValues={{
            email: ''
          }}
        />
      </div>

      <div className={'w-full'}>
        <CustomButton onClick={handleSubmitLogin} label="Confirm" />
      </div>
    </div>
  )
}

export const styled = css`
  //width: ${isMobile ? '90vw' : '390px'};
  //border-radius: 20px;
  //border: 1px solid #544a80;
  //background: url('/images/dialog-bg.svg') no-repeat center center;
  //background-size: cover;
  //background-color: #362c5a;
`
