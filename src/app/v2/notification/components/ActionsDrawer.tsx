import { CustomDrawer } from '@/components/common/custom-drawer'
import CustomButton from '@/components/common/custom-button'

interface ActionsDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onMarkAsRead: () => void
  onDelete: () => void
}

const ActionsDrawer = ({ open, onOpenChange, onMarkAsRead, onDelete }: ActionsDrawerProps) => {
  return (
    <CustomDrawer hideHeader open={open} onOpenChange={onOpenChange} title="" contentClassName="border-none" bodyClassName="py-6 px-0">
      <div className="w-full flex justify-center">
        <div className="w-96 mx-auto bg-zinc-950 rounded-tl-[20px] rounded-tr-[20px] backdrop-blur-lg inline-flex flex-col justify-start items-center">
          <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
            <CustomButton
              onClick={onMarkAsRead}
              variant="muted"
              label="Mark as read"
              className="self-stretch h-10"
            />
            <CustomButton
              onClick={onDelete}
              variant="muted-danger"
              label="Delete"
              className="self-stretch h-10"
            />
          </div>
        </div>
      </div>
    </CustomDrawer>
  )
}

export default ActionsDrawer
