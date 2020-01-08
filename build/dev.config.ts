import path from 'path'

const devConfig = {
  host: '127.0.0.1',
  port: 13311,
  mainSource: path.resolve(__dirname, '../app/electron'),
  rendererSource: path.resolve(__dirname, '../app/src'),
  template: path.resolve(__dirname, '../app/src/index.html'),
  dist: path.resolve(__dirname, '../dist'),
  release: path.resolve(__dirname, '../release'),

  proxy: {},

  env: {
    // mock 环境变量
    mock: {
      variables: {
        API_PROTOCOL: 'http://',
        API_HOST: 'yapi.demo.qunar.com',
        API_BASE_PATH: '/mock/55986',
      },
    },

    // dev 环境变量 (npm run dev 将使用此配置)
    dev: {
      variables: {
        API_PROTOCOL: 'http://',
        API_HOST: 'yapi.demo.qunar.com',
        API_BASE_PATH: '/mock/55986',
      },
    },

    // prod 环境变量 (npm run build 将使用此配置)
    prod: {
      variables: {
        API_PROTOCOL: 'http://',
        API_HOST: 'yapi.demo.qunar.com',
        API_BASE_PATH: '/mock/55986',
      },
    },
  },
}

export default devConfig
