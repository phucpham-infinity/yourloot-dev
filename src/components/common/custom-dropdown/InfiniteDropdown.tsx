import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  SidebarSelect,
  SidebarSelectContent,
  SidebarSelectGroup,
  SidebarSelectItem,
  SidebarSelectTrigger,
  SidebarSelectValue
} from '@/components/v2/layout/sidebar-web/sidebar-select'
import { cn } from '@/lib/utils'
import ArrowDown from '@/assets/icons/arrowDown'

export interface InfiniteDropdownOption {
  label: string | React.ReactNode
  value: string | number
  // any other fields are allowed
  [key: string]: any
}

export interface InfiniteDropdownProps {
  value?: string | number
  onValueChange?: (value: string | number) => void
  placeholder?: string
  className?: string
  triggerClassName?: string
  contentClassName?: string
  options: InfiniteDropdownOption[]
  optionRender?: (
    option: InfiniteDropdownOption,
    index: number
  ) => React.ReactNode
  batchSize?: number // default 10
  disabled?: boolean
  keepOpenOnSelect?: boolean
}

/**
 * A reusable dropdown built on top of SidebarSelect primitives
 * - Styled based on custom-dropdown/raw.tsx
 * - Accepts external text (placeholder) and data (options)
 * - Implements incremental infinite scroll: loads items in batches (default 10)
 */
export const InfiniteDropdown: React.FC<InfiniteDropdownProps> = ({
  value,
  onValueChange,
  placeholder = 'Select',
  triggerClassName,
  contentClassName,
  options = [],
  optionRender,
  batchSize = 10,
  disabled,
  keepOpenOnSelect
}) => {
  const [visibleCount, setVisibleCount] = useState<number>(batchSize)
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)

  // reset visible count when options change or dropdown closes/opens via value or list
  useEffect(() => {
    setVisibleCount(batchSize)
  }, [batchSize, options?.length])

  const visibleOptions = useMemo(
    () => options.slice(0, Math.min(visibleCount, options.length)),
    [options, visibleCount]
  )

  const onScroll = useCallback(() => {
    const el = viewportRef.current
    if (!el) return
    const threshold = 32 // px from bottom to start loading more
    const reachedBottom =
      el.scrollTop + el.clientHeight >= el.scrollHeight - threshold
    if (reachedBottom && visibleCount < options.length) {
      setVisibleCount((c) => Math.min(c + batchSize, options.length))
    }
  }, [batchSize, options.length, visibleCount])

  const selectedOption = useMemo(() => {
    return options.find((opt) => opt.value?.toString() === value?.toString())
  }, [options, value])

  const handleValueChange = useCallback(
    (val: string) => {
      onValueChange?.(val)
      if (keepOpenOnSelect) {
        // Ensure the dropdown remains open after selection
        setOpen(true)
      }
    },
    [keepOpenOnSelect, onValueChange]
  )

  return (
    <SidebarSelect
      value={value?.toString()}
      onValueChange={handleValueChange}
      open={open}
      onOpenChange={setOpen}
      disabled={disabled}
    >
      <SidebarSelectTrigger
        className={cn(
          // trigger style inspired by raw.tsx (rounded, subtle gradient, border)
          'w-full h-10 px-4 rounded-[10px] border border-[rgba(92,70,123,0.5)]',
          'bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.1)_100%)]',
          'hover:bg-[linear-gradient(0deg,rgba(154,103,255,0.2)_0%,rgba(154,103,255,0.2)_100%),linear-gradient(180deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.1)_100%)]',
          'text-white text-sm font-medium',
          triggerClassName
        )}
      >
        <SidebarSelectValue placeholder={placeholder}>
          {selectedOption ? optionRender?.(selectedOption, 1) : placeholder}
        </SidebarSelectValue>
        <ArrowDown className="w-3 h-3 text-[#9E90CF]" />
      </SidebarSelectTrigger>

      <SidebarSelectContent
        // content panel styled based on raw.tsx container
        className={cn(
          'absolute z-[99999] w-64 overflow-hidden p-4',
          'rounded-[10px] border border-[rgba(92,70,123,0.5)]',
          'bg-[#050305]',
          contentClassName
        )}
        // use popper positioning
        position="popper"
      >
        {/* Title text like "Select primary wallet" */}
        {placeholder && (
          <div className="text-slate-400 text-sm font-medium leading-tight mb-4">
            {placeholder}
          </div>
        )}

        {/* Scrollable list with infinite loading */}
        <div className="flex flex-col gap-0 overflow-hidden">
          <div
            ref={viewportRef}
            onScroll={onScroll}
            className="max-h-80 overflow-auto pr-1"
          >
            <SidebarSelectGroup className="flex flex-col">
              {visibleOptions.map((opt, index) => {
                const isSelected = value?.toString() === opt.value?.toString()
                return (
                  <SidebarSelectItem
                    key={opt.value}
                    value={opt.value.toString()}
                    className={cn(
                      'px-2 py-3 rounded-[10px] inline-flex justify-start items-center gap-2',
                      isSelected
                        ? 'bg-gray-900 border border-transparent'
                        : 'hover:bg-[linear-gradient(0deg,rgba(154,103,255,0.2)_0%,rgba(154,103,255,0.2)_100%)]'
                    )}
                  >
                    {optionRender ? (
                      optionRender(opt, index)
                    ) : (
                      <div className="text-white text-sm font-medium leading-tight">
                        {typeof opt.label === 'string' ? opt.label : opt.label}
                      </div>
                    )}
                  </SidebarSelectItem>
                )
              })}
            </SidebarSelectGroup>

            {/* Load more sentinel spacing */}
            {visibleCount < options.length && <div className="h-6" />}
          </div>
        </div>

        {/* Bottom gradient fade similar to raw.tsx */}
        <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-9 bg-transparent" />
      </SidebarSelectContent>
    </SidebarSelect>
  )
}

export default InfiniteDropdown
