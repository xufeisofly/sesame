var Fly = require('flyio/dist/npm/wx')
var request = new Fly()

request.config.timeout = 5000

if (process.env.NODE_ENV === 'production') {
  request.config.baseURL = 'https://www.niltouch.cn/sesame/api'
} else {
  request.config.baseURL = 'http://localhost:3000/sesame/api'
}

export default request
