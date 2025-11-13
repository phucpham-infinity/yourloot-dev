import { css } from '@/lib/utils.ts'

const Loader = ({
  className,
  size = 48,
  thin = false
}: {
  className?: string
  size?: number
  thin?: boolean
}) => {
  return (
    <div className={className} css={styles(size, thin)}>
      <span className="loader"></span>
    </div>
  )
}

const styles = (size: number, thin?: boolean) => css`
  width: ${size}px;
  height: ${size}px;
  display: flex;
  align-items: center;
  justify-content: center;
  .loader {
    width: ${size}px;
    height: ${size}px;
    border: ${thin ? '2px' : '3px'} solid #fff;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
export default Loader
