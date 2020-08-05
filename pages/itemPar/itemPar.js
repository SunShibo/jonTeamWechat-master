// pages/itemPar/itemPar.js
const app = getApp();
const {
  projectItem
} = require("../../utils/api");
const mWx = require('../../utils/request')
const utils = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataItemPar: [],
    isFlag: 0,
    itemDetail: {}, //项目详情
    staffBO: {}, //总负责人信息
    projectItemDetail: [], //项目节点
    startTime: "",
    endTime: "",
    progress: 0,
    isHave: false,
    dateTime: ''
  },
  goItemParCon(e) {
    let id = e.currentTarget.dataset.id;
    let msg = e.currentTarget.dataset.msg;
    wx.navigateTo({
      url: '/pages/itemParCon/itemParCon?id=' + id + "&msg=" + msg,
      isFlag: 1,
    })

  },
  callPhone(e) {
    let phone = e.currentTarget.dataset.phone;
    console.log(phone);
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      dateTime: utils.formatTime1(new Date())
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

    let itemDetail = app.newInfo;
    this.setData({
      itemDetail: itemDetail
    });

    mWx.request({
      url: projectItem,
      data: {
        projectId: this.data.itemDetail.projectId,
        stuffId: this.data.itemDetail.staffId
      },
      success: (res) => {

        if (res.data.success) {
          let tempList = res.data.data.projectInfoManageBOList;
          if (tempList.length > 0) {
            for (let i = 0; i < tempList.length; i++) {
              if (tempList[i].completionStatus == "having") {
                tempList[i]["circlePath"] = "/static/imgs/circleBlue.png";
                tempList[i]["projectItemStatus"] = "当前进行";
              } else if (tempList[i].completionStatus == "stopping") {
                tempList[i]["projectItemStatus"] = "已暂停";
                tempList[i]["circlePath"] = "/static/imgs/circleWhite.png";
              } else if (tempList[i].completionStatus == "finished") {
                tempList[i]["projectItemStatus"] = "已结束";
                tempList[i]["circlePath"] = "/static/imgs/circleWhite.png";
              } else {
                tempList[i]["projectItemStatus"] = "未开始";
                tempList[i]["circlePath"] = "/static/imgs/circleWhite.png";
              }
            }
            this.setData({
              isFlag: tempList.length - 1,
              startTime: utils.formatDateByLine(tempList[0].startTime),
              endTime: utils.formatDateByLine(tempList[0].predictEndTime),
              progress: tempList[0].percentage,
              staffBO: res.data.data.staffBO,
              projectItemDetail: tempList,
              isHave: true
            });
          } else {
            this.setData({
              isHave: false
            });
          }
        }


      }
    });

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