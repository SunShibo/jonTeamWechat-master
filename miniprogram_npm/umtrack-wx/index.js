"use strict";function t(t){n(wx.request,t)}function n(t,n){var e=n.success,i=n.fail,r=!1,o=null;n.success=function(t){if(!r){o&&clearTimeout(o);"function"==typeof e&&e(t)}};n.fail=function(){if(!r){o&&clearTimeout(o);"function"==typeof i&&i()}};t(n);o=setTimeout(()=>{o&&clearTimeout(o);r=!0;"function"==typeof i&&i(r)},n.timeout||z)}function e(n){try{t(n)}catch(t){G().e("请求失败: "+t)}}function i(t){return pt.encode(t,!1)}function r(t){return pt.decode(t)}function o(t){for(var n="",e=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],i=0;i<Number(t);i++)n+=e[Math.round(Math.random()*(e.length-1))];return n}function a(t){return!Number.isNaN(parseInt(t,10))}function u(t,n){for(var e=String(t).split("."),i=String(n).split("."),r=0;r<Math.max(e.length,i.length);r++){var o=parseInt(e[r]||0,10),a=parseInt(i[r]||0,10);if(o>a)return 1;if(o<a)return-1}return 0}function c(t){return JSON.parse(JSON.stringify(t))}function s(t,n){return!(!t||!n||0===n.length||n.length>t.length)&&t.substr(0,n.length)===n}function f(t,n){return!(!n||0===t.length||n.length>t.length)&&t.substring(t.length-n.length)===n}function p(t){if(void 0===t||null===t)throw new TypeError("Cannot convert undefined or null to object");for(var n=Object(t),e=1;e<arguments.length;e++){var i=arguments[e];if(i)for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(n[r]=i[r])}return n}function l(t,n){if(t===n)return!0;if(t&&"object"==typeof t&&n&&"object"==typeof n){if(Object.keys(t).length!==Object.keys(n).length)return!1;for(var e in t){if(Object.prototype.hasOwnProperty.call(n,e))return!1;if(!l(t[e],n[e]))return!1}return!0}return!1}function d(t,n){if(!t)return"";if("string"==typeof n&&n.length){var e=new RegExp("^"+n+"*");t=t.replace(e,"")}else t=t.replace(/^s*/,"");return t}function h(t,n){if(!t)return"";var e,i;if("string"==typeof n&&n.length){e=new RegExp(n);i=t.length;for(;e.test(t.charAt(i));)i-=1;return t.slice(0,i+1)}e=/s/;i=t.length-1;for(;e.test(t.charAt(i));)i-=1;return t.slice(0,i+1)}function g(t){var n=null;switch(t){case wt.HALF_SESSION:n=v();break;case wt.CLOSE_SESSION:n=_();break;case wt.EKV:n=y()}return n}function v(){var t=null,n=kt().cloneCurrentSession();n&&(t={header:{st:"1"},analytics:{sessions:[n]}});return t}function _(){var t=null,n={},e=kt().cloneCurrentSession();if(e){var i=W().get(),r=gt().get();Array.isArray(i)&&i.length&&(e.pages=lt.clone(i));Array.isArray(r)&&r.length&&(e.shares=lt.clone(r));W().clear();gt().clear();n.sessions=[e]}var o=mt().getEkvs();if(o){n.ekvs=lt.clone(o);mt().clear()}(n.sessions||n.ekvs)&&(t={analytics:n});return t}function y(){var t=null,n=mt().getEkvs();if(n){t={analytics:{ekvs:lt.clone(n)}};mt().clear()}return t}function m(t){return{h:E(t.header,Pt),a:S(t.analytics,Ut)}}function E(t,n){var e=I(t,n);t.id_tracking&&(e[n.id_tracking||"id_tracking"]=I(t.id_tracking,Lt));return e}function I(t,n){var e={};for(var i in t)n[i]?e[n[i]]=t[i]:e[i]=t[i];return e}function S(t,n){var e={};if(t)for(var i in t)t[i]&&(e[n[i]]=t[i]);return e}function T(t,n,i,r){Rt.instance().setIdType(dt().getIdType());Rt.instance().setIdTracking(dt().getIdTracking());var o=dt().getUserId();o&&t.analytics&&(t.analytics.active_user={puid:o,provider:dt().getProvider()});var a=lt.clone(Rt.instance().get());t.header=lt.assign(a,t.header,{ts:Date.now(),testToken:bt().getToken(),traceId:lt.getRandomStr(10)+Date.now()+lt.getRandomStr(9)});var u=m(t),c=K.stringify(u),s={url:X.LOG_URL,method:"POST",data:lt.base64Encode(c),success:function(e){var r=e.code||e.status||e.statusCode;if(200===r||413===r){G().i("数据发送成功: ",t,c);N((e.data||{}).imprint);"function"==typeof n&&n(e)}else{G().w("数据发送失败: ",c);"function"==typeof i&&i()}},fail:function(t){G().w("超时: ",c);"function"==typeof i&&i()},complete:function(){"function"==typeof r&&r()}};e(lt.assign(s,A()))}function N(t){if(t){Y().set(X.IMPRINT,t);Rt.instance().setItem(X.IMPRINT,t);var n=K.parse(lt.base64Decode(t));G().v("imprint: %o",n);var e=n.report_policy;if(e&&lt.isNumber(e)){Y().set(X.REPORT_POLICY,e);if(e===X.REPORT_POLICY_INTERVAL){var i=n.report_interval;if(i&&lt.isNumber(i)){i<=X.EVENT_SEND_MIN_INTERVAL?i=X.EVENT_SEND_MIN_INTERVAL:i>X.EVENT_SEND_MAX_INTERVAL&&(i=X.EVENT_SEND_MAX_INTERVAL);Y().set(X.REPORT_INTERVAL_TIME,i)}}}n.ttn_invalid&&bt().clear()}}function A(){;"wxmp/json";return{header:{"Content-Type":"wxmp/json","Msg-Type":"wxmp/json"}}}function O(t){var n=t,e=[];this.enqueue=function(t){"number"==typeof n&&this.size()>=n&&this.dequeue();e.push(t)};this.dequeue=function(){return e.shift()};this.front=function(){return e[0]};this.isEmpty=function(){return 0===e.length};this.clear=function(){e.length=0};this.size=function(){return e.length};this.items=function(){return e};this.print=function(){console.log(e.toString())}}function R(t,n){this.id=t;this.ts=Date.now();var e=typeof n;if("string"===e&&n)this[t]=n;else if("object"===e)for(var i in n)({}).hasOwnProperty.call(n,i)&&(this[i]=n[i])}function w(){function t(){dt().init(function(){Rt.instance().init();G().v("Header初始化成功")})}function n(t,n){return"number"!=typeof o||"number"!=typeof n||(o<=0||t-o>n)}function e(t,n){if(!t||"string"!=typeof t){G().e('please check trackEvent id. id should be "string" and not null');return!1}var e=["id","ts","du"],i={};e.forEach(function(t){i[t]=1});if(i[t]){G().e("eventId不能与以下保留字冲突: "+e.join(","));return!1}if(t.length>X.MAX_EVENTID_LENGTH){G().e("The maximum length of event id shall not exceed "+X.MAX_EVENTID_LENGTH);return!1}if(n&&("object"!=typeof n||Array.isArray(n))&&"string"!=typeof n){G().e("please check trackEvent properties. properties should be string or object(not include Array)");return!1}if("object"==typeof n){var r=0;for(var o in n)if({}.hasOwnProperty.call(n,o)){if(o.length>X.MAX_PROPERTY_KEY_LENGTH){G().e("The maximum length of property key shall not exceed "+X.MAX_PROPERTY_KEY_LENGTH);return!1}if(r>=X.MAX_PROPERTY_KEYS_COUNT){G().e("The maximum count of properties shall not exceed "+X.MAX_PROPERTY_KEYS_COUNT);return!1}if(i[o]){G().e("属性中的key不能与以下保留字冲突: "+e.join(","));return!1}r+=1}}return!0}var i=!1,r=!1,o=0;this.init=function(n){G().v("sdk version: "+X.IMPL_VERSION);i?G().v("Lib重复实例化"):Y().load(function(){G().v("cache初始化成功: ",Y().getAll());t();i=!0;"function"==typeof n&&n();G().tip("SDK集成成功")})};this.resume=function(t){function n(t,e,i){dt().getId()||t<=0||dt().getOpenIdAsync({success:function(t){G().v("获取openid成功: %s",t);i.setOpenid(t)},fail:function(){G().v("获取openid失败,启动重试,剩余可用次数",t-1);setTimeout(function(){n(t-1,e,i)},e)}})}if(i&&!r){G().v("showOptions: ",t);var e=this;r=!0;var o=kt().resume(t),a=kt().getCurrentSessionId();mt().setSessionId(a);bt().init(function(){xt().load();o&&xt().add(wt.HALF_SESSION,{},function(){H().useOpenid()&&H().autoGetOpenid()&&!dt().getId()?n(10,3e3,e):xt().send()})})}};this.pause=function(){if(i){r=!1;o=0;kt().pause();H().uploadUserInfo()&&Mt().update();xt().send(wt.CLOSE_SESSION,{},function(){xt().save();Y().save();G().v("cache save success")})}};this.setOpenid=function(t){G().v("setOpenId: %s",t);dt().setOpenid(t);xt().send()};this.setUnionid=function(t){G().v("setUnionid: %s",t);dt().setUnionid(t)};this.setUserid=function(t,n){G().v("setUserid: %s",t,n);dt().setUserid(t,n)};this.trackEvent=function(t,r){if(i){G().v("event: ",t,r);if(e(t,r)){var a=new R(t,r);mt().addEvent(a);var u=!!bt().getToken(),c=u?0:X.EVENT_SEND_DEFAULT_INTERVAL,s=Date.now();if(n(s,c)){o=s;xt().send(wt.EKV,{noCache:u},function(){})}}}};this.trackShare=function(t){if(i){try{t=gt().add(t);G().v("sharePath: ",t.path)}catch(t){G().v("shareAppMessage: ",t)}return t}};this.trackPageStart=function(t){i&&W().addPageStart(t)};this.trackPageEnd=function(t){i&&W().addPageEnd(t)}}function k(){}function U(t,n){if(t>=jt.length||n){n&&P();n&&G().v("命中可用服务",jt[Gt]);!n&&G().tip_w("未命中可用服务");return!1}e({url:jt[t]+"/uminiprogram_logs/ckdh",success:function(n){if(200===(n.code||n.status||n.statusCode)&&n.data&&200===n.data.code){Gt=t;U(t+1,!0)}else U(t+1,!1)},fail:function(){U(t+1,!1)}})}function P(){var t="https://umini.shujupie.com";X.LOG_URL=X.LOG_URL.replace(t,jt[Gt]);X.GET_OPENID_URL=X.GET_OPENID_URL.replace(t,jt[Gt]);X.USERINFO_URL=X.USERINFO_URL.replace(t,jt[Gt])}function L(t){setTimeout(()=>{U(0,!1)},t)}function D(t,n,e){var i=t[n];t[n]=function(t){e.call(this,t);i&&i.call(this,t)}}function C(t){try{qt.init(t)}catch(t){G().v("onAppLaunch: ",t)}}function b(t){try{qt.resume(t)}catch(t){G().v("onAppShow: ",t)}}function x(){try{qt.pause()}catch(t){G().v("onAppHide: ",t)}}function M(){try{qt.trackPageStart(this.route)}catch(t){G().v("onPageShow: ",t)}}function V(){try{qt.trackPageEnd(this.route)}catch(t){G().v("onPageHide: ",t)}}var j="[UMENG] -- ",G=function(){function t(){this.setDebug=function(t){e=t};this.d=function(){if(e)try{"string"==typeof arguments[0]&&(arguments[0]=j+arguments[0]);console.debug.apply(console,arguments)}catch(t){}};this.i=function(){try{if(e)try{"string"==typeof arguments[0]&&(arguments[0]=j+arguments[0]);console.info.apply(console,arguments)}catch(t){}}catch(t){}};this.e=function(){if(e)try{"string"==typeof arguments[0]&&(arguments[0]=j+arguments[0]);console.error.apply(console,arguments)}catch(t){}};this.w=function(){if(e)try{"string"==typeof arguments[0]&&(arguments[0]=j+arguments[0]);console.warn.apply(console,arguments)}catch(t){}};this.v=function(){if(e)try{"string"==typeof arguments[0]&&(arguments[0]=j+arguments[0]);console.log.apply(console,arguments)}catch(t){}};this.t=function(){if(e)try{console.table.apply(console,arguments)}catch(t){}};this.tip=function(){try{"string"==typeof arguments[0]&&(arguments[0]=j+arguments[0]);console.log.apply(console,arguments)}catch(t){}};this.tip_w=function(t){try{console.log("%c "+j+t,"background:red; padding: 4px; padding-right: 8px; border-radius: 4px; color: #fff;")}catch(t){}};this.err=function(){try{"string"==typeof arguments[0]&&(arguments[0]=j+arguments[0]);console.error.apply(console,arguments)}catch(t){}}}var n=null,e=!1;return function(){null===n&&(n=new t);return n}}(),F={set:function(t,n,e){var i,r={key:t,success:function(t){"function"==typeof e&&e(t)},fail:function(){"function"==typeof e&&e()}};r.data=n;i=wx.setStorage;try{i&&i(r)}catch(t){G.e("存储错误",t)}},get:function(t,n){var e;e=wx.getStorage;try{e&&e({key:t,success:function(t){"function"==typeof n&&n(t.data)},fail:function(e){G().w(t+": "+e.errMsg);"function"==typeof n&&n()}})}catch(t){G.e("获取storage错误",t)}},remove:function(t,n){var e;e=wx.removeStorage;try{e&&e({key:t,success:function(){"function"==typeof n&&n(!0)},fail:function(){"function"==typeof n&&n(!1)}})}catch(t){G.e("删除storage错误",t)}}},K={stringify:function(t){if(t)try{return JSON.stringify(t)}catch(t){}return""},parse:function(t){if(t)try{return JSON.parse(t)}catch(t){}return null},parseToArray:function(t){if(t)try{return JSON.parse(t)}catch(t){}return[]}},H=function(){function t(){var t={};this.useOpenid=function(){return t.useOpenid};this.autoGetOpenid=function(){return t.autoGetOpenid};this.appKey=function(){return t.appKey};this.uploadUserInfo=function(){return t.uploadUserInfo};this.set=function(n){t=n};this.get=function(){return t};this.setItem=function(n,e){t[n]=e};this.getItem=function(n){return t[n]}}var n=null;return function(){n||(n=new t);return n}}(),Y=function(){function t(){this.load=function(t){if(i){F.remove(e);t()}else{e="um_cache_"+H().appKey();F.get(e,function(n){i=K.parse(n)||{};r=!0;F.remove(e);t()})}};this.save=function(){i&&F.set(e,K.stringify(i))};this.set=function(t,n){i&&(i[t]=n)};this.get=function(t){return(i||{})[t]};this.remove=function(t){i&&i[t]&&delete i[t]};this.getAll=function(){return i};this.clear=function(){i=null};this.has=function(t){return!!this.get(t)};this.isLoaded=function(){return r}}var n=null,e="",i=null,r=!1;return function(){n||(n=new t);return n}}(),q="",X={SESSION_INTERVAL:3e4,LOG_URL:q="https://umini.shujupie.com/wxm_logs",GET_OPENID_URL:"https://umini.shujupie.com/uminiprogram_logs/wx/getuut",USERINFO_URL:"https://umini.shujupie.com/uminiprogram_logs/comm/uif",DEVICE_INFO_KEY:"device_info",ADVERTISING_ID:"mobile_ad_id",ANDROID_ID:"android_id",CURRENT_SESSION:"current_session",SESSION_PAUSE_TIME:"session_pause_time",EVENT_SEND_DEFAULT_INTERVAL:15e3,EVENT_LAST_SEND_TIME:"last_send_time",MAX_EVENTID_LENGTH:128,MAX_PROPERTY_KEY_LENGTH:256,MAX_PROPERTY_KEYS_COUNT:100,REPORT_POLICY:"report_policy",REPORT_INTERVAL_TIME:"report_interval_time",REPORT_POLICY_START_SEND:"1",REPORT_POLICY_INTERVAL:"6",IMPRINT:"imprint",SEED_VERSION:"1.0.0",IMPL_VERSION:"2.3.5",ALIPAY_AVAILABLE_VERSION:"10.1.52",SHARE_PATH:"um_share_path",SHARES:"shares",REQUESTS:"requests",UUID:"um_uuid",UUID_SUFFIX:"ud",OPENID:"um_od",UNIONID:"um_unid",ALIPAYID:"um_alipayid",USERID:"um_userid",PROVIDER:"um_provider",LAUNCH_OPTIONS:"LAUNCH_OPTIONS",UM_SSRC:"_um_ssrc",USER_INFO:"user_info",IS_ALIYUN:!1,ALIYUN_URL:"serverless.huoban.youmeng.network.forward"},J={getUserInfo:function(t){wx.getSetting({success(n){n.authSetting["scope.userInfo"]?wx.getUserInfo({success:function(n){t(n&&n.userInfo)},fail:function(){t({})}}):t({})},fail(){t({})}})},getSystemInfo:function(t,n){wx.getSystemInfo({success:function(n){"function"==typeof t&&t(n)},fail:function(){"function"==typeof n&&n()}})},getDeviceInfo:function(t){"function"==typeof t&&t()},checkNetworkAvailable:function(t){var n={success:function(n){var e=!1;e="none"!==n.networkType;"function"==typeof t&&t(e)},fail:function(){"function"==typeof t&&t()}};wx.getNetworkType(n)},getNetworkInfo:function(t,n){var e={success:function(n){"function"==typeof t&&t(n)},fail:function(){"function"==typeof n&&n()}};wx.getNetworkType(e)},getDeviceId:function(t,n){try{"function"==typeof t&&t("")}catch(t){G().e("getDeviceId error",t)}},getAdvertisingId:function(t,n){"function"==typeof t&&t("")},getPageName:function(){},onNetworkStatusChange:function(t){wx.onNetworkStatusChange(function(n){"function"==typeof t&&t(n.isConnected||!0)})}},W=function(){function t(){var t=!1,n=null,e=[];this.addPageStart=function(e){if(e&&!t){n={ts:Date.now(),path:e,page_name:e};t=!0}};this.addPageEnd=function(i){if(t&&i&&n&&i===n.page_name){var r=Date.now()-n.ts;n.duration=Math.abs(r);e.push(n);n=null;t=!1}};this.get=function(){return e};this.getCurrentPage=function(){return n};this.clear=function(){e.length=0}}var n=null;return function(){n||(n=new t);return n}}(),z=5e3,Q="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",B=function(t){for(var n={},e=0,i=t.length;e<i;e++)n[t.charAt(e)]=e;return n}(Q),Z=String.fromCharCode,$=function(t){if(t.length<2)return(n=t.charCodeAt(0))<128?t:n<2048?Z(192|n>>>6)+Z(128|63&n):Z(224|n>>>12&15)+Z(128|n>>>6&63)+Z(128|63&n);var n=65536+1024*(t.charCodeAt(0)-55296)+(t.charCodeAt(1)-56320);return Z(240|n>>>18&7)+Z(128|n>>>12&63)+Z(128|n>>>6&63)+Z(128|63&n)},tt=function(t){return t.replace(/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,$)},nt=function(t){var n=[0,2,1][t.length%3],e=t.charCodeAt(0)<<16|(t.length>1?t.charCodeAt(1):0)<<8|(t.length>2?t.charCodeAt(2):0);return[Q.charAt(e>>>18),Q.charAt(e>>>12&63),n>=2?"=":Q.charAt(e>>>6&63),n>=1?"=":Q.charAt(63&e)].join("")},et=function(t){return t.replace(/[\s\S]{1,3}/g,nt)},it=function(t){return et(tt(t))},rt=function(t,n){return n?it(String(t)).replace(/[+\/]/g,function(t){return"+"==t?"-":"_"}).replace(/=/g,""):it(String(t))},ot=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g"),at=function(t){switch(t.length){case 4:var n=((7&t.charCodeAt(0))<<18|(63&t.charCodeAt(1))<<12|(63&t.charCodeAt(2))<<6|63&t.charCodeAt(3))-65536;return Z(55296+(n>>>10))+Z(56320+(1023&n));case 3:return Z((15&t.charCodeAt(0))<<12|(63&t.charCodeAt(1))<<6|63&t.charCodeAt(2));default:return Z((31&t.charCodeAt(0))<<6|63&t.charCodeAt(1))}},ut=function(t){return t.replace(ot,at)},ct=function(t){var n=t.length,e=n%4,i=(n>0?B[t.charAt(0)]<<18:0)|(n>1?B[t.charAt(1)]<<12:0)|(n>2?B[t.charAt(2)]<<6:0)|(n>3?B[t.charAt(3)]:0),r=[Z(i>>>16),Z(i>>>8&255),Z(255&i)];r.length-=[0,0,2,1][e];return r.join("")},st=function(t){return t.replace(/[\s\S]{1,4}/g,ct)},ft=function(t){return ut(st(t))},pt={encode:rt,decode:function(t){return ft(String(t).replace(/[-_]/g,function(t){return"-"==t?"+":"/"}).replace(/[^A-Za-z0-9\+\/]/g,""))}},lt={base64Encode:i,base64Decode:r,isNumber:a,compareVersion:u,getRandomStr:o,clone:c,startsWith:s,endsWith:f,assign:p,deepEqual:l,trimStart:d,trimEnd:h},dt=function(){function t(){function t(){return lt.getRandomStr(10)+Date.now()+lt.getRandomStr(7)+X.UUID_SUFFIX}var n="",i="",r="",o="",a="",u="";this.init=function(e){u=H().useOpenid()?"openid":"uuid";F.get(X.UUID,function(o){if(o)n=o;else{n=t();F.set(X.UUID,n)}H().useOpenid()?F.get(X.OPENID,function(t){i=t;e&&e()}):e&&e();F.get(X.UNIONID,function(t){r=t})})};F.get(X.USERID,function(t){!o&&t&&(o=t)});F.get(X.PROVIDER,function(t){!a&&t&&(a=t)});this.getOpenIdAsync=function(t){wx.login({success:function(n){n.code?e({url:X.GET_OPENID_URL,method:"GET",data:{key:H().appKey(),code:n.code},success:function(n){if(n&&200===n.statusCode&&n.data&&n.data.data){var e=n.data.data;return t.success&&t.success(e.oid,e.uid)}t.fail&&t.fail()},fail:function(){t.fail&&t.fail()}}):t.fail&&t.fail()},fail:function(){t.fail&&t.fail()}})};this.getIdType=function(){return u};this.getIdTracking=function(){var t={};n&&(t.uuid=n);i&&(t.openid=i);r&&(t.unionid=r);o&&(t.userid=o);return t};this.setOpenid=function(t){if(t&&t!==i){i=t;F.set(X.OPENID,t)}};this.setUnionid=function(t){if(!r&&t){r=t;F.set(X.UNIONID,t)}};this.setUserid=function(t,n){if(t&&t!==o){o=t;F.set(X.USERID,t);a=n;F.set(X.PROVIDER,n)}};this.getId=function(){return H().useOpenid()?i:n};this.getUserId=function(){return o};this.getProvider=function(){return a}}var n=null;return function(){n||(n=new t);return n}}(),ht=3,gt=function(){function t(){return{add:function(t){G().v("share origin: %o",t);var n={title:t&&t.title,path:t&&t.path&&t.path.split("?")[0],_um_sts:Date.now()};n.path&&n.path.length>1&&lt.startsWith(n.path,"/")&&(n.path=lt.trimStart(n.path,"/"));var r=t.path||"",o=dt().getId();if(o){var a=i.split(","),u=(a=a.filter(function(t){return t.length>0})).indexOf(o);u>=0&&(a=a.slice(0,u));a.length<ht&&a.push(o);var c=a.join(",");-1!==r.indexOf("?")?r+="&_um_ssrc="+c:r+="?_um_ssrc="+c;var s=Date.now();r+="&_um_sts="+s;t.path=r;n._um_ssrc=c;n._um_sts=s}e.push(n);G().v("share: %o",t);return t},setShareSource:function(t){i=t},clear:function(){e.length=0},get:function(){return e}}}var n=null,e=[],i="";return function(){n||(n=new t);return n}}(),vt="ekvs",_t=1e4,yt=1,mt=function(){function t(){if(a.length){var t=Y().get(vt);if(e(t)+a.length<=_t){t=n(t,a);Y().set(vt,t)}}}function n(t,n){var e=(t=t||{})[o];Array.isArray(e)&&e.length?t[o]=e.concat(n):t[o]=[].concat(n);return t}function e(t){var n=0;for(var e in t)Array.isArray(t[e])&&(n+=t[e].length);return n}function i(){return{addEvent:function(n){if(o){a.unshift(n);if(a.length>yt){t(o);a.length=0}}else{G().w("session id is null: ",o);u.unshift(n)}},setSessionId:function(t){o=t;G().v("setSessionId: ",o);if(Array.isArray(u)&&u.length&&o){for(var n=0;n<u.length;n++)this.addEvent(u[n]);u.length=0}},getEkvs:function(){var t=Y().get(vt);a&&a.length&&(t=n(t,a));return t},clear:function(){Y().remove(vt);a.length=0}}}var r,o,a=[],u=[];return function(){r||(r=i());return r}}(),Et={getClipboard:function(t){var n;n=wx.getClipboardData;try{n&&n({success:function(n){var e=n.data;"function"==typeof t&&t(e)},fail:function(){"function"==typeof t&&t("")}})}catch(t){G.e("读取clipboard发生错误",t)}},showModal:function(t){var n;n=wx.showModal;try{n&&n(t)}catch(t){G.e("展示Modal时发生错误",t)}},showToast:function(t){var n;n=wx.showToast;try{n&&n(t)}catch(t){G.e("showToast error",t)}},getUserInfo:function(t){var n,e={fail:function(){t&&t()}};n=wx.getUserInfo;e.success=function(n){if(n&&n.userInfo){var e=n.userInfo;t&&t({avatar:e.avatarUrl,nickName:e.nickName,gender:e.gender,country:e.country,province:e.province,city:e.city,language:e.language})}};try{wx.getSetting({success:function(t){t.authSetting["scope.userInfo"]&&n&&n(e)},fail:function(){t()}})}catch(t){G.e("showToast error",t)}},getAppInfoSync:function(){var t=wx.getAccountInfoSync(),n=t&&t.miniProgram?t.miniProgram:{};return{appId:n.appId,appEnv:n.envVersion,appVersion:n.version}}},It="2g",St="3g",Tt="4g",Nt="none",At=" ",Ot=["access","access_subtype"],Rt=function(){function t(){function t(t){J.getSystemInfo(function(i){J.getNetworkInfo(function(o){var a=(o=o||{}).type||o.networkType;a===Nt&&(a="unknown");var u=Y().get(X.IMPRINT);u&&(r.imprint=u);n(i,a);e(i);t&&t()})})}function n(t,n,e){r.userInfo=e;r.device_type="Phone";r.sdk_version=X.IMPL_VERSION;r.appkey=H().appKey();if(t){var i,o,a,u=t.model||"",c=(t.product,t.platform||""),s=t.brand||"",f=s.toLowerCase();r.platform_sdk_version=t.SDKVersion;r.platform_version=t.version;a=(i=Math.round(t.screenWidth*t.pixelRatio))>(o=Math.round(t.screenHeight*t.pixelRatio))?i+"*"+o:o+"*"+i;r.os=c;r.font_size_setting=t.fontSizeSetting;r.device_model=u;r.device_brand=s;r.device_manufacturer=f;r.device_manuid=u.toLowerCase().indexOf(f)>-1?u:f+At+u;r.device_name=u.toLowerCase().indexOf(f)>-1?u:f+At+u;r.os_version=t.system;r.resolution=a;r.language=t.language}switch(n=n?n.toLowerCase():""){case Tt:r.access_subtype="LTE";r.access="4G";break;case St:r.access_subtype="CDMA";r.access="3G";break;case It:r.access_subtype="GRPS";r.access="2G";break;default:r.access=n;delete r.access_subtype}}function e(t){var n=[];if(t){n.push({name:"系统名",value:t.platform});n.push({name:"支付宝版本号",value:t.version})}n.push({name:"设备型号",value:r.device_model});n.push({name:"设备生产商",value:r.device_brand});n.push({name:"os版本号",value:r.os_version});n.push({name:"网络类型",value:r.access});n.push({name:"运营商",value:r.access_subtype});n.push({name:"分辨率",value:r.resolution});n.push({name:"screenWidth",value:t.screenWidth});n.push({name:"screenHeight",value:t.screenHeight});n.push({name:"pixelRatio",value:t.pixelRatio});for(var e="",i=0;i<n.length;i++){var o=n[i];e+=o.name+": "+o.value+"; "}G().v("调试辅助信息: ",e)}var i=!1,r={};r.sdk_type="wxmp";r.platform="wx";var o=Et.getAppInfoSync();r.appid=o.appId;r.app_env=o.appEnv;r.app_version=o.appVersion;return{init:function(){t(function(){i=!0})},isLoaded:function(){return i},get:function(){return r},getSDKType:function(){return r.sdk_type},getPlatform:function(){return r.platform},getRealtimeFields:function(){var t={};Ot.forEach(function(n){t[n]=r[n]});return t},setIdTracking:function(t){this.setItem("id_tracking",t)},setIdType:function(t){this.setItem("id_type",t)},setItem:function(t,n){r[t]=n},getItem:function(t){return r[t]},updateExtraInfo:function(){J.getDeviceInfo(function(t){r.device_info=t||""})}}}var n=null;return{instance:function(){n||(n=t());return n}}}(),wt={HALF_SESSION:"half_session",CLOSE_SESSION:"close_session",EKV:"ekv",ENTER_PAGE:"enter_page",LEAVE_PAGE:"leave_page"},kt=function(){function t(){return{resume:function(t){var n=!1;a||(a=Y().get(X.CURRENT_SESSION));var i=new Date;o=i.getTime();if(!a||!a.end_time||o-a.end_time>X.SESSION_INTERVAL){n=!0;e(t);G().v("开始新的session(%s): ",a.id,a)}else G().v("延续上一次session(%s): %s ",a.id,i.toLocaleTimeString(),a);return n},pause:function(){i()},getCurrentSessionId:function(){return(a||{}).id},getCurrentSession:function(){return a},cloneCurrentSession:function(){return lt.clone(a)}}}function n(t){var n={};for(var e in t)0===e.indexOf("_um_")&&(n[e]=t[e]);return n}function e(t){try{var e=(a||{}).options||{},i=lt.assign({},n(t.query));i.path=t.path||e.path;i.scene=t.scene?Rt.instance().getPlatform()+"_"+t.scene:e.scene;var r=t.referrerInfo;r&&(i.referrerAppId=r.appId);G().v("session options: ",i);var o=i[X.UM_SSRC];o&&gt().setShareSource(o);var u=Date.now();a={id:lt.getRandomStr(10)+u,start_time:u,options:i}}catch(t){G().e("生成新session失败: ",t)}}function i(){if(a){var t=new Date;a.end_time=t.getTime();"number"!=typeof a.duration&&(a.duration=0);a.duration=a.end_time-o;Y().set(X.CURRENT_SESSION,a);G().v("退出会话(%s): %s ",a.id,t.toLocaleTimeString(),a)}}var r=null,o=null,a=null;return function(){r||(r=t());return r}}(),Ut={sessions:"sn",ekvs:"e",active_user:"active_user"},Pt={sdk_type:"sdt",access:"ac",access_subtype:"acs",device_model:"dm",language:"lang",device_type:"dt",device_manufacturer:"dmf",device_name:"dn",platform_version:"pv",id_type:"it",font_size_setting:"fss",os_version:"ov",device_manuid:"did",platform_sdk_version:"psv",device_brand:"db",appkey:"ak",_id:"id",id_tracking:"itr",imprint:"imp",sdk_version:"sv",resolution:"rl",testToken:"ttn"},Lt={uuid:"ud",unionid:"und",openid:"od",alipay_id:"ad",device_id:"dd",userid:"puid"},Dt="_UMTEST_",Ct="TEST_TOKEN",bt=function(){function t(){this.init=function(t){Et.getClipboard(function(n){e=Y().get(Ct);try{if(n&&lt.startsWith(n,Dt)&&n.split(Dt)[1]){var i=n.split(Dt)[1],r=JSON.parse(i).token;if(r){e=r;Y().set(Ct,r)}}}catch(t){G().v(t)}t(!!e)})};this.getToken=function(){return e};this.clear=function(){e="";Y().remove(Ct)}}var n=null,e="";return function(){n||(n=new t);return n}}(),xt=function(){function t(n,e,i){if(Rt.instance().isLoaded()){e=e||{};var r=g(n);if(r){var o=Rt.instance().getRealtimeFields();r.header=lt.assign({},r.header,o);r.noCache=e.noCache;c.enqueue(r)}"function"==typeof i&&i()}else setTimeout(function(){t(n,e,i)},100)}function n(t){var i=c.front(),r=function(){c.dequeue();n(t)},o=function(){var e=c.dequeue();e&&!e.noCache&&u.push(e);n(t)};if(i)T(i,r,o);else{e();t()}}function e(){u.forEach(function(t){c.enqueue(t)});u.length=0}function i(t){if(dt().getId())if(a)G().i("队列正在发送中");else{a=!0;n(function(){a=!1;"function"==typeof t&&t()})}else{G().i("获取id标识失败，暂缓发送");"function"==typeof t&&t()}}function r(){this.send=function(t,n,e){t?this.add(t,n,function(){i(e)}):i(e)};this.add=function(n,e,i){t(n,e,i)};this.load=function(){var t=Y().get(X.REQUESTS);t&&t.length&&t.forEach(function(t){c.enqueue(t)});Y().remove(X.REQUESTS)};this.save=function(){Y().set(X.REQUESTS,lt.clone(c.items()));c.clear()}}var o=null,a=!1,u=[],c=new O(50);return function(){o||(o=new r);return o}}(),Mt=function(){function t(){function t(t,n){var i=H().appKey(),r=Rt.instance().getSDKType(),o=dt().getId(),a=dt().getIdType();if(i&&r&&o&&a){var u={ak:H().appKey(),sdt:Rt.instance().getSDKType(),uin:t.nickName,uia:t.avatar,uig:t.gender,uit:t.country,uip:t.province,uic:t.city,uil:t.language,id:dt().getId(),it:dt().getIdType()},c=JSON.stringify(u);c=lt.base64Encode(c);e({url:X.USERINFO_URL,method:"POST",header:{"content-type":"application/x-www-form-urlencoded"},data:"ui="+c,success:function(e){G().v("用户信息上传成功: ",t);n&&n(e&&e.data&&200===e.data.code)},fail:function(){G().e("用户信息上传失败: ",t);n&&n(!1)}})}}this.update=function(){Et.getUserInfo(function(n){if(n){var e=Y().get(X.USER_INFO);e&&lt.deepEqual(n,e)||t(n,function(t){t&&Y().set(X.USER_INFO,n)})}})}}var n=null;return function(){n||(n=new t);return n}}(),Vt=[];k.prototype={createMethod:function(t,n,e){try{t[n]=e?function(){return e[n].apply(e,arguments)}:function(){Vt.push([n,[].slice.call(arguments)])}}catch(t){G().v("create method errror: ",t)}},installApi:function(t,n){try{var e,i,r=["resume","pause","trackEvent","trackPageStart","trackPageEnd","trackShare","setOpenid","setUnionid","setUserid"];for(e=0,i=r.length;e<i;e++)this.createMethod(t,r[e],n);if(n)for(e=0,i=Vt.length;e<i;e++){var o=Vt[e];try{n[o[0]].apply(n,o[1])}catch(t){G().v("impl[v[0]].apply error: ",o[0],t)}}}catch(t){G().v("install api errror: ",t)}}};var jt=["https://umini.shujupie.com","https://ulogs.umeng.com"],Gt=0;({init:L}).init(3e3);try{var Ft=App;App=function(t){D(t,"onLaunch",function(){C(t.umengConfig)});D(t,"onShow",b);D(t,"onHide",x);Ft(t)}}catch(t){G().w("App重写异常")}try{var Kt=Page;Page=function(t){D(t,"onShow",M);D(t,"onHide",V);D(t,"onUnload",V);if(t.onShareAppMessage){var n=t.onShareAppMessage;t.onShareAppMessage=function(e){var i=n.call(this,e)||{};i.path=i.path||t.route;return qt.trackShare.call(this,i)}}Kt(t)}}catch(t){G().w("Page重写异常")}try{var Ht=Component;Component=function(t){try{t.methods=t.methods||{};var n=t.methods;D(n,"onShow",M);D(n,"onHide",V);D(n,"onUnload",V);if(n.onShareAppMessage){var e=n.onShareAppMessage;n.onShareAppMessage=function(t){var n=e.call(this,t);return qt.trackShare.call(this,n)}}Ht(t)}catch(n){Ht(t)}}}catch(t){G().w("Component重写异常")}var Yt=new k,qt={_inited:!1,init:function(t){G().tip_w("2.3.2及之后版本需在微信后台更换域名白名单为: umini.shujupie.com");if(this._inited)G().v("已经实例过，请避免重复初始化");else if(t)if(t.appKey){"boolean"!=typeof t.useOpenid&&(t.useOpenid=!0);H().set(t);G().setDebug(t.debug);this._inited=!0;var n=this;if(H().useOpenid()){G().tip_w("您选择了使用openid进行统计，请确保使用setOpenid回传openid或通过设置autoGetOpenid为true，并在友盟后台设置secret由友盟帮您获取")}!function(t){try{var n=new w;G().v("成功创建Lib对象");n.init(function(){G().v("Lib对象初始化成功");Yt.installApi(t,n);G().v("安装Lib接口成功")})}catch(t){G().w("创建Lib对象异常: "+t)}}(n)}else G().err("请确保传入正确的appkey");else G().err("请通过在App内添加umengConfig设置相关信息！")}};try{Yt.installApi(qt,null);G().v("安装临时接口成功");wx.uma=qt}catch(t){G().w("uma赋值异常: ",t)}module.exports=qt;
