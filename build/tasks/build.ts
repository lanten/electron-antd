import chalk from 'chalk'

import webpackConfig from '../webpack.config.renderer'
import buildCommon from './build-common'

const { BUILD_ENV, NODE_ENV } = process.env

console.log(NODE_ENV, BUILD_ENV)

function buildDist(env): void {
  buildCommon({ env, webpackConfig }).then(envConfig => {
    console.log(chalk.greenBright('=> Build complete!'))
  })
}

buildDist(BUILD_ENV)
