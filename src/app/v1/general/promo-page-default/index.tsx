import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import Banner from '@/assets/icons/footer/banner.svg'
import LightPromocodeDefault from '@/assets/images/promocode/light-promocode-default.svg'
import CustomButton from '@/components/common/custom-button'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function PromoPageDefault() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  return (
    <div className="h-full overflow-hidden">
      <div className="flex-col gap justify-start items-start gap-5">
        <div className="flex items-start md:items-center pb-5 justify-between w-full gap-4 md:gap-0">
          <div className="text-white text-2xl gap-6 font-black">
            {t('promoDefault.title')}
          </div>
          <CustomButton
            height="40px"
            variant="muted"
            prefixIcon={<ArrowLeftIcon />}
            label={t('promoDefault.back')}
            className="w-fit flex text-[#9d90cf] gap-3 hover:bg-[#15121D] transition-all duration-300"
            onClick={() => navigate('/')}
          />
        </div>

        <div className="relative self-stretch h-[200px] mb-5 w-full px-10 py-20  bg-gradient-to-b flex  justify-space-between border border-[#413c4a]  rounded-xl overflow-hidden">
          <img
            className="w-full h-full left-[215.07px] top-[-144.81px] absolute opacity-10 blur-[25px]"
            src={Banner}
          />
          {/* <div className="w-full absolute bg-[#140e1c] grid grid-cols-2 rounded-full blur-[400px]" /> */}
          <div className="flex w-1/2 flex-col justify-start items-start gap-3">
            <div className="relative justify-center text-white text-2xl font-black ">
              {t('promoDefault.header')}
            </div>
            <div className="relative justify-center text-[#c5c0d8] text-sm font-medium ">
              {t('promoDefault.description')}
            </div>
          </div>
          <div className="absolute right-[-260px] lg:right-[100px] top-0">
            <img src={Banner} className="" />
          </div>
        </div>

        <div
          className="relative overflow-hidden rounded-[20px] p-5 h-full lg:h-[300px] flex flex-col border border-[#413c4a] justify-start items-start scrollbar-thin scrollbar-track-transparent  
             scrollbar-thumb-[#322849]"
        >
          <img
            src={LightPromocodeDefault}
            className="w-full h-full absolute top-0 right-[-30px]"
          />
          <div className="flex flex-col gap-5">
            <div className=" flex-col justify-start items-start gap-5 inline-flex">
              <div className="text-white text-2xl font-black font-['Satoshi']">
                {t('promoDefault.name')}
              </div>
              <div className="text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
                {t('promoDefault.lastUpdated')} <br />
                {t('promoDefault.introduction')} <br />
                {t('promoDefault.content')}
              </div>
            </div>
            <CustomButton
              height="40px"
              variant="default"
              label={t('promoDefault.play')}
              className="flex text-[#9d90cf] w-[200px] gap-3 hover:bg-[#15121D] transition-all duration-300"
              onClick={() => navigate('/')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
