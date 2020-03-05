import React from 'react'
import $c from 'classnames'
import { LogFile, LogReader, LogDetailLine } from './log-reader'

import './log-viewer.less'

interface Props extends PageProps {}

interface State {
  logFiles: LogFile[]
  activeFile: Partial<LogFile>
  logDetail: LogDetailLine[]
}

export default class LogViewer extends React.Component<Props, State> {
  readonly state: State = {
    logFiles: [],
    activeFile: {},
    logDetail: [],
  }

  private logReader = new LogReader()
  private logDetailRef = React.createRef<HTMLDivElement>()

  private TYPE_COLORS = {
    info: 'text-info',
    warn: 'text-warn',
    error: 'text-error',
  }

  constructor(props: Props) {
    super(props)
    this.state.logFiles = this.logReader.getLogFiles()
  }

  componentDidMount() {
    const { logFiles } = this.state
    this.openLogFile(logFiles[0])
  }

  render() {
    const { logFiles, activeFile, logDetail } = this.state
    return (
      <div className="flex log-viewer">
        <ul className="log-list">
          {logFiles.map(v => (
            <li
              key={v.name}
              className={$c({ active: v.name === activeFile.name })}
              onClick={() => activeFile.name !== v.name && this.openLogFile(v)}
            >
              {v.name}
            </li>
          ))}
        </ul>
        <code className="log-detail flex-1" ref={this.logDetailRef}>
          {logDetail.map(this.renderLogLine)}
        </code>
      </div>
    )
  }

  /** 渲染日志行 */
  renderLogLine = (v: LogDetailLine, i: number) => {
    const color = this.TYPE_COLORS[v.type]
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
  openLogFile(file: LogFile) {
    this.setState({ activeFile: file, logDetail: [] }, () => {
      this.logReader.openLogFile(file, detail => {
        this.setState({ logDetail: this.state.logDetail.concat(detail) }, () => {
          const { current: detailDom } = this.logDetailRef
          if (detailDom) {
            detailDom.scrollTop = detailDom.scrollHeight
          }
        })
      })
    })
  }
} // class LogViewer end
