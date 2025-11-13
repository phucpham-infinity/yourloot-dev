// import React from 'react'
// import {css} from "@/lib/utils.ts";

// interface IMask {
//   onScrollLeft: () => void
//   scrollToRight: () => void
//   active: 'right' | 'left'
//     currentLeft: number
// }

// export default React.memo(function Mask({
//   onScrollLeft,
//   scrollToRight,
//     currentLeft
// }: IMask) {
//   return (
//     <>
//       <div
//         onMouseEnter={() => {
//           onScrollLeft()
//         }}
//         className={'absolute z-30 h-full  top-0 left-0 bg-gradient-to-r from-[#191523] to-[#191523]/0 w-[318px]'}
//         css={opacityLeft(currentLeft)}
//       ></div>

//       <div
//         onMouseEnter={() => {
//           scrollToRight()
//         }}
//         className={'absolute z-30 h-full top-0 right-0 bg-gradient-to-r from-[#191523]/0 to-[#191523] w-[318px]'}
//         css={opacityRight(currentLeft)}
//       />
//     </>
//   )
// })

// const opacityLeft = (currentLeft:number) => {
//     return css`
//         opacity: ${currentLeft/488};
//     `;
// }

// const opacityRight = (currentLeft:number) => {
//     return css`
//         opacity: ${(488- currentLeft)/488};
//     `;
// }

import { cn } from '@/lib/utils'
import React from 'react'

interface IMask {
  onScrollLeft: () => void
  scrollToRight: () => void
  active: 'right' | 'left'
}

export default React.memo(function Mask({
  onScrollLeft,
  scrollToRight,
  active
}: IMask) {
  return (
    <>
      <div
        onMouseEnter={() => {
          onScrollLeft()
        }}
        className={cn(
          'absolute w-0 z-30 h-full top-0 left-0 bg-gradient-to-r from-[#191523] to-[#191523]/0',
          active == 'right' && 'w-[250px]'
        )}
      ></div>

      <div
        onMouseEnter={() => {
          scrollToRight()
        }}
        className={cn(
          'w-0 z-30 h-full absolute top-0 right-0 bg-gradient-to-r from-[#191523]/0 to-[#191523]',
          active == 'left' && 'w-[250px]'
        )}
      />
    </>
  )
})
