import NameAndDes from '@/app/v1/home/components/ui-common/NameAndDes'
import tournamentImg from '@/assets/icons/bonus/tournament/tournament-mobile.svg'
import CustomButton from '@/components/common/custom-button'
import { cn } from '@/lib/utils'

interface ITournamentMobileProps {
  className?: string
  title: string
  des: string
  labelBtn: string
  labelBtn2: string
  labelBtn3: string
  imgPosition?: React.ReactNode
  onClick?: () => void
}

export default function TournamentMobile({
  title,
  des,
  labelBtn2,
  labelBtn3,
  labelBtn,
  onClick = () => {}
}: ITournamentMobileProps) {
  return (
    <div className={cn('relative flex gap-5 overflow-hidden flex-col')}>
      <div className="w-full h-[220px] rounded-[20px] border-app-default overflow-hidden ">
        <img src={tournamentImg} alt="" className="w-full h-full scale-121" />
      </div>
      <div className="flex flex-col gap-5 p-5 rounded-[20px] border-app-default overflow-hidden">
        <div className="flex gap-2.5">
          <CustomButton
            label={labelBtn2}
            className="w-fit h-[38px] z-10 !py-5 text-xs font-medium leading-3 whitespace-nowrap"
            onClick={onClick}
            variant="muted"
          />
          <CustomButton
            label={labelBtn3}
            className="w-fit h-[38px] z-10 !py-5 text-xs font-medium leading-3 whitespace-nowrap"
            onClick={onClick}
            variant="muted"
          />
        </div>
        <div className="flex-col items-start gap-5 inline-flex">
          <NameAndDes
            title={title}
            des={des}
            className="gap-2.5 max-w-[274px] leading-3.5"
          />
          <CustomButton
            label={labelBtn}
            className="w-fit h-[38px] z-10 !py-5 text-xs font-medium leading-3 whitespace-nowrap"
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  )
}
