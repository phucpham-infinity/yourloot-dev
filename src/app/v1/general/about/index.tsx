import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import LogoFullIcon from '@/assets/icons/logoFull'
import TelegramIcon from '@/assets/icons/social/telegram'
import CustomButton from '@/components/common/custom-button'
import IconBtn from '@/components/common/icon-button'
import { YourLootSupportBotLink } from '@/constants'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function AboutPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const handleClick = () => {
    window.open(YourLootSupportBotLink, '_blank')
  }

  return (
    <div className="h-full overflow-hidden">
      <div className="flex-col gap justify-start items-start">
        <div className="flex items-center pb-5 justify-between w-full">
          <div className="text-white text-2xl gap-6 font-black">
            {t('about.title')}
          </div>
          <CustomButton
            height="40px"
            variant="muted"
            prefixIcon={<ArrowLeftIcon />}
            label={t('about.back')}
            className="w-fit flex text-[#9d90cf] gap-3 hover:bg-[#15121D] transition-all duration-300"
            onClick={() => navigate('/')}
          />
        </div>
        <div
          className="self-stretch rounded-[20px] p-5 h-[600px] lg:h-[450px]  border border-[#413c4a] justify-start items-start overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-track-transparent  
             scrollbar-thumb-[#322849]"
        >
          <div className="w-150 h-150 ml-100 -mt-145 bg-[#6330aa] rounded-full blur-[400px]"></div>
          <div className="self-stretch">
            <LogoFullIcon />
            <div className="flex flex-col justify-start items-start gap-5 ">
              <div className="text-white text-2xl font-black font-['Satoshi']">
                {t('about.title')}
              </div>
              <div className="self-stretch text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
                Your Loot has set out to change the perception of what an online
                gaming platform is all about. We gathered the best references
                from Game Dev, iGaming, Crypto - and developed the first and
                only project with a unique loyalty program and a large volume of
                gamification. <br />
                Diving into the project, every user will find something for his
                own experience. <br />
                We believe that you should play responsibly and with fun!
              </div>
            </div>

            <div className="h-12 flex-col  pt-10 justify-start items-start gap-5 inline-flex">
              <div className="text-white text-2xl font-black font-['Satoshi']">
                {t('about.ourLinks')}
              </div>
              <div className="self-stretch text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
                {t('about.socialMediaDescription')}
              </div>
              <div className="flex gap-2 ">
                <CustomButton
                  onClick={handleClick}
                  variant="default"
                  label={t('about.contactUs')}
                  className="w-fit flex gap-3 bg[#0F0D13]"
                />

                <IconBtn
                  icon={<TelegramIcon />}
                  className="border-0"
                  onClick={handleClick}
                />
              </div>
            </div>
          </div>

          {/* <div className="p-5 mt-10 w-full grid grid-cols-2 rounded-2xl border border-[#403C4A] bg-gradient-to-b from-[#39225B] to-[#130E1E] overflow-hidden">
            <div className=" flex-col flex-col justify-start items-start gap-5 inline-flex">
              <div className="self-stretch h-12 flex-col justify-start items-start gap-5 flex">
                <div className="text-white w-full text-2xl font-black font-['Satoshi']">
                  Promotion materials
                </div>
                <div className="self-stretch text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
                  You can download our promotion materials such as logotypes and
                  other images.
                </div>
              </div>
              <div className="w-48 h-10 mt-10 bg-[#644ec7] rounded-2xl shadow-[-6px_-6px_24px_0px_rgba(148,95,255,0.15)] shadow-[6px_6px_12px_0px_rgba(22,20,24,0.50)] border border-[#c2a1f1] justify-center items-center inline-flex">
                <div className="justify-start items-center p-0 flex">
                  <div className="text-center text-[#d8ceff] text-xs font-medium font-['Satoshi']">
                    Download YourLoot Promo pack
                  </div>
                </div>
              </div>
            </div>
            <div className="  flex justify-end h-40">
              <MaterialIcon />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}
