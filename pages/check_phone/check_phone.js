// pages/check_phone/check_phone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled_btn: true,
    phoneNumber: ''
  },

  //下一步按钮
  next() {
    wx.navigateTo({
      url: `/pages/phone_send/phone_send?phone=${this.data.phoneNumber}`,
    })
  },

  //输入框input事件
  phoneInput(e) {
    let reg = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/

    if (reg.test(e.detail.value)) {
      this.setData({
        disabled_btn: false,
        phoneNumber: e.detail.value
      })
    } else {
      this.setData({
        disabled_btn: true,
        phoneNumber: ''
      })
    }
  }
})