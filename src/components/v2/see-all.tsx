import { useTranslation } from 'react-i18next'

const SeeAllBtn = ({
  onClick,
  props
}: {
  onClick: () => void
  props?: any
}) => {
  const { t } = useTranslation()
  return (
    <div
      onClick={onClick}
      className="min-w-[115px] min-h-[115px] w-full max-w-[115px] max-h-[115px] h-[115px] md:min-w-[150px] md:min-h-[150px] md:w-[150px] md:h-[150px] cursor-pointer hover:opacity-80 flex justify-center items-center border-app-default text-white text-app-medium-14 font-medium rounded-[8px] bg-[#0b0a10]"
      {...props}
    >
      {t('home.seeAll', 'See all')}
    </div>
  )
}

export default SeeAllBtn
