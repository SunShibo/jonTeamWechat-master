// pages/phone_send/phone_send.js

const mWx = require('../../utils/request')
const {
  sendUrl,
  bindPhoneUrl,
  codeLogin,
  login
} = require('../../utils/api')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: '',
    //发送按钮文本
    sendBtnText: '',
    //发送计时
    sendTime: 60,
    //发送按钮禁止
    disabled: false,

    //六位验证码
    codeNumber: '',

    codeInputIndex: 0
  },

  sendBtn() {
    if (!this.data.disabled) {
      this.send()
    }
  },

  //code输入完成
  codeInput(e) {
    console.log(e.detail.value)
    this.setData({
      codeNumber: e.detail.value
    })
    // console.log(typeof this.data.codeNumber)
    this.submitSend()
  },

  //检查code是否失效 回调中返回code值
  checkCode(cd) {
    const that = this;
    wx.login({ //重新登录
      success: (res) => {
        cd && cd(res.code)
      }
    })
  },

  /*
    提交code 
    每个code是否输入  
  */
  submitSend() {
    //判断code是否为6位
    if (this.data.codeNumber.length == 6) {
      let request = {
        phone: this.data.phoneNumber,
        vCode: this.data.codeNumber
      }
      this.checkCode((code) => {
        mWx.request({
          url: bindPhoneUrl,
          data: {
            ...request,
            code: code
          },
          success: (res) => {

            if (res.data.success) {
              wx.login({
                success: (res) => {
                  console.log(res)
                  let code = res.code
                  wx.getUserInfo({
                    success: (userRes)=> {
                      mWx.request({
                        url: login,
                        data: {
                          code: code,
                          iv: userRes.iv,
                          data: userRes.encryptedData
                        },
                        success: (response) => {
                          console.log(response)
                          //判断是否需要绑定手机号
                          if (response.data.code === '00004') {
                            wx.navigateTo({
                              url: `/pages/check_phone/check_phone?code=${code}`,
                            })
                            return;
                          }
    
                          if (response.data.success) {
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
    
                            setTimeout(() => {
                              wx.switchTab({
                                url: '/pages/index/index',
                              })
                            }, 1500);
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
              })
            } else {
              wx.showToast({
                title: `${res.data.msg}`,
                icon: 'none'
              })
            }
          }
        })
      })
    }
  },

  //发送短信
  send() {
    mWx.request({
      url: sendUrl,
      data: {
        phone: this.data.phoneNumber
      },
      success: (res) => {
        if (res.data.success) {
          this.upSendBtnText()
        } else {
          wx.showToast({
            title: `${res.data.msg}`,
            icon: 'none'
          })
        }
      }
    })
  },

  /**
   * 设置发送验证码按钮样式
   */
  upSendBtnText() {
    let interval = null,
      _this = this;
    //设置按钮禁用
    this.setData({
      disabled: true
    })
    interval = setInterval(() => {
      _this.data.sendTime--;
      _this.setData({
        sendBtnText: _this.data.sendTime + 's'
      })
      if (_this.data.sendTime <= 0) {
        clearInterval(interval)
        _this.setData({
          sendBtnText: '重新发送',
          sendTime: 60,
          disabled: false
        })
      }
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      phoneNumber: options.phone
    })
    this.send()
  }
})