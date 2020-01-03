import webpack, { Configuration } from 'webpack'

import devConfig from '../dev.config'

/** - interface - start ------------------------------------------------------------------- */

interface BuildConfig {
  env: keyof typeof devConfig.env
  webpackConfig: Configuration
  type: 'main' | 'renderer'
}

/** - interface - end --------------------------------------------------------------------- */

const { env: envConfig } = devConfig

function build({ env, webpackConfig }: BuildConfig): Promise<typeof devConfig.env['prod']> {
  return new Promise((resolve, reject) => {
    // 更换 publicPath
    if (env && webpackConfig.output) {
      const { publicPath } = envConfig[env]
      webpackConfig.output.publicPath = publicPath
    }

    webpack(webpackConfig, (err, stats) => {
      if (err) {
        throw err
      }

      process.stdout.write(
        stats.toString({
          colors: true,
          hash: true,
          version: true,
          timings: true,
          assets: true,
          chunks: false,
          children: false,
          modules: false,
        }) + '\n\n'
      )

      if (stats.hasErrors()) {
        reject(stats)
      } else {
        resolve(envConfig[env])
      }
    })
  })
}

export default build
