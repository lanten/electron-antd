import React from 'react'

import { Router, AsyncImport } from '../../components'

export default {
  path: '/about',
  component: () => <Router routes={[
    {
      exact: true,
      path: '/about/',
      params: { key: 'about' },
      component: AsyncImport(() => import('./about')),
    },
  ]} />,
}