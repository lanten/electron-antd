import React from 'react'

import { Router, AsyncImport } from '../../components'

export default {
  path: '/demo',
  component: () => <Router routes={[
    {
      exact: true,
      path: '/demo/',
      params: { config: 'home' },
      component: AsyncImport(() => import('./demo-page')),
    },
    {
      path: '/demo/1',
      params: { config: '1' },
      component: AsyncImport(() => import('./demo-page')),
    },
    {
      path: '/demo/2',
      params: { config: '2' },
      component: AsyncImport(() => import('./demo-page')),
    },
  ]} />,
  params: { from: 'demo' },
}