#腾讯云小游戏口语评测sdk

## 使用说明
在第一次使用该sdk之前，请前往 https://console.cloud.tencent.com/capi 申请安全凭证。 安全凭证包括 secretId 和 secretKey：

secretId 用于标识 API 调用者身份
secretKey 用于加密签名字符串和服务器端验证签名字符串的密钥。
用户必须严格保管安全凭证，避免泄露。

有了安全凭证secretId 和 secretKey后，就可以生成鉴权凭证来使用组件了：
- 初始化格式一（推荐）: 在业务方自己的后台服务器通过腾讯云api获取到临时秘钥之后传给组件的callback回调，获取临时秘钥请参考[获取联合身份临时访问凭证](https://cloud.tencent.com/document/product/598/33416)，正式部署时请再后端加一层自己网站本身的权限检验。
```
import * as plugin from 'TencentSOE-minigame-0.0.2'
let manager = plugin.getSoeRecorderManager({
  getAuthorization: function (callback) {
    wx.request({
      url: 'https://example.com/server/getFederationToken',
      method: 'POST',
      data: {},
      success: data => {
         callback({
          TmpSecretId: data.TmpSecretId,
          TmpSecretKey: data.TmpSecretKey,
          Token: data.Token
        })
      }
    });
  }
});
```