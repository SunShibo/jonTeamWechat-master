const mWx = require('../../utils/request')
const {
  login
} = require('../../utils/api')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //手机号码登录
  togglePhone() {
    wx.navigateTo({
      url: `/pages/check_phone/check_phone`,
    })
  },


  //微信登录
  login() {

    wx.showToast({title: '加载中', icon: 'loading', duration: 2000});
    //先调用微信login API接口返回code，传入后台
    wx.login({
      success: (res) => {
        let code = res.code
        if (code){
          wx.getUserInfo({
            success:function(res){
              var jsonData = {
                code: code,
                data: res.encryptedData,
                iv: res.iv
              };

              mWx.request({
                url: login,
                data: jsonData,
                success: (response) => {
                  console.log(response)
                  //判断是否需要绑定手机号
                  if(response.data.code === '00004') {
                    wx.navigateTo({
                      url: `/pages/check_phone/check_phone`,
                    })
                    return;
                  }
      
                  if(response.data.success) {
                    wx.showToast({
                      title: '登录成功',
                    })
                    //存储信息
                    wx.setStorage({
                      data: response.data.data,
                      key: 'userInfo',
                    })
                    wx.setStorage({
                      data: response.header['Set-Cookie'],
                      key: 'Cookie',
                    })
                      wx.hideLoading();
                    setTimeout(()=>{
                      wx.switchTab({
                        url: '/pages/index/index',
                      })
                    },1500);
                  } else {
                    wx.showToast({
                      title: `${response.data.msg}`,
                      icon: 'none'
                    })
                    
                  }
      
                }
              })
            }
          })
     
        }



        
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  }
})