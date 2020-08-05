// pages/message/message.js
const mWx = require('../../utils/request')
const {messageList,messageIsRead} = require('../../utils/api')
const formatTime = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:1,
    total:0,
    pages:0,
    size:10,
    dataMess: []
  },
  unread(e) {
    let isRead =  e.currentTarget.dataset.isread;
    let id =  e.currentTarget.dataset.id;
    if(isRead==="no"){
      mWx.request({
        url: messageIsRead,
        data: {
          id:id
        },
        success:(res)=>{
          if (res.data.success) {
            let tempMessageList = this.data.dataMess;
           for (let i = 0; i < tempMessageList.length; i++) {
             if(tempMessageList[i].id==id){
              tempMessageList[i].isRead = "yes"
             }
             
           }
            this.setData({
              dataMess:tempMessageList
            });

          } 
            

        }
      })
    }
    wx.navigateTo({
      url: '/pages/messDetail/messDetail?id='+id,
      
    })
  
  },
    getMessageList(current,size) {
      let userInfo =  wx.getStorageSync('userInfo');
      mWx.request({
        url: messageList,
        data: {
          userId:userInfo.id,
          pageNo:current,
          pageSize:size
        },
        success:(res)=>{
            let tempMessageList = res.data.data.records;
           if(tempMessageList.length){
            for (let i = 0; i < tempMessageList.length; i++) {
              tempMessageList[i].createTime = formatTime.forTimeStamp(new Date(tempMessageList[i].createTime));
            };
              if(this.data.dataMess.length){
                tempMessageList.push(...this.data.dataMess);
              }
          

            this.setData({
              dataMess : tempMessageList,
              size:res.data.data.size,
              current:res.data.data.current,
              pages:res.data.data.pages,
              total:res.data.data.total
            });
           }

           
        }
      })
      
  }
  ,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(this.data.state)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getMessageList(this.data.current,this.data.size);
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
    this.getMessageList(this.data.current+1,this.data.size);
    wx.stopPullDownRefresh();
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