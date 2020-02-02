import * as React from 'react';
import { Button, Input, Spin, Card } from 'antd';
import { connect } from 'react-redux';
import { CountAction, CountState } from '@/core/store/models/count';
import { StateModels } from '@/core/store/interface';

interface DemoProps extends PageProps {
  countState: CountState;
  countAction: CountAction;
}

declare interface DemoState {
  resData: queryTestInfoUsingGET.Response | {};
  loading: boolean;
  createWindowLoading: boolean;
}

/**
 * DemoProps 是组件的 props 类型声明
 * DemoState 是组件的 state 类型声明
 * props 和 state 的默认值需要单独声明
 */

class Demo extends React.Component<DemoProps, DemoState> {
  // state 初始化
  state: DemoState = {
    resData: {},
    loading: false,
    createWindowLoading: false,
  };

  // 构造函数
  constructor(props: DemoProps) {
    super(props);
  }

  componentDidMount() {
    console.log(this);
  }

  render() {
    const { resData, loading, createWindowLoading } = this.state;
    const { countState } = this.props;
    return (
      <div>
        <Card title="Redux Test" className="mb-16">
          <p>redux count : {countState.count}</p>
          <p>redux count2 : {countState.count}</p>
          <p>redux countAlias : {countState.count}</p>

          <div className="mt-16">
            <Button
              type="primary"
              onClick={() => {
                this.props.countAction.increment(1);
              }}>
              Add
            </Button>

            <Button
              className="ml-16"
              type="primary"
              onClick={() => {
                this.props.countAction.decrement(1);
              }}>
              Decrement
            </Button>

            <Button
              className="ml-16"
              type="primary"
              onClick={async () => {
                await this.props.countAction.incrementAsync(1);
                console.log('hello');
              }}>
              incrementAsync
            </Button>
          </div>

          <p className="text-light mt-16 mb-16">
            Redux runs in the main process, which means it can be shared across all renderer processes.
          </p>

          <Button onClick={this.openNewWindow} loading={createWindowLoading}>
            Open new window
          </Button>
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
    );
  }

  openNewWindow = () => {
    this.setState({ createWindowLoading: true });
    $tools.createWindow('Demo').finally(() => this.setState({ createWindowLoading: false }));
  };

  requestTest() {
    this.setState({ loading: true });
    $api
      .queryTestInfo({})
      .then(resData => {
        this.setState({ resData });
      })
      .finally(() => this.setState({ loading: false }));
  }

  requestTestError() {
    this.setState({ loading: true });
    $api
      .queryTestInfoError({})
      .catch(resData => {
        this.setState({ resData });
      })
      .finally(() => this.setState({ loading: false }));
  }

  requestTestErrorModal() {
    this.setState({ loading: true });
    $api
      .queryTestInfoError({}, { errorType: 'modal' })
      .catch(resData => {
        this.setState({ resData });
      })
      .finally(() => this.setState({ loading: false }));
  }
}

const mapStateToProps = ({ count }: StateModels) => ({
  countState: count,
});

const mapDispatchToProps = (dispatch: any) => ({
  countAction: dispatch.count,
});

export default connect(mapStateToProps, mapDispatchToProps)(Demo);
