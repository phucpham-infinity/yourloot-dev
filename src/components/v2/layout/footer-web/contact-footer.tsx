import CallCenterImg from '@/assets/images/callcenter.svg'
import CustomButton from '@/components/common/custom-button'
import { useScreen } from '@/hooks'
import { cn, css } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

interface ContactFooterProps {
  className?: string
  onMessageClick?: () => void
  forceMobileLayout?: boolean
}

const contactCardStyles = css`
  background: linear-gradient(90deg, #6f52c0 0%, #46115e 126.18%);
  border-radius: 10px;
`

function ContactFooter({
  className,
  onMessageClick,
  forceMobileLayout = false
}: ContactFooterProps) {
  const { t } = useTranslation()
  const { isMobile, sm, md } = useScreen()
  const isBelowLg = isMobile || sm || md
  const useMobileLayout = forceMobileLayout || isBelowLg

  return (
    <div
      className={cn(
        'flex-col items-start gap-6',
        useMobileLayout ? 'flex w-full' : 'inline-flex w-[338px]',
        className
      )}
    >
      <div
        css={contactCardStyles}
        className={cn(
          'flex w-full overflow-hidden items-center justify-between',
          useMobileLayout ? 'gap-4 px-4 min-h-[118px]' : 'gap-6 px-6 '
        )}
      >
        <div
          className={cn(
            'flex flex-col items-start gap-4',
            useMobileLayout ? 'w-[162px]' : 'w-[162px]'
          )}
        >
          <div className="text-app-medium-14 text-app-white">
            {t('footer.contact.title', 'Contact us if you have any questions')}
          </div>

          <CustomButton
            variant="default"
            label={t('footer.contact.message', 'Message us')}
            onClick={onMessageClick}
            className="w-fit"
          />
        </div>

        <div className="flex self-end justify-end flex-shrink-0">
          <img
            src={CallCenterImg}
            alt={t('footer.contact.imageAlt', 'Contact center')}
            className={cn(
              'object-contain',
              useMobileLayout ? 'h-[108px] w-[108px]' : 'h-[126px] w-[126px]'
            )}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}

export default ContactFooter
