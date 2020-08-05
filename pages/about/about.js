// pages/about/about.js
const mWx = require('../../utils/request')
const {
  aboutUrl
} = require('../../utils/api')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    aboutData: {}
  },

  //获取关于中竞数据
  getData() {
    mWx.request({
      url: aboutUrl,
      success: (res) => {

        if (res.data.success) {
          let nodes = res.data.data.content.replace(
            /<img/g,
            '<img style="width:100%;" '
          );
          this.setData({
            aboutData: {...res.data.data, content: nodes}
          })
          console.log(this.data.aboutData)
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
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getData()
  }
})