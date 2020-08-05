const mWx = require('../../utils/request')
const {
  winListUrl,
  winTypeUrl
} = require('../../utils/api')
const formatMessage =  require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeData: [],

    listData: [],
    navIndex: 0
  },

  //菜单点击
  navClick(e) {
    this.setData({
      navIndex: e.currentTarget.dataset.index
    })
    this.getData(e.currentTarget.dataset.typeid)
  },

  goWinBackup(e) {
    wx.navigateTo({
      url: `/pages/winBackup/winBackup?id=${e.currentTarget.dataset.item.id}`,
    })
  },

  //获取类型数据
  getTypeData() {
    mWx.request({
      url: winTypeUrl,
      success: (res) => {
        if (res.data.success) {
          this.setData({
            typeData: res.data.data
          })

          this.getData(res.data.data[0].id)

        } else {
          wx.showToast({
            title: `${res.data.msg}`,
            icon: 'none'
          })
        }
      }
    })
  },

  //获取数据
  getData(typeId) {
    mWx.request({
      url: winListUrl,
      data: {typeId: typeId, pageNo: 1, pageSize: 9999},
      success: (res) => {
        if (res.data.success) {
          //使用map遍历typeData 循环判断是否是当前typeData下的item
          // let listData = this.data.typeData.map(item => {
          //   let ch_list = []

          //   res.data.data.records.forEach((listItem, index)=> {
          //     if(item.id === listItem.typeId) {
          //       ch_list.push(listItem)
          //     }
          //   })
            
          //   return {
          //     ...item,
          //     ch: ch_list
          //   }
          // })

          let tempList = res.data.data.records;
          for (let i = 0; i < tempList.length; i++) {
            tempList[i].projectName = formatMessage.formatMessage(tempList[i].projectName,8);
          }
          this.setData({
            listData: tempList
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(winTypeUrl)
    this.getTypeData()
  }
})