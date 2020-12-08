// pages/recommend/recommend.js
const url = require('../../utils/util.js');
const token = wx.getStorageSync('token');
import Toast from '../../vant/toast/toast';
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		list: [],
		nvabarData: {
          showCapsule: 1,  //1表示显示    0表示不显示
          title: '我的推荐',   // 名片
          type: '1'
        },
        height: app.globalData.height * 2
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		url._post('api/user/qr_code', {
			token: app.globalData.token ? app.globalData.token : token
		}).then(res => {
			this.setData({ list: res })
		}).catch(res => {
			//wx.showToast({ title:"网络访问错误", icon: 'none' })
		})
	},
    save(){
        var _this = this;
        wx.downloadFile({
            url: _this.data.list.qrcode,
            success: function (sres) {
                if (sres.statusCode === 200) {
                    wx.saveImageToPhotosAlbum({
                        filePath: sres.tempFilePath,
                        success:res=>{
                            wx.showToast({ icon: 'success' });
                        },
                        fail:res=>{
                            
                        },
                        complete:res=>{
                            console.log(res)
                            if(res.errMsg == "saveImageToPhotosAlbum:fail cancel"){

                            }
                        }
                    })
                }
            },fail:function(fres){}
        })
    },

	/**
    * 用户点击右上角分享
    */
    onShareAppMessage: function (options) {
        var that = this;
        var shareObj = {
            title: "怀朴线上商城",
            path: '/pages/index/index',
            successs: res=>{
                wx.showToast({ title:"分享成功", icon: 'successs' })
            },
            fail: res=>{
                // 转发失败之后的回调
                if(res.errMsg == 'shareAppMessage:fail cancel'){

                }else if(res.errMsg == 'shareAppMessage:fail'){

                }
            }
        };
        if(options.from == 'button'){

        };
        return shareObj;
    },
	
})