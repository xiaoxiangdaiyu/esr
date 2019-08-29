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
    console.log('file>>>',file)
    console.log('__dirname',__dirname)
    var name = releativePath.replace(/\.js/, '').toLowerCase()
    Entrys[name] = file
    htmls.push(new HtmlWebpackPlugin({
        filename: name+ '.html',
        template:'./src/index.html',
        chunks: ['common', name]
    }))
})
module.exports = {
    entry: Entrys,
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        // 直接的入口模块名
        filename: '[name].js',
        // 非入口模块，也就是不需要打包到一起的，但又可能会用到，
        // 这不就是按需加载的么
        chunkFilename: '[name].[chunkhash].js',
        crossOriginLoading: 'anonymous'
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
                include: path.resolve(__dirname, "src"),
                exclude: path.resolve(__dirname, 'node_modules'),
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css"],
    },
    devServer: {
        // 指明静态文件例如html应该从何处获取，包括js和css等bundle
        contentBase: path.resolve(__dirname, 'src/'),
        hot: true,
        open:true,
        // 不过，如果设置了该属性，则js等静态资源路径需要加上该前缀
        // 假设服务器运行在 http://localhost:8080 并且 output.filename 被设置为 bundle.js。
        // 默认 devServer.publicPath 是 '/'，
        // 所以你的包(bundle)可以通过 http://localhost:8080/bundle.js 访问。
        // 修改 devServer.publicPath，将 bundle 放在指定目录下：
        // 上面的例子很清晰，概括就是静态资源bundle输出位置，指定了则在该文件夹下，访问时需要加上该path
        publicPath:'/'
    },
    plugins: [
        new CleanWebpackPlugin(),
        ...htmls,
        new webpack.HotModuleReplacementPlugin()
    ]
}