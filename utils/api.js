const host = "https://hny.jointeam6.com"
//const host = "http://192.168.1.107:8082"
var apis = {
  industryselectIndustryList: `${host}/industry/selectIndustryList`,
  mainmeau: `${host}/main/meau`,
  industryselectIndustryById: `${host}/industry/selectIndustryById`,
  // 政策解读
  politicsselectPoliticsList: `${host}/politics/selectPoliticsList`,
  // 政策解读详情
  politicsselectPoliticsById: `${host}/politics/selectPoliticsById`,
  //客户成功列表
  winListUrl: `${host}/client/queryAll`,
  //客户成功菜单
  winTypeUrl: `${host}/server/queryBType`,
  //客户成功详情
  winDetail: `${host}/client/queryById`,
  //项目管理 进行中列表
  projectList: `${host}/project/selectProjectByUserId`,
  //项目节点 
  projectItem: `${host}/projectInfo/selectByProjectId`,
  //项目节点详情
   projectItemDetail: `${host}/projectInfo/selectByProjectInfoId`,
  //登录接口
  login: `${host}/user/login`,
  //发送短信
  sendUrl: `${host}/user/send`,
  //绑定手机号
  bindPhoneUrl: `${host}/user/phone`,
  //验证码登录
  codeLogin: `${host}/user/loginPhone`,
  //退出登录
  logOutUrl: `${host}/user/backLogin`,
  //关于中竞
  aboutUrl: `${host}/aboutWe/selectAll`,
   // 评价
   projectupdateScoreByUserId: `${host}/project/updateScoreByUserId`,
  //消息列表
  messageList: `${host}/inform/queryAll`,
  //修改消息已读状态
  messageIsRead: `${host}/inform/isRead`,
  //添加帮助反馈
  insertHelp:`${host}/feedback/insert`,
  //消息详情页  
  messageDetail:`${host}/inform/queryDetails`,
  //服务商城类型列表 
  serverTypes:`${host}/server/queryTypes`,
    //首页banner图
    bannerSelectAll:`${host}/banner/selectAll`,
    //服务子集合 
    serverChildList:`${host}/server/query`,
    //行业资讯详情
    carbonDetail:`${host}/server/queryDetails`,
    //模板分类
    templateType:`${host}/template/queryType`,
     //模板分类
     templateList:`${host}/template/queryTemplate`,

     accessory:`${host}/accessory/queryAll`,
}
module.exports = apis