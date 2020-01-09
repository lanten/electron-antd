import { Rectangle } from 'electron'
import { CreateSettings } from './create-settings'
import { RouterKey } from '@/src/auto-routes'

type T = {
  [K in RouterKey]?: Rectangle
}

/** 窗口位置尺寸 */
export const windowBounds = new CreateSettings<T>('window-bounds')
