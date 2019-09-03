exports.renderHtml = async (ctx) => {
    let initState = ctx.query.state ? JSON.parse(ctx.query.state) : null;
    ctx.body = {
        data: '路由正常哈哈'
    }
}
exports.favicon = (ctx) => {
    ctx.body = 'xxx';
}

exports.test =async (ctx) => {
    const id = ctx.params.id
    await ctx.render('index',{
        context:'测试内容',
        jsPath:'/build/index.js'
    })
}

exports.static = async (ctx)=>{

}