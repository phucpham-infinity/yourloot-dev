import InProgressIcon from '@/assets/icons/inProgress'
import CustomButton from '@/components/common/custom-button'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function PageInDev() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div
      className={`flex flex-col md:flex-row gap-6  w-full md:h-[600px] h-[500px]`}
    >
      <div className="w-full h-full felx pt-[51px] px-[40px] rounded-[20px] p-5    flex flex-col justify-center items-center gap-[10px] relative">
        <InProgressIcon />
        <div
          style={{
            color: 'white',
            fontSize: isMobile ? 20 : 24,
            fontFamily: 'Satoshi',
            fontWeight: '900',
            wordWrap: 'break-word',
            textAlign: 'center',
            paddingTop: '25px'
          }}
        >
          {t('pageInDev.title')}
        </div>
        <div
          style={{
            color: '#C5C0D8',
            fontSize: 14,
            fontFamily: 'Satoshi',
            fontWeight: '500',
            wordWrap: 'break-word',
            paddingBottom: '25px'
          }}
        >
          {t('pageInDev.message')}
        </div>
        <CustomButton
          height="40px"
          variant="default"
          label={t('pageInDev.back')}
          className=" w-2/5 lg:w-1/7 p-10 flex text-[#9d90cf] gap-3 hover:bg-[#15121D] transition-all duration-300"
          onClick={() => navigate('/')}
        />
      </div>
    </div>
  )
}
