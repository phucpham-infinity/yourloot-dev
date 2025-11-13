import PromoCodeItem from '@/app/v1/promo-code/component/PromoCodeItem'
import Bonus from '@/assets/images/promocode/bonus.svg'
import Checkmark from '@/assets/images/promocode/checkmark.svg'
import Loader from '@/components/common/loader'
import { css } from '@/lib/utils.ts'
import { promotionsController } from '@/services/controller/promotions'
import { useTranslation } from 'react-i18next'

export default function PromocodeLeftSide({
  searchedCode
}: {
  searchedCode: string
}) {
  const { useGetActivePromoCode, useGetAvaiblePromoCode } =
    promotionsController()
  const { data: promoCodes, isPending: isPending } = useGetActivePromoCode()
  // @ts-ignore
  const { data: promoAvailableCodes, isPending: isPendingSuggested } =
    useGetAvaiblePromoCode(searchedCode)
  const { t } = useTranslation()

  return (
    <div className="w-2/3 max-lg:w-full">
      <div
        className="w-full rounded-2xl border border-[#403b4a] p-5 mb-10 pb-0"
        css={activeCodeCssFn()}
      >
        <div className="justify-start items-center gap-1 flex pb-5">
          <div data-svg-wrapper>
            <img src={Checkmark} alt="Logo" className="w-[53px]" />
          </div>
          <div className="text-white text-2xl font-black font-['Satoshi']">
            {t('promo.active.title')}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-5 w-full h-full">
          {isPending ? (
            <div className="w-full h-full flex justify-center items-center">
              <Loader className="w-[40px] h-[40px]" />
            </div>
          ) : (
            promoCodes?.content
              ?.slice(0, 3)
              .map((code, index) => (
                <PromoCodeItem
                  key={index}
                  validTime={code?.validTill}
                  name={code.name}
                  description={code.description}
                  customCss={getRandomCssFn()}
                />
              ))
          )}
        </div>
      </div>
      <div
        className="w-full rounded-2xl border border-[#403b4a] p-5 pb-0"
        css={availableCodeCssFn()}
      >
        <div className="justify-start items-center gap-1 flex pb-5">
          <div data-svg-wrapper>
            <img src={Bonus} alt="Logo" className="w-[53px]" />
          </div>
          <div className="text-white text-[22px] font-black font-['Satoshi']">
            {t('promo.available.title')}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-5 w-full h-full">
          {isPendingSuggested ? (
            <div className="w-full h-full flex justify-center items-center">
              <Loader className="w-[40px] h-[40px]" />
            </div>
          ) : (
            promoAvailableCodes?.content
              ?.slice(0, 3)
              .map((code, index) => (
                <PromoCodeItem
                  key={index}
                  canSwitch
                  validTime={code?.validTill}
                  name={code.name}
                  description={code.description}
                  customCss={getRandomCssFn()}
                />
              ))
          )}
        </div>
      </div>
    </div>
  )
}

const activeCodeCssFn = () => {
  return css`
    background-image: linear-gradient(180deg, #2a2446 20%, #151323 70%);
  `
}

const availableCodeCssFn = () => {
  return css`
    background-image: linear-gradient(180deg, #2a2446 5%, #151323 20%);
  `
}

const cssCustom1Fn = () => {
  return css`
    background-image: linear-gradient(190deg, #2a2446 20%, #151323 70%);
  `
}

const cssCustom2Fn = () => {
  return css`
    background-image: linear-gradient(185deg, #2a2446 10%, #151323 70%);
  `
}

const cssCustom3Fn = () => {
  return css`
    background-image: linear-gradient(170deg, #2a2446 5%, #151323 60%);
  `
}

const cssCustom4Fn = () => {
  return css`
    background-image: linear-gradient(30deg, #203b38 10%, #2a2446 60%);
  `
}

const getRandomCssFn = () => {
  const cssFunctions = [cssCustom1Fn, cssCustom2Fn, cssCustom3Fn, cssCustom4Fn]
  const randomIndex = Math.floor(Math.random() * cssFunctions.length)
  return cssFunctions[randomIndex]
}
