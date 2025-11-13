import { Popover, PopoverContent } from '@/components/ui/popover'
import { cn, css } from '@/lib/utils'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { compact } from 'lodash-es'
import React, { useMemo, useRef, useState } from 'react'
import { FormFieldApi } from '../type'
import { useClickAway } from 'ahooks'
import EyeOff from '@/assets/images/login/view-disable.svg'
import EyeOn from '@/assets/images/login/view-enabled.svg'
import { useToast } from '@/hooks/use-toast'
import { CopyButton } from '@/components/animate-ui/buttons/copy'

const formatCurrency = (value: string): string => {
  const numericValue = String(value)?.replace?.(/[^\d.]/g, '')
  if (!numericValue) return value
  const parts = numericValue?.split?.('.')
  if (parts?.length > 2) {
    parts.splice(2)
  }
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  if (parts.length > 1) {
    return `${integerPart}.${parts[1].slice(0, 2)}`
  }
  return integerPart
}

export interface TextFieldProps {
  field: FormFieldApi
  label: string
  placeholder?: string
  inputType?: 'text' | 'text-number' | 'email' | 'password' | 'currency'
  className?: string
  style?: React.CSSProperties
  disabled: boolean
  description?: string
  renderDescription?: (content: string) => React.ReactNode
  dropdownMenu?: React.ReactNode
  showCopyBtn?: boolean
  onFocus?: (value: string | number) => void
  customError?: string | null
}

const defaultDescription = (description: string) => (
  <div css={descriptionStyle} className="description">
    {description}
  </div>
)

export const TextField = (props: TextFieldProps) => {
  const {
    field,
    placeholder,
    inputType,
    label,
    className,
    style,
    disabled = false,
    description,
    renderDescription = defaultDescription,
    showCopyBtn = false,
    dropdownMenu,
    onFocus,
    customError
  } = props

  const toast = useToast()

  const displayValue = useMemo(() => {
    if (inputType === 'currency' && field.state.value) {
      return formatCurrency(field.state.value)
    }
    return field.state.value
  }, [field.state.value, inputType])

  const handleChange = (value: string) => {
    if (inputType === 'currency') {
      const rawValue = value.replace(/[^\d.]/g, '')
      const parts = rawValue.split('.')
      if (parts.length > 2) {
        parts.splice(2)
      }
      if (parts.length > 1) {
        field.handleChange(`${parts[0]}.${parts[1].slice(0, 2)}`)
      } else {
        field.handleChange(parts[0])
      }
    } else if (inputType === 'text-number') {
      const rawValue = value.replace(/[^\d.]/g, '')
      const parts = rawValue.split('.')
      if (parts.length > 2) {
        parts.splice(2)
      }
      field.handleChange(parts.join('.'))
    } else {
      field.handleChange(value)
    }
  }

  const [openDropdown, setOpenDropdown] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const contextRef = useRef<HTMLDivElement>(null)
  const [isShowPassword, setIsShowPassword] = useState(false)

  useClickAway(() => {
    setOpenDropdown(false)
  }, [inputRef, contextRef])

  return (
    <div
      className={cn('w-full relative flex flex-col h-[60px]', className)}
      css={stylesFn(disabled)}
      style={style}
    >
      <label htmlFor={field.name} className="label">
        {label}
      </label>
      <div className={'w-full flex flex-row items-center gap-5'}>
        {dropdownMenu ? (
          <Popover open={openDropdown}>
            <PopoverTrigger
              asChild
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()

                setOpenDropdown(true)
                inputRef.current?.focus()
              }}
            >
              <div className="w-full relative">
                <input
                  style={
                    {
                      WebkitAppearance: 'none',
                      appearance: 'none',
                      pointerEvents: 'auto'
                    } as React.CSSProperties
                  }
                  ref={inputRef}
                  name={field.name}
                  value={displayValue}
                  onBlur={() => {
                    field.handleBlur()
                  }}
                  onFocus={(e) => {
                    onFocus?.(e.target.value)
                    setOpenDropdown(true)
                  }}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder={placeholder}
                  type={
                    inputType === 'currency'
                      ? 'text'
                      : inputType === 'password'
                        ? isShowPassword
                          ? 'text'
                          : 'password'
                        : inputType
                  }
                  disabled={disabled}
                  className={cn(
                    'w-full !shadow-none !rounded-[10px]',
                    field.state.meta.isTouched &&
                      compact(field.state.meta.errors)?.length > 0 &&
                      'border-red-500!'
                  )}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="w-fit bg-[#2A2242] rounded-[10px] border-0"
              autoFocus={false}
              side="bottom"
              align="start"
              ref={contextRef}
            >
              {dropdownMenu}
            </PopoverContent>
          </Popover>
        ) : (
          <div className="w-full relative">
            <input
              name={field.name}
              style={
                {
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  pointerEvents: 'auto'
                } as React.CSSProperties
              }
              value={displayValue}
              onBlur={field.handleBlur}
              onFocus={(e) => onFocus?.(e.target.value)}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={placeholder}
              type={
                inputType === 'currency'
                  ? 'text'
                  : inputType === 'password'
                    ? isShowPassword
                      ? 'text'
                      : 'password'
                    : inputType
              }
              disabled={disabled}
              className={cn(
                'w-full !rounded-[10px]',
                field.state.meta.isTouched &&
                  compact(field.state.meta.errors)?.length > 0 &&
                  'border-red-500!'
              )}
            />
            {showCopyBtn && (
              <div className="absolute right-[10px] top-[50%] translate-y-[-50%]">
                <CopyButton
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    toast.success('Copied to clipboard')
                  }}
                  className="copy-btn"
                  content={field.state.value || placeholder}
                  iconColor={'#fff'}
                />
              </div>
            )}
          </div>
        )}

        {inputType === 'password' && (
          <div className="absolute bottom-[14px] right-[15px] w-[12px] h-[12px]">
            {isShowPassword ? (
              <img
                src={EyeOn}
                className="w-full h-full cursor-pointer"
                onClick={() => setIsShowPassword(!isShowPassword)}
              />
            ) : (
              <img
                className="w-full h-full cursor-pointer"
                src={EyeOff}
                onClick={() => setIsShowPassword(!isShowPassword)}
              />
            )}
          </div>
        )}
      </div>
      <div className="absolute w-full top-[92%] left-0 flex flex-col text-nowrap">
        {customError ? (
          <span className="description">
            <span className="text-red-500">{customError}</span>
          </span>
        ) : (
          field.state.meta.isTouched &&
          compact(field.state.meta.errors)?.length > 0 &&
          compact(field.state.meta.errors).map((error, index) => (
            <span key={index} className="description">
              {error}
            </span>
          ))
        )}
        {description &&
          compact(field.state.meta.errors)?.length === 0 &&
          renderDescription(description)}
      </div>
    </div>
  )
}

