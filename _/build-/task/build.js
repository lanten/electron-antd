import chalk from 'chalk'

import webpackConfig from '../webpack.config'
import buildCommon from './build-common'

const { BUILD_ENV, NODE_ENV } = process.env

console.log(NODE_ENV, BUILD_ENV)

buildDist(BUILD_ENV)

function buildDist(env) {
  buildCommon({ env, webpackConfig }).then(envConfig => {
    console.log(chalk.greenBright('=> Build complete!'))
  })
}
