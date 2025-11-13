import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import CustomButton from '@/components/common/custom-button'
import { css } from '@emotion/react'
import clsx from 'clsx'
import { Dot } from 'lucide-react'
import { isMobile } from 'react-device-detect'

import light1 from '@/assets/icons/bonus/tournament/light1.svg'
import tournament1 from '@/assets/icons/bonus/tournament/tournament1.svg'
import LeaderboardTable from '../../components/LeaderboardTable'
import Tournament from '../../components/Tournament'

export default function BonusTournamentDetail() {
  return (
    <div
      className={clsx(' w-[820px] max-w-[820px] mx-auto flex flex-col gap-5', {
        'w-full p-0! border-none!': isMobile
      })}
    >
      {/* {isMobile && (
        <div className="w-full">
          <img className="w-full h-auto" src={BannerMobile} />
          <ProcessPresent className="flex-1 mt-5" persent={50} />
        </div>
      )} */}
      <div className="w-full flex flex-col gap-5">
        {!isMobile && (
          <div className="w-full relative">
            <Tournament
              title={'tournament.title'}
              des={'tournament.des'}
              labelBtn={'tournament.labelBtn'}
              srcIcon={
                <img
                  className="absolute top-0 right-[-150px] w-full h-full z-5"
                  src={tournament1}
                />
              }
              className="flex flex-col justify-between rounded-[20px] px-5 py-10 lg:p-10 h-[320px]"
              onClick={() => {}}
              imgPosition={
                <img
                  src={light1}
                  className="absolute top-0 right-0 w-full h-full"
                />
              }
              labelBtn2={'tournament.labelBtn2'}
              labelBtn3={'tournament.labelBtn3'}
              css={styled}
            />
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
            <div className="text-white text-app-main-24">Tournament name</div>
            <div
              className={clsx('flex flex-row gap-[10px] flex-wrap', {
                'w-full': isMobile
              })}
            >
              <CustomButton
                className={clsx('w-fit', { 'flex-2': isMobile })}
                variant="muted"
                label="Time left: 1d 14h"
              />
              <CustomButton
                variant="muted"
                className={clsx('w-fit', { 'flex-2': isMobile })}
                label="Wager: x100"
              />
              <CustomButton
                className={clsx('w-fit', { 'flex-1': isMobile })}
                label="Activate"
              />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="text-white text-app-main-20">
              How to Participate?
            </div>
            <div className="text-app-pale font-[500] text-app-medium-12">
              <ul>1. Register or log in to your account.</ul>
              <ul>2. Make a deposit of at least 500 ₽.</ul>
              <ul>3. Activate the bonus in the "Bonuses" section.</ul>
              <ul>4. Enjoy the game with an increased balance!</ul>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="text-white text-app-main-20">Rules:</div>
            <div className="text-app-pale font-[500] text-app-medium-12">
              <ul className="flex flex-row items-center">
                <Dot className="text-app-pale" /> The bonus is available only to
                new players.
              </ul>
              <ul className="flex flex-row items-center">
                <Dot className="text-app-pale" /> Free spins are credited for
                [Slot Name].
              </ul>
              <ul className="flex flex-row items-center">
                <Dot className="text-app-pale" /> Winnings from free spins are
                credited to the bonus balance.
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="text-white text-app-main-20">
              Bonus terms and conditions
            </div>
            <div className="text-app-pale font-[500] text-app-medium-12">
              For any legal information you can read{' '}
              <span className="text-white cursor-pointer underline">
                Bonus Terms & Conditions
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
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
          </div>
        </div>
        <LeaderboardTable />
      </div>
    </div>
  )
}

const styled = css`
  background: linear-gradient(
    180deg,
    rgba(64, 53, 85, 0.2) 0%,
    rgba(0, 0, 0, 0.1) 100%
  );

  box-shadow: 6px 6px 16px 0px rgba(22, 28, 22, 0.25);
`
