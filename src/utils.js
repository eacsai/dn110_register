import { wxLoginExpires } from "../server/config";
import config from './pages/config'
export function showSuccess(text) {
    wx.showToast({
        title:text,
        icon: 'success',
        duration: 2000
    })
}

// 将Promise对象封装在request()函数中
function request (url, method, data) {
    // 将wx.request请求API包装成一个Promise对象
    return new Promise((resolve, reject) => {
      // wx.request是微信的API
      wx.request({
        url: config.host + url,
        method,
        data,
        success: function (res) {
          console.log('请求返回到前端的信息：', res)
          // 当返回信息中res.data.code为0时，说明执行成功，将状态变成resolved
          // 如果为-1说明执行失败，将状态变成rejected
          if (res.data.code === 0) {
            resolve(res)
          } else {
            reject(res.data)
          }
        }
      })
    })
  }

  // get工具函数
export function get (url, data) {
    // 返回的是一个Promise对象
    return request(url, 'GET', data)
  }
  
  // post工具函数
  export function post (url, data) {
    // 返回的是一个Promise对象
    return request(url, 'POST', data)
  }

  export function date() {
    var date = new Date();
    var strDate = date.getDate();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var currentdate = year + "-" + month + "-" + strDate;
    return currentdate
  }