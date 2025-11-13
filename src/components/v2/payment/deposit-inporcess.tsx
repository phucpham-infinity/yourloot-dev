import { CustomDrawer } from '@/components/common/dw-drawer'
import { useV2DepositStore } from '@/store'
import ProcessIcon from '@/assets/images/waring-process.svg'
import CustomButton from '@/components/common/custom-button'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import ArrowDown2 from '@/assets/icons/arrowDown2'
import clsx from 'clsx'
import { FormBuilder } from '@/components/common/form-builder'
import formatAmount from '@/utils/format-amount'
import { compact } from 'lodash-es'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { BANK_METHOD_MAP } from '@/constants'
import { useScreen } from '@/hooks'

const DepositInporcess = () => {
  const { t } = useTranslation()
  const { isMobile } = useScreen()
  const formEl = useRef<any>(null)
  const isOpenDepositInprogress = useV2DepositStore(
    (s) => s.isOpenDepositInprogress
  )
  const setIsOpenDataInfo = useV2DepositStore((s) => s.setIsOpenDataInfo)
  const setOpenDepositInporcess = useV2DepositStore(
    (s) => s.setOpenDepositInporcess
  )
  const orderData = useV2DepositStore((s) => s.orderData)
  const method = useV2DepositStore((s) => s.method)

  return (
    <CustomDrawer
      title={
        <div className="flex items-center w-full gap-2 justify-center">
          <div className="text-app-medium-16">
            {method === 'cryptocurrency'
              ? t('deposit.v3.cryptocurrencyPayment', 'Cryptocurrency Payment')
              : t('deposit.v3.bankPayment', 'Bank payment')}
          </div>
        </div>
      }
      open={isOpenDepositInprogress}
      onOpenChange={(open) => setOpenDepositInporcess(open)}
      name="DepositProcessFinish"
      type="deposit"
      contentClassName="h-[80dvh]"
      bodyClassName="overflow-y-auto  h-full"
      mode={!isMobile ? 'dialog' : 'drawer'}
    >
      <div
        data-name="DepositProcessFinish"
        className="flex flex-col gap-4 items-center overflow-y-auto"
      >
        <img src={ProcessIcon} className="w-20 h-20" />
        <div className="text-app-bold-14">
          {t('deposit.v3.checkingPayment', 'Checking your payment...')}
        </div>
        <div className="text-app-medium-14 w-[90%] text-center text-[#9E90CF]">
          {t('deposit.v3.processingTime', {
            defaultValue:
              "This may take up to 25 minutes. You can return to the home page - we'll notify you when the funds arrive."
          })}
        </div>
        <div className="w-full">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue=""
          >
            <AccordionItem value="item-1">
              <AccordionTrigger
                icon={<ArrowDown2 className="w-[12px] h-[12px]" />}
                className={clsx(
                  'items-center rounded-[10px] bg-[#191524] px-[12px] [&[data-state=open]]:!rounded-b-[0px]'
                )}
              >
                <span className="text-app-medium-14">
                  {t('deposit.v3.productInformation', 'Product Information')}
                </span>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance bg-[#191524] rounded-b-[10px] px-[12px]  overflow-y-auto">
                <FormBuilder
                  className={'w-full flex-1'}
                  ref={formEl}
                  defaultValues={{
                    amount: formatAmount(orderData?.amount ?? 0),
                    bankName: orderData?.bankName,
                    cardNumber: orderData?.card,
                    cardHolder: orderData?.cardHolderName,
                    externalId: orderData?.externalId,
                    phoneNumber: orderData?.phoneNumber,
                    information: orderData?.information,
                    address: orderData?.address,
                    memo: orderData?.memo,
                    network: orderData?.network,
                    method: orderData?.method,
                    methodName: BANK_METHOD_MAP[orderData?.method]?.label || '',
                    cryptocurrencyName: orderData?.cryptocurrencyName
                  }}
                  gap={16}
                  fields={compact([
                    !['cryptocurrency'].includes(method) && {
                      className: '[&>.label]:text-app-medium-12',
                      type: 'text-info',
                      name: 'amount',
                      label: t('deposit.amount', 'Amount'),
                      placeholder: '$ 1,923,234,99',
                      showCopyBtn: true,
                      disabled: true
                    },
                    !['cryptocurrency'].includes(method) && {
                      className: '[&>.label]:text-app-medium-12',
                      type: 'text-info',
                      name: 'methodName',
                      label: t('deposit.method', 'Method'),
                      placeholder: 'Method',
                      showCopyBtn: true,
                      disabled: true
                    },
                    ['cryptocurrency'].includes(method) && {
                      className: '[&>.label]:text-app-medium-12',
                      type: 'text-info',
                      name: 'cryptocurrencyName',
                      label: t('deposit.cryptocurrency', 'Cryptocurrency'),
                      placeholder: 'Cryptocurrency',
                      showCopyBtn: true,
                      disabled: true
                    },
                    ['cryptocurrency'].includes(method) && {
                      className: '[&>.label]:text-app-medium-12',
                      type: 'text-info',
                      name: 'network',
                      label: t('deposit.network', 'Network'),
                      placeholder: 'Network',
                      showCopyBtn: true,
                      disabled: true
                    },
                    ['bank-card', 'humo', 'uzcard'].includes(method) && {
                      className: '[&>.label]:text-app-medium-12',
                      type: 'text-info',
                      name: 'cardNumber',
                      label: t('deposit.cardNumber', 'Card Number'),
                      placeholder: 'Card Number',
                      showCopyBtn: true,
                      disabled: true
                    },
                    [
                      'bank-card',
                      'fps-sber',
                      'sbp',
                      'fps',
                      'humo',
                      'uzcard'
                    ].includes(method) && {
                      type: 'text-info',
                      name: 'bankName',
                      className: '[&>.label]:text-app-medium-12',
                      label: t('deposit.bankName', 'Bank Name'),
                      placeholder: 'Bank Name',
                      showCopyBtn: true,
                      disabled: true
                    },
                    ['fps', 'fps-sber', 'fps-alfa', 'ozon'].includes(
                      method
                    ) && {
                      className: '[&>.label]:text-app-medium-12',
                      type: 'text-info',
                      name: 'phoneNumber',
                      label: t('deposit.phoneNumber', 'Phone Number'),
                      placeholder: 'Phone Number',
                      showCopyBtn: true,
                      disabled: true
                    },
                    [
                      'bank-card',
                      'fps-sber',
                      'fps',
                      'fps-alfa',
                      'ozon',
                      'humo',
                      'uzcard'
                    ].includes(method) && {
                      className: '[&>.label]:text-app-medium-12',
                      type: 'text-info',
                      name: 'cardHolder',
                      label: 'Recipient',
                      placeholder: 'Recipient',
                      showCopyBtn: true,
                      disabled: true
                    }
                  ])}
                  onSubmit={(value) => {
                    console.log('value', value)
                  }}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="w-full flex flex-row gap-2 pt-4 pb-4">
          <CustomButton
            label={t('deposit.v3.home', 'Home')}
            variant="default"
            className={'w-[100%]'}
            onClick={() => {
              if (!isMobile) {
                setOpenDepositInporcess(false)
              } else {
                setOpenDepositInporcess(false)
                setIsOpenDataInfo(false)
              }
            }}
          />
        </div>
      </div>
    </CustomDrawer>
  )
}

export default DepositInporcess
