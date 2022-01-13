import React from 'react'

interface AsyncImportProps extends PageProps {
  element: Promise<any>
  hook?: RouterHook
}

/**
 * 异步导入组件
 * @param importComponent
 * @param hook // 这里的 hook 指的是路由钩子
 */
export const AsyncImport: React.FC<AsyncImportProps> = ({ element, hook, ...props }) => {
  const [lazyElement, setLazyElement] = React.useState<React.ReactElement | null>(null)

  React.useEffect(() => {
    /// 非静态路由重置组件
    /// WARN: 存在性能隐患
    if (!props.isStatic) setLazyElement(null)

    element?.then(({ default: Page }) => {
      const next = () => setLazyElement(<Page {...props} />)
      if (hook) {
        const hookRes = hook(props || {}, next)
        if (typeof hookRes === 'boolean' && hookRes) {
          next()
        }
      } else {
        next()
      }
    })
  }, [element, props.isStatic ? void 0 : props.location.key])

  return lazyElement
}
