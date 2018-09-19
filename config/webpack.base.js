const path = require('path')

module.exports = {
  /**
   * 1. __dirname 为node全局对象，是当前文件所在目录
   * 2. context为 查找entry和部分插件的前置路径
   */
  context: path.resolve(__dirname, '../'),
  entry: {
    /**
     * 入口，chunkname: 路径
     * 多入口可配置多个
     */
    app: './src/test.js'
  },
  output: {
    // 资源文件输出时写入的路径
    path: path.resolve(__dirname, '../dist/')
  }
}