# soe语音评测Node获取临时凭证

#### 本例子是通过Node获取鉴权信息， 适用于小程序云函数、node语言的server端。 小程序拿到了鉴权信息之后，就可以通过soe语音评测小程序插件来进行语音评测。

#### 步骤：
1. 把authorization.js上传到server或者小程序云函数内； 
2. 入口文件直接调用get方法就能获取到临时凭证，返回给小程序； 
3. 正式部署时请再后端加一层自己网站本身的权限检验，如果是使用自带权限检验的小程序云函数，则不用。 
