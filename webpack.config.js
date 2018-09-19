var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var basePath = path.join(process.cwd(), '/src/pages')
var files = glob.sync(path.join(basePath,'*.js'))
// 入口地址
var Entrys = {}
files.forEach(function (file) {
    var releativePath = path.relative(basePath, file)
    Entrys[releativePath.replace(/\.js/, '')] = file
})
console.log(path.resolve(__dirname, './src'))
console.log(path.resolve(__dirname, './src/test.js'))
module.export = {
    mode:'production',
    entry:{
        app:'./src/test.js',
        main:'./src/test.js'
    },
    output: {
        path: process.cwd() + '/dist',
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js',
        crossOriginLoading: 'anonymous'
    },
    cache: true,
    devtool: 'cheap-source-map',
    externals: {
        jquery: 'jQuery'
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
                        options:{
                            presets:['es2015']
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
    devServer: {
        proxy: { // proxy URLs to backend development server
            '/api': 'http://localhost:3000'
        },
        contentBase: path.resolve(__dirname, "../dist"),
        hot: true,
        open:true
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title:'test'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}