import React from 'react'
import { Menu, shell } from '@electron/remote'
import { message } from 'antd'
import clsx from 'clsx'

import { LogFile, LogReader, LogDetailLine } from './log-reader'

import './log-viewer.less'

interface Props extends PageProps {}

interface State {
  logFiles: LogFile[]
  activeFile: LogFile
  logDetail: LogDetailLine[]
}

const TYPE_COLORS = {
  info: 'text-info',
  warn: 'text-warn',
  error: 'text-error',
}

class LogViewerClass extends React.Component<Props, State> {
  private logReader = new LogReader()
  private logDetailRef = React.createRef<HTMLDivElement>()

  readonly state: State = {
    logFiles: this.logReader.getLogFiles(),
    activeFile: { absolutePath: '', fileName: '', name: '' },
    logDetail: [],
  }

  private fileListMenu
  private activeMenuFileItem: LogFile | undefined

  constructor(props: Props) {
    super(props)
    this.state.activeFile = this.state.logFiles[0]
    this.fileListMenu = Menu.buildFromTemplate([
      { label: '打开日志文件', click: this.openLogFile },
      { label: '打开日志所在目录', click: this.openLogFileDir },
      { type: 'separator' },
      { label: '删除日志文件', click: this.deleteLogFile },
    ])
  }

  componentDidMount() {
    const { logFiles, activeFile } = this.state
    this.watchingLogFile(activeFile || logFiles[0])
  }

  openLogFile = () => {
    console.log(this.activeMenuFileItem)
    if (!this.activeMenuFileItem) return
    shell.openPath(this.activeMenuFileItem.absolutePath)
  }

  openLogFileDir = () => {
    if (!this.activeMenuFileItem) return
    shell.showItemInFolder(this.activeMenuFileItem.absolutePath)
  }

  deleteLogFile = () => {
    if (!this.activeMenuFileItem) return
    shell.openPath(this.activeMenuFileItem.absolutePath)
    console.log(this.activeMenuFileItem)
  }

  onFileListContextMenu = (fileItem: LogFile) => {
    this.activeMenuFileItem = fileItem
    this.fileListMenu.popup({
      window: this.props.currentWindow,
      callback: () => {
        this.activeMenuFileItem = undefined
      },
    })
  }

  refresh = () => {
    const logFiles = this.logReader.getLogFiles()
    const activeFile = logFiles[0]
    this.setState({ logFiles, activeFile })
    this.watchingLogFile(activeFile)
  }

  render(): JSX.Element {
    const { logFiles, activeFile, logDetail } = this.state
    return (
      <div className="flex log-viewer">
        <div className="log-list-container flex column">
          <ul className="log-list flex-1">
            {logFiles.map((v) => (
              <li
                key={v.name}
                className={clsx('flex-none', { active: v.name === activeFile.name })}
                onClick={() => {
                  if (activeFile.name === v.name) return
                  this.logReader.resetDetailHistory()
                  this.watchingLogFile(v)
                }}
                onContextMenu={() => this.onFileListContextMenu(v)}
              >
                {v.name}
              </li>
            ))}
          </ul>
          <div className="text-center p-4 flex-none" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
            <a onClick={this.refresh}>刷新</a>
          </div>
        </div>
        <code className="log-detail flex-1" ref={this.logDetailRef}>
          {logDetail.map(this.renderLogLine)}
        </code>
      </div>
    )
  }

  /** 渲染日志行 */
  renderLogLine = (v: LogDetailLine, i: number): JSX.Element => {
    const color = TYPE_COLORS[v.type]
    return (
      <p key={i} className="text-gray">
        {v.date && (
          <span>
            [<span className="text-purple">{v.date}</span>]
          </span>
        )}
        {v.type && (
          <span>
            [<span className={color}>{v.type}</span>]
          </span>
        )}
        {v.env && (
          <span>
            [<span className="text-gray">{v.env}</span>]
          </span>
        )}
        <span className="text-light"> &nbsp;{v.message}</span>
      </p>
    )
  }

  /** 打开并监听日志文件 */
  watchingLogFile(file: LogFile): void {
    const hide = message.loading('正在加载日志列表...', 0)
    setTimeout(() => {
      this.setState({ activeFile: file, logDetail: [] }, () => {
        this.logReader.watchingLogFile(file, (detail) => {
          this.setState({ logDetail: this.state.logDetail.concat(detail) }, () => {
            const { current: detailDom } = this.logDetailRef
            if (detailDom) {
              detailDom.scrollTop = detailDom.scrollHeight
            }
          })
        })
      })
      hide()
    }, 200)
  }

  componentWillUnmount() {
    this.logReader.resetDetailHistory()
    this.logReader.closeWatcher()
  }
} // class LogViewer end

export default LogViewerClass
