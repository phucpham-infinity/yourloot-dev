import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

interface IMenuItem {
  icon: React.ReactNode
  label: string
  value: string
}

interface IDropdownMenuCommon {
  listMenus: IMenuItem[]
}

export function SelectCommon({ listMenus }: IDropdownMenuCommon) {
  return (
    <Select>
      <SelectTrigger className="w-[200px]  ">
        <SelectValue
          placeholder="Select a fruit"
          className="font-medium text-xs text-[#6C6395] placeholder:text-[#6C6395]"
        />
      </SelectTrigger>

      <SelectContent className="text-[#9d90cf]  !transform-none mt-[8px] rounded-[15px] items-end flex flex-col border border-solid border-[#C3A2F1] w-[200px] shadow-[6px_6px_12px_0px_rgba(22,20,24,0.50),-6px_-6px_24px_0px_rgba(148,95,255,0.15)] bg-gradient-muted">
        <SelectGroup className="flex flex-col items-center">
          {listMenus?.map((item, idx) => (
            <SelectItem
              key={idx}
              value={item?.value}
              className="flex focus:bg-[#9967ff]/20 focus:text-unset rounded-[15px] w-[180px] h-[40px] gap-2 cursor-pointer text-xs font-medium items-center"
            >
              {item?.icon}
              <span>{item?.label}</span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
