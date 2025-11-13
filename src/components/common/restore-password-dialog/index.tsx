import Logo from '@/assets/images/yourloot-logotype-full-horizontal.png'
import CustomButton from '@/components/common/custom-button'
import { EmailConfirmCodeDialog } from '@/components/common/email-confirm-code'
import { FormBuilder } from '@/components/common/form-builder'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog'
import { css } from '@/lib/utils'
import { useDialogStore } from '@/store'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'

export function RestorePasswordDialog({
  children,
  onSuccess
}: {
  children: React.ReactNode
  onSuccess?: () => void
}) {
  const formRef = useRef<any>(null)
  const formRef2 = useRef<any>(null)
  const [showPasswordInput, setShowPasswordInput] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dialog = useDialogStore()
  const handleSubmitLogin = () => {
    formRef?.current?.submit()
  }

  const { t } = useTranslation()

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(value) => {
        setIsOpen(value)
        if (!value)
          setTimeout(() => {
            setShowPasswordInput(false)
          }, 500)
      }}
    >
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-0 w-[390px]">
        <DialogHeader style={{ display: 'none' }}>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div
          css={styled}
          className="w-full flex flex-col items-start justify-center gap-10 p-10 relative bg-white overflow-hidden"
        >
          <img src={Logo} alt="logo" />
          <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
            <div className="relative self-stretch text-app-white text-app-main-20">
              {t('auth.passwordRestore')}
            </div>

            <p className="relative w-[289px] text-app-pale text-app-medium-12">
              {t('auth.enterEmail')}
            </p>
          </div>
          <div className="w-full">
            <FormBuilder
              gap={40}
              ref={formRef}
              fields={[
                {
                  name: 'email',
                  type: 'text',
                  label: 'Email:',
                  placeholder: 'example@example.com',
                  colSpan: 12,
                  description: (
                    <div className="w-full text-right underline cursor-pointer">
                      {t('auth.forgotEmail')}
                    </div>
                  ) as any
                  // validators: {
                  //   onSubmitAsync: async () => {
                  //     await delay(2000)
                  //     return (
                  //       <div className="w-full text-red-500 text-left">
                  //         Email already exists.
                  //       </div>
                  //     )
                  //   }
                  // }
                }
              ]}
              onSubmit={() => {
                if (!showPasswordInput) {
                  setShowPasswordInput(true)
                } else {
                  formRef2?.current?.submit()
                }
              }}
              defaultValues={{
                email: ''
              }}
            />
          </div>
          {showPasswordInput && (
            <AnimatePresence>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'linear' }}
                className="w-full pt-4"
              >
                <FormBuilder
                  gap={40}
                  ref={formRef2}
                  fields={[
                    {
                      name: 'password',
                      type: 'text',
                      label: t('auth.repeatPassword'),
                      placeholder: '******',
                      colSpan: 12
                    }
                  ]}
                  onSubmit={() => {
                    dialog.open({
                      width: isMobile ? '90vw' : 390,
                      content: (
                        <EmailConfirmCodeDialog
                          onSuccess={() => {
                            dialog.openBasicDialog({
                              type: 'successful',
                              meta: {
                                title: t('auth.passwordResetSuccessful'),
                                description: t(
                                  'auth.passwordResetCongratulations'
                                ),
                                button: (
                                  <div className={'w-full'}>
                                    <CustomButton
                                      onClick={() => {
                                        dialog.closeBasicDialog()
                                        dialog.close()
                                        setIsOpen(false)
                                        onSuccess?.()
                                      }}
                                      label={t('login.loginButton')}
                                    />
                                  </div>
                                )
                              }
                            })
                          }}
                        />
                      )
                    })
                  }}
                  defaultValues={{
                    email: ''
                  }}
                />
              </motion.div>
            </AnimatePresence>
          )}

          <div className={'w-full'}>
            <CustomButton onClick={handleSubmitLogin} label="Confirm" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export const styled = css`
  width: ${isMobile ? '90vw' : '390px'};
  border-radius: 20px;
  border: 1px solid #544a80;
  background: url('/images/dialog-bg.svg') no-repeat center center;
  background-size: cover;
  background-color: #362c5a;
`
