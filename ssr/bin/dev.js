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
const koaStatic = require('koa-static');
const opn = require('opn');
const detect = require('detect-port');
const router = new KoaRouter();
const routerManagement = require('../server/route.js');
const app = new koa()

// 清除缓存以刷新
const clearCache = function(){
    Object.keys(require.cache).forEach(function (id) {
        if (/[\/\\](server|src)[\/\\]/.test(id)) delete require.cache[id];
    });
}
// 是否已启动
let listening = false
// 默认端口
let port = 3000
app.use(views(path.resolve(__dirname, '../server/static'), {
    map: { html: 'ejs' }
}))
async function start (){
    const middleware = await koaWebpack({
        compiler,
        devMiddleware:{
            publicPath: '/'
        },
        // config: devConfig
    })

    app.use(middleware)
    routerManagement(router, app)
    // 路由启动之后，构建产物应该指向路由对应静态文件地址
    app.use(router.routes());   /*启动路由*/
    app.use(router.allowedMethods());
    // koa-webpack 文档太没必要了，每次都从缓存拿出来也太傻了。
    /* app.use(async (ctx,next) => {
        console.log('ctx.path',ctx.path)
        if (ctx.path.match('.html')){
            console.log('in')
            const filename = path.resolve(devConfig.output.path, 'index.html')
            ctx.response.type = 'html'
            console.log(filename)
            ctx.response.body = middleware.devMiddleware.fileSystem.createReadStream(filename)
        }else{
            await next()
        }
    }); */
    app.use(koaStatic(path.resolve(devConfig.output.path), {
        maxage: 0, //浏览器缓存max-age（以毫秒为单位）
        hidden: false, //允许传输隐藏文件
        index: 'index.html', // 默认文件名，默认为'index.html'
        defer: true, //如果为true，则使用后return next()，允许任何下游中间件首先响应。
        gzip: true, //当客户端支持gzip时，如果存在扩展名为.gz的请求文件，请尝试自动提供文件的gzip压缩版本。默认为true。
    }))

    detect(port).then((_port)=>{
        if (port !== _port) {
            port = _port
        }
        app.listen(port, () => {
            console.log("服务器已启动，请访问http://127.0.0.1:"+port)
            if(!listening){
                listening = true
                opn(`http://localhost:${port}`)
            }
            
        });
    })
    
}

start()