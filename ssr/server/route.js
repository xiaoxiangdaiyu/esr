const home = require('./controls/home');

module.exports = (router) => {
    console.log(router)
    router.get('/', home.renderHtml);
    router.get('/page2', home.renderHtml);
    router.get('/favicon.ico', home.favicon);
    router.get('/test', home.test);
}