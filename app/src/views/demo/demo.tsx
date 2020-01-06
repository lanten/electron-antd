import * as React from 'react'
import { Button, Input } from 'antd'

import { withStore } from '@/src/store'

// 声明一个接口 ，继承自 PageProps，包含 PageProps 中所有的属性以及自身定义的 id
// ? 表示 属性 id 可以为空，在 : 前加上 ! 表示必填，默认必填
interface DemoProps extends PageProps, StoreProps {
  id?: number
}

// declare interface 语法上等价于 interface 都是声明一个接口，此外还有 type = { 。。。}
declare interface DemoState {
  count: number
  resData: {}
  loading: boolean
}

/**
 * DemoProps 是组件的 props 类型声明
 * DemoState 是组件的 state 类型声明
 * props 和 state 的默认值需要单独声明
 */

@withStore(['count', 'count2'])
export default class Demo extends React.Component<DemoProps, DemoState> {
  // props 默认值
  static defaultProps = {
    id: 123,
  }

  // state 初始化
  state: DemoState = {
    count: 1,
    resData: {},
    loading: false,
  }

  // 构造函数
  constructor(props: DemoProps) {
    super(props)
  }

  componentDidMount() {
    console.log(this)

    this.queryData()
  }

  render() {
    const { count, resData, loading } = this.state
    const { count: reduxCount, count2 } = this.props
    return (
      <div>
        <div className="panel">
          <p className="title-block">state count : {count}</p>
          <p className="title-block fs-18">redux count : {reduxCount}</p>
          <p className="title-block fs-18">redux count2 : {count2}</p>

          <div className="mt-16">
            <Button
              type="primary"
              onClick={() => {
                this.setState({ count: count + 1 })
              }}
            >
              add
            </Button>

            <Button
              className="ml-16"
              type="primary"
              onClick={() => {
                this.props.dispatch({ type: 'ACTION_ADD_COUNT', data: reduxCount + 1 })
              }}
            >
              add (redux)
            </Button>

            <Button
              className="ml-16"
              type="primary"
              onClick={() => {
                this.props.dispatch({ type: 'ACTION_ADD_COUNT2', data: count2 + 1 })
              }}
            >
              add (redux) 2
            </Button>
          </div>
        </div>

        <div className="panel mt-24">
          <div className="mb-16">
            <Button type="primary" loading={loading}>
              Request
            </Button>
          </div>

          <Input.TextArea value={JSON.stringify(resData)} />
        </div>

        <img src={$tools.APP_ICON} alt="" />
        <br />
        <img src={$tools.TRAY_ICON_DARK} alt="" />
      </div>
    )
  }

  queryData() {
    // $api.order.queryOrderPage({}).then(res => {
    //   console.log(res)
    // })
  }
} // class Demo end
