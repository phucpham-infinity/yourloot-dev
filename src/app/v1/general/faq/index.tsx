import ArrowLeftIcon from '@/assets/icons/arrowLeft'

import Search from '@/assets/icons/search'
import CustomButton from '@/components/common/custom-button'
import FaqQuestion from '@/components/v2/faq/content-faq'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { css } from '@/lib/utils'

// light
import FagLight from '@/assets/icons/footer/light/FagLight.svg'
import { FormBuilder } from '@/components/common/form-builder'
import { userController, UserEventType } from '@/services/controller'
import { useUserEventStore } from '@/store/slices/user-event'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
interface FaqItem {
  id: string
  value: string
  content: { title: string; content: React.ReactNode }[]
}

export default function FAQPage() {
  const { setIsDoneFAQPage, isDoneFAQPage } = useUserEventStore()
  const { useUserEvent } = userController()
  const { mutate: userEvent } = useUserEvent()
  const { t } = useTranslation()

  const faqItems: FaqItem[] = [
    {
      id: 'profile',
      value: t('faq.sections.profile.value'),
      content: [
        {
          title: t('faq.sections.profile.content.0.title'),
          content: <p>{t('faq.sections.profile.content.0.content')}</p>
        },
        {
          title: t('faq.sections.profile.content.1.title'),
          content: (
            <div className="space-y-2">
              <p
                dangerouslySetInnerHTML={{
                  __html: t('faq.sections.profile.content.1.content.whatIsIt')
                }}
              ></p>
              <p>{t('faq.sections.profile.content.1.content.mainFunctions')}</p>
              <ul className="list-disc list-inside">
                <li>
                  {t('faq.sections.profile.content.1.content.createWallets')}
                </li>
                <li>
                  {t('faq.sections.profile.content.1.content.selectCurrency')}
                </li>
                <li>
                  {t('faq.sections.profile.content.1.content.viewTransactions')}
                </li>
                <li>
                  {t(
                    'faq.sections.profile.content.1.content.setupDepositMethods'
                  )}
                </li>
              </ul>
              {/* Sử dụng dangerouslySetInnerHTML cho các đoạn có thể chứa HTML từ t() */}
              <p
                className="font-semibold"
                dangerouslySetInnerHTML={{
                  __html:
                    '⚠️ ' +
                    t('faq.sections.profile.content.1.content.important')
                }}
              />
              <p>
                {t('faq.sections.profile.content.1.content.currencyImpact')}
              </p>
            </div>
          )
        },
        {
          title: t('faq.sections.profile.content.2.title'),
          content: (
            <div className="space-y-2">
              <p
                dangerouslySetInnerHTML={{
                  __html: t('faq.sections.profile.content.2.content.whatIsIt')
                }}
              ></p>
              <p>{t('faq.sections.profile.content.2.content.mainFunctions')}</p>
              <ul className="list-disc list-inside">
                <li>
                  {t('faq.sections.profile.content.2.content.activatePromos')}
                </li>
                <li>
                  {t('faq.sections.profile.content.2.content.trackProgress')}
                </li>
                <li>
                  {t('faq.sections.profile.content.2.content.viewOffers')}
                </li>
                <li>
                  {t('faq.sections.profile.content.2.content.manageCashback')}
                </li>
              </ul>
            </div>
          )
        },
        {
          title: t('faq.sections.profile.content.3.title'),
          content: (
            <div className="space-y-2">
              <p
                dangerouslySetInnerHTML={{
                  __html: t('faq.sections.profile.content.3.content.whatIsIt')
                }}
              ></p>
              <p>{t('faq.sections.profile.content.3.content.mainFunctions')}</p>
              <ul className="list-disc list-inside">
                <li>
                  {t('faq.sections.profile.content.3.content.storeGames')}
                </li>
                <li>
                  {t('faq.sections.profile.content.3.content.quickLaunch')}
                </li>
                <li>
                  {t('faq.sections.profile.content.3.content.addRemoveGames')}
                </li>
              </ul>
            </div>
          )
        },
        {
          title: t('faq.sections.profile.content.4.title'),
          content: (
            <div className="space-y-2">
              <p
                dangerouslySetInnerHTML={{
                  __html: t('faq.sections.profile.content.4.content.whatIsIt')
                }}
              ></p>
              <p>{t('faq.sections.profile.content.4.content.howItWorks')}</p>
              <ul className="list-disc list-inside">
                <li>
                  {t('faq.sections.profile.content.4.content.selectAmount')}
                </li>
                <li>
                  {t('faq.sections.profile.content.4.content.specifyCurrency')}
                </li>
                <li>
                  {t('faq.sections.profile.content.4.content.confirmOperation')}
                </li>
              </ul>
              {/* Sử dụng dangerouslySetInnerHTML cho các đoạn có thể chứa HTML từ t() */}
              <p
                className="font-semibold"
                dangerouslySetInnerHTML={{
                  __html:
                    '💡 ' + t('faq.sections.profile.content.4.content.usingIgc')
                }}
              />
              <p>{t('faq.sections.profile.content.4.content.purchaseItems')}</p>
            </div>
          )
        },
        {
          title: t('faq.sections.profile.content.5.title'),
          content: (
            <div className="space-y-2">
              <p
                dangerouslySetInnerHTML={{
                  __html: t('faq.sections.profile.content.5.content.whatIsIt')
                }}
              ></p>
              <p>{t('faq.sections.profile.content.5.content.mainFunctions')}</p>
              <ul className="list-disc list-inside">
                <li>{t('faq.sections.profile.content.5.content.viewTasks')}</li>
                <li>
                  {t('faq.sections.profile.content.5.content.receiveRewards')}
                </li>
                <li>
                  {t('faq.sections.profile.content.5.content.trackProgress')}
                </li>
              </ul>
            </div>
          )
        },
        {
          title: t('faq.sections.profile.content.6.title'),
          content: (
            <div className="space-y-2">
              <p
                dangerouslySetInnerHTML={{
                  __html: t('faq.sections.profile.content.6.content.whatIsIt')
                }}
              ></p>
              <p>{t('faq.sections.profile.content.6.content.assortment')}</p>
              <ul className="list-disc list-inside">
                <li>{t('faq.sections.profile.content.6.content.boxes')}</li>
                <li>{t('faq.sections.profile.content.6.content.gifts')}</li>
                <li>{t('faq.sections.profile.content.6.content.products')}</li>
              </ul>
              <p>{t('faq.sections.profile.content.6.content.howToBuy')}</p>
              <ul className="list-disc list-inside">
                <li>
                  {t('faq.sections.profile.content.6.content.selectItem')}
                </li>
                <li>{t('faq.sections.profile.content.6.content.pay')}</li>
                <li>{t('faq.sections.profile.content.6.content.receive')}</li>
              </ul>
            </div>
          )
        }
      ]
    },
    {
      id: 'wallet',
      value: t('faq.sections.wallet.value'),
      content: [
        {
          title: t('faq.sections.wallet.content.0.title'),
          content: (
            <div className="space-y-2">
              <p>{t('faq.sections.wallet.content.0.content.step1')}</p>
              <p>{t('faq.sections.wallet.content.0.content.step2')}</p>
              <p>{t('faq.sections.wallet.content.0.content.step3')}</p>
            </div>
          )
        },
        {
          title: t('faq.sections.wallet.content.1.title'),
          content: (
            <div className="space-y-2">
              <p>{t('faq.sections.wallet.content.1.content.step1')}</p>
              <p>{t('faq.sections.wallet.content.1.content.step2')}</p>
            </div>
          )
        },
        {
          title: t('faq.sections.wallet.content.2.title'),
          content: (
            <div className="space-y-2">
              <p>{t('faq.sections.wallet.content.2.content.step1')}</p>
              <p>{t('faq.sections.wallet.content.2.content.step2')}</p>
              {/* Sử dụng dangerouslySetInnerHTML cho các đoạn có thể chứa HTML từ t() */}
              <p
                className="italic"
                dangerouslySetInnerHTML={{
                  __html: t('faq.sections.wallet.content.2.content.warningText')
                }}
              />
              <p>{t('faq.sections.wallet.content.2.content.step3')}</p>
            </div>
          )
        },
        {
          title: t('faq.sections.wallet.content.3.title'),
          content: (
            <div className="space-y-2">
              <p>{t('faq.sections.wallet.content.3.content.answer')}</p>
              <p>{t('faq.sections.wallet.content.3.content.switchWallets')}</p>
            </div>
          )
        },
        {
          title: t('faq.sections.wallet.content.4.title'),
          content: (
            <div className="space-y-2">
              <p>{t('faq.sections.wallet.content.4.content.cancelAction')}</p>
              {/* Nếu linkText có chứa HTML, cần dùng dangerouslySetInnerHTML */}
              <p
                dangerouslySetInnerHTML={{
                  __html: t(
                    'faq.sections.wallet.content.4.content.contactSupport',
                    {
                      link: t('faq.sections.wallet.content.4.content.linkText')
                    }
                  ) as string
                }}
              />
            </div>
          )
        }
      ]
    },
    {
      id: 'deposit',
      value: t('faq.sections.deposit.value'),
      content: [
        {
          title: t('faq.sections.deposit.content.0.title'),
          content: (
            <div className="space-y-2">
              {/* Sử dụng dangerouslySetInnerHTML cho các đoạn có thể chứa HTML từ t() */}
              <p
                className="font-semibold"
                dangerouslySetInnerHTML={{
                  __html:
                    '⚠️ ' +
                    t('faq.sections.deposit.content.0.content.attention')
                }}
              />
              <p>{t('faq.sections.deposit.content.0.content.beforeDeposit')}</p>
              <ul className="list-disc list-inside">
                <li>
                  {t('faq.sections.deposit.content.0.content.availableMethods')}
                </li>
                <li>
                  {t('faq.sections.deposit.content.0.content.balanceCurrency')}
                </li>
              </ul>
            </div>
          )
        },
        {
          title: t('faq.sections.deposit.content.1.title'),
          content: (
            <div className="space-y-4">
              <div>
                <p
                  className="font-semibold"
                  dangerouslySetInnerHTML={{
                    __html: t(
                      'faq.sections.deposit.content.1.content.method1Title'
                    )
                  }}
                ></p>
                <ul className="list-disc list-inside">
                  <li>
                    {t('faq.sections.deposit.content.1.content.method1Steps.0')}
                  </li>
                  <li>
                    {t('faq.sections.deposit.content.1.content.method1Steps.1')}
                  </li>
                  <li>
                    {t('faq.sections.deposit.content.1.content.method1Steps.2')}
                  </li>
                  <li>
                    {t('faq.sections.deposit.content.1.content.method1Steps.3')}
                  </li>
                  <li>
                    {t('faq.sections.deposit.content.1.content.method1Steps.4')}
                  </li>
                </ul>
                <p className="italic text-sm text-gray-600">
                  {t('faq.sections.deposit.content.1.content.method1Time')}
                </p>
              </div>

              <div>
                <p className="font-semibold">
                  {t('faq.sections.deposit.content.1.content.method2Title')}
                </p>
                <ul className="list-disc list-inside">
                  <li>
                    {t('faq.sections.deposit.content.1.content.method2Steps.0')}
                  </li>
                  <li>
                    {t('faq.sections.deposit.content.1.content.method2Steps.1')}
                  </li>
                  <li>
                    {t('faq.sections.deposit.content.1.content.method2Steps.2')}
                  </li>
                  <li>
                    {t('faq.sections.deposit.content.1.content.method2Steps.3')}
                  </li>
                </ul>
                <p className="italic text-sm text-gray-600">
                  {t('faq.sections.deposit.content.1.content.method2Time')}
                </p>
              </div>

              <div>
                <p className="font-semibold">
                  {t('faq.sections.deposit.content.1.content.method3Title')}
                </p>
                <ul className="list-disc list-inside">
                  <li>
                    {t('faq.sections.deposit.content.1.content.method3Steps.0')}
                  </li>
                  <li>
                    {t('faq.sections.deposit.content.1.content.method3Steps.1')}
                  </li>
                  <li>
                    {t('faq.sections.deposit.content.1.content.method3Steps.2')}
                  </li>
                  <li>
                    {t('faq.sections.deposit.content.1.content.method3Steps.3')}
                  </li>
                </ul>
              </div>
              <p className="font-semibold">
                {t('faq.sections.deposit.content.1.content.method4Title')}
              </p>
              {/* Sử dụng dangerouslySetInnerHTML cho các đoạn có thể chứa HTML từ t() */}
              <div
                className="text-red-600 font-semibold"
                dangerouslySetInnerHTML={{
                  __html:
                    '🚨 ' +
                    t('faq.sections.deposit.content.1.content.important')
                }}
              />
              <ul className="list-disc list-inside">
                <li>
                  {t(
                    'faq.sections.deposit.content.1.content.supportedCurrencies'
                  )}
                </li>
                <li>
                  {t('faq.sections.deposit.content.1.content.networkMatch')}
                </li>
              </ul>
            </div>
          )
        },
        {
          title: t('faq.sections.deposit.content.2.title'),
          content: (
            <div className="space-y-2">
              <p>
                {t('faq.sections.deposit.content.2.content.fiatProcessing')}
              </p>
              <p>
                {t('faq.sections.deposit.content.2.content.cryptoProcessing')}
              </p>
              {/* Sử dụng dangerouslySetInnerHTML cho các đoạn có thể chứa HTML từ t() */}
              <p
                className="font-semibold"
                dangerouslySetInnerHTML={{
                  __html: t(
                    'faq.sections.deposit.content.2.content.ifNotCredited'
                  )
                }}
              />
              <ul className="list-disc list-inside">
                <li>
                  {t('faq.sections.deposit.content.2.content.checkHistory')}
                </li>
                <li>
                  {t('faq.sections.deposit.content.2.content.contactSupport')}
                </li>
              </ul>
              {/* Sử dụng dangerouslySetInnerHTML cho các đoạn có thể chứa HTML từ t() */}
              <p
                className="font-semibold"
                dangerouslySetInnerHTML={{
                  __html: t('faq.sections.deposit.content.2.content.tips')
                }}
              />
              <ul className="list-disc list-inside">
                <li>
                  {t('faq.sections.deposit.content.2.content.saveReceipts')}
                </li>
                <li>
                  {t(
                    'faq.sections.deposit.content.2.content.doubleCheckCryptoAddress'
                  )}
                </li>
              </ul>
            </div>
          )
        }
      ]
    },
    {
      id: 'main',
      value: t('faq.sections.main.value'),
      content: [
        {
          title: t('faq.sections.main.content.0.title'),
          content: <p>{t('faq.sections.main.content.0.content')}</p>
        },
        {
          title: t('faq.sections.main.content.1.title'),
          content: <p>{t('faq.sections.main.content.1.content')}</p>
        },
        {
          title: t('faq.sections.main.content.2.title'),
          content: <p>{t('faq.sections.main.content.2.content')}</p>
        },
        {
          title: t('faq.sections.main.content.3.title'),
          content: <p>{t('faq.sections.main.content.3.content')}</p>
        }
      ]
    },
    {
      id: 'navigation',
      value: t('faq.sections.navigation.value'),
      content: [
        {
          title: t('faq.sections.navigation.content.0.title'),
          content: (
            <div className="space-y-2">
              <p>{t('faq.sections.navigation.content.0.content.method1')}</p>
              <p>{t('faq.sections.navigation.content.0.content.method2')}</p>
            </div>
          )
        },
        {
          title: t('faq.sections.navigation.content.1.title'),
          content: (
            <div className="space-y-2">
              <p>{t('faq.sections.navigation.content.1.content.step1')}</p>
              <p>{t('faq.sections.navigation.content.1.content.step2')}</p>
            </div>
          )
        },
        {
          title: t('faq.sections.navigation.content.2.title'),
          content: (
            <div className="space-y-2">
              <p>{t('faq.sections.navigation.content.2.content.step1')}</p>
              <p>{t('faq.sections.navigation.content.2.content.step2')}</p>
            </div>
          )
        },
        {
          title: t('faq.sections.navigation.content.3.title'),
          content: (
            <div className="space-y-2">
              <p>{t('faq.sections.navigation.content.3.content.tip1')}</p>
              <p>{t('faq.sections.navigation.content.3.content.tip2')}</p>
              <p>{t('faq.sections.navigation.content.4.content')}</p>
            </div>
          )
        }
        // {
        //   title: t('faq.sections.navigation.content.5.title'),
        //   content: (
        //     <div className="space-y-2">
        //       <p>{t('faq.sections.navigation.content.5.content.tip1')}</p>
        //       <p>{t('faq.sections.navigation.content.5.content.tip2')}</p>
        //       <p>{t('faq.sections.navigation.content.5.content.tip3')}</p>
        //       <p>{t('faq.sections.navigation.content.5.content.tip4')}</p>
        //     </div>
        //   )
        // }
      ]
    },
    {
      id: 'game-categories',
      value: t('faq.sections.gameCategories.value'),
      content: [
        {
          title: t('faq.sections.gameCategories.content.0.title'),
          content: <p>{t('faq.sections.gameCategories.content.0.content')}</p>
        },
        {
          title: t('faq.sections.gameCategories.content.1.title'),
          content: <p>{t('faq.sections.gameCategories.content.1.content')}</p>
        },
        {
          title: t('faq.sections.gameCategories.content.2.title'),
          content: <p>{t('faq.sections.gameCategories.content.2.content')}</p>
        },
        {
          title: t('faq.sections.gameCategories.content.3.title'),
          content: <p>{t('faq.sections.gameCategories.content.3.content')}</p>
        },
        {
          title: t('faq.sections.gameCategories.content.4.title'),
          content: <p>{t('faq.sections.gameCategories.content.4.content')}</p>
        },
        {
          title: t('faq.sections.gameCategories.content.5.title'),
          content: <p>{t('faq.sections.gameCategories.content.5.content')}</p>
        },
        {
          title: t('faq.sections.gameCategories.content.6.title'),
          content: <p>{t('faq.sections.gameCategories.content.6.content')}</p>
        },
        {
          title: t('faq.sections.gameCategories.content.7.title'),
          content: <p>{t('faq.sections.gameCategories.content.7.content')}</p>
        },
        {
          title: t('faq.sections.gameCategories.content.8.title'),
          content: <p>{t('faq.sections.gameCategories.content.8.content')}</p>
        },
        {
          title: t('faq.sections.gameCategories.content.9.title'),
          content: <p>{t('faq.sections.gameCategories.content.9.content')}</p>
        },
        {
          title: t('faq.sections.gameCategories.content.10.title'),
          content: (
            <ul className="list-disc list-inside space-y-1">
              <li>
                {t('faq.sections.gameCategories.content.10.content.classic')}
              </li>
              <li>
                {t('faq.sections.gameCategories.content.10.content.sports')}
              </li>
            </ul>
          )
        },
        {
          title: t('faq.sections.gameCategories.content.11.title'),
          content: <p>{t('faq.sections.gameCategories.content.11.content')}</p>
        },
        {
          title: t('faq.sections.gameCategories.content.12.title'),
          content: <p>{t('faq.sections.gameCategories.content.12.content')}</p>
        }
      ]
    },
    {
      id: 'withdraw',
      value: t('faq.sections.withdraw.value'),
      content: [
        {
          title: t('faq.sections.withdraw.content.0.title'),
          content: (
            <div className="space-y-3">
              {/* Sử dụng dangerouslySetInnerHTML cho các đoạn có thể chứa HTML từ t() */}
              <div
                className="font-bold"
                dangerouslySetInnerHTML={{
                  __html:
                    '⚠️ ' +
                    t('faq.sections.withdraw.content.0.content.important')
                }}
              />
              <p>
                {t('faq.sections.withdraw.content.0.content.checkBankAccount')}
              </p>
              <p>
                {t('faq.sections.withdraw.content.0.content.withdrawalLimits')}
              </p>

              {/* Sử dụng dangerouslySetInnerHTML cho các đoạn có thể chứa HTML từ t() */}
              <div
                className="font-bold mt-3"
                dangerouslySetInnerHTML={{
                  __html: t('faq.sections.withdraw.content.0.content.steps')
                }}
              />
              <p>{t('faq.sections.withdraw.content.0.content.enterAmount')}</p>
              <p>
                {t(
                  'faq.sections.withdraw.content.0.content.specifyBankDetails'
                )}
              </p>
              <p>
                {t('faq.sections.withdraw.content.0.content.fullAccountNumber')}
              </p>
              <p>{t('faq.sections.withdraw.content.0.content.selectBank')}</p>
              <p>{t('faq.sections.withdraw.content.0.content.confirm')}</p>
              <p>
                {t('faq.sections.withdraw.content.0.content.processingTime')}
              </p>
            </div>
          )
        },
        {
          title: t('faq.sections.withdraw.content.1.title'),
          content: (
            <div className="space-y-3">
              {/* Sử dụng dangerouslySetInnerHTML cho các đoạn có thể chứa HTML từ t() */}
              <div
                className="font-bold"
                dangerouslySetInnerHTML={{
                  __html: t(
                    'faq.sections.withdraw.content.1.content.supportedCoins'
                  )
                }}
              />
              <p>
                {t('faq.sections.withdraw.content.1.content.bitcoinNetwork')}
              </p>
              <p>
                {t('faq.sections.withdraw.content.1.content.ethereumNetwork')}
              </p>

              {/* Sử dụng dangerouslySetInnerHTML cho các đoạn có thể chứa HTML từ t() */}
              <div
                className="font-bold mt-3"
                dangerouslySetInnerHTML={{
                  __html: t('faq.sections.withdraw.content.1.content.steps')
                }}
              />
              <p>
                {t('faq.sections.withdraw.content.1.content.selectCoinNetwork')}
              </p>
              <p>
                {t(
                  'faq.sections.withdraw.content.1.content.pasteWalletAddress'
                )}
              </p>
              <p>
                {t(
                  'faq.sections.withdraw.content.1.content.enterAmountConfirm'
                )}
              </p>

              {/* Sử dụng dangerouslySetInnerHTML cho các đoạn có thể chứa HTML từ t() */}
              <div
                className="font-bold mt-3"
                dangerouslySetInnerHTML={{
                  __html:
                    '🚨 ' +
                    t('faq.sections.withdraw.content.1.content.importantNotes')
                }}
              />
              <p>
                {t(
                  'faq.sections.withdraw.content.1.content.doubleCheckAddresses'
                )}
              </p>
              <p>
                {t('faq.sections.withdraw.content.1.content.minimumWithdrawal')}
              </p>
            </div>
          )
        }
      ]
    },
    {
      id: 'troubleshooting',
      value: t('faq.sections.troubleshooting.value'),
      content: [
        {
          title: t('faq.sections.troubleshooting.content.0.title'),
          content: (
            <div className="space-y-3">
              <ul className="list-disc list-inside pl-5 space-y-1">
                <li>
                  {t(
                    'faq.sections.troubleshooting.content.0.content.checkTransactionHistory'
                  )}
                </li>
                <li>
                  {t(
                    'faq.sections.troubleshooting.content.0.content.contactSupport'
                  )}
                </li>
              </ul>
            </div>
          )
        },
        {
          title: t('faq.sections.troubleshooting.content.1.title'),
          content: (
            <div className="space-y-3">
              <ul className="list-disc list-inside pl-5 space-y-1">
                <li>
                  {t(
                    'faq.sections.troubleshooting.content.1.content.saveReceipts'
                  )}
                </li>
                <li>
                  {t(
                    'faq.sections.troubleshooting.content.1.content.cryptoCheckHash'
                  )}
                </li>
              </ul>
            </div>
          )
        }
      ]
    },
    {
      id: 'myBonus',
      value: t('faq.sections.myBonus.value'),
      content: [
        {
          title: t('faq.sections.myBonus.content.0.title'),
          content: (
            <div className="space-y-3">
              {/* Sử dụng dangerouslySetInnerHTML cho các đoạn có thể chứa HTML từ t() */}
              <div
                className="font-bold"
                dangerouslySetInnerHTML={{
                  __html: t('faq.sections.myBonus.content.0.content.howToGet')
                }}
              />
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  {t('faq.sections.myBonus.content.0.content.depositStep')}
                </li>
                <li>
                  {t('faq.sections.myBonus.content.0.content.bonusPercentage')}
                </li>
                <li>{t('faq.sections.myBonus.content.0.content.useBonus')}</li>
              </ol>

              <div className="flex items-start mt-3">
                <span className="mr-2">📌</span>
                <div>
                  {/* Sử dụng dangerouslySetInnerHTML cho các đoạn có thể chứa HTML từ t() */}
                  <p
                    className="font-bold"
                    dangerouslySetInnerHTML={{
                      __html: t(
                        'faq.sections.myBonus.content.0.content.conditions'
                      )
                    }}
                  />
                  <ul className="list-disc list-inside pl-5 space-y-1">
                    <li>
                      {t('faq.sections.myBonus.content.0.content.maxBonus')}
                    </li>
                    <li>{t('faq.sections.myBonus.content.0.content.wager')}</li>
                    <li>{t('faq.sections.myBonus.content.0.content.term')}</li>
                  </ul>
                </div>
              </div>
            </div>
          )
        },
        {
          title: t('faq.sections.myBonus.content.1.title'),
          content: (
            <div className="space-y-3">
              {/* Sử dụng dangerouslySetInnerHTML cho các đoạn có thể chứa HTML từ t() */}
              <div
                className="font-bold"
                dangerouslySetInnerHTML={{
                  __html: t(
                    'faq.sections.myBonus.content.1.content.howToActivate'
                  )
                }}
              />
              <ol className="list-decimal list-inside space-y-1">
                <li>{t('faq.sections.myBonus.content.1.content.step1')}</li>
                <li>{t('faq.sections.myBonus.content.1.content.step2')}</li>
                <li>{t('faq.sections.myBonus.content.1.content.step3')}</li>
              </ol>
            </div>
          )
        },
        {
          title: t('faq.sections.myBonus.content.2.title'),
          content: (
            <div className="space-y-3">
              <ul className="list-disc list-inside space-y-1">
                <li>
                  {t(
                    'faq.sections.myBonus.content.2.content.additionalBonuses'
                  )}
                </li>
                <li>{t('faq.sections.myBonus.content.2.content.cashback')}</li>
              </ul>
            </div>
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
  const handleSubmitLogin = () => {
    console.log('handleSubmitLogin')
  }

  return (
    <div className="w-full flex flex-col justify-start items-start gap-5">
      <div className="w-full  flex justify-between items-center">
        <div className="flex items-center gap-5">
          <div className="text-white text-2xl font-extrabold font-[Satoshi]">
            FAQ
          </div>
        </div>
        <div className="flex  gap-2 justify-center items-end">
          <CustomButton
            prefixIcon={<ArrowLeftIcon />}
            label="Back"
            variant="muted"
            className="w-fit flex gap-3 bg[#0F0D13]"
          />
          <div className="relative flex w-full ">
            <FormBuilder
              className="flex-1 gap-0"
              fields={[
                {
                  name: 'search',
                  type: 'text',
                  placeholder: 'Search'
                }
              ]}
              onSubmit={handleSubmitLogin}
              defaultValues={{
                search: ''
              }}
            />
            <span
              className="absolute w-3 h-3 right-[26px] top-[25px] cursor-pointer flex items-center"
              onClick={handleSubmitLogin}
            >
              <Search />
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full h-full lg:h-[600px] z-10">
        <Tabs
          defaultValue="profile"
          orientation="vertical"
          className="flex flex-col lg:flex-row w-full z-10 relative gap-5 lg:gap-0"
        >
          <TabsList
            className="h-auto w-full lg:w-1/4 flex space-y-2 bg-transparent p-5 overflow-x-hidden overflow-y-hidden lg:overflow-y-scroll
             rounded-l-2xl  border border-[#3B314C] flex-col justify-start items-start gap-2 
              scrollbar-thin scrollbar-track-transparent relative 
             scrollbar-thumb-[#322849]   lg:rounded-r-none z-10"
          >
            <img
              src={FagLight}
              className="absolute bottom-[-100px] left-0 z-0"
            />
            {faqItems.map((item) => (
              <TabsTrigger
                css={styles}
                key={item.id}
                value={item.id}
                className=" self-stretch h-10 z-10 p-2 rounded-2xl w-full border border-solid border-[#362E46]   linear-gradient(0deg, rgba(154, 103, 255, 0.20) 0%, rgba(154, 103, 255, 0.20) 100%), linear-gradient(180deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.10) 100%),
                justify-start items-center gap-1.5 inline-flex  px-4 py-2 text-left transition-all duration-300 ease-in-out
                 data-[state=active]:!bg-footer-background-active hover:!bg-footer-background-active cursor-pointer   data-[state=active]:text-[#9E90CF]  text-[#9E90CF]"
              >
                {item.value}
              </TabsTrigger>
            ))}
          </TabsList>

          <div
            css={stylesRight}
            className="h-full lg:h-full p-10 w-full  lg:w-3/4 flex-1 overflow-x-hidden overflow-y-hidden lg:overflow-y-scroll  
            rounded-2xl lg:rounded-none lg:rounded-r-2xl border border-[#3B314C] flex-col justify-start items-start gap-5 inline-fle 
            scrollbar-thin scrollbar-track-transparent  scrollbar-thumb-[#322849] relative z-10"
          >
            {faqItems.map((item) => (
              <TabsContent
                key={item.id}
                value={item.id}
                className="mt-0 w-full"
              >
                <FaqQuestion data={item.content} />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </div>
  )
}

const styles = css`
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.1) 100%
  );
  box-shadow:
    6px 6px 12px 0px rgba(22, 20, 24, 0.5),
    -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
`

const stylesRight = css`
  background: linear-gradient(
    180deg,
    rgba(64, 53, 85, 0.2) 0%,
    rgba(0, 0, 0, 0.1) 100%
  );
`
