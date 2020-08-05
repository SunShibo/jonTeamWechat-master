const mWx = require('../../utils/request')
const {
  logOutUrl
} = require('../../utils/api')


Page({

  data: {
    height2: 0,
    height3: 0,
    height1: 0,
    //用户信息
    userInfo: {},
    //是否隐藏
    showItem: true
  },

  //跳转关于中竞
  goAbout(){
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  goMessagePage(){
    wx.navigateTo({
      url: '/pages/message/message',
    })
  }
  ,

  //退出登录
  logout() {
    mWx.request({
      url: logOutUrl,
      data:{},
      success: (res)=> {
        if(res.data.success){
          this.setData({
            userInfo: {},
            showItem: false
          })

          //异步清空缓存中的数据
          wx.clearStorageSync('userInfo')
          wx.clearStorageSync('cookie')
        }
      }
    })
  },

  //跳转登录页面
  login() {
    if(!this.data.showItem) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },
  goHelp(){
      wx.navigateTo({
        url: '/pages/help/help',
      })
  },
  goCallUS(){
    wx.navigateTo({
      url: '/pages/callUs/callUs',
    })
  }
  ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取导航栏高度
    var that = this;
    let systemInfo = wx.getSystemInfoSync();
    let rect = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null; //胶囊按钮位置信息
     //导航栏高度
     let gap = rect.top - systemInfo.statusBarHeight; //动态计算每台手机状态栏到胶囊按钮间距
    let navBarHeight = 2*(2 * gap + rect.height + systemInfo.statusBarHeight)+12;
    let _height3 = rect.height;
    let _height4 = systemInfo.statusBarHeight + rect.top - systemInfo.statusBarHeight;
    this.setData({
      height1: navBarHeight,
      height2: _height3,
      height3: _height4,
    })
  },

  onShow() {
    wx.getStorage({
      key: 'userInfo',
      success: (res)=> {
        console.log(res)
        this.setData({
          userInfo: res.data,
          showItem: true
        })
      },
      fail:(err)=> {
        console.log(err)
        this.setData({
          userInfo: {},
          showItem: false
        })
      }
    })

    
  }
})