import { cn, css } from '@/lib/utils'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

interface PaginationV2Props {
  currentPage: number
  totalPages: number
  loadMore: () => void
  className?: string
}

export const PaginationV2 = memo(
  ({ currentPage, totalPages, loadMore, className }: PaginationV2Props) => {
    const { t } = useTranslation()

    if (currentPage === totalPages) return null

    return (
      <div
        className={cn(
          'w-full flex flex-col gap-4 justify-center items-center mt-4',
          className
        )}
      >
        <div className="text-app-medium-14 text-white">
          {t('pagination.showing', 'Showing:')} {currentPage}{' '}
          {t('pagination.of', 'of')} {totalPages}
        </div>
        <div
          css={styles1()}
          onClick={loadMore}
          className="flex items-center cursor-pointer justify-center border-app-default h-10 rounded-[6px] py-[16px] px-[20px] text-[#9E90CF] text-app-medium-14"
        >
          {t('pagination.showMore', 'Show more')}
        </div>
      </div>
    )
  }
)

const styles1 = () => {
  return css`
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.1) 100%
    );
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
    }
  `
}
