import * as React from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface DialogContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DialogContext = React.createContext<DialogContextValue | null>(null)

function useDialogContext() {
  const context = React.useContext(DialogContext)
  if (!context) {
    throw new Error('Dialog components must be used within a Dialog')
  }
  return context
}

interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

function Dialog({ open = false, onOpenChange, children }: DialogProps) {
  return (
    <DialogContext.Provider
      value={{ open, onOpenChange: onOpenChange || (() => {}) }}
    >
      {children}
    </DialogContext.Provider>
  )
}

interface DialogTriggerProps {
  children: React.ReactNode
  asChild?: boolean
}

function DialogTrigger({ children, asChild }: DialogTriggerProps) {
  const { onOpenChange } = useDialogContext()

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: (e: React.MouseEvent) => {
        onOpenChange?.(true)
        ;(children.props as any).onClick?.(e)
      }
    } as any)
  }

  return <button onClick={() => onOpenChange?.(true)}>{children}</button>
}

interface DialogPortalProps {
  children: React.ReactNode
  containerId: string
}

function DialogPortal({ children, containerId }: DialogPortalProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const resolvedContainer = document.getElementById(containerId)
  if (!resolvedContainer) return null
  return createPortal(children, resolvedContainer)
}

interface DialogOverlayProps {
  className?: string
  onClick?: () => void
}

function DialogOverlay({ className, onClick }: DialogOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.2,
        exit: { duration: 0.1 }
      }}
      className={cn(
        'absolute top-0 left-0 w-full h-full z-[5] bg-[#040305]',
        className
      )}
      onClick={onClick}
    />
  )
}

interface DialogContentProps {
  className?: string
  children: React.ReactNode
  onClose?: () => void
  container?: Element | null
  name?: string
  containerId: string
}

function DialogContent({
  className,
  children,
  onClose,
  containerId
}: DialogContentProps) {
  const { open, onOpenChange } = useDialogContext()

  return (
    <DialogPortal containerId={containerId}>
      <AnimatePresence>
        {open && (
          <>
            <DialogOverlay
              onClick={() => {
                onOpenChange?.(false)
                onClose?.()
              }}
            />
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{
                duration: 0.2,
                ease: 'easeInOut',
                exit: { duration: 0.1 }
              }}
              className={cn('absolute top-0 left-0 z-[6] w-full', className)}
              role="dialog"
              aria-modal="true"
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </DialogPortal>
  )
}

export { Dialog, DialogTrigger, DialogPortal, DialogOverlay, DialogContent }
