import { useEffect } from 'react'

const LogoGame = () => {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      (window as any).anj_5d6911d3_8548_4aeb_8508_7779bfd449f7
    ) {
      ;(window as any).anj_5d6911d3_8548_4aeb_8508_7779bfd449f7.init()
    }
  }, [])

  return (
    <div className="w-6 h-6">
      <div
        className="w-6 h-6"
        id="anj-5d6911d3-8548-4aeb-8508-7779bfd449f7"
        data-anj-seal-id="5d6911d3-8548-4aeb-8508-7779bfd449f7"
        data-anj-image-size="128"
        data-anj-image-type="basic-small"
      ></div>
    </div>
  )
}
export default LogoGame
