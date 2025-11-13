// import React from 'react'
import {useTranslation} from "react-i18next";
import {useScreen} from "@/hooks";

export default function BonusImage() {
  const { i18n } = useTranslation()
  const { isMobile } = useScreen()

  return (
    <div className="flex justify-center pb-8">
        {isMobile ? (
            <img
                src={ i18n.language === 'ru' ? "/images/banner/m-image-L1-RU.png"
                    : i18n.language === 'yz' ? "/images/banner/m-image-L1-UZ.png"
                        : "/images/banner/m-image-L1.png"
                }
                alt="100% Bonus"
                className="w-full h-auto rounded-lg"
            />
        ) : (
            <img
                src={ i18n.language === 'ru' ? "/images/banner/image-L1-RU.png"
                : i18n.language === 'yz' ? "/images/banner/image-L1-UZ.png"
                : "/images/banner/image-L1.png"
            }
                alt="100% Bonus"
                className="w-[1160px] h-[314px] rounded-lg"
            />
        )}
    </div>
  )
}