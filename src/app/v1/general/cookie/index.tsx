import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import CustomButton from '@/components/common/custom-button'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function CookiePolicyPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const obligationsItems = t('cookiePolicy.obligations.items', {
    returnObjects: true
  }) as string[]
  const restrictedUseItems = t('cookiePolicy.restrictedUse.items', {
    returnObjects: true
  }) as string[]
  const restrictedCountries = t(
    'cookiePolicy.restrictedUse.restrictedCountries',
    { returnObjects: true }
  ) as string[]

  return (
    <div className="h-full overflow-hidden">
      <div className="flex-col gap justify-start items-start ">
        <div className="flex items-center pb-5 justify-between w-full">
          <div className="text-white text-2xl gap-6 font-black">
            {t('cookiePolicy.title')}
          </div>
          <CustomButton
            height="40px"
            variant="muted"
            prefixIcon={<ArrowLeftIcon />}
            label={t('cookiePolicy.back')}
            className="w-fit flex text-[#9d90cf] gap-3 hover:bg-[#15121D] transition-all duration-300"
            onClick={() => navigate('/')}
          />
        </div>
        <div
          className="self-stretch rounded-[20px] p-5 h-[600px]  border border-[#413c4a] justify-start items-start overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-track-transparent  
               scrollbar-thumb-[#322849] "
        >
          <div className="w-150 h-150 ml-100 -mt-145 bg-[#6330aa] rounded-full blur-[400px]"></div>

          <div className="self-stretch">
            <span className="text-white text-2xl font-black">
              {t('cookiePolicy.title')}
              <br />
            </span>
            <span className="text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
              {t('cookiePolicy.lastUpdated')} 16.9.2024
              <br />
              {t('cookiePolicy.introduction.title')}
              <br />
              {t('cookiePolicy.introduction.content')}
              <br />
              {t('cookiePolicy.generalTerms.title')}
              <br />
              {t('cookiePolicy.generalTerms.content')}
              <br />
              {t('cookiePolicy.obligations.title')}
              <br />
              {t('cookiePolicy.obligations.content')}
              <br />
              {obligationsItems.map((item: string, index: number) => (
                <span key={index}>
                  {item}
                  <br />
                </span>
              ))}
              {t('cookiePolicy.restrictedUse.title')}
              <br />
              {t('cookiePolicy.restrictedUse.content')}
              <br />
              {restrictedUseItems.map((item: string, index: number) => (
                <span key={index}>
                  {item}
                  <br />
                </span>
              ))}
              {restrictedCountries.map((country: string, index: number) => (
                <span key={index}>
                  {country}
                  <br />
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
