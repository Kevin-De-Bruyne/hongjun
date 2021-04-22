// pages/withdraw/withdraw.js
const url = require('../../utils/util.js');
const token = wx.getStorageSync('token');
import Toast from '../../vant/toast/toast';
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		withdraw:[],
		nvabarData: {
          showCapsule: 1,  //1表示显示    0表示不显示
          title: '提现记录',   // 名片
          type: '1'
        },
        height: app.globalData.height * 2
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		url._posts('api/user/withdrawals_list', {
			token: app.globalData.token ? app.globalData.token : token,
		}).then(res => {
			this.setData({
				withdraw: res.data
			})
		}).catch(res => {
            //wx.showToast({ title:"网络访问错误", icon: 'none' })
        })
	},


})