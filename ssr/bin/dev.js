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
    extension: 'html'
}))
app.use(devMiddleware(compile, {
    // display no info to console (only warnings and errors)
    noInfo: false,

    // display nothing to the console
    quiet: false,

    // switch into lazy mode
    // that means no watching, but recompilation on every request
    lazy: true,

    // watch options (only lazy: false)
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },

    // public path to bind the middleware to
    // use the same as in webpack
    publicPath: "/assets/",

    // custom headers
    headers: { "X-Custom-Header": "yes" },

    // options for formating the statistics
    stats: {
        colors: true
    }
}))
app.use(hotMiddleware(compile, {
    // log: console.log,
    // path: '/__webpack_hmr',
    // heartbeat: 10 * 1000
}))
routerManagement(router)
app.use(router.routes());   /*启动路由*/
app.use(router.allowedMethods());
app.listen(3000, () => {
    console.log("服务器已启动，请访问http://127.0.0.1:3000")
});