const stylesFn = (isDisabled: boolean) => css`
  gap: 10px;
  .label {
    color: #ffffff;
    font-size: 14px;
    font-weight: 700;
    line-height: 10px;
    ${isDisabled && 'color: #605E68'}
  }
  input {
    display: flex;
    height: 40px;
    padding: 20px;
    justify-content: flex-end;
    align-items: center;
    border: 1px solid #2e273c;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.1) 100%
    );
    outline: none;
    // box-shadow:
    //   6px 6px 12px 0px rgba(22, 20, 24, 0.5),
    //   -6px -6px 24px 0px rgba(148, 95, 255, 0.15);

    color: #ffffff;
    text-align: left;
    font-size: 14px;
    font-weight: 500;
    line-height: normal;
    cursor: pointer;

    &::placeholder {
      color: #ffffff;
      opacity: 1;
    }

    &:hover {
      outline: none;
      border: 1px solid #453561;
      background:
        linear-gradient(
          0deg,
          rgba(154, 103, 255, 0.2) 0%,
          rgba(154, 103, 255, 0.2) 100%
        ),
        linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.1) 100%);
      box-shadow:
        6px 6px 12px 0px rgba(22, 20, 24, 0.5),
        -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
    }

    &:focus {
      border: 1px solid #2a2339;
      background:
        linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%),
        linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.1) 100%);
      box-shadow:
        6px 6px 12px 0px rgba(22, 20, 24, 0.5),
        -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
    }
    &:disabled {
      cursor: not-allowed;
      border: 1px solid #3a3248;
      background:
        linear-gradient(
          0deg,
          rgba(97, 97, 97, 0.2) 0%,
          rgba(97, 97, 97, 0.2) 100%
        ),
        linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.1) 100%);
      box-shadow:
        6px 6px 12px 0px rgba(22, 20, 24, 0.5),
        -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
      &:hover,
      &:focus {
        background:
          linear-gradient(
            0deg,
            rgba(97, 97, 97, 0.2) 0%,
            rgba(97, 97, 97, 0.2) 100%
          ),
          linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.5) 0%,
            rgba(0, 0, 0, 0.1) 100%
          );
        box-shadow:
          6px 6px 12px 0px rgba(22, 20, 24, 0.5),
          -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
      }
    }
  }
  .description {
    color: #ffffff;
    font-size: 10px;
    font-weight: 700;
    line-height: normal;
    padding-top: 8px;
  }
`

const descriptionStyle = css`
  color: #ffffff;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding-top: 10px;
`
