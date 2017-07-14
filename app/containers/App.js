import React, { Component, PropTypes } from 'react';
import QueueAnim from 'rc-queue-anim';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  constructor(props, context) {
    super(props);
  }

  render() {
    return (
      <QueueAnim>
        <div key={this.props.children.type.name} className="root-body maxcontant">
          {this.props.children}
        </div>
      </QueueAnim>
    );
  }
}

