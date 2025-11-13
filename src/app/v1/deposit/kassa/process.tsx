import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Loader from '@/components/common/loader'
import SBPLayout from './layout'
import { useProfileStore } from '@/store/slices/profile'
import { walletsController } from '@/services/controller/wallets'
import { useDepositStore } from '@/store/slices/deposit'
import { useWalletStore } from '@/store/slices/wallet'

const KassaProcess = () => {
  const { walletName } = useParams()
  const navigate = useNavigate()
  const currentWalletAmount = useRef(0)

  const { profile } = useProfileStore()
  const [isDone, setIsDone] = useState(false)

  const setIsSuccess = useDepositStore((s) => s.setIsSuccess)
  const isProcessing = useDepositStore((s) => s.isProcessing)

  const { data: wallet } = walletsController().useGetUserWalletByCurrency({
    userId: profile?.userId!,
    currency: walletName ?? '',
    refetchInterval: isDone ? undefined : 60000
  })
  useEffect(() => {
    if (wallet) {
      if (wallet.amount > currentWalletAmount.current) {
        setIsDone(true)
        setIsSuccess(true)
      }
    }
  }, [wallet])

  useEffect(() => {
    if (isDone) {
      navigate(`/deposit/${walletName}/kassa/done${location.search}`)
    }
  }, [isDone])

  useEffect(() => {
    if (!isProcessing) {
      navigate(`/deposit/${walletName}/kassa${location.search}`)
    }
  }, [])

  useEffect(() => {
    currentWalletAmount.current =
      useWalletStore
        .getState()
        .wallets?.find((wallet) => wallet.currency === walletName)?.amount || 0
  }, [])

  return (
    <SBPLayout hiddenTimer={false} showLeftContent>
      <div>
        <div className={'flex w-full items-start h-[220px]'}>
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

export default KassaProcess
