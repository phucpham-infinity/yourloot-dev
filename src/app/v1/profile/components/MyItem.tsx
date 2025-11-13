import MyItemIcon from '@/assets/icons/profile/bg/my-item'
import Search from '@/assets/icons/search'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Checkmark from '@/assets/images/promocode/checkmark.svg'

import { FormBuilder } from '@/components/common/form-builder'
import { isMobile } from 'react-device-detect'
import CustomButton from '@/components/common/custom-button'

interface MyItemProps {
  className?: string
}

export default function MyItemTitle({ className }: MyItemProps) {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleSearch = (value: any) => {
    console.log(value)
  }
  return (
    <div
      className={cn(
        'w-full justify-between items-center inline-flex',
        className
      )}
    >
      <div
        className={cn(
          'grow shrink basis-0 h-10 justify-start items-center gap-2.5 lg:gap-5 flex',
          isMobile && 'translate-x-[-10px]'
        )}
      >
        {isMobile ? (
          <img src={Checkmark} alt="Logo" className="w-[60px] h-[60px]" />
        ) : (
          <MyItemIcon className="w-[40px] h-[40px]" />
        )}

        <div className="text-white text-[22px] font-black">
          {t('myItems.title')}
        </div>
      </div>
      <div className="justify-center items-end gap-3 flex pb-2.5">
        <div className="hidden lg:block relative w-full ">
          <FormBuilder
            className="flex-1"
            gap={14}
            fields={[
              {
                name: 'search',
                type: 'text',
                placeholder: t('myItems.search')
              }
            ]}
            onSubmit={handleSearch}
            defaultValues={{
              search: ''
            }}
          />
          <Search className="absolute w-3 h-3 right-[15px] top-[25px]" />
        </div>
        <CustomButton
          onClick={() => {
            navigate('/store')
          }}
          label={t('myItems.shop')}
          className="w-fit gap-2.5"
        />
      </div>
    </div>
  )
}
