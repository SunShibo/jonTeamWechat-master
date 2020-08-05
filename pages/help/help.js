// pages/help/help.js
const mWx = require('../../utils/request')
const {insertHelp} = require('../../utils/api')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    noteMaxLen: 500, // 最多放多少字
    titleMaxLen:50,
    titleInfo: "",
    contentInfo:"",
    noteNowLen: 0,//备注当前字数,
    titleFlag: false,
    contentFlag:false
  },
  // 监听字数
  bindTextAreaChange: function (e) {
    var that = this
    var value = e.detail.value,
      len = parseInt(value.length);
      this.setData({
        contentInfo:value,
        noteNowLen:len
      });
    if (len >= that.data.noteMaxLen){
      this.setData({
        contentFlag : true
      })
      return;
    // that.setData({ info: value, noteNowLen: len })
    }else{
      this.setData({
        contentFlag : false
      })
    }
    
  },
  bindTitleInputaChange(e){
    var value = e.detail.value
    var len = value.length;
    this.setData({
      titleInfo:value
    });

    if(len>=this.data.titleMaxLen){
      this.setData({
        titleFlag : true
      })
      return;
    }else{
      this.setData({
        titleFlag : false
      })
    }
  }
  ,
  submitHelp(){

     if(this.data.titleFlag || this.data.contentFlag){
       wx.showToast({
         title: '不规范的输入信息',
         icon:"none"
       })
     }else if(this.data.titleInfo.length<=0||this.data.contentInfo.length<=0){
      wx.showToast({
        title: '输入信息不能为空!',
        icon:"none"
      })
     }else{
      let userInfo = wx.getStorageSync('userInfo');
      mWx.request({
       url: insertHelp,
       data: {
         content:  this.data.contentInfo,
      title:    this.data.titleInfo,
      userId: userInfo.id
       },
       success:(res)=>{
         if (res.data.success) {
           wx.showToast({
             title: '添加成功!',
             duration:1500,
          })
         setTimeout(()=>{
           wx.switchTab({
             url: '/pages/mine/mine',
           })
         },1500);
         } 
       }
     })
     }
  }
  ,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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