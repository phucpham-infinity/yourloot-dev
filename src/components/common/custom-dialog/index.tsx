import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogHeader
} from '@/components/ui/dialog'
import { cn, css } from '@/lib/utils'
import { DialogPosition, useDialogStore } from '@/store/slices/dialog'
import { useEffect, useRef, useState } from 'react'

export const CustomDialog = () => {
    const {
        isOpen,
        close,
        config,
        width,
        height,
        content,
        header,
        disabledCloseOverlay,
        noBorder
    } = useDialogStore()

    const [targetRect, setTargetRect] = useState<DOMRect | null>(null)
    const dialogRef = useRef<HTMLDivElement | null>(null)
    const [dialogSize, setDialogSize] = useState<{
        width: number
        height: number
    } | null>(null)

    const [dialogStyle, setDialogStyle] = useState<any>({})
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (dialogRef.current) {
                const { offsetWidth, offsetHeight } = dialogRef.current
                setDialogSize({ width: offsetWidth, height: offsetHeight })
            }
        }, 1)
        return () => clearTimeout(timeoutId)
    }, [isOpen, dialogRef.current])

    useEffect(() => {
        if (!isOpen) {
            setDialogStyle({})
            setIsVisible(false)
            setDialogSize(null)
            setTargetRect(null)
        } else {
            if (!config?.target) setIsVisible(true)
        }
    }, [isOpen])

    useEffect(() => {
        if (isOpen && config?.target) {
            const rect = config?.target.current?.getBoundingClientRect()
            if (rect) setTargetRect(rect)
        }
    }, [isOpen, config])

    useEffect(() => {
        if (targetRect && dialogSize) {
            if (!config?.target) {
                return
            }
            const { top, left, width, height } = targetRect
            const { width: dialogWidth, height: dialogHeight } = dialogSize

            let computedTop = top
            let computedLeft = left

            switch (config?.anchor) {
                case DialogPosition.TopLeft:
                    computedTop = top
                    computedLeft = left
                    break
                case DialogPosition.TopMiddle:
                    computedTop = top
                    computedLeft = left + width / 2
                    break
                case DialogPosition.TopRight:
                    computedTop = top
                    computedLeft = left + width
                    break
                case DialogPosition.CenterLeft:
                    computedTop = top + height / 2
                    computedLeft = left
                    break
                case DialogPosition.CenterMiddle:
                    computedTop = top + height / 2
                    computedLeft = left + width / 2
                    break
                case DialogPosition.CenterRight:
                    computedTop = top + height / 2
                    computedLeft = left + width
                    break
                case DialogPosition.BottomLeft:
                    computedTop = top + height
                    computedLeft = left
                    break
                case DialogPosition.BottomMiddle:
                    computedTop = top + height
                    computedLeft = left + width / 2
                    break
                case DialogPosition.BottomRight:
                    computedTop = top + height
                    computedLeft = left + width
                    break
            }

            switch (config?.self) {
                case DialogPosition.TopLeft:
                    computedTop -= dialogHeight
                    computedLeft -= dialogWidth
                    break
                case DialogPosition.TopMiddle:
                    computedTop -= dialogHeight
                    computedLeft -= dialogWidth / 2
                    break
                case DialogPosition.TopRight:
                    computedTop -= dialogHeight
                    break
                case DialogPosition.CenterLeft:
                    computedLeft -= dialogWidth
                    computedTop -= dialogHeight / 2
                    break
                case DialogPosition.CenterMiddle:
                    computedLeft -= dialogWidth / 2
                    computedTop -= dialogHeight / 2
                    break
                case DialogPosition.CenterRight:
                    computedTop -= dialogHeight / 2
                    break
                case DialogPosition.BottomLeft:
                    computedLeft -= dialogWidth
                    break
                case DialogPosition.BottomMiddle:
                    computedLeft -= dialogWidth / 2
                    break
                case DialogPosition.BottomRight:
                    break
            }

            computedLeft += config?.offset?.[0] ?? 0
            computedTop += config?.offset?.[1] ?? 0

            setDialogStyle({
                top: `${computedTop}px`,
                left: `${computedLeft}px`
            })

            const timeoutId = setTimeout(() => {
                setIsVisible(true)
            }, 200)

            return () => clearTimeout(timeoutId)
        }
    }, [targetRect, dialogSize, config])

    return (
        <Dialog
            open={isOpen}
            onOpenChange={disabledCloseOverlay ? () => {} : close}
        >
            <DialogContent
                ref={dialogRef}
                style={{
                    ...dialogStyle,
                    opacity: isVisible ? 1 : 0,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    position: config?.target ? 'absolute' : 'none',
                    padding: 0,
                    width: width,
                    maxWidth: width,
                    zIndex: 999
                }}
                className={cn({
                    'translate-x-0 translate-y-0 relative': config?.target
                })}
            >
                <DialogHeader style={{ display: 'none' }}>
                    <DialogTitle></DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <div
                    style={{ width: width, maxWidth: width }}
                    className="flex flex-col justify-start items-start gap-2"
                >
                    {header && <div className="w-full">{header}</div>}
                    <div
                        css={styleFn({ width: width, height: height, noBorder })}
                        className="w-full h-full"
                    >
                        {content}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

const styleFn = ({ width, height, noBorder }: any) => css`
  display: flex;
  width: ${width}px;
  max-width: ${width}px;
  height: ${height}px;
  max-height: ${height}px;
  overflow: ${noBorder ? 'visible' : 'auto'};
  padding: 0;
  border-radius: ${noBorder ? '0px' : '20px'};
  border: ${noBorder ? 'none' : '1px solid #544478'};
  outline: none !important;

  background: ${noBorder ? 'transparent' : '#09090b'};
`
