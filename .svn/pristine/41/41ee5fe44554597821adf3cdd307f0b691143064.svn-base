// pages/assess/opinion/opinion.js
const url = require('../../../utils/util.js');
const app = getApp();
const token = wx.getStorageSync('token');
import Toast from '../../../vant/toast/toast';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		opinion:[],
		nvabarData: {
          showCapsule: 1,  //1表示显示    0表示不显示
          title: '查看评价',   // 名片
          type: '1'
        },
        height: app.globalData.height * 2
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		url._post('api/user/comment_info', {
			token: app.globalData.token ? app.globalData.token : token,
			comment_id: options.comment_id
		}).then(res => {
			this.setData({
				opinion: res.info
			})
		}).catch(res => {
            //wx.showToast({ title:"网络访问错误", icon: 'none' })
        })
	},

})