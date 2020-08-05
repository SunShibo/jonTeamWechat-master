// pages/cunsult/cunsult.js
const mWx = require('../../utils/request')
const {serverChildList} = require('../../utils/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
        dataList:[],
        pageSize:10,
        current:1,
        typeId:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let id = options.id;
      let typename = options.typename;
      wx.setNavigationBarTitle({
        title: typename,
      })
      this.setData({
        typeId: id
      });
      this.getServerList(id,this.data.current,this.data.pageSize);
    },
    goCarbon(e){
      let id = e.currentTarget.dataset.id;
      let title = e.currentTarget.dataset.title;
      wx.navigateTo({
        url: '/pages/carbon/carbon?id='+id+"&title="+title,
      })
    },
    getServerList(id,current,pageSize){
      mWx.request({
        url:serverChildList,
        data:{
          typeId:id,
          pageSize:pageSize,
          pageNo:current
        },
        success:(res)=>{
            if(res.data.data.records.length>0 && res.data.data!=null && res.data.success){
              let tempList = res.data.data.records;
              tempList.push(...this.data.dataList);
              this.setData({
                current:res.data.data.current,
                pageSize:res.data.data.size,
                dataList:tempList
              });
            }
        }
      });
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
    let currnt =  this.data.current+1;
    this.getServerList(this.data.typeId,currnt,this.data.pageSize);
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
