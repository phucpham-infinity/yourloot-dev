import PageNotFoundIcon from '@/assets/icons/page-not-found'
import CustomButton from '@/components/common/custom-button'
import { useTranslation } from 'react-i18next'

export default function Page404() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-8  bg-[#040305]">
      <PageNotFoundIcon />
      <div className="flex flex-col items-center justify-center w-full h-full gap-2">
        <div
          style={{
            color: '#FFF',
            fontSize: 14,
            fontFamily: 'Inter',
            fontWeight: '500',
            wordWrap: 'break-word'
          }}
        >
          Oops! Page not found.
        </div>
        <div
          style={{
            color: '#6C6395',
            fontSize: 12,
            fontFamily: 'Inter',
            fontWeight: '500',
            wordWrap: 'break-word'
          }}
        >
          The page you're looking for doesn't exist or was moved.
        </div>
      </div>
      <CustomButton label={t('page404.reload')} className="w-50" />
    </div>
  )
}
