'use strict';
const auth = require('authorization');

exports.main = (event, context, callback) => {
  return auth.get('yourSecretId', 'yourSecretKey')
};
