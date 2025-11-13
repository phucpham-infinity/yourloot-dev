import { ReactNode, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface HoverTooltipProps {
  content: ReactNode
  children: React.ReactElement
  offset?: number
}

function HoverTooltip({ content, children, offset = 8 }: HoverTooltipProps) {
  const triggerRef = useRef<HTMLSpanElement | null>(null)
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0
  })

  useEffect(() => {
    if (!open) return
    const onScrollOrResize = () => {
      const rect = triggerRef.current?.getBoundingClientRect()
      if (!rect) return
      setPos({
        top: rect.top + window.scrollY - offset,
        left: rect.left + rect.width / 2 + window.scrollX
      })
    }
    onScrollOrResize()
    window.addEventListener('scroll', onScrollOrResize, true)
    window.addEventListener('resize', onScrollOrResize)
    return () => {
      window.removeEventListener('scroll', onScrollOrResize, true)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [open, offset])

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="inline-flex"
      >
        {children}
      </span>
      {open &&
        createPortal(
          <div
            className="fixed z-[100000]"
            style={{
              top: pos.top,
              left: pos.left,
              transform: 'translate(-50%, -100%)'
            }}
          >
            <div className="w-44 p-3 bg-[#191524] rounded-[10px] border border-app-default inline-flex flex-col justify-start items-start mr-6">
              <div className="self-stretch justify-center text-[#9E90CF] text-xs font-medium leading-[12px]">
                {content}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

export default HoverTooltip
