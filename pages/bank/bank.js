// pages/bank/bank.js
const url = require('../../utils/util.js');
const token = wx.getStorageSync('token');
import Dialog from '../../vant/dialog/dialog';
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		bank_list:[],
		nvabarData: {
          showCapsule: 1,  //1表示显示    0表示不显示
          title: '银行列表',   // 名片
          type: '1'
        },
        height: app.globalData.height * 2
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getlist();
	},
	onShow(options){
		this.getlist();
	},
	getlist(){
		url._post('api/user/card', {
			token: app.globalData.token ? app.globalData.token : token
		}).then(res => {
			this.setData({
				bank_list: res.data
			})
		}).catch(res => {
            //wx.showToast({ title:"网络访问错误", icon: 'none' })
        })
	},
	del_bank:function(e){
		var index = e.currentTarget.dataset['index'];
		Dialog.confirm({
			title: '提示',
			message: '是否确定删除该银行卡',
		})
		.then(() => {
			url._post('api/user/deletecard', {
				token: app.globalData.token ? app.globalData.token : token,
				id: this.data.bank_list[index].bank_id
			}).then(res => {
				if (res.status == 200) {
					wx.showToast({ title: res.msg, icon: 'none' })
					this.data.bank_list.splice(index, 1);
					this.setData({
						bank_list: this.data.bank_list
					})
				} else {
					wx.showToast({ title: res.msg, icon: 'none' });
				}
			}).catch(res => {
	            //wx.showToast({ title:"网络访问错误", icon: 'none' })
	        })
		})
		.catch(() => {
			
		});
	},
	add_bank:function(){
		wx.navigateTo({
			url: '/pages/bank/add_bank/add_bank'
		})
	}
})