import { cn, css } from '@/lib/utils'
import { isString } from 'lodash-es'
import { isDesktop } from 'react-device-detect'
import { useTranslation } from 'react-i18next'

const TitleV2 = ({
  title,
  className,
  hiddenTitle = false,
  hiddenIcon = false,
  iconTitle,
  icon,
  onClick = () => {},
  hiddenViewAll = true
}: {
  title: string
  className?: string
  hiddenTitle?: boolean
  hiddenIcon?: boolean
  icon?: string | React.ReactElement
  iconTitle?: string | React.ReactElement
  onClick: () => void
  hiddenViewAll?: boolean
}) => {
  const { t } = useTranslation()
  return (
    <div
      className={cn(
        'w-fit flex items-center justify-start gap-2 cursor-pointer',
        className
      )}
      onClick={onClick}
    >
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

      {!hiddenTitle && (
        <div className="text-white text-[16px] leading-[16px] md:text-[18px] md:leading-[18px] font-medium capitalize">
          {title}
        </div>
      )}

      {!hiddenViewAll && isDesktop && (
        <div
          css={stylesItem}
          onClick={onClick}
          className="text-[#9E90CF] text-app-medium-14 font-medium ml-1"
        >
          {t('game.popular.seeAll', 'View All')}
        </div>
      )}
    </div>
  )
}

export default TitleV2

const stylesItem = () => {
  return css`
    padding: 8px;
    border-radius: 10px;
    &:hover {
      background: radial-gradient(
        103.94% 265.37% at 59.95% -118.74%,
        rgba(101, 78, 200, 0.4) 0%,
        rgba(55, 40, 100, 0.4) 100%
      );
      cursor: pointer;
      transition: all 0.2s ease;
    }
  `
}
