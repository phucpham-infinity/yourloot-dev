import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import CustomButton from '@/components/common/custom-button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TitleGeneralV2 from '../TitleGeneralV2'

export default function LoyaltyProgramV2() {
  const navigate = useNavigate()
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="h-full overflow-y-auto  md:w-[904px]  md:py-[24px] md:mx-auto">
      <div className="flex-col items-start justify-start ">
        <div
          className="self-stretch  text-[12px] text-[#9E90CF] justify-start items-start overflow-y-scroll scrollbar-thin scrollbar-track-transparent
             scrollbar-thumb-[#322849] "
        >
          <TitleGeneralV2
            titleClassName="text-v2-app-medium-16 font-black text-white "
            title="Loyalty program"
            icon={<ArrowLeftIcon className="w-4 h-4" />}
            onClick={() => {
              navigate('/')
            }}
          />
          <div className="text-v2-app-medium-12 !leading-[16px] font-['Satoshi']flex flex-col gap-[24px] pt-5">
            <span>Last updated: 16.9.2024 </span>
            <span>
              You've just unlocked the key to a world of exclusive benefits,
              valuable bonuses, and real cash!
            </span>{' '}
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

              {/* Additional Content for Better Desktop Experience */}
              <div className="space-y-4">
                <h3 className="text-v2-app-medium-12 !leading-[16px] font-['Satoshi'] font-bold text-white">
                  How It Works
                </h3>
                <p className="text-justify">
                  The loyalty program operates on a point-based system where
                  your activities on the platform directly contribute to your
                  status progression. Every action, from making deposits to
                  participating in tournaments, helps you climb the ranks and
                  unlock exclusive benefits.
                </p>

                <h3 className="text-v2-app-medium-12 !leading-[16px] font-['Satoshi'] font-bold text-white">
                  Getting Started
                </h3>
                <p className="text-justify">
                  New users automatically start at Level 1 upon registration.
                  Your journey begins immediately, and you can start earning
                  points with your first deposit. The more active you are, the
                  faster you'll progress through the levels.
                </p>

                <h3 className="text-v2-app-medium-14 !leading-[16px] font-['Satoshi'] font-bold text-white">
                  Benefits Overview
                </h3>
                <p className="text-justify">
                  Each level brings new opportunities and rewards. From basic
                  participation benefits to exclusive VIP perks, the program is
                  designed to reward loyalty and consistent engagement. Higher
                  levels unlock premium features like accelerated withdrawals
                  and exclusive bonuses.
                </p>
              </div>

              {/* Show More Button */}
              {!isExpanded && (
                <div className="flex justify-start mt-8">
                  <CustomButton
                    onClick={toggleExpanded}
                    label="Show More"
                    variant="muted"
                    className="px-6 py-2 text-v2-app-medium-12 !leading-[16px] w-fit"
                  />
                </div>
              )}

              {/* Expandable Content */}
              {isExpanded && (
                <div className="space-y-4">
                  {/* Status Levels Section */}
                  <div className="mt-8">
                    {/* Level Requirements Table */}
                    <div className="mb-8 overflow-x-auto text-[#C5C0D8] text-xs font-['Satoshi'] ">
                      <table className="border border-[#6C6395]  border-collapse ">
                        <thead>
                          <tr>
                            <th className="p-3 font-bold text-left border-[#6C6395] border-2 w-[175px]">
                              Level
                            </th>
                            <th className="p-3 font-bold text-left border-[#6C6395] border-2 w-[325px]">
                              Points
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="p-3 border border-[#6C6395]">1</td>
                            <td className="p-3 border  border-[#6C6395]">
                              Assigned upon Registration
                            </td>
                          </tr>
                          <tr>
                            <td className="p-3 border border-[#6C6395]">2</td>
                            <td className="p-3 border border-[#6C6395]">
                              From the 1st deposit
                            </td>
                          </tr>
                          <tr>
                            <td className="p-3 border border-[#6C6395]">3</td>
                            <td className="p-3 border border-[#6C6395]">30</td>
                          </tr>
                          <tr>
                            <td className="p-3 border border-[#6C6395]">4</td>
                            <td className="p-3 border border-[#6C6395]">100</td>
                          </tr>
                          <tr>
                            <td className="p-3 border border-[#6C6395]">
                              5 (Pre-VIP)
                            </td>
                            <td className="p-3 border border-[#6C6395]">
                              450 in 90 days
                            </td>
                          </tr>
                          <tr>
                            <td className="p-3 border border-[#6C6395]">
                              6 (VIP)
                            </td>
                            <td className="p-3 border border-[#6C6395]">
                              800 in 30 days
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Privileges Table */}
                    <h3 className="mb-4 text-xs font-['Satoshi'] font-black ">
                      Privileges per level
                    </h3>
                    <div className="mb-8 overflow-x-auto font-['Satoshi'] text-[#C5C0D8]">
                      <table
                        className="text-v2-app-medium-14 !leading-[16px] border-2 border-collapse border-[#6C6395]"
                        style={{ minWidth: '800px' }}
                      >
                        <thead>
                          <tr>
                            <th className="p-2 font-bold text-left border-2 border-[#6C6395] lg:w-[400px] w-[300px]">
                              Privileges
                            </th>
                            <th className="font-bold text-center border-2 border-[#6C6395] w-[72px]">
                              Level 1
                            </th>
                            <th className="font-bold text-center border-2 border-[#6C6395] w-[72px]">
                              Level 2
                            </th>
                            <th className="font-bold text-center border-2 border-[#6C6395] w-[72px]">
                              Level 3
                            </th>
                            <th className="font-bold text-center border-2 border-[#6C6395] w-[72px]">
                              Level 4
                            </th>
                            <th className="font-bold text-center border-2 border-[#6C6395] w-[72px]">
                              Level 5
                            </th>
                            <th className="font-bold text-center border-2 border-[#6C6395] w-[72px]">
                              Level 6
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="p-2  border border-[#6C6395]">
                              Participation in the loyalty program
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2  border border-[#6C6395]">
                              Participation in tournaments and promotions
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2  border border-[#6C6395]">
                              24/7 chat support
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2  border border-[#6C6395]">
                              Store unlocked
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2  border border-[#6C6395]">
                              Available Exchange service
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2  border border-[#6C6395]">
                              New items are available in the bonus store
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2  border border-[#6C6395]">
                              Exclusive bonuses
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2  border border-[#6C6395]">
                              + 4% in Your Loot Coin for every deposit of $30 or
                              more
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2  border border-[#6C6395]">
                              +8% in Your Loot Coin for every deposit of $70 or
                              more
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2  border border-[#6C6395]">
                              +12% in Your Loot Coin for every deposit of $120
                              or more
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2  border border-[#6C6395]">
                              Priority notifications about all promotions
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2  border border-[#6C6395]">
                              Accelerated withdrawals
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2  border border-[#6C6395]">
                              Your nickname will be displayed on the top players
                              leaderboard
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              -
                            </td>
                            <td className="text-center border border-[#6C6395]">
                              +
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Level Maintenance */}
                    <div className="mb-6 text-v2-app-medium-12 !leading-[16px]">
                      <span className="mb-3 font-bold ">Level Maintenance</span>{' '}
                      <br />
                      <span className="mb-3">
                        Levels from 2 to 4 remain with you permanently once
                        achieved. However, levels 5 and 6 require maintenance!
                      </span>
                      <br />
                      <p className="pt-2 font-bold">Pre VIP and VIP Statuses</p>
                      <p>
                        Level 5 (Pre VIP) -- To maintain this status, the total
                        points for the last 90 days must be 450 from the current
                        date. If the conditions are not met, the status will be
                        downgraded to level 4.
                      </p>
                      <p className="mb-4">
                        Level 6 (VIP) -- To maintain this status, the total
                        points for the last 30 days must be 800 from the current
                        date. If the conditions are not met, the status will be
                        downgraded.
                      </p>
                    </div>

                    {/* Achievements and Bonus Store Section */}
                    <div className="mb-8">
                      <h3 className="mb-4 text-v2-app-medium-14 !leading-[16px] font-['Satoshi'] font-bold ">
                        Achievements and Bonus Store
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <h4 className="mb-2 text-xs font-['Satoshi'] font-bold ">
                            Achievements = Points + Experience
                          </h4>
                          <p className="mb-2">Complete tasks and earn:</p>
                          <div className="space-y-1">
                            <p>
                              🔹 Your Loot Coin (exchange for money or bonuses)
                            </p>
                            <p>
                              🔹 XP (fill the progress bar and unlock additional
                              rewards)
                            </p>
                          </div>
                        </div>

                        <p className="text-justify">
                          All available tasks can be found in the Achievements.
                        </p>

                        <p className="text-justify">
                          You'll find a variety of achievement categories, from
                          Explorer to Master! Each category contains a unique
                          set of achievements, and by earning them, you fill
                          your experience progress bar and earn Your Loot Coin.
                        </p>

                        <p className="text-justify">
                          You can always track your progress in your profile.
                        </p>

                        <p className="font-bold text-justify">
                          Just play and maximize your rewards!
                        </p>

                        <div>
                          <h4 className="mb-2 text-xs font-['Satoshi'] font-bold">
                            💎 Why is this awesome?
                          </h4>
                          <div className="space-y-1">
                            <p>
                              🔹 Exclusively for our players --- no random
                              participants!
                            </p>
                            <p>
                              🔹 The higher your status, the more privileges you
                              get (personal bonuses, expedited payouts, gifts).
                            </p>
                            <p>
                              🔹 Achievements + store = endless source of
                              benefits (play, complete tasks, earn even more!).
                            </p>
                          </div>
                        </div>

                        <p className="text-justify">
                          The entire system works automatically! Your activity =
                          your rewards.
                        </p>

                        <p className="text-justify">
                          Terms may be updated --- stay tuned for news so you
                          don't miss out on new opportunities! Play and win with
                          us!
                        </p>
                      </div>
                    </div>

                    {/* Loyalty Program Glossary */}
                    <div className="mb-8">
                      <h3 className="mb-4 text-v2-app-medium-14 !leading-[16px] font-['Satoshi'] font-bold ">
                        Loyalty Program Glossary
                      </h3>

                      <div className="space-y-3 text-xs">
                        <div>
                          <span className="font-bold">
                            1. Loyalty Program (LP)
                          </span>{' '}
                          --- a player reward system that incorporates
                          gamification (achievements) and player statuses.
                        </div>

                        <div>
                          <span className="font-bold">
                            2. Player Status (Level)
                          </span>{' '}
                          --- a level within the loyalty program that determines
                          the player's privileges. The higher the status, the
                          more bonuses and benefits are available.
                        </div>

                        <div>
                          <span className="font-bold">3. Status Points</span>{' '}
                          --- points awarded to players for making deposits.
                          These points are used to determine and maintain the
                          player's level in the loyalty program.
                        </div>

                        <div>
                          <span className="font-bold">4. Achievements</span> ---
                          a reward system for completing specific actions (e.g.,
                          a certain number of bets, following on social media,
                          or participating in promotions). Achievements earn
                          players Your Loot Coin and experience points (XP).
                        </div>

                        <div>
                          <span className="font-bold">
                            5. Internal Casino Coins (ICC)
                          </span>{' '}
                          --- named Your Loot Coin, which are virtual points
                          that players earn for completing achievements. Points
                          can be exchanged for real money or used to buy
                          bonuses.
                        </div>

                        <div>
                          <span className="font-bold">6. Experience (XP)</span>{' '}
                          --- virtual units that players receive for completing
                          achievements. Experience accumulates and contributes
                          to filling the progress bar of the achievement
                          category.
                        </div>

                        <div>
                          <span className="font-bold">7. Progress Bar</span> ---
                          a scale that shows how close a player is to completing
                          the current achievement category.
                        </div>

                        <div>
                          <span className="font-bold">
                            8. Achievement Category
                          </span>{' '}
                          --- a group of achievements that are united by a
                          common action principle or theme. Each category
                          represents a set of tasks that players can complete to
                          earn XP and Your Loot Coin.
                        </div>

                        <div>
                          <span className="font-bold">9. Bonus Store</span> ---
                          a place for converting Your Loot Coin or real money
                          into bonuses.
                        </div>

                        <div>
                          <span className="font-bold">10. Exchange</span> --- a
                          service for exchanging Your Loot Coin for real money.
                        </div>
                      </div>
                    </div>

                    {/* Show Less Button at the bottom */}
                    <div className="flex justify-start pt-4">
                      <CustomButton
                        onClick={toggleExpanded}
                        label="Show Less"
                        variant="muted"
                        className="px-6 py-2 text-v2-app-medium-14 !leading-[16px] w-fit"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
