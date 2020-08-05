const mWx = require('../../utils/request')
const util = require('../../utils/util')
const industryselectIndustryList = require('../../utils/api').industryselectIndustryList
const formatMessage =  require('../../utils/util')
Page({
  data: {
    list: [],
    pageNo: 1,
    pageSize: 1000
  },
  goConsultPar(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
        url: '/pages/consultPar/consultPar?id=' + id,
    })
  },
  onLoad: function () {
    this.initIndustryList();
  },
  initIndustryList: function(){
    var that = this;
    mWx.request({
      url: industryselectIndustryList,
      data: {pageNo: this.data.pageNo, pageSize: this.data.pageSize},
      success: function (res) {
        if (res.data != null || res.data != '' && res.data.code == '00000'){
          if (res.data.data.records.length > 0){
            res.data.data.records.map(item => {
              item.title = formatMessage.formatMessage(item.title,10);
              item.introduction = formatMessage.formatMessage(item.introduction,40);
              item.updateTime = util.formatTime(new Date(item.updateTime))
            })
            var list = that.data.list.concat(res.data.data.records)
            that.setData({
              list: list,
              pageNo: that.data.pageNo + 1
          })
          }else{
            wx.showToast({
              title: '没有数据了',
              icon:"none"
            })
          }
        }
      }
    })
  },
  onPullDownRefresh: function () {
    console.log('下拉');
    this.setData({
      pageNo: 1 
    })
    this.initIndustryList()
  },
  onReachBottom: function () {
    console.log("sadgasg");
    this.setData({
      pageNo: this.data.pageNo + 1 
    })
    this.initIndustryList()
  }
})