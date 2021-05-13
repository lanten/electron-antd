interface AnyObj {
  [key: string]: any
}

/** 获取 Promise 返回值 */
type Awaited<T> = T extends Promise<infer U> ? U : never

/** 获取 Promise 返回值 (递归) */
type AwaitedDeep<T> = T extends Promise<infer U> ? (U extends Promise<unknown> ? Awaited<U> : U) : never

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: 'development' | 'production' | 'none'
    BUILD_ENV?: 'mock' | 'dev' | 'prod'

    /** API 协议 */
    API_PROTOCOL: string
    /** API 域名 */
    API_HOST: string
    /** API 根路径 */
    API_BASE_PATH: string
  }
}

declare const nodeRequire: NodeRequire
