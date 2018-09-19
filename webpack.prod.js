var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var basePath = path.join(process.cwd(), '/src/pages')
var files = glob.sync(path.join(basePath, '*.js'))
// 入口地址
var Entrys = {}
files.forEach(function (file) {
    var releativePath = path.relative(basePath, file)
    Entrys[releativePath.replace(/\.js/, '')] = file
})
console.log(path.resolve(__dirname, './src')+'in dev')
console.log(path.resolve(__dirname, './src/test.js'))
module.exports = {
    output: {
        path: process.cwd() + '/dist1',
        // 直接的入口模zzz块名
        filename: '[name].js',
        // 非入口模块，也就是不需要打包到一起的，但又可能会用到，
        // 这不就是按需加载的么
        chunkFilename: '[name].[chunkhash].js',
        crossOriginLoading: 'anonymous'
    }
}