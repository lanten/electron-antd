import React from 'react';

import './app-titlebar.less';

export class AppTitlebar extends React.Component {
  render() {
    return (
      <header className="pl-16 pr-16 app-titlebar">
        <p>{window.location.href}</p>
      </header>
    );
  }
} // class AppTitlebar end
