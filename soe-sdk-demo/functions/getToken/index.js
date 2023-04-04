// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
const tencentcloud = require("tencentcloud-sdk-nodejs");
exports.main = async () => {
  const StsClient = tencentcloud.sts.v20180813.Client;

  // 实例化一个认证对象，入参需要传入腾讯云账户secretId，secretKey,此处还需 注意密钥对的保密
  // 密钥可前往https://console.cloud.tencent.com/cam/capi网站进行获取
  const clientConfig = {
    credential: {
      secretId: 'your secretid', // 用户的 SecretId，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
      secretKey: 'your secretkey',  // 用户的 SecretKey，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
    },
    region: "ap-beijing",
    profile: {
      httpProfile: {
        endpoint: "sts.tencentcloudapi.com",
      },
    },
  };
  // 实例化要请求产品的client对象,clientProfile是可选的
  const client = new StsClient(clientConfig);
  const policy = {
    version: '2.0',
    statement: {
      effect: 'allow',
      action: ['soe:TransmitOralProcessWithInit'],
      resource: '*'
    }
  };
  const params = {
    "Name": "soe",
    "Policy": encodeURIComponent(JSON.stringify(policy))
  };
  return client.GetFederationToken(params);
} 
