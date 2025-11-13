import ArrowLeft from '@/assets/icons/arrowLeft.tsx'
import Gift from '@/assets/icons/home/gift.tsx'
import CustomButton from '@/components/common/custom-button'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

// const MOCK_CLAIMED_ITEMS = [
//   {
//     itemName: 'Item Name',
//     time: '01.02.25 / 14:24',
//     achievementName: 'Achievement Name'
//   },
//   {
//     itemName: 'Item Name',
//     time: '01.02.25 / 14:24',
//     achievementName: 'Achievement Name'
//   },
//   {
//     itemName: 'Item Name',
//     time: '01.02.25 / 14:24',
//     achievementName: 'Achievement Name'
//   },
//   {
//     itemName: 'Item Name',
//     time: '01.02.25 / 14:24',
//     achievementName: 'Achievement Name'
//   },
//   {
//     itemName: 'Item Name',
//     time: '01.02.25 / 14:24',
//     achievementName: 'Achievement Name'
//   },
//   {
//     itemName: 'Item Name',
//     time: '01.02.25 / 14:24',
//     achievementName: 'Achievement Name'
//   },
//   {
//     itemName: 'Item Name',
//     time: '01.02.25 / 14:24',
//     achievementName: 'Achievement Name'
//   },
//   {
//     itemName: 'Item Name',
//     time: '01.02.25 / 14:24',
//     achievementName: 'Achievement Name'
//   },
//   {
//     itemName: 'Item Name',
//     time: '01.02.25 / 14:24',
//     achievementName: 'Achievement Name'
//   },
//   {
//     itemName: 'Item Name',
//     time: '01.02.25 / 14:24',
//     achievementName: 'Achievement Name'
//   },
//   {
//     itemName: 'Item Name',
//     time: '01.02.25 / 14:24',
//     achievementName: 'Achievement Name'
//   },
//   {
//     itemName: 'Item Name',
//     time: '01.02.25 / 14:24',
//     achievementName: 'Achievement Name'
//   }
// ]

// const renderClaimedGifts = () => {
//   return MOCK_CLAIMED_ITEMS.map((item, index) => {
//     const { itemName, time, achievementName } = item
//     return (
//       <ClaimedItem
//         key={index}
//         itemName={itemName}
//         achievementName={achievementName}
//         time={time}
//       />
//     )
//   })
// }
export default function ClaimedGifts() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  return (
    <div className="w-full">
      <div className="justify-between w-full mx-auto items-center lg:inline-flex max-lg:flex-col">
        <div className="justify-start items-center gap-5 flex">
          <Gift />
          <div className="text-white text-2xl font-black font-['Satoshi']">
            {t('claimedGifts.title')}
          </div>
        </div>
        <div className="max-lg:w-full max-lg:pt-5 max-lg:pr-5 pb-5 justify-start items-center gap-5 flex">
          <CustomButton
            label={t('claimedGifts.back')}
            prefixIcon=<ArrowLeft />
            className="w-fit max-lg:w-1/4 items-center text-center text-[#9d90cf] text-xs font-medium font-['Satoshi'] inline-flex gap-1 justify-start"
            variant="muted"
            onClick={() => {
              navigate(-1)
            }}
          />
          <CustomButton
            label={t('claimedGifts.allAchievements')}
            className="w-fit max-lg:w-3/4 items-center text-center text-[#9d90cf] text-xs font-medium font-['Satoshi']"
            variant="default"
            onClick={() => {
              navigate('/achievement')
            }}
          />
        </div>
      </div>
      <div className="w-full mx-auto items-center grid lg:grid-cols-4 max-lg:grid-cols-2 gap-5 justify-between">
        {/* {renderClaimedGifts()} */}
      </div>
    </div>
  )
}
