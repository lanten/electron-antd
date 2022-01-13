import React from 'react'
import reactDom from 'react-dom'
import { ipcRenderer } from 'electron'

import { initRenderer } from '@/core/renderer.init'
import App from './app'
import '@/src/styles/index.less'

initRenderer()

let createConfig: CreateConfig

function renderApp() {
  reactDom.render(<App createConfig={createConfig} />, document.getElementById('app'))
}

ipcRenderer.on('dom-ready', (event, data) => {
  createConfig = data
  renderApp()
})

// 组件热更新
// if (module.hot) {
//   module.hot.accept('./app', renderApp)
// }
