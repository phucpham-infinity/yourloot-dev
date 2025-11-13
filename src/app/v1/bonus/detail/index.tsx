import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { css } from '@/lib/utils'
import { Link, Outlet } from 'react-router-dom'

import BannerShadow from '@/assets/images/bonus/banner-shadow.svg'
import BonusFooter from '@/components/common/bonus-footer'
import { useHomeStore } from '@/store/slices/home'
import clsx from 'clsx'
import { isMobile } from 'react-device-detect'
import { Trans, useTranslation } from 'react-i18next'

export default function BonusDetail() {
  const { t } = useTranslation()
  const { setType, setActiveTab, setLayoutActive } = useHomeStore()

  return (
    <div className="relative">
      <Outlet />
      <div
        className={clsx('absolute z-0 top-[-50px] left-0 w-full', {
          'h-[400px]': isMobile,
          'h-[500px]': !isMobile
        })}
      >
        <img className="w-full h-full" src={BannerShadow} />
      </div>
      <div
        className={clsx(
          'border-app-default w-[820px] max-w-[820px] mx-auto flex flex-col gap-5 mt-10 p-10',
          {
            'w-full': isMobile
          }
        )}
        css={styled}
      >
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-white text-[22px] font-black py-0">
              {t('bonus.term.bonusTermsTitle')}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-5">
                {/* <div className="text-app-pale text-app-medium-16 pt-5">
                  {t('bonus.term.bonusIntro')}
                </div> */}

                {/* <div className="flex flex-col gap-5">
                  <div className="text-white font-bold text-app-main-16">
                    {' '}
                    {t('bonus.term.bonusTermsSection')}
                  </div>
                  <ol className="text-app-pale font-[500] text-app-medium-12 space-y-2 ml-4">
                    <li> {t('bonus.term.bonusAmount')}</li>
                    <li> {t('bonus.term.minDeposit')}</li>
                    <li> {t('bonus.term.maxBonus')}</li>
                    <li> {t('bonus.term.wager')}</li>
                  </ol>
                </div> */}
                {/* <div className="flex flex-col gap-5">
                  <div className="text-white font-bold text-app-main-16">
                    {t('bonus.term.howToParticipate')}
                  </div>
                  <ol className="text-app-pale font-[500] text-app-medium-12 space-y-2 ml-4">
                    <li> {t('bonus.term.step1')}</li>
                    <li> {t('bonus.term.step2')}</li>
                    <li> {t('bonus.term.step3')}</li>
                    <li> {t('bonus.term.step4')}</li>
                  </ol>
                </div> */}

                <div className="flex flex-col gap-5">
                  {/* <div className="text-white font-bold text-app-main-16">
                    {t('bonus.term.rulesTitle')}
                  </div> */}
                  <ol className="text-app-pale font-[500] text-app-medium-12 space-y-2 ml-4">
                    {Array.from({ length: 18 }, (_, i) => (
                      <li key={i + 1}>
                        {i + 1 === 6 ? (
                          <Trans
                            i18nKey="bonus.term.rule6"
                            className="max-w-[300px]"
                            components={[
                              <Link
                                to="/?type=category&category=bonus&titleCategory=Games+for+Bonus"
                                className="text-app-link underline"
                                onClick={() => {
                                  setType('liveGame')
                                  if (isMobile) {
                                    setActiveTab('game')
                                  } else {
                                    setLayoutActive('right')
                                  }
                                  window.scrollTo(0, 0)
                                }}
                              />
                            ]}
                          />
                        ) : (
                          t(`bonus.term.rule${i + 1}`)
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className={clsx('max-w-[820px] mx-auto', { 'w-full': isMobile })}>
        <BonusFooter />
      </div>
    </div>
  )
}

const styled = css`
  border-radius: 20px;
  background: linear-gradient(
    180deg,
    rgba(64, 53, 85, 0.2) 0%,
    rgba(0, 0, 0, 0.1) 100%
  );
  box-shadow: 6px 6px 16px 0px rgba(22, 28, 22, 0.25);
`
