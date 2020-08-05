const app = getApp();

const mWx = require('../../utils/request')
const {
  projectList
} = require('../../utils/api')
const formatMessage =  require('../../utils/util')
Page({
  data: {
    show: false,
    //分页
    pageNo: 1,
    pageSize: 10,
    itemPar: []
  },
  showItemAchi(e) {
    this.setData({
      show: e.currentTarget.dataset.index === '1',
      pageNo: 1,
      itemPar: []
    })
    // 查询项目列表
    this.getData();
  },
  goItemPar(e) {
    let msg = e.currentTarget.dataset.msg;
    app.newInfo = msg;
    wx.navigateTo({
      url: '/pages/itemPar/itemPar',
    })
  },
  goItemAchiPar(e) {
    var projectId = e.currentTarget.dataset.projectid;
    var isEvaluate = e.currentTarget.dataset.isevaluate;
    if(isEvaluate == "yes"){
      wx.showToast({
        title: '当前项目已评论',
      })
      return;
    }
    // 获取当前项目信息
    for(var i = 0; i < this.data.itemPar.length; i++){
      var thisProject = this.data.itemPar[i];
      if(thisProject.projectId == projectId){
        wx.setStorageSync('projectInfo', thisProject)
        break;
      }
    }
    wx.navigateTo({
      url: '/pages/itemAchiPar/itemAchiPar?projectId=' + projectId
    })
  },
  //获取当前数据
  getData() {
    var that = this;
    mWx.request({
      url: projectList,
      data: {
        accomplishStatus: !this.data.show ? 'having' : 'finished',
        pageNo: this.data.pageNo,
        pageSize: this.data.pageSize
      },
      success: (res) => {
        if (res.data != null && res.data.code == "00000" ) {
          var itemPar = that.data.itemPar;
          if(that.pageNo == 1){
            itemPar = [];
          }
          if(res.data.data.records != null ){//&& res.data.data.records.length > 0

            
            for(var i = 0; i < res.data.data.records.length; i++){
              var project = res.data.data.records[i];
              let title = formatMessage.formatMessage(project.title,12);
              itemPar.push({projectId: project.projectId, title: project.projectName, time: project.formatStartTime, conent: title, people: "负责人：" + project.stuffName, imgPath: project.image, gradeStar: project.evaluateScore, gradeConent: project.evaluateContent, isEvaluate: project.score,staffId:project.staffId});
            }
          }
          that.setData({
            itemPar: itemPar
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
  // 页面上拉触底事件的处理函数，与点击加载更多做同样的操作
  onReachBottom: function () {
    wx.showLoading({
      title: '玩命加载中...',
    });
    // 设置分页
    this.setData({
      pageNo: this.data.pageNo + 1
    })
    // 加载数据
    this.getData();
    wx.hideLoading();
  },
  onShow() {
    this.setData({
      pageNo: 1,
      itemPar: []
    })
    this.getData();
  }
})