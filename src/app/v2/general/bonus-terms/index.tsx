import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import CustomButton from '@/components/common/custom-button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TitleGeneralV2 from '../TitleGeneralV2'

export default function BonusTermsConditionsPageV2() {
  const navigate = useNavigate()
  const [showFullContent, setShowFullContent] = useState(false)

  return (
    <div className="h-full overflow-y-auto md:w-[904px] md:py-[24px] md:mx-auto">
      <div className="flex-col items-start justify-start ">
        <div
          className="self-stretch  text-[12px] text-[#9E90CF] justify-start items-start overflow-y-scroll scrollbar-thin scrollbar-track-transparent
             scrollbar-thumb-[#322849] "
        >
          <TitleGeneralV2
            titleClassName="text-v2-app-medium-16 font-black text-white  "
            title="Bonus Terms & Conditions"
            icon={<ArrowLeftIcon className="w-4 h-4" />}
            onClick={() => {
              navigate('/')
            }}
          />
          <div className="text-v2-app-medium-12 !leading-[16px] font-['Satoshi']  flex flex-col gap-[24px] pt-5">
            <span>Last updated: 16.9.2024</span>

            <span>
              Yourloot.io (hereinafter referred to as the "Organizer") reserves
              the right to update, modify, edit, and supplement the "Bonus Terms
              and Conditions" of yourloot.io at any time. The Organizer will
              notify the account holder (hereinafter referred to as the
              "Player") in advance of any significant changes to the bonus terms
              and conditions before they come into effect. If the Player does
              not agree with the changes to the "Bonus Terms and Conditions,"
              they must notify the official support team. Upon receiving such a
              notice, the Organizer will revoke the Player's access to the
              platform.
            </span>

            <span>
              In case of any discrepancies between the translated versions on
              the Organizer's website, the English version shall take
              precedence.
            </span>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="mb-3 font-bold ">
                1. General rules for using bonus and main balances
              </h3>
              <h4 className="mb-2 font-semibold ">
                1.1 Types of balances and their purpose
              </h4>

              <div className="mb-3">
                <p className="font-medium ">Bonus balance:</p>
                <ul className="ml-6 list-disc text-[#9E90CF]">
                  <li>Not eligible for withdrawal</li>
                  <li>Can only be used for placing bets</li>
                  <li>Funds are credited to it upon bonus activation</li>
                  <li>Includes:</li>
                  <ul className="ml-6 space-y-1 list-disc list-circle">
                    <li>Bonus credits</li>
                    <li>
                      (May also include) Winnings from FS (free spin) bets
                    </li>
                    <li>(May also include) Winnings from wagered bonuses</li>
                  </ul>
                </ul>

                <p className="pt-2 font-medium ">Main balance:</p>
                <ul className="mb-3 ml-6 space-y-1 list-disc text-[#9E90CF]">
                  <li>
                    Available for withdrawal after meeting the wagering
                    requirements
                  </li>
                  <li>Includes:</li>
                  <ul className="ml-6 space-y-1 list-circle">
                    <li>
                      Deposited funds minus any withdrawals and bets placed by
                      the Player
                    </li>
                    <li>
                      (May also include) Bonus funds transferred by the
                      Organizer to the main balance after the Player has
                      fulfilled all promotional terms and conditions
                    </li>
                  </ul>
                </ul>
              </div>

              {!showFullContent && (
                <div className="flex justify-start mt-8">
                  <CustomButton
                    onClick={() => setShowFullContent(!showFullContent)}
                    label="Show More"
                    variant="muted"
                    className="px-6 py-2 text-v2-app-medium-14 !leading-[16px] w-fit"
                  />
                </div>
              )}
            </div>

            {showFullContent && (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 font-bold ">
                    2. Definition and types of bonuses
                  </h3>
                  <h4 className="mb-2 font-semibold ">
                    2.1 A bonus is a gift granted to the Player under conditions
                    determined by the Organizer.
                  </h4>
                  <p className="text-[#9E90CF] mb-3">
                    Examples include: additional funds for placing bets
                    (credited to the bonus balance), free spins (FS), which can
                    result in additional winnings, as well as various other
                    rewards.
                  </p>

                  <h4 className="mb-2 font-semibold ">
                    2.2 Main types of bonuses:
                  </h4>
                  <ul className="ml-6 space-y-2 list-disc text-[#9E90CF]">
                    <li>
                      <strong className="">Deposit Bonus</strong> — Awarded for
                      depositing funds into the account in an amount specified
                      by the Organizer (e.g., 100% of the deposit amount, up to
                      a maximum of $500).
                    </li>
                    <li>
                      <strong className="">No Deposit Bonus</strong> — Granted
                      for performing specific actions defined by the Organizer,
                      excluding account deposits (e.g., placing bets of a
                      certain amount as specified by the Organizer). Another
                      example of a no deposit bonus is cashback—a percentage of
                      the loss amount returned to the bonus balance.
                    </li>
                    <li>
                      <strong className="">Mixed Bonuses</strong> — Bonus offers
                      where the Organizer sets multiple qualifying actions (both
                      deposit and no deposit) to receive the bonus.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 font-bold ">
                    3. Bonus allocation procedure
                  </h3>
                  <h4 className="mb-2 font-semibold ">
                    3.1 Consent to participate in the promotion
                  </h4>
                  <ul className="ml-6 space-y-1 list-disc text-[#9E90CF]">
                    <li>
                      Manual confirmation (e.g., clicking the "Confirm" button)
                    </li>
                    <li>
                      Automatic participation based on predefined criteria
                      (e.g., eligibility determined by the Player's level in the
                      overall Loyalty Program)
                    </li>
                  </ul>

                  <h4 className="mb-2 font-semibold ">
                    3.2 Player's eligibility for the promotion is determined by:
                  </h4>
                  <ul className="ml-6 space-y-1 list-disc text-[#9E90CF]">
                    <li>Fulfillment of the promotion's terms and conditions</li>
                    <li>
                      Compliance with the requirements set by the Organizer
                      (e.g., minimum deposit, maximum bet amount, wagering
                      requirements, timeframes)
                    </li>
                  </ul>

                  <h4 className="mb-2 font-semibold ">
                    3.3 Bonus eligibility conditions (p. 1.1):
                  </h4>
                  <ul className="ml-6 space-y-1 list-disc text-[#9E90CF]">
                    <li>
                      The timeframes for crediting bonuses are set individually
                      for each promotion.
                    </li>
                    <li>
                      The period during which the bonus conditions must be met
                      is limited and determined by the Organizer.
                    </li>
                    <li>
                      The sizes of bonuses may vary depending on the conditions
                      of the promotion.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 font-bold ">
                    4. Promotion terms and conditions
                  </h3>
                  <h4 className="mb-2 font-semibold ">
                    4.1 The complete terms and conditions of each bonus are
                    published on the website prior to the launch of the
                    promotion.
                  </h4>
                  <ul className="ml-6 space-y-1 list-disc text-[#9E90CF]">
                    <li>
                      Promotional activities may have a limited duration,
                      determined by the Organizer.
                    </li>
                    <li>
                      The rules of the promotion are established before its
                      commencement; however, the Organizer reserves the right to
                      amend the rules and conditions during the promotion period
                      (e.g., bonus amounts, wagering requirements, etc.).
                    </li>
                    <li>
                      The size and format of the bonus are determined by the
                      Organizer.
                    </li>
                  </ul>

                  <h4 className="mb-2 font-semibold ">
                    4.2 The Organizer retains the right to:
                  </h4>
                  <ul className="ml-6 space-y-1 list-disc text-[#9E90CF]">
                    <li>Terminate the promotion prematurely;</li>
                    <li>Cancel bonuses in the event of rule violations.</li>
                  </ul>

                  <h4 className="mb-2 font-semibold ">
                    4.3 Bonus funds (or gifts) are credited within the period
                    established by the Organizer after all promotional
                    conditions have been met.
                  </h4>
                </div>

                <div>
                  <h3 className="mb-3 font-bold ">
                    5. Participation in promotional events
                  </h3>
                  <h4 className="mb-2 font-semibold ">
                    5.1 Activating a promotional event signifies the Player's
                    full acceptance of its terms and conditions.
                  </h4>

                  <h4 className="mb-2 font-semibold ">
                    5.2 The Player has the right to withdraw from participating
                    in the promotional event after activation.
                  </h4>
                  <p className="text-[#9E90CF] mb-2">
                    To do so, the Player may use the designated opt-out button
                    or contact customer support.
                  </p>

                  <h4 className="mb-2 font-semibold ">
                    5.3 The Organizer reserves the right to cancel the Player's
                    participation in the promotion without providing any reason.
                  </h4>

                  <h4 className="mb-2 font-semibold ">
                    5.4 Bonuses issued by the Organizer (see p. 1.1) may be
                    credited either automatically or manually.
                  </h4>
                  <ul className="ml-6 space-y-1 list-disc text-[#9E90CF]">
                    <li>Credit to the main balance</li>
                    <li>Credit to the bonus balance</li>
                    <li>Issuance of Free Spins (FS)</li>
                    <li>Distribution of physical prizes</li>
                    <li>Other forms of bonuses</li>
                  </ul>

                  <h4 className="mb-2 font-semibold ">
                    5.5 In the event that the Player opts out of participating
                    in the promotional event, any bonuses or gifts received may
                    be canceled by the Organizer.
                  </h4>

                  <h4 className="mb-2 font-semibold ">
                    5.6 In the event that the Organizer cancels the Player's
                    participation in the promotional event, the Organizer will
                    fully annul any bonuses, gifts, and progress accumulated in
                    the promotion.
                  </h4>

                  <h4 className="mb-2 font-semibold ">
                    5.7 (Referring to p. 4.4) Depending on the type of bonus
                    received by the Player within the promotional event, the
                    Organizer will determine the applicable procedures for
                    utilizing these bonus funds.
                  </h4>
                  <ul className="ml-6 space-y-2 list-disc text-[#9E90CF]">
                    <li>
                      <strong className="">
                        Bonus credit to main balance:
                      </strong>{' '}
                      If the Organizer credits a bonus directly to the main
                      balance, these funds can be used by the Player for
                      gameplay. However, they may only be withdrawn upon meeting
                      specific conditions set by the Organizer within the
                      framework of the particular promotional event.
                      <br />
                      <span className="text-v2-app-medium-12 !leading-[16px] italic">
                        Example: A sum of $100 USD is credited to the main
                        balance with a wagering requirement of X1. The client
                        must wager the amount equal to 100% of the credited
                        bonus. Once this requirement is fulfilled, the remaining
                        funds will be available for withdrawal.
                      </span>
                    </li>
                    <li>
                      <strong className="">
                        Credit of bonus to bonus balance:
                      </strong>{' '}
                      If the Organizer issues bonus funds to the Player's bonus
                      balance, the procedures for transferring these funds to
                      the real balance or the conditions for wagering them are
                      determined by specific terms set by the Organizer within
                      the framework of the particular promotional event.
                    </li>
                    <li>
                      <strong className="">Credit of Free Spins (FS):</strong>{' '}
                      In the case where the Organizer grants a bonus in the form
                      of Free Spins, the wagering requirements are defined by
                      the Organizer within the specific promotional event.
                    </li>
                    <li>
                      <strong className="">Material prizes:</strong> If the
                      Organizer issues a bonus in the form of a material prize,
                      the procedure for receiving the bonus is determined by the
                      Organizer within the framework of the specific promotional
                      event. Specifically, this includes whether the Player can
                      choose an alternative equivalent to the prize received, as
                      well as the delivery geography and methods of receipt.
                    </li>
                    <li>
                      In all other cases, the Organizer specifies special
                      conditions for each promotional event.
                    </li>
                  </ul>

                  <h4 className="mb-2 font-semibold ">
                    5.8 The Player can choose which bonus to activate through
                    the "My Bonuses" section in their personal account.
                  </h4>

                  <h4 className="mb-2 font-semibold ">
                    5.9 In the event of the Player interrupting their
                    participation in the promotional event (see p. 4.2), the
                    Player forfeits all progress made within the promotion,
                    including accumulated points, bonus funds, Free Spins (FS),
                    and other promotional gifts awarded by the Organizer during
                    the participation period.
                  </h4>
                </div>

                <div>
                  <h3 className="mb-3 font-bold ">
                    6. Transfer of bonus funds to main balance
                  </h3>
                  <h4 className="mb-2 font-semibold ">
                    6.1 Bonus funds are credited to a separate balance (bonus
                    balance) and are not available for withdrawal until the
                    wagering requirements are met.
                  </h4>
                  <h4 className="mb-2 font-semibold ">
                    6.2 Upon completing the wagering requirements, the bonus
                    funds are transferred to the main balance.
                  </h4>
                </div>

                <div>
                  <h3 className="mb-3 font-bold ">
                    7. Wagering requirements for bonus funds
                  </h3>
                  <p className="text-[#9E90CF] mb-3">
                    The wagering requirement is set by the Organizer as a
                    condition for converting bonus funds into real funds within
                    the specific terms of the promotional event. Wagering the
                    bonus means placing bets with the bonus funds within the
                    games designated by the Organizer. The wagering multiplier
                    can range from 0 to 50.
                  </p>
                  <p className="text-[#9E90CF] mb-3 text-v2-app-medium-12 !leading-[16px] italic">
                    Example: A wagering requirement of x1 means the Player must
                    wager 100% of the bonus amount received (regardless of which
                    balance the bonus is credited to).
                  </p>

                  <h4 className="mb-2 font-semibold ">
                    7.1 If the Organizer credits bonus funds to the Player's
                    bonus balance, the Organizer may establish:
                  </h4>
                  <ul className="ml-6 space-y-1 list-disc text-[#9E90CF]">
                    <li>
                      conditions for wagering the bonus funds (including
                      timeframes, eligible games, etc.)
                    </li>
                    <li>
                      conditions for transferring bonus funds from the bonus
                      balance to the main balance (including timeframes,
                      eligible games, etc.).
                    </li>
                    <li>
                      conditions for withdrawing previously transferred bonus
                      funds to the main balance (including timeframes, etc.).
                    </li>
                  </ul>

                  <h4 className="mb-2 font-semibold ">
                    7.2 If the Organizer credits bonus funds to the Player's
                    main balance, the Organizer may establish:
                  </h4>
                  <ul className="ml-6 space-y-1 list-disc text-[#9E90CF]">
                    <li>
                      requirements for wagering the bonus funds from the main
                      balance, including timeframes, eligible games, and other
                      specifics.
                    </li>
                    <li>
                      conditions for withdrawing the bonus funds after meeting
                      the wagering requirements, including timeframes, eligible
                      games, and other specifics.
                    </li>
                  </ul>

                  <h4 className="mb-2 font-semibold ">
                    7.3 The Organizer reserves the right to include or exclude
                    any games from contributing towards the wagering
                    requirements of bonus funds.
                  </h4>
                  <p className="text-[#9E90CF] mb-2">
                    Certain game categories may be entirely excluded from bonus
                    wagering. Common categories that the Organizer may choose to
                    exclude include:
                  </p>
                  <ul className="ml-6 space-y-1 list-disc text-[#9E90CF]">
                    <li>Card Games</li>
                    <li>Roulette</li>
                    <li>Keno</li>
                    <li>Virtual Sports</li>
                    <li>Live Dealer Games</li>
                    <li>Lotteries</li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 font-bold ">
                    8. Mechanics of balance usage
                  </h3>
                  <h4 className="mb-2 font-semibold ">
                    8.1 To place bets eligible for inclusion in the wagering
                    requirements of the promotional event, funds are utilized in
                    the following order:
                  </h4>
                  <ol className="ml-6 space-y-1 list-decimal text-[#9E90CF]">
                    <li>
                      <strong className="">Main balance:</strong> The maximum
                      amount of funds that can be spent from the main balance is
                      equal to the nominal value of the deposit made by the
                      Player to activate the promotional event or to perform the
                      Target action.
                    </li>
                    <li>
                      <strong className="">Bonus balance</strong>
                    </li>
                  </ol>

                  <h4 className="mb-2 font-semibold ">
                    8.2 The Organizer determines, within each promotional event,
                    where the winnings achieved by the Player through gaming
                    activities will be credited.
                  </h4>
                  <p className="text-[#9E90CF] mb-2">
                    The Organizer may designate:
                  </p>
                  <ul className="ml-6 space-y-1 list-disc text-[#9E90CF]">
                    <li>
                      <strong className="">Bonus balance:</strong> As the sole
                      balance to which the Player's winnings during the
                      promotional event will be credited, regardless of whether
                      the stakes were made from the main or bonus balance.
                    </li>
                    <li>
                      <strong className="">Main balance:</strong> As the balance
                      to which the Player's winnings during the promotional
                      event, made from the main balance, will be credited.
                      Additionally, the bonus balance may be designated as the
                      balance to which the Player's winnings during the
                      promotional event, made from the bonus balance, will be
                      credited.
                    </li>
                    <li>
                      <strong className="">ICC balance:</strong> As the balance
                      to which the Player's winnings during the promotional
                      event, made from the main balance, bonus balance, or other
                      balances, will be credited.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 font-bold ">
                    9. Deposit bonus wagering mechanics
                  </h3>
                  <h4 className="mb-2 font-semibold ">
                    9.1 Wagering is possible only:
                  </h4>
                  <ul className="ml-6 space-y-1 list-disc text-[#9E90CF]">
                    <li>
                      On the portion of the deposit associated with the bonus
                    </li>
                    <li>Using the bonus balance</li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 font-bold ">
                    10. Possible promotional event restrictions:
                  </h3>
                  <ul className="ml-6 space-y-1 list-disc text-[#9E90CF]">
                    <li>10.1 Maximum winnings from bonus funds</li>
                    <li>10.2 Maximum bonus amount</li>
                    <li>10.3 Maximum bet amount considered for wagering</li>
                    <li>10.4 Withdrawal restrictions with active bonus</li>
                    <li>
                      10.5 Game restrictions:
                      <ul className="ml-6 space-y-1 list-disc">
                        <li>
                          Certain game types may be excluded from contributing
                          to wagering requirements.
                        </li>
                        <li>
                          A list of such exclusions is published in the bonus
                          terms and conditions.
                        </li>
                      </ul>
                    </li>
                    <li>
                      10.6 Violation of bonus usage rules may result in the
                      cancellation of the bonus and any associated winnings.
                    </li>
                    <li>
                      10.7 Receiving bonuses using the following is prohibited:
                      <ul className="ml-6 space-y-1 list-disc">
                        <li>
                          Identical personal information (address, phone number,
                          email)
                        </li>
                        <li>
                          Publicly accessible IP addresses (e.g., internet
                          cafes, educational institutions)
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 font-bold ">11. Redemption priorities</h3>
                  <h4 className="mb-2 font-semibold ">
                    11.1 A clear sequence of fund usage is defined within each
                    promotional campaign.
                  </h4>
                  <h4 className="mb-2 font-semibold ">
                    11.2 The appropriate balance is determined automatically
                    within each promotional event.
                  </h4>
                </div>

                <div>
                  <h3 className="mb-3 font-bold ">
                    12. Transaction monitoring:
                  </h3>
                  <h4 className="mb-2 font-semibold ">
                    12.1 The system automatically monitors:
                  </h4>
                  <ul className="ml-6 space-y-1 list-disc text-[#9E90CF]">
                    <li>Compliance of bets with wagering conditions</li>
                    <li>Accuracy of winnings allocation</li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 font-bold ">13. Final provisions</h3>
                  <h4 className="mb-2 font-semibold ">
                    13.1 The Organizer reserves the right to cancel any unused
                    bonuses.
                  </h4>
                  <h4 className="mb-2 font-semibold ">
                    13.2 In cases of abuse of the bonus system, the Organizer
                    may:
                  </h4>
                  <ul className="ml-6 space-y-1 list-disc text-[#9E90CF]">
                    <li>Cancel all winnings</li>
                    <li>Block the account</li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 font-bold ">
                    14. Liability for violations
                  </h3>
                  <h4 className="mb-2 font-semibold ">
                    14.1 The Organizer reserves the right to cancel the bonus
                    and declare bets void in the event of:
                  </h4>
                  <ul className="ml-6 space-y-1 list-disc text-[#9E90CF]">
                    <li>Violation of the bonus program terms;</li>
                    <li>Detection of collusion between players;</li>
                    <li>
                      Identification of suspicious betting patterns on a single
                      event by a group of players.
                    </li>
                  </ul>

                  <h4 className="mb-2 font-semibold ">
                    14.2 To prevent fraudulent activities, the Organizer may:
                  </h4>
                  <ul className="ml-6 space-y-1 list-disc text-[#9E90CF]">
                    <li>
                      Require the submission of identity verification documents;
                    </li>
                    <li>
                      Delay the crediting of the bonus until the verification
                      process is complete.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 font-bold ">15. Special bonus offers</h3>
                  <h4 className="mb-2 font-semibold ">
                    15.1 General characteristics:
                  </h4>
                  <ul className="ml-6 space-y-1 list-disc text-[#9E90CF]">
                    <li>May be granted for specific types of bets.</li>
                    <li>Require fulfillment of special conditions.</li>
                    <li>Have individual usage mechanisms.</li>
                  </ul>

                  <h4 className="mb-2 font-semibold ">
                    15.2 Implementation Features:
                  </h4>
                  <ul className="ml-6 space-y-1 list-disc text-[#9E90CF]">
                    <li>
                      The terms for granting are determined separately for each
                      promotional offer.
                    </li>
                    <li>May involve a special calculation procedure.</li>
                    <li>
                      Require confirmation of participation to activate the
                      bonus.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 font-bold ">
                    16. General promotion terms
                  </h3>
                  <h4 className="mb-2 font-semibold ">
                    16.1 The Organizer reserves the right to:
                  </h4>
                  <ul className="ml-6 space-y-1 list-disc text-[#9E90CF]">
                    <li>
                      Change the promotion terms at any time without prior
                      notice.
                    </li>
                    <li>
                      Restrict access to bonuses for individual Players or
                      groups.
                    </li>
                  </ul>
                  <h4 className="mb-2 font-semibold ">
                    16.2 Participation in promotions confirms the Player's
                    agreement with the rules for receiving bonuses and
                    promotions.
                  </h4>
                </div>

                <div className="flex justify-start pt-4">
                  <CustomButton
                    onClick={() => setShowFullContent(false)}
                    label="Show Less"
                    variant="muted"
                    className="px-6 py-2 text-v2-app-medium-14 !leading-[16px] w-fit"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
