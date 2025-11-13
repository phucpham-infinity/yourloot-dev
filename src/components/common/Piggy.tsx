import CustomButton from '@/components/common/custom-button'
import { cn, DOMAIN_IMAGE_LOOT_BANNER } from '@/lib/utils'
import NameAndDes from '../../app/v1/home/components/ui-common/NameAndDes'

// import piggyIcon from '@/assets/icons/home/pic1_rottweiler_dog.svg'
import { Game } from '@/services/controller'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface IGameNameProps {
  className?: string
  randomGame: Game
}

export default function GameName({ className, randomGame }: IGameNameProps) {
  const router = useNavigate()
  const { t } = useTranslation()

  return (
    <div
      style={{
        // backgroundImage: 'url(src/assets/images/pippy-bg.png)'
        backgroundImage: `url(${DOMAIN_IMAGE_LOOT_BANNER}/${randomGame?.provider}/${randomGame?.id}.jpg)`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
      className={cn(
        'h-[200px] relative w-full p-10 rounded-[10px] border-app-default justify-start items-center gap-10 inline-flex overflow-hidden',
        className
      )}
    >
      <div className="absolute z-[5] top-0 left-0 w-full h-full bg-black opacity-60"></div>
      <div className="flex-col justify-center items-start gap-5 inline-flex">
        <NameAndDes
          title={randomGame?.title || ' '}
          des={randomGame?.producer || ' '}
          className="gap-2.5 z-10 whitespace-nowrap"
        />
        <CustomButton
          label={t('promoDefault.play')}
          onClick={() =>
            router(`/game-inside/${randomGame?.provider}/${randomGame?.id}`)
          }
          className="w-fit h-[38px] !py-5 text-xs font-medium leading-3 whitespace-nowrap"
        />
      </div>
      {/* <img
        className="translate-x-[30px] w-[231px] h-[216px] z-0"
        src={piggyIcon}
      /> */}
    </div>
  )
}
