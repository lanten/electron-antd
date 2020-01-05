import path from 'path'

export const ASSETS_PATH = process.env.NODE_ENV === 'development' ? 'assets' : '../../assets'

export function asAssetsPath(pathStr: string) {
  return path.join(ASSETS_PATH, pathStr)
}
