import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import CustomButton from '@/components/common/custom-button'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import TitleGeneralV2 from '../TitleGeneralV2'
export default function CookiePolicyPageV2() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(false)
  const [isLongContent, setIsLongContent] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const length = contentRef.current?.innerText.length || 0
    setIsLongContent(length > 2000)
  }, [])
  return (
    <div className="h-full overflow-y-auto  md:w-[904px]  md:py-[24px] md:mx-auto">
      <div className="flex-col items-start justify-start ">
        <div
          className={`self-stretch   text-[12px] text-[#9E90CF] justify-start items-start`}
        >
          <TitleGeneralV2
            titleClassName="text-v2-app-medium-16 font-black text-white  "
            title="KYC Policy"
            icon={<ArrowLeftIcon className="w-4 h-4" />}
            onClick={() => {
              navigate('/')
            }}
          />
          <div
            ref={contentRef}
            className={`${expanded ? '' : 'max-h-[600px] overflow-hidden'} text-v2-app-medium-12 !leading-[16px] font-['Satoshi']  flex flex-col gap-[24px] pt-5 text-justify`}
          >
            <span>{t('cookiePolicy.lastUpdated')} 16.9.2024</span>
            <span>
              The Company adheres to and complies with “Know your customer”
              principles, which aim to prevent financial crime and money
              laundering through client identification and due diligence.
            </span>
            <span>
              The Company reserves the right, at any time, to ask for any KYC
              documentation it deems necessary to determine the identity and
              location of a user on yourloot.io (“Website”). We reserve the
              right to restrict the service, payment, or withdrawal until
              identity is sufficiently determined, or for any other reason in
              our sole discretion based on the legal framework.
            </span>
            <span>
              The company has the right not to give reasons for blocking due to
              KYC.
            </span>
            <span>
              We take a risk-based approach and perform strict due diligence
              checks and ongoing monitoring of all clients, customers, and
              transactions. As per the money laundering regulations, we utilize
              three stages of due diligence checks, depending on the risk,
              transaction, and customer type.
            </span>
            <span>
              <b>SDD</b> — simplified due diligence is used in instances of
              extremely low-risk transactions that do not meet the required
              thresholds
            </span>
            <span>
              <b>EDD</b> — Enhanced Due Diligence is used for high-risk
              customers, large transactions or special cases.
            </span>

            <span>
              Separately and in addition to the above, when a user makes an
              aggregate lifetime total of deposits exceeding EUR 5,000 or
              requests a withdrawal of any amount on Website, or attempts to or
              completes a transaction that is deemed suspicious, then it is
              compulsory for them to complete the full KYC process.
            </span>
            <div>
              <span>
                During this process, the user will have to input some basic
                details about themselves and then upload:
              </span>
              <ul className="pl-4 mt-2 list-disc">
                <li>
                  copy of Government Issued Photo ID (in some cases front and
                  back depending on the ID)
                </li>
                <li>photo of themselves holding the ID</li>
                <li>bank statement/utility bill</li>
              </ul>
            </div>

            <span>KYC/AML review period is up to 30 calendar days.</span>

            <div>
              <span className="block">Guideline for the “KYC Process”</span>
              <ul className="pl-4 mt-2 list-disc">
                <li>
                  Proof of ID
                  <ul className="pl-6 mt-1 list-disc">
                    <li>Signed document;</li>
                    <li>
                      Issuing country is not one of the following restricted
                      countries:
                      <ul className="pl-6 mt-1 list-disc">
                        <li>Austria</li>
                        <li>France and it’s territories</li>
                        <li>Germany</li>
                        <li>Netherlands and it’s territories</li>
                        <li>Spain</li>
                        <li>Union of Comoros</li>
                        <li>United Kingdom</li>
                        <li>USA and it’s territories</li>
                        <li>All FATF Blacklisted countries</li>
                        <li>
                          any other jurisdictions deemed prohibited by Anjouan
                          Offshore Financial Authority.
                        </li>
                      </ul>
                    </li>
                    <li>Full name matches client’s name;</li>
                    <li>Document is valid for a minimum of 3 months;</li>
                    <li>Owner is over 18 years of age.</li>
                  </ul>
                </li>
                <li className="mt-2">
                  Proof of Residence
                  <ul className="pl-6 mt-1 list-disc">
                    <li>Bank statement or utility bill;</li>
                    <li>
                      Country of residence is not one of the following
                      restricted countries:
                      <ul className="pl-6 mt-1 list-disc">
                        <li>Austria</li>
                        <li>France and it’s territories</li>
                        <li>Germany</li>
                        <li>Netherlands and it’s territories</li>
                        <li>Spain</li>
                        <li>Union of Comoros</li>
                        <li>United Kingdom</li>
                        <li>USA and it’s territories</li>
                        <li>All FATF Blacklisted countries</li>
                        <li>
                          any other jurisdictions deemed prohibited by Anjouan
                          Offshore Financial Authority.
                        </li>
                      </ul>
                    </li>
                    <li>
                      Full Name matches client’s name and is identical to
                      client’s ID;
                    </li>
                    <li>Issued less than 3 months ago.</li>
                  </ul>
                </li>
                <li className="mt-2">
                  Selfie with ID
                  <ul className="pl-6 mt-1 list-disc">
                    <li>Holder is identical to the ID above;</li>
                    <li>
                      ID is identical to “1. Proof of ID”. Make sure photo/ID
                      number is the same.
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div>
              <span className="block">Notes on the “KYC Process”</span>
              <ul className="pl-4 mt-2 list-disc">
                <li>
                  If the KYC process is unsuccessful, the reason is documented
                  and a support ticket is created in the system. The ticket
                  number along with an explanation is communicated back to the
                  user.
                </li>
                <li>
                  Once all proper documents are in our possession, the account
                  gets approved.
                </li>
              </ul>
            </div>
          </div>
        </div>
        {isLongContent && (
          <div className="pt-4">
            <CustomButton
              variant="muted"
              label={expanded ? 'Show Less' : 'Show More'}
              className="px-6 py-2 text-v2-app-medium-14 !leading-[16px] w-fit"
              onClick={() => setExpanded(!expanded)}
              style={{ width: 'fit-content' }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
