const path = require('path')

const PROJECT_INFO = {
  name: 'electron-antd',
  title: 'electron-antd',
}

module.exports = {
  projectName: PROJECT_INFO.name,
  projectTitle: PROJECT_INFO.title,

  devHost: 'host.hrwork.com',

  port: 3311, // 不同的项目尽量使用不同的端口
  source: path.resolve(__dirname, '../src'),
  template: path.resolve(__dirname, '../src/index.html'),
  dist: path.resolve(__dirname, '../dist'),
  favicon: path.resolve(__dirname, '../src/assets/favicon.ico'),

  htmlConfig: {
    title: PROJECT_INFO.title,
    lang: 'zh-CN',
  },

  alias: {
    '@': path.resolve(__dirname, '../src'),
    '@root': path.resolve(__dirname, '../'),
  },

  provide: {
    $api: path.resolve(__dirname, '../src/api'),
    $app: path.resolve(__dirname, '../src/utils/app'),
    $const: path.resolve(__dirname, '../src/utils/const'),
  },

  proxy: {
    // 联调时的接口代理
    '/gateway/api': {
      target: 'https://jsonplaceholder.typicode.com/',
      changeOrigin: false,
      pathRewrite: {
        '/gateway/*': '/',
      },
    },
    // mock
    '/mock': {
      target: 'http://yapi.demo.qunar.com',
      changeOrigin: true,
    },
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
    daily: {
      publicPath: '',
      variables: {
        API_BASE_PATH: '/gateway/api',
        SSO_LOGIN_URL: '//jsonplaceholder.typicode.com/login/',
      },
    },
    gray: {
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
