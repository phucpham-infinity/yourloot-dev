import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import { userController, UserEventType } from '@/services/controller'
import { useUserEventStore } from '@/store/slices/user-event'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TitleGeneralV2 from '../TitleGeneralV2'
import FaqQuestionV2 from './FaqQuestionV2'
interface FaqItem {
  id: string
  value: string
  content: { title: string; content: React.ReactNode }[]
}

export default function FAQPageV2() {
  const { setIsDoneFAQPage, isDoneFAQPage } = useUserEventStore()
  const { useUserEvent } = userController()
  const { mutate: userEvent } = useUserEvent()
  const navigate = useNavigate()

  const faqItems: FaqItem[] = [
    {
      id: 'registration',
      value: 'Registration',
      content: [
        {
          title: 'How to start playing on the website?',
          content: (
            <p>
              To start playing for real money, you need to register on the
              website and make a deposit.
            </p>
          )
        },
        {
          title: 'How to register on the website?',
          content: <p>Click the "Registration" button. Register via e-mail.</p>
        },
        {
          title: 'Email Registration Steps',
          content: (
            <div className="space-y-3">
              <div>
                <p className="font-semibold">
                  1. Opening the Registration Form
                </p>
                <p>On the login screen, select the Registration link.</p>
                <p className="italic">
                  [Image with registration form and indication of where the link
                  is located]
                </p>
              </div>
              <div>
                <p className="font-semibold">
                  2. Entering Registration Details
                </p>
                <ul className="pl-5 space-y-1 list-disc list-inside">
                  <li>Enter your Email</li>
                  <li>Create a password, adhering to the rules:</li>
                  <ul className="pl-5 mt-1 space-y-1 list-disc list-inside">
                    <li>English letters only</li>
                    <li>Minimum 8 characters</li>
                    <li>Contains uppercase and lowercase letters</li>
                    <li>At least one digit</li>
                  </ul>
                  <li>Optionally, enter a promo code</li>
                  <li>Click Register</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">3. Email Confirmation</p>
                <ul className="pl-5 space-y-1 list-disc list-inside">
                  <li>
                    A confirmation code will be sent to your email (valid for 5
                    minutes)
                  </li>
                  <li>Enter the code in the Confirmation code field</li>
                  <li>
                    If the code hasn't arrived, you can request a resend after
                    the specified time
                  </li>
                  <li>Click Continue</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">4. Filling in Personal Data</p>
                <ul className="pl-5 space-y-1 list-disc list-inside">
                  <li>Select your preferred currency (Preferred Currency)</li>
                  <li>
                    Check the box to confirm agreement with the Terms and
                    Conditions
                  </li>
                  <li>
                    Check the box to confirm you are 18 years of age or older
                  </li>
                  <li>Click Continue</li>
                </ul>
                <p className="italic">
                  [Images with data entry form and field indications]
                </p>
              </div>
            </div>
          )
        },
        {
          title: "I haven't received a confirmation email. What should I do?",
          content: (
            <ul className="pl-5 space-y-1 list-disc list-inside">
              <li>Make sure the email hasn't ended up in the "Spam" folder</li>
              <li>
                Check if there was a mistake in the email address provided
                during registration
              </li>
              <li>Contact customer support</li>
              <li>
                Add the Your Loot email address to your contacts list. This will
                help prevent possible problems with service message delivery
              </li>
            </ul>
          )
        },
        {
          title: 'Can I change my wallet after registration?',
          content: (
            <p>Yes, you can do this in the "Profile" - "Wallets" section.</p>
          )
        },
        {
          title: 'Can I create multiple accounts?',
          content: (
            <p>
              Creating multiple accounts is prohibited by the casino rules. Use
              one account to play on the website.
            </p>
          )
        },
        {
          title: "Can I play using a friend's account?",
          content: (
            <p>
              Only the account owner can use the account. Providing access to
              the account to third parties, including minors, is strictly
              prohibited.
            </p>
          )
        }
      ]
    },
    {
      id: 'wallets',
      value: 'Wallets',
      content: [
        {
          title: 'How to create a new wallet?',
          content: (
            <div className="space-y-2">
              <ol className="pl-5 space-y-1 list-decimal list-inside">
                <li>Go to your profile and open the Wallets tab</li>
                <li>
                  Click the "Create new wallet" button. Select the currency
                  type:
                  <ul className="pl-5 mt-1 space-y-1 list-disc list-inside">
                    <li>
                      Cryptocurrency — from the available list, for example,
                      BTC, TON, USDT, and others
                    </li>
                    <li>Fiat currency — USD, EUR, RUB, and others</li>
                  </ul>
                </li>
                <li>Confirm your selection</li>
                <li>
                  The system will inform you that the wallet has been
                  successfully created and will suggest making it primary
                </li>
                <li>
                  You can:
                  <ul className="pl-5 mt-1 space-y-1 list-disc list-inside">
                    <li>Immediately switch to it as primary</li>
                    <li>Leave the current primary wallet unchanged</li>
                  </ul>
                </li>
                <li>
                  If you decide to make the new wallet primary, the system will
                  warn you: when changing wallets, all active bonuses on the
                  current primary wallet will be lost
                </li>
              </ol>
            </div>
          )
        },
        {
          title: 'How to delete a wallet?',
          content: (
            <ol className="pl-5 space-y-1 list-decimal list-inside">
              <li>Go to profile → Wallets</li>
              <li>Click "Delete wallet" under currency type</li>
              <li>Confirm</li>
            </ol>
          )
        },
        {
          title: 'How to change a wallet?',
          content: (
            <ol className="pl-5 space-y-1 list-decimal list-inside">
              <li>Go to your profile</li>
              <li>Open the Financial Management tab</li>
              <li>In the Other Wallets section, select the desired wallet</li>
            </ol>
          )
        },
        {
          title: 'How to change a wallet currency?',
          content: (
            <ol className="pl-5 space-y-1 list-decimal list-inside">
              <li>Go to profile → Wallets</li>
              <li>Select wallet</li>
              <li>Click "Change currency"</li>
              <li>Select new currency</li>
              <li>Confirm</li>
            </ol>
          )
        },
        {
          title: 'What is a primary wallet?',
          content: (
            <ol className="pl-5 space-y-1 list-decimal list-inside">
              <li>The main wallet for all transactions</li>
              <li>Can be changed in profile → Wallets</li>
              <li>Click "Change primary wallet"</li>
              <li>Confirm</li>
              <li>Warning about changing primary wallet functions is noted</li>
            </ol>
          )
        }
      ]
    },
    {
      id: 'deposit',
      value: 'Deposit',
      content: [
        {
          title: 'How fast do funds appear on my balance?',
          content: (
            <div className="space-y-2">
              <p>
                In 99% of cases, funds are credited instantly — just a few
                seconds after the transaction is processed.
              </p>
              <p>
                Sometimes a slight delay is possible, for example, due to the
                payment system's operations. If, within 1 hour of depositing,
                the funds still haven't appeared on your balance:
              </p>
              <ol className="pl-5 space-y-1 list-decimal list-inside">
                <li>Take a screenshot of the debit</li>
                <li>
                  Write to customer support chat and send this screenshot —
                  we'll help you resolve it as quickly as possible
                </li>
              </ol>
            </div>
          )
        },
        {
          title: 'How to Top Up Your Balance',
          content: (
            <div className="space-y-2">
              <ol className="pl-5 space-y-1 list-decimal list-inside">
                <li>
                  Locate the "Deposit" Button. You can top up your balance:
                  <ul className="pl-5 mt-1 space-y-1 list-disc list-inside">
                    <li>On the home page (the "+" icon or "Deposit" button)</li>
                    <li>In the "Profile" section</li>
                  </ul>
                </li>
                <li>
                  In the mobile version, the "Deposit ➕" button is at the
                  bottom of the screen
                </li>
                <li>
                  Click "Deposit". A panel with available payment options will
                  open
                </li>
                <li>
                  Select a convenient payment method. The list will include
                  popular methods:
                  <ul className="pl-5 mt-1 space-y-1 list-disc list-inside">
                    <li>Bank card</li>
                    <li>Cryptocurrency</li>
                    <li>Other electronic payments</li>
                  </ul>
                </li>
                <li>
                  Enter the amount. Enter how much you wish to deposit to your
                  balance and click "Continue"
                </li>
                <li>
                  Payment by details. The system will display the payment
                  details. Simply copy the details and complete the payment in
                  your bank, crypto wallet, or payment service
                </li>
                <li>
                  Wait for the funds to be credited:
                  <ul className="pl-5 mt-1 space-y-1 list-disc list-inside">
                    <li>In most cases, funds are credited instantly</li>
                    <li>
                      Sometimes a slight delay of up to several minutes is
                      possible, depending on the method
                    </li>
                  </ul>
                </li>
                <li>You will see your updated balance in your profile</li>
              </ol>
            </div>
          )
        }
      ]
    },
    {
      id: 'withdraw',
      value: 'Withdraw',
      content: [
        {
          title: 'What are the withdrawal limits?',
          content: (
            <p>
              Minimum and maximum withdrawal limits depend on the chosen payment
              method and your account status. Details are available in the
              "Withdrawal" section of your profile.
            </p>
          )
        },
        {
          title: 'How long does it take to process a withdrawal?',
          content: (
            <p>
              Processing times vary by method: electronic wallets (minutes to
              hours), bank cards (1-3 business days).
            </p>
          )
        },
        {
          title: 'Why was my withdrawal canceled?',
          content: (
            <div className="space-y-2">
              <p>
                Withdrawals can be canceled for several reasons. The most common
                are:
              </p>
              <ul className="pl-5 space-y-1 list-disc list-inside">
                <li>Incorrect payment details</li>
                <li>Withdrawal amount exceeds limits</li>
                <li>Unmet wagering requirements for bonuses</li>
                <li>Attempt to withdraw to a method not used for deposit</li>
                <li>Security check failure</li>
                <li>Unsupported payment method</li>
              </ul>
              <p>Advised to contact support if none apply.</p>
            </div>
          )
        },
        {
          title: 'How to Withdraw Winnings',
          content: (
            <div className="space-y-2">
              <ol className="pl-5 space-y-1 list-decimal list-inside">
                <li>
                  Open Your Profile. Go to the "Profile" section and click the
                  "Withdraw" button — it's located next to the deposit button.
                </li>
                <li>
                  Choose Your Payout Method. A list of available options will
                  appear:
                  <ul className="pl-5 mt-1 space-y-1 list-disc list-inside">
                    <li>Bank card</li>
                    <li>Crypto wallet</li>
                    <li>Other payment systems (if available)</li>
                  </ul>
                  Choose the one that is most convenient for you.
                </li>
                <li>
                  Enter Amount and Details. Enter the amount to withdraw
                  (remember the minimum and maximum limits). Fill in the details
                  — card number, crypto wallet address, or chosen system's data.
                  If you have previously topped up your balance using this
                  method, the fields may autofill.
                </li>
                <li>
                  Confirm Your Request. Click the confirmation button. The
                  system will send the request for processing. Important: For
                  your first withdrawal, identity verification may be required —
                  this is a standard security measure.
                </li>
                <li>
                  Wait for the Funds to Be Credited.
                  <ul className="pl-5 mt-1 space-y-1 list-disc list-inside">
                    <li>
                      Electronic wallets — from a few minutes to a couple of
                      hours
                    </li>
                    <li>Bank cards — from 1 to 3 business days</li>
                  </ul>
                  You can check the status of your request at any time in the
                  transaction history section of your profile.
                </li>
              </ol>
            </div>
          )
        }
      ]
    },
    {
      id: 'loyalty-program',
      value: 'Loyalty Program',
      content: [
        {
          title: 'What is the Your Loot Loyalty Program?',
          content: (
            <p>
              It's a system of rewards for active players, offering bonuses,
              exclusive promotions, and special privileges.
            </p>
          )
        },
        {
          title: 'How to earn YLC coins?',
          content: (
            <div className="space-y-2">
              <p>
                YLC coins are earned by playing games, making deposits, and
                participating in promotions.
              </p>
              <p>The more active you are, the more coins you earn.</p>
            </div>
          )
        },
        {
          title: 'What are loyalty levels?',
          content: (
            <div className="space-y-2">
              <p>
                There are several loyalty levels (e.g., Bronze, Silver, Gold,
                Platinum), each offering increasing benefits.
              </p>
              <p>Your level depends on the number of YLC coins accumulated.</p>
            </div>
          )
        },
        {
          title: 'How to check my loyalty status?',
          content: (
            <p>
              You can check your current loyalty level and YLC coin balance in
              the "Loyalty Program" section of your profile.
            </p>
          )
        },
        {
          title: 'What benefits do I get from the loyalty program?',
          content: (
            <div className="space-y-2">
              <p>Benefits include:</p>
              <ul className="pl-5 space-y-1 list-disc list-inside">
                <li>Exclusive bonuses</li>
                <li>Faster withdrawals</li>
                <li>Higher withdrawal limits</li>
                <li>Personal account manager</li>
                <li>Birthday gifts</li>
              </ul>
            </div>
          )
        },
        {
          title: 'Do YLC coins expire?',
          content: (
            <p>
              No, YLC coins do not expire and remain on your account until used.
            </p>
          )
        },
        {
          title: 'Can I exchange YLC coins for real money?',
          content: (
            <p>
              YLC coins can be exchanged for bonuses, free spins, or other
              rewards in the loyalty shop, but not directly for real money.
            </p>
          )
        },
        {
          title: 'How often are loyalty rewards updated?',
          content: (
            <p>
              Loyalty rewards and promotions are updated regularly. Check the
              "Loyalty Program" section for the latest offers.
            </p>
          )
        }
      ]
    },
    {
      id: 'bonus',
      value: 'Bonus',
      content: [
        {
          title:
            'What is the difference between bonus balance and main balance?',
          content: (
            <div className="space-y-2">
              <p>**Main balance** is real money available for withdrawal.</p>
              <p>
                **Bonus balance** is promotional funds with wagering
                requirements.
              </p>
            </div>
          )
        },
        {
          title: 'What types of bonuses are there?',
          content: (
            <ul className="pl-5 space-y-1 list-disc list-inside">
              <li>Deposit bonus (e.g., 100% for $100)</li>
              <li>
                No-deposit bonus (for actions without deposit, e.g.,
                registration)
              </li>
              <li>Free spins (for slots)</li>
              <li>Cashback (refund of lost funds percentage)</li>
            </ul>
          )
        },
        {
          title: 'How to get a bonus?',
          content: (
            <ol className="pl-5 space-y-1 list-decimal list-inside">
              <li>Activate bonus in personal account</li>
              <li>Click "Activate"</li>
              <li>Fulfill conditions (deposit, bet amount)</li>
              <li>Enjoy playing</li>
            </ol>
          )
        },
        {
          title: 'Can I refuse a bonus?',
          content: (
            <div className="space-y-2">
              <p>
                Yes, anytime, via support or personal account. Refusing means
                losing bonus funds and associated winnings.
              </p>
            </div>
          )
        },
        {
          title: 'What are bonus statuses?',
          content: (
            <div className="space-y-2">
              <p>Depends on type:</p>
              <ul className="pl-5 space-y-1 list-disc list-inside">
                <li>Deposit bonus (activated instantly)</li>
                <li>No-deposit bonus (activated after conditions met)</li>
                <li>Free spins (activated after conditions met)</li>
                <li>Cashback (activated after conditions met)</li>
              </ul>
            </div>
          )
        },
        {
          title: 'What does "wager a bonus" mean?',
          content: (
            <p>
              Betting a certain amount before withdrawing bonus money (e.g.,
              $100 bonus with 5x wagering means $500 in bets). May apply to
              specific games.
            </p>
          )
        },
        {
          title: 'Do all games count towards wagering?',
          content: (
            <div className="space-y-2">
              <p>No, contribution varies. Examples:</p>
              <ul className="pl-5 space-y-1 list-disc list-inside">
                <li>Slots</li>
                <li>Roulette</li>
                <li>Blackjack</li>
                <li>Live casino</li>
                <li>Baccarat</li>
              </ul>
              <p>List specified in bonus rules.</p>
            </div>
          )
        },
        {
          title: 'How to track bonus wagering?',
          content: <p>In the "Bonuses" section of personal account.</p>
        },
        {
          title: 'What are the bonus restrictions?',
          content: (
            <ul className="pl-5 space-y-1 list-disc list-inside">
              <li>Max bonus amount</li>
              <li>Min deposit</li>
              <li>Wagering requirements</li>
              <li>Time limits</li>
              <li>Prohibited games/actions</li>
              <li>Max bet</li>
              <li>Withdrawal limits</li>
            </ul>
          )
        },
        {
          title: 'What happens if I violate bonus terms?',
          content: (
            <div className="space-y-2">
              <p>Casino may:</p>
              <ul className="pl-5 space-y-1 list-disc list-inside">
                <li>Cancel bonus</li>
                <li>Block account</li>
                <li>Confiscate winnings</li>
              </ul>
            </div>
          )
        },
        {
          title: 'Can I withdraw bonus money?',
          content: <p>Yes, after meeting all wagering requirements.</p>
        },
        {
          title: 'Can promotion rules change?',
          content: (
            <p>
              Yes, administration can change terms anytime; important to be
              aware of project specifics.
            </p>
          )
        }
      ]
    },
    {
      id: 'fair-play-security',
      value: 'Fair Play & Security',
      content: [
        {
          title: 'How can I be sure that everything is fair?',
          content: (
            <p>
              Casino uses licensed software from reliable developers; all games
              certified by independent auditors.
            </p>
          )
        },
        {
          title:
            'What guarantees the financial integrity of your online casino?',
          content: (
            <p>
              All payment solutions and financial operations comply with
              international licenses.
            </p>
          )
        },
        {
          title: "How can I check the website's license?",
          content: (
            <p>
              Scroll to the bottom of the website for license and regulator
              information.
            </p>
          )
        }
      ]
    }
  ]

  useEffect(() => {
    if (!isDoneFAQPage) {
      userEvent(
        {
          userEvent: UserEventType.FIRST_VISIT_FAQ
        },
        {
          onSuccess: () => {
            setIsDoneFAQPage(true)
          }
        }
      )
    }
  }, [isDoneFAQPage, setIsDoneFAQPage, userEvent])

  return (
    <div className="h-full md:w-[904px] md:mx-auto">
      <div className="text-[12px] text-[#9E90CF] justify-start items-start">
        <TitleGeneralV2
          titleClassName="text-2xl font-black text-white "
          title="FAQ"
          icon={<ArrowLeftIcon className="w-4 h-4" />}
          onClick={() => {
            navigate(-1)
          }}
        />
      </div>
      <div className="flex flex-col w-full h-full gap-4 mt-6 ">
        {faqItems.map((item) => (
          <div
            className="border-1 rounded-[10px] border-[#2F2548] p-4"
            key={item.id}
          >
            <div className="pb-4 text-white text-app-medium-16">
              <span>{item.value}</span>
            </div>
            <FaqQuestionV2 data={item.content} />
          </div>
        ))}
      </div>
    </div>
  )
}
