## 采坑记录

### 使用devServer时，htmls是使用HtmlWebpackPlugin 来编译的

### devMiddleware html是ejs来渲染的

另外渲染之后路由是后端路由，所以这里需要将output指定为static 对应路径，这样才能展示静态资源。

### 另外就是引入路由