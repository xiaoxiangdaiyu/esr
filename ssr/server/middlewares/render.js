// 区分后端接口与路径

module.exports = async (ctx,next)=>{
    if(ctx.path.match('.html')){

    }
    await next()
}