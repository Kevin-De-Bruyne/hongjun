//app.js
var url = require('utils/util.js');
App({
    onLaunch: function (options) {
        // wx.hideTabBar();
        // 获取用户信息
        wx.getSetting({
            success: res => {
                console.log(res)
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            console.log(res)
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo
                            this.globalData.iv=res.iv
                            this.globalData.signature=res.signature
                            this.globalData.rawData=res.rawData
                            this.globalData.encryptedData=res.encryptedData
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
        console.log(options)
        if(Number(options.scene) > 1040 && Number(options.scene) < 1050){
            this.globalData.share = true
        }else{
            this.globalData.share = false
        }
        wx.getSystemInfo({
            success:res=>{
                if(res.statusBarHeight>42){
                    this.globalData.height = res.statusBarHeight;
                }else if(res.statusBarHeight<23){
                    this.globalData.height = res.statusBarHeight*1.6;
                }else{
                    switch(res.statusBarHeight){
                        case 42:
                            this.globalData.height = res.statusBarHeight+4;break;
                        case 41:
                            this.globalData.height = res.statusBarHeight+4;break;
                        case 40:
                            this.globalData.height = res.statusBarHeight+4;break;
                        case 39:
                            this.globalData.height = res.statusBarHeight+5;break;
                        case 38:
                            this.globalData.height = res.statusBarHeight+5;break;
                        case 37:
                            this.globalData.height = res.statusBarHeight+5;break;
                        case 36:
                            this.globalData.height = res.statusBarHeight+6;break;
                        case 35:
                            this.globalData.height = res.statusBarHeight+6;break;
                        case 34:
                            this.globalData.height = res.statusBarHeight+6;break;
                        case 33:
                            this.globalData.height = res.statusBarHeight+6;break;
                        case 32:
                            this.globalData.height = res.statusBarHeight+7;break;
                        case 31:
                            this.globalData.height = res.statusBarHeight+7;break;
                        case 30:
                            this.globalData.height = res.statusBarHeight+7;break;
                        case 29:
                            this.globalData.height = res.statusBarHeight+8;break;
                        case 28:
                            this.globalData.height = res.statusBarHeight+8;break;
                        case 27:
                            this.globalData.height = res.statusBarHeight+8;break;
                        case 26:
                            this.globalData.height = res.statusBarHeight+9;break;
                        case 25:
                            this.globalData.height = res.statusBarHeight+9;break;
                        case 24:
                            this.globalData.height = res.statusBarHeight+9;break;
                        case 23:
                            this.globalData.height = res.statusBarHeight+9;break;
                        default:
                            this.globalData.height = res.statusBarHeight;
                    }
                }
                console.log(res)
                console.log(this.globalData.height)
            }
        })
    //   this.userLogin();
    },
    onShow:function(){
        if (wx.canIUse('getUpdateManager')) {//判断当前微信版本是否支持版本更新

            const updateManager = wx.getUpdateManager();
            
            updateManager.onCheckForUpdate(function (res) {
            
            if (res.hasUpdate) { // 请求完新版本信息的回调
            
            updateManager.onUpdateReady(function () {
            
            wx.showModal({
            
            title: '更新提示',
            
            content: '新版本已经准备好，是否重启应用？',
            
            success: function (res) {
            
            if (res.confirm) {// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            
            updateManager.applyUpdate()
            
            }
            
            }
            
            })
            
            });
            
            updateManager.onUpdateFailed(function () {
            
            wx.showModal({// 新的版本下载失败
            
            title: '已经有新版本了哟~',
            
            content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
            
            })
            
            })
            
            }
            
            })
            
            } else {
            
            wx.showModal({// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
            
            title: '提示',
            
            content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
            
            })
            
            }
    },
    // 获取手机号

    // 登录
    userLogin: function () {
        wx.hideTabBar();
        return new Promise((resolve,reject) => {
            wx.login({
                success: res => {
                    console.log(res)
                    var code=res.code
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    if(res.code!=''){
                        this.getuserinfo().then(res=>{
                            console.log(res)
                            url._posts('api/login/wx_login',{
                                code: code,
                                userInfo:res.userInfo,
                                iv:res.iv,
                                signature:res.signature,
                                rawData:res.rawData,
                                encryptedData:res.encryptedData,
                                first_leader:'',
                                vote_id:''

                            }).then(data => {
                                if(data.code == 200){
                                    console.log(data)
                                    this.globalData.token = data.token
                                    this.globalData.user_id=data.user_id
                                    wx.setStorageSync("token",data.token)
                                    resolve(1)
                                }else{
                                    reject(2)
                                }
                            }).catch(res => {
                                wx.showToast({ title:"获取用户信息失败，请重新访问！", icon: 'none' })
                            })
                        })
                    }
                   
                }
                
            })
        })
    },
    editTabbar: function() {
        let tabbar = this.globalData.tabBar;
        let currentPages = getCurrentPages();
        let _this = currentPages[currentPages.length - 1];
        let pagePath = _this.route;
        (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
        for (let i in tabbar.list) {
            console.log(tabbar.list[i].pagePath)
          tabbar.list[i].selected = false;
          (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
        }
        _this.setData({
          tabBar: tabbar
        });
      },
      editTabbars: function() {
        let tabbar = this.globalData.tabBars;
        let currentPages = getCurrentPages();
        let _this = currentPages[currentPages.length - 1];
        let pagePath = _this.route;
        (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
        for (let i in tabbar.list) {
          tabbar.list[i].selected = false;
          (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
        }
        _this.setData({
          tabBars: tabbar
        });
      },
    getuserinfo(){
        return new Promise((resolve,reject)=>{
            wx.getSetting({
                success: res => {
                    console.log(res)
                    if (res.authSetting['scope.userInfo']) {
                        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                        wx.getUserInfo({
                            success: res => {
                                console.log(res)
                                // 可以将 res 发送给后台解码出 unionId
                                this.globalData.userInfo = res.userInfo
                                this.globalData.iv=res.iv
                                this.globalData.signature=res.signature
                                this.globalData.rawData=res.rawData
                                this.globalData.encryptedData=res.encryptedData
                                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                                // 所以此处加入 callback 以防止这种情况
                                if (this.userInfoReadyCallback) {
                                    this.userInfoReadyCallback(res)
                                    
                                }
                                resolve(res)
                            }
                        })
                    }
                }
            })
        })
      
    },
    globalData: {
        userInfo: null,
        token: null,
        user_id:null,
        height: 0,
        share:false,
        iv:null,
        signature:null,
        rawData:null,
        encryptedData:null,
        tabBar: {
            "backgroundColor": "#ffffff",
            "color": "#979795",
            "selectedColor": "#1c1c1b",
            "list": [
              {
                "pagePath": "/pages/index/index",
                "iconPath": "icon/icon_home.png",
                "selectedIconPath": "icon/icon_home_HL.png",
                "text": "首页"
              },
              {
                "pagePath": "/pages/toupiao/toupiao",
                "iconPath": "icon/toupiao1.png",
                "text": "投票"
              },
              {
                "pagePath": "/pages/shops/shops",
                "iconPath": "icon/cart.png",
                "selectedIconPath": "icon/cart1.png",
                "text": "我的"
              }
            ]
           },
           tabBars: {
            "backgroundColor": "#ffffff",
            "color": "#ffffff",
            // "selectedColor": "#1c1c1b",
            "selectedColor": "#ffffff",
            "list": [
              {
                "pagePath": "/pages/toupiao/toupiao",
                "iconPath": "icon/toupiao.png",
                "selectedIconPath": "icon/toupiao_act.png",
                "text": "投票"
              },
              {
                "pagePath": "/pages/rule/rule",
                "iconPath": "icon/guize.png",
                "selectedIconPath": "icon/guize_act.png",
                "text": "规则"
              },
              {
                "pagePath": "/pages/baoming/baoming",
                "iconPath": "icon/baoming.png",
                "selectedIconPath": "icon/baoming_act.png",
                "text": "报名"
              },
            //   {
            //     "pagePath": "/pages/personal/personal",
            //     "iconPath": "icon/pai.png",
            //     "selectedIconPath": "icon/pai_act.png",
            //     "text": '排名'
            //   }
            ]
           }
    }
})