import { clsx } from 'clsx'
import { FormFieldApi } from '../type'
import { CopyButton } from '@/components/animate-ui/buttons/copy'
import { useToast } from '@/hooks/use-toast'

export interface TextInfoConfirmFieldProps {
  field: FormFieldApi
  placeholder?: string
  label?: string
  helperText?: string
  className?: string
  iconColor?: string
  confirmContent?: React.ReactNode
  onCopy?: () => void
}

export const TextInfoConfirmField = (props: TextInfoConfirmFieldProps) => {
  const {
    field,
    placeholder,
    label,
    helperText,
    className,
    iconColor = '#fff',
    confirmContent,
    onCopy
  } = props
  const toast = useToast()

  return (
    <div
      className={clsx(
        'w-full relative flex flex-col gap-[10px] text-white p-[12px] bg-[#191524] rounded-[10px]',
        className
      )}
    >
      <label className="label text-app-bold-10 ">{label}</label>
      <div className="relative text-app-medium-12 border border-app-default px-[18px] py-[14px] rounded-[10px]">
        <span>{field.state.value || placeholder}</span>
        <div className="absolute right-[10px] top-[50%] translate-y-[-50%]">
          <CopyButton
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              onCopy?.()
              toast.success('Copied to clipboard')
            }}
            className="copy-btn"
            content={field.state.value || placeholder}
            iconColor={iconColor}
          />
        </div>
      </div>
      {confirmContent && (
        <div className="confirm-content">{confirmContent}</div>
      )}
      {helperText && (
        <div className="helper-text text-app-medium-12 text-white">
          {helperText}
        </div>
      )}
    </div>
  )
}
