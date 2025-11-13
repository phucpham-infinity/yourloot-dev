import React from 'react'
import { create } from 'zustand'

type DialogContent = {
  title?: string
  content?: React.ReactNode
  className?: string
  dismissible?: boolean
  closeCallback?: () => void
}

interface V2DialogStoreState extends DialogContent {
  // Basic Dialog
  isOpen: boolean
  open: (payload: DialogContent) => void
  close: (closeCallback?: () => void) => void

  // Payment Desktop Drawer
  isOpenPaymentDesktopDrawer: boolean
  paymentDesktopDrawerContent: React.ReactNode
  paymentDesktopDrawerMeta: any
  openPaymentDesktopDrawer: (payload: {
    paymentDesktopDrawerContent: React.ReactNode
    paymentDesktopDrawerMeta: any
  }) => void
  closePaymentDesktopDrawer: () => void
}

export const useV2DialogStore = create<V2DialogStoreState>()((set) => ({
  // Basic Dialog
  isOpen: false,
  title: '',
  content: null,
  dismissible: true,
  paymentDesktopDrawerContent: null,
  paymentDesktopDrawerMeta: {},
  open: ({ title, content, className, dismissible = true, closeCallback }) =>
    set({
      isOpen: true,
      title,
      content,
      className,
      dismissible,
      closeCallback
    }),
  close: (closeCallback = () => {}) => {
    set({ isOpen: false, title: '', content: null, closeCallback: undefined })
    if (closeCallback) closeCallback()
  },
  // Payment Desktop Drawer
  isOpenPaymentDesktopDrawer: false,
  openPaymentDesktopDrawer: ({
    paymentDesktopDrawerContent,
    paymentDesktopDrawerMeta
  }) =>
    set({
      isOpenPaymentDesktopDrawer: true,
      paymentDesktopDrawerContent,
      paymentDesktopDrawerMeta
    }),
  closePaymentDesktopDrawer: () =>
    set({
      isOpenPaymentDesktopDrawer: false,
      paymentDesktopDrawerContent: null,
      paymentDesktopDrawerMeta: {}
    })
}))
