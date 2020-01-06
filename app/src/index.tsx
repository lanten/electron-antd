import React from 'react'
import reactDom from 'react-dom'

import { initRenderer } from '@/core/renderer.init'
import App from './app'
import '@/src/styles/index.less'

initRenderer()

reactDom.render(<App />, document.getElementById('app'))
