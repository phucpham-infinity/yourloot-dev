import WarningIcon from '@/assets/images/error.svg'
import { CustomDrawer } from '@/components/common/dw-drawer'
import { useV2DepositStore } from '@/store'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import CustomButton from '@/components/common/custom-button'
import { useCreateOrderCrypto } from '@/components/v2/hooks'
import { useScreen } from '@/hooks'

const DepositSuccessful = () => {
  const { t } = useTranslation()
  const { isMobile } = useScreen()
  const isOpenDepositSuccessful = useV2DepositStore(
    (s) => s.isOpenDepositFailed
  )
  const setIsOpenDepositFailed = useV2DepositStore(
    (s) => s.setIsOpenDepositFailed
  )
  const selectedMethod = useV2DepositStore((s) => s.selectedMethod)
  const selectedNetwork = useV2DepositStore((s) => s.selectedNetwork)
  const selectedCryptoCurrency = useV2DepositStore(
    (s) => s.selectedCryptoCurrency
  )
  const setNetwork = useV2DepositStore((s) => s.setNetwork)
  const setCryptoCurrency = useV2DepositStore((s) => s.setCryptoCurrency)
  const setIsOpenInputInfo = useV2DepositStore((s) => s.setIsOpenInputInfo)

  const clearDeposit = useV2DepositStore((s) => s.clearDeposit)

  const { createOrderCrypto, isPendingCreateOrderCrypto } =
    useCreateOrderCrypto()

  useEffect(() => {
    return () => {
      setIsOpenDepositFailed(false)
    }
  }, [])

  return (
    <CustomDrawer
      title={
        <div className="flex items-center justify-center w-full gap-2">
          <div className="text-app-medium-16">
            {selectedMethod === 'cryptocurrency'
              ? t('deposit.v3.cryptocurrencyPayment', 'Cryptocurrency Payment')
              : t('deposit.v3.bankPayment', 'Bank Payment')}
          </div>
        </div>
      }
      open={isOpenDepositSuccessful}
      name="DepositSuccessful"
      onOpenChange={(open) => {
        setIsOpenDepositFailed(open)
        if (!open) {
          clearDeposit()
        }
      }}
      type="deposit"
      mode={!isMobile ? 'dialog' : 'drawer'}
      contentClassName="h-[80vh]"
    >
      <div className="flex flex-col items-center gap-4">
        <img src={WarningIcon} className="w-20 h-20" />
        <div className="text-app-bold-14 leading-0">
          {t('deposit.failed.title', { defaultValue: 'Payment failed' })}
        </div>
        <div className="text-app-medium-12 w-full text-center text-[#9E90CF] pb-2">
          {selectedMethod === 'cryptocurrency' ? (
            <span>
              {t('deposit.failed.cryptoNotDetected', {
                defaultValue: 'We couldn’t detect your crypto transaction.'
              })}
            </span>
          ) : (
            <span>
              {t('deposit.v3.unableToVerify', {
                defaultValue:
                  'Unable to verify payment. Please try again or choose another method.'
              })}
            </span>
          )}{' '}
          {t('deposit.failed.contactSupport', {
            defaultValue: 'If you’ve already sent it, please contact support.'
          })}
        </div>
        <CustomButton
          label={t('deposit.failed.tryAgain', { defaultValue: 'Try Again' })}
          variant="default"
          isLoading={isPendingCreateOrderCrypto}
          onClick={() => {
            clearDeposit()
            setIsOpenDepositFailed(false)
            if (selectedMethod === 'cryptocurrency') {
              //create order crypto
              setNetwork(selectedNetwork ?? '')
              setCryptoCurrency(selectedCryptoCurrency ?? '')
              createOrderCrypto({
                cryptoCurrency: selectedCryptoCurrency ?? '',
                network: selectedNetwork ?? ''
              })
            } else {
              setNetwork(selectedNetwork ?? '')
              setIsOpenInputInfo(true, selectedMethod)
            }
          }}
        />
        <CustomButton
          label={t('deposit.v3.chooseAnotherMethod', 'Choose Another Method')}
          variant="invisible"
          onClick={() => {
            clearDeposit()
            setIsOpenDepositFailed(false)
          }}
        />
      </div>
    </CustomDrawer>
  )
}

export default DepositSuccessful
