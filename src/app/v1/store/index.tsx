import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { lazy } from 'react'

// const Banner = lazy(() => import('@/components/common/banner/Banner'))
const SectionHeader = lazy(() => import('@/components/common/section-header'))
const ItemStore = lazy(() => import('./components/ItemStore'))
const ShopStore = lazy(() => import('./components/ShopStore'))
const StoreHeader = lazy(() => import('./components/StoreHeader'))

// svg

import Search from '@/assets/images/profile/search.svg'
import Limited2Icon from '@/assets/images/store/limited2.svg'
import Limited1Icon from '@/assets/images/store/limitedIcon.svg'
import GiftIconImage from '@/assets/images/store/grif.svg'
import LimitedIcon from '@/assets/images/store/limited.svg'

// lightbox
import lightExhange1 from '@/assets/images/store/light/lightExchange1.svg'
import lightExhange2 from '@/assets/images/store/light/lightExchange2.svg'
import lightLimited1 from '@/assets/images/store/light/lightLimited1.svg'
import lightLimited2 from '@/assets/images/store/light/lightLimited2.svg'

// lightitem
import lightGreen from '@/assets/images/store/items/lightGreen.svg'
import lightGreen2 from '@/assets/images/store/items/lightGreen2.svg'
import lightBlue from '@/assets/images/store/items/lightBlue.svg'
import lightPink from '@/assets/images/store/items/lightPink.svg'
import lightorange from '@/assets/images/store/items/lightorange.svg'
import GiftIcon from '@/assets/icons/home/gift'
import ThunderjudgeIcon from '@/assets/icons/thunderjudge'
import Exchange from '@/components/common/exchange'

