import React from 'react'
import { create } from 'zustand'

export enum DialogPosition {
  TopLeft = 'top-left',
  TopMiddle = 'top-middle',
  TopRight = 'top-right',
  TopStart = 'top-start',
  TopEnd = 'top-end',
  CenterLeft = 'center-left',
  CenterMiddle = 'center-middle',
  CenterRight = 'center-right',
  CenterStart = 'center-start',
  CenterEnd = 'center-end',
  BottomLeft = 'bottom-left',
  BottomMiddle = 'bottom-middle',
  BottomRight = 'bottom-right',
  BottomStart = 'bottom-start',
  BottomEnd = 'bottom-end'
}
type DialogType =
  | 'successful'
  | 'failure'
  | 'warning'
  | 'purchase'
  | 'congratulation'
  | 'loading'
  | 'notification'

interface IDialogStore {
  isOpen: boolean
  content: React.ReactNode
  header?: React.ReactNode
  width?: number | string
  height?: number | null
  disabledCloseOverlay?: boolean
  noBorder?: boolean
  meta: any

  isOpenBasic: boolean
  metaBasic: any
  type: DialogType | null

  config: {
    target?: React.RefObject<HTMLElement>
    offset?: [number, number]
    anchor?: DialogPosition
    self?: DialogPosition
  } | null
  open: (props: {
    content: React.ReactNode
    header?: React.ReactNode
    meta?: any
    config?: any
    width?: number | string
    height?: number
    disabledCloseOverlay?: boolean
    noBorder?: boolean
  }) => void
  close: () => void
  openBasicDialog: ({ type, meta }: { type: DialogType; meta: any }) => void
  closeBasicDialog: () => any
}

export const useDialogStore = create<IDialogStore>()((set) => ({
  // State
  isOpen: false,
  content: null,
  header: null,
  meta: null,
  config: null,
  width: 400,
  height: null,
  disabledCloseOverlay: false,
  noBorder: false,

  type: null,
  isOpenBasic: false,
  metaBasic: null,

  // Actions
  open: ({
    content,
    meta,
    config,
    width,
    height,
    header,
    disabledCloseOverlay,
    noBorder
  }) =>
    set({
      isOpen: true,
      content,
      meta,
      config,
      width: width,
      height: height,
      header,
      disabledCloseOverlay,
      noBorder: !!noBorder
    }),
  close: () => {
    set({
      isOpen: false,
      content: null,
      header: null,
      meta: null,
      width: 400,
      height: null,
      disabledCloseOverlay: false,
      noBorder: false
    })
  },

  openBasicDialog: ({ type, meta }) =>
    set({ type, metaBasic: meta, isOpenBasic: true }),
  closeBasicDialog: () =>
    set({ type: null, metaBasic: null, isOpenBasic: false })
}))
