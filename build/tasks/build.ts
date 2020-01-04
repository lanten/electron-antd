import chalk from 'chalk'
import { build as electronBuilder } from 'electron-builder'
import { clearDir, exConsole } from '../utils'

import packageConfig from '../builder.config'
import devConfig from '../dev.config'
import webpackConfigMain from '../webpack.config.main'
import webpackConfigRenderer from '../webpack.config.renderer'
import buildCommon from './build-common'

const env = process.env.BUILD_ENV as keyof typeof devConfig.env

async function buildMain() {
  return buildCommon({ env, webpackConfig: webpackConfigMain, type: 'main' }).then(() => {
    exConsole.success(`[Main Complete] : ${chalk.magenta.underline(`${devConfig.dist}/main`)}`)
  })
}

async function buildRenderer() {
  return buildCommon({ env, webpackConfig: webpackConfigRenderer, type: 'renderer' }).then(() => {
    exConsole.success(`[Renderer Complete] : ${chalk.magenta.underline(`${devConfig.dist}/renderer`)}`)
  })
}

function build() {
  const { dist } = devConfig
  exConsole.info(chalk.cyanBright(`[Clear Dir] : ${chalk.magenta.underline(`${devConfig.dist}`)}`))
  clearDir(dist, false, true)

  exConsole.info(`[Building Start] : ${env} : ${process.env.NODE_ENV}`)

  Promise.all([buildMain(), buildRenderer()])
    .then(() => {
      electronBuilder(packageConfig)
        .then(res => {
          exConsole.success(`[Released] : ${res}`)
        })
        .catch(err => {
          throw new Error(err)
        })
        .finally(() => process.exit())
    })
    .catch(err => {
      throw new Error(err)
    })
}

build()
