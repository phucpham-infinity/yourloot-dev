import { useTranslation } from 'react-i18next'

export const ManageFunds = () => {
  const { t } = useTranslation()
  return <div>{t('wallet.manageFunds.title')}</div>
}
export default ManageFunds
