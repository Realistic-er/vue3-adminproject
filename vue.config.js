const { defineConfig } = require('@vue/cli-service');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');

let externals = {}
let cdn = { css: [], js: [] }
const isProduction = process.env.NODE_ENV === 'production' // 判断是否是生产环境

externals = {
  vue: 'Vue',
  'element-plus': 'ElementPlus',
  'echarts': 'echarts',
  'vue-router': 'VueRouter',
  'vue-x': 'Vuex',
  'mock': 'Mock',
};
cdn = {
  css: [
    'https://unpkg.com/element-plus/dist/index.css' // element-ui css 样式表
  ],
  js: [
    'https://unpkg.com/vue@3',
    'https://unpkg.com/element-plus', // element-ui js
    'https://cdn.jsdelivr.net/npm/echarts@5.4.2/dist/echarts.min.js',
    'https://unpkg.com/vue-router@4.0.3',
    'https://unpkg.com/vuex@4.0.0',
    'https://cdn.bootcdn.net/ajax/libs/Mock.js/1.0.0/mock-min.js'
  ]
};
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack(config) {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // Provide path to the file with resources
          // 要公用的scss的路径
          resources: ['./src/style/mixin.scss']
        })
        .end()
    })
  },
  //
  configureWebpack: {
    devtool:"eval-cheap-module-source-map",
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    externals,
  },
  chainWebpack: config => {
    if(process.env.analyzer)
        config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  },
});
