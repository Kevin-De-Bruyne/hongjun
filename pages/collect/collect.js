// pages/collect/collect.js
const url = require('../../utils/util.js');
const token = wx.getStorageSync('token');
const app = getApp();
import Toast from '../../vant/toast/toast';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		collect:[],
		nvabarData: {
          showCapsule: 1,  //1表示显示    0表示不显示
          title: '收藏列表',   // 名片
          type: '1'
        },
        height: app.globalData.height * 2
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		url._post('api/user/collect_list', {
			token: app.globalData.token ? app.globalData.token : token
		}).then(res => {
			if(res.data.result){
				this.setData({
					collect: res.data.result
				})
			}
		}).catch(res => {
            //wx.showToast({ title:"网络访问错误", icon: 'none' })
        })
	},

	delects: function (e){
		var index = e.currentTarget.dataset['index'];
		url._post('api/user/cancel_collect', {
			token: app.globalData.token ? app.globalData.token : token,
			collect_id: this.data.collect[index].collect_id
		}).then(res => {
			if(res.status == 200){
				Toast.success(res.msg);
				this.data.collect.splice(index, 1);
				this.setData({
					collect: this.data.collect
				})
			}else{
				Toast(res.msg);
			}
		})
	},
	collectsp(e){
		wx.navigateTo({
			url: '../details/details?goods_id=' + e.target.dataset.item.goods_id
		})
	}
})