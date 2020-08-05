const app = getApp();
// 获取token
function getToken(callback) {
  callback(wx.getStorageSync("Cookie"));
}
// 封装request请求
const request = options => {
  if (options) {
    getToken(function (Cookie) {

      if(options.header===undefined || options.header===null){
        options.header = {};
        options.header['Content-Type'] = 'application/json';
      }
      options.method = 'post';
      if (Cookie != null && Cookie != '') {
        options.header['Cookie'] = Cookie;
      }
     
      //success
      if (options.success && typeof (options.success) === 'function') {
        let successCallback = options.success;
        let failCallback = options.fail;
        options.success = function (res) {
          console.log('success = '+options.url + ':' + 'data = ' + JSON.stringify(options.data) + ',res1 = ' + JSON.stringify(res));
          
          successCallback(res);        
        }
      }
      //执行微信的请求
      wx.request(options);
    });
  }
}
module.exports = {
  request: request
}