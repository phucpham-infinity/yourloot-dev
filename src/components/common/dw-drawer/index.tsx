import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose
} from '@/components/ui/drawer'
import { Separator } from '@/components/ui/separator'
import CloseIcon from '@/assets/icons/close'
import BackIcon from '@/assets/icons/back'
import { cn } from '@/lib/utils'
import { useScreen } from '@/hooks'
import { DrawerDesktop } from './desktop'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger
} from '@/components/ui/dialog'
import clsx from 'clsx'

export function CustomDrawer(props: {
  hideHeader?: boolean
  children: React.ReactNode
  childrenTrigger?: React.ReactNode
  title: React.ReactNode
  contentClassName?: string
  contentClassNameDialog?: string
  bodyClassName?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  showBackButton?: boolean
  hideCloseButton?: boolean
  onBackButtonClick?: () => void
  name?: string
  type?: 'deposit' | 'withdraw'
  mode?: 'drawer' | 'dialog'
}) {
  const { isMobile } = useScreen()
  const {
    childrenTrigger,
    children,
    title,
    contentClassName,
    contentClassNameDialog,
    bodyClassName,
    open,
    onOpenChange,
    hideHeader,
    showBackButton,
    hideCloseButton,
    onBackButtonClick,
    name,
    mode
  } = props

  if (!isMobile && mode === 'drawer') {
    return (
      <div>
        <DrawerDesktop onOpenChange={onOpenChange} open={open} name={name}>
          {children}
        </DrawerDesktop>
      </div>
    )
  }

  if (!isMobile && mode === 'dialog') {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        {childrenTrigger && (
          <DialogTrigger asChild>{childrenTrigger}</DialogTrigger>
        )}
        <DialogContent
          className={clsx(
            'bg-[#0B0A11] text-white border-app-default p-0',
            contentClassNameDialog
          )}
        >
          {!hideHeader && (
            <DialogHeader className="flex flex-row items-center justify-between border-b border-b-[#2A2242] py-[16px] px-[16px]">
              <div className="cursor-pointer w-4 h-4 relative">
                {showBackButton && (
                  <BackIcon
                    className="cursor-pointer w-9 h-9 absolute left-[50%] top-[80%] translate-x-[-50%] translate-y-[-50%]"
                    onClick={onBackButtonClick}
                  />
                )}
              </div>
              <DialogTitle className="text-white">{title}</DialogTitle>

              <div className="w-4 h-4">
                {!hideCloseButton && (
                  <DrawerClose className="w-4 h-4" asChild>
                    <DialogClose className="w-4 h-4" asChild>
                      <CloseIcon className="w-4 h-4" />
                    </DialogClose>
                  </DrawerClose>
                )}
              </div>
            </DialogHeader>
          )}
          <div className="px-4 py-6">{children}</div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer
      repositionInputs={false}
      autoFocus={false}
      open={open}
      onOpenChange={onOpenChange}
    >
      {childrenTrigger && (
        <DrawerTrigger asChild>{childrenTrigger}</DrawerTrigger>
      )}
      <DrawerContent
        autoFocus={false}
        className={clsx(
          'bg-[#0B0A11] text-white border-app-default border-b-0 outline-0 backdrop-blur-2xl p-0 ',
          contentClassName
        )}
      >
        <div className="w-full h-[calc(100%-50px)]">
          {!hideHeader && (
            <DrawerHeader className="flex flex-row items-center justify-between">
              <div className="w-4 h-4 relative">
                {showBackButton && (
                  <BackIcon
                    className="w-9 h-9 absolute left-[50%] top-[80%] translate-x-[-50%] translate-y-[-50%]"
                    onClick={onBackButtonClick}
                  />
                )}
              </div>
              <DrawerTitle className="text-white">{title}</DrawerTitle>

              <div className="w-4 h-4">
                {!hideCloseButton && (
                  <DrawerClose className="w-4 h-4" asChild>
                    <CloseIcon className="w-4 h-4" />
                  </DrawerClose>
                )}
              </div>
            </DrawerHeader>
          )}
          <Separator className="h-[1px] bg-[#2A2242]" />
          <div className={cn('py-[24px] px-[16px]', bodyClassName)}>
            {children}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
