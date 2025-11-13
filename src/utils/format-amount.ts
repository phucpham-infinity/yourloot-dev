
export default function formatAmount(amount?: number | string) {
    return Number(typeof amount !== "string" ? amount?.toFixed(2) : amount).toLocaleString()
}
