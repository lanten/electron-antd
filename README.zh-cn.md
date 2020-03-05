## 快速上手
安装
```bash
yarn
# 或者
npm install
```

启动调试
```bash
npm run dev
```

## 概览
- webpack
- electron
- electron-builder
- electron-log
- react
- react-router
- redux
- ant-design
- remixicon
- less
- typescript
- eslint
- prettier

## DevTools

开关 DevTools:

* OSX: <kbd>Cmd</kbd> <kbd>Alt</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
* Linux: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
* Windows: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>

## 打包应用

编辑 [builder.config.ts](./build/builder.config.ts) 配置文件.

配置详情请查看: https://www.electron.build/configuration/configuration

执行打包操作.
```
npm run build
```

请在打包完成后检查 `release` 目录.

## FAQ
- 国内 electron 安装缓慢问题,请查看此 [issue](https://github.com/lanten/electron-antd/issues/22) 

## License
[MIT](./LICENSE)