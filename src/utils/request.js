import wx from './wx'
import Fly from 'flyio'

const request = new Fly()

request.config.timeout = 5000

if (process.env.NODE_ENV === 'production') {
  request.config.baseURL = 'https://www.niltouch.cn/sesame/api'
} else {
  request.config.baseURL = 'http://localhost:3000/sesame/api'
}

request.interceptors.request.use((request) => {
  wx.showLoading({ title: 'Loading...' })
  return request
})

request.interceptors.response.use(
  (response, promise) => {
    wx.hideLoading()
    return promise.resolve(response.data)
  },
  (err, promise) => {
    wx.hideLoading()
    wx.showToast({
      title: err.message,
      icon: 'none'
    })
    return promise.resolve()
  }
)

export default request

