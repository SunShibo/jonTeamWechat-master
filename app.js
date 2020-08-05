//app.js
import 'umtrack-wx';
App({
  umengConfig: {
    appKey: '5edc8f98978eea085d11d48f', //由友盟分配的APP_KEY
    // 是否使用openid进行统计，此项为false时将使用友盟+随机ID进行用户统计。
    // 使用openid来统计微信小程序的用户，会使统计的指标更为准确，对系统准确性要求高的应用推荐使用OpenID。
    useOpenid: false,
    autoGetOpenid: false, // 是否需要通过友盟后台获取openid，如若需要，请到友盟后台设置appId及secret
    debug: true, //是否打开调试模式
    uploadUserInfo: true // 自动上传用户信息，设为false取消上传，默认为false
  }
  ,
  onLaunch: function () {
    //获取系统参数 适配顶部导航栏
    wx.getSystemInfo({
      success: e => {
        this.globalData.statusBar = e.statusBarHeight; //状态栏高度
        let custom = wx.getMenuButtonBoundingClientRect(); //菜单按钮
        this.globalData.navButtonTop = custom.top; //胶囊按钮与顶部的距离
        let navButtonHeight = 48;
        if (e.model.indexOf('iPhone') !== -1) {
          navButtonHeight = 44
        }
        this.globalData.navButtonHeight = navButtonHeight;
        this.globalData.custom = custom;
        //获取顶部导航栏总高度
        this.globalData.totalTopHeight = e.statusBarHeight + navButtonHeight;
      }
    })

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
   newInfo:{
     
   }

})