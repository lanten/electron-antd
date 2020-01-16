import * as React from 'react'
import { Button, Input, Spin, Card } from 'antd'

import { withStore } from '@/src/components'

interface DemoProps extends PageProps, StoreProps {
  id?: number
  count: StoreStates['count']
  count2: StoreStates['count2']
  countAlias: StoreStates['count']
}

declare interface DemoState {
  count: number
  resData: queryTestInfoUsingGET.Response | {}
  loading: boolean
}

/**
 * DemoProps 是组件的 props 类型声明
 * DemoState 是组件的 state 类型声明
 * props 和 state 的默认值需要单独声明
 */

@withStore(['count', 'count2', { countAlias: 'count' }])
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
  }

  render() {
    const { count, resData, loading } = this.state
    const { count: reduxCount, count2, countAlias } = this.props
    return (
      <div>
        <Card title="Redux Test" className="mb-16">
          <p>state count : {count}</p>
          <p>redux count : {reduxCount}</p>
          <p>redux count2 : {count2}</p>
          <p>redux countAlias : {countAlias}</p>

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
                this.props.dispatch({ type: 'ACTION_ADD_COUNT', data: countAlias + 1 })
              }}
            >
              add (redux) (alias)
            </Button>

            <Button
              className="ml-16"
              type="primary"
              onClick={() => {
                this.props.dispatch({ type: 'ACTION_ADD_COUNT2', data: count2 + 1 })
              }}
            >
              add (redux) (count2)
            </Button>
          </div>

          <div className="flex text-light mt-16">
            <p>Redux runs in the main process, which means it can be shared across all renderer processes</p>
            <a onClick={() => $tools.createWindow('demo')}>&nbsp;[open new window]</a>
          </div>
        </Card>

        <Card title="Request Test" className="mb-16">
          <Spin spinning={loading}>
            <div className="mb-16">
              <Button type="primary" onClick={this.requestTest.bind(this)}>
                Request
              </Button>

              <Button className="ml-16" type="primary" onClick={this.requestTestError.bind(this)}>
                Request Error (notification)
              </Button>

              <Button className="ml-16" type="primary" onClick={this.requestTestErrorModal.bind(this)}>
                Request Error (modal)
              </Button>
            </div>

            <Input.TextArea value={JSON.stringify(resData)} autoSize />
          </Spin>
        </Card>
      </div>
    )
  }

  requestTest() {
    this.setState({ loading: true })
    $api
      .queryTestInfo({})
      .then(resData => {
        this.setState({ resData })
      })
      .finally(() => this.setState({ loading: false }))
  }

  requestTestError() {
    this.setState({ loading: true })
    $api
      .queryTestInfoError({})
      .catch(resData => {
        this.setState({ resData })
      })
      .finally(() => this.setState({ loading: false }))
  }

  requestTestErrorModal() {
    this.setState({ loading: true })
    $api
      .queryTestInfoError({}, { errorType: 'modal' })
      .catch(resData => {
        this.setState({ resData })
      })
      .finally(() => this.setState({ loading: false }))
  }
} // class Demo end
