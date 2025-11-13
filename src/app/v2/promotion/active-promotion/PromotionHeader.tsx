import ArrowLeft from '@/assets/icons/v2/ArrowLeft'
import { useNavigate } from 'react-router-dom'

interface PromotionHeaderProps {
  name: string
}

export default function PromotionHeader({ name }: PromotionHeaderProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/promotion')
  }

  return (
    <div className="pb-6 flex flex-col justify-start items-start gap-2.5 overflow-hidden w-full">
      <div
        data-bold="true"
        data-icon="true"
        className="h-4 inline-flex justify-center items-center"
      >
        <ArrowLeft
          width={26}
          height={26}
          className="mt-3"
          onClick={handleClick}
          style={{ cursor: 'pointer' }}
        />
        <span
          className="text-white text-base font-black font-['Satoshi'] flex items-center mr-3 cursor-pointer"
          onClick={handleClick}
        >
          {name}
        </span>
      </div>
    </div>
  )
}
