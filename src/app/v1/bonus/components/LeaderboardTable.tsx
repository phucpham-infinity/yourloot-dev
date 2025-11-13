import light1 from '@/assets/images/bonus/tableLeaderLight.svg'
import CustomButton from '@/components/common/custom-button'
import { css } from '@/lib/utils'
import { useState } from 'react'

function LeaderboardTable() {
  const leaderboardData = [
    { rank: 1, name: 'Player 1', score: 123456789 },
    { rank: 2, name: 'Player 2', score: 123456789 },
    { rank: 3, name: 'Player 3', score: 123456789 }
  ]

  // State to track the active row
  const [activeRow, setActiveRow] = useState(1)

  // Function to handle row click
  const handleRowClick = (player: any) => {
    setActiveRow(activeRow === player.rank ? null : player.rank)
  }

  return (
    <div
      className=" text-white p-6 rounded-2xl w-full z-[10] gap-10 relative"
      css={style}
    >
      <img
        className="absolute top-0 right-[0] w-full h-full z-[5]"
        src={light1}
      />
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Leaderboard</h1>
        <CustomButton
          label="See all"
          variant="default"
          className="w-fit h-[38px] text-xs font-medium!py-4!bg-[#0a090f]"
        />
      </div>

      {/* Table */}
      <div>
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 text-gray-400 text-sm font-medium">
          <div className="col-span-1">#</div>
          <div className="col-span-7">Name</div>
          <div className="col-span-4 text-right">Score</div>
        </div>

        {/* Leaderboard Rows */}
        {leaderboardData.map((player) => (
          <div
            key={player.rank}
            onClick={() => handleRowClick(player)}
            className={`grid grid-cols-12 gap-4 px-6 py-4 text-white transition-all duration-200 rounded-lg cursor-pointer z-10 relative select-none  ${
              activeRow === player.rank
                ? ' border border-purple-500/50 shadow-lg shadow-purple-500/20 '
                : ''
            }`}
            css={activeRow === player.rank ? styled1 : ''}
          >
            <div className="col-span-1 text-gray-300">{player.rank}</div>
            <div className="col-span-7 font-medium">{player.name}</div>
            <div className="col-span-4 text-right text-gray-300">
              {player.score.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeaderboardTable

const style = css`
  background: linear-gradient(
    180deg,
    rgba(64, 53, 85, 0.2) 0%,
    rgba(0, 0, 0, 0.1) 100%
  );

  box-shadow: 6px 6px 16px 0px rgba(22, 28, 22, 0.25);
`
const styled1 = css`
  background: radial-gradient(
    103.94% 265.37% at 59.95% -118.74%,
    #654ec8 0%,
    #372864 100%
  );

  box-shadow:
    6px 6px 12px 0px rgba(22, 20, 24, 0.5),
    -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
`
