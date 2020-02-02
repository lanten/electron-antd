import React from 'react';
import { Icon, Tooltip } from 'antd';

import AppSideMenus from './side-menus.json';
import './app-sidebar.less';

type SideMenuItem = typeof AppSideMenus[0];

export class AppSidebar extends React.Component {
  render() {
    return (
      <div className="app-sidebar">
        <div className="mt-24 flex center app-sidebar-header">
          <img width="40" src={$tools.APP_ICON} />
        </div>

        <div className="flex column side-menu">{AppSideMenus.map(this.renderMenuItem)}</div>
      </div>
    );
  }

  renderMenuItem = ({ name, icon, path, title }: SideMenuItem) => {
    return (
      <Tooltip key={name} overlayClassName="side-menu-item-tooltip" placement="right" title={title}>
        <a className="side-menu-item" href={path}>
          <Icon type={icon} className="fs-24" />
        </a>
      </Tooltip>
    );
  };
} // class AppSidebar end
