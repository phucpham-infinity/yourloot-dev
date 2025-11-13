import { useTranslation } from 'react-i18next'
export default function PromoPage() {
  const { t } = useTranslation()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-black w-[820px]">
      <div className="p-10 bg-gradient-to-b from-[#3f3555] to-black rounded-[20px] shadow-[6px_6px_16px_0px_rgba(22,28,22,0.25)] border border-white flex-col justify-between items-start inline-flex overflow-hidden">
        <div className="h-11 mt-auto flex-col justify-start items-start gap-5 inline-flex">
          <div className="text-white text-xl font-black font-['Satoshi']">
            {t('promo.welcome')}
          </div>
          <div className="text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
            {t('promo.depositFree')}
          </div>
        </div>
      </div>

      <div className=" p-10 bg-gradient-to-b from-[#3f3555] to-black rounded-[20px] shadow-[6px_6px_16px_0px_rgba(22,28,22,0.25)] border border-white flex-col justify-between items-start inline-flex overflow-hidden  ">
        <div className=" bg-[#36479a]/20 rounded-full blur-[148px]"></div>
        <div className="self-stretch  flex-col justify-start items-start flex  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-800">
          <div className="text-white text-2xl font-black font-['Satoshi']">
            {' '}
            {t('promo.title')}
          </div>
          <div className="self-stretch">
            <span className="text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
              {t('promo.duration')}
              <br />
              {t('promo.categoryLabel')}{' '}
            </span>
            <span className="text-[#d8ceff] text-xs font-medium font-['Satoshi'] underline">
              {t('promo.categoryName')}
            </span>
          </div>
          <div className="self-stretch justify-between items-center inline-flex">
            <div className="text-[#c5c0d8] text-sm font-medium font-['Satoshi']">
              {' '}
              {t('terms.title')}
            </div>
            <div data-svg-wrapper className="relative">
              <svg
                width="28"
                height="23"
                viewBox="0 0 28 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_452_56125)">
                  <path
                    d="M14 12.9185C13.7849 12.9185 13.5699 12.8364 13.4059 12.6725L8.24617 7.51268C7.91794 7.18445 7.91794 6.65229 8.24617 6.3242C8.57426 5.9961 9.10632 5.9961 9.43458 6.3242L14 10.8899L18.5654 6.32436C18.8936 5.99626 19.4256 5.99626 19.7537 6.32436C20.0821 6.65245 20.0821 7.18461 19.7537 7.51284L14.594 12.6726C14.43 12.8365 14.215 12.9185 14 12.9185Z"
                    fill="#C5C0D8"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_452_56125"
                    x="0"
                    y="0.078125"
                    width="28"
                    height="22.8438"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="4" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_452_56125"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_452_56125"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
          <div className="self-stretch h-[299.53px] text-[#c5c0d8] text-[10px] font-bold font-['Satoshi']">
            {(
              t('promo.terms.conditions', { returnObjects: true }) as string[]
            ).map((condition: string, index: any) => (
              <>
                {index + 1}. {condition}
                <br />
              </>
            ))}
          </div>
        </div>

        <div className="w-[200px]  mt-5 h-10 p-5 bg-[#644ec7] rounded-[15px] shadow-[-6px_-6px_24px_0px_rgba(148,95,255,0.15)] shadow-[6px_6px_12px_0px_rgba(22,20,24,0.50)] border border-[#c2a1f1] justify-between items-center inline-flex">
          <div className="justify-start items-center gap-2.5 flex">
            <div className="text-center text-[#d8ceff] text-xs font-medium font-['Satoshi']">
              {t('promo.deposit')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
