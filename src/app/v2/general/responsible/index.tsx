import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import CustomButton from '@/components/common/custom-button'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import TitleGeneralV2 from '../TitleGeneralV2'
export default function ResponsibleGamingPageV2() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [showFullContent, setShowFullContent] = useState(false)
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
    <div className="h-full overflow-y-auto md:w-[904px] md:py-[24px] md:mx-auto">
      <div className="flex-col items-start justify-start ">
        <div
          className="self-stretch  text-[12px] text-[#9E90CF] justify-start items-start overflow-y-scroll scrollbar-thin scrollbar-track-transparent
             scrollbar-thumb-[#322849] "
        >
          <TitleGeneralV2
            titleClassName=" text-v2-app-medium-16 font-black text-white "
            title="Responsible Gaming"
            icon={<ArrowLeftIcon className="w-4 h-4" />}
            onClick={() => {
              navigate('/')
            }}
          />
          <div className="text-v2-app-medium-12 !leading-[16px] font-['Satoshi'] font-medium flex flex-col gap-[24px] pt-5">
            <span>Last updated: 16.9.2024</span>
            <span>
              {t('cookiePolicy.introduction.title')}
              <br />
              These terms and conditions and the documents referred to below
              ("Terms") apply to the use of the current website yourloot.io
              ("Website") and its related or connected services (collectively,
              the "Service"). You should carefully review these Terms as they
              contain important information concerning your rights and
              obligations concerning the use of the Website and form a binding
              legal agreement between you - our customer ("Customer"), and us.
              By using this Website and/or accessing the Service, you, whether
              you are a guest or a registered user with an account (“Account”),
              agree to be bound by these Terms, together with any amendments,
              which may be published from time to time. If you do not accept
              these Terms, you should refrain from accessing the Service and
              using the Website. The Service is owned by Cintra Soft Ltd. a
              limited liability company registered in British Virgin Islands
              with company registration number 2151527 with registered address
              at 1st Floor, Columbus Centre, PO Box 2283, Road Town Tortola VG
              1110, British Virgin Islands (“Company”), licensed in the State of
              Anjouan under the Computer Gaming Licensing Act 007 of 2005.
            </span>
            <span>
              {t('cookiePolicy.generalTerms.title')}
              <br />
              {t('cookiePolicy.generalTerms.content')}
            </span>
            {showFullContent && (
              <>
                <span>
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
                </span>
                <span>
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
              </>
            )}

            <div className="flex justify-start pt-4">
              <CustomButton
                onClick={() => setShowFullContent(!showFullContent)}
                label={showFullContent ? 'Show Less' : 'Show More'}
                variant="muted"
                className="px-6 py-2 text-sm w-fit"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
