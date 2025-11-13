import { WalletSelect } from '@/components/v2/payment/wallet-select'
import { DepositMethodGrid } from '@/components/v2/payment/deposit-method-grid'
import { DepositRightContent } from '@/components/v2/payment/deposit-right-content'
import { useDeposit } from './deposit.hook'

export const DepositDesktop = () => {
  const { methods } = useDeposit()

  return (
    <div className="text-white w-[904px] h-full py-[24px] mx-auto ">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <div className="text-app-main-20">Deposit</div>
          <div className="text-app-medium-14 text-[#9E90CF]">
            Deposit methods depend on your wallet currency.
          </div>
        </div>
        <WalletSelect />
      </div>
      <div className="flex flex-row flex-1 mt-6 h-[calc(100vh-200px)] min-h-[calc(100vh-200px)]">
        <div className="flex-1 p-6 border border-app-default rounded-tl-[10px] rounded-bl-[10px] border-r-0!">
          <DepositMethodGrid methods={methods} />
        </div>
        <div
          style={{
            borderRadius: '0 10px 10px 0',
            background:
              'radial-gradient(237.29% 116.82% at 60.95% -22.92%, #362C5A 0%, #181526 100%), #1D1B28'
          }}
          className="flex-1 border border-app-default border-l-0! p-6"
        >
          <DepositRightContent />
        </div>
      </div>
    </div>
  )
}
