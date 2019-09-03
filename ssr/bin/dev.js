const koa = require('koa');
const webpack = require('webpack') 
const KWM = require('koa-webpack-middleware')
const { devMiddleware, hotMiddleware } = KWM
const devConfig = require('../../serverConfig/webpack.dev') 
const compile = webpack(devConfig)
const KoaRouter = require('koa-router');
const path = require('path');
const views = require('koa-views');
const router = new KoaRouter();
const routerManagement = require('../server/route.js');
const app = new koa()
app.use(views(path.resolve(__dirname, '../server/static'), {
    map: { html: 'ejs' }
}))
app.use(devMiddleware(compile, {
    // public path to bind the middleware to
    // use the same as in webpack
    noInfo: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: false
    },
    publicPath: '/build/',
    stats: {
        colors: true
    },
    headers: { "X-Custom-Header": "yes" },
}))
app.use(hotMiddleware(compile, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
}))
routerManagement(router,app)
// 路由启动之后，构建产物应该指向路由对应静态文件地址
app.use(router.routes());   /*启动路由*/
app.use(router.allowedMethods());
app.listen(3000, () => {
    console.log("服务器已启动，请访问http://127.0.0.1:3000")
});