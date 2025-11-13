import { isString } from 'lodash-es'
import { useTranslation } from 'react-i18next'

const TitleGeneralV2 = ({
  title,
  titleKey,
  hiddenTitle = false,
  hiddenIcon = false,
  iconTitle,
  icon,
  onClick = () => {},
  titleClassName = ''
}: {
  title: string
  titleKey?: string
  hiddenTitle?: boolean
  hiddenIcon?: boolean
  icon?: string | React.ReactElement
  iconTitle?: string | React.ReactElement
  onClick: () => void
  titleClassName?: string
}) => {
  const { t } = useTranslation()

  return (
    <div className="flex items-center justify-start gap-2" onClick={onClick}>
      {!hiddenIcon && (
        <>
          {isString(icon) ? (
            <img src={icon} alt="PgSoft" className="object-cover w-4 h-4" />
          ) : (
            icon
          )}
        </>
      )}

      {iconTitle && iconTitle}

      {!hiddenTitle && <div className={`${titleClassName}`}>{titleKey ? t(titleKey, title) : title}</div>}
    </div>
  )
}

export default TitleGeneralV2
