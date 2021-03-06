const app = getApp()

Component({

  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    title: { // 头部标题
      type: String,
      value: '标题'
    },
    navColor: { //头部背景颜色
      type: String,
      value: '#0064FF'
    }
  },

  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
    statusBar: app.globalData.statusBar,
    customBar: app.globalData.customBar,
    navButtonTop: app.globalData.navButtonTop,
    navButtonHeight: app.globalData.navButtonHeight
  },

  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {


  }
})