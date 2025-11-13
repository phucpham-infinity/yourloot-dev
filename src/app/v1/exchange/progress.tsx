import Loader from '@/components/common/loader'
import { css } from '@emotion/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ExchangeProcess() {
  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      navigate(`/exchange/done${location.search}`)
    }, 2000)
  }, [])

  return (
    <div css={styles} className="p-10 max-w-[390px] gap-10 flex flex-col">
      <div className={'flex items-start h-full'}>
        <Loader />
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-white text-xl font-black">Please wait</div>
        <div className="w-[270] text-[#c5c0d8] text-xs font-medium">
          System is working with your payment, it will take no more than couple
          of minutes
        </div>
      </div>
    </div>
  )
}

const styles = css`
  border-radius: 20px;
  background: radial-gradient(
    237.29% 116.82% at 60.95% -22.92%,
    #362c5a 0%,
    #181526 100%
  );
`
