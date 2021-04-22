// pages/branch/branch.js
const url = require('../../utils/util.js');
const token = wx.getStorageSync('token');
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		username:null,
		phone:null,
		address:null,
		checked: false,
		province:[],
		show:false,
		provincer:null,
		city:[],
		citys:null,
		cityshow:false,
		district:[],
		disshow:false,
		districts:null,
		place1:null,
		place2:null,
		place3:null,
		address_id:null,
		nvabarData: {
          showCapsule: 1,  //1表示显示    0表示不显示
          title: '招商分院申请',   // 名片
          type: '1'
        },
        height: app.globalData.height * 2
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
	    url._posts('api/user/get_province', {
			token: app.globalData.token ? app.globalData.token : token
		}).then(res => {
			for (var i in res.province){
				res.province[i]["text"] = res.province[i]["name"];
			}
			this.setData({
				province: res.province
			})
		}).catch(res => {
            //wx.showToast({ title:"网络访问错误", icon: 'none' })
        })
	},

	//省份
	proCancel(){
		this.setData({ show: false });
	},
	proConfirm(event) {
		this.setData({ show: false, provincer: event.detail.value.name, citys:null,districts:null,place1:event.detail.value.id,place2:null,place3:null});
		url._posts('api/user/get_city', {
			province_id: event.detail.value.id
		}).then(res => {
			for (var i in res.city) {
				res.city[i]["text"] = res.city[i]["name"];
			}
			this.setData({
				city: res.city
			})
		}).catch(res => {
            //wx.showToast({ title:"网络访问错误", icon: 'none' })
        })
	},
	provinces(){
		this.setData({ show: true });
	},
	proClose(){
		this.setData({ show: false });
	},
	

	//城市
	cityCancel() {
		this.setData({ cityshow: false });
	},
	cityConfirm(event) {
		this.setData({ cityshow: false, citys: event.detail.value.name, districts:null,place2:event.detail.value.id,place3:null });
		url._posts('api/user/get_district', {
			city_id: event.detail.value.id
		}).then(res => {
			for (var i in res.district) {
				res.district[i]["text"] = res.district[i]["name"];
			}
			this.setData({
				district: res.district
			})
		}).catch(res => {
            //wx.showToast({ title:"网络访问错误", icon: 'none' })
        })
	},
	cityvinces() {
		this.setData({ cityshow: true });
	},
	cityClose() {
		this.setData({ cityshow: false });
	},

	//区域
	disCancel() {
		this.setData({ disshow: false });
	},
	disConfirm(event) {
		this.setData({ disshow: false, districts: event.detail.value.name ,place3:event.detail.value.id});
	},
	disvinces() {
		this.setData({ disshow: true });
	},
	disClose() {
		this.setData({ disshow: false });
	},

	// 收货人
	userpeople(event){
		this.setData({ username: event.detail });
	},
	// 手机号
	userphone(event){
		this.setData({ phone: event.detail });
	},
	// 详细地址
	useraddress(event){
		this.setData({ address: event.detail });
	},

	// 保存地址
	saveres(){
		if (!this.data.username) { wx.showToast({ title: "姓名为空", icon: 'none'}); return false;}
		if (!this.data.phone) { wx.showToast({ title:"手机为空", icon: 'none'}); return false; }
		if (!this.data.address) { wx.showToast({ title: "邮箱为空", icon: 'none' }); return false; }
		if (!this.data.place1) { wx.showToast({ title: "省份为选择", icon: 'none' }); return false; }
		if (!this.data.place2) { wx.showToast({ title: "城市为选择", icon: 'none' }); return false; }
		if (!this.data.place3) { wx.showToast({ title: "区域为选择", icon: 'none' }); return false; }
		url._posts('api/user/admissions_branch', {
			token: app.globalData.token ? app.globalData.token : token,
			username: this.data.username,
			phone: this.data.phone,
			province_id: this.data.place1,
			city_id: this.data.place2,
			district_id: this.data.place3,
			email: this.data.address,
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
	},
})