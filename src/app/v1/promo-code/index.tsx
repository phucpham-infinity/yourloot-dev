import CodeSearchBar from '@/app/v1/promo-code/component/CodeSearchBar'
import PromocodeLeftSide from '@/app/v1/promo-code/component/PromocodeLeftSide'
import PromocodeRightSide from '@/app/v1/promo-code/component/PromocodeRightSide'
import { useState } from 'react'

export default function PromoCodePage() {
  const [searchedCode, setSearchedCode] = useState<string>('')
  return (
    <div className="w-full ">
      <CodeSearchBar onSearch={setSearchedCode} />
      <div className="w-full inline-flex max-lg:flex-col justify-between items-start gap-10">
        <PromocodeLeftSide searchedCode={searchedCode} />
        <PromocodeRightSide />
      </div>
    </div>
  )
}
