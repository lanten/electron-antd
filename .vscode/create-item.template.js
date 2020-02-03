/**
 * This is template config for extension: [Create Item By Template]
 * This is a JavaScript code file that will be executed in the Node environment
 * And you can add any Javascript(commonjs) code here
 * For more advanced usage, please see this wiki: https://github.com/lanten/create-item-by-template/wiki/Template-Example
 */

/** file list */
const files = {
  tsx: name => {
    const nameH = toCamel(name)
    return [
      `import React from 'react'`,
      ``,
      `import './${name}.less'`,
      ``,
      `export default class ${nameH} extends React.Component<PageProps> {`,
      `  render() {`,
      `    return (`,
      `      <div className="${name}">`,
      `        <p>component ${name} is created</p>`,
      `      </div>`,
      `    )`,
      `  }`,
      `} // class ${nameH} end`,
      ``,
    ]
  },

  routes: name => {
    const nameH = toCamel(name)
    return [
      `const routes: RouteConfig[] = [`,
      `  {`,
      `    key: '${nameH}',`,
      `    path: '/${name}',`,
      `    windowOptions: {`,
      `      title: '${nameH}',`,
      `    },`,
      `  },`,
      `]`,
      ``,
      `export default routes`,
      ``,
    ]
  },

  'index.ts': name => {
    return [`export * from './${name}'`, ``]
  },

  less: name => {
    return [`.${name} {`, ``, `}`]
  },
}

/** folder list */
const folders = {
  'react-component': name => {
    return {
      'index.tsx': files['index.ts'],
      [`${name}.tsx`]: files.tsx,
      [`${name}.less`]: files.less,
    }
  },

  'react-routes': name => {
    return {
      [`${name}.tsx`]: files.tsx,
      [`routes.ts`]: files.routes,
      [`${name}.less`]: files.less,
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

module.exports = { files, folders }
