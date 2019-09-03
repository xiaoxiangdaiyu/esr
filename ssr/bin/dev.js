const koa = require('koa');
const webpack = require('webpack') 
const KWM = require('koa-webpack-middleware')
// const devMiddleware = require("webpack-dev-middleware")
// const  hotMiddleware = require("webpack-hot-middleware")
const koaWebpack = require('koa-webpack');
const devConfig = require('../../serverConfig/webpack.dev') 
const compiler = webpack(devConfig)
const KoaRouter = require('koa-router');
const path = require('path');
const views = require('koa-views');
const router = new KoaRouter();
const serve = require('koa-static');
const routerManagement = require('../server/route.js');
const app = new koa()
// 清除缓存以刷新
const clearCache = function(){
    Object.keys(require.cache).forEach(function (id) {
        if (/[\/\\](server|src)[\/\\]/.test(id)) delete require.cache[id];
    });
}
async function start (){
    const middleware = await koaWebpack({
        // compiler,
        devMiddleware:{
            publicPath: devConfig.output.path
        },
        config: devConfig
    })

    app.use(middleware)
    app.use(views(path.resolve(__dirname, '../server/static'), {
        map: { html: 'ejs' }
    }))
    routerManagement(router, app)
    // 路由启动之后，构建产物应该指向路由对应静态文件地址
    app.use(router.routes());   /*启动路由*/
    app.use(router.allowedMethods());
    app.listen(3000, () => {
        console.log("服务器已启动，请访问http://127.0.0.1:3000")
    });
}

start()