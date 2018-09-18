import React from 'react'
import AsyncImport from '../utils/AsyncImport'

const routes = [
  { path: '/', component: AsyncImport(() => import('../pages/page-1')) },

  {
    path: '/page1', component: props => props.children, children: [
      { path: '/', component: () => <div>page1/home</div> },
      { path: '/2', component: () => <div>page1/page3</div> },
    ]
  },
  { path: '/page2', component: () => <div>page2</div> },

  // 404
  { component: () => <div>404!</div>, default: true },
]


module.exports = routes
