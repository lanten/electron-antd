/**
 * 跳过 webpack 使用原生 require
 */
export let nativeRequire: (packageName: string) => any

try {
  nativeRequire =
    (global as any).__non_webpack_require__ === 'function'
      ? (global as any).__non_webpack_require__
      : eval('require')
} catch {
  nativeRequire = () => {
    throw new Error('Require Error!')
  }
}
