export const envNames = <const>['dev', 'prod']

export type EnvNames = typeof envNames[number]

export interface EnvVariables {
  /** API 地址 */
  API_GATEWAY?: string
}

export interface CommonEnvVariables {
  /** Node 启动参数 */
  NODE_ENV: 'development' | 'production'
  /** 构建参数 */
  BUILD_ENV: EnvNames
  /** 项目名称 */
  PROJECT_NAME?: string
  /** 项目标题 */
  PROJECT_TITLE?: string
}

/** 公共环境变量 */
export const COMMON_ENV: CommonEnvVariables = {
  BUILD_ENV: process.env.BUILD_ENV as EnvNames,
  NODE_ENV: process.env.NODE_ENV as CommonEnvVariables['NODE_ENV'],
  PROJECT_NAME: process.env.npm_package_name,
  PROJECT_TITLE: 'Electron Antd Template',
}

export const env: { [key in EnvNames]: EnvVariables } = {
  // dev 环境变量 (npm run dev 将使用此配置)
  dev: {
    API_GATEWAY: 'http://yapi.baidu.com/mock/17714',
  },

  // prod 环境变量 (npm run build 将使用此配置)
  prod: {
    API_GATEWAY: 'http://yapi.baidu.com/mock/17714',
  },
}
