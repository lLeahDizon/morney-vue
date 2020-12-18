const path = require('path')

module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    const dir = path.resolve(__dirname, 'src/assets/icons')// __dirname 当前目录下的

    config.module
      .rule('svg-sprite') // 添加一个规则，这个规则有如下特点
      .test(/\.svg$/) // 文件如果能匹配上这个正则，那么就要用这个正则
      .include.add(dir).end() // 只包含 icons 这个目录并结束
      .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract: false}).end() // 使用 svg-sprite-loader 这个插件，extract: false 不要把它解析出文件来
      .use('svgo-loader').loader('svgo-loader') // o 是优化 optimization 的缩写
      .tap(options => ({...options, plugins: [{removeAttrs: {attrs: 'fill'}}]})) // 检测如果加载了 svg ，就把 fill 属性删除
      .end()
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{plainSprite: true}]) // 配置插件
    config.module.rule('svg').exclude.add(dir) // 其他 svg loader 排除 icons 这个目录
  }
}
