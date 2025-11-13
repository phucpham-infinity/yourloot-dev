import AchievementList from '@/app/v1/achievement/component/AchievementList'
import CategoryList from '@/app/v1/achievement/component/CategoryList'
import { useAuthStore } from '@/store'
import { css } from '@/lib/utils.ts'
import { achievementsController } from '@/services/controller/achivements'
import { useEffect, useRef, useState } from 'react'

export default function Achievement() {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { useGetAllAchievements } = achievementsController()
  const [percentage, setPercentage] = useState<number>(0)
  const [achievementList, setAchievements] = useState<any[]>([])
  const { userId } = useAuthStore()
  const { data: achievements, isPending } = useGetAllAchievements(userId!)

  const chooseCategory = (percentage: number, achievementList: any[]) => {
    setPercentage(percentage)
    setAchievements(achievementList)
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    if (achievements) {
      const item = achievements?.content[0]
      setPercentage(item.currentProgress)
      setAchievements(item.achievements)
    }
  }, [achievements])

  return (
    <div className="w-full">
      <AchievementList
        categoryList={achievements?.content}
        isPending={isPending}
        onClick={chooseCategory}
      />
      <CategoryList
        ref={targetRef}
        percentage={percentage}
        canClaim={false}
        name="Achievements"
        data={achievementList}
        customCssFunc={grid1Css}
        customMobileCssFunc={grid1MobileCss}
        isPending={isPending}
      />
      {/*<CategoryList percentage={100} canClaim={true} name="Rare Category" data={RARE_CATEGORY_LIST} customCssFunc={grid2Css} customMobileCssFunc={grid2MobileCss}/>*/}
    </div>
  )
}

const grid1Css = () => {
  return css`
    display: grid;
    grid-template-columns: repeat(
      4,
      minmax(min(100%/3, max(128px, 100%/5)), 1fr)
    );
  `
}

const grid1MobileCss = () => {
  return css`
    display: grid;
    grid-template-columns: 1fr 1fr;

    .item0 {
      grid-area: 3 / 1 / span 1 / span 2;
    }

    .item1 {
      grid-area: 5 / 1 / span 1 / span 2;
    }
  `
}

// const grid2Css = () => {
//     return css`
//         display: grid;
//         grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
//         grid-template-areas:
//                 "item1 item1 item2 item2 item3 item3"
//                 "item4 item4 item4 item5 item5 item5";
//         .item1 {
//             grid-area: item1;
//         }
//
//         .item2 {
//             grid-area: item2;
//         }
//
//         .item3 {
//             grid-area: item3;
//         }
//
//         .item4 {
//             grid-area: item4;
//         }
//
//         .item5 {
//             grid-area: item5;
//         }
//
//     `;
// }
//
//
// const grid2MobileCss = () => {
//     return css`
//         display: grid;
//         grid-template-columns: 1fr 1fr;
//         .item1 {
//             grid-area: 3 / 1 / span 1 / span 2;
//         }
//
//     `;
// }
