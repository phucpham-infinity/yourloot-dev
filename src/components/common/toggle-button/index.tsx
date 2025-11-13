import { useToggle } from 'ahooks'
import { css } from '@emotion/react'
import EllipseIcon from '@/assets/icons/ellipse'

interface ToggleButtonProps {
  className?: string
  style?: React.CSSProperties
  checked?: boolean
  onChange?: (checked: boolean) => void
}
export default function ToggleButton(props: ToggleButtonProps) {
  const { className, style, checked, onChange } = props
  const [state, { set }] = useToggle(false)
  const isControlled = typeof checked === 'boolean'
  const visualChecked = isControlled ? (checked as boolean) : state

  return (
    <div
      css={cssFn(visualChecked)}
      className={className}
      onClick={() => {
        const next = !visualChecked
        onChange?.(next)
        if (!isControlled) {
          set(next)
        }
      }}
      style={style}
    >
      <EllipseIcon className="ellipse absolute top-50% " />
    </div>
  )
}

const cssFn = (checked?: boolean) => {
  const baseStyles = css`
    position: relative;
    display: flex;
    width: 34px;
    height: 20px;
    padding: 4px;
    align-items: center;
    flex-shrink: 0;
    border-radius: 15px;
    cursor: pointer;

    .ellipse {
      transition: all 0.3s ease;
    }
  `

  if (!checked) {
    const ellipseStyles = css`
      fill: var(--YourLoot-Gray, #605e68);
      left: 4px;
    `
    return css`
      ${baseStyles}
      .ellipse {
        ${ellipseStyles}
      }
      border: 1px solid #6a6294;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.5) 0%,
        rgba(0, 0, 0, 0.1) 100%
      );
      box-shadow:
        6px 6px 12px 0px rgba(22, 20, 24, 0.5),
        -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
      &:hover {
        border: 1px solid #41325f;
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
        box-shadow:
          6px 6px 12px 0px rgba(22, 20, 24, 0.5),
          -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
      }
      &:active {
        .ellipse {
          fill: var(--YourLoot-Brand-Medium, #ffffff);
        }
        border: 1px solid #32264c;
        background:
          linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%),
          linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.5) 0%,
            rgba(0, 0, 0, 0.1) 100%
          ),
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
        box-shadow:
          6px 6px 12px 0px rgba(22, 20, 24, 0.5),
          -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
      }
    `
  } else {
    const ellipseStyles = css`
      left: 16px;
    `
    return css`
      ${baseStyles}
      .ellipse {
        fill: var(--YourLoot-Brand-Light, #d9ceff);
        ${ellipseStyles}
      }
      border: 1px solid #5a4796;
      background: radial-gradient(
        103.94% 265.37% at 59.95% -118.74%,
        #654ec8 0%,
        #372864 100%
      );
      box-shadow:
        6px 6px 12px 0px rgba(22, 20, 24, 0.5),
        -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
      &:hover {
        border: 1px solid #634ba3;
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
        box-shadow:
          6px 6px 12px 0px rgba(22, 20, 24, 0.5),
          -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
      }
      &:active {
        border: 1px solid #4d3c7f;
        background:
          linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%),
          radial-gradient(
            103.94% 265.37% at 59.95% -118.74%,
            #654ec8 0%,
            #372864 100%
          );
        box-shadow:
          6px 6px 12px 0px rgba(22, 20, 24, 0.5),
          -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
      }
    `
  }
}
