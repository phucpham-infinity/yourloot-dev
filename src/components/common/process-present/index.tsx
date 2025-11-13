import { css } from '@/lib/utils'
import clsx from 'clsx'

interface IProcessPresentProps {
  className?: string

  style?: React.CSSProperties
  persent: number
}
export default function ProcessPresent(props: IProcessPresentProps) {
  const { className, style, persent } = props

  return (
    <div
      className={clsx('border-app-default', className)}
      css={styled}
      style={style}
    >
      {persent > 0 && (
        <div
          style={{ width: `${persent}%`, height: '30px' }}
          className="process border-app-default"
        ></div>
      )}
      <div className="persent-text">{persent} %</div>
    </div>
  )
}

const styled = css`
  position: relative;
  width: 100%;
  height: 40px;
  border-radius: 15px;
  /* border: 1px solid #c3a2f1; */
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.1) 100%
  );
  box-shadow:
    6px 6px 12px 0px rgba(22, 20, 24, 0.5),
    -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
  display: flex;
  align-items: center;
  padding: 6px;
  .persent-text {
    position: absolute;
    color: white;
    left: 50%;
    top: 50%;
    width: max-content;
    font-size: 12px;
    transform: translateX(-50%) translateY(-50%);
  }
  .process {
    border-radius: 10px;
    /* border: 1px solid #c3a2f1; */
    background: radial-gradient(
      103.94% 265.37% at 59.95% -118.74%,
      #654ec8 0%,
      #372864 100%
    );
    box-shadow:
      6px 6px 12px 0px rgba(22, 20, 24, 0.5),
      -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
  }
`
