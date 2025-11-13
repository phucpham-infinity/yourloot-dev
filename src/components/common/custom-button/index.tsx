import Loader from '@/components/common/loader'
import { cn, css } from '@/lib/utils'
import { forwardRef } from 'react'
type ButtonType =
  | 'default'
  | 'default-small'
  | 'CTA'
  | 'invisible'
  | 'muted'
  | 'danger'
  | 'deactivate'
  | 'muted-danger'
  | 'default-danger'
  | 'invisible-danger'
  | 'custom'

interface DefaultButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  style?: React.CSSProperties
  height?: number | string
  prefixIcon?: React.ReactNode
  suffixIcon?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  label?: React.ReactNode
  labelStyle?: React.CSSProperties
  disabled?: boolean
  textAlign?: 'left' | 'right' | 'center'
  variant?: ButtonType
  isLoading?: boolean
  color?: string
}

const CustomButton = forwardRef<HTMLButtonElement, DefaultButtonProps>(
  (props: DefaultButtonProps, ref) => {
    const {
      className,
      style,
      height,
      onClick,
      label,
      prefixIcon,
      suffixIcon,
      disabled,
      textAlign,
      variant = 'default',
      isLoading,
      labelStyle,
      color,
      ...rest
    } = props
    const hasBothIcons = !!prefixIcon && !!suffixIcon
    return (
      <button
        ref={ref}
        style={style}
        css={cssFn(variant, height, hasBothIcons)}
        className={cn(
          'w-full z-[3] relative',
          className,
          disabled && 'disabled'
        )}
        onClick={disabled ? undefined : onClick}
        {...rest}
      >
        {!!prefixIcon && (
          <div className="flex items-center justify-center mr-2">
            {prefixIcon}
          </div>
        )}
        {isLoading ? (
          <Loader
            size={20}
            thin
            className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          />
        ) : (
          label && (
            <div
              className={`label flex-1 text-white overflow-hidden select-none whitespace-nowrap text-${textAlign}`}
              style={{ textAlign, ...labelStyle, color }}
            >
              {label}
            </div>
          )
        )}
        {!!suffixIcon && (
          <div className="flex items-center justify-center ml-2">
            {suffixIcon}
          </div>
        )}
      </button>
    )
  }
)

