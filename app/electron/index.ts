import { initMain } from '@/core/main.init'

async function startApp() {
  await initMain()
  await import('./main')
}

startApp()
