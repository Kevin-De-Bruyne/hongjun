// pages/personal/personal.js
const url = require('../../utils/util.js');
const token = wx.getStorageSync('token');
const app = getApp()
import Dialog from '../../vant/dialog/dialog';
Page({

/**
* 页面的初始数据
*/
data: {
    user:[],
    users:[],
    navs1:[],
    navs2:[],
    navs3:[],
    nvabarData: {
      showCapsule: 0,  //1表示显示    0表示不显示
      title: '个人中心',   // 名片
      type: '1',
      showlist: '3'
    },
    height: app.globalData.height * 2
},
outto(){
    app.globalData.token = null;
    wx.clearStorageSync("token");
    wx.redirectTo({
        url:'/pages/authorize/login/index'
    })
},

//复制
copyText(){
    var text= this.data.users.id_number;
    wx.setClipboardData({
        data: text,
        success:res=>{
            wx.getClipboardData({
                success:res=>{
                    // wx.showToast({ title: "复制成功", icon: 'success' })
                }
            })
        }
    })
},
logins(){
    url._post('api/login/check_login',{
        token: app.globalData.token ? app.globalData.token : token
    }).then(res => {
        // if(res.status != 200){
        //     Dialog.confirm({
        //         title: '提示',
        //         message: '您暂未登陆，是否登陆？',
        //     }).then(() => {
        //         if(res.status == 500){
        //             // wx.navigateTo({
        //             //     url:'/pages/authorize/login/index'
        //             // })
        //             wx.showToast({ title:"异地登录", icon: 'none' })
        //         }else if(res.status == 800){
        //             wx.navigateTo({
        //                 url: '/pages/authorize/reg/index'
        //             })
        //         }
        //     }).catch(() => {
        //         wx.switchTab({
        //             url:'/pages/index/index'
        //         })
        //     });
        // }else{
        //     this.getdata();
        // }
    })
},
handleContact(r){
    console.log(r.detail)
},

/**
* 生命周期函数--监听页面加载
*/
onLoad: function (options) {
    this.setData({heights:app.globalData.height});
    this.logins();
},

getdata(){
    url._post('api/user/index',{
        token: app.globalData.token ? app.globalData.token : token
    }).then(res => {
        this.setData({users: res.data,navs1: res.nav1,navs2: res.nav2,navs3: res.nav3});
    }).catch(res => {
        //wx.showToast({ title:"网络访问错误", icon: 'none' })
    })
},

/**
* 生命周期函数--监听页面初次渲染完成
*/
onReady: function () {
    
},

/**
* 生命周期函数--监听页面显示
*/
onShow: function () {
    this.logins();
},



setting(){
	wx.navigateTo({
		url: '/pages/setting/setting'
	})
},
navst(r){
	var s = r.currentTarget.dataset.item;
    console.log(s)
    if(s == '0'){
        wx.navigateTo({
            url: '/pages/order/order'
        })
    }else{
        wx.navigateTo({
            url: s.menu_url
        })
    }
    	
},
usermoney(){
    wx.navigateTo({
        url: '/pages/personal/money/money?usermoney='+this.data.users.user_money+'&freeze='+this.data.users.frozen_money+'&pay_points='+this.data.users.pay_points
    })
},
usermoneys(){
    wx.navigateTo({
        url: '/pages/personal/overage/overage?type=1'
    })
}
})