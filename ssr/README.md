## 采坑记录

### 使用devServer时，htmls是使用HtmlWebpackPlugin 来编译的

### devMiddleware html是ejs来渲染的

渲染之后路由是后端路由，所以这里需要将output指定为static 对应路径，这样才能展示静态资源。

```js

```
### 另外就是引入路由

## koa-webpack-middleware 时间太久没有维护，导致不支持webpack4 
提个醒，太老的技术就不要引入了

报错如下：

```js
DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
```
所以没有实现HMR


改用 原生 webpack-hot-middleware webpack-dev-middleware  
结果报错:
```js
TypeError: next is not a function
```
因为这不是个koa中间件，人家默认适配express。


###  使用koa-webpack 来尝试
因为该插件为promise形式，所以需要包括在funciton 内

另外对于报错：
```js
webpack-hot-client: HotModuleReplacementPlugin is automatically added to compilers. Please remove instances from your config before proceeding, or use the `autoConfigure: false` option.
```
需要entrys这里为数组，或者fuction

```js
 webpack-hot-client: HotModuleReplacementPlugin is automatically added to compilers. Please remove instances from your config before proceeding, or use the `autoConfigure: false` option.
```
对于这个报错 ， webpack-hot-client 会自行添加配置，所以config里面需要删除该选项
```js
plugins: [
        new CleanWebpackPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.HotModuleReplacementPlugin()
    ]
```
暴露自己的缺点，对于未知内容的技术，没有足够的耐心和自信去深入排查

这样配置依然没有自动刷新，即实现HMR ，蛋疼
发现客户端报错：
```js
WebSocket connection to 'ws://localhost:52072/' failed: Error in connection establishment: net::ERR_CONNECTION_REFUSED
```

### 引入webpack-dev-middle之后，其实html没有被打包出来，因为原本存在inde.html的原因，所以可以正确访问

当删除之后使用
```js
 devMiddleware:{
            publicPath: devConfig.output.path,
            fileSystem:require('fs'),
            writeToDisk:true
        }
```
可以看到只有index/time.js被打包出来，html没有产出，所以下面路径原本一直访问不到。
```js
path.resolve(webpackConfig.output.path, 'index.html')
```
原因是自己没有再插件中配置
```js
plugins: [
        new CleanWebpackPlugin(),
        ...htmls,
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.HotModuleReplacementPlugin()
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify(env)
        // })
    ]
```

## 遇到这个问题，一直在找问题在哪，入口等问题也进行了查看：
```js
Html Webpack Plugin:
  Error: Child compilation failed:
  Entry module not found: Error: Can't resolve '/Users/qianjin.pan/test/ssr/src/index.html' in '/Users/qianjin.pan/test/  esr':
  Error: Can't resolve '/Users/qianjin.pan/test/ssr/src/index.html' in '/Users/qianjin.pan/test/esr'
  
```

如果是路径不对，也对路径进行了修改，依然无效果，后来发现始终是/test/ssr/src/index.html即第一次配置错误的页面，因为设置了 wiriteDisk 导致一直存在

## 运行
```js
// devserver 执行
npm run dev

// koa 执行
npm run serve-dev
```