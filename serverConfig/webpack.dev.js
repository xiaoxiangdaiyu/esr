var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var basePath = path.join(process.cwd(), '/src/pages')
var files = glob.sync(path.join(basePath,'*.js'))
// 入口地址
var Entrys = {},
    htmls = []
files.forEach(function (file) {
    var releativePath = path.relative(basePath, file)
    var name = releativePath.replace(/\.js/, '').toLowerCase()
    Entrys[name] = [file]
    htmls.push(new HtmlWebpackPlugin({
        filename: name+ '.html',
        template:'serverConfig/index.html',
        chunks: [name]
    }))
})
module.exports = {
    entry: Entrys,
    mode: 'development',
    output: {
        path: path.join(process.cwd(), '/ssr/server/static/'),
        // 直接的入口模块名
        filename: '[name].js',
        // 非入口模块，也就是不需要打包到一起的，但又可能会用到，
        // 这不就是按需加载的么
        chunkFilename: '[name].[chunkhash].js',
        crossOriginLoading: 'anonymous',
        publicPath: ''
    },
    devtool: 'inline-source-map',
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
                include: path.join(process.cwd(), "/src"),
                exclude: path.resolve(process.cwd(), '/node_modules'),
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },{
                test:/\.html$/,
                include: path.join(process.cwd(), "/ssr"),
                use:[{
                    loader:'html-loader'
                }]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css"],
    },
    plugins: [
        new CleanWebpackPlugin(),
        ...htmls,
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.HotModuleReplacementPlugin()
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify(env)
        // })
    ]
}