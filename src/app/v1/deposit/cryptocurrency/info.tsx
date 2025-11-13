import CustomButton from '@/components/common/custom-button'
import { FormBuilder } from '@/components/common/form-builder'
import { useDepositStore } from '@/store/slices/deposit'
import { useTranslation } from 'react-i18next'
import QRCode from 'react-qr-code'
import { useNavigate, useParams } from 'react-router-dom'
import CryptocurrencyLayout from './layout'

const CryptocurrencyInfo = () => {
  const { walletName, cryptocurrencyName, networkName } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const orderCrypto = useDepositStore((s) => s.orderCrypto)

  return (
    <CryptocurrencyLayout
      showLeftContent
      title={t('deposit.makeDeposit')}
      description={t('deposit.memoNote')}
    >
      <div
        className={'flex flex-col lg:flex-row w-full gap-[20px] items-center'}
      >
        <div className="w-[196px] lg:w-[134px] h-[196px] lg:h-[134px]">
          <QRCode
            className="w-full h-full"
            size={134}
            bgColor="transparent"
            fgColor="#C5C0D8"
            value={orderCrypto?.address ?? ''}
          />
        </div>
        <FormBuilder
          className={'w-full flex-1'}
          fields={[
            {
              type: 'text',
              name: 'address',
              label: `${t('deposit.personalAddress')} ${cryptocurrencyName} (${networkName})`,
              placeholder: 'UQBJ_647JnSxukxE3wnXUibbPeiyAsrU...',
              showCopyBtn: true,
              disabled: true
            },
            {
              type: 'text',
              name: 'memo',
              label: t('deposit.memo'),
              placeholder: t('deposit.someMemo'),
              showCopyBtn: true,
              disabled: true
            }
          ]}
          onSubmit={() => {}}
          defaultValues={{
            address: orderCrypto?.address
          }}
        />
      </div>
      <div className={'mt-30px] flex w-full justify-end'}>
        <CustomButton
          onClick={() => {
            navigate(
              `/deposit/${walletName}/cryptocurrency/${cryptocurrencyName}/network/${networkName}/process${location.search}`
            )
          }}
          className={'w-full lg:w-[200px]'}
          label={t('deposit.paymentMade')}
        />
      </div>
    </CryptocurrencyLayout>
  )
}

export default CryptocurrencyInfo
