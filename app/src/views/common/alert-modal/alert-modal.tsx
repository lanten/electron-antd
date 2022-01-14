import React from 'react'
import { Button } from 'antd'

import './alert-modal.less'

interface AlertModalQuery {
  type: 'info' | 'warn' | 'error'
  title: string
  message: string
}

const TYPES_CONFIG = {
  info: {
    icon: <i className="fs-48 text-info ri-information-fill" />,
  },
  warn: {
    icon: <i className="fs-48 text-warn ri-alert-fill" />,
  },
  error: {
    icon: <i className="fs-48 text-error ri-close-circle-fill" />,
  },
}

export default class AlertModal extends React.Component<PageProps<unknown, AlertModalQuery>> {
  get typesConfig(): typeof TYPES_CONFIG['info'] {
    const { type } = this.props.query
    return TYPES_CONFIG[type || 'info']
  }

  render(): JSX.Element {
    const { title, message } = this.props.query
    return (
      <div className="alert-modal flex column">
        <div className="content flex-1 flex pl-16 pr-16 pb-16">
          <div className="mr-16 mt-8 drag">{this.typesConfig.icon}</div>
          <div className="flex-1 flex column">
            <h1 className="fs-24 text-title pt-16 drag">{title}</h1>
            <p className="fs-14 text-gray flex-1 message-box">{message}</p>
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
