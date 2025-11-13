import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import CustomButton from '@/components/common/custom-button'

import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
export default function TermsPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <div className="h-full overflow-hidden">
      <div className="flex-col gap justify-start items-start">
        <div className="flex items-center pb-5 justify-between w-full">
          <div className="text-white text-2xl gap-6 font-black">
            {t('terms.title')}
          </div>
          <CustomButton
            height="40px"
            variant="muted"
            prefixIcon={<ArrowLeftIcon />}
            label="Back"
            className="w-fit flex text-[#9d90cf] gap-3 hover:bg-[#15121D] transition-all duration-300"
            onClick={() => navigate('/')}
          />
        </div>
        <div
          className="self-stretch rounded-[20px] p-5 h-[600px]  border border-[#413c4a] justify-start items-start overflow-y-scroll scrollbar-thin scrollbar-track-transparent  
             scrollbar-thumb-[#322849] "
        >
          {/* <div className="lg:w-150  w-full h-150 ml-100 -mt-145 bg-[#6330aa] rounded-full blur-[400px]"></div> */}
          <div className="text-[#c5c0d8]   text-xs font-medium">
            <span className="text-white text-2xl font-black">
              {t('terms.title')}
            </span>
            <br />
            <span className="text-[#c5c0d8] text-xs font-medium">
              {t('title.lastUpdated')} 16.9.2024
              <br />
              1. Introduction
              <br />
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
              <br />
              3. Your Obligations
              <br />
              You acknowledge that at all times when accessing the Website and
              using the Service:
              <br />
            </span>
          </div>
          <span className="text-[#c5c0d8] text-xs font-medium   ">
            You are over 18, or the legal age at which gambling, or gaming
            activities are allowed under the law or jurisdiction that applies to
            you. We reserve the right to request proof of age documents from you
            at any time.
            <br />
            You are of legal capacity and can enter into a binding legal
            agreement with us. You must not access the Website or utilize the
            Service if you are not of legal capacity.
            <br />
            You are a resident in a jurisdiction that allows gambling. You are
            not a resident of any country in which access to online gambling to
            its residents or to any person within such country is prohibited. It
            is your sole responsibility to ensure that your use of the service
            is legal.
            <br />
            You may not use a VPN, proxy or similar services or devices that
            mask or manipulate the identification of your real location.
            <br />
            You are the authorized user of the payment method you use.
            <br />
            You must make all payments to us in good faith and not attempt to
            reverse a payment made or take any action which will cause such
            payment to be reversed by a third party.
            <br />
            When placing bets you may lose some or all of your money deposited
            to the Service in accordance with these Terms and you will be fully
            responsible for that loss.
            <br />
            When placing bets you must not use any information obtained in
            breach of any legislation in force in the country in which you were
            when the bet was placed.
            <br />
            You are not acting on behalf of another party or for any commercial
            purposes, but solely on your own behalf as a private individual in a
            personal capacity.
            <br />
            You must not either attempt to manipulate any market or element
            within the Service in bad faith nor in a manner that adversely
            affects the integrity of the Service or us.
            <br />
            You must generally act in good faith in relation to us of the
            Service at all times and for all bets made using the Service.
            <br />
            You, or, if applicable, your employees, employers, agents, or family
            members, are not registered as an Affiliate in our Affiliate
            program.
            <br />
          </span>
          <span className="text-[#c5c0d8] text-xs font-medium   ">
            4. Restricted use
            <br />
          </span>
          <span className="text-[#c5c0d8] text-xs font-medium   ">
            You must not use the Service:
            <br />
          </span>
          <span className="text-[#c5c0d8] text-xs font-medium   ">
            If you are under the age of 18 years (or below the age of majority
            as stipulated in the laws of the jurisdiction applicable to you) or
            if you are not legally able to enter into a binding legal agreement
            with us or you acting as an agent for, or otherwise on behalf, of a
            person under 18 years (or below the age of majority as stipulated in
            the laws of the jurisdiction applicable to you);
            <br />
            If you reside in a country in which access to online gambling to its
            residents or to any person within such country is prohibited.
            <br />
            If you are a resident of one of the following countries, or
            accessing the Website from one of the following countries:
            <br />
          </span>
          <span className="text-[#c5c0d8] text-xs font-medium   ">
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
    </div>
  )
}

// const activeCodeCssFn = () => {
//   return css`
//     background-image: linear-gradient(180deg, #1b1527 20%, #1c1827 70%);
//   `
// }
