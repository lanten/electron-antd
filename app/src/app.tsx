import * as React from 'react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

import { AppRouter, AppLayout } from '@/src/components'

import routes from './auto-routes'

export default class App extends React.Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <AppLayout>
          <AppRouter routes={routes} store={$store} />
        </AppLayout>
      </ConfigProvider>
    )
  }
}
