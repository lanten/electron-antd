module.exports = {
  out: './docs',

  readme: 'none',
  includes: './',
  exclude: ['node_modules/**/*'],

  mode: 'file',
  excludeExternals: true,
  excludeNotExported: true,
  excludePrivate: true,
}
