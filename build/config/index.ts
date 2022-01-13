import path from 'path'

import { COMMON_ENV, env } from './env.config'

const rootPath = process.cwd()

const config = {
  host: '127.0.0.1',
  port: 13311,
  mainSource: path.resolve(rootPath, 'app/electron'),
  rendererSource: path.resolve(rootPath, 'app/src'),
  template: path.resolve(rootPath, 'app/src/index.html'),
  // static: path.resolve(rootPath, 'assets'),
  static: {
    directory: path.resolve(rootPath, 'assets'),
    publicPath: '/assets',
  },
  dist: path.resolve(rootPath, 'dist'),
  release: path.resolve(rootPath, 'release'),

  proxy: {},

  COMMON_ENV,
  env,
}

export default config
