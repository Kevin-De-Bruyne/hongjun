// pages/authorize/reg/index.js
const url = require('../../../utils/util.js');
const token = wx.getStorageSync('token');
const app = getApp();
var comply = null;
var val = 60;
Page({

/**
* 页面的初始数据
*/
data: {
    username:null,
    phone:null,
    password:null,
    sms:null,
    code:null,
    number: "发送验证码",
    login:null,
    nvabarData: {
      showCapsule: 1,  //1表示显示    0表示不显示
      title: '注册',   // 名片
      type: '1',
      showlist: '3'
    },
    height: app.globalData.height * 2
},


gettoken(){
    app.userLogin().then(res => {
        if(res != 1){
            wx.showToast({ title:"用户数据接收失败，请退出小程序", icon: 'none' })
        }else{
            this.logins();
            this.logins_reg();
        }
    });
},


logins(){
    url._post('api/login/check_login',{
        token: app.globalData.token ? app.globalData.token : token
    }).then(res => {
        if(res.status == 200){
            wx.switchTab({
                url:'/pages/index/index'
            })
        }
    })
},

logins_reg(){
    url._post('api/login/check_reg',{
        token: app.globalData.token ? app.globalData.token : token
    }).then(res => {
        if(res.status == 200){
            if(res.is_reg == 1){
                wx.switchTab({
                    url:'/pages/index/index'
                })
            }
        }
    })
},

/**
* 生命周期函数--监听页面加载
*/
onLoad: function (options) {
    if(!token || !app.globalData.token){
        this.gettoken();
    }
    if(options.scene){
        this.setData({code: options.scene})
    }
    if(options.login){
        this.setData({login:'1111'})
    }
    this.logins_reg();
},
getUserInfo(r){
    if(r.detail.errMsg == "getUserInfo:ok"){
        url._post('api/login/wx_user',{
            token: app.globalData.token ? app.globalData.token : token,
            userInfo: JSON.stringify(r.detail.userInfo)
        }).then(res => {
            this.senduser();
        }).catch(res => {
            wx.showToast({ title:"信息接收失败，请重新授权！", icon: 'none' })
        })
    }
},
senduser(){
    if(!this.data.username){
        return wx.showToast({title:"请输入姓名",icon: 'none'});
    };
    if(!this.data.phone){
        return wx.showToast({title:"请填写手机号码",icon: 'none'});
    };
    if(!this.data.password){
        return wx.showToast({title:"请输入密码",icon: 'none'});
    };
    if(!this.data.sms){
        return wx.showToast({title:"请输入短信验证码",icon: 'none'});
    };
    
    url._post('api/login/reg',{
        token: app.globalData.token ? app.globalData.token : token,
        nickname : this.data.username,
        phone : this.data.phone,
        password : this.data.password,
        code : this.data.sms,
        invite : this.data.code,
    }).then(res => {
        if(res.status == 200){
            wx.switchTab({
                url:'/pages/index/index'
            })
            app.globalData.share = false;
        }else{
            wx.showToast({ title: res.msg, icon: 'none' })
        }
    }).catch(res => {
        wx.showToast({ title:"访问失败", icon: 'none' })
    })
},

isprotocol(){
    wx.navigateTo({
        url: '/pages/authorize/user/index?type=0'
    })
},

send(){
    if(!this.data.phone){
        return wx.showToast({title:"请填写手机号码",icon: 'none'});
    };
    if(this.data.number != "发送验证码"){
        return wx.showToast({title:"请稍等...",icon: 'none'});
    }
    url._post('api/login/send_code',{
        token: app.globalData.token ? app.globalData.token : token,
        phone: this.data.phone
    }).then(res => {
        console.log(res)
        if(res.status == 200){
            this.setData({number: val})
            comply = setInterval(this.setTime, 1000);
        }else{
            wx.showToast({ title: res.msg, icon: 'none' })
        }
    }).catch(res => {
        wx.showToast({ title:"发送失败", icon: 'none' })
    })
},
usernamebt(r){
    this.setData({username: r.detail})
},
phonebt(r){
    this.setData({phone: r.detail})
},
passwordbt(r){
    this.setData({password: r.detail})
},
smsbt(r){
    this.setData({sms: r.detail})
},
codebt(r){
    this.setData({code: r.detail})
},
setTime(){
    if(val>0){
        val=val-1;
        this.setData({number: val})
    }else{
        val = 60;
        clearInterval(comply)
        this.setData({number: "发送验证码"})
    }
    
}


})