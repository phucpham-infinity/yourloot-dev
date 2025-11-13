import { cn } from '@/lib/utils'

export type TabKey = 'All' | 'Read' | 'Unread'

interface TabsProps {
  tabs: readonly TabKey[]
  activeTab: TabKey
  onChange: (tab: TabKey) => void
}

const Tabs = ({ tabs, activeTab, onChange }: TabsProps) => {
  return (
    <div className="px-5.5 md:px-0">
      <div className="w-full p-0.5 bg-[#1d1730] rounded-xl inline-flex justify-start items-center gap-1 md:bg-transparent md:w-fit md:p-0 ">
        {tabs.map((tab) => {
          const isActive = activeTab === tab
          return (
            <button
              key={tab}
              onClick={() => onChange(tab)}
              data-active={isActive}
              className={cn(
                'flex-1 md:flex-none p-3 rounded-[10px] inline-flex flex-col justify-center items-center gap-2 overflow-hidden select-none h-[34px] rounded-[10px]',
                isActive
                  ? [
                      'bg-[radial-gradient(103.94%_265.37%_at_59.95%_-118.74%,#654ec8_0%,#372864_100%)]',
                      'hover:bg-[linear-gradient(0deg,rgba(154,103,255,0.2)_0%,rgba(154,103,255,0.2)_100%),radial-gradient(103.94%_265.37%_at_59.95%_-118.74%,#654ec8_0%,#372864_100%)]',
                      'active:bg-[linear-gradient(0deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.2)_100%),radial-gradient(103.94%_265.37%_at_59.95%_-118.74%,#654ec8_0%,#372864_100%)]'
                    ].join(' ')
                  : [
                      'md:shadow-[-6px_-6px_24px_0px_rgba(148,95,255,0.15)]',
                      'md:shadow-[6px_6px_12px_0px_rgba(22,20,24,0.50)]'
                    ].join(' ')
              )}
            >
              <span
                className={cn(
                  "text-sm font-medium font-['Satoshi']",
                  isActive ? 'text-white' : 'text-slate-300'
                )}
              >
                {tab}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Tabs
