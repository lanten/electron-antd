## Quick start
install
```bash
yarn
# or
npm install
```

start dev
```bash
npm run dev
```

## Overview
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

Toggle DevTools:

* OSX: <kbd>Cmd</kbd> <kbd>Alt</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
* Linux: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
* Windows: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>

## Build package

Modify [builder.config.ts](./build/builder.config.ts) to edit package info.

For a full list of options see: https://www.electron.build/configuration/configuration

Create a package for OSX, Windows and Linux
```
npm run build
```

Please check the `release` folder after the build is complete.



## License
[MIT](./LICENSE)