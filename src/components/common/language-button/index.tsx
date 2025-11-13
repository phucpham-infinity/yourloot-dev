import IconButton from '@/components/common/icon-button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { css } from '@/lib/utils'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import CustomButton from '../custom-button'

const languageOptions = [
  {
    label: 'English',
    value: 'en',
    flag: 'https://flagcdn.com/w40/gb.png'
  },
  {
    label: 'Azerbaijani',
    value: 'az',
    flag: 'https://flagcdn.com/w40/az.png'
  },
  {
    label: 'Kazakh',
    value: 'kz',
    flag: 'https://flagcdn.com/w40/kz.png'
  },
  {
    label: 'Uzbek',
    value: 'yz',
    flag: 'https://flagcdn.com/w40/uz.png'
  },
  {
    label: 'Russian',
    value: 'ru',
    flag: 'https://flagcdn.com/w40/ru.png'
  }
]

export function LanguageButton() {
  const [open, setOpen] = useState(false)
  const { i18n } = useTranslation()

  const currentLang = i18n.language || 'en'

  const currentOption =
    languageOptions.find((opt) => opt.value === currentLang) ||
    languageOptions[0]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <IconButton
          onClick={() => setOpen(!open)}
          icon={
            <span className="flex items-center gap-2">
              <img
                src={currentOption.flag}
                alt={currentOption.label}
                className="w-5 h-5 rounded-full"
              />
            </span>
          }
        />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={10}
        className="bg-transparent w-[100%] border-0 shadow-none p-0"
      >
        <div
          css={styled}
          className="flex flex-col items-start gap-2.5 p-2.5 relative bg-white  overflow-hidden border border-solid border-transparent"
        >
          {languageOptions.map((option) => (
            <CustomButton
              key={option.value}
              label={option.label}
              variant="invisible"
              prefixIcon={
                <img
                  src={option.flag}
                  alt={option.label}
                  className="w-5 h-5 rounded-full"
                />
              }
              className="w-full flex text-[#9d90cf] gap-5 hover:bg-[#15121D] transition-all duration-300"
              textAlign="left"
              onClick={() => {
                i18n.changeLanguage(option.value)
                setOpen(false)
              }}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

const styled = css`
  border-radius: 20px;
  border: 1px solid #534577;
  background: radial-gradient(
    237.29% 116.82% at 60.95% -22.92%,
    #362c5a 0%,
    #181526 100%
  );
`
