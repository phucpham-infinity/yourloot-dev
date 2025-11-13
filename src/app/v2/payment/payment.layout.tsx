import Info from '@/assets/icons/info'
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger
} from '@/components/animate-ui/components/tabs'
import WalletBalancer from '@/components/v2/payment/wallet-balancer'
import { useScreen } from '@/hooks'
import { userController, walletsController } from '@/services/controller'
import { useAuthStore } from '@/store'
import { css } from '@emotion/react'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useLocation, useNavigate } from 'react-router'

export const PaymentLayout = () => {
  const { isMobile } = useScreen()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { t } = useTranslation()

  const [activeTab, setActiveTab] = useState(
    pathname?.includes('payment/withdraw') ? 'withdraw' : 'deposit'
  )
  const { useGetUserProfile } = userController()
  const { useGetUserWallets } = walletsController()

  const { userId } = useAuthStore()
  const { refetch } = useGetUserProfile(userId)
  useGetUserWallets(userId ?? '')

  useEffect(() => {
    refetch()
  }, [])

  const handleChangeTab = (value: string) => {
    setActiveTab(value)
    if (value === 'deposit') {
      navigate('/payment/deposit')
    } else if (value === 'withdraw') {
      navigate('/payment/withdraw')
    } else if (value === 'history') {
      navigate('/payment/history')
    }
  }

  useEffect(() => {
    if (pathname.includes('/history')) {
      setActiveTab('history')
    } else if (pathname.includes('/deposit')) {
      setActiveTab('deposit')
    } else if (pathname.includes('/withdraw')) {
      setActiveTab('withdraw')
    }
  }, [pathname])

  return (
    <div
      id="payment-deposit-v2"
      css={styles}
      className={clsx({
        relative: true,
        'w-full flex flex-col  text-white bg-[#040305]': isMobile,
        'w-[512px] flex flex-col  text-white mx-auto ': !isMobile
      })}
    >
      {!isMobile && (
        <div className="flex flex-col w-full gap-2">
          <div className="pb-6 text-app-main-20">
            {t('wallet.title', 'Wallet')}
          </div>
        </div>
      )}
      <Tabs
        value={activeTab}
        className="flex flex-col w-full gap-2"
        onValueChange={handleChangeTab}
      >
        <TabsList
          activeClassName="text-white! h-[30px] shadow-none rounded-[10px] bg-[radial-gradient(103.94%_265.37%_at_59.95%_-118.74%,_#654EC8_0%,_#372864_100%)]"
          className="w-full h-[38px] bg-[#1D1730]"
        >
          <TabsTrigger
            value="deposit"
            className="text-white! h-[31px] rounded-[10px]"
          >
            {t('deposit.title')}
          </TabsTrigger>
          <TabsTrigger
            value="withdraw"
            className="text-white! h-[31px] rounded-[10px]"
          >
            {t('withdraw.title')}
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="text-white! h-[31px] rounded-[10px]"
          >
            {t('payment.history', 'History')}
          </TabsTrigger>
        </TabsList>
        {['deposit', 'withdraw'].includes(activeTab) && (
          <div className="flex flex-row items-center justify-between p-4 bg-[#191524] rounded-[10px]">
            <div className="flex items-center flex-1 gap-2">
              <div>
                <Info />
              </div>
              <div className="text-app-medium-12 text-[#9E90CF]">
                {activeTab === 'deposit'
                  ? t(
                      'payment.depositMethodsInfo',
                      'Deposit methods depend on your wallet currency.'
                    )
                  : t(
                      'payment.withdrawMethodsInfo',
                      'Withdraw methods depend on your wallet currency.'
                    )}
              </div>
            </div>
            <div className="w-[24px] min-w-[24px]"></div>
            <WalletBalancer className="w-fit" />
          </div>
        )}
        <TabsContents>
          <TabsContent value="deposit">
            <Outlet />
          </TabsContent>
          <TabsContent
            className={clsx(!isMobile && 'min-h-[50vh]')}
            value="withdraw"
          >
            <Outlet />
          </TabsContent>
          <TabsContent value="history">
            <Outlet />
          </TabsContent>
        </TabsContents>
      </Tabs>
    </div>
  )
}
const styles = css`
  .warning-alert {
    border-radius: 10px;
    border: 1px solid #e3b075;
    background: #0b0a11;
  }
`
