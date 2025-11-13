import ArrowDown from '@/assets/icons/arrowDown'
import ArrowUp from '@/assets/icons/arrowUp'
import CustomButton from '@/components/common/custom-button'
import React, { useState } from 'react'

interface FaqQuestionProps {
  data: {
    title: string
    content: React.ReactNode
  }[]
}

const FaqQuestion: React.FC<FaqQuestionProps> = ({ data }) => {
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
    <div className="self-stretch flex-col justify-start items-start gap-5 flex w-full">
      {data.map((item, index) => (
        <div
          key={index}
          className="self-stretch pb-5 border-b border-[#2F2548] flex-col gap-5 flex w-full"
        >
          <div
            className="self-stretch justify-between items-center inline-flex gap-4 w-full cursor-pointer z-10"
            onClick={() => toggleQuestion(index)}
          >
            <div className="text-white text-2xl font-black font-['Satoshi']">
              {item.title}
            </div>

            <div className="cursor-pointer">
              {openStates[index] ? (
                <CustomButton
                  variant="muted"
                  prefixIcon={<ArrowDown />}
                  // onClick={() => toggleQuestion(index)}
                />
              ) : (
                <CustomButton
                  variant="muted"
                  prefixIcon={<ArrowUp />}
                  // onClick={() => toggleQuestion(index)}
                />
              )}
            </div>
          </div>

          {openStates[index] && (
            <div className="self-stretch text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default FaqQuestion
