import AchievementItem from '@/app/v1/achievement/component/AchievementItem'
import ArrowLeft from '@/assets/icons/arrowLeft.tsx'
import Cup from '@/assets/images/achievement/cup.svg'
import CustomButton from '@/components/common/custom-button'
import Loader from '@/components/common/loader'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
const renderAchievements = (categoryList: any, onClick: any) => {
  return categoryList.map((item: any, index: number) => {
    return (
      <AchievementItem
        key={index}
        title={item.categoryName}
        buttonType={''}
        desc={item.categoryDescription}
        currentProgress={`${item.currentValue}/${item.maxValue}`}
        percentage={item.currentProgress}
        isRare={false}
        gotPrize={false}
        cssName={''}
        achievements={item.achievements}
        onClick={onClick}
      />
    )
  })
}

interface InputProps {
  categoryList: any
  isPending: boolean
  onClick: (a: any, b: any) => void
}
export default function AchievementList(props: InputProps) {
  const { categoryList, isPending = false, onClick } = props
  const navigate = useNavigate()
  const { t } = useTranslation()
  return (
    <div className={''}>
      <div className="mb-5 lg:mb-0 lg:justify-between w-full mx-auto items-center justify-center inline-flex">
        <div className="justify-start items-center gap-5 max-lg:gap-1 flex">
          <div data-svg-wrapper>
            <img src={Cup} alt="Logo" className="w-[53px] max-lg:w-[25px]" />
          </div>
          <div className="text-white text-2xl font-black font-['Satoshi']">
            {t('home.categoryName')}
          </div>
        </div>
        <div className="lg:pb-5 max-lg:pl-1 justify-start items-center gap-5 max-lg:gap-1 flex">
          <CustomButton
            label="Back"
            prefixIcon={<ArrowLeft />}
            className="w-fit items-center text-center text-[#9d90cf] text-xs font-medium font-['Satoshi'] inline-flex gap-1 justify-start"
            variant="muted"
            onClick={() => {
              navigate(-1)
            }}
          />
          <CustomButton
            label="Claimed Gifts"
            className="w-fit items-center text-center text-[#9d90cf] text-xs font-medium font-['Satoshi']"
            variant="default"
            onClick={() => {
              navigate('/claimed-gifts')
            }}
          />
        </div>
      </div>

      {isPending ? (
        <div className="w-full h-[300px] flex justify-center items-center translate-y-[-40px] pt-8">
          <Loader className="w-[40px] h-[40px]" />
        </div>
      ) : (
        <div
          className="relative w-full mx-auto items-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 justify-center"
          // css={isMobile ? mobileCss() : ''}
        >
          {renderAchievements(categoryList, onClick)}
        </div>
      )}
    </div>
  )
}
