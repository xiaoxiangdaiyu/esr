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
这里原因找到了，开始时为了方便，使用了nodemon 来启动，每次更新导致都会进行启动
websocket服务端口会发生变更
而客户端保留的依然是原始端口，所以报错。

### 引入webpack-dev-middle之后，其实html没有被打包出来，因为原本存在index.html的原因，所以可以正确访问

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


## 问题记录
koa-views 使用ejs渲染模板时，发现devmodule 生成于内存中的文件不能被访问到，头疼。

这里的问题在于 设置

```js
devMiddleware:{
            // 此时访问路径为 /ssr/server/static/index.html 
           publicPath: devConfig.output.path
            publicPath: '/'
        },
```

直接访问 http://127.0.0.1:3000/index.html  显然读不到文件。


对于koa-webpack中提到的：
```js
Using with html-webpack-plugin
When using with html-webpack-plugin, you can access dev-middleware in-memory filesystem to serve index.html file:

const middleware = await koaWebpack({ config });
 
app.use(middleware);
 
app.use(async (ctx) => {
  const filename = path.resolve(webpackConfig.output.path, 'index.html')
  ctx.response.type = 'html'
  ctx.response.body = middleware.devMiddleware.fileSystem.createReadStream(filename)
});

```
实际验证是多余的，publicPath 设置成功后，koa中间件可以读到相关文件



## 