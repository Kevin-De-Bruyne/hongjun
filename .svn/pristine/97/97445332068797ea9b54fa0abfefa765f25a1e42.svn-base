// pages/bank/add_bank/add_bank.js
const url = require('../../../utils/util.js');
const token = wx.getStorageSync('token');
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		banknumber:null,
		users:null,
		phone:null,
		bank_list:[
			"中国工商银行",
			"招商银行",
			"中国农业银行",
			"中国建设银行",
			"中国银行",
			"中国民生银行",
			"中国光大银行",
			"中信银行",
			"交通银行",
			"兴业银行",
			"上海浦东发展银行",
			"华夏银行",
			"深圳发展银行",
			"广东发展银行",
			"中国邮政储蓄银行",
			"中国农业发展银行",
			"长沙银行",
			"平安银行",
		],
		show: false,
		bankname:null,
		nvabarData: {
          showCapsule: 1,  //1表示显示    0表示不显示
          title: '添加银行卡',   // 名片
          type: '1'
        },
        height: app.globalData.height * 2
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	onConfirm(event) {
		const { picker, value, index } = event.detail;
		this.setData({ bankname: value });
		this.setData({ show: false });
	},
	number(event) {
		this.setData({ banknumber: event.detail });
	},
	user(event) {
		this.setData({ users: event.detail });
	},
	iphone(event){
		this.setData({ phone: event.detail });
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
	add_bank(){
		if (!this.data.bankname) { wx.showToast({ title: "银行暂未选择", icon: 'none'}); return false;}
		if (!this.data.banknumber) { wx.showToast({ title:"银行卡号为空", icon: 'none'}); return false; }
		if (!this.data.users) { wx.showToast({ title: "持卡人为空", icon: 'none' }); return false; }
		if (!this.data.phone) { wx.showToast({ title: "手机号码为空", icon: 'none' }); return false; }
		url._post('api/user/addbank', {
			token: app.globalData.token ? app.globalData.token : token,
			bank_name: this.data.bankname,
			bank_num: this.data.banknumber,
			bank_username: this.data.users,
			bank_phone: this.data.phone
		}).then(res => {
			wx.showToast({ title: res.msg, icon: 'none' })
			if (res.status == 200){
				setTimeout(()=>{
					wx.navigateBack()
				},700)
			}
		}).catch(res => {
            //wx.showToast({ title:"网络访问错误", icon: 'none' })
        })
	}
})