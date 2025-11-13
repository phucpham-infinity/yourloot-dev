import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useHomeStore } from '@/store/slices/home'
import { useSearchParams } from 'react-router-dom'

interface ITabItem {
  label: string
  value: string
  icon?: React.ReactNode
}

interface ITabCommon {
  listTabs: ITabItem[]
  tab: string
  setTab: (value: any) => void
  classNameTabs?: string
  classNameTrigger?: string
  setActiveTabIdx?: (value: number) => void
}

export function TabsCommon({
  listTabs,
  tab,
  setTab,
  classNameTabs,
  classNameTrigger,
  setActiveTabIdx = () => {}
}: ITabCommon) {
  const { setType } = useHomeStore()
  const [searchParams, setSearchParams] = useSearchParams()

  const removeQueryParam = (name: string) => {
    searchParams.delete(name)
    setSearchParams(searchParams) // updates the URL
  }

  return (
    <Tabs defaultValue="account" className={cn('w-', classNameTabs)}>
      <TabsList className={cn('flex bg-transparent w-full', classNameTabs)}>
        {listTabs?.map((item, idx) => (
          <TabsTrigger
            key={idx}
            value={item?.value}
            onClick={() => {
              setType('')
              setTab(item?.value)
              removeQueryParam('type')
              setActiveTabIdx(idx)
            }}
            style={{
              color: tab === item?.value ? '#D9CEFF' : '#9E90CF',
              boxShadow:
                tab === item?.value
                  ? '6px 6px 12px 0px rgba(22, 20, 24, 0.50),-6px -6px 24px 0px rgba(148, 95, 255, 0.15)'
                  : 'none'
            }}
            className={cn(
              'p-[20px] cursor-pointer text-[#9E90CF] w-[50%] rounded-[15px] data-[state=active]:text-[#D9CEFF] flex items-center justify-center',
              tab === item?.value && `bg-gradient-default  max-h-[40px] `,
              classNameTrigger
            )}
          >
            {item?.icon && tab !== item?.value && item?.icon}
            {item?.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
