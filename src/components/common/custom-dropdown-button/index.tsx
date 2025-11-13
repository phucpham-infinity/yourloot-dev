import { useMemo, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import CustomButton from '@/components/common/custom-button'
import ArrowDown from '@/assets/icons/arrowDown'
import { css, cn } from '@/lib/utils'

export type CustomDropdownOption = {
  label: string
  value: string | number
  icon?: React.ReactNode
}

interface CustomDropdownButtonProps {
  className?: string
  triggerClassName?: string
  contentClassName?: string
  style?: React.CSSProperties
  width?: number | string
  contentWidth?: number | string
  placeholder?: string
  value?: string | number
  options: CustomDropdownOption[]
  onChange?: (value: string | number, option?: CustomDropdownOption) => void
  disabled?: boolean
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  // allow custom trigger label (like CustomButton)
  label?: React.ReactNode
  // control display of caret icon on trigger
  showCaret?: boolean
  // pass-through variant for trigger
  triggerVariant?:
    | 'default'
    | 'default-small'
    | 'CTA'
    | 'invisible'
    | 'muted'
    | 'danger'
    | 'deactivate'
    | 'muted-danger'
    | 'default-danger'
    | 'invisible-danger'
}

export default function CustomDropdownButton(props: CustomDropdownButtonProps) {
  const {
    triggerClassName,
    contentClassName,
    style,
    width = 256,
    contentWidth,
    placeholder = 'Select',
    value,
    options,
    onChange,
    disabled,
    align = 'end',
    sideOffset = 10,
    label,
    showCaret = true,
    triggerVariant = 'muted'
  } = props

  const [open, setOpen] = useState(false)

  const selectedOption = useMemo(
    () => options.find((o) => o.value === value),
    [options, value]
  )

  const handleSelect = (option: CustomDropdownOption) => {
    if (disabled) return
    onChange?.(option.value, option)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={(v) => !disabled && setOpen(v)}>
      <PopoverTrigger asChild>
        <CustomButton
          variant={triggerVariant}
          label={
            label ?? (
              <div className="flex items-center gap-2 truncate">
                {selectedOption?.icon}
                <span className="truncate">{selectedOption?.label ?? placeholder}</span>
              </div>
            )
          }
          suffixIcon={showCaret ? <ArrowDown /> : undefined}
          className={cn('text-sm text-left text-gray-400', triggerClassName)}
          style={{ width, ...style }}
          disabled={disabled}
        />
      </PopoverTrigger>
      <PopoverContent
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'bg-transparent border-0 shadow-none p-0 overflow-y-hidden',
          contentClassName
        )}
        style={{ width: contentWidth ?? width }}
      >
        {/* Panel styled per raw.tsx container */}
        <div css={panelStyles} className={cn('flex flex-col border border-solid border-transparent', 'bg-transparent')}>
          <div className="w-full h-full flex flex-col max-h-[400px] overflow-y-auto">
            {options.map((option) => {
              const isSelected = option.value === value
              return (
                <CustomButton
                  key={String(option.value)}
                  onClick={() => handleSelect(option)}
                  label={
                    <div className="flex items-center gap-2 truncate">
                      {option.icon}
                      <span className="truncate">{option.label}</span>
                    </div>
                  }
                  className={cn(
                    'text-left h-10 p-5 rounded-[0px] outline outline-1 outline-offset-[-1px]',
                    'shadow-[-6px_-6px_24px_0px_rgba(148,95,255,0.15)] shadow-[6px_6px_12px_0px_rgba(22,20,24,0.50)]',
                    isSelected ? 'outline-[#5a4386]' : 'outline-[#433854]'
                  )}
                  variant={'default'}
                />
              )
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

const panelStyles = css`
  border-radius: 10px;
  background: radial-gradient(
    116.82% 237.29% at 60.95% -22.92%,
    #362c5a 0%,
    #181526 100%
  );
  overflow: hidden;
`
