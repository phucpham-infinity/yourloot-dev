import HelpIcon from '@/assets/icons/help.tsx'
import QuestionIcon from '@/assets/icons/question'
import InstructionsS1 from '@/assets/images/instructions-s1.svg'
import CustomButton from '@/components/common/custom-button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'

export default function InstructionsButton() {
  const [step, setStep] = useState(0)
  const { t } = useTranslation()

  return (
    <Dialog
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setTimeout(() => {
            setStep(0)
          }, 300)
        }
      }}
    >
      <DialogTrigger asChild>
        <CustomButton
          variant="muted"
          prefixIcon={<HelpIcon className="mr-0 lg:mr-[10px]" />}
          className="w-fit lg:w-[140px]"
          label={isMobile ? '' : t('withdraw.instructions')}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-app-white bg-transparent border-none p-0">
        <DialogHeader style={{ display: 'none' }}>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col w-full items-start gap-10 p-10 relative bg-white rounded-[20px] overflow-hidden border border-solid border-[#3b315b] [background:radial-gradient(50%_50%_at_50%_50%,rgb(54.21,44.03,90.31)_0%,rgb(23.63,21.2,38.25)_100%)]">
          <div className="flex items-start justify-between w-full">
            <QuestionIcon />
          </div>
          {step === 0 && <Step1 key="step1" onNext={() => setStep(1)} />}
          <AnimatePresence mode="wait">
            {step === 1 && <Step2 key="step2" />}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Step1({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col relative gap-10">
      <div className="flex flex-col items-start gap-5 flex-[0_0_auto] relative self-stretch w-full">
        <div className="relative w-fit text-app-main-20">Instructions</div>

        <p className="relative self-stretch text-app-medium-12 text-app-pale">
          Here&#39;s a quick guide to depositing with crypto:
        </p>
      </div>

      <div className="flex flex-col items-start gap-5 flex-[0_0_auto] relative self-stretch w-full">
        <div className="relative w-fit text-app-main-20  text-app-white">
          Step 1
        </div>

        <p className="relative self-stretch text-app-medium-12 text-app-pale">
          Here&#39;s a quick guide to depositing with crypto: First, choose a
          cryptocurrency exchange.
        </p>
      </div>
      <img
        className="w-full rounded-[20px]"
        alt="Icon question"
        src={InstructionsS1}
      />

      <div className="flex items-start gap-2.5 flex-[0_0_auto] relative self-stretch w-full">
        <DialogClose asChild>
          <CustomButton className={'w-1/2'} variant={'muted'} label={'Close'} />
        </DialogClose>
        <CustomButton className={'w-1/2'} onClick={onNext} label={'Next'} />
      </div>
    </div>
  )
}

// 🔹 Step 2: Chỉ có nút Close
function Step2() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="w-full flex flex-col items-center gap-5"
    >
      <div className="flex flex-col items-start gap-[40px]  relative w-full">
        <div className="flex flex-col items-start gap-[20px]  relative w-full">
          <div className="relative w-fit text-app-main-20  text-app-white">
            Step 2
          </div>

          <p className="relative self-stretch text-app-medium-12 text-app-pale">
            Then, create an account and verify your identity. Next, select the
            crypto you want to deposit and generate a wallet address. Finally,
            send your crypto to that address and wait for the transaction to
            confirm!
          </p>
        </div>

        <img
          className="w-full rounded-[20px]"
          alt="Icon question"
          src={InstructionsS1}
        />

        <DialogClose asChild>
          <CustomButton className="w-full" label="Close" />
        </DialogClose>
      </div>
    </motion.div>
  )
}
