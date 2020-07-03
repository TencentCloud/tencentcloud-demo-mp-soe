'use strict';
const crypto = require('crypto');
function dateFormat(date, fmt) {
  var o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    "S": date.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

function sign(key, msg) {
  let hmac = crypto.createHmac('sha256', key);
  return hmac.update(msg).digest()
}

function signHex(key, msg) {
  let hmac = crypto.createHmac('sha256', key);
  return hmac.update(msg).digest('hex')
}

function get(secret_id, secret_key) {
  //步骤1
  const hash = crypto.createHash('sha256');
  const http_request_method = "POST"
  const canonical_uri = "/"
  const canonical_querystring = ''
  const host = 'soe.tencentcloudapi.com'
  let timestamp = parseInt(new Date().getTime() / 1000)
  let timeZoneOffset = new Date().getTimezoneOffset();
  let [service, algorithm, date] = ['soe', 'TC3-HMAC-SHA256', dateFormat(new Date(timestamp * 1000 + timeZoneOffset * 60 * 1000), "yyyy-MM-dd")]
  let ct = "json"
  let payload = 'UNSIGNED-PAYLOAD'
  let canonical_headers = `content-type:application/${ct}\nhost:${host}\n`
  let signed_headers = 'content-type;host'
  let hashed_request_payload = hash.update(payload).digest('hex')
  let canonical_request = (http_request_method + "\n" +
    canonical_uri + "\n" +
    canonical_querystring + "\n" +
    canonical_headers + "\n" +
    signed_headers + "\n" +
    hashed_request_payload)

  //步骤2
  const hash2 = crypto.createHash('sha256');
  let credential_scope = date + "/" + service + "/" + "tc3_request"
  let hashed_canonical_request = hash2.update(canonical_request).digest('hex')
  let string_to_sign = (algorithm + "\n" +
    timestamp + "\n" +
    credential_scope + "\n" +
    hashed_canonical_request)

  //步骤3
  let secret_date = sign(("TC3" + secret_key), date)
  let secret_service = sign(secret_date, service)
  let secret_signing = sign(secret_service, "tc3_request")
  let signature = signHex(secret_signing, string_to_sign)

  //步骤4
  let authorization = (algorithm + " " +
    "Credential=" + secret_id + "/" + credential_scope + ", " +
    "SignedHeaders=" + signed_headers + ", " +
    "Signature=" + signature)

  return {
    "timestamp": timestamp,
    "authorization": authorization
  }
}

exports.get = get
