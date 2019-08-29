## 遇到的问题

主要在于 某些语法错误
### 1 module.exports 这里写错为module.export导致 webpack读不到正确配置，只能使用默认

### 2 js解析时 include 路径配置错误，导致jsx没有被转义,报错
```js
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
| import App from './App.jsx'
| console.log('app')
> ReactDOM.render(<App />, document.getElementById('root'))
``` 
路径问题：

```js
{
                test: /\.(js|jsx)?$/,
                include: path.resolve(__dirname, "../src"), // 错误写法，不过这种报错不清晰
                exclude: path.resolve(__dirname, 'node_modules'),
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
```
### 3 devserv  contentBase 配置不生效 
同样路径问题，最好配置绝对路径
```js
// path.resolve 的使用有些问题
contentBase: path.resolve(__dirname, './dist')
```
