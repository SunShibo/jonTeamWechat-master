const mWx = require('../../utils/request')
const util = require('../../utils/util')
const politicsselectPoliticsList = require('../../utils/api').politicsselectPoliticsList
const formatMessage =  require('../../utils/util')
Page({
  data: {
    list: [],
    pageNo: 0,
    pageSize: 1000
  },
  onLoad: function(){
    this.politicsselectPoliticsList();
  },
  goReadPar(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/readPar/readPar?id='+id,
    })
  },
  politicsselectPoliticsList: function(){
    var that = this;
    mWx.request({
      url: politicsselectPoliticsList,
      data: {pageNo: this.data.pageNo, pageSize: this.data.pageSize},
      header: {'Content-Type': 'application/json'},
      success: function (res) {
        if (res.data != null || res.data != '' && res.data.code == '00000'){
          var readList = that.data.pageNo == 0 ? [] : that.data.list;
          if (res.data.data.records.length > 0){
            res.data.data.records.map(item => {
              item.updateTime = util.formatTime(new Date(item.updateTime))
              item.title = formatMessage.formatMessage(item.title,10);
              item.introduction = formatMessage.formatMessage(item.introduction,40);
            })
            readList = readList.concat(res.data.data.records)
            that.setData({
              list: readList,
              pageNo: that.data.pageNo + 1
            })
          }else{
            wx.showToast({
              title: '没有数据了',
              icon:'none'
            })
          }
        }
      }
    })
  },
  onReachBottom: function () {
    this.setData({
      pageNo: this.data.pageNo + 1
    })
    this.politicsselectPoliticsList();
  }
})