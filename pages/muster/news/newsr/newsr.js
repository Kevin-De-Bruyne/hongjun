// pages/muster/news/newsr/newsr.js
const url = require('../../../../utils/util.js');
const token = wx.getStorageSync('token');
const app = getApp();
Page({

/**
* 页面的初始数据
*/
data: {
	newsr:[]
},

/**
* 生命周期函数--监听页面加载
*/
onLoad: function (options) {
    url._posts('api/index/notice_detail',{
        id: options.id
    }).then(res => {
        let result = res.list.content;
        const regex = new RegExp('<img', 'gi');
        result = result.replace(regex, '<img style="max-width: 100%;"');
        this.setData({newsr: result})
    }).catch(res => {
        //wx.showToast({ title:"网络访问错误", icon: 'none' })
    })
},


})