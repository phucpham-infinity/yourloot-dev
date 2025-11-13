import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import TelegramIcon from '@/assets/icons/social/telegram'
import IconBtn from '@/components/common/icon-button'
import { YourLootSupportBotLink } from '@/constants'
import { useNavigate } from 'react-router-dom'
import TitleGeneralV2 from '../TitleGeneralV2'

export default function AboutPageV2() {
  const navigate = useNavigate()
  const handleClick = () => {
    window.open(YourLootSupportBotLink, '_blank')
  }

  return (
    <div className="h-full overflow-y-auto md:w-[904px] md:py-[24px] md:mx-auto">
      <div className="flex-col items-start justify-start ">
        <div
          className="self-stretch   h-[600px]  text-[12px] text-[#9E90CF] justify-start items-start overflow-y-scroll scrollbar-thin scrollbar-track-transparent
             scrollbar-thumb-[#322849] "
        >
          <TitleGeneralV2
            titleClassName="text-v2-app-medium-16 font-black text-white "
            title="About Us"
            icon={<ArrowLeftIcon className="w-4 h-4" />}
            onClick={() => {
              navigate('/')
            }}
          />
          <div className="text-v2-app-medium-12 !leading-[16px] font-['Satoshi']  flex flex-col gap-[24px] pt-5">
            <span>
              Your Loot has set out to change the perception of what an online
              gaming platform is all about. We gathered the best references from
              Game Dev, iGaming, Crypto - and developed the first and only
              project with a unique loyalty program and a large volume of
              gamification.
            </span>
            <span>
              Diving into the project, every user will find something for his
              own experience. v.1.0.5
            </span>
            <span>
              We believe that you should play responsibly and with fun!
            </span>
          </div>

          <div className="inline-flex flex-col items-start justify-start h-12 gap-5 pt-10">
            <div className="text-white text-sm  font-['Satoshi'] text-v2-app-medium-12 !leading-[16px]">
              Follow Us
            </div>
            <div className="self-stretch ]  font-['Satoshi'] text-v2-app-medium-12 !leading-[16px]">
              Here you can find all links to our social media.
            </div>
            <div className="flex gap-2 ">
              <IconBtn
                icon={<TelegramIcon />}
                className="border-0"
                onClick={handleClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
