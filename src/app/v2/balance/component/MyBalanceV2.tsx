import TitleGeneralV2 from '@/app/v2/general/TitleGeneralV2'
import { getWalletIcon } from '@/app/v2/new-wallet/common'
import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import Bonus2Icon from '@/assets/icons/v2/bonus2'
import Loader from '@/components/common/loader'
import { css } from '@/lib/utils.ts'
import { useV2WalletStore } from '@/store'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useBalanceManager } from '../hooks/useBalanceManager'
import LootCard from './LootCard'
import WalletCard from './WalletCard'

interface PropsData {
  mainWallet: any
  bonusWallet: any
  yourLoot: any
  isLoading: boolean
}
export default function MyBalanceV2(props: PropsData) {
  const {
    mainWallet = { amount: 0, currency: 'RUB', sign: '₽', id: ' ' },
    bonusWallet = { amount: 0, currency: 'RUB', sign: '₽', id: ' ' },
    yourLoot,
    isLoading = false
  } = props

  const navigate = useNavigate()
  const { t } = useTranslation()

  const setCurrencyMain = useV2WalletStore((s) => s.setCurrencyMain)
  const setWalletIdMain = useV2WalletStore((s) => s.setWalletIdMain)

  const { activeBalance, handleUpdateActiveBalance } = useBalanceManager()

  const handleHistoryClick = (wallet: typeof mainWallet) => {
    setCurrencyMain(wallet?.currency)
    setWalletIdMain(wallet?.id)
    navigate(`/wallet/transaction-history/${wallet?.id}`)
  }

  return (
    <div>
      <div className="inline-flex items-center justify-between w-full md:hidden">
        <TitleGeneralV2
          titleClassName="text-base font-black text-white "
          title={t('balance.manageFunds', 'Manage Funds')}
          icon={<ArrowLeftIcon className="w-4 h-4" />}
          onClick={() => {
            navigate('/')
          }}
        />
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="relative inline-flex items-start justify-between w-full max-md:flex-col">
          <div
            className={
              'relative w-1/2 max-md:w-full pt-8 flex-col justify-between items-center gap-5 md:w-full md:pt-0'
            }
          >
            <div className="relative flex-col items-center justify-center w-full mb-6 ">
              <div className="text-white text-v2-app-medium-16 font-['Satoshi'] pb-4 md:hidden">
                {t('balance.primaryWallet', 'Primary Wallet')}
              </div>
              {/* Desktop wrapper with header */}
              <div className="w-full justify-center flex-col rounded-[10px] bg-[#181624] md:border-[#433854] items-center md:rounded-[10px] md:border-0 md:p-4   md:bg-transparent md:outline md:outline-offset-[-1px] md:outline-[#322a3e]">
                {/* Desktop header inside block */}
                <div className="items-center justify-start hidden h-4 gap-2 mb-4 md:flex">
                  <div className="justify-center text-white text-v2-app-medium-16 font-['Satoshi']">
                    {t('balance.primaryWallet', 'Primary Wallet')}
                  </div>
                </div>

                {/* Desktop card */}
                <div className="hidden md:block">
                  <WalletCard
                    wallet={mainWallet}
                    walletType="primary"
                    icon={getWalletIcon(mainWallet?.currency || '', {
                      className: 'w-[16px] h-[16px]'
                    })}
                    isActive={!activeBalance}
                    showHistoryButton={true}
                    onActivate={handleUpdateActiveBalance}
                    onHistoryClick={() => handleHistoryClick(mainWallet)}
                    isMobile={false}
                  />
                </div>

                {/* Mobile card */}
                <div className="md:hidden">
                  <WalletCard
                    wallet={mainWallet}
                    walletType="primary"
                    icon={getWalletIcon(mainWallet?.currency || '', {
                      className: 'w-[16px] h-[16px]'
                    })}
                    isActive={!activeBalance}
                    showHistoryButton={true}
                    onActivate={handleUpdateActiveBalance}
                    onHistoryClick={() => handleHistoryClick(mainWallet)}
                    isMobile={true}
                  />
                </div>
              </div>
            </div>
            <div className="relative flex-col items-center justify-center w-full mb-3">
              {/* Additional Funds header: mobile simple text, desktop merged block */}
              <div className="text-white text-v2-app-medium-16 font-['Satoshi'] pb-4 md:hidden">
                {t('balance.additionalFunds', 'Additional Funds')}
              </div>

              {/* Desktop: single merged block with two cards stacked */}
              <div className="hidden md:flex w-full justify-center flex-col rounded-[10px] p-4  md:bg-transparent md:outline md:outline-offset-[-1px] md:outline-[#322a3e]">
                <div className="flex items-center justify-start h-4 gap-2">
                  <div className="justify-center text-white text-v2-app-medium-16 font-['Satoshi']">
                    {t('balance.additionalFunds', 'Additional Funds')}
                  </div>
                </div>
                <div className="flex flex-col w-full gap-2 mt-4">
                  {/* Bonus Balance card (desktop) */}
                  <WalletCard
                    wallet={bonusWallet}
                    walletType="bonus"
                    icon={<Bonus2Icon className="!w-[16px] !h-[16px]" />}
                    // @ts-ignore
                    isActive={activeBalance}
                    showHistoryButton={false}
                    onActivate={handleUpdateActiveBalance}
                    isMobile={false}
                  />

                  {/* Your Loot card (desktop) */}
                  <LootCard amount={yourLoot} isMobile={false} />
                </div>
              </div>

              {/* Mobile: keep original two cards layout */}
              <div className="inline-flex items-center justify-between w-full gap-2 md:hidden max-md:flex-col">
                <div className="md:w-1/2 max-md:w-full">
                  {/* Bonus wallet mobile wrapper */}
                  <div
                    className="w-full flex-col max-md:flex-col rounded-[10px] bg-[#181624] md:border-[#403b4a] items-cente md:border-0 md:p-4 md:bg-[#191524] md:outline-[#433854]"
                    css={bonusBalanceCss()}
                  >
                    <WalletCard
                      wallet={bonusWallet}
                      walletType="bonus"
                      icon={getWalletIcon(bonusWallet?.currency || '', {
                        className: 'w-[16px] h-[16px]'
                      })}
                      // @ts-ignore
                      isActive={activeBalance}
                      showHistoryButton={false}
                      onActivate={handleUpdateActiveBalance}
                      isMobile={true}
                    />
                  </div>
                </div>
                <div className="md:w-1/2 max-md:w-full">
                  {/* Loot card mobile */}
                  <LootCard amount={yourLoot} isMobile={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const bonusBalanceCss = () => {
  return css`
    // background-image: linear-gradient(340deg, #213453 15%, #2c254a 80%);
  `
}
