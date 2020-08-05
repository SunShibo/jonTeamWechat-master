const mWx = require('../../utils/request')
const projectupdateScoreByUserId = require('../../utils/api').projectupdateScoreByUserId;

Page({
  data: {
    projectId: '',
    projectInfo: {},
    flag: '',
    noteMaxLen: 300, // 最多放多少字
    info: "",
    noteNowLen: 0, //备注当前字数
  },
  // 监听字数
  bindTextAreaChange: function (e) {
    var that = this
    var value = e.detail.value,
      len = parseInt(value.length);
    if (len > that.data.noteMaxLen)
      return;
    that.setData({
      info: value,
      noteNowLen: len
    })
  },
  onLoad: function(options){
    this.setData({
      projectId: options.projectId,
      projectInfo: wx.getStorageSync('projectInfo')
    })
  },
  // 提交清空当前值
  bindSubmit: function () {
    if(this.data.flag == ""){
      wx.showToast({
        icon: 'none',
        title: '请您选择评分'
      })
      return ;
    }
    // 判断评分内容
    if(this.data.info == ""){
      wx.showToast({
        icon: 'none',
        title: '请您请您输入评分内容'
      })
      return ;
    }

    var that = this;
    mWx.request({
      url: projectupdateScoreByUserId,
      data: {id: this.data.projectId, evaluateContent: this.data.info, evaluateScore: this.data.flag},
      success: (res) => {
        if (res.data != null && res.data.code == "00000" ) {
          wx.showToast({
            title: '发布成功'
          })
          wx.switchTab({
            url: '/pages/item/item',
          })
        }else{
          wx.showToast({
            icon:'none',
            title: '评分失败，请您重新操作！',
          })
        }
      }
    })
  },
  changeColor1: function () {
    var that = this;
    that.setData({
      flag: 1
    });
  },
  changeColor2: function () {
    var that = this;
    that.setData({
      flag: 2
    });
  },
  changeColor3: function () {
    var that = this;
    that.setData({
      flag: 3
    });
  },
  changeColor4: function () {
    var that = this;
    that.setData({
      flag: 4
    });
  },
  changeColor5: function () {
    var that = this;
    that.setData({
      flag: 5
    });
  }
})