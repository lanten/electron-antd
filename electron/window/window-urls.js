const fixedConfig = { resizable: false, maximizable: false, minimizable: false }

const urls = {
  home: { url: '/', config: { title: 'home' } },

  demo1: { url: '/demo/1', config: { title: 'demo-1', minWidth: 600, minHeight: 400 } },
  demo2: { url: '/demo/2', config: { title: 'demo-2', minWidth: 600, minHeight: 400 } },

  about: {
    url: '/about',
    config: {
      title: ' 关于',
      width: 300, height: 240,
      ...fixedConfig,
    }
  },

}

module.exports = urls
