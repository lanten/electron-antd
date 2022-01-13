import type { CommonEnvVariables, EnvVariables } from '../build/config/env.config'

declare global {
  const nodeRequire: NodeRequire

  type ReactDivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

  /** 获取 Promise 返回值 */
  type PromiseReturnType<T> = T extends Promise<infer U> ? U : never

  /** 获取 Promise 返回值 (递归) */
  type PromiseReturnTypeDeep<T> = T extends Promise<infer U>
    ? U extends Promise<unknown>
      ? PromiseReturnType<U>
      : U
    : never

  /** 使用此类型替代 any object */
  interface AnyObj {
    [key: string]: any
  }

  namespace NodeJS {
    /** 环境变量 */
    interface ProcessEnv extends CommonEnvVariables, EnvVariables {}
  }
}
