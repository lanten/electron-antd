declare namespace JSX {
  // 自定义 jsx 标签 (全局组件)
  interface IntrinsicElements {
    // Navbar: any
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: 'development' | 'production' | 'none'
    BUILD_ENV?: 'mock' | 'dev' | 'prod'

    /** API 根路径 */
    API_BASE_PATH: string
    /** 单点登录地址 */
    SSO_LOGIN_URL: string
    /** 项目名称 */
    PROJECT_NAME: string
    /** 项目标题 */
    PROJECT_TITLE: string
  }
}
