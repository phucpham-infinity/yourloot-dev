import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

import { ReactNode } from 'react'

interface CommonDrawerProps {
  title?: string
  description?: string
  children: ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
  direction?: 'top' | 'bottom' | 'left' | 'right'
  classNameContent?: string
}

export default function CommonDrawer({
  title,
  description,
  children,
  open,
  onOpenChange,
  direction = 'bottom',
  classNameContent
}: CommonDrawerProps) {
  return (
    <Drawer
      repositionInputs={true}
      open={open}
      onOpenChange={onOpenChange}
      direction={direction}
    >
      <DrawerContent
        className={cn(
          'bg-[#0B0A11] border-app-default text-white h-[85dvh]',
          classNameContent
        )}
      >
        <DrawerClose className="absolute right-4 top-4 rounded-full p-2 hover:bg-muted">
          <X className="h-4 w-4 text-[#9f90cf]" />
        </DrawerClose>

        {(title || description) && (
          <DrawerHeader>
            {title && (
              <DrawerTitle className="text-white text-[16px] font-medium">
                {title}
              </DrawerTitle>
            )}
            {description && (
              <DrawerDescription>{description}</DrawerDescription>
            )}
          </DrawerHeader>
        )}

        <div className="h-[2px] w-full bg-[rgba(92,70,123,0.5)]" />
        <div className="p-4 overflow-y-scroll">{children}</div>
      </DrawerContent>
    </Drawer>
  )
}
