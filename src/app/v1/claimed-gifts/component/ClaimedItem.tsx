import Gift from '@/assets/icons/home/gift.tsx'
import { css } from '@/lib/utils.ts'
import { useTranslation } from 'react-i18next'

interface Props {
  itemName: string
  time: string
  achievementName: string
}
export default function ClaimedItem(props: Props) {
  const { itemName, time, achievementName } = props
  const { t } = useTranslation()
  return (
    <div
      className="p-5 bg-[#201f41] rounded-[15px] border border-[#483b69] flex-col justify-center gap-7 inline-flex"
      css={cssFn()}
    >
      <div className="w-full justify-between mx-auto items-center inline-flex">
        <div>
          <Gift />
        </div>
      </div>
      <div>
        <div className="text-white text-xl font-black font-['Satoshi']">
          {itemName}
        </div>
        <div className="text-[#9d90cf] text-[10px] font-bold font-['Satoshi']">
          {t('claimedGifts.claimed')}: {time}
        </div>
      </div>
      <div className="justify-between w-full mx-auto items-center inline-flex">
        <div className="text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
          {t('claimedGifts.rewardFor')}:
        </div>
        <div className="text-white text-xs font-medium font-['Satoshi']">
          {achievementName}
        </div>
      </div>
    </div>
  )
}

const cssFn = () => {
  return css`
    background-image: linear-gradient(180deg, #201b2e 20%, #202044 70%);
  `
}
