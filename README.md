# soe语音评测后端获取授权authorization例子

本例子是通过server端获取鉴权信息， 适用于小程序云以及用node的server端， 小程序拿到了鉴权信息之后，就可以通过soe语音评测小程序插件来进行语音评测。

首先把authorization.js上传到server或者小程序云函数内，然后直接调用就能获取到authorization返回给小程序，正式部署时请再后端加一层自己网站本身的权限检验，如果是使用自带权限检验的小程序云，则不用：

express:
```javascript
app.post('/',function (req, res) {
  const auth = require('./authorization');
  let authorization = auth.get('your_secret_id', 'your_secret_key')
  res.json(authorization);
})
```


小程序云：
```javascript
const auth = require('authorization');
exports.main = () => {
  return auth.get('your_secret_id', 'your_secret_key')
};

```
