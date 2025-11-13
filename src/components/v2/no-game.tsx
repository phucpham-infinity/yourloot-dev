import { useTranslation } from 'react-i18next'

export const NoGame = () => {
  const { t } = useTranslation()
  return (
    <div className="text-[14px] text-[#6C6395] text-center flex justify-center items-center h-[82px]">
      {t('noGame', `You haven't added any games to favorites yet.`)}
    </div>
  )
}
