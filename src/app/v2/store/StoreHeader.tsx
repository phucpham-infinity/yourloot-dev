import { useTranslation } from 'react-i18next'

export default function StoreHeader() {
  const { t } = useTranslation()

  return (
    <div className="inline-flex flex-col justify-start items-start gap-3">
      <div className="self-stretch justify-start text-white text-[20px] font-black leading-[20px]">
        {t('store.title', 'Store')}
      </div>
      <div className="justify-center text-[#9E90CF] text-app-medium-14 leading-[14px]">
        {t(
          'store.description',
          'Purchase and activate bonuses such as free spins and more.'
        )}
      </div>
    </div>
  )
}
