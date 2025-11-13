import CustomButton from '@/components/common/custom-button'
import ProcessPresent from '@/components/common/process-present'
import { useDialogStore } from '@/store'
import { css } from '@emotion/react'
import clsx from 'clsx'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'

import { useState } from 'react'
import { BannerContent, BannerTitle, GradientText, SubtitleText } from '../..'

export default function BonusDetail() {
  const { t } = useTranslation()
  // const parts = t('bonus.detail.getBonusAmount').split('$1 500')
  const [active, setActive] = useState(true)
  const dialog = useDialogStore()
  const handleConfirm = () => {
    // toast.error(errorRegister?.content?.message)

    dialog.openBasicDialog({
      type: 'warning',
      meta: {
        title: (
          <div>
            {t('bonus.detail.warning')}
            <br />
            {t('bonus.detail.activeBonus')}
          </div>
        ),
        description: active ? (
          <div>
            {t('bonus.detail.message')}
            <b>"Welcome Bonus" </b>?
            <br />
            {t('bonus.detail.messagePrevious')}
          </div>
        ) : (
          <div>
            {t('bonus.detail.messageActive', {
              currentCode: `"Welcome Bonus"`,
              newCode: `"Bonus"`
            })}
            <br />
            {t('bonus.detail.messagePrevious')}
          </div>
        ),
        button: (
          <div className="w-full inline-flex justify-between items-center gap-3 pr-5">
            <CustomButton
              variant={'muted'}
              className="w-3/5 text-center"
              label={t('balance.switchWallet.cancel')}
              // onClick={() => handleWalletChangedAlert(data.currency)}
              onClick={() => {
                dialog.closeBasicDialog()
              }}
            />
            <CustomButton
              variant={'default'}
              className="w-2/5 text-center"
              label={t('balance.switchWallet.confirm')}
              onClick={() => {
                setActive(!active)
                handleSubmitLogin()
              }}
            />
          </div>
        )
      }
    })
  }
  const handleSubmitLogin = () => {
    dialog.openBasicDialog({
      type: 'successful',
      meta: {
        title: active ? t('bonus.detail.deactive') : t('bonus.detail.active'),

        description: active ? (
          <div>{t('bonus.detail.desDeactive')}</div>
        ) : (
          <div>
            {t('bonus.detail.desActive')}{' '}
            <b>{t('bonus.detail.desBonus')}</b>{' '}
          </div>
        ),

        button: (
          <div className="w-full">
            <CustomButton
              variant={'default'}
              className="w-full text-center"
              label={t('contact.form.great')}
              onClick={() => {
                dialog.closeBasicDialog()
              }}
            />
          </div>
        )
      }
    })
  }

  return (
    <div
      className={clsx(
        ' w-[820px] max-w-[820px] mx-auto flex flex-col gap-5 relative',
        {
          'w-full p-0! border-none!': isMobile
        }
      )}
    >
      {isMobile && (
        <div className="w-full z-[10]">
          <div className="relative">
            <img
              className="w-full h-auto z-[10] rounded-[20px]"
              src={'/images/promotions/banner-carousel-mobile-ftdbonus.png'}
            />
            <BannerContent>
              <BannerTitle>
                {/* {parts[0] && <TitleText>{parts[0]}</TitleText>} */}
                <GradientText>$1 500</GradientText>
                {/* {parts[1] && <TitleText>{parts[1]}</TitleText>} */}
              </BannerTitle>
              <SubtitleText>{t('bonus.detail.firstDeposit')}</SubtitleText>
            </BannerContent>
          </div>
          <ProcessPresent className="flex-1 mt-5" persent={50} />
        </div>
      )}
      <div className="w-full flex flex-col">
        {!isMobile && (
          <div className="w-full relative z-20 h-[280px] overflow-hidden rounded-t-[20px]">
            <img
              className="w-full h-full object-cover"
              src={'/images/promotions/banner-carousel-desktop-ftdbonus.png'}
            />
            <BannerContent>
              <BannerTitle>
                {/* {parts[0] && <TitleText>{parts[0]}</TitleText>} */}
                <GradientText>$1 500</GradientText>
                {/* {parts[1] && <TitleText>{parts[1]}</TitleText>} */}
              </BannerTitle>
              <SubtitleText>{t('bonus.detail.firstDeposit')}</SubtitleText>
            </BannerContent>
          </div>
        )}
        <div
          css={styled}
          className={clsx('p-10 flex flex-col gap-10 border-app-default', {
            'p-5! rounded-[20px]!': isMobile
          })}
        >
          <div
            className={clsx(
              'flex flex-row justify-between items-center gap-[10px]',
              {
                'flex-col! items-start gap-5!': isMobile
              }
            )}
          >
            <div className="gap-10">
              <div className="text-white text-app-main-24">
                {t('bonus.detail.hotOffer')}
              </div>

              <div className="text-white text-app-main-18">
                {t('bonus.detail.getBonus')}{' '}
                <span className="font-bold text-[#E0BFEF]">
                  $1 500 / 130 000₽{' '}
                </span>
                !
              </div>
            </div>
            <div
              className={clsx('flex flex-row gap-[10px] flex-wrap', {
                'w-full': isMobile
              })}
            >
              {/* <CustomButton
                className={clsx('w-fit', { 'flex-2': isMobile })}
                variant="muted"
                label="Time left: 1d 14h"
              />
              <CustomButton
                variant="muted"
                className={clsx('w-fit', { 'flex-2': isMobile })}
                label="Wager: x100"
              /> */}
              <CustomButton
                className={clsx('w-full', { 'flex-1': isMobile })}
                label={
                  active
                    ? t('bonus.detail.btnDeactive')
                    : t('bonus.detail.btnActive')
                }
                variant="default"
                onClick={active ? handleConfirm : handleSubmitLogin}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="text-white text-app-main-20">
              {t('bonus.detail.howDoesItWork')}
            </div>

            <ol className="text-app-pale font-[500] text-app-medium-12 space-y-2 ml-4">
              <li>{t('bonus.detail.work1')}</li>
              <li>{t('bonus.detail.work2')}</li>
              <li>{t('bonus.detail.work3')}</li>
            </ol>
          </div>
          <div className="flex flex-col gap-5">
            <div className="text-white text-app-main-20">
              {t('bonus.detail.additionalTerms')}
            </div>
            <ol className="text-app-pale font-[500] text-app-medium-12 space-y-2 ml-4">
              <li>{t('bonus.detail.term1')}</li>
              <li>{t('bonus.detail.term2')}</li>
            </ol>
          </div>
          {/* <div className="flex flex-col gap-5  z-[10]">
            <div className="text-app-pale font-[500] text-app-medium-12">
              {t('bonus.detail.detailsAndConditions')}{' '}
              <span className="text-white cursor-pointer underline font-bold">
                {t('bonus.detail.promotions')}
              </span>
            </div>
          </div> */}

          {/* <div className="flex flex-col gap-4">
            <div className="text-white text-app-main-20">13-14 March</div>
            <div className="text-app-pale font-[500] text-app-medium-12">
              Make a deposit and get a 100% bonus on your first deposit up to
              10,000 ₽ + 50 free spins on a top slot!{' '}
            </div>
            <div className="flex flex-row gap-4 flex-wrap">
              <CustomButton
                prefixIcon={<ArrowLeftIcon className="mr-[10px]" />}
                label="Back"
                variant="muted"
                className="w-fit"
              />
              <CustomButton
                variant="default"
                className={clsx('min-w-fit w-[192px]', {
                  'flex-1': isMobile
                })}
                label="Active"
              />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

const styled = css`
  border-radius: 0px 0px 20px 20px;
  background: linear-gradient(
    180deg,
    rgba(64, 53, 85, 0.2) 0%,
    rgba(0, 0, 0, 0.1) 100%
  );
  box-shadow: 6px 6px 16px 0px rgba(22, 28, 22, 0.25);
`
