import chalk from 'chalk'
import { clearDir } from '../utils'

import devConfig from '../dev.config'
import webpackConfigMain from '../webpack.config.main'
import webpackConfigRenderer from '../webpack.config.renderer'
import buildCommon from './build-common'

const env = process.env.BUILD_ENV as keyof typeof devConfig.env

async function buildMain() {
  return buildCommon({ env, webpackConfig: webpackConfigMain, type: 'main' }).then(() => {
    console.log(chalk.greenBright(`[Main Complete] => ${chalk.magenta.underline(`${devConfig.dist}/main`)}\n`))
  })
}

async function buildRenderer() {
  return buildCommon({ env, webpackConfig: webpackConfigRenderer, type: 'renderer' }).then(() => {
    console.log(
      chalk.greenBright(`[Renderer Complete] => ${chalk.magenta.underline(`${devConfig.dist}/renderer`)}\n`)
    )
  })
}

function build() {
  const { dist } = devConfig
  console.log(chalk.cyanBright(`[Clear Dir] => ${chalk.magenta.underline(`${devConfig.dist}`)}\n`))
  clearDir(dist, false, true)

  console.log(
    chalk.yellowBright(
      `[Building Start] => ${chalk.bgMagentaBright(chalk.white(` ${env} `))} : ${process.env.NODE_ENV}\n`
    )
  )

  Promise.all([buildMain(), buildRenderer()]).then(res => {
    process.exit()
  })
}

build()
