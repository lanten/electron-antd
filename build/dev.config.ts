import path from 'path'

const devConfig = {
  host: '127.0.0.1',
  port: 13311,
  mainSource: path.resolve(__dirname, '../app/electron'),
  rendererSource: path.resolve(__dirname, '../app/src'),
  template: path.resolve(__dirname, '../app/src/index.html'),
  dist: path.resolve(__dirname, '../dist'),

  proxy: {},

  alias: {
    '@': path.resolve(__dirname, '../app'),
  },

  provide: {
    // $api: path.resolve(__dirname, '../src/api'),
    // $app: path.resolve(__dirname, '../src/utils/app'),
    // $const: path.resolve(__dirname, '../src/utils/const'),
  },

  env: {
    mock: {
      publicPath: '',
      variables: {
        API_BASE_PATH: '/mock/55986',
        SSO_LOGIN_URL: '//jsonplaceholder.typicode.com/login/',
      },
    },
    dev: {
      publicPath: '',
      variables: {
        API_BASE_PATH: '/gateway/api',
        SSO_LOGIN_URL: '//jsonplaceholder.typicode.com/login/',
      },
    },

    prod: {
      publicPath: '',
      variables: {
        API_BASE_PATH: '/gateway/api',
        SSO_LOGIN_URL: '//jsonplaceholder.typicode.com/login/',
      },
    },
  },
}

export default devConfig
