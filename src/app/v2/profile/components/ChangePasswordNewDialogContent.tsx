import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import CustomButton from '@/components/common/custom-button'
import CloseIcon from '@/assets/images/close.svg'
import { css } from '@emotion/react'
import { radialGradientBg } from './styles'
import ViewEnabledIcon from '@/assets/images/login/view-enabled.svg'
import ViewDisableIcon from '@/assets/images/login/view-disable.svg'
import ValidatePassIcon from '@/assets/images/login/validate-pass.svg'
import ValidateFailIcon from '@/assets/images/login/validate-fail.svg'

interface ChangePasswordNewDialogContentProps {
  onClose?: () => void
}

export default function ChangePasswordNewDialogContent(
  props: ChangePasswordNewDialogContentProps
) {
  const { onClose } = props
  const { t } = useTranslation()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Validation rules
  const rules = useMemo(() => {
    const englishLettersAndDigitsOnly = /^[A-Za-z0-9]*$/.test(password)
    const min8 = password.length >= 8
    const hasUpper = /[A-Z]/.test(password)
    const hasLower = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const upperAndLower = hasUpper && hasLower

    return {
      englishLettersAndDigitsOnly,
      min8,
      upperAndLower,
      hasNumber
    }
  }, [password])

  const isValid =
    rules.englishLettersAndDigitsOnly &&
    rules.min8 &&
    rules.upperAndLower &&
    rules.hasNumber

  return (
    <div className="w-96 bg-zinc-950 rounded-[10px] border border-[#2b2142] backdrop-blur-lg inline-flex flex-col justify-start items-center overflow-hidden">
      <div className="self-stretch h-12 relative bg-zinc-950 border-b border-[#2b2142] backdrop-blur-[10px] flex items-center justify-center">
        <div className="text-white text-base font-medium">{t('profile.changePassword')}</div>
        {onClose && (
          <div className="absolute right-2 top-[10px]">
            <CustomButton
              aria-label="Close"
              variant="invisible"
              height={24}
              onClick={onClose}
              textAlign="center"
              label={
                <div className="w-full h-full flex items-center justify-center">
                  <img src={CloseIcon} alt="" aria-hidden className="w-4 h-4" />
                </div>
              }
              className="min-w-0 w-6 h-6 p-0 border-0 bg-transparent outline-none shadow-none"
              style={{ padding: 0, borderRadius: 0 }}
            />
          </div>
        )}
      </div>

      <div className="self-stretch px-4 py-6 flex flex-col justify-start items-start">
        <div className="self-stretch flex flex-col justify-start items-start gap-4">
          {/* Input */}
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            <label className="self-stretch justify-center text-slate-400 text-[10px] font-bold">
              {t('profile.newPassword') || 'New Password'}
            </label>
            <div className="self-stretch h-10 bg-gradient-to-b from-black/50 to-black/10 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-violet-300 inline-flex justify-between items-center overflow-hidden">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent text-white text-xs px-3 outline-none"
                placeholder="********"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="px-3 py-2 text-[10px] text-slate-400"
                aria-label={showPassword ? (t('common.hide') || 'Hide') : (t('common.show') || 'Show')}
              >
                <img
                  src={showPassword ? ViewDisableIcon : ViewEnabledIcon}
                  alt=""
                  aria-hidden
                  className="w-4 h-4"
                />
              </button>
            </div>
          </div>

          {/* Rules */}
          <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
            <div className="self-stretch justify-center text-slate-400 text-[10px] font-bold">
              Password must contain:
            </div>
            <div className="self-stretch flex flex-col justify-start items-start">
              <RuleItem valid={rules.englishLettersAndDigitsOnly} label="English letters only" />
              <RuleItem valid={rules.min8} label="Minimum 8 characters" />
              <RuleItem valid={rules.upperAndLower} label="Upper & lower case letters" />
              <RuleItem valid={rules.hasNumber} label="A number (0–9)" />
            </div>
          </div>

          {/* Action Button */}
          <div css={actionButtonStyles} className="w-full">
            <CustomButton
              onClick={() => {
                // Submit new password event can be integrated here
                // For now we only validate and close
                if (isValid) {
                  onClose?.()
                }
              }}
              disabled={!isValid}
              label={t('profile.changePassword')}
              textAlign="center"
              variant="default"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function RuleItem({ valid, label }: { valid: boolean; label: string }) {
  return (
    <div className="self-stretch p-1 inline-flex justify-start items-center gap-2">
      <img
        src={valid ? ValidatePassIcon : ValidateFailIcon}
        alt=""
        aria-hidden
        className="w-3 h-3"
      />
      <div className={`text-[10px] font-bold ${valid ? 'text-slate-300' : 'text-yellow-400'}`}>{label}</div>
    </div>
  )
}

const actionButtonStyles = css`
  border-radius: 10px;
  ${radialGradientBg};
`
