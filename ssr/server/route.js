const home = require('./controls/home');

module.exports = (router,ctx) => {
    console.log('router>>',router)
    router.get('/', home.renderHtml);
    router.get('/', home.renderHtml);
    router.get('/build/:html', home.test);
    router.get('/favicon.ico', home.favicon);
    router.get('/test', home.test);
}