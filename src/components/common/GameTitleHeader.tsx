import CustomButton from '@/components/common/custom-button'
import { useHomeStore } from '@/store/slices/home'
import { isString } from 'lodash-es'
import React from 'react'
import { useTranslation } from 'react-i18next'

const GameTitleHeader = ({
  title,
  icon,
  hiddenSeeAll = false,
  hiddenTitle = false,
  hiddenIcon = false,
  label,
  onClick = () => {}
}: {
  title: string
  icon: string | React.ReactElement
  hiddenSeeAll?: boolean
  hiddenTitle: boolean
  hiddenIcon?: boolean
  label?: string
  onClick?: () => void
}) => {
  const { setType } = useHomeStore()
  const { t } = useTranslation()
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center gap-2 w-auto h-[50px] text-[22px] not-italic font-black leading-[normal] text-white">
        {!hiddenIcon &&
          (isString(icon) ? (
            <img
              src={icon}
              alt="PgSoft"
              className="w-full h-full object-cover"
            />
          ) : (
            icon
          ))}
        {!hiddenTitle && <div className="w-full"> {title}</div>}
      </div>
      {!hiddenSeeAll && (
        <CustomButton
          onClick={() => {
            if (onClick) {
              onClick()
            } else {
              setType('gamesoft')
            }
          }}
          label={label || t('bonus.seeAll')}
          variant="muted"
          className="w-fit gap-2.5"
        />
      )}
    </div>
  )
}

export default GameTitleHeader