const cssFn = (
  type?: ButtonType | string,
  height?: number | string,
  hasBothIcons = true
) => {
  const baseStyles = css`
    max-height: ${height ?? '40px'};
    height: ${height ?? '40px'};
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    ${hasBothIcons
      ? 'justify-content: space-between;'
      : 'justify-content: center;'}

    align-items: center;
    flex-shrink: 0;
    padding: 15px;
    cursor: pointer;
    border-radius: 10px;
    outline: none !important;

    .label {
      color: #d9ceff;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  `

  switch (type) {
    case 'default':
      return css`
        ${baseStyles}
        border: 1px solid #6752a5;
        background: radial-gradient(
          103.94% 265.37% at 59.95% -118.74%,
          #654ec8 0%,
          #372864 100%
        );

        /* box-shadow:
          6px 6px 12px 0px rgba(22, 20, 24, 0.5),
          -6px -6px 24px 0px rgba(148, 95, 255, 0.15); */

        &:hover {
          background: radial-gradient(
            103.94% 265.37% at 59.95% -118.74%,
            #735ae4 0%,
            #483387 100%
          );
        }

        &:active {
          background: radial-gradient(
            103.94% 265.37% at 59.95% -118.74%,
            #463593 0%,
            #31235c 100%
          );
        }

        &.disabled {
          cursor: not-allowed;
          border: 1px solid #534b5f;
          .label {
            color: #605e68;
          }
          background: rgba(97, 97, 97, 0.2);

          &:hover,
          &:active {
            background: radial-gradient(
              103.94% 265.37% at 59.95% -118.74%,
              #474747 0%,
              #1c1c1c 100%
            );
          }
        }
      `

    case 'danger':
      return css`
        ${baseStyles}
        /* border: 1px solid #D94244; */
        background: #d94244;
        /* box-shadow:
          6px 6px 12px 0px rgba(22, 20, 24, 0.5),
          -6px -6px 24px 0px rgba(148, 95, 255, 0.15); */

        &:hover {
          background: #d94244;
        }

        &:active {
          background: #d94244;
        }

        &.disabled {
          cursor: not-allowed;
          border: 1px solid #534b5f;
          .label {
            color: #605e68;
          }
          background: #d94244;

          &:hover,
          &:active {
            background: #d94244;
          }
        }
      `

    case 'default-small':
      return css`
        ${baseStyles}
        padding: 10px;
        max-height: ${height ?? '28px'};
        height: ${height ?? '28px'};

        border: 1px solid #6752a5;
        background: radial-gradient(
          103.94% 265.37% at 59.95% -118.74%,
          #654ec8 0%,
          #372864 100%
        );
        /* box-shadow:
          6px 6px 12px 0px rgba(22, 20, 24, 0.5),
          -6px -6px 24px 0px rgba(148, 95, 255, 0.15); */

        &:hover {
          background:
            linear-gradient(
              0deg,
              rgba(154, 103, 255, 0.2) 0%,
              rgba(154, 103, 255, 0.2) 100%
            ),
            radial-gradient(
              103.94% 265.37% at 59.95% -118.74%,
              #654ec8 0%,
              #372864 100%
            );
        }

        &:active {
          background:
            linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.2) 0%,
              rgba(0, 0, 0, 0.2) 100%
            ),
            radial-gradient(
              103.94% 265.37% at 59.95% -118.74%,
              #654ec8 0%,
              #372864 100%
            );
        }

        &.disabled {
          .label {
            color: #605e68;
          }
          cursor: not-allowed;
          border: 1px solid #534b5f;
          background: radial-gradient(
            103.94% 265.37% at 59.95% -118.74%,
            #474747 0%,
            #1c1c1c 100%
          );

          &:hover,
          &:active {
            background: radial-gradient(
              103.94% 265.37% at 59.95% -118.74%,
              #474747 0%,
              #1c1c1c 100%
            );
          }
        }
      `

    case 'CTA':
      return css`
        ${baseStyles}
        .label {
          color: #97ffaa;
        }
        border: 1px solid #4ba769;
        background: radial-gradient(
          103.94% 265.37% at 59.95% -118.74%,
          #43f45e 0%,
          #107a27 100%
        );

        /* box-shadow:
          6px 6px 12px 0px rgba(22, 20, 24, 0.5),
          -6px -6px 24px 0px rgba(113, 255, 95, 0.15); */
        &:hover {
          border: 1px solid #4ed160;
          /* box-shadow:
            6px 6px 12px 0px rgba(22, 20, 24, 0.5),
            -6px -6px 24px 0px rgba(113, 255, 95, 0.15); */
          background: radial-gradient(
            103.94% 265.37% at 59.95% -118.74%,
            #43f45e 0%,
            #25ab42 100%
          );
        }
        &:active {
          /* box-shadow:
            6px 6px 12px 0px rgba(22, 20, 24, 0.5),
            -6px -6px 24px 0px rgba(113, 255, 95, 0.15); */
          border: 1px solid #399745;
          background: radial-gradient(
            103.94% 265.37% at 59.95% -118.74%,
            #269436 0%,
            #0e6e23 100%
          );
        }
        &.disabled {
          border: 1px solid #384c39;
          .label {
            color: #605e68;
          }
          cursor: not-allowed;
          /* box-shadow:
            6px 6px 12px 0px rgba(22, 20, 24, 0.5),
            -6px -6px 24px 0px rgba(113, 255, 95, 0.15); */
          background: rgba(97, 97, 97, 0.2);
          &:hover,
          &:active {
            /* box-shadow:
              6px 6px 12px 0px rgba(22, 20, 24, 0.5),
              -6px -6px 24px 0px rgba(113, 255, 95, 0.15); */
            background: rgba(97, 97, 97, 0.2);
          }
        }
      `

    case 'invisible':
      return css`
        ${baseStyles}
        background: transparent;
        border: none;
        box-shadow: none;
        border: 1px solid transparent;
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
        &:active {
          border: 1px solid #32293d;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.5) 0%,
            rgba(0, 0, 0, 0.1) 100%
          );
        }
        &.disabled {
          .label {
            color: #605e68;
          }
          cursor: not-allowed;
          border: none;
          background: transparent;

          &:hover,
          &:active {
            border: none;
            background: transparent;
          }
        }
      `

    case 'muted':
      return css`
        ${baseStyles}
        border: 1px solid #2d253b;

        background: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0.5) 0%,
          rgba(0, 0, 0, 0.1) 100%
        );

        /* box-shadow:
          6px 6px 12px 0px rgba(22, 20, 24, 0.5),
          -6px -6px 24px 0px rgba(148, 95, 255, 0.15); */
        .label {
          color: var(--YourLoot-Brand-Medium, #9e90cf);
        }
        &:hover {
          border: 1px solid #453561;
          /* box-shadow:
            6px 6px 12px 0px rgba(22, 20, 24, 0.5),
            -6px -6px 24px 0px rgba(148, 95, 255, 0.15); */
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
        &:active {
          border: 1px solid #5a4386;
          /* box-shadow:
            6px 6px 12px 0px rgba(22, 20, 24, 0.5),
            -6px -6px 24px 0px rgba(148, 95, 255, 0.15); */
          background:
            linear-gradient(
              0deg,
              rgba(154, 103, 255, 0.4) 0%,
              rgba(154, 103, 255, 0.4) 100%
            ),
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.5) 0%,
              rgba(0, 0, 0, 0.1) 100%
            );
        }
        &.disabled {
          .label {
            color: #605e68;
          }
          cursor: not-allowed;
          border: 1px solid #3d364a;
          /* box-shadow:
            6px 6px 12px 0px rgba(22, 20, 24, 0.5),
            -6px -6px 24px 0px rgba(148, 95, 255, 0.15); */
          background: rgba(97, 97, 97, 0.2);

          &:hover,
          &:active {
            /* box-shadow:
              6px 6px 12px 0px rgba(22, 20, 24, 0.5),
              -6px -6px 24px 0px rgba(148, 95, 255, 0.15); */
            background:
              linear-gradient(
                0deg,
                rgba(97, 97, 97, 0.2) 0%,
                rgba(97, 97, 97, 0.2) 100%
              ),
              linear-gradient(
                180deg,
                rgba(0, 0, 0, 0.5) 0%,
                rgba(0, 0, 0, 0.1) 100%
              );
          }
        }
      `

    case 'muted-danger':
      return css`
        ${baseStyles}
        border: 1px solid #3c2929;
        background: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0.5) 0%,
          rgba(0, 0, 0, 0.1) 100%
        );

        /* box-shadow:
          6px 6px 12px 0px rgba(22, 20, 24, 0.5),
          -6px -6px 24px 0px rgba(148, 95, 255, 0.15); */
        .label {
          color: #e34a4a;
        }
        &:hover {
          border: 1px solid #4a2c2c;
          background: #140606;
        }
        &:active {
          border: 1px solid #542c2b;
          background: #200606;
        }
        &.disabled {
          .label {
            color: #605e68;
          }
          cursor: not-allowed;
          border: 1px solid #4c3838;
          background: rgba(97, 97, 97, 0.2);
        }
      `

    case 'default-danger':
      return css`
        ${baseStyles}
        border: 1px solid #703132;
        background: radial-gradient(
          103.94% 265.37% at 59.95% -118.74%,
          #6c1c1c 0%,
          #300707 100%
        );

        /* box-shadow:
      6px 6px 12px 0px rgba(22, 20, 24, 0.5),
      -6px -6px 24px 0px rgba(148, 95, 255, 0.15); */
        .label {
          color: #e34a4a;
        }
        &:hover {
          border: 1px solid #4a2c2c;
          background: #140606;
        }
        &:active {
          border: 1px solid #542c2b;
          background: #200606;
        }
        &.disabled {
          .label {
            color: #605e68;
          }
          cursor: not-allowed;
          border: 1px solid #4c3838;
          background: rgba(97, 97, 97, 0.2);
        }
      `
    case 'invisible-danger':
      return css`
        ${baseStyles}
        border: 1px solid transparent;
        background: transparent;

        /* box-shadow:
      6px 6px 12px 0px rgba(22, 20, 24, 0.5),
      -6px -6px 24px 0px rgba(148, 95, 255, 0.15); */
        .label {
          color: #e34a4a;
        }
        &:hover {
          background: #140606;
        }
        &:active {
          background: #200606;
        }
        &.disabled {
          .label {
            color: #605e68;
          }
          cursor: not-allowed;
          background: rgba(97, 97, 97, 0.2);
        }
      `

    case 'deactivate':
      return css`
        ${baseStyles}
        border: 1px solid #d94244;
        background: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0.5) 0%,
          rgba(0, 0, 0, 0.1) 100%
        );
        /* box-shadow:
          6px 6px 12px 0px rgba(22, 20, 24, 0.5),
          -6px -6px 24px 0px rgba(148, 95, 255, 0.15); */
        outline: 1px solid #d94244;
        outline-offset: -1px;
        border-radius: 15px;
        .label {
          color: #d94244;
        }
        &:hover {
          border: 1px solid #ff5b5d;
          outline: 1px solid #ff5b5d;
          /* box-shadow:
            6px 6px 12px 0px rgba(22, 20, 24, 0.5),
            -6px -6px 24px 0px rgba(148, 95, 255, 0.15); */
          background:
            linear-gradient(
              0deg,
              rgba(217, 66, 68, 0.1) 0%,
              rgba(217, 66, 68, 0.1) 100%
            ),
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.5) 0%,
              rgba(0, 0, 0, 0.1) 100%
            );
        }
        &:active {
          border: 1px solid #b53537;
          outline: 1px solid #b53537;
          /* box-shadow:
            6px 6px 12px 0px rgba(22, 20, 24, 0.5),
            -6px -6px 24px 0px rgba(148, 95, 255, 0.15); */
          background:
            linear-gradient(
              0deg,
              rgba(217, 66, 68, 0.2) 0%,
              rgba(217, 66, 68, 0.2) 100%
            ),
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.5) 0%,
              rgba(0, 0, 0, 0.1) 100%
            );
        }
        &.disabled {
          .label {
            color: #605e68;
          }
          cursor: not-allowed;
          border: 1px solid #3d364a;
          outline: 1px solid #3d364a;
          /* box-shadow:
            6px 6px 12px 0px rgba(22, 20, 24, 0.5),
            -6px -6px 24px 0px rgba(148, 95, 255, 0.15); */
          background:
            linear-gradient(
              0deg,
              rgba(97, 97, 97, 0.2) 0%,
              rgba(97, 97, 97, 0.2) 100%
            ),
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.5) 0%,
              rgba(0, 0, 0, 0.1) 100%
            );

          &:hover,
          &:active {
            /* box-shadow:
              6px 6px 12px 0px rgba(22, 20, 24, 0.5),
              -6px -6px 24px 0px rgba(148, 95, 255, 0.15); */
            background:
              linear-gradient(
                0deg,
                rgba(97, 97, 97, 0.2) 0%,
                rgba(97, 97, 97, 0.2) 100%
              ),
              linear-gradient(
                180deg,
                rgba(0, 0, 0, 0.5) 0%,
                rgba(0, 0, 0, 0.1) 100%
              );
          }
        }
      `

    case 'custom':
      return css`
        ${baseStyles}
      `

    default:
      return css`
        ${baseStyles}
      `
  }
}

export default CustomButton
