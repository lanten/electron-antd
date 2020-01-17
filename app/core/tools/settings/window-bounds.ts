import { Rectangle } from 'electron'
import { CreateSettings } from './create-settings'

type T = {
  [K in RouterKey]?: Rectangle
}

/** 窗口位置尺寸 */
export const windowBounds = new CreateSettings<T>('window-bounds')
