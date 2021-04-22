// pages/authorize/login/index.js
const url = require('../../../utils/util.js');
const token = wx.getStorageSync('token');
const app = getApp();
Page({

/**
* 页面的初始数据
*/
data: {
    phone:null,
    password:null,
    login:null,
    nvabarData: {
      showCapsule: 1,  //1表示显示    0表示不显示
      title: '授权登陆',   // 名片
      type: '1',
      showlist: '2'
    },
    height: app.globalData.height * 2
},

phonebt(r){
    // this.setData({phone: r.detail})
    this.data.phone=r.detail
    this.setData({phone:r.detail})
    // this.data.phone=r.detail.value
    // this.setData({
    //     phone
    // })
},
passwordbt(r){
    // this.setData({password: r.detail})
    this.data.password=r.detail
    this.setData({password:r.detail})
},
getUserInfo(r){
    if(r.detail.errMsg == "getUserInfo:ok"){
        url._posts('api/login/wx_user',{
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
    if(!this.data.phone){
        return wx.showToast({title:"请填写手机号码",icon: 'none'});
    };
    if(!this.data.password){
        return wx.showToast({title:"请输入密码",icon: 'none'});
    };
    url._posts('api/login/dologin',{
        token: app.globalData.token ? app.globalData.token : token,
        username : this.data.phone,
        password : this.data.password,
    }).then(res => {
        if(res.status == 200){
            app.globalData.token = res.token
            wx.setStorageSync("token",res.token)
            if(this.data.login){
                wx.navigateBack()
            }else{
                 wx.switchTab({
                    url:'/pages/personal/personal'
                })
            }
        }else{
            wx.showToast({ title: res.msg, icon: 'none' })
        }
    }).catch(res => {
        wx.showToast({ title:"访问失败", icon: 'none' })
    })
},

/**
* 生命周期函数--监听页面加载
*/
onLoad: function (options) {
    if(options.login){
        this.setData({login:'1111'})
    }
}


})