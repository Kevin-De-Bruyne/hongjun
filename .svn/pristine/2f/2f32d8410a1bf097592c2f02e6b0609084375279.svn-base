// pages/muster/school/school.js
const url = require('../../../utils/util.js');
const token = wx.getStorageSync('token');
const app = getApp();
Page({

/**
* 页面的初始数据
*/
data: {
	school:[]
},

/**
* 生命周期函数--监听页面加载
*/
onLoad: function (options) {
    url._post('api/index/school',{
        token: app.globalData.token ? app.globalData.token : token
    }).then(res => {
        this.setData({school:res.list})
    }).catch(res => {
        //wx.showToast({ title:"网络访问错误", icon: 'none' })
    })
},

navst(res){
	wx.navigateTo({url: '/pages/muster/school/schools/schools?id='+res.currentTarget.dataset.item.id})
}
})