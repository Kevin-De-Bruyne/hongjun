// pages/muster/people/people.js
const url = require('../../../utils/util.js');
const token = wx.getStorageSync('token');
const app = getApp();
Page({

/**
* 页面的初始数据
*/
data: {
	people:[]
},

/**
* 生命周期函数--监听页面加载
*/
onLoad: function (options) {
    url._post('api/index/dengji',{
        token: app.globalData.token ? app.globalData.token : token
    }).then(res => {
        this.setData({people:res.list})
    }).catch(res => {
        //wx.showToast({ title:"网络访问错误", icon: 'none' })
    })
},


// // 收货人
// userpeople(event){
// 	this.setData({ username: event.detail });
// },
// // 手机号
// userphone(event){
// 	this.setData({ phone: event.detail });
// },
// // 邮箱
// useraddress(event){
// 	this.setData({ address: event.detail });
// },
// saveres(){
// 	if (!this.data.username) { wx.showToast({ title: "用人单位为空", icon: 'none'}); return false;}
// 	if (!this.data.phone) { wx.showToast({ title:"单位手机为空", icon: 'none'}); return false; }
// 	if (!this.data.address) { wx.showToast({ title: "单位邮箱为空", icon: 'none' }); return false; }
// 	url._post('api/user/admissions_behalf', {
// 		token: app.globalData.token ? app.globalData.token : token,
// 		username: this.data.username,
// 		phone: this.data.phone,
// 		email: this.data.address,
// 	}).then(res => {
// 		wx.showToast({ title: res.msg, icon: 'none' })
// 		if (res.status == 200){
// 			setTimeout(()=>{
// 				wx.switchTab({
// 					url: '/pages/personal/personal'
// 				})
// 			},700)
// 		}
// 	}).catch(res => {
//         //wx.showToast({ title:"网络访问错误", icon: 'none' })
//     })
// }
navst(res){
	wx.navigateTo({url: '/pages/muster/people/peoples/peoples?id='+res.currentTarget.dataset.item.id})
}
})