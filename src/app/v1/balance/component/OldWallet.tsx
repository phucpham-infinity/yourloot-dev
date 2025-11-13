import BalanceInfo from '@/app/v1/balance/component/BalanceInfo'
import Path1 from '@/assets/images/wallet/path2-1.svg'
import Path2 from '@/assets/images/wallet/path2-2.svg'
// import { css } from '@/lib/utils.ts'
import { useTranslation } from 'react-i18next'
import Loader from '@/components/common/loader'
import IconWidthShadow from '@/components/common/ui/IconWidthShadow.tsx'

interface PropsData {
  mainWallet: any
  oldWallets: any[]
  isLoading: boolean
}

const renderBalanceInfos = (oldWallets: any[], mainWallet: any) => {
  return oldWallets.map((item: any, index: number) => {
    // if (index > 6) return ''

    const className = `item${index + 1}`
    return (
      <BalanceInfo
        key={index}
        className={className}
        data={item}
        mainWallet={mainWallet}
      />
    )
  })
}

export default function OldWallet(props: PropsData) {
  const { oldWallets = [], isLoading = false, mainWallet } = props

  const { t } = useTranslation()
  return (
    <div className="relative w-full">
      <div className="inline-flex justify-between items-center pt-5 pb-5 mx-auto">
        <div className="justify-start items-center gap-1 lg:gap-5 flex">
          <div data-svg-wrapper className="relative pb-2 pr-[-5px]">
            <IconWidthShadow
              icon={Path1}
              iconShadow={Path2}
              iconShadowStyle={{
                position: 'absolute',
                left: '50%',
                top: '61%',
                transform: `translate(-50%, -50%) scale(1.6)`,
                zIndex: 0
              }}
            />
          </div>
          <div className="text-white text-2xl font-black font-['Satoshi']">
            {t('balance.oldWallets.title')}
          </div>
        </div>
      </div>
      <div className="w-full relative pt-3">
        {isLoading ? (
          <Loader />
        ) : oldWallets.length > 0 ? (
          <div>
            <div className="relative w-full mx-auto items-center gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {renderBalanceInfos(oldWallets?.slice(0, 4), mainWallet)}
            </div>
            <div className="relative w-full mx-auto items-center gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {renderBalanceInfos(oldWallets?.slice(4), mainWallet)}
            </div>
          </div>
        ) : (
          <div className="text-white text-center">
            {t('balance.oldWallets.noWallets')}
          </div>
        )}
      </div>
    </div>
  )
}
