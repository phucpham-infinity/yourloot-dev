import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export function WithdrawIndex() {
  // const navigate = useNavigate()
  const { walletName } = useParams()

  useEffect(() => {
    // if (walletName === 'USD') {
    //   navigate('/withdraw/USD/bank-card')
    // } else if (walletName === 'EUR') {
    //   navigate('/withdraw/EUR/cryptocurrency')
    // } else if (walletName === 'RUB') {
    //   navigate('/withdraw/RUB/sbp')
    // } else {
    //   navigate('/withdraw/USD/bank-card')
    // }
  }, [walletName])
  return <div />
}
