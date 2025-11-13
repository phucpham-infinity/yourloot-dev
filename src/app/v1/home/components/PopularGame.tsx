import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import ArrowRightIcon from '@/assets/icons/arrowRight'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

import CustomButton from '@/components/common/custom-button'
import IconBtn from '@/components/common/icon-button'
import { useHomeStore } from '@/store/slices/home'
import { isMobile } from 'react-device-detect'
import { useSearchParams } from 'react-router-dom'

interface PopularGameProps {
  className?: string
}

export default function PopularGame({ className }: PopularGameProps) {
  const { t } = useTranslation()
  const { setType } = useHomeStore()
  const [searchParams, setSearchParams] = useSearchParams()
  return (
    <div
      className={cn(
        'h-10 w-full justify-between items-center inline-flex',
        className
      )}
    >
      <div
        id="#popular-games"
        className="grow shrink basis-0 h-10 justify-start items-center gap-2.5 flex"
      >
        <div data-svg-wrapper>
          <svg
            width="53"
            height="64"
            viewBox="0 0 53 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_452_45470)">
              <path
                d="M37.3846 25.1817C37.2767 25.0466 37.1459 25.0731 37.0774 25.1007C37.02 25.124 36.8884 25.1984 36.9066 25.3848C36.9285 25.6086 36.9408 25.8368 36.9431 26.0631C36.9529 27.002 36.5762 27.9219 35.9098 28.5868C35.2476 29.2474 34.3767 29.6034 33.4494 29.593C32.1827 29.5769 31.132 28.9162 30.411 27.6824C29.8149 26.6621 30.0769 25.3463 30.3543 23.9531C30.5166 23.1376 30.6845 22.2943 30.6845 21.4918C30.6845 15.2426 26.4835 11.6373 23.9792 10.0445C23.9275 10.0116 23.8782 10 23.8345 10C23.7635 10 23.7072 10.0306 23.6795 10.0494C23.6257 10.0858 23.5397 10.1687 23.5674 10.3156C24.5246 15.3986 21.6696 18.4557 18.6469 21.6922C15.5313 25.0284 12 28.8097 12 35.6294C12 43.5534 18.4466 50 26.3706 50C32.895 50 38.6474 45.4513 40.3593 38.9383C41.5266 34.4975 40.3033 28.8406 37.3846 25.1817ZM26.7292 46.9326C24.745 47.0231 22.8579 46.3114 21.4166 44.9333C19.9907 43.5699 19.1729 41.6671 19.1729 39.7129C19.1729 36.0457 20.5751 33.3535 24.3465 29.7795C24.4082 29.7209 24.4714 29.7024 24.5265 29.7024C24.5764 29.7024 24.6197 29.7177 24.6495 29.732C24.7122 29.7622 24.8153 29.837 24.8014 29.9989C24.6666 31.568 24.6689 32.8705 24.8083 33.8701C25.1646 36.4236 27.0338 38.1393 29.46 38.1393C30.6495 38.1393 31.7826 37.6917 32.6505 36.8788C32.7512 36.7844 32.8637 36.7965 32.9068 36.8056C32.9639 36.8179 33.0404 36.8529 33.0805 36.9496C33.4403 37.8184 33.6242 38.7407 33.627 39.6906C33.6385 43.5128 30.5441 46.7617 26.7292 46.9326Z"
                fill="url(#paint0_radial_452_45470)"
              />
              <path
                d="M24.0026 29.4165C22.097 31.2224 20.76 32.8329 19.902 34.4803C19.0389 36.1375 18.6729 37.8081 18.6729 39.7129C18.6729 41.8051 19.5476 43.8379 21.071 45.2947L21.4166 44.9333L21.0711 45.2947C22.6103 46.7664 24.63 47.5287 26.7515 47.4321C30.8347 47.2491 34.1393 43.7789 34.127 39.6891C34.124 38.6747 33.9274 37.6879 33.5424 36.7583L33.5423 36.7581C33.4196 36.462 33.1714 36.3512 33.0124 36.3169L33.0105 36.3165C32.8947 36.2919 32.5814 36.2583 32.3086 36.514C31.5334 37.24 30.5226 37.6393 29.46 37.6393C27.3063 37.6393 25.6286 36.131 25.3035 33.8011C25.1713 32.853 25.1664 31.5918 25.2996 30.0417C25.3172 29.8372 25.2592 29.6567 25.1549 29.517C25.0589 29.3884 24.9418 29.3178 24.8666 29.2815L24.8659 29.2812C24.7948 29.2471 24.6758 29.2024 24.5265 29.2024C24.3471 29.2024 24.1598 29.2675 24.0026 29.4165ZM24.0026 29.4165L24.3465 29.7795L24.0025 29.4166C24.0025 29.4166 24.0026 29.4166 24.0026 29.4165ZM36.263 28.9408L36.263 28.9408C37.0161 28.1893 37.4449 27.1546 37.4433 26.0929C39.9394 29.6309 40.9402 34.7616 39.8757 38.8112L40.3593 38.9383L39.8757 38.8112C38.2189 45.1144 32.6576 49.5 26.3706 49.5C18.7228 49.5 12.5 43.2772 12.5 35.6294C12.5 29.0212 15.899 25.3672 19.0124 22.0335L19.0613 21.9811C21.9468 18.8915 24.8604 15.772 24.1464 10.7532C26.608 12.4305 30.1845 15.8411 30.1845 21.4918C30.1845 22.2361 30.0283 23.0296 29.8639 23.8554C29.8639 23.8554 29.8639 23.8554 29.8639 23.8554L29.8595 23.8776C29.724 24.5581 29.5827 25.2674 29.5555 25.9372C29.5277 26.6208 29.6153 27.3116 29.9793 27.9346L30.411 27.6824L29.9793 27.9346C30.7753 29.2967 31.9756 30.0743 33.443 30.093L33.4438 30.093C34.5066 30.1048 35.5065 29.6955 36.263 28.9408Z"
                stroke="url(#paint1_linear_452_45470)"
                strokeOpacity="0.25"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_452_45470"
                x="0"
                y="0"
                width="52.7969"
                height="64"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="2" />
                <feGaussianBlur stdDeviation="6" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 1 0 0 0 0 0.303333 0 0 0 0 0.129167 0 0 0 0.63 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_452_45470"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_452_45470"
                  result="shape"
                />
              </filter>
              <radialGradient
                id="paint0_radial_452_45470"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(29.5517 0.830381) rotate(94.5016) scale(46.5945 68.5248)"
              >
                <stop stopColor="#FFC037" />
                <stop offset="1" stopColor="#FF5D2C" />
              </radialGradient>
              <linearGradient
                id="paint1_linear_452_45470"
                x1="26.3987"
                y1="10"
                x2="26.3987"
                y2="50"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#C3A2F1" />
                <stop offset="1" stopColor="#664EAB" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="text-white text-[22px] font-black font-['Satoshi']">
          {isMobile ? t('game.popular.titleMobile') : t('game.popular.title')}
        </div>
      </div>
      <div className="flex justify-center items-center gap-3 ">
        <IconBtn icon={<ArrowLeftIcon />} />
        <IconBtn icon={<ArrowRightIcon />} />
        <CustomButton
          label={t('game.popular.seeAll')}
          variant="muted"
          className="w-fit h-[38px] text-xs font-medium !py-4 !bg-[#0a090f]"
          onClick={() => {
            setType('gamesoft')
            searchParams.set('gamesoft', 'popular')
            searchParams.set('title', 'Popular Games')
            setSearchParams(searchParams)
          }}
        />
      </div>
    </div>
  )
}
