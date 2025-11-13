import { cn } from '@/lib/utils'
import React from 'react'

interface PopularProps {
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  title: string
  des?: string
  className?: string
  css?: any
  imgPosition?: React.ReactNode
  isShowRightIcon?: boolean
  onClick?: () => void
  numberLineTitle?: number
  numberLineDes?: number
  styleDes?: React.CSSProperties
  styleTitle?: React.CSSProperties
}

export default function PopularHome({
  iconLeft,
  iconRight,
  title,
  des,
  className,
  css,
  imgPosition,
  isShowRightIcon = true,
  onClick = () => {},
  numberLineTitle = 1,
  numberLineDes = 1,
  styleDes,
  styleTitle
}: PopularProps) {
  return (
    <div
      css={css}
      className={cn(
        'relative w-full h-full p-5 rounded-[20px] border-app-default flex-col justify-end lg:gap-10 gap-5 inline-flex z-10 overflow-hidden',
        className
      )}
      onClick={onClick}
    >
      {imgPosition && imgPosition}
      {/* {iconLeft && iconLeft} */}

      <div className="self-stretch justify-between items-center flex gap-1">
        <div className="justify-start items-center gap-5 flex">
          {iconLeft && iconLeft}
          <div
            style={{
              ...styleTitle,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: numberLineTitle,
              lineHeight: 'normal !important'
            }}
            className="text-white text-xl font-black line-clamp-1 break-all"
          >
            {title}
          </div>
          {des && (
            <div
              style={{
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: numberLineDes,
                ...styleDes
              }}
              className="text-[#9d90cf] leading-4 text-[12px] font-medium break-all"
            >
              {des}
            </div>
          )}
        </div>
        {iconRight && isShowRightIcon && iconRight}
      </div>
    </div>
  )
}
