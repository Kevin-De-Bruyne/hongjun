// pages/order/recall/recall.js
const url = require('../../../utils/util.js');
const token = wx.getStorageSync('token');
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		recall: [],
		reason: null,
		users: null,
		phone: null,
		nvabarData: {
          showCapsule: 1,  //1表示显示    0表示不显示
          title: '申请退款',   // 名片
          type: '1'
        },
        height: app.globalData.height * 2
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		url._post('api/user/refund_order',{
			token: app.globalData.token ? app.globalData.token : token,
			order_id: options.order_id
		}).then(res => {
			this.setData({
				recall: res.order
			})
		}).catch(res => {
            //wx.showToast({ title:"网络访问错误", icon: 'none' })
        })
	},

	
	reason(event){
		this.setData({ reason: event.detail });
	},
	usering(event){
		this.setData({ users: event.detail });
	},
	iphone(event){
		this.setData({ phone: event.detail });
	},
	refer(){
		if (!this.data.reason) { wx.showToast({ title: "请输入退款原因", icon: 'none'}); return false;}
		if (!this.data.users) { wx.showToast({ title: "请输入联系人", icon: 'none' }); return false; }
		if (!this.data.phone) { wx.showToast({ title: "请输入手机号", icon: 'none' }); return false; }
		url._post('api/user/record_refund_order', {
			token: app.globalData.token ? app.globalData.token : token,
			order_id: this.data.recall.order_id,
			consignee: this.data.users,
			mobile: this.data.phone,
			user_note: this.data.reason
		}).then(res => {
			wx.showToast({ title: res.msg, icon: 'none' })
			if (res.status == 200){
				setTimeout(()=>{
					wx.switchTab({
						url: '/pages/personal/personal'
					})
				},700)
			}
		}).catch(res => {
            //wx.showToast({ title:"网络访问错误", icon: 'none' })
        })
	}
})