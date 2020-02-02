import React from 'react';
import $c from 'classnames';
import './app-layout.less';
import { AppTitlebar } from '@/src/components/AppTitlebar';
import AppSidebar from '@/src/components/AppSidebar';

interface AppLayoutProps {
  createConfig: CreateConfig;
  children: any;
}

export class AppLayout extends React.Component<AppLayoutProps> {
  render() {
    const { createConfig } = this.props;
    return (
      <div className={$c('flex app-layout', { 'has-titlebar': createConfig.showTitlebar }, process.platform)}>
        {createConfig.showSidebar ? <AppSidebar /> : null}
        <div className="flex-1 app-content-wrap">
          {createConfig.showTitlebar ? <AppTitlebar /> : null}
          <div className="app-content">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default AppLayout;
