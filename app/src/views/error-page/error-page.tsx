import * as React from 'react'
import { Button } from 'antd'

import './error-page.less'

interface ErrorInfo {
  title: string
  img: string
  desc: string
  content: JSX.Element | string | null
}

export default class ErrorPage extends React.Component<PageProps> {
  private readonly ERROR_CODE_MAP: { [key: string]: ErrorInfo } = {
    404: {
      title: '对不起，页面没有找到！',
      img: 'assets/images/404.svg',
      desc: 'Page Not Found',
      content: (
        <Button type="primary" onClick={() => history.go(-1)}>
          回到前一页
        </Button>
      ),
    },

    403: {
      title: '温馨提示：您没有使用该功能的权限',
      img: 'assets/images/403.svg',
      desc: '如有需要，请联系管理员开通',
      content: (
        <a href="/">
          <Button type="primary">返回首页</Button>
        </a>
      ),
    },
  }

  get errorInfo(): ErrorInfo {
    return this.ERROR_CODE_MAP[this.props.code || '404']
  }

  render() {
    return (
      <div className="panel full has-breadcrumb flex column center error-page">
        <div className="flex center-v">
          <img className="state-img" src={this.errorInfo.img} alt="Error 403" />
          <div>
            <h2 className="fs-32 text-title">{this.errorInfo.title}</h2>
            <p className="text-light mt-16 mb-24">{this.errorInfo.desc}</p>
            {this.errorInfo.content}
          </div>
        </div>
      </div>
    )
  }
} // class ErrorPage end
