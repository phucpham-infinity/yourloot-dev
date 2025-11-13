import { Dialog, DialogContent } from './dialog'

interface DrawerDesktopProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  name?: string
}

export const DrawerDesktop = (props: DrawerDesktopProps) => {
  const { children, open, onOpenChange, name } = props

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent containerId="payment-deposit-v2" name={name}>
        {children}
      </DialogContent>
    </Dialog>
  )
}
