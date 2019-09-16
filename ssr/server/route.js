/**
 * js逻辑需包含在 extract函数体内
 * @param {*} extractor 网关执行上下文
 */
function extract(extractor) {
    //  执行并获取 invoke-http-1 的返回内容
    var getFetchData = function(){
        var results = extractor.extract('$.tasks.invoke-http-1.output');
        return JSON.parse(results);
    };
    function main(){
        var originData = getFetchData()
        var id = originData.id
        // 裁剪数据，去除冗余数据
        return JSON.stringify(id)
    } 
    return main()
}