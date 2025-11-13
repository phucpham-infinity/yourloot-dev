// import Fail from '@/assets/images/login/validate-fail.svg'
import Success from '@/assets/images/login/validate-pass.svg'
import NoFocus from '@/assets/images/login/nofocus.svg'

import { useTranslation } from 'react-i18next'

interface ValidateProps {
  isValidateEnglish: boolean
  isValidateLength: boolean
  isValidateUppercase: boolean
  isValidateNumber: boolean
  isFocus?: boolean
}

const Validate = ({
  isValidateEnglish,
  isValidateLength,
  isValidateUppercase,
  isValidateNumber
}: ValidateProps) => {
  const { t } = useTranslation()

  return (
    <div className="w-full text-[10px] text-left text-[#9E90CF] font-bold">
      {/* <h3 className="font-bold"> {t('auth.title')}</h3> */}
      <div className="flex flex-col gap-2 ">
        <div className="flex items-center gap-2">
          <div>
            {!isValidateEnglish ? <img src={NoFocus} /> : <img src={Success} />}
          </div>
          <div>{t('auth.englishLettersOnly')}</div>
        </div>
        <div className="flex items-center gap-2">
          <div>
            {!isValidateLength ? <img src={NoFocus} /> : <img src={Success} />}
          </div>
          <div>{t('auth.minimumLength')}</div>
        </div>
        <div className="flex items-center gap-2">
          <div>
            {!isValidateUppercase ? (
              <img src={NoFocus} />
            ) : (
              <img src={Success} />
            )}
          </div>
          <div>{t('auth.upperLowerCase')}</div>
        </div>
        <div className="flex items-center gap-2">
          <div>
            {!isValidateNumber ? <img src={NoFocus} /> : <img src={Success} />}
          </div>
          <div>{t('auth.number')}</div>
        </div>
      </div>
    </div>
  )
}

export default Validate
