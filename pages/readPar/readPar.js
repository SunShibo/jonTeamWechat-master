const mWx = require('../../utils/request')
const util = require('../../utils/util')
const politicsselectPoliticsById = require('../../utils/api').politicsselectPoliticsById
var WxParse = require('../../components/wxParse/wxParse.js');

Page({
  data:{
    id: '',
    detData:{},
    time:'',
    label:[]
  },
  onLoad: function (options) {
    this.setData({
      id: options.id
    });

    var that = this;
    mWx.request({
      url: politicsselectPoliticsById,
      data: {id: that.data.id},
      header: {'Content-Type': 'application/json'},
      success: function (res) {
        if (res.data != null || res.data != '' && res.data.code == '00000'){
          that.setData({
            detData: res.data.data,
            time: util.formatTime(new Date(res.data.data.updateTime)),
            label: res.data.data.label.split(',')
          })
          WxParse.wxParse('content', 'html', res.data.data.content, that);
        }
      }
    })
  }
})
