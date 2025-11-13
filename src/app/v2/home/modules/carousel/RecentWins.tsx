import { css, DOMAIN_IMAGE_LOOT } from '@/lib/utils'
import { gameController } from '@/services/controller'
import Marquee from 'react-fast-marquee'
import { memo } from 'react'
const RecentWins = memo(() => {
  const { useGetBonusGames } = gameController()

  const { data: bonusGames, isLoading: isLoadingBonus } = useGetBonusGames({
    size: 10,
    enabled: true
  })

  return (
    <div className="relative flex gap-4 h-16 items-center justify-center">
      <div className="w-[108px] text-white text-[14px] font-medium whitespace-nowrap">
        Recent Wins
      </div>
      <div css={style} />
      <Marquee>
        {isLoadingBonus ? (
          <div className="flex gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="w-[104px] h-10 gap-2 mr-5 flex">
                <div className="w-[30px] rounded-[6px] h-full bg-gray-50 animate-pulse flex-shrink-0"></div>
                <div className="w-[66px] h-full flex flex-col gap-1 justify-between">
                  <div className="w-[46px] rounded-[6px] h-4 bg-gray-50 animate-pulse flex-shrink-0"></div>
                  <div className="w-[46px] rounded-[6px] h-4 bg-gray-50 animate-pulse flex-shrink-0"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          bonusGames?.pages
            .flatMap((page) => page.content?.content)
            .map((item) => (
              <div key={item?.id} className="w-[104px] flex h-10 gap-2 mr-7">
                <img
                  className="w-[30px] rounded-[6px] h-full object-cover"
                  src={`${DOMAIN_IMAGE_LOOT}/${item?.provider}/${item?.id}.png`}
                  alt={item?.title}
                />
                <div className="w-full h-full flex flex-col gap-1">
                  <div className="truncate text-[#A695DA] text-[12px] font-medium">
                    Su***ay
                  </div>
                  <div className="truncate text-white text-[12px] font-medium">
                    $32.50
                  </div>
                </div>
              </div>
            ))
        )}
      </Marquee>
    </div>
  )
})

export default RecentWins

const style = css`
  width: 32px;
  height: 54px;
  position: absolute;
  left: 108px;
  top: 5px;
  z-index: 99;
  background: linear-gradient(90deg, #07070b 0%, rgba(7, 7, 11, 0) 100%);
`
