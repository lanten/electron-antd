import webpack, { Configuration } from 'webpack'

import devConfig from '../dev.config'

const { env: envConfig } = devConfig

interface BuildConfig {
  env: keyof typeof devConfig.env
  webpackConfig: Configuration
  type: 'main' | 'renderer'
}

function build({ env, webpackConfig }: BuildConfig): Promise<typeof devConfig.env['prod']> {
  return new Promise((resolve, reject) => {
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
