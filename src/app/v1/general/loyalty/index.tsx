import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import CustomButton from '@/components/common/custom-button'
import { useNavigate } from 'react-router-dom'

export default function LoyaltyProgram() {
  const navigate = useNavigate()
  return (
    <div className="h-full overflow-hidden">
      <div className="flex-col gap justify-start items-start">
        <div className="flex items-center pb-5 justify-between w-full">
          <div className="text-white text-2xl gap-6 font-black">
            Loyalty program
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
          className="self-stretch rounded-[20px] p-5 h-[600px]  border border-[#413c4a] justify-start items-start overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-track-transparent  
             scrollbar-thumb-[#322849] "
        >
          <div className="w-150 h-150 ml-100 -mt-145 bg-[#6330aa] rounded-full blur-[400px]"></div>
          <div className="self-stretch text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
            <p>
              You've just unlocked the key to a world of exclusive benefits,
              valuable bonuses, and real cash!
            </p>{' '}
            <br />
            {/* Main Content */}
            <div className="space-y-4">
              <p className="text-justify">
                This loyalty program is the intellectual property of Cintra Soft
                Ltd and has been specifically developed for the players of the
                Your Loot platform. By registering on the website, you
                automatically become a participant in the Loyalty Program. This
                program cannot be copied or used by both for personal and
                commercial use. The creation date of the program is April 10,
                2025, and the latest version is 3.0. All previous and subsequent
                versions of the program are also intellectual property and may
                not be copied or used for personal or commercial purposes.
              </p>

              <p className="text-justify">
                The Loyalty Program includes its own Internal Casino Coins
                (ICC), which are called Your Loot Coins. The ICC name is also
                the intellectual and commercial property of Cintra Soft Ltd and
                may not be copied or used. Attempting to use the ICC YLC name
                will result in liability. These coins represent virtual points
                that players can earn by completing specific achievements. ICCs
                have value only within the framework of the Loyalty Program,
                being an integral entity and representing the unit of
                measurement of the bonus received by the user. ICCs can be
                exchanged to be credited to the user's main balance at the
                user's request. The exchange rate of such transactions is
                indicated by the Organizer and can be changed based on the
                policy of the Organizer. The user may be denied exchange
                transactions for any violations of ICC usage rules and/or these
                rules.
              </p>

              {/* Features List */}
              <div className="my-4">
                <p>
                  🔹 Different status levels --- from newcomer to elite VIP with
                  special perks.
                </p>
                <p>
                  🔹 Achievements --- complete tasks, earn Your Loot Coin and
                  XP.
                </p>
                <p>
                  🔹 Bonus Store --- exchange points for cool prizes or real
                  money.
                </p>
                <p>
                  🔹 Progress Bar --- fill the bars and earn additional rewards.
                </p>
              </div>

              <p className=" font-medium my-6">
                This is not just a loyalty program --- it's your personal source
                of benefits for playing with us!
              </p>

              {/* Status Levels Section */}
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4 ">
                  Status Levels --- from newcomer to VIP
                </h2>
                <p className="mb-6">
                  The higher your level, the better the privileges.
                </p>

                <div className="mb-4">
                  <p className="font-bold">Your starting level</p>
                  <p>Immediately after registration, you receive Level 1.</p>
                </div>

                <div className="mb-4">
                  <p className="font-bold">How to earn status points?</p>
                  <p>1 status point = for every $10 deposit</p>
                  <p>
                    When you top up your account, points are credited
                    automatically!
                  </p>
                </div>

                <div className="mb-6">
                  <p className="font-bold">How to level up?</p>
                  <p>
                    50% of your deposits should be wagered to move up to the
                    next level.
                  </p>
                </div>

                {/* Level Requirements Table */}
                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse border-2 border-black">
                    <thead>
                      <tr>
                        <th className="border-2 border-black p-3 text-left font-bold">
                          Level
                        </th>
                        <th className="border-2 border-black p-3 text-left font-bold">
                          Points
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-black p-3">1</td>
                        <td className="border border-black p-3">
                          Assigned upon Registration
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-black p-3">2</td>
                        <td className="border border-black p-3">
                          From the 1st deposit
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-black p-3">3</td>
                        <td className="border border-black p-3">30</td>
                      </tr>
                      <tr>
                        <td className="border border-black p-3">4</td>
                        <td className="border border-black p-3">100</td>
                      </tr>
                      <tr>
                        <td className="border border-black p-3">5 (Pre-VIP)</td>
                        <td className="border border-black p-3">
                          450 in 90 days
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-black p-3">6 (VIP)</td>
                        <td className="border border-black p-3">
                          800 in 30 days
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Privileges Table */}
                <h3 className="text-lg font-bold mb-4">Privileges per level</h3>
                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse border-2 border-black text-sm">
                    <thead>
                      <tr>
                        <th className="border-2 border-black p-2 text-left font-bold">
                          Privileges
                        </th>
                        <th className="border-2 border-black p-2 text-center font-bold">
                          Levels
                          <br />
                          Level 1
                        </th>
                        <th className="border-2 border-black p-2 text-center font-bold">
                          Level 2
                        </th>
                        <th className="border-2 border-black p-2 text-center font-bold">
                          Level 3
                        </th>
                        <th className="border-2 border-black p-2 text-center font-bold">
                          Level 4
                        </th>
                        <th className="border-2 border-black p-2 text-center font-bold">
                          Pre-VIP Level
                        </th>
                        <th className="border-2 border-black p-2 text-center font-bold">
                          VIP Level
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-black p-2 font-medium">
                          Participation in the loyalty program
                        </td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-black p-2 font-medium">
                          Participation in tournaments and promotions
                        </td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-black p-2 font-medium">
                          24/7 chat support
                        </td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-black p-2 font-medium">
                          Store unlocked
                        </td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-black p-2 font-medium">
                          Available Exchange service
                        </td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-black p-2 font-medium">
                          New items are available in the bonus store
                        </td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-black p-2 font-medium">
                          Exclusive bonuses
                        </td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-black p-2 font-medium">
                          + 4% in Your Loot Coin for every deposit of $30 or
                          more
                        </td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center"></td>
                      </tr>
                      <tr>
                        <td className="border border-black p-2 font-medium">
                          +8% in Your Loot Coin for every deposit of $70 or more
                        </td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                        <td className="border border-black p-2 text-center"></td>
                      </tr>
                      <tr>
                        <td className="border border-black p-2 font-medium">
                          +12% in Your Loot Coin for every deposit of $120 or
                          more
                        </td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-black p-2 font-medium">
                          Priority notifications about all promotions
                        </td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-black p-2 font-medium">
                          Accelerated withdrawals
                        </td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-black p-2 font-medium">
                          Your nickname will be displayed on the top players
                          leaderboard
                        </td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center"></td>
                        <td className="border border-black p-2 text-center">
                          ✔
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Level Maintenance */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3">Level Maintenance</h3>
                  <p className="mb-3">
                    Levels from 2 to 4 remain with you permanently once
                    achieved. However, levels 5 and 6 require maintenance!
                  </p>

                  <h4 className="font-bold text-base mb-2">
                    Pre VIP and VIP Statuses
                  </h4>
                  <p className="mb-2">
                    Level 5 (Pre VIP) -- To maintain this status, the total
                    points for the last 90 days must be 450 from the current
                    date. If the conditions are not met, the status will be
                    downgraded to level 4.
                  </p>
                  <p className="mb-4">
                    Level 6 (VIP) -- To maintain this status, the total points
                    for the last 30 days must be 800 from the current date. If
                    the conditions are not met, the status will be downgraded.
                  </p>
                </div>

                {/* Achievements Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3">
                    Achievements and Bonus Store
                  </h3>
                  <h4 className="font-bold mb-3">
                    Achievements = Points + Experience
                  </h4>
                  <p className="mb-2">Complete tasks and earn:</p>
                  <p>🔹 Your Loot Coin (exchange for money or bonuses)</p>
                  <p className="mb-4">
                    🔹 XP (fill the progress bar and unlock additional rewards)
                  </p>

                  <p className="mb-4">
                    All available tasks can be found in the{' '}
                    <u>
                      <strong>
                        <a
                          href="https://yourloot.io/achievement"
                          style={{ color: '#3268a8' }}
                        >
                          Achievements
                        </a>
                      </strong>
                    </u>
                    .
                  </p>

                  <p className="mb-2">
                    You'll find a variety of achievement categories, from
                    Explorer to Master! Each
                  </p>
                  <p className="mb-2">
                    category contains a unique set of achievements, and by
                    earning them, you fill your experience progress bar and earn
                    Your Loot Coin.
                  </p>
                  <p className="mb-4">
                    You can always track your progress in your profile.
                  </p>
                  <p className="font-bold text-lg mb-6">
                    Just play and maximize your rewards!
                  </p>
                </div>

                {/* Why is this awesome */}
                <div className="mb-6">
                  <h3 className="font-bold mb-4">💎 Why is this awesome?</h3>
                  <p>
                    🔹 Exclusively for our players --- no random participants!
                  </p>
                  <p>
                    🔹 The higher your status, the more privileges you get
                    (personal bonuses, expedited payouts, gifts).
                  </p>
                  <p className="mb-4">
                    🔹 Achievements + store = endless source of benefits (play,
                    complete tasks, earn even more!).
                  </p>

                  <p className="mb-2">
                    The entire system works automatically! Your activity = your
                    rewards.
                  </p>
                  <p className="mb-6">
                    Terms may be updated --- stay tuned for news so you don't
                    miss out on new opportunities! Play and win with us!
                  </p>
                </div>

                {/* Glossary */}
                <div className="mb-6">
                  <h3 className="font-bold mb-4">Loyalty Program Glossary</h3>
                  <div className="space-y-2">
                    <p>
                      1. Loyalty Program (LP) --- a player reward system that
                      incorporates gamification (achievements) and player
                      statuses.
                    </p>
                    <p>
                      2. Player Status (Level) --- a level within the loyalty
                      program that determines the player's privileges. The
                      higher the status, the more bonuses and benefits are
                      available.
                    </p>
                    <p>
                      3. Status Points --- points awarded to players for making
                      deposits. These points are used to determine and maintain
                      the player's level in the loyalty program.
                    </p>
                    <p>
                      4. Achievements --- a reward system for completing
                      specific actions (e.g., a certain number of bets,
                      following on social media, or participating in
                      promotions). Achievements earn players Your Loot Coin and
                      experience points (XP).
                    </p>
                    <p>
                      5. Internal Casino Coins (ICC) --- named Your Loot Coin,
                      which are virtual points that players earn for completing
                      achievements. Points can be exchanged for real money or
                      used to buy bonuses.
                    </p>
                    <p>
                      6. Experience (XP) --- virtual units that players receive
                      for completing achievements. Experience accumulates and
                      contributes to filling the progress bar of the achievement
                      category.
                    </p>
                    <p>
                      7. Progress Bar --- a scale that shows how close a player
                      is to completing the current achievement category.
                    </p>
                    <p>
                      8. Achievement Category --- a group of achievements that
                      are united by a common action principle or theme. Each
                      category represents a set of tasks that players can
                      complete to earn XP and Your Loot Coin.
                    </p>
                    <p>
                      9. Bonus Store --- a place for converting Your Loot Coin
                      or real money into bonuses.
                    </p>
                    <p>
                      10. Exchange --- a service for exchanging Your Loot Coin
                      for real money.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
