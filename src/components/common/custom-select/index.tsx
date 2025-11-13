import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn, css } from '@/lib/utils'

export interface CustomSelectProps {
  value?: string | number
  onValueChange?: (value: string | number) => void
  placeholder?: string
  className?: string
  style?: React.CSSProperties
  options: { label: string; value: string | number }[]
  optionRender?: (origin: any, index: number) => React.ReactNode
  disabled?: boolean
  selectContentClassName?: string
}

export const CustomSelect = (props: CustomSelectProps) => {
  const {
    value,
    onValueChange,
    placeholder,
    className,
    style,
    options = [],
    optionRender,
    disabled = false,
    selectContentClassName
  } = props

  return (
    <Select
      disabled={disabled}
      value={value?.toString()}
      onValueChange={onValueChange}
    >
      <SelectTrigger
        className={cn(
          'w-full outline-none focus-visible:outline-none',
          className
        )}
        css={selectStyles}
        style={style}
      >
        <SelectValue
          placeholder={placeholder}
          className="outline-none focus-visible:outline-none"
        />
      </SelectTrigger>
      <SelectContent
        css={selectContentStyles}
        className={cn('z-[1002] w-fit', selectContentClassName)}
      >
        <SelectGroup className="p-[10px]">
          {options.map((option, index) => (
            <SelectItem
              key={option.value}
              value={option.value.toString()}
              css={selectItemStyles(value == option.value)}
            >
              {optionRender ? optionRender(option, index) : option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

const selectStyles = css`
  display: flex;
  height: 40px;
  padding: 16px;
  align-items: center;
  justify-content: flex-start;

  border-radius: 10px !important;
  border: 1px solid rgba(92, 70, 123, 0.5);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.1) 100%
  );
  // box-shadow:
  //   6px 6px 12px 0px rgba(22, 20, 24, 0.5),
  //   -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
  &:hover {
    background:
      linear-gradient(
        0deg,
        rgba(154, 103, 255, 0.2) 0%,
        rgba(154, 103, 255, 0.2) 100%
      ),
      linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.1) 100%);
  }
  span {
    color: #ffffff !important;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`

const selectContentStyles = css`
  border-radius: 15px;
  max-height: 252px;
  border: 1px solid rgba(92, 70, 123, 0.5);
  background: radial-gradient(
    237.29% 116.82% at 60.95% -22.92%,
    #362c5a 0%,
    #181526 100%
  );
  box-shadow:
    6px 6px 12px 0px rgba(22, 20, 24, 0.5),
    -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
`

const selectItemStyles = (checked: boolean) => css`
  color: #ffffff;
  padding: 14px 16px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
  ${checked &&
  css`
    border-radius: 15px;
    border: 1px solid rgba(92, 70, 123, 0.5);
    background:
      linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%),
      linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.1) 100%);
  `}
  &:hover {
    background: linear-gradient(
      0deg,
      rgba(154, 103, 255, 0.2) 0%,
      rgba(154, 103, 255, 0.2) 100%
    );
  }
`
