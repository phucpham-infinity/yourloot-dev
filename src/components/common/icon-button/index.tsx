import { cn, css } from '@/lib/utils'
import { forwardRef } from 'react'

type IconButtonVariant = 'default' | 'CTA'

interface IconBtnProps {
  className?: string
  style?: React.CSSProperties
  height?: number | string
  icon: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: IconButtonVariant
}

const IconBtn = forwardRef<HTMLDivElement, IconBtnProps>((props, ref) => {
  const {
    className,
    icon,
    style,
    height,
    onClick,
    disabled = false,
    variant = 'default'
  } = props
  return (
    <div
      ref={ref}
      style={style}
      css={cssFn(variant, height)}
      className={cn(
        'h-10 min-h-10 w-10 min-w-10 z-20 cursor-pointer rounded-[15px] flex items-center justify-center',
        variant === 'default' && 'border border-[#3b2f51] bg-header-balance',
        className
      )}
      onClick={disabled ? undefined : onClick}
    >
      {icon}
    </div>
  )
})

IconBtn.displayName = 'IconBtn'

const cssFn = (variant?: IconButtonVariant, height?: number | string) => {
  const baseStyles = css`
    height: ${height};
  `

  switch (variant) {
    case 'CTA':
      return css`
        ${baseStyles}
        border: 1px solid #4ba769;
        background: radial-gradient(
          103.94% 265.37% at 59.95% -118.74%,
          #43f45e 0%,
          #107a27 100%
        );

        &:hover {
          border: 1px solid #4ed160;
          background: radial-gradient(
            103.94% 265.37% at 59.95% -118.74%,
            #43f45e 0%,
            #25ab42 100%
          );
        }

        &:active {
          border: 1px solid #399745;
          background: radial-gradient(
            103.94% 265.37% at 59.95% -118.74%,
            #269436 0%,
            #0a5c1a 100%
          );
        }
      `
    case 'default':
    default:
      return css`
        ${baseStyles}
        &:hover {
          background:
            linear-gradient(
              0deg,
              rgba(154, 103, 255, 0.2) 0%,
              rgba(154, 103, 255, 0.2) 100%
            ),
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.5) 0%,
              rgba(0, 0, 0, 0.1) 100%
            );
        }
      `
  }
}

export default IconBtn
