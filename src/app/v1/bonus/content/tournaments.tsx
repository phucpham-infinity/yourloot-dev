// import { useTranslation } from 'react-i18next'
// import Tournament from '../components/Tournament'

// image
// import tournament1 from '@/assets/icons/bonus/tournament/tournament1.svg'
// import light1 from '@/assets/icons/bonus/tournament/light1.svg'
// import light2 from '@/assets/icons/bonus/tournament/light2.svg'
// import { css } from '@/lib/utils'
// import TournamentMobile from '../components/TournamentMobile'
// import { isMobile } from 'react-device-detect'

const Tournaments = () => {
  // const { t } = useTranslation()
  return (
    <div className="flex flex-col gap-10 mt-5">
      {/* {!isMobile ? (
        <>
          {tournaments.map((tournament, index) => (
            <Tournament
              key={index}
              title={tournament.title}
              des={tournament.des}
              labelBtn={tournament.labelBtn}
              srcIcon={
                <img
                  className="absolute top-0 right-[-150px] w-full h-full"
                  src={tournament1}
                />
              }
              className="flex flex-col justify-between rounded-[20px] px-5 py-10 lg:p-10 h-[320px]"
              onClick={() => {}}
              imgPosition={
                <img
                  src={tournament.light}
                  className="absolute top-0 right-0 w-full h-full"
                />
              }
              labelBtn2={tournament.labelBtn2}
              labelBtn3={tournament.labelBtn3}
              css={tournament.css}
            />
          ))}
        </>
      ) : (
        <>
          {tournaments.map((tournament, index) => (
            <TournamentMobile
              key={index}
              title={tournament.title}
              des={tournament.des}
              labelBtn={tournament.labelBtn}
              labelBtn2={tournament.labelBtn2}
              labelBtn3={tournament.labelBtn3}
              css={tournament.css}
              className="w-full flex flex-col"
              // light={tournament.light}
            />
          ))}
        </>
      )} */}
    </div>
  )
}

export default Tournaments

// const tournament1Style = css`
//   background: linear-gradient(
//     180deg,
//     rgba(64, 53, 85, 0.2) 0%,
//     rgba(0, 0, 0, 0.1) 100%
//   );

//   box-shadow: 6px 6px 16px 0px rgba(22, 28, 22, 0.25);
// `

// const tournament2Style = css`
//   background: linear-gradient(
//     180deg,
//     rgba(64, 53, 85, 0.2) 0%,
//     rgba(0, 0, 0, 0.1) 100%
//   );
//   box-shadow: 6px 6px 16px 0px rgba(22, 28, 22, 0.25);
// `

// const tournaments = [
//   {
//     title: 'Tournament name',
//     des: 'Duration: March 12 00:01 UTC - March 27, 2025, until 23:59 UTC',
//     labelBtn: 'Start playing!',
//     labelBtn2: 'Current place: 24',
//     labelBtn3: 'Time left: 1d 24h',
//     css: tournament1Style,
//     light: light1
//   },
//   {
//     title: 'Tournament name',
//     des: 'Duration: March 12 00:01 UTC - March 27, 2025, until 23:59 UTC',
//     labelBtn: 'Start playing!',
//     labelBtn2: 'Current place: 24',
//     labelBtn3: 'Time left: 1d 24h',
//     css: tournament2Style,
//     light: light2
//   },
//   {
//     title: 'Tournament name',
//     des: 'Duration: March 12 00:01 UTC - March 27, 2025, until 23:59 UTC',
//     labelBtn: 'Start playing!',
//     labelBtn2: 'Current place: 24',
//     labelBtn3: 'Time left: 1d 24h',
//     css: tournament2Style,
//     light: light2
//   }
// ]
