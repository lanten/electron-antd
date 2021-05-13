const env = {
  // mock 环境变量
  mock: {
    variables: {
      API_PROTOCOL: 'http://',
      API_HOST: 'yapi.lanten.me',
      API_BASE_PATH: '/mock/4',
    },
  },

  // dev 环境变量 (npm run dev 将使用此配置)
  dev: {
    variables: {
      API_PROTOCOL: 'http://',
      API_HOST: 'yapi.lanten.me',
      API_BASE_PATH: '/mock/4',
    },
  },

  // prod 环境变量 (npm run build 将使用此配置)
  prod: {
    variables: {
      API_PROTOCOL: 'http://',
      API_HOST: 'yapi.lanten.me',
      API_BASE_PATH: '/mock/4',
    },
  },
}

export default env
