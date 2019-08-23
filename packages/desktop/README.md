
## Quick start
```bash
npm install

# 

npm run dev
```

## Overview
- webpack 4
- electron
- electron-package
- react 16
- react-router 5
- ant-design
- less

## DevTools

Toggle DevTools:

* OSX: <kbd>Cmd</kbd> <kbd>Alt</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
* Linux: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
* Windows: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>

## Packaging

Modify [package.config.js](./config/package.config.js) to edit package info.

For a full list of options see: https://github.com/electron-userland/electron-packager/blob/master/docs/api.md.

Create a package for OSX, Windows and Linux
```
npm run pack
```

Or target a specific platform
```
npm run pack:mac
npm run pack:win
npm run pack:linux
```

> The `browser-sync` version archive to [branch v1.0](https://github.com/lanten/electron-antd/tree/v1.0)
