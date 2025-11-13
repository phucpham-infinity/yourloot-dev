import { useTranslation } from 'react-i18next'
import { useDeposit } from './deposit.hook'
import { PaymentMethodItem } from '@/components/v2/payment-method-item'
import { GiftLabel } from '@/components/v2/gift-label'

export const Deposit = () => {
  const { t } = useTranslation()
  const { methodsActiveFiat, methodsActiveCrypto } = useDeposit()

  return (
    <div className="flex flex-col gap-4 relative">
      <div className="flex flex-col gap-4">
        {methodsActiveFiat?.length > 0 && (
          <div className="text-app-medium-16">
            {t('depositPage.bank', 'Bank')}
          </div>
        )}
        {methodsActiveFiat?.length > 0 && (
          <div className="grid grid-cols-12 gap-2">
            {methodsActiveFiat.map((method) => (
              <PaymentMethodItem
                key={method.id}
                id={method.id}
                title={method.title}
                rightBanner={method.rightBanner}
                subtitle={method.subtitle}
                col={method.col}
                onClick={method.onClick}
                isShowMoreButton={method.isShowMoreButton}
              />
            ))}
          </div>
        )}
        <div className="text-app-medium-16 mt-4">
          {t('depositPage.crypto', 'Crypto')}
        </div>
        <div className="grid grid-cols-12 gap-2">
          {methodsActiveCrypto.map((method) => (
            <PaymentMethodItem
              key={method.id}
              id={method.id}
              title={method.title}
              rightBanner={method.rightBanner}
              subtitle={<GiftLabel text={method.giftLabel} />}
              col={method.col}
              onClick={method.onClick}
              isLoading={method.isLoading}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Deposit
