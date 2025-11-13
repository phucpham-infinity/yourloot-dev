import CloseIcon from '@/assets/icons/close'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { cn, css } from '@/lib/utils'

interface DialogAuthProps {
  isOpen: boolean
  title?: React.ReactNode
  content?: React.ReactNode
  className?: string
  dismissible?: boolean
  onClose?: () => void
  hideCloseButton?: boolean
}

export function DialogAuth({
  isOpen,
  title,
  content,
  className,
  dismissible = true,
  onClose,
  hideCloseButton = false
}: DialogAuthProps) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && dismissible) {
          if (onClose) onClose()
        }
      }}
    >
      <DialogContent
        css={styledHeader}
        style={{ zIndex: 1000 }}
        className={cn('p-0 bg-transparent border-0', className)}
        onPointerDownOutside={(e: any) => {
          if (!dismissible) e.preventDefault()
        }}
      >
        <DialogHeader className="outline-0 h-12 relative">
          <DialogTitle className="w-full h-full flex items-center justify-center text-center text-white text-base font-medium">
            {title}
          </DialogTitle>
          {!hideCloseButton && (
            <DialogClose
              className="absolute outline-0 cursor-pointer right-6 top-4 text-white"
              onClick={() => {
                if (onClose) onClose()
              }}
            >
              <CloseIcon />
            </DialogClose>
          )}
        </DialogHeader>
        <div className="p-4 border-t border-t-[#2a2242] w-full overflow-y-auto">
          {content && content}
        </div>
      </DialogContent>
    </Dialog>
  )
}

const styledHeader = css`
  // width: 608px;
  // width: fit-content;
  width: 100%;
  max-width: 768px;
  min-width: 350px;
  // max-height: 481px;
  border: 1px solid #2a2242;
  background: #0b0a11;
  backdrop-filter: blur(10px);
  gap: 0;
`
