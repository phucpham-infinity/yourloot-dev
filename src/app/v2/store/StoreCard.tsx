import TagItem from '@/app/v2/store/components/tag-item'
import DescriptionStore from './components/description-store'
import PaymentOption from './components/payment-option'
import CustomButton from '@/components/common/custom-button'
import { CustomDrawer } from '@/components/common/dw-drawer'
import { useState } from 'react'
import { useScreen } from '@/hooks'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import StoreV2Svg from '/public/images/store-v2.svg'

interface StoreItemData {
  id: string
  title: string
  image: string
  tags: Array<{
    label: string
    bgColor: string
    icon?: string
  }>
  coinPrice: number
  cashPrice: string
  currency: string
  isLocked?: boolean
  isNew?: boolean
  hasTimer?: boolean
  unlockLevel?: number
  description?: string
}

interface StoreCardProps {
  data: StoreItemData
}

export default function StoreCard({ data }: StoreCardProps) {
  const navigate = useNavigate()
  const { isMobile } = useScreen()
  const { t } = useTranslation()
  const [showConfirmPurchaseModal, setShowConfirmPurchaseModal] =
    useState(false)
  const [showPurchaseSuccessModal, setShowPurchaseSuccessModal] =
    useState(false)

  return (
    <>
      <div className="w-full rounded-[10px] inline-flex flex-col justify-start items-start overflow-hidden">
        <div className="self-stretch h-24 relative">
          <img className="w-full h-24 left-0 top-0 absolute" src={data.image} />
        </div>
        <div className="self-stretch px-3 pt-3 pb-4 bg-[#191524] hover:bg-[#2A2242] rounded-bl-[10px] rounded-br-[10px] flex flex-col justify-start items-start gap-4">
          <div className="self-stretch inline-flex justify-start items-start gap-2 flex-wrap content-start">
            {data.tags.map((tag, index) => (
              <TagItem key={index} icon={tag.icon} title={tag.label} />
            ))}
          </div>
          <DescriptionStore
            title={data?.title}
            description={data?.description || ''}
          />
          <div className="self-stretch inline-flex justify-start items-start gap-2">
            <PaymentOption
              price={`${data.coinPrice} YL Coins`}
              iconType="coin"
              buttonLabel={t('store.buyWithCoins', 'Buy with Coins')}
              onClick={() => {
                setShowConfirmPurchaseModal(true)
              }}
            />
            <PaymentOption
              price={data.cashPrice}
              iconType="cash"
              buttonLabel={t('store.buyWithCash', 'Buy with Cash')}
              onClick={() => {
                setShowConfirmPurchaseModal(true)
              }}
            />
          </div>
        </div>
      </div>

      <CustomDrawer
        title={
          <div className="flex items-center justify-center w-full gap-2">
            <div className="text-app-medium-16">
              {t('store.bonusPurchased', 'Bonus Purchased!')}
            </div>
          </div>
        }
        onOpenChange={() => {
          setShowPurchaseSuccessModal(false)
          setShowConfirmPurchaseModal(false)
        }}
        open={showPurchaseSuccessModal}
        contentClassName={'h-[80dvh]'}
        mode={!isMobile ? 'dialog' : 'drawer'}
      >
        <div className="flex flex-col items-center gap-4">
          <img src={StoreV2Svg} className="w-20 h-20" />
          <div className="text-app-medium-14 text-white font-bold leading-[14px]">
            {t(
              'store.successfullyPurchased',
              "You've successfully purchased {{title}}.",
              { title: data.title }
            )}
          </div>
          <div className="text-app-medium-12 text-center text-[#C5C0D8] leading-[12px]">
            {t(
              'store.activateInstructions',
              'To activate it, go to Bonuses, select the bonus and click Activate.'
            )}
          </div>
          <div className="flex w-full pt-4">
            <CustomButton
              label={t('store.goToPromotions', 'Go to Promotions')}
              variant="default"
              className="w-full"
              onClick={() => {
                navigate('/promotion')
              }}
            />
          </div>
        </div>
      </CustomDrawer>

      <CustomDrawer
        title={
          <div className="flex items-center justify-center w-full gap-2">
            <div className="text-app-medium-16">Warning</div>
          </div>
        }
        onOpenChange={() => {
          setShowConfirmPurchaseModal(false)
        }}
        open={showConfirmPurchaseModal}
        hideHeader
        contentClassName={'h-[80dvh]'}
        mode={!isMobile ? 'dialog' : 'drawer'}
      >
        <div className="flex flex-col items-center gap-4">
          <img src={StoreV2Svg} className="w-20 h-20" />
          <div className="text-app-medium-14 text-white leading-[14px]">
            {t('store.confirmPurchase', 'Confirm Purchase')}
          </div>
          <div className="text-app-medium-12 text-center text-[#9E90CF] leading-[12px]">
            {t('store.aboutToBuy', "You're about to buy {{title}}.", {
              title: data.title
            })}
          </div>
          <div className="flex flex-row w-full gap-2 pt-4">
            <CustomButton
              label={t('store.cancel', 'Cancel')}
              variant={'muted-danger'}
              className="w-[50%]"
              onClick={async () => {
                setShowConfirmPurchaseModal(false)
              }}
            />
            <CustomButton
              label={t('store.purchase', 'Purchase')}
              variant="muted"
              className="w-[50%]"
              onClick={async () => {
                setShowPurchaseSuccessModal(true)
              }}
            />
          </div>
        </div>
      </CustomDrawer>
    </>
  )
}
