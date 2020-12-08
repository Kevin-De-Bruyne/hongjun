// pages/footnote/footnote.js
const url = require('../../utils/util.js');
const token = wx.getStorageSync('token');
import Dialog from '../../vant/dialog/dialog';
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		footnote:[],
		nvabarData: {
          showCapsule: 1,  //1表示显示    0表示不显示
          title: '我的足迹',   // 名片
          type: '1'
        },
        height: app.globalData.height * 2
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		url._post('api/user/visit_log', {
			token: app.globalData.token ? app.globalData.token : token,
		}).then(res => {
			if(res.data){
				this.setData({
					footnote: res.data
				})
			}
		}).catch(res => {
            //wx.showToast({ title:"网络访问错误", icon: 'none' })
        })
	},

	similar(e){
		wx.navigateTo({
			url: '../classification/classification?id=' + e.target.dataset.item.cat_id +'&conters=' + e.target.dataset.item.goods_name
		})
	},
	delnote(e){
		var index=e.currentTarget.dataset['index'];
		url._post('api/user/del_visit_log', {
			token: app.globalData.token ? app.globalData.token : token,
			visit_ids: this.data.footnote[index].visit_id
		}).then(res => {
			if(res.status == 200){
				wx.showToast({ title: res.msg, icon: 'none' })
				this.data.footnote.splice(index, 1);
				this.setData({
					footnote: this.data.footnote
				})
			}else{
				wx.showToast({ title: res.msg, icon: 'none' })
			}
		}).catch(res => {
            //wx.showToast({ title:"网络访问错误", icon: 'none' })
        })
	},
	butdel(){
		Dialog.confirm({
			title: '提示',
			message: '是否确定清空所有足迹',
		})
		.then(() => {
			url._post('api/user/clear_visit_log', {
				token: app.globalData.token ? app.globalData.token : token,
			}).then(res => {
				if (res.status == 200) {
					wx.showToast({ title: res.msg, icon: 'none' })
					this.setData({
						footnote: []
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
	}
})