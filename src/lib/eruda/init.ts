export async function initEruda(): Promise<void> {
  if (import.meta.env.VITE_MOBILE_DEBUG !== 'true') return
  const { default: eruda } = await import('eruda')
  eruda.init()
  eruda.position({ x: window.innerWidth - 50, y: window.innerHeight - 50 })
}
