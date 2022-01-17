interface CustomEventMap {
  /** [Window] 自定义事件：路由刷新 */
  'router-update': CustomEvent<PageProps>
}

interface WindowEventMap extends CustomEventMap {}

declare namespace Electron {
  interface WebContents {
    /** [BrowserWindow] 自定义事件: DOM 准备就绪 */
    send(channel: 'dom-ready', createConfig: CreateConfig): void
  }

  interface IpcRenderer {
    /** [BrowserWindow] 自定义事件: DOM 准备就绪 */
    on(channel: 'dom-ready', callback: (event: Electron.IpcRendererEvent, data: CreateConfig) => void): void
  }
}
