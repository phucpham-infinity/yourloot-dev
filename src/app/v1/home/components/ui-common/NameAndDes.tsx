import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
  title: string
  des: string
  className?: string
}

const NameAndDes: React.FC<Props> = ({ title, des, className }) => {
  return (
    <div className={cn('flex flex-col gap-2.5', className)}>
      <div className="text-white text-xl font-black leading-5">{title}</div>
      {des && <div className="text-[#c5c0d7] text-sm font-medium">{des}</div>}
    </div>
  )
}

export default NameAndDes
