// You can add any javascript code here

module.exports = {
  // tsx 组件
  'ts-react-comp': name => {
    return {
      [`${name}.tsx`]: tsxItem(name),
      [`index.ts`]: indexItem(name),
      [`${name}.less`]: lessItem(name),
    }
  },

  // tsx 页面, 包含子路由
  'ts-react-router': name => {
    return {
      [`${name}.tsx`]: tsxItem(name),
      [`routes.tsx`]: routerItem(name),
      [`${name}.less`]: lessItem(name),
    }
  },
}

/**
 * 中划线转驼峰
 * @param {String} str
 * @param {Boolean} c 首字母大写
 */
function toCamel(str, c = true) {
  let strH = str.replace(/([^\-])(?:\-+([^\-]))/g, (_, $1, $2) => $1 + $2.toUpperCase())
  if (c) strH = strH.slice(0, 1).toUpperCase() + strH.slice(1)
  return strH
}

/**
 * tsx 基础单元
 * @param {String} name
 */
function tsxItem(name) {
  const nameH = toCamel(name)
  return [
    `import React from 'react'`,
    ``,
    `import './${name}.less'`,
    ``,
    `export default class ${nameH} extends React.Component {`,
    `  render() {`,
    `    return (`,
    `      <div className="${name}">`,
    `        <p>component ${name} is ok</p>`,
    `      </div>`,
    `    )`,
    `  }`,
    `} // class ${nameH} end`,
    ``,
  ]
}

/**
 * 子路由
 * @param {String} name
 * @param {String} ext
 */
function routerItem(name) {
  return [
    `export default [`,
    `  {`,
    `    path: '/${name}',`,
    `    title: '新页面',`,
    `    asyncImport: () => import(/* webpackChunkName:"${name}" */ './${name}'),`,
    `  },`,
    `] as RouteConfig[]`,
    ``,
  ]
}

/**
 * index 文件中转
 * @param {String} name
 */
function indexItem(name) {
  const nameH = toCamel(name)
  return [`import ${nameH} from './${name}'`, `export default ${nameH}`, ``]
}

function lessItem(name) {
  return [`.${name} {`, ``, `}`]
}
