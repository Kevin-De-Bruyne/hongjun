// pages/muster/news/news.js
const url = require('../../../utils/util.js');
const token = wx.getStorageSync('token');
const app = getApp();
Page({

/**
* 页面的初始数据
*/
data: {
	news:[]
},

/**
* 生命周期函数--监听页面加载
*/
onLoad: function (options) {
    url._posts('api/index/notice',{
        token: app.globalData.token ? app.globalData.token : token
    }).then(res => {
        this.setData({news:res.list})
    }).catch(res => {
        //wx.showToast({ title:"网络访问错误", icon: 'none' })
    })
},


navst(res){
	wx.navigateTo({url: '/pages/muster/news/newsr/newsr?id='+res.currentTarget.dataset.item.id})
}
})