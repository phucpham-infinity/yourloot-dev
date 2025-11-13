import addGreen from '@/assets/icons/home/bg/add-green.svg'
import DepositIcon from '@/assets/icons/home/deposit'
import { cn, css } from '@/lib/utils'
import { useWalletStore } from '@/store/slices/wallet'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
interface Props {
  className?: string
}

export default function Deposit({ className }: Props) {
  const { t } = useTranslation()
  const walletDefault = useWalletStore((state) =>
    state.wallets.find((e) => e.isDefault)
  )
  const navigate = useNavigate()
  return (
    <div
      css={styles()}
      className={cn(
        'relative h-full cursor-pointer w-full p-5 border-app-default rounded-[20px] justify-between items-center inline-flex overflow-hidden',
        className
      )}
      onClick={() => {
        navigate(
          `/deposit/${walletDefault?.currency}/cryptocurrency${location.search}`
        )
      }}
    >
      <img
        src={addGreen}
        className="fourth-step absolute right-0 top-0 h-full w-full"
      />
      <div className="h-[34px] flex-col justify-start items-start gap-5 inline-flex">
        <div className="h-[34px] flex-col justify-start items-start gap-2.5 inline-flex">
          <div className="text-white text-xl font-black leading-5 ">
            {t('deposit.title')}
          </div>
          <div className="text-[#c5c0d7] text-xs font-medium leading-3">
            {t('deposit.betterInCrypto')}
          </div>
        </div>
      </div>
      <DepositIcon className="absolute right-[10px] bottom-[3px]" />
    </div>
  )
}

const styles = () => {
  return css`
    background: radial-gradient(
      237.29% 116.82% at 60.95% -22.92%,
      #362c5a 0%,
      #181526 100%
    );
  `
}
