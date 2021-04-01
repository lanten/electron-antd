import webpack, { Configuration } from 'webpack'

import buildConfig from '../config'

const { env: envConfig } = buildConfig

interface BuildConfig {
  env: keyof typeof buildConfig.env
  webpackConfig: Configuration
  type: 'main' | 'renderer'
}

function build({ env, webpackConfig }: BuildConfig): Promise<typeof buildConfig.env['prod']> {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err) throw err
      if (!stats) throw 'Webpack states error!'

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
