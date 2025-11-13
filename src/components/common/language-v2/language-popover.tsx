import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface LanguagePopoverProps {
  className?: string
  showLabel?: boolean
  contentClassName?: string
  triggerClassName?: string
  isOpen?: boolean
  contentAlign?: 'start' | 'center' | 'end'
  contentAlignOffset?: number
  contentSideOffset?: number
}

export default function LanguagePopover({
  className,
  showLabel = true,
  contentClassName,
  triggerClassName,
  contentAlign = 'start',
  contentAlignOffset = 0,
  contentSideOffset = 0
}: LanguagePopoverProps) {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)

  const options = useMemo(
    () => [
      { label: 'English', value: 'en', flag: 'https://flagcdn.com/w40/gb.png' },
      {
        label: 'Azerbaijani',
        value: 'az',
        flag: 'https://flagcdn.com/w40/az.png'
      },
      { label: 'Kazakh', value: 'kz', flag: 'https://flagcdn.com/w40/kz.png' },
      { label: 'Uzbek', value: 'yz', flag: 'https://flagcdn.com/w40/uz.png' },
      { label: 'Russian', value: 'ru', flag: 'https://flagcdn.com/w40/ru.png' },
      { label: 'Spain', value: 'es', flag: 'https://flagcdn.com/w40/es.png' }
    ],
    []
  )

  const current = useMemo(
    () => options.find((o) => o.value === i18n.language) || options[0],
    [i18n.language, options]
  )

  const handleSelect = (value: string) => {
    i18n.changeLanguage(value)
    setOpen(false)
  }

  return (
    <div className={cn('w-full', className)}>
      <Popover open={open} onOpenChange={setOpen} modal={false}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              'flex items-center hover:bg-app-primary/10 justify-center rounded-[6px] w-full h-full border-app-default',
              'bg-app-background',
              'text-app-medium-12 text-app-white',
              'outline-hidden',
              triggerClassName
            )}
          >
            <span className={cn('w-3 h-3 overflow-hidden cursor-pointer')}>
              <img
                className="object-cover w-full h-full rounded-full"
                src={current.flag}
                alt={current.label}
              />
            </span>
            {showLabel && (
              <span className="flex items-center justify-between flex-1">
                <span className="text-app-medium-12 text-app-white leading-[14px]">
                  {current.label}
                </span>
              </span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent
          align={contentAlign}
          alignOffset={contentAlignOffset}
          sideOffset={contentSideOffset}
          side="top"
          onOpenAutoFocus={(e) => e.preventDefault()}
          className={cn(
            'w-fit p-2 bg-app-background border-app-default !z-[1003]',
            contentClassName
          )}
        >
          <div className="text-app-medium-14 text-[#9E90CF] mb-[7px]">
            Select the language
          </div>
          <div className="flex flex-col gap-1">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelect(opt.value)}
                className={cn(
                  'flex items-center cursor-pointer gap-2 w-full rounded-[10px] px-[8px] py-[12px] leading-[16px]',
                  'text-app-medium-12 text-app-white',
                  'hover:bg-app-primary/10 transition-all duration-300',
                  current.value === opt.value && 'bg-[#191524]'
                )}
              >
                <span
                  className={cn(
                    'w-3 h-3 rounded-full overflow-hidden',
                    !showLabel && 'rounded-[3px]'
                  )}
                >
                  <img
                    className="object-cover w-full h-full"
                    src={opt.flag}
                    alt={opt.label}
                  />
                </span>
                <span className="text-app-medium-14 text-app-white leading-[14px]">
                  {opt.label}
                </span>
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
