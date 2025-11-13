import { cn, css } from '@/lib/utils'

interface DefaultLabelProps {
  className?: string
  style?: React.CSSProperties
  height?: number | string
  prefixIcon?: React.ReactNode
  suffixIcon?: React.ReactNode
  label?: string
  disabled?: boolean
  textAlign?: 'left' | 'right' | 'center'
  variant?: string
}
const CustomButton = (props: DefaultLabelProps) => {
  const {
    className,
    style,
    height,
    label,
    prefixIcon,
    suffixIcon,
    disabled,
    textAlign,
    variant = 'default',
    ...rest
  } = props
  return (
    <div
      style={style}
      css={cssFn(variant, height)}
      className={cn('w-full', className, disabled && 'disabled')}
      {...rest}
    >
      {prefixIcon}
      {label && (
        <div
          className={`label flex-1 select-none text-${textAlign}`}
          style={{ textAlign }}
        >
          {label}
        </div>
      )}
      {suffixIcon}
    </div>
  )
}

const cssFn = (type?: string, height?: number | string) => {
  const baseStyles = css`
    max-height: ${height ?? '40px'};
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    padding: 5px 10px 5px 10px;
    border-radius: 20px;
    outline: none !important;

    .label {
      color: var(--YourLoot-Brand-Light, #d9ceff);
      font-size: 10px;
      font-style: normal;
      font-weight: 500;
    }
  `

  switch (type) {
    case 'CTA':
      return css`
        ${baseStyles}
        .label {
          color: #97ffaa;
        }
        border: 1px solid #48a567;
        background: radial-gradient(
          103.94% 265.37% at 59.95% -118.74%,
          #43f45e 0%,
          #107a27 100%
        );
        box-shadow:
          6px 6px 12px 0px rgba(22, 20, 24, 0.5),
          -6px -6px 24px 0px rgba(113, 255, 95, 0.15);
      `

    case 'muted':
      return css`
        ${baseStyles}
        border: 1px solid #2d253b;
        background: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0.5) 0%,
          rgba(0, 0, 0, 0.1) 10%
        );
        box-shadow:
          6px 6px 12px 0px rgba(22, 20, 24, 0.5),
          -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
        .label {
          color: var(--YourLoot-Brand-Medium, #9e90cf);
        }
      `

    default:
      return css`
        ${baseStyles}
      `
  }
}

export default CustomButton
