
// pages/report/report.js
const mWx = require('../../utils/request')
const {templateType,templateList} =  require('../../utils/api')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataReport:[],
    pageNo:1,
    pageSize	:5,
    eIndex:0
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.queryTemplateType().then((res)=>{
      
      that.setData({
        dataReport:res
      });
      // console.log("ccccccccccccccccccccc:"+this.data.dataReport[0].child[0].name);
    });
 
    
  },
  switchIndex(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
      eIndex: index
    });
  }
  ,
  showFile(e){
    let path = e.currentTarget.dataset.path;
   
wx.downloadFile({
  url: path,
  success: function (res) {
    const tempFilePath = res.tempFilePath;
    // 保存文件
    wx.saveFile({
      tempFilePath,
      success: function (res) {
        const savedFilePath = res.savedFilePath;
        // 打开文件
        wx.openDocument({
          filePath: savedFilePath,
          success: function (res) {
            console.log('打开文档成功')
          },
        });
      },
      fail: function (err) {
        console.log('保存失败：', err)
      }
    });
  },
  fail: function (err) {
    console.log('下载失败：', err);
  },
});

  }
  ,
  //word excel  pdf ?
  //查询所有模板分类
  queryTemplateType(){
   let that = this;
    return new Promise(function (resolve,reject) {
      mWx.request({
        url:templateType,
        success:(res)=>{
          if(res.data.success){
            // that.setData({
            //   dataReport: res.data.data
            // });
            let tempType = res.data.data;
            for (let i = 0; i < tempType.length; i++) {
              that.queryTemplateList(tempType[i].typeId,that.data.pageNo,that.data.pageSize).then((res)=>{
               // console.log("4444444444444444444444444444444::"+res.data.data.records.length);

                if(res.data.success && res.data.data.records.length){
                  
                  let tempList =  res.data.data.records;
                     for (let i = 0; i < tempList.length; i++) {

                    let tempName = tempList[i].name;
                    let type = "";
                    let tags =  tempList[i].name.split(".")[1];
                    console.log("eeeeeeeeeeeeeeeeeeee:"+tempList[i].path);
                    if(tags=="pdf"){
                      type ="/static/imgs/report3.png";
                    }else if(tags=="docx"){
                      type = "/static/imgs/report2.png";
                    }else if(tags=="xlsx"){
                      type = "/static/imgs/report4.png";
                    }else{
                      type = "/static/imgs/report1.png";
                    }
                    tempList[i]["type"] = type;
                }
                  tempType[i]["child"] = tempList;
                }
              });
            }
            setTimeout(()=>{
              resolve(tempType);
            },200);
          }
        }
      });
    });
  },
  //查询所有分类的子列表
    queryTemplateList(typeId,pageNo,pageSize){

      return new Promise(function (resolve,reject) {
        mWx.request({
          url:templateList,
          data:{
          typeId: typeId,
          pageNo:pageNo,
          pageSize:pageSize
          },
          success:(res)=>{
            if(res.data.success){
              resolve(res);
            }
          }
        });
      });

    }
  ,

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})