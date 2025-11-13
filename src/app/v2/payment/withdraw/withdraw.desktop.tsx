import { useEffect } from 'react'
import { useV2WithdrawStore } from '@/store'
import { WalletSelect } from '@/components/v2/payment/wallet-select'
import { WithdrawMethodGrid } from '@/components/v2/payment/withdraw-method-grid'
import { WithdrawV2Method } from '@/store/slices/v2/withdraw.store'
import { useWithdraw } from './withdraw.hook'

export const WithdrawDesktop = () => {
  const { methods, defaultWalletCurrency } = useWithdraw()
  const selectedMethod = useV2WithdrawStore((s) => s.selectedMethod)
  const setSelectedMethod = useV2WithdrawStore((s) => s.setSelectedMethod)
  const setIsOpenInputInfo = useV2WithdrawStore((s) => s.setIsOpenInputInfo)

  const setDefaultMethod = () => {
    const id = methods.find((method) => method.isActive)?.id as WithdrawV2Method
    setSelectedMethod(id)
    setIsOpenInputInfo(true, id)
  }

  useEffect(() => {
    setDefaultMethod()
  }, [defaultWalletCurrency])

  useEffect(() => {
    if (!selectedMethod) {
      setDefaultMethod()
    }
  }, [])

  return (
    <div className="text-white w-[904px] h-full py-[24px] mx-auto ">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <div className="text-app-main-20">Withdraw</div>
          <div className="text-app-medium-14 text-[#9E90CF]">
            Withdraw methods depend on your wallet currency.
          </div>
        </div>
        <WalletSelect />
      </div>
      <div className="flex flex-row flex-1 mt-6 h-[calc(100vh-200px)] min-h-[calc(100vh-200px)]">
        <div className="flex-1 p-6 border border-app-default rounded-tl-[10px] rounded-bl-[10px] border-r-0!">
          <WithdrawMethodGrid methods={methods} />
        </div>
        <div
          style={{
            borderRadius: '0 10px 10px 0',
            background:
              'radial-gradient(237.29% 116.82% at 60.95% -22.92%, #362C5A 0%, #181526 100%), #1D1B28'
          }}
          className="flex-1 border border-app-default border-l-0! p-6"
        ></div>
      </div>
    </div>
  )
}
