'use strict';
const auth = require('./authorization');
let authorization = auth.get('your_secret_id', 'your_secret_key')
console.log(authorization)
