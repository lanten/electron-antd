
import React from 'react'
import { AsyncImport } from '../components'

import demo from './demo'

const routes = [
  { path: '/', exact: true, component: AsyncImport(() => import('./home')), params: { test: 'ok' } },
  demo
]


module.exports = routes
