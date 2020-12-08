//app.js
var url = require('utils/util.js');
App({
    onLaunch: function (options) {
            
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
      this.userLogin();
    },
    // 登录
    userLogin: function () {
        return new Promise((resolve,reject) => {
            wx.login({
                success: res => {
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    url._post('api/login/wx_login',{
                        code: res.code
                    }).then(data => {
                        if(data.status == 200){
                            this.globalData.token = data.token
                            wx.setStorageSync("token",data.token)
                            resolve(1)
                        }else{
                            reject(2)
                        }
                    }).catch(res => {
                        wx.showToast({ title:"获取用户信息失败，请重新访问！", icon: 'none' })
                    })
                }
            })
        })
    },
    globalData: {
        userInfo: null,
        token: null,
        height: 0,
        share:false,
    }
})