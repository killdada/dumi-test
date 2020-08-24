// import builtins from 'rollup-plugin-node-builtins'
// import globals from 'rollup-plugin-node-globals'
// import alias from 'rollup-plugin-alias';

// const path = require('path')

const options = {
  // 入口
  // entry: ['src/index.js', 'src/utils/index.js'],
  // // 每个入口生成不同的文件名
  // overridesByEntry: {
  //   'src/index.js': {
  //     file: 'index'
  //   },
  //   'src/utils/index.js': {
  //     file: 'utils'
  //   }
  // },
  // 增加支持的扩展后缀
  nodeResolveOpts: {
    extensions: ['.mjs', '.js', '.json', '.node', 'jsx']
  },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
      }
    ]
  ],
  // // rollup插件
  // extraRollupPlugins: [
  //   // 扩展支持node自身库
  //   globals(),
  //   builtins(),
  //   // 设置别名
  //   alias({
  //     resolve: ['.jsx', '.js'],
  //     entries: [
  //       { find: '@', replacement: path.resolve(__dirname, 'src') },
  //       { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
  //       { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
  //       { find: '@constants', replacement: path.resolve(__dirname, 'src/constants') },
  //     ]
  //   })
  // ],
  // cssModules: true,
  extractCSS: true,
  lessInBabelMode: true,
  runtimeHelpers: true,
  esm: 'babel',
  cjs: 'babel',
  autoprefixer: {
    browsers: ['ie>9', 'Safari >= 6']
  }
};

export default options;
