import ArrowDown from '@/assets/icons/arrowDown'
import ArrowUp from '@/assets/icons/arrowUp'
import React, { useState } from 'react'
import { clsx } from 'clsx'
import './index.css'

interface FaqQuestionProps {
  data: {
    title: string
    content: React.ReactNode
  }[]
}

const FaqQuestionV2: React.FC<FaqQuestionProps> = ({ data }) => {
  const [openStates, setOpenStates] = useState<boolean[]>(
    new Array(data.length).fill(false)
  )

  const toggleQuestion = (index: number) => {
    setOpenStates((prev) => {
      const newStates = [...prev]
      newStates[index] = !newStates[index]
      return newStates
    })
  }

  return (
    <div className="flex flex-col items-start self-stretch justify-start w-full gap-4">
      {data.map((item, index) => (
        <div
          key={index}
          className={clsx(
            'self-stretch flex-col gap-4 flex w-full p-4 rounded-lg transition-colors duration-200',
            {
              'bg-[#191524]': openStates[index],
              'bg-transparent': !openStates[index]
            }
          )}
        >
          <div
            className="z-10 inline-flex items-center self-stretch justify-between w-full gap-4 cursor-pointer"
            onClick={() => toggleQuestion(index)}
          >
            <div className="text-white text-app-medium-14">{item.title}</div>
            <div className="cursor-pointer">
              {openStates[index] ? <ArrowDown /> : <ArrowUp />}
            </div>
          </div>

          {openStates[index] && (
            <div className="self-stretch text-[#c5c0d8] text-app-medium-12">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default FaqQuestionV2
