// pages/shop/shop.js
const mWx = require('../../utils/request')
const {serverTypes} = require('../../utils/api')
const {serverChildList} = require('../../utils/api')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    serverList:[],
    eIndex:0,
    serverChildList:[],
    pageNo:1,
    pageSize:3,
    typeId: 0,
  },
  goType(e){
    let index =  e.currentTarget.dataset.index;
    let id=  e.currentTarget.dataset.id;
 
    let tempChildList = [];
      // for (let i = 0; i <this.data.serverList.length; i++) {
      //     if(this.data.serverList[i].id==id){
      //       if(this.data.serverList[i].child.length){
      //         tempChildList =   this.data.serverList[i].child;
      //       }
      //     }
        
      // }
    this.setData({
      eIndex:index,
      typeId:id
    });


  },
  goEnergy() {
    wx.navigateTo({
      url: '/pages/energy/energy'
    })
  },
  goCarbon() {
    wx.navigateTo({
      url: '/pages/carbon/carbon'
    })
  },
  goCarbonDetail(e){

      let id = e.currentTarget.dataset.id;
      let title = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: '/pages/carbon/carbon?id='+id+"&title="+title,
    })
  }
  ,
  /**
   * 生-监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })

    var that = this;
    this.initMainInfo().then((res)=>{
     
       that.setData({
          serverList:res,
        })
     
        wx.hideLoading();
    });
    
    
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  goEnergy(e){

    let id = e.currentTarget.dataset.id;
    let typename = e.currentTarget.dataset.typename;
    wx.navigateTo({
      url: '/pages/energy/energy?id='+id+"&typename="+typename,
    })
  }
  ,
  initMainInfo: function(){

  

    var that = this;
   return new Promise(function (resolve,reject) {
    let tempServerList
    mWx.request({
      url: serverTypes,
      data: {},
      success:  (res)=> {
        if (res.data != null || res.data != '' && res.data.code == '00000'){
           tempServerList =  res.data.data;
        for (let i = 0; i < tempServerList.length; i++) {
          for (let j = 0; j < tempServerList[i].child.length; j++) {
             that.getServerChildList(tempServerList[i].child[j].id).then( (res)=> {
               //that.data.serverChildList
              tempServerList[i].child[j].child =   res;
             });
          }
        }
        setTimeout(()=>{
          resolve(tempServerList);
         },700);

        
      }
      }
    })
      
   
   });
  }
  ,
   getServerChildList(typeId) {
    let that = this;
    return new Promise(function (resolve, reject) {
      mWx.request({
        url:serverChildList,
        data:{
          typeId:typeId,
          pageNo:that.data.pageNo,
          pageSize:that.data.pageSize
        },
        success:((res)=>{
          resolve(res.data.data.records);
        })
      });
    })
   
  }
  ,

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