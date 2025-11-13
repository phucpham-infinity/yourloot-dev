import { useTranslation } from 'react-i18next'
import {isMobile} from "react-device-detect";

interface BadgeProps {
  titleKey: string
  descriptionKey: string
  imageSrc: string
  imageClassName: string
}

export default function Badge({ titleKey, descriptionKey, imageSrc, imageClassName }: BadgeProps) {
  const { t, i18n } = useTranslation()
  const isRu = i18n.language?.toLowerCase().startsWith('ru')
  const tEn = i18n.getFixedT('en')
  
  return (
    <div className="self-stretch p-3 bg-[#5940a2] rounded-2xl inline-flex justify-start items-center gap-4 md:w-full md:flex-1 md:h-44 md:pl-6 md:pr-[80px] md:py-6 md:relative md:flex-col md:justify-start md:items-start">
        {
            isMobile ?
                (<div className="w-20 h-20 relative">
                    <img className="w-24 h-20 left-[-5px] top-0 absolute" src={imageSrc}/>
                </div>)
                :
                (<img className={imageClassName} src={imageSrc}/>)
        }

      <div className="flex-1 inline-flex flex-col justify-center items-start gap-4 md:w-full md:self-stretch md:justify-start">
        <div className="text-center justify-center text-white text-base font-black font-['Inter'] leading-[16px] md:w-full md:self-stretch md:justify-start md:leading-[16px] md:text-left">
          {isRu ? t(titleKey) : tEn(titleKey)}
        </div>
        <div className="self-stretch justify-center text-slate-300 text-sm font-medium font-['Inter'] leading-[16px] md:justify-start md:pr-[24px] md:leading-[16px]">
          {isRu ? t(descriptionKey) : tEn(descriptionKey)}
        </div>
      </div>
    </div>
  )
}