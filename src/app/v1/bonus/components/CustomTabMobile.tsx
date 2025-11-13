import { TabsCommon } from '@/components/common/ui/TabCommon'
import AllIcon from '@/assets/icons/bonus/all.svg'
import AvailableIcon from '@/assets/icons/bonus/checkmark.svg'
import LoyaltyIcon from '@/assets/icons/bonus/loyalty.svg'
import PromotionIcon from '@/assets/icons/bonus/sale.svg'
import TournamentIcon from '@/assets/icons/bonus/trophy.svg'
import IconBtn from '@/components/common/icon-button'
import { ActiveTabType } from '@/store/slices/bonus'
import { useState } from 'react'
import CustomButton from '@/components/common/custom-button'
import { css } from '@/lib/utils'

interface ICustomTabMobile {
  activeTab: ActiveTabType
  setActiveTab: (value: ActiveTabType) => void
}
const CustomTabMobile = ({ activeTab, setActiveTab }: ICustomTabMobile) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex justify-between items-center">
        <TabsCommon
          listTabs={listTabs?.slice(0, 3)}
          setTab={setActiveTab}
          tab={activeTab}
          classNameTrigger="w-full"
        />
        <IconBtn
          icon={
            <div className="w-[2px] h-fit gap-[3px] flex flex-col">
              <div className="w-[2px] h-[2px] bg-white rounded-full" />
              <div className="w-[2px] h-[2px] bg-white rounded-full" />
              <div className="w-[2px] h-[2px] bg-white rounded-full" />
            </div>
          }
          onClick={() => {
            setIsOpen(!isOpen)
          }}
        />
      </div>

      {isOpen && (
        <div
          className="w-full transition-all duration-300 ease-in-out border-app-default h-full grid grid-cols-2 gap-2.5 p-5 rounded-[20px] mt-[20px]"
          css={styles}
        >
          {listTabs?.slice(1, 6).map((item) => (
            <CustomButton
              label={item.label}
              variant="muted"
              prefixIcon={item.icon}
              className="w-full h-[40px] text-xs font-medium"
              onClick={() => {
                setActiveTab(item.value as ActiveTabType)
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomTabMobile

const styles = css`
  background: linear-gradient(
    180deg,
    rgba(64, 53, 85, 0.2) 0%,
    rgba(0, 0, 0, 0.1) 100%
  );
  box-shadow: 6px 6px 16px 0px rgba(22, 28, 22, 0.25);
`

const listTabs = [
  {
    label: 'All',
    value: 'all',
    icon: <img src={AllIcon} alt="Logo" className="w-[12px]" />,
    idx: 0
  },
  {
    label: 'Available',
    value: 'available',
    icon: <img src={AvailableIcon} alt="Logo" className="w-[12px]" />,
    idx: 1
  },
  {
    label: 'Tournament',
    value: 'tournament',
    icon: <img src={TournamentIcon} alt="Logo" className="w-[12px]" />,
    idx: 2
  },
  {
    label: 'Loyalty',
    value: 'loyalty',
    icon: <img src={LoyaltyIcon} alt="Logo" className="w-[12px]" />,
    idx: 3
  },
  {
    label: 'Promotion',
    value: 'promotion',
    icon: <img src={PromotionIcon} alt="Logo" className="w-[12px]" />,
    idx: 4
  }
]
