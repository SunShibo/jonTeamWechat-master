const mWx = require('../../utils/request')
const {winDetail} = require('../../utils/api')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    detailData: {}
  },

  //获取当前页面数据
  getData() {
    mWx.request({
      url: winDetail,
      data: {id: this.data.id},
      success: (res)=> {
        console.log(res.data.data)
        if(res.data.success && res.data.data.length) {
          this.setData({
            detailData: res.data.data[0]
          })
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
    this.setData({
      id: options.id
    })
    this.getData()
  }
})