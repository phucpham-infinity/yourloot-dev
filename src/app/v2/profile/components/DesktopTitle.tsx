// import { useTranslation } from 'react-i18next'

const DesktopTitle = () => {
  // const { t } = useTranslation()

  return (
    <div className="hidden md:block">
      <div className="max-w-[1200px] mx-auto px-6 py-4">
        <div className="inline-flex flex-col items-start justify-start gap-3">
          <div className="self-stretch justify-start text-white text-v2-app-medium-20">
            My Profile
          </div>
          <div className="justify-center text-sm text-v2-app-medium-14 text-[#9E90CF]">
            Manage your account and settings.
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesktopTitle