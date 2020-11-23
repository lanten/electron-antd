const env = {
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
}

export default env
