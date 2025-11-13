import ProgressBar from '@/app/v1/achievement/component/ProgressBar'
// import CustomButton from '@/components/common/custom-button'
import { cn, css } from '@/lib/utils'

interface CategoryProps {
  iconLeft: React.ReactNode
  title: string
  textBtn: string
  labelProcess: string
  partProcess: string
  percentProcess: number
  onClick: () => void
  className?: string
  maxWidthProgressBar?: number
}

const Category = ({
  className,
  title,
  iconLeft,
  labelProcess,
  // onClick = () => {},
  percentProcess,
  partProcess,
  // textBtn,
  maxWidthProgressBar = 170
}: CategoryProps) => {
  return (
    <div
      css={styles}
      className={cn(
        'w-full h-full p-5 relative flex justify-start gap-5 flex-col border-app-default rounded-[15px]',
        className
      )}
    >
      <div className="flex flex-col gap-3">
        <div className="relative flex justify-between items-center  w-full">
          {iconLeft && iconLeft}
          {/* <CustomButton
          variant="CTA"
          textAlign="center"
          label={textBtn}
          className="w-[90px] h-[40px] text-xs font-medium !text-white whitespace-nowrap"
          onClick={onClick}
        /> */}
        </div>

        <div className="text-white text-xl font-black leading-6 text-ellipsis overflow-hidden line-clamp-2">
          {title}
        </div>
        {/* <div className="text-[#c5c0d7] text-xs leading-3 font-medium"> */}
        {/*{des}*/}
        {/* </div> */}
      </div>

      <div className="absolute bottom-5  w-[calc(100%_-_40px)] flex-col justify-end items-start gap-5 inline-flex">
        <div className="h-[66px] w-full flex-col justify-start items-center gap-[7px] inline-flex">
          <div className="h-1.5 mb-1 w-full justify-between items-center inline-flex">
            <div className="text-[#c5c0d8] text-xs font-medium">
              {labelProcess}
            </div>
            <div className="text-[#c5c0d8] text-xs font-medium">
              {partProcess}
            </div>
          </div>

          <ProgressBar
            percentage={percentProcess}
            maxWidth={maxWidthProgressBar}
          />
        </div>
      </div>
    </div>
  )
}

export default Category

const styles = css`
  background: radial-gradient(
    237.29% 116.82% at 60.95% -22.92%,
    #362c5a 0%,
    #181526 100%
  );
`
