// pages/address/address.js
const url = require('../../utils/util.js');
const app = getApp();
const token = wx.getStorageSync('token');
import Toast from '../../vant/toast/toast';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		address_list:[],
	    number:'',
	    goods_id:'',
	    action:'',
	    nvabarData: {
          showCapsule: 1,  //1表示显示    0表示不显示
          title: '地址列表',   // 名片
          type: '1'
        },
        height: app.globalData.height * 2
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		if(options.number){this.setData({number: options.number})};
		if(options.goods_id){this.setData({goods_id: options.goods_id})};
		if(options.action){this.setData({action: options.action})};
		this.getlist();
	},

	getlist(){
		url._post('api/user/address_list', {
			token: app.globalData.token ? app.globalData.token : token
		}).then(res => {
			this.setData({
				address_list: res.address
			})
		}).catch(res => {
            wx.showToast({ title:"网络访问错误", icon: 'none' })
        })
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		this.getlist();
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	filladd(r){
		var addres= r.currentTarget.dataset.item;
		console.log(addres.address_id)
		wx.setStorageSync("address_id",addres.address_id);
		if(this.data.action&&this.data.goods_id&&this.data.number){
			wx.navigateBack()
			// wx.navigateTo({
			// 	url: "../fillOrder/fillOrder?address_id=" + addres.address_id+'&number='+this.data.number+'&goods_id='+this.data.goods_id+'&action='+this.data.action
			// })
		}else{
			wx.navigateTo({
				url: "/pages/address/direct/direct?address_id="+addres.address_id
			})
		}
	},
	editaddres(r){
		var addres = r.currentTarget.dataset.item;
		wx.navigateTo({
			url: "/pages/address/direct/direct?address_id="+addres.address_id
		})
	},
	add_res(){
		wx.navigateTo({
			url: "/pages/address/direct/direct"
		})
	}
})