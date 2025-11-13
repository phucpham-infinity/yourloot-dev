import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import CustomButton from '@/components/common/custom-button'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TitleGeneralV2 from '../TitleGeneralV2'
export default function TermsPageV2() {
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
            titleClassName="text-v2-app-medium-16  font-black text-white "
            title="Terms and Conditions"
            icon={<ArrowLeftIcon className="w-4 h-4" />}
            onClick={() => {
              navigate(-1)
            }}
          />
          <div
            ref={contentRef}
            className={`${expanded ? '' : 'max-h-[600px] overflow-hidden'} text-[#9E90CF]  text-v2-app-medium-12  !leading-[16px] flex flex-col gap-[24px] pt-5`}
          >
            <span>Last updated: 16.9.2024 </span>
            <span>
              {' '}
              1. Introduction <br />
              These terms and conditions and the documents referred to below
              ("Terms") apply to the use of the current website yourloot.io
              ("Website") and its related or connected services (collectively,
              the "Service").
              <br />
              You should carefully review these Terms as they contain important
              information concerning your rights and obligations concerning the
              use of the Website and form a binding legal agreement between you
              - our customer ("Customer"), and us. By using this Website and/or
              accessing the Service, you, whether you are a guest or a
              registered user with an account (“Account”), agree to be bound by
              these Terms, together with any amendments, which may be published
              from time to time. If you do not accept these Terms, you should
              refrain from accessing the Service and using the Website.
              <br />
              The Service is owned by Cintra Soft Ltd. a limited liability
              company registered in British Virgin Islands with company
              registration number 2151527 with registered address at 1st Floor,
              Columbus Centre, PO Box 2283, Road Town Tortola VG 1110, British
              Virgin Islands (“Company”), licensed in the State of Anjouan under
              the Computer Gaming Licensing Act 007 of 2005.
              <br />
            </span>
            <span>
              2. General Terms
              <br />
              We reserve the right to revise and amend the Terms (including any
              documents referred to and linked to below) at any time. You should
              visit this page periodically to review the Terms and Conditions.
              Amendments will be binding and effective immediately upon
              publication on this Website. If you object to any such changes,
              you must immediately stop using the Service. Your continued use of
              the Website following such publication will indicate your
              agreement to be bound by the Terms as amended. Any bets not
              settled prior to the changed Terms taking effect will be subject
              to the pre-existing Terms.
            </span>
            <span>
              3. Your Obligations
              <br />
              You acknowledge that at all times when accessing the Website and
              using the Service:
            </span>
            <span>
              3.1 You are over 18, or the legal age at which gambling, or gaming
              activities are allowed under the law or jurisdiction that applies
              to you. We reserve the right to request proof of age documents
              from you at any time.
            </span>
            <span>
              3.2 You are of legal capacity and can enter into a binding legal
              agreement with us. You must not access the Website or utilize the
              Service if you are not of legal capacity.
            </span>
            <span>
              3.3 You are a resident in a jurisdiction that allows gambling. You
              are not a resident of any country in which access to online
              gambling to its residents or to any person within such country is
              prohibited. It is your sole responsibility to ensure that your use
              of the service is legal.
            </span>
            <span>
              3.4 You may not use a VPN, proxy or similar services or devices
              that mask or manipulate the identification of your real location.
              You are the authorized user of the payment method you use.
              <br />
              You must make all payments to us in good faith and not attempt to
              reverse a payment made or take any action which will cause such
              payment to be reversed by a third party.
              <br />
              When placing bets you may lose some or all of your money deposited
              to the Service in accordance with these Terms and you will be
              fully responsible for that loss.
              <br />
              When placing bets you must not use any information obtained in
              breach of any legislation in force in the country in which you
              were when the bet was placed.
              <br />
              You are not acting on behalf of another party or for any
              commercial purposes, but solely on your own behalf as a private
              individual in a personal capacity.
              <br />
              You must not either attempt to manipulate any market or element
              within the Service in bad faith nor in a manner that adversely
              affects the integrity of the Service or us.
              <br />
              You must generally act in good faith in relation to us of the
              Service at all times and for all bets made using the Service.
              <br />
              You, or, if applicable, your employees, employers, agents, or
              family members, are not registered as an Affiliate in our
              Affiliate program.
            </span>
            <span>
              4. Restricted use <br />
              You must not use the Service: <br />
              If you are under the age of 18 years (or below the age of majority
              as stipulated in the laws of the jurisdiction applicable to you)
              or if you are not legally able to enter into a binding legal
              agreement with us or you acting as an agent for, or otherwise on
              behalf, of a person under 18 years (or below the age of majority
              as stipulated in the laws of the jurisdiction applicable to you);
              <br />
              If you reside in a country in which access to online gambling to
              its residents or to any person within such country is prohibited.
              <br />
              If you are a resident of one of the following countries, or
              accessing the Website from one of the following countries:
              <br />
              Austria
              <br />
              France and it’s territories
              <br />
              Germany
              <br />
              Netherlands and it’s territories
              <br />
              Spain
              <br />
              Union of Comoros
            </span>
          </div>
        </div>
        {isLongContent && (
          <div className="pt-4">
            <CustomButton
              variant="muted"
              label={expanded ? 'Show Less' : 'Show More'}
              onClick={() => setExpanded(!expanded)}
              style={{ width: 'fit-content' }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
