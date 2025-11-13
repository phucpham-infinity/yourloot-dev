import NameAndDes from '@/app/v1/home/components/ui-common/NameAndDes'
import Character from '@/assets/icons/bonus/Character.svg'
import lightBanner from '@/assets/icons/bonus/lightBanner.svg'
import CustomButton from '@/components/common/custom-button'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

// import piggyIcon from '@/assets/icons/home/pic1_rottweiler_dog.svg'
// import { useNavigate } from 'react-router-dom'
// import { useGamesStore } from '@/store'

interface BannerBonusProps {
  className?: string
}

export default function BannerBonus({ className }: BannerBonusProps) {
  const { t } = useTranslation()

  // const { games } = useGamesStore()

  // const randomGame = games?.sort(() => Math.random() - 0.5).slice(0, 1)[0]

  return (
    <div
      style={
        {
          // backgroundImage: 'url(src/assets/images/pippy-bg.png)'
          // backgroundImage: `url(https://cdn.softswiss.net/${randomGame?.provider}/${randomGame?.id}.png)`
        }
      }
      className={cn(
        'h-[200px] relative w-full p-10 rounded-[10px] border border-[#4d4767] justify-start items-center gap-10 inline-flex overflow-hidden',
        className
      )}
    >
      {/* <div className="absolute z-[5] top-0 left-0 w-full h-full bg-black opacity-60"></div> */}

      <img
        src={lightBanner}
        className="absolute bottom-0 right-0 w-full h-full"
      />

      <div className="flex-col justify-center items-start gap-5 inline-flex">
        <NameAndDes
          title={t('bonus.banner.title')}
          des={t('bonus.banner.description')}
          className="gap-2.5 z-10 whitespace-nowrap"
        />
        <CustomButton
          label={t('bonus.banner.readMore')}
          onClick={() => {}}
          className="w-fit h-[38px] !py-5 text-xs font-medium leading-3 whitespace-nowrap"
        />
      </div>
      <img className="absolute top-[20px] right-0 z-0" src={Character} />
    </div>
  )
}
