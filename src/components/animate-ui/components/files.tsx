'use client'

import { FileIcon, FolderIcon, FolderOpenIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import * as React from 'react'

import {
  MotionHighlight,
  MotionHighlightItem
} from '@/components/animate-ui/effects/motion-highlight'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionItemProps,
  AccordionTrigger,
  AccordionTriggerProps,
  useAccordionItem
} from '@/components/animate-ui/radix/accordion'
import { cn } from '@/lib/utils'

// Function to truncate text based on pixel width
function truncateTextByWidth(
  text: string,
  maxWidth: number,
  fontSize: string = '12px',
  fontFamily: string = 'system-ui'
): string {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (!context) return text

  context.font = `${fontSize} ${fontFamily}`

  if (context.measureText(text).width <= maxWidth) {
    return text
  }

  let truncated = text
  while (
    context.measureText(truncated + '...').width > maxWidth &&
    truncated.length > 0
  ) {
    truncated = truncated.slice(0, -1)
  }

  return truncated + '...'
}

type FileButtonProps = React.ComponentProps<'div'> & {
  icons?: {
    close: React.ReactNode
    open: React.ReactNode
  }
  icon?: React.ReactNode
  open?: boolean
  sideComponent?: React.ReactNode
  isTwoLineLayout?: boolean
  isActive?: boolean
}

function FileButton({
  children,
  className,
  icons,
  icon,
  open,
  sideComponent,
  isTwoLineLayout = false,
  isActive = false,
  ...props
}: FileButtonProps) {
  return (
    <MotionHighlightItem className="size-full">
      <div
        data-slot="file-button"
        className={cn(
          'flex items-center truncate gap-2  h-10 relative z-10 w-full cursor-default',
          isTwoLineLayout && 'flex-col h-auto py-3 min-h-[70px]',
          isActive &&
            'before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-border before:content-[""]',
          className
        )}
        {...props}
      >
        {isTwoLineLayout ? (
          <>
            <div className={cn('flex items-center justify-center mb-1')}>
              {icon ? (
                typeof icon !== 'string' ? (
                  <div
                    className={cn(
                      isActive &&
                        'bg-gradient-custom bg-clip-text text-transparent [&_svg]:text-transparent [&_svg]:fill-current'
                    )}
                  >
                    {icon}
                  </div>
                ) : null
              ) : (
                icons && (
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={open ? 'open' : 'close'}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.9 }}
                      transition={{ duration: 0.15 }}
                      className={cn(
                        isActive &&
                          'bg-gradient-custom bg-clip-text text-transparent'
                      )}
                    >
                      {open
                        ? typeof icons.open !== 'string'
                          ? icons.open
                          : null
                        : typeof icons.close !== 'string'
                          ? icons.close
                          : null}
                    </motion.span>
                  </AnimatePresence>
                )
              )}
            </div>
            <div className="flex items-center justify-center w-full px-1">
              <span
                className={cn(
                  'block w-full text-xs text-center',
                  isActive && 'bg-gradient-custom bg-clip-text text-transparent'
                )}
                title={typeof children === 'string' ? children : ''}
              >
                {typeof children === 'string'
                  ? truncateTextByWidth(children, 58, '12px', 'system-ui')
                  : children}
              </span>
            </div>
            {sideComponent && (
              <div className="absolute top-1 right-1">{sideComponent}</div>
            )}
          </>
        ) : (
          <>
            <span
              className={cn(
                'flex [&_svg]:size-4 [&_svg]:shrink-0 items-center gap-2 shrink-1 truncate pl-[3px]'
              )}
            >
              {icon ? (
                typeof icon !== 'string' ? (
                  <div
                    className={cn(
                      isActive &&
                        'bg-gradient-custom bg-clip-text text-transparent [&_svg]:text-transparent [&_svg]:fill-current'
                    )}
                  >
                    {icon}
                  </div>
                ) : null
              ) : (
                icons && (
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={open ? 'open' : 'close'}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.9 }}
                      transition={{ duration: 0.15 }}
                      className={cn(
                        isActive &&
                          'bg-gradient-custom bg-clip-text text-transparent'
                      )}
                    >
                      {open
                        ? typeof icons.open !== 'string'
                          ? icons.open
                          : null
                        : typeof icons.close !== 'string'
                          ? icons.close
                          : null}
                    </motion.span>
                  </AnimatePresence>
                )
              )}
              <span
                className={cn(
                  'block text-sm break-words truncate shrink-1',
                  isActive && 'bg-gradient-custom bg-clip-text text-transparent'
                )}
              >
                {children}
              </span>
            </span>
            {sideComponent}
          </>
        )}
      </div>
    </MotionHighlightItem>
  )
}

