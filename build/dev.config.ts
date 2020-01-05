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
    mock: {
      variables: {
        API_BASE_PATH: '/mock/55986',
        SSO_LOGIN_URL: '//jsonplaceholder.typicode.com/login/',
      },
    },
    dev: {
      variables: {
        API_BASE_PATH: '/gateway/api',
        SSO_LOGIN_URL: '//jsonplaceholder.typicode.com/login/',
      },
    },

    prod: {
      variables: {
        API_BASE_PATH: '/gateway/api',
        SSO_LOGIN_URL: '//jsonplaceholder.typicode.com/login/',
      },
    },
  },
}

export default devConfig
