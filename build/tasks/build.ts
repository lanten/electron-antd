import chalk from 'chalk'
import { clearDir, exConsole } from '../utils'

import devConfig from '../dev.config'
import webpackConfigMain from '../webpack.config.main'
import webpackConfigRenderer from '../webpack.config.renderer'
import buildCommon from './build-common'

const env = process.env.BUILD_ENV as keyof typeof devConfig.env

async function buildMain() {
  return buildCommon({ env, webpackConfig: webpackConfigMain, type: 'main' }).then(() => {
    exConsole.success(
      chalk.greenBright(`[Main Complete] => ${chalk.magenta.underline(`${devConfig.dist}/main`)}`)
    )
  })
}

async function buildRenderer() {
  return buildCommon({ env, webpackConfig: webpackConfigRenderer, type: 'renderer' }).then(() => {
    exConsole.success(
      chalk.greenBright(`[Renderer Complete] => ${chalk.magenta.underline(`${devConfig.dist}/renderer`)}`)
    )
  })
}

function build() {
  const { dist } = devConfig
  exConsole.info(chalk.cyanBright(`[Clear Dir] => ${chalk.magenta.underline(`${devConfig.dist}`)}`))
  clearDir(dist, false, true)

  exConsole.info(
    chalk.yellowBright(
      `[Building Start] => ${chalk.bgMagentaBright(chalk.white(` ${env} `))} : ${process.env.NODE_ENV}`
    )
  )

  Promise.all([buildMain(), buildRenderer()])
    .then(res => {
      process.exit()
    })
    .catch(err => {
      throw new Error(err)
    })
}

build()
