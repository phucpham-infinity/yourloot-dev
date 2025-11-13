import HomeIcon from '@/assets/icons/home'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'

interface IMenuItem {
  icon: React.ReactNode
  label: string
  value: string
}

interface IDropdownMenuCommon {
  listMenus: IMenuItem[]
  value: string
  setValue: (value: string) => void
}

export function DropdownMenuCommon({
  listMenus,
  value,
  setValue
}: IDropdownMenuCommon) {
  const [isOpen, setIsOpen] = useState(false)
  const [label, setLabel] = useState(value)

  useEffect(() => {
    const selectedItem = listMenus.find((item) => item.value == value)
    if (selectedItem) {
      setLabel(selectedItem?.label)
    } else {
      setLabel('')
    }
  }, [value])

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer w-[200px] justify-between items-center rounded-[15px] py-[14px] px-[12px] font-medium h-[40px] border border-solid border-[#C3A2F1] text-xs gap-6 ring-0 focus:ring-0 text-[#6C6395] shadow-[6px_6px_12px_0px_rgba(22,20,24,0.50),-6px_-6px_24px_0px_rgba(148,95,255,0.15)] bg-gradient-muted hover:bg-gradient-muted-hover">
          <div className="flex items-center">
            <HomeIcon width={40} height={40} />
            <span className="leading-[12px] mb-1 text-[#6b6294]">{label}</span>
          </div>
          {isOpen ? (
            <ChevronUp size={20} strokeWidth="3px" color="#6C6395" />
          ) : (
            <ChevronDown size={20} strokeWidth="3px" color="#9E90CF" />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-[#9d90cf] mt-[8px] rounded-[15px] items-center flex flex-col border border-solid border-[#C3A2F1] w-[200px] shadow-[6px_6px_12px_0px_rgba(22,20,24,0.50),-6px_-6px_24px_0px_rgba(148,95,255,0.15)] bg-gradient-muted">
        {listMenus?.map((item, idx) => (
          <DropdownMenuItem
            key={idx}
            onClick={() => {
              setValue(item?.value)
            }}
            className={cn(
              'flex focus:bg-[#9967ff]/20 focus:text-unset rounded-[15px] w-[180px] h-[40px] gap-2 cursor-pointer text-xs font-medium items-center',
              item?.value === value &&
                'bg-gradient-muted border border-solid border-[#C3A2F1]'
            )}
          >
            {item?.icon}
            <span>{item?.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
