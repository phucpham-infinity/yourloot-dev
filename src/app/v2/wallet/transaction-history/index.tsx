import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import StatusFailed from '@/assets/icons/status-failed'
import StatusSuccess from '@/assets/icons/status-success'
import StatusWait from '@/assets/icons/status-wait'
import Loader from '@/components/common/loader'
import { walletsController } from '@/services/controller'
import { useAuthStore, useV2WalletStore } from '@/store'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import TitleGeneralV2 from '../../general/TitleGeneralV2'
import ItemTransaction from './ItemTransaction'

export const TransactionHistory = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  // const [oType, setOType] = useState('')
  const [page, setPage] = useState(0)
  const { userId } = useAuthStore()
  const [data, setData] = useState<any[]>([])
  const { useFetchUserOrderBalanceWallet } = walletsController()
  // const [hasMore, setHasMore] = useState(false)

  const currencyMain = useV2WalletStore((s) => s.currencyMain)
  const walletIdMain = useV2WalletStore((s) => s.walletIdMain)

  const { mutateAsync: fetchUserOrderBalanceWallet, isPending: isLoading } =
    useFetchUserOrderBalanceWallet()

  const { walletId } = useParams<{ walletId: string }>()

  useEffect(() => {
    fetchOrders({
      isNew: true
    })
  }, [walletId])

  const fetchOrders = async ({
    isNew = false,
    orderType
  }: {
    isNew?: boolean
    orderType?: string
  }) => {
    try {
      const nextPage = isNew ? 0 : page + 1
      const type = orderType ?? ''
      // setOType(type)
      setPage(nextPage)

      const result = await fetchUserOrderBalanceWallet({
        userId: userId!,
        walletId: walletIdMain!,
        page: nextPage,
        orderType: type
      })

      const orders = result?.content?.orders?.content ?? []
      const cryptoOrders = result?.content?.cryptoOrders?.content ?? []
      const combined = orders.concat(cryptoOrders)

      setData((prev) => (isNew ? combined : [...prev, ...combined]))

      // const totalPages =
      //   result?.content?.orders?.totalElements !== 0
      //     ? result?.content?.orders?.totalPages
      //     : result?.content?.cryptoOrders?.totalPages
      // setHasMore(nextPage < totalPages)
    } catch (err) {
      console.error('Fetch orders failed:', err)
      setData([])
    } finally {
    }
  }

  return (
    <div className="w-full">
      {/* Mobile header with back button */}
      <div className="inline-flex items-center justify-between w-full md:hidden">
        <TitleGeneralV2
          titleClassName="text-base font-black text-white "
          title={t('wallet.transactionHistory.title')}
          icon={<ArrowLeftIcon className="w-4 h-4" />}
          onClick={() => {
            navigate('/manage-funds')
          }}
        />
      </div>

      {/* Desktop layout based on profile/raw.tsx */}
      <div className="justify-center hidden w-full md:inline-flex">
        <div className="w-[904px] inline-flex flex-col justify-start items-start gap-6 p-6">
          <div className="flex flex-col items-start self-stretch justify-start gap-4">
            <div className="flex flex-col items-start justify-start gap-3">
              <div className="self-stretch justify-start text-white text-app-main-20 font-['Satoshi']">
                {t('wallet.transactionHistory.title')}
              </div>
              <div className="justify-center text-[#9E90CF] text-app-medium-14 font-['Satoshi']">
                Displayed in your wallet currency.
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start self-stretch justify-start">
            {isLoading && data.length === 0 ? (
              <div className="flex items-center justify-center w-full h-32">
                <Loader />
              </div>
            ) : (
              renderDataRecords(data, currencyMain!)
            )}
          </div>
        </div>
      </div>

      {/* Keep the original list rendering for mobile */}
      <div className="md:hidden">
        {isLoading && data.length === 0 ? (
          <div className="flex items-center justify-center h-32">
            <Loader />
          </div>
        ) : (
          renderDataRecords(data, currencyMain!)
        )}
      </div>
    </div>
  )
}
export default TransactionHistory

const renderDataRecords = (data: any[], currency: string) => {
  return data.map((item) => {
    const { status, orderType, createdAt, amount } = item

    const statusIcon =
      status.toLowerCase() === 'succeed' ? (
        <StatusSuccess />
      ) : status.toLowerCase() === 'accepted' ? (
        <StatusWait />
      ) : (
        <StatusFailed />
      )
    return (
      <ItemTransaction
        status={statusIcon}
        orderType={orderType}
        createdAt={createdAt}
        amount={amount || 0}
        currency={currency}
      />
    )
  })
}
