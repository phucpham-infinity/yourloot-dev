// import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import InProgressIcon from '@/assets/icons/inProgress'
// import CustomButton from '@/components/common/custom-button'
// import { useTranslation } from 'react-i18next'
// import { useNavigate } from 'react-router-dom'

export default function InProgress() {
  //   const navigate = useNavigate()
  //   const { t } = useTranslation()

  return (
    <div
      className={`flex flex-col md:flex-row gap-6  w-full md:h-[600px] h-[500px]`}
    >
      <div className="w-full h-full felx pt-[51px] px-[40px] rounded-[20px] p-5   border border-[#413c4a]  flex flex-col justify-start items-start gap-5 relative">
        <div className="flex w-full gap-5 items-center justify-between">
          {/* <div
            style={{
              color: 'white',
              fontSize: 24,
              fontFamily: 'Satoshi',
              fontWeight: '900',
              wordWrap: 'break-word'
            }}
          >
            {t('pageInDev.title')}
          </div> */}
          {/* <CustomButton
            height="40px"
            variant="muted"
            prefixIcon={<ArrowLeftIcon />}
            label={t('pageInDev.back')}
            className="w-fit flex text-[#9d90cf] gap-3 hover:bg-[#15121D] transition-all duration-300"
            onClick={() => navigate('/')}
          /> */}
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <InProgressIcon />
        </div>
      </div>
    </div>
  )
}
