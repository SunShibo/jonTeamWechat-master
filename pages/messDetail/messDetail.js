// pages/messDetail/messDetail.js

const mWx = require('../../utils/request')
const {messageDetail} = require('../../utils/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
        messageInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        let id = options.id;
        mWx.request({
          url: messageDetail,
          data: {
            id:id
          },
          success:(res)=>{
            if (res.data.success) {
              
             this.setData({
              messageInfo:res.data.data
             });
            } 
              
  
          }
        })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})