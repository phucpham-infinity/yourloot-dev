import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import ArrowRightIcon from '@/assets/icons/arrowRight'
import ProviderIcon from '@/assets/icons/home/provider'
import Search from '@/assets/icons/search'
import CustomButton from '@/components/common/custom-button'
import IconBtn from '@/components/common/icon-button'
import { cn, css } from '@/lib/utils'
import { useHomeStore } from '@/store/slices/home'
import { ChangeEvent } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'

interface ProviderProps {
  className?: string
  handleSearch?: (e: string) => void
  scrollToPreviousIndex?: () => void
  scrollToNextIndex?: () => void
}

export default function Provider({
  className,
  handleSearch,
  scrollToPreviousIndex,
  scrollToNextIndex
}: ProviderProps) {
  const { setType } = useHomeStore()
  const { t } = useTranslation()
  const search = (search: ChangeEvent<HTMLInputElement>) => {
    handleSearch?.(search?.target?.value)
  }

  return (
    <div
      className={cn(
        'w-full justify-between items-center inline-flex',
        className
      )}
    >
      <div className="grow shrink basis-0 h-10 justify-start items-center gap-1 lg:gap-5 flex">
        <ProviderIcon className="w-[40px] h-[40px]" />
        <div className="text-white text-[22px] font-black font-['Satoshi']">
          {t('home.titleProviders')}
        </div>
      </div>
      <div className="justify-center items-end gap-3 flex pb-2.5">
        <IconBtn
          icon={<ArrowLeftIcon />}
          onClick={() => {
            scrollToPreviousIndex?.()
          }}
        />
        <IconBtn
          icon={<ArrowRightIcon />}
          onClick={() => {
            scrollToNextIndex?.()
          }}
        />

        {isMobile ? (
          <CustomButton
            label={t('home.seeAll')}
            variant="muted"
            className="w-fit h-[38px] text-xs font-medium !py-4 !bg-[#0a090f]"
            onClick={() => {
              setType('provider')
            }}
          />
        ) : (
          <div css={stylesFn} className="relative w-full ">
            {/* <FormBuilder
            className="flex-1 text-[#9E90CF]"
            gap={14}
            fields={[
              {
                name: 'search',
                type: 'text',
                placeholder: t('myItems.search')
              }
            ]}
            onSubmit={search}
            defaultValues={{
              search: ''
            }}
          /> */}

            <input
              onChange={(e) => {
                search(e)
              }}
              type="text"
              placeholder="Search"
            />
            <Search className="absolute w-3 h-3 right-[15px] top-[15px]" />
          </div>
        )}
      </div>
    </div>
  )
}

const stylesFn = css`
  gap: 10px;

  input {
    display: flex;
    height: 40px;
    padding: 20px;
    justify-content: flex-end;
    align-items: center;
    border-radius: 15px;
    border: 1px solid #2e273c;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.1) 100%
    );
    outline: none;
    box-shadow:
      6px 6px 12px 0px rgba(22, 20, 24, 0.5),
      -6px -6px 24px 0px rgba(148, 95, 255, 0.15);

    color: #6c6395;
    text-align: left;
    font-size: 12px;
    font-weight: 500;
    line-height: normal;
    cursor: pointer;

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
    color: #6c6395;
    font-size: 10px;
    font-weight: 700;
    line-height: normal;
    padding-top: 10px;
  }
`
