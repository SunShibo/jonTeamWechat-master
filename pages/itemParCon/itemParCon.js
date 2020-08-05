// pages/itemParCon/itemParCon.js
const {projectItemDetail} =  require("../../utils/api");
const mWx = require('../../utils/request')
const forTimeStampToWeek = require("../../utils/util.js");
const {accessory} =  require("../../utils/api");
var WxParse = require('../../components/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      projectDetail:{},
      imageList:[],
      msg:"",
      accessoryList:[],
      aaa:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    let msg = options.msg;
    var that = this;
    mWx.request({
      url:projectItemDetail,
      data:{
        projectInfoId:id
      },
      success:(res)=>{
        if(res.data.success){
          //forTimeStampToWeek
          let tmepDetail = res.data.data.projectInfoContentBO;
          tmepDetail["formatDate"] = forTimeStampToWeek.forTimeStampToWeek(tmepDetail.date);
          console.log(tmepDetail.date+"1231231231")
          this.setData({
            projectDetail: tmepDetail,
            imageList: res.data.data.imgList,
            msg:msg
          })
          console.log(tmepDetail.content)
          WxParse.wxParse('content', 'html', tmepDetail.content, this);
        }
      }
    });
  
    mWx.request({
      url:accessory,
      data:{
        pId:id,
        type:"info"
      },
      success:(res)=>{
        console.log(res.data);
        if(res.data.success){
  
            this.setData({
              accessoryList:res.data.data.map(item=> {
                let name = `${item.name}.${item.path.split('.').pop()}`
                return {
                  ...item,
                  name: name
                }
              })
            });
            console.log(this.data.accessoryList);
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
  onShow: function (options) {
    
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