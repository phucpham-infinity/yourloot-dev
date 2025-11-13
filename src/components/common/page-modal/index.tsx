import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { css } from '@/lib/utils'
import { isMobile } from 'react-device-detect'

export const PageModal = ({
  children,
  onClose
}: {
  children: React.ReactNode
  onClose: () => void
}) => {
  return (
    <Dialog open={true}>
      <DialogHeader style={{ display: 'none' }}>
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <DialogContent css={styleDialogContent()} onClose={onClose}>
        {children}
      </DialogContent>
    </Dialog>
  )
}

const styleDialogContent = () => css`
  background: transparent;
  border: none;
  outline: none;
  padding: ${isMobile ? '0 20px' : '0'};
  width: ${isMobile ? '100%' : '800px'};
  max-width: 800px;
  min-width: ${isMobile ? '100vw' : 'auto'};
  display: flex;
  justify-content: center;
  align-items: center;

  display: flex;
  flex-direction: column;
`

export default PageModal
