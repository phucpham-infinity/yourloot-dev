import { useTranslation } from 'react-i18next'

export default function Piggy2() {
  const { t } = useTranslation()
  return (
    <div className="h-[200px] p-10 bg-[#39182d] rounded-[20px] border border-white flex-col justify-center items-start inline-flex overflow-hidden">
      <div className="w-[562.96px] h-[215.51px] relative">
        <div className="w-[562.96px] h-[215.51px] left-0 top-0 absolute bg-gradient-to-r from-black to-black" />
        <img
          className="w-[702.77px] h-[903.40px] left-[-133.54px] top-[-212.25px] absolute opacity-30 blur-[10px]"
          src="https://placehold.co/703x903"
        />
      </div>
      <div className="self-stretch justify-between items-center inline-flex">
        <div className="flex-col justify-center items-start gap-5 inline-flex">
          <div className="text-white text-2xl font-black font-['Satoshi']">
            {t('game.card.piggyTap')}
          </div>
          <div className="text-white text-sm font-medium font-['Satoshi']">
            {t('game.card.pragmaticPlay')}
          </div>
          <div className="flex-col justify-start items-start gap-2.5 flex">
            <div className="w-[115px] h-10 px-6 py-3 bg-[#5aff8b] rounded-[15px] shadow-[-6px_-6px_24px_0px_rgba(95,255,105,0.15)] shadow-[6px_6px_16px_0px_rgba(36,50,36,0.25)] border border-[#c2a1f1] justify-center items-center inline-flex overflow-hidden">
              <div className="text-white text-xs font-bold font-['Satoshi']">
                Play
              </div>
            </div>
          </div>
        </div>
        <img
          className="w-[131.13px] h-[135.51px] rounded-[20px] shadow-[0px_0px_24px_0px_rgba(243,101,149,0.40)]"
          src="https://placehold.co/131x136"
        />
      </div>
    </div>
  )
}
