import CustomButton from '@/components/common/custom-button'
import { FormBuilder } from '@/components/common/form-builder'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import SBPLayout from './layout'
export default function SBPInfo() {
  const navigate = useNavigate()
  const { bankName, walletName } = useParams()
  const { t } = useTranslation()

  return (
    <SBPLayout
      title={t('deposit.addDetails')}
      description={t('deposit.chooseBank')}
      showLeftContent
    >
      <div className={'flex w-full gap-[10px]'}>
        <FormBuilder
          className={'w-full flex-1'}
          fields={[
            {
              type: 'text',
              name: 'amount',
              label: 'Amount',
              placeholder: '$ 1,923,234,99',
              showCopyBtn: true
            },
            {
              type: 'text',
              name: 'cardNumber',
              label: 'Card Number',
              placeholder: '2200 4324 1231 4321',
              showCopyBtn: true
            },
            {
              type: 'text',
              name: 'bankName',
              label: 'Bank name',
              placeholder: 'BANK NAME',
              showCopyBtn: true
            },
            {
              type: 'text',
              name: 'information',
              label: 'Information',
              placeholder: 'Details',
              showCopyBtn: true
            }
          ]}
          onSubmit={(value) => {
            console.log(value)
          }}
          defaultValues={{
            amount: 0,
            cardNumber: '',
            bankName: '',
            information: ''
          }}
        />
      </div>
      <div className={'mt-[60px] flex w-full justify-end'}>
        <CustomButton
          onClick={() => {
            navigate(`/withdraw/${walletName}/sbp/${bankName}/process`)
          }}
          className={'w-[200px]'}
          label={'Payment made'}
        />
      </div>
    </SBPLayout>
  )
}
