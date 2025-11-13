import { isMobile } from 'react-device-detect'
import { cn } from '@/lib/utils'
import { lazy } from 'react'

import { FormBuilder } from '@/components/common/form-builder'
const CustomButton = lazy(() => import('@/components/common/custom-button'))

import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import StoreIcon from '@/assets/images/store/storeIcon.svg'
import WishlistIcon from '@/assets/images/store/wishlist.svg'
import Search from '@/assets/icons/search'
import { useNavigate } from 'react-router-dom'
interface StoreHeaderProps {
  className?: string
  sections?: 'store' | 'wishlist'
  setSections?: (sections: 'store' | 'wishlist') => void
}

export default function StoreHeader({
  className,
  sections = 'store',
  setSections = () => {}
}: StoreHeaderProps) {
  const navigate = useNavigate()
  const handleSearch = (value: any) => {
    console.log(value)
  }
  return (
    <div
      className={cn(
        'w-full justify-between items-start lg:items-center flex flex-col lg:flex-row gap-2.5',
        className
      )}
    >
      <div className="grow shrink basis-0 h-10 justify-start items-center gap-5 flex">
        <img
          src={sections === 'store' ? StoreIcon : WishlistIcon}
          className="  w-[40px] h-[40px]"
        />
        <div className="text-white text-[22px] font-black font-['Satoshi']">
          {sections === 'store' ? 'Store' : 'My Wishlist'}
        </div>
      </div>
      <div className="flex-row items-end gap-2.5 inline-flex ">
        <CustomButton
          label={isMobile ? '' : 'Back'}
          variant="muted"
          onClick={() => {
            if (sections === 'wishlist') {
              setSections('store')
            } else {
              navigate(-1)
            }
          }}
          prefixIcon={<ArrowLeftIcon />}
          className="w-fit text-xs  font-medium py-5 !bg-[#0a090f] gap-2.5"
        />

        <div className="relative w-full ">
          <FormBuilder
            className="flex-1"
            gap={14}
            fields={[
              {
                name: 'search',
                type: 'text',
                placeholder: 'Search'
              }
            ]}
            onSubmit={handleSearch}
            defaultValues={{
              search: ''
            }}
          />
          <Search className="absolute w-3 h-3 right-[15px] top-[25px]" />
        </div>

        {sections === 'store' && (
          <CustomButton
            label="Exchange"
            onClick={() =>
              navigate(`/exchange?close-back=${location.pathname}`)
            }
            className="w-fit text-xs font-medium !py-4 !bg-[#0a090f]"
          />
        )}
        <CustomButton
          onClick={() => setSections('wishlist')}
          label="Wishlist"
          className="w-fit text-xs font-medium !py-4 !bg-[#0a090f]"
        />
      </div>
    </div>
  )
}
