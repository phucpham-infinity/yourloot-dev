import CategoryIconV2 from '@/assets/icons/home/categoryV2'
import { CustomDrawer } from '@/components/common/custom-drawer'
import InputV2 from '@/components/v2/input'
import { useV2DialogStore } from '@/store/slices/v2/dialog.store'
import { memo, useMemo, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import TitleV2 from '@/components/v2/title-v2'

type CategoryList = {
  iconLeft: React.ReactNode
  translationKey: string
  title: string
  category: string[]
  type?: string
  gameIds?: string
}

const CategoryCarousel = memo(
  ({ categories }: { categories: CategoryList[] }) => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const dialog = useV2DialogStore()

    const [openDrawer, setOpenDrawer] = useState(false)
    const [search, setSearch] = useState('')

    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

    const handleSearch = (value: string) => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }

      debounceTimer.current = setTimeout(() => {
        setSearch(value)
      }, 500)
    }

    const filteredCategories = useMemo(
      () =>
        categories?.filter((category) =>
          category?.title?.toLowerCase()?.includes(search?.toLowerCase())
        ),
      [categories, search]
    )

    const handleNavigate = (category: CategoryList) => {
      if (category?.type === 'ids' && category?.gameIds) {
        navigate(
          `/game-ids?gameIds=${category?.gameIds}&title=${category?.title}`
        )
      } else {
        navigate(
          `/game-category?category=${category?.category[0]}&title=${category?.title}`
        )
      }
    }

    const handleOpenDialog = () => {
      if (isMobile) {
        setOpenDrawer(true)
      } else {
        dialog.open({
          title: t('home.categories', 'Categories'),
          content: (
            <div className="scroll-bar-yloot flex gap-2 flex-wrap overflow-x-auto">
              {categories?.map((category, index) => (
                <div
                  onClick={() => {
                    handleNavigate(category)
                    dialog.close()
                  }}
                  key={index}
                  className="flex gap-2 p-3 h-10 cursor-pointer border-[1.5px] border-[rgba(234,227,255,0.2)] border-solid rounded-[10px] items-center justify-center"
                >
                  {category?.iconLeft}
                  <div className="text-white text-[14px] font-medium whitespace-nowrap">
                    {t(
                      `categories.${category?.translationKey}.title`,
                      category?.title
                    )}
                  </div>
                </div>
              ))}
            </div>
          )
        })
      }
    }

    return (
      <div id="category" className="flex flex-col gap-4">
        <TitleV2
          title={t('home.categories', 'Categories')}
          icon={<CategoryIconV2 className="w-4 h-4" />}
          onClick={handleOpenDialog}
        />

        <div className="scroll-bar-yloot flex gap-2 overflow-x-auto">
          {categories?.map((category, index) => (
            <div
              onClick={() => handleNavigate(category)}
              key={index}
              className="flex cursor-pointer gap-2 p-3 h-10 border-[1.5px] border-[rgba(234,227,255,0.2)] border-solid rounded-[10px] items-center justify-center"
            >
              {category?.iconLeft}
              <div className="text-white text-[14px] font-medium whitespace-nowrap">
                {t(
                  `categories.${category?.translationKey}.title`,
                  category?.title
                )}
              </div>
            </div>
          ))}
        </div>

        <CustomDrawer
          open={openDrawer}
          onOpenChange={setOpenDrawer}
          title={t('home.categories', 'Categories')}
          bodyClassName="h-full max-h-[85dvh]"
        >
          <InputV2
            onChange={(e) => {
              handleSearch(e.target.value)
            }}
            placeholder={t('home.searchCategory', 'Search category')}
          />

          <div className="grid grid-cols-2 gap-4 mt-3">
            {filteredCategories?.map((category, index) => (
              <div
                onClick={() => handleNavigate(category)}
                key={index}
                className="flex gap-2 p-3 bg-[#0b0a10] border-app-default border-2 rounded-[10px]"
              >
                {category?.iconLeft}
                <p className="text-white text-[14px] font-medium whitespace-nowrap">
                  {t(
                    `categories.${category?.translationKey}.title`,
                    category?.title
                  )}
                </p>
              </div>
            ))}
          </div>
        </CustomDrawer>
      </div>
    )
  }
)

export default CategoryCarousel
