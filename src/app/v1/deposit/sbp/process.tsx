import Loader from '@/components/common/loader'
import SBPLayout from './layout'

const SBPProcess = () => {
  return (
    <SBPLayout hiddenTimer={false} showLeftContent>
      <div>
        <div className={'flex w-full items-start h-[120px]'}>
          <Loader />
        </div>
        <div className="text-white text-xl font-black">Please wait</div>
        <div className="w-[270] text-[#c5c0d8] text-xs font-medium">
          System is working with your payment, it will take no more than couple
          of minutes
        </div>
      </div>
    </SBPLayout>
  )
}

export default SBPProcess
