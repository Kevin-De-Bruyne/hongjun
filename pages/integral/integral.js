// pages/integral/integral.js
const url = require('../../utils/util.js');
const token = wx.getStorageSync('token');
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		integral:[],
		nvabarData: {
          showCapsule: 1,  //1表示显示    0表示不显示
          title: '积分商城',   // 名片
          type: '1'
        },
        height: app.globalData.height * 2
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		url._posts('api/index/integral_goods',{
	        token: app.globalData.token ? app.globalData.token : token,
	    }).then(res => {
	        this.setData({integral: res.goods})
	    }).catch(res => {
            //wx.showToast({ title:"网络访问错误", icon: 'none' })
        })
	},


	convert(e){
		if(e.target.dataset.item.store_count>0){
			wx.navigateTo({
				url: "/pages/details/details?goods_id="+e.target.dataset.item.goods_id
			})
		}else{
			wx.showToast({ title: "商品太火爆，没有库存了！", icon: 'none'});
		}
	}
})