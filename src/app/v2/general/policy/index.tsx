import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import CustomButton from '@/components/common/custom-button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TitleGeneralV2 from '../TitleGeneralV2'

export default function PolicyPageV2() {
  const navigate = useNavigate()
  const [showFullContent, setShowFullContent] = useState(false)
  return (
    <div className="h-full overflow-y-auto md:w-[904px] md:py-[24px] md:mx-auto">
      <div className="flex-col items-start justify-start ">
        <div
          className="self-stretch text-[12px] text-[#9E90CF] justify-start items-start overflow-y-scroll scrollbar-thin scrollbar-track-transparent
             scrollbar-thumb-[#322849] "
        >
          <TitleGeneralV2
            titleClassName="text-v2-app-medium-16 font-black text-white "
            title="Privacy Policy"
            icon={<ArrowLeftIcon className="w-4 h-4" />}
            onClick={() => {
              navigate('/')
            }}
          />
          <div className="text-[#9E90CF] text-v2-app-medium-12 !leading-[16px] flex flex-col gap-[24px] pt-5">
            <span>Last updated: 16.9.2024</span>

            <span>
              1. Introduction
              <br />
              Welcome to Yourloot.io ("we," "our," or "us") operated by Cintra
              Soft Ltd registration number: 2151527. It's licensed and regulated
              by the Government of the Autonomous Island of Anjouan, Union of
              Comoros and operates under License No. ALSI-202410046-F12.
              <br />
            </span>

            <span>
              Your privacy is of utmost importance to us. This Privacy Policy
              outlines how we collect, use, protect, and disclose your personal
              information when you use our website, mobile application, and
              online gaming services (collectively, the "Services").
              <br />
              By accessing or using our Services, you consent to the terms of
              this Privacy Policy. If you do not agree with any part of this
              Policy, please refrain from using our Services.
            </span>

            <span>
              2. Compliance with Data Protection Laws
              <br />
              We are committed to protecting your personal data in accordance
              with the Data Protection Act and other applicable laws. We employ
              best business practices and industry-standard security measures to
              safeguard your information.
            </span>

            <span>
              3. Information We Collect
              <br />
              We collect various types of information, including but not limited
              to:
              <ul className="pl-4 list-disc">
                <li>
                  Personal Information: Name, date of birth, email address,
                  phone number, residential address, payment details, and
                  identification documents (e.g., passport, driver's license)
                  for identity verification purposes.
                </li>
                <li>
                  Account Information: Username, password, and gaming
                  preferences.
                </li>
                <li>
                  Transaction Data: Deposit and withdrawal details, betting
                  history, and winnings.
                </li>
                <li>
                  Device and Usage Information: IP address, browser type,
                  operating system, and gaming activity.
                </li>
                <li>
                  Cookies and Tracking Technologies: Data collected through
                  cookies, web beacons, and similar technologies to improve user
                  experience and website functionality.
                </li>
                <li>
                  Web and Telegram Platform: By accessing and using Yourloot.io,
                  whether through our website or the Telegram bot (@yourloot),
                  you acknowledge and accept that we may collect and use your
                  personal data, including but not limited to your Telegram ID,
                  username, and name, as well as any cryptocurrency wallet
                  addresses you provide for transactions.
                </li>
                <li>
                  We collect this data to facilitate your participation in our
                  games, manage your account, and conduct necessary operations
                  to ensure the smooth functioning of our services across both
                  platforms.
                </li>
              </ul>
            </span>

            {showFullContent && (
              <>
                <span>
                  4. Legal Basis for Processing
                  <br />
                  We process your personal data based on:
                  <ul className="pl-4 list-disc">
                    <li>Contractual necessity (to provide gaming services);</li>
                    <li>
                      Legal obligations (e.g., anti-money laundering and
                      regulatory requirements);
                    </li>
                    <li>
                      Legitimate interests (e.g., fraud prevention and
                      security);
                    </li>
                    <li>
                      Consent (for marketing and cookies where applicable).
                    </li>
                  </ul>
                </span>

                <span>
                  5. How We Use Your Information
                  <br />
                  We use the collected information for the following purposes:
                  <ul className="pl-4 list-disc">
                    <li>To create and manage your account.</li>
                    <li>
                      To process transactions, including deposits and
                      withdrawals.
                    </li>
                    <li>
                      To verify your identity and comply with legal
                      requirements.
                    </li>
                    <li>
                      To provide customer support and respond to inquiries.
                    </li>
                    <li>
                      To detect and prevent fraudulent activities, money
                      laundering, and security threats.
                    </li>
                    <li>
                      To improve our Services and personalize your gaming
                      experience.
                    </li>
                    <li>
                      To send promotional communications, subject to your
                      preferences.
                    </li>
                    <li>To comply with regulatory obligations.</li>
                    <li>
                      To perform automated decision-making where necessary, with
                      appropriate safeguards.
                    </li>
                  </ul>
                </span>

                <span>
                  6. Sharing and Disclosure of Information
                  <br />
                  We do not sell or rent your personal information to third
                  parties. However, we may share your information with:
                  <ul className="pl-4 list-disc">
                    <li>
                      Regulatory Authorities: To comply with legal and
                      regulatory requirements.
                    </li>
                    <li>
                      Payment Processors and Financial Institutions: To
                      facilitate transactions.
                    </li>
                    <li>
                      Fraud Prevention and Security Partners: To detect and
                      prevent fraudulent activities.
                    </li>
                    <li>
                      Marketing Partners: With your consent, we may share
                      limited data for promotional purposes.
                    </li>
                    <li>
                      Service Providers: Third-party vendors who assist in
                      providing Services (e.g., customer support, analytics,
                      hosting services).
                    </li>
                    <li>
                      International Transfers: Your data may be transferred
                      outside of your jurisdiction with appropriate safeguards
                      in place.
                    </li>
                  </ul>
                </span>

                <span>
                  7. Your Rights and Choices
                  <br />
                  You have the right to access, correct, or delete your personal
                  data. For any data-related requests, you can contact our
                  support team, who will assist you in accordance with
                  applicable data protection laws.
                  <br />
                  <br />
                  To exercise your rights, please contact our Support Team at
                  legal@yourloot.xyz
                </span>

                <span>
                  8. Cookies and Tracking Technologies
                  <br />
                  We use cookies and similar technologies to:
                  <ul className="pl-4 list-disc">
                    <li>Enhance website functionality.</li>
                    <li>Remember user preferences.</li>
                    <li>Analyze user behavior for service improvements.</li>
                    <li>Deliver targeted advertisements.</li>
                  </ul>
                  <br />
                  Managing Cookies: You can manage your cookie preferences
                  through your browser settings or via our cookie consent
                  banner.
                </span>

                <span>
                  9. Third-Party Links
                  <br />
                  Our Services may contain links to third-party websites. We are
                  not responsible for their privacy practices. Please review
                  their policies before providing any personal information.
                </span>

                <span>
                  10. Age Restriction
                  <br />
                  Our Services are strictly for individuals aged 18 years or
                  older (or the minimum legal age in your jurisdiction). We do
                  not knowingly collect data from minors. If we become aware of
                  a minor using our Services, we will take steps to delete their
                  data.
                </span>

                <span>
                  11. Changes to This Privacy Policy
                  <br />
                  We may update this Privacy Policy periodically. Any changes
                  will be posted on our website with the updated "Effective
                  Date." Continued use of our Services constitutes acceptance of
                  the revised policy.
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
