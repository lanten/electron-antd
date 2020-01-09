import React from 'react'
import { Button } from 'antd'

import './alert-modal.less'

export default class AlertModal extends React.Component<PageProps> {
  render() {
    return (
      <div className="alert-modal">
        <p>component alert-modal is ok</p>
        <Button
          type="primary"
          onClick={() => {
            this.props.currentWindow.close()
          }}
        >
          close
        </Button>
      </div>
    )
  }
} // class AlertModal end
