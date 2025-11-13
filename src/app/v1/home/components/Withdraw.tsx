import addpink from '@/assets/icons/home/bg/addpink.svg'
import WithdrawIcon from '@/assets/icons/home/withdraw'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

interface Props {
  className?: string
}

export default function WithDraw({ className }: Props) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <div
      className={cn(
        'relative w-full h-full p-5 bg-home-withdraw rounded-[20px] border-app-default justify-between items-center gap-0 inline-flex overflow-hidden cursor-pointer',
        className
      )}
      onClick={() => {
        navigate(`/withdraw/RUB/sbp`, {
          state: {
            closeBack: location.pathname
          }
        })
      }}
    >
      <img src={addpink} className="absolute right-0 top-0 w-full h-full" />
      <div className="h-[34px] flex-col justify-start items-start gap-2.5 inline-flex">
        <div className="text-white text-xl font-black leading-5">
          {t('withdraw.title')}
        </div>
        <div className="text-[#c5c0d7] text-xs font-medium leading-3">
          {t('withdraw.description')}
        </div>
      </div>
      <WithdrawIcon className="absolute right-[10px] bottom-[3px]" />
    </div>
  )
}