const StorePage = () => {
  const [sections, setSections] = useState<'store' | 'wishlist'>('store')
  // const router = useNavigate()
  return (
    <div className="w-full h-full flex flex-col gap-5">
      <StoreHeader className="" sections={sections} setSections={setSections} />

      {sections === 'store' && (
        <>
          <div className="w-full flex flex-col lg:flex-row gap-5 min-h-[272px] lg:h-[276px]">
            {/* <Banner
              onClick={() => router('/promo-code')}
              title="Store promotion"
              description="Banner description"
              buttonLabel="Check slot games"
              className="w-full lg:w-2/3 h-full lg:h-[276px]"
            /> */}
            <div className="w-full gap-5 flex flex-row lg:flex-col max-h-[258px] lg:w-1/3 justify-between">
              <Exchange
                title="$ 1,234,567"
                description=" In US Dollars"
                className="overflow-hidden p-4 lg:p-5 h-full border-app-default"
                imgPosition={
                  <img
                    src={lightExhange1}
                    className="absolute right-0 bottom-0 w-full h-full"
                  />
                }
              />
              <Exchange
                title="$ 1,234,567"
                description=" Your Loot Coins"
                className="overflow-hidden p-4 lg:p-5 h-full border-app-default"
                imgPosition={
                  <img
                    src={lightExhange2}
                    className="absolute top-0 left-0 w-full h-full"
                  />
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-5 translate-y-[-5px] ">
            <SectionHeader
              title="Limited time items"
              icon={<img src={Limited1Icon} className="w-[40px] h-[40px]" />}
            />

            <div className="w-full flex gap-5 flex-col md:flex-row h-full lg:h-[319px]">
              <ShopStore
                title="Item Name"
                des="$ 1,234,433,00"
                labelBtn="Buy"
                className="w-full lg:max-w-[468px] overflow-hidden min-h-[244px] lg:h-[319px]"
                imgPosition={
                  <img
                    src={GiftIconImage}
                    className="absolute right-0 bottom-0 h-full"
                  />
                }
                bgPosition={
                  <img
                    src={lightLimited1}
                    className="absolute bottom-0 left-0 "
                  />
                }
                giftIcon={<GiftIcon className="w-[87px] h-[96px]" />}
              />
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 items-center justify-between w-full min-h-[244px] lg:h-[319px]">
                {items
                  ?.slice(0, window.innerWidth >= 1024 ? 3 : 2)
                  .map((item, index) => (
                    <ItemStore
                      key={index}
                      title={item?.title}
                      btnStart={item?.btnStart}
                      btnAmount={item?.btnAmount}
                      isStar={item?.isStar}
                      isOwned={item?.isOwned}
                      className={item?.className}
                    />
                  ))}
              </div>
            </div>

            <SectionHeader
              title="Limited time items"
              icon={<img src={Limited2Icon} className="w-[40px] h-[40px]" />}
            />

            <div className="flex gap-5 lg:h-[319px] w-full flex-col lg:flex-row">
              <ShopStore
                title="Item Name"
                des="$ 1,234,433,00"
                labelBtn="Buy"
                className="w-full lg:min-w-[712px] overflow-hidden min-h-[244px] lg:h-[319px]"
                imgPosition={
                  <img
                    src={LimitedIcon}
                    className="absolute right-[-80px] lg:right-0 bottom-0 h-full"
                  />
                }
                bgPosition={
                  <img
                    src={lightLimited2}
                    className="absolute right-0 left-0 "
                  />
                }
                giftIcon={<ThunderjudgeIcon className="w-[87px] h-[96px]" />}
              />
              <div className="w-full flex gap-5 items-center justify-between min-h-[244px] lg:h-[319px]">
                {items
                  ?.slice(0, 2)
                  .map((item, index) => (
                    <ItemStore
                      key={index}
                      title={item?.title}
                      btnStart={item?.btnStart}
                      btnAmount={item?.btnAmount}
                      isStar={item?.isStar}
                      isOwned={item?.isOwned}
                      className={item?.className}
                    />
                  ))}
              </div>
            </div>

            <SectionHeader
              title="Other items"
              icon={<img src={Search} className="w-[40px] h-[40px]" />}
            />

            <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
              {items.slice(0, 10).map((item, index) => (
                <ItemStore
                  key={index}
                  title={item?.title}
                  btnStart={item?.btnStart}
                  btnAmount={item?.btnAmount}
                  isStar={item?.isStar}
                  isOwned={item?.isOwned}
                  className={item?.className}
                  imgPosition={item?.imgPosition}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {sections === 'wishlist' && (
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-5">
          {itemsWishlist.slice(0, 10).map((item, index) => (
            <ItemStore
              key={index}
              title={item?.title}
              btnStart={item?.btnStart}
              btnAmount={item?.btnAmount}
              isStar={item?.isStar}
              isOwned={item?.isOwned}
              className={item?.className}
              isWishlist={item?.isWishlist}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default StorePage

const items = [
  {
    title: 'Super item 123',
    des: 'Increase your chances of winning with this lucky charm',
    labelBtn: 'Purchase',
    btnStart: '12,231',
    btnAmount: '$49.99',
    isStar: false,
    isOwned: true,
    className: ''
  },
  {
    title: 'Super item 123',
    des: 'Increase your chances of winning with this lucky charm',
    labelBtn: 'Purchase',
    btnStart: '12,231',
    btnAmount: '$49.99',
    isStar: false,
    isOwned: true,
    className: ''
  },
  {
    title: 'Super item 123',
    des: 'Get 1,000,000 coins instantly',
    labelBtn: 'Get Coins',
    btnStart: '12,231',
    btnAmount: '$29.99',
    isStar: true,
    isOwned: false,
    className: ''
  },
  {
    title: 'Super item 123',
    des: 'Increase your chances of winning with this lucky charm',
    labelBtn: 'Purchase',
    btnStart: '12,231',
    btnAmount: '$49.99',
    isStar: false,
    isOwned: true,
    className: ''
  },
  {
    title: 'Super item 123',
    des: 'Increase your chances of winning with this lucky charm',
    labelBtn: 'Purchase',
    btnStart: '12,231',
    btnAmount: '$49.99',
    isStar: false,
    isOwned: true,
    className: ''
  },
  {
    title: 'Super item 123',
    des: 'Get 1,000,000 coins instantly',
    labelBtn: 'Get Coins',
    btnStart: '12,231',
    btnAmount: '$29.99',
    isStar: true,
    isOwned: false,
    className: '',
    imgPosition: <img src={lightGreen} className="absolute right-0 bottom-0 " />
  },
  {
    title: 'Super item 123',
    des: 'Increase your chances of winning with this lucky charm',
    labelBtn: 'Purchase',
    btnStart: '12,231',
    btnAmount: '$49.99',
    isStar: false,
    isOwned: true,
    className: '',
    imgPosition: (
      <img src={lightGreen2} className="absolute right-0 bottom-0 " />
    )
  },
  {
    title: 'Super item 123',
    des: 'Increase your chances of winning with this lucky charm',
    labelBtn: 'Purchase',
    btnStart: '12,231',
    btnAmount: '$49.99',
    isStar: false,
    isOwned: true,
    className: '',
    imgPosition: <img src={lightBlue} className="absolute right-0 bottom-0 " />
  },
  {
    title: 'Super item 123',
    des: 'Get 1,000,000 coins instantly',
    labelBtn: 'Get Coins',
    btnStart: '12,231',
    btnAmount: '$29.99',
    isStar: true,
    isOwned: false,
    className: '',
    imgPosition: <img src={lightPink} className="absolute right-0 bottom-0 " />
  },
  {
    title: 'Super item 123',
    des: 'Increase your chances of winning with this lucky charm',
    labelBtn: 'Purchase',
    btnStart: '12,231',
    btnAmount: '$49.99',
    isStar: false,
    isOwned: true,
    className: '',
    imgPosition: (
      <img src={lightorange} className="absolute right-0 bottom-0 " />
    )
  },
  {
    title: 'Super item 123',
    des: 'Increase your chances of winning with this lucky charm',
    labelBtn: 'Purchase',
    btnStart: '12,231',
    btnAmount: '$49.99',
    isStar: false,
    isOwned: true,
    className: '',
    imgPosition: (
      <img src={lightLimited1} className="absolute right-0 bottom-0 " />
    )
  },
  {
    title: 'Super item 123',
    des: 'Get 1,000,000 coins instantly',
    labelBtn: 'Get Coins',
    btnStart: '12,231',
    btnAmount: '$29.99',
    isStar: true,
    isOwned: false,
    className: '',
    imgPosition: (
      <img src={lightLimited1} className="absolute right-0 bottom-0 " />
    )
  }
]

const itemsWishlist = [
  {
    title: 'Super item 123',
    des: 'Increase your chances of winning with this lucky charm',
    labelBtn: 'Purchase',
    btnStart: '12,231',
    btnAmount: '$49.99',
    isStar: false,
    isOwned: true,
    className: '',
    isWishlist: true
  },
  {
    title: 'Super item 123',
    des: 'Increase your chances of winning with this lucky charm',
    labelBtn: 'Purchase',
    btnStart: '12,231',
    btnAmount: '$49.99',
    isStar: false,
    isOwned: true,
    className: '',
    isWishlist: true
  },
  {
    title: 'Super item 123',
    des: 'Get 1,000,000 coins instantly',
    labelBtn: 'Get Coins',
    btnStart: '12,231',
    btnAmount: '$29.99',
    isStar: true,
    isOwned: false,
    className: '',
    isWishlist: true
  },
  {
    title: 'Super item 123',
    des: 'Increase your chances of winning with this lucky charm',
    labelBtn: 'Purchase',
    btnStart: '12,231',
    btnAmount: '$49.99',
    isStar: false,
    isOwned: true,
    className: '',
    isWishlist: true
  },
  {
    title: 'Super item 123',
    des: 'Increase your chances of winning with this lucky charm',
    labelBtn: 'Purchase',
    btnStart: '12,231',
    btnAmount: '$49.99',
    isStar: false,
    isOwned: true,
    className: '',
    isWishlist: true
  },
  {
    title: 'Super item 123',
    des: 'Get 1,000,000 coins instantly',
    labelBtn: 'Get Coins',
    btnStart: '12,231',
    btnAmount: '$29.99',
    isStar: true,
    isOwned: false,
    className: '',
    isWishlist: true,
    imgPosition: <img src={lightGreen} className="absolute right-0 bottom-0 " />
  },
  {
    title: 'Super item 123',
    des: 'Increase your chances of winning with this lucky charm',
    labelBtn: 'Purchase',
    btnStart: '12,231',
    btnAmount: '$49.99',
    isStar: false,
    isOwned: true,
    className: '',
    isWishlist: true,
    imgPosition: (
      <img src={lightGreen2} className="absolute right-0 bottom-0 " />
    )
  },
  {
    title: 'Super item 123',
    des: 'Increase your chances of winning with this lucky charm',
    labelBtn: 'Purchase',
    btnStart: '12,231',
    btnAmount: '$49.99',
    isStar: false,
    isOwned: true,
    className: '',
    isWishlist: true,
    imgPosition: <img src={lightBlue} className="absolute right-0 bottom-0 " />
  },
  {
    title: 'Super item 123',
    des: 'Get 1,000,000 coins instantly',
    labelBtn: 'Get Coins',
    btnStart: '12,231',
    btnAmount: '$29.99',
    isStar: true,
    isOwned: false,
    className: '',
    isWishlist: true,
    imgPosition: <img src={lightPink} className="absolute right-0 bottom-0 " />
  },
  {
    title: 'Super item 123',
    des: 'Increase your chances of winning with this lucky charm',
    labelBtn: 'Purchase',
    btnStart: '12,231',
    btnAmount: '$49.99',
    isStar: false,
    isOwned: true,
    className: '',
    isWishlist: true,
    imgPosition: (
      <img src={lightorange} className="absolute right-0 bottom-0 " />
    )
  }
]
