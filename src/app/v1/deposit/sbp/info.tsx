import CustomButton from '@/components/common/custom-button'
import { FormBuilder } from '@/components/common/form-builder'
import { useDepositStore } from '@/store/slices/deposit'
import formatAmount from '@/utils/format-amount'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import SBPLayout from './layout'

export default function SBPInfo() {
  const { walletName, bankName } = useParams()
  const navigate = useNavigate()
  const orderSbp = useDepositStore((state) => state.orderSbp)
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
              showCopyBtn: true,
              disabled: true
            },
            {
              type: 'text',
              name: 'phoneNumber',
              label: 'Phone Number',
              placeholder: '+79999999999',
              showCopyBtn: true,
              disabled: true
            },
            {
              type: 'text',
              name: 'bankName',
              label: 'Bank name',
              placeholder: 'BANK NAME',
              showCopyBtn: true,
              disabled: true
            },
            {
              type: 'text',
              name: 'information',
              label: 'Information',
              placeholder: 'Details',
              showCopyBtn: true,
              disabled: true
            }
          ]}
          onSubmit={(value) => {
            console.log(value)
          }}
          defaultValues={{
            amount: formatAmount(orderSbp?.amount),
            phoneNumber: orderSbp?.phoneNumber ?? orderSbp?.externalID,
            bankName: orderSbp?.bankName ?? orderSbp?.cardHolderName,
            information: orderSbp?.externalID ?? orderSbp?.phoneNumber
          }}
        />
      </div>
      <div className={'mt-[30px] flex w-full justify-end'}>
        <CustomButton
          onClick={() => {
            navigate(
              `/deposit/${walletName}/sbp/${bankName}/process${location.search}`
            )
          }}
          className={'w-full lg:w-[200px]'}
          label={'Payment made'}
        />
      </div>
    </SBPLayout>
  )
}
