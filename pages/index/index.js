const mWx = require('../../utils/request')
const mainmeau = require('../../utils/api').mainmeau 
const bannerSelectAll =  require('../../utils/api').bannerSelectAll
const formatMessage =  require('../../utils/util')

const appId = "wxd6832374627ba9cd";
const secret  = "cd8e5004ab75b5606c3c33d0c151ddd5";

Page({
  data: {
    bannerList: [],
    current: 0,
    industryName: '',
    industry: {},
    serverList: [],
  },
  goShop(){
    wx.navigateTo({
      url: '/pages/shop/shop',
    })
  },
  goPath(e){
    let id = e.currentTarget.dataset.id;
    let skip = e.currentTarget.dataset.skip;
    let skipPath = e.currentTarget.dataset.skippath;
    let path = '';
    let title = "";
    if(skip=="politics"){
      path = '/pages/readPar/readPar?id='+parseInt(skipPath);
      wx.navigateTo({
        url: path,
      })
    }
    else if(skip=="industry"){
      title = "行业资讯";
      path = '/pages/consultPar/consultPar?id='+parseInt(skipPath)+"&title="+title;
      wx.navigateTo({
        url: path,
      })
    }else if(skip=="serve"){
      title = "服务详情";
      path = '/pages/consultPar/consultPar?id='+id+"&title="+title;
      wx.navigateTo({
        url: path
      })
    }else{
      wx.navigateTo({
        url: '/pages/skipPage/skipPage?url='+skipPath,
      })
    }
    
  },
  goConsult(){
    wx.navigateTo({
      url: '/pages/consult/consult',
    })
  },
  goConsultDetail(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/consultPar/consultPar?id='+id,
    })
  }
  ,
  goRead(){
    wx.navigateTo({
      url: '/pages/read/read',
    })
  },
  goWin(){
    wx.navigateTo({
      url: '/pages/win/win',
    })
  },
  goReport(){
    wx.navigateTo({
      url: '/pages/report/report',
    })
  },
  goServerDetail(e){
      let id = e.currentTarget.dataset.id;
      let title = e.currentTarget.dataset.title;
      wx.navigateTo({
        url: '/pages/carbon/carbon?id='+id+"&title="+title,
      })
  }
  ,
  onLoad: function (options) {
    // 获取导航栏高度
    var that = this;
    let systemInfo = wx.getSystemInfoSync();
    let rect = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null; //胶囊按钮位置信息
    //导航栏高度
    let gap = rect.top - systemInfo.statusBarHeight; //动态计算每台手机状态栏到胶囊按钮间距
    let navBarHeight = 2 * (2 * gap + rect.height + systemInfo.statusBarHeight) + 12;
    let _height3 = rect.height;
    let _height4 = systemInfo.statusBarHeight + rect.top - systemInfo.statusBarHeight;
    this.setData({
      height1: navBarHeight,
      height2: _height3,
      height3: _height4,
    })

    // 加载首页数据
    this.initMainInfo();
    this.getBannerList();
  },
  swpierChange(e){
    this.setData({
      current: e.detail.current
    });
    
  }
  ,
  initMainInfo: function(){
    var that = this;
    mWx.request({
      url: mainmeau,
      data: {},
      success: function (res) {
        if (res.data != null || res.data != '' && res.data.code == '00000'){
          let tempList = res.data.data.industry.list;
          tempList.title = formatMessage.formatMessage(tempList.title,10);
          tempList.introduction = formatMessage.formatMessage(tempList.introduction,38);
          let tempServerList = res.data.data.serve;


        //   for (let i = 0; i < tempServerList.length; i++) {
        //    for (let j = 0; j < tempServerList[i].list.length; j++) {
        //  //   console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuu:"+tempServerList[i].list[i].title);
        //  if(tempServerList[i].list[i]!=null){
        //   tempServerList[i].list[i].title = formatMessage.formatMessage(tempServerList[i].list[i].title,11);
        //  }
            
        //    }
            
        //   }
          that.setData({
            industryName: res.data.data.industry.name,
            industry: tempList,
            serverList: tempServerList
          })

          
        }
      }
    })
  },
  //获取banner图
  getBannerList(){
    mWx.request({
      url:bannerSelectAll,
      success:(res)=>{
        this.setData({
          bannerList:res.data.data
        });
      }
    });
  },
  onPullDownRefresh(){
    this.onLoad();
    wx.stopPullDownRefresh();
  }
  
})