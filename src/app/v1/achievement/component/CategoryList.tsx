import CategoryItem from '@/app/v1/achievement/component/CateogoryItem'
import ProgressBar from '@/app/v1/achievement/component/ProgressBar'
import Coingold from '@/assets/images/homes/coingold.tsx'
import Loader from '@/components/common/loader'
import { css } from '@/lib/utils.ts'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

interface Props {
  percentage: number
  canClaim?: boolean
  name: string
  data: any[]
  customCssFunc: any
  customMobileCssFunc: any
  isPending: boolean
  ref: any
}

const renderCategoryList = (data: any[], t: any) => {
  return data.map((item, index) => {
    const status = item.isCompleted
      ? t('achievements.status.completed')
      : t('achievements.status.uncompleted')
    const variant = item.isCompleted ? 'CTA' : 'muted'
    return (
      <CategoryItem
        key={index}
        status={status}
        name={item.achievementName}
        desc={item.achievementDescription}
        variant={variant}
        className={`item${index}`}
      />
    )
  })
}

export default function CategoryList(props: Props) {
  const { t } = useTranslation()
  const { percentage, name, data, isPending, ref } = props

  return (
    <div ref={ref} className="w-full">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger
            className="justify-between w-full mx-auto items-center pt-7 pb-7 max-lg:pr-5 max-lg:pl-5"
            css={isMobile ? mobileCss() : desktopCss()}
          >
            <div className="justify-start items-center gap-5 flex item1">
              <Coingold />
              <div className="text-white text-2xl font-black font-['Satoshi']">
                {name}
              </div>
            </div>
            <ProgressBar percentage={percentage} className={'item2'} />
            {/*<CustomButton*/}
            {/*  label={t('achievements.claimPrize')}*/}
            {/*  className="w-fit lg:items-center max-lg:items-right text-center text-[#9d90cf] text-xs font-medium font-['Satoshi'] item3"*/}
            {/*  variant="CTA"*/}
            {/*  disabled={!canClaim}*/}
            {/*/>*/}
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-5 rounded-2xl border border-[#403b4a] justify-start items-start flex-col self-stretch overflow-hidden w-full">
              <div className="w-150 h-150 ml-100 -mt-145 bg-[#6330aa] rounded-full blur-[400px]" />
              <div
                className="w-full mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5"
                // css={
                //   isMobile
                //     ? customMobileCssFunc.call(null)
                //     : customCssFunc.call(null)
                // }
              >
                {isPending ? (
                  <div className="w-full h-full flex justify-center items-center translate-y-[-40px] pt-5">
                    <Loader className="w-[40px] h-[40px]" />
                  </div>
                ) : (
                  renderCategoryList(data, t)
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

const desktopCss = () => {
  return css`
    display: grid;
    grid-template-columns: 2fr 1fr min-content min-content;
    gap: 8px;
  `
}

const mobileCss = () => {
  return css`
    display: grid;
    align-items: flex-start;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas:
      'item1 item1 item1 item1 item1 item1 item1 item3 item3'
      'item2 item2 item2 item2 item2 item2 item2 item2 item4';
    gap: 12px;
    .item1 {
      grid-area: item1;
    }

    .item2 {
      grid-area: item2;
    }

    .item3 {
      grid-area: item3;
      align-self: self-end;
    }

    .item4 {
      grid-area: item4;
      align-self: self-end;
    }
  `
}
