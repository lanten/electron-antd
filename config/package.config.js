const path = require('path')

/**
 * `electron-packager` options
 * https://github.com/electron-userland/electron-packager/blob/master/docs/api.md
 */
module.exports = {
  arch: 'x64',
  asar: true,
  dir: path.join(__dirname, '../'),
  // icon: path.join(__dirname, '../build/icons/icon'),
  ignore: /(^\/(src|test|\.[a-z]+|README|yarn|static|dist\/web))|\.gitkeep/,
  out: path.join(__dirname, '../prod'),
  overwrite: true,
  platform: process.env.BUILD_TARGET || 'all'
}