// pages/personal/withdraw/withdraw.js
const url = require('../../../utils/util.js');
const token = wx.getStorageSync('token');
import Dialog from '../../../vant/dialog/dialog';
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		withdraw: [],
		money: null,
		bank_list:[],
		show:false,
		bank_select:null,
		bank_id:null,
		nvabarData: {
          showCapsule: 1,  //1表示显示    0表示不显示
          title: '提现',   // 名片
          type: '1'
        },
        height: app.globalData.height * 2
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		url._posts('api/user/tx',{
			token: app.globalData.token ? app.globalData.token : token,
		}).then(res => {
			this.setData({
				withdraw: res
			})
		})
		url._posts('api/user/card', {
			token: app.globalData.token ? app.globalData.token : token,
		}).then(res => {
			if(res.data.length == 0){
				Dialog.confirm({
					title: '提示',
					message: '您暂无银行卡,是否前往添加银行卡',
				})
				.then(() => {
					wx.navigateTo({
						url: '/pages/bank/add_bank/add_bank'
					})
				})
				.catch(() => {
					
				});
				return false;
			}
			for (var i in res.data){
				res.data[i]["text"] = res.data[i]["bank_name"]+'  '+res.data[i]["bank_num"].substr(-4);
			}
			this.setData({
				bank_list: res.data
			})
		}).catch(res => {
            //wx.showToast({ title:"网络访问错误", icon: 'none' })
        })
	},

	
	onCancel() {
		this.setData({ show: false });
	},
	onClose(){
		this.setData({ show: false });
	},
	banklist(){
		this.setData({ show: true });
	},
	onConfirm(event){
		this.setData({ show: false ,bank_select: event.detail.value.text,bank_id: event.detail.value.bank_id});
	},
	inmoney(e){
		console.log(e)
		this.setData({ money: e.detail.value});
	},
	saveres(){
		if (!this.data.money) { wx.showToast({ title: "请输入要提现的金额", icon: 'none'}); return false;}
		if (!this.data.bank_id) { wx.showToast({ title:"请选择银行卡", icon: 'none'}); return false; }
		if (this.data.money<this.data.withdraw.config.min) { wx.showToast({ title: "单笔金额必须大于"+this.data.withdraw.config.min+"元", icon: 'none'}); return false;}
		if (this.data.money>this.data.withdraw.config.max) { wx.showToast({ title: "单笔金额必须小于"+this.data.withdraw.config.max+"元", icon: 'none'}); return false;}
		url._posts('api/user/cashs', {
			token: app.globalData.token ? app.globalData.token : token,
			bank_id:this.data.bank_id,
			money:this.data.money
		}).then(res => {
			wx.showToast({ title: res.msg, icon: 'none' })
			if (res.status == 200){
				setTimeout(()=>{
					wx.navigateBack();
				},700)
			}
		}).catch(res => {
            //wx.showToast({ title:"网络访问错误", icon: 'none' })
        })
	}
})