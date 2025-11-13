export const checkProcessing = (mode: string, bankName: string) => {
  if (mode === 'bank-card' && bankName) {
    return true
  }
  return false
}
