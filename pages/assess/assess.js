// pages/assess/assess.js
const url = require('../../utils/util.js');
const app = getApp();
const token = wx.getStorageSync('token');
import Toast from '../../vant/toast/toast';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		assess:[],
		nvabarData: {
          showCapsule: 1,  //1表示显示    0表示不显示
          title: '我的评价',   // 名片
          type: '1'
        },
        height: app.globalData.height * 2
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		url._posts('api/user/comment', {
			token: app.globalData.token ? app.globalData.token : token
		}).then(res => {
			this.setData({
				assess: res.data
			})
		}).catch(res => {
            //wx.showToast({ title:"网络访问错误", icon: 'none' })
        })
	},

	appraise(e){
		wx.navigateTo({
			url: "/pages/assess/appraise/appraise?rec_id="+e.target.dataset.item.rec_id
		})
	},
	opinion(e){
		wx.navigateTo({
			url: "/pages/assess/opinion/opinion?comment_id="+e.target.dataset.item.comment_id
		})
	}
})