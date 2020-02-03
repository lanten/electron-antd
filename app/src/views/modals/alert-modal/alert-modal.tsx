import React from 'react'
import { Button, Icon } from 'antd'

import './alert-modal.less'

interface AlertModalQuery {
  type: 'info' | 'warn' | 'error'
  title: string
  message: string
}

const TYPES_CONFIG = {
  info: {
    icon: <Icon type="exclamation-circle" theme="filled" className="fs-48 text-info" />,
  },
  warn: {
    icon: <Icon type="warning" theme="filled" className="fs-48 text-warn" />,
  },
  error: {
    icon: <Icon type="close-circle" theme="filled" className="fs-48 text-error" />,
  },
}

export default class AlertModal extends React.Component<PageProps<{}, AlertModalQuery>> {
  get typesConfig() {
    const { type } = this.props.query
    return TYPES_CONFIG[type || 'info']
  }

  render() {
    const { title, message } = this.props.query
    return (
      <div className="alert-modal flex column">
        <div className="content flex-1 flex p-16">
          <div className="mr-16 mt-8">{this.typesConfig.icon}</div>
          <div className="flex-1 flex column">
            <h1 className="fs-24 text-title">{title}</h1>
            <p className="fs-14 text-light flex-1 message-box">{message}</p>
          </div>
        </div>

        <div className="footer flex end">
          <Button
            type="primary"
            onClick={() => {
              this.props.closeWindow()
            }}
          >
            close
          </Button>
        </div>
      </div>
    )
  }
} // class AlertModal end
