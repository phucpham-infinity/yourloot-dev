import BackIcon from '@/assets/icons/back'
import CloseIcon from '@/assets/icons/close'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export function CustomDrawer(props: {
  hideHeader?: boolean
  children: React.ReactNode
  childrenTrigger?: React.ReactNode
  title: React.ReactNode
  contentClassName?: string
  bodyClassName?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  showBackButton?: boolean
  onBackButtonClick?: () => void
}) {
  const {
    childrenTrigger,
    children,
    title,
    contentClassName,
    bodyClassName,
    open,
    onOpenChange,
    hideHeader,
    showBackButton,
    onBackButtonClick
  } = props

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
        className={cn(
          'bg-[#0B0A11] max-h-[80vh] text-white border-app-default border-b-0 outline-0 backdrop-blur-2xl p-0',
          contentClassName
        )}
      >
        <div className="w-full">
          {!hideHeader && (
            <DrawerHeader className="flex flex-row items-center justify-between">
              <div className="relative w-4 h-4">
                {showBackButton && (
                  <BackIcon
                    className="w-9 h-9 absolute left-[50%] top-[80%] translate-x-[-50%] translate-y-[-50%]"
                    onClick={onBackButtonClick}
                  />
                )}
              </div>
              <DrawerTitle className="text-white">{title}</DrawerTitle>
              <DrawerClose asChild>
                <button className="w-8 h-8 flex items-center justify-center bg-transparent hover:bg-gray-800 rounded-md transition-colors">
                  <CloseIcon className="w-4 h-4" />
                </button>
              </DrawerClose>
            </DrawerHeader>
          )}
          <Separator className="h-[1px] bg-[#2A2242]" />
          <div
            className={cn(
              'py-[24px] px-[16px] overflow-y-scroll scrollbar-hide',
              bodyClassName
            )}
          >
            {children}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
