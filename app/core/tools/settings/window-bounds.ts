import { Rectangle } from 'electron'
import { CreateSettings } from './create-settings'

type T = {
  [K in RouteName]?: {
    /** 窗口坐标 */
    rect: Rectangle
    /** 是否最大化 */
    maximized?: boolean
  }
}

/** 窗口位置尺寸 */
export const windowBounds = new CreateSettings<T>('window-bounds')
