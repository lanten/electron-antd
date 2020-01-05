import { initRenderer } from '@/core/renderer.init'

async function startRenderer() {
  await initRenderer()
  await import('./renderer')
}

startRenderer()
