import { useState, useEffect } from 'react'
import { css, cn } from '@/lib/utils'
import ArrowDown from '@/assets/icons/arrowDown'
import ArrowUp from '@/assets/icons/arrowUp'

interface DropdownButtonProps {
  className?: string
  style?: React.CSSProperties
  optionRender?: (origin: any, index: number) => React.ReactNode
  selectedRender?: (origin: any, options?: any[]) => React.ReactNode
  options: { label: string; value: string | number }[]
  placeholder?: string
  value?: string | number
  onChange?: (value: string | number) => void
  searchable?: boolean
  disabled?: boolean
}
export default function DropdownButton(props: DropdownButtonProps) {
  const optionRenderDefault = (origin: {
    label: string
    value: string | number
  }) => origin.label
  const selectedRenderDefault = (origin: any) => origin

  const {
    className,
    style,
    optionRender = optionRenderDefault,
    selectedRender = selectedRenderDefault,
    options,
    placeholder,
    value,
    onChange,
    searchable = false,
    disabled = false
  } = props

  const [selected, setSelected] = useState<string | number | undefined>(value)
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setSelected(value)
  }, [value])

  const filteredOptions = searchQuery
    ? options.filter(
        (option) =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          String(option.value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options

  const optionsHeight = filteredOptions.length * 40 + 20

  const handleSelect = (option: { label: string; value: string | number }) => {
    setSelected(option.value)
    setIsOpen(false)
    onChange?.(option.value)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    e.stopPropagation()
  }

  return (
    <div className="w-full flex flex-col">
      <div
        css={styles}
        className={cn('w-full relative cursor-pointer', className, {
          'cursor-not-allowed': disabled
        })}
        style={style}
        onClick={() => {
          if (disabled) return
          setIsOpen(!isOpen)
        }}
      >
        <span className="label select-none">
          {selected ? selectedRender(selected, options) : placeholder}
        </span>
        <span className="absolute right-[20px] top-50%">
          {isOpen ? <ArrowUp /> : <ArrowDown />}
        </span>
      </div>
      <div css={optionsStylesFn(isOpen, optionsHeight, searchable)}>
        {searchable && (
          <div className="flex w-full flex-row items-center gap-2 sticky top-0 bg-[#151224] rounded-lg z-10 mb-2 p-2">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent border border-[#282138] text-sm rounded-lg p-1.5 text-[#9e90cf] outline-none"
              value={searchQuery}
              onChange={handleSearchChange}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
        <div className="w-full">
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              className="option cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {optionRender(option, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const styles = css`
  display: flex;
  height: 40px;
  padding: 20px;
  align-items: center;
  justify-content: flex-start;

  border-radius: 10px;
  border: 1px solid #282138;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.1) 100%
  );
  box-shadow:
    6px 6px 12px 0px rgba(22, 20, 24, 0.5),
    -6px -6px 24px 0px rgba(148, 95, 255, 0.15);

  .label {
    color: var(--YourLoot-Brand-Dark, #6c6395);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`

const optionsStylesFn = (
  isOpen: boolean,
  optionsHeight: number,
  searchable: boolean
) => {
  const maxHeight = 260
  const calculatedHeight = Math.min(optionsHeight, maxHeight)

  const height = isOpen
    ? `${calculatedHeight + (searchable ? 40 : 0)}px`
    : '0px'

  return css`
    width: 100%;
    height: ${height};
    max-height: ${height};
    opacity: ${isOpen ? 1 : 0};
    margin-top: ${isOpen ? '10px' : 0};
    overflow-y: ${isOpen ? 'auto' : 'hidden'};
    transition: all 0.3s ease;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: stretch;
    z-index: 100;

    border-radius: 15px;
    border: 1px solid #342c40;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.1) 100%
    );
    box-shadow:
      6px 6px 12px 0px rgba(22, 20, 24, 0.5),
      -6px -6px 24px 0px rgba(148, 95, 255, 0.15);

    .option {
      display: flex;
      height: 40px;
      padding: 20px;
      justify-content: space-between;
      align-items: center;
      align-self: stretch;

      color: var(--YourLoot-Brand-Medium, #9e90cf);
      text-align: center;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      &:hover {
        border-radius: 15px;
        background:
          linear-gradient(
            0deg,
            rgba(154, 103, 255, 0.2) 0%,
            rgba(154, 103, 255, 0.2) 100%
          ),
          linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.5) 0%,
            rgba(0, 0, 0, 0.1) 100%
          );
      }
    }
  `
}
