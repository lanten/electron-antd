import pc from 'picocolors'
import path from 'path'
import { build as electronBuilder } from 'electron-builder'
import { clearDir, exConsole } from '../utils'

import builderConfig from '../builder.config'
import buildConfig from '../config'
import webpackConfigMain from '../webpack.config.main'
import webpackConfigRenderer from '../webpack.config.renderer'
import buildCommon from './build-common'

const env = process.env.BUILD_ENV as keyof typeof buildConfig.env

async function buildMain() {
  return buildCommon({ env, webpackConfig: webpackConfigMain, type: 'main' }).then(() => {
    exConsole.success(`[Main Complete] : ${pc.underline(pc.magenta(path.resolve(buildConfig.dist, 'main')))}`)
  })
}

async function buildRenderer() {
  return buildCommon({ env, webpackConfig: webpackConfigRenderer, type: 'renderer' }).then(() => {
    exConsole.success(
      `[Renderer Complete] : ${pc.underline(pc.magenta(path.resolve(buildConfig.dist, 'renderer')))}`
    )
  })
}

function build() {
  const { dist } = buildConfig
  exConsole.info(`[Clear Dir...] : ${buildConfig.dist}`)

  try {
    clearDir(dist, false, true)
  } catch (error) {
    exConsole.warn(error.message)
  }

  exConsole.info(`[Building...] : ${env} : ${process.env.NODE_ENV}`)

  Promise.all([buildMain(), buildRenderer()])
    .then(() => {
      electronBuilder(builderConfig)
        .then((res) => {
          exConsole.success(`[Released] : ${res}`)
        })
        .catch((err) => {
          throw new Error(err)
        })
        .finally(() => process.exit())
    })
    .catch((err) => {
      throw new Error(err)
    })
}

build()
