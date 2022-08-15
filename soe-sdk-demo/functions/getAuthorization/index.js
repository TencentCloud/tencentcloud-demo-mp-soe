'use strict';
const auth = require('authorization');

exports.main = (event, context, callback) => {
  return auth.get('yourSecretId', 'yourSecretKey')
};

//app.post('/',function (req, res) {
//  const auth = require('./authorization');
//  let authorization = auth.get('your_secret_id', 'your_secret_key')
//  res.json(authorization);
//})