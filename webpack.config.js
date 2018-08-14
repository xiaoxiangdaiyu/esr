var fs = require('fs');
var path = require('path');
// var glob = require('glob');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var CleanWebpackPlugin = require('clean-webpack-plugin');

var basePath = path.join(process.cwd(), '/src/pages/Index.js')
// var files = glob.sync(path.join(basePath + '*.js'))
// // 入口地址
// var Entrys = {}
// files.forEach(function (file) {
//     var releativePath = path.releative(basePath, file)
//     getEntrys[releativePath.replace(/\.js/, '')] = releativePath
// })
// console.log(files)
module.export = {
    entry: {
        'index': basePath
    },
    target: 'node',
    output: {
        path: process.cwd() + '/dist',
        // 直接的入口模块名
        filename: '[name].js',
        // 非入口模块，也就是不需要打包到一起的，但又可能会用到，
        // 这不就是按需加载的么
        chunkFilename: '[name].[chunkhash].js',
        crossOriginLoading: 'anonymous'
    },
    cache: true,
    node: {
        fs:'empty'
    },
    devtool: 'cheap-source-map',
    /**
     * 望文生意，从外部扩展
     * 防止将某些 import 的包(package)打包到 bundle 中
     * 支持下面这几种写法  string array object function regex
     * 即不需要打包进来的
     * 假如用到了jq
    */
    externals: {
        // 此用法表明，将会搜索全局jQuery变量来替代 import $ from 'jquery' 中的jquery
        jquery: 'jQuery'
        // jquery: {

        // }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                include: [
                    path.resolve(__dirname, "../src")
                ],
                exclude: [
                    'node_modules',
                    path.resolve(__dirname, "../node_modules")
                ],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        modules: [
            'node_modules'
        ],
        extensions: [".js", ".json", ".jsx", ".css"],
    },
    plugins: [
        // new CleanWebpackPlugin(['dist']),
        // new HtmlWebpackPlugin({
        //     title: 'test'
        // })
        // new webpack.HotModuleReplacementPlugin()
    ]
}