// pages/team/team.js
const url = require('../../utils/util.js');
const token = wx.getStorageSync('token');
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		team:[],
		nvabarData: {
          showCapsule: 1,  //1表示显示    0表示不显示
          title: '团队',   // 名片
          type: '1'
        },
        height: app.globalData.height * 2
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		url._posts('api/user/my_team', {
			token: app.globalData.token ? app.globalData.token : token,
		}).then(res => {
			this.setData({
				team: res
			})
		}).catch(res => {
            //wx.showToast({ title:"网络访问错误", icon: 'none' })
        })
	},

	onChange(e){
		
	}
})