type FilesProps = React.ComponentProps<'div'> & {
  children: React.ReactNode
  activeClassName?: string
  defaultOpen?: string[]
  open?: string[]
  onOpenChange?: (open: string[]) => void
}

function Files({
  children,
  className,
  activeClassName,
  defaultOpen,
  open,
  onOpenChange,
  ...props
}: FilesProps) {
  return (
    <div
      data-slot="files"
      className={cn('relative size-full   overflow-auto', className)}
      {...props}
    >
      <MotionHighlight
        controlledItems
        mode="parent"
        hover
        className={cn(
          'bg-muted rounded-[6px] pointer-events-none',
          activeClassName
        )}
      >
        <Accordion
          type="multiple"
          className="p-1"
          defaultValue={defaultOpen}
          value={open}
          onValueChange={onOpenChange}
        >
          {children}
        </Accordion>
      </MotionHighlight>
    </div>
  )
}

type FolderTriggerProps = AccordionTriggerProps & {
  sideComponent?: React.ReactNode
}

function FolderTrigger({
  children,
  className,
  sideComponent,
  ...props
}: FolderTriggerProps) {
  const { isOpen } = useAccordionItem()

  return (
    <AccordionTrigger
      data-slot="folder-trigger"
      className="relative z-10 h-auto max-w-full py-0 font-normal hover:no-underline"
      {...props}
      chevron={false}
    >
      <FileButton
        open={isOpen}
        icons={{ open: <FolderOpenIcon />, close: <FolderIcon /> }}
        className={className}
        sideComponent={sideComponent}
      >
        {children}
      </FileButton>
    </AccordionTrigger>
  )
}

type FolderProps = Omit<
  AccordionItemProps,
  'value' | 'onValueChange' | 'defaultValue' | 'children'
> & {
  children?: React.ReactNode
  name: string
  open?: string[]
  onOpenChange?: (open: string[]) => void
  defaultOpen?: string[]
  sideComponent?: React.ReactNode
}

function Folder({
  children,
  className,
  name,
  open,
  defaultOpen,
  onOpenChange,
  sideComponent,
  ...props
}: FolderProps) {
  return (
    <AccordionItem
      data-slot="folder"
      value={name}
      className="relative border-b-0"
      {...props}
    >
      <FolderTrigger className={className} sideComponent={sideComponent}>
        {name}
      </FolderTrigger>
      {children && (
        <AccordionContent className="relative pb-0 !ml-7 before:absolute before:-left-3 before:inset-y-0 before:w-px before:h-full before:bg-border">
          <Accordion
            type="multiple"
            defaultValue={defaultOpen}
            value={open}
            onValueChange={onOpenChange}
          >
            {children}
          </Accordion>
        </AccordionContent>
      )}
    </AccordionItem>
  )
}

type FileProps = Omit<React.ComponentProps<'div'>, 'children'> & {
  name: string
  sideComponent?: React.ReactNode
  icon?: React.ReactNode
  component?: React.ReactNode
  isTwoLineLayout?: boolean
  isActive?: boolean
}

function File({
  name,
  className,
  sideComponent,
  icon,
  component,
  isTwoLineLayout,
  isActive,
  ...props
}: FileProps) {
  return (
    component ?? (
      <FileButton
        data-slot="file"
        icon={icon ?? <FileIcon />}
        className={className}
        sideComponent={sideComponent}
        isTwoLineLayout={isTwoLineLayout}
        isActive={isActive}
        {...props}
      >
        {name}
      </FileButton>
    )
  )
}

export {
  File,
  Files,
  Folder,
  type FileProps,
  type FilesProps,
  type FolderProps
}
