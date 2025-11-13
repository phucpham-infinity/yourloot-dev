import CustomButton from '@/components/common/custom-button'
import { cn } from '@/lib/utils'
import clsx from 'clsx'

export type ProfileTabKey = string

interface ProfileTabsProps {
  tabs: readonly ProfileTabKey[]
  activeTab: ProfileTabKey
  onChange: (tab: ProfileTabKey) => void
  className?: string
}

const ProfileTabs = ({
  tabs,
  activeTab,
  onChange,
  className
}: ProfileTabsProps) => {
  return (
    <div className={cn('px-5.5 md:px-0', className)}>
      <div className="w-full  bg-[#1d1730] rounded-xl inline-flex justify-start items-center gap-1 md:bg-transparent md:w-fit md:p-0 ">
        {tabs.map((tab) => {
          const isActive = activeTab === tab
          return (
            <CustomButton
              key={tab}
              onClick={() => onChange(tab)}
              data-active={isActive}
              variant={isActive ? 'default' : 'invisible'}
              className={clsx(
                'flex-1 md:flex-none  md:w-auto rounded-[10px] overflow-hidden select-none  !h-min-[34px] !p-3 w-[88px] !border-0 ',
                !isActive &&
                  [
                    'md:shadow-[-6px_-6px_24px_0px_rgba(148,95,255,0.15)]',
                    'md:shadow-[6px_6px_12px_0px_rgba(22,20,24,0.50)]'
                  ].join(' ')
              )}
              label={
                <span
                  className={clsx(
                    'text-v2-app-medium-14',
                    isActive ? 'text-white' : 'text-[#C5C0D8]'
                  )}
                >
                  {tab}
                </span>
              }
            />
          )
        })}
      </div>
    </div>
  )
}

export default ProfileTabs
