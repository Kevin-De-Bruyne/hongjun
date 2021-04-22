// pages/assess/appraise/appraise.js
const url = require('../../../utils/util.js');
const token = wx.getStorageSync('token');
const app = getApp();
var image = [];
var images = [];
var i = 0;
import Toast from '../../../vant/toast/toast';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		appraise: [],
		message: null,
		uploadimg:[],
		value: null,
		value1: null,
		value2: null,
		rec_id: null,
		uploadimgs: false,
		uploadings: [],
		nvabarData: {
          showCapsule: 1,  //1表示显示    0表示不显示
          title: '订单评价',   // 名片
          type: '1'
        },
        height: app.globalData.height * 2
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		url._posts('api/user/add_comment', {
			token: app.globalData.token ? app.globalData.token : token,
			rec_id: options.rec_id
		}).then(res => {
			this.setData({
				appraise: res.order_goods,
				rec_id: options.rec_id
			})
		}).catch(res => {
            //wx.showToast({ title:"网络访问错误", icon: 'none' })
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
		this.setData({
			message: null,
			uploadimg:[],
			value: null,
			value1: null,
			value2: null,
			rec_id:null,
			uploadimgs:false,
			uploadings: []
		})
	},

	messages(e){
		this.setData({ message: e.detail.value});
	},
	upload(){
		const fileManager = wx.getFileSystemManager();
		if(this.data.uploadimg.length>8){
			Toast("最多上传九张图片");return false;
		}
		var _this = this
		wx.chooseImage({
			count: 9,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success: res=> {
				var url = res.tempFilePaths[0];
				let base64 = 'data:image/jpeg;base64,' + fileManager.readFileSync(res.tempFilePaths[0],'base64')
				image[i] = base64;
				images[i] = res.tempFilePaths[0]
				_this.setData({ uploadimg: image ,uploadimgs : true ,uploadings : images});
				i++;
				// wx.request({
				// 	url: url,
				// 	responseType: 'arraybuffer',
				// 	success:res=>{
				// 		console.log(res.tempFilePaths)
				// 		// let base64 = wx.arrayBufferToBase64(res.data);
				// 		let base64　= 'data:image/jpeg;base64,' + fileManager.readFileSync(res.tempFilePaths[0],'base64')
				// 		image[i] = base64;
				// 		_this.setData({ uploadimg: image ,uploadimgs : true});
				// 		i++;
				// 	},
				// 	fail:res=>{
				// 		//wx.showToast({ title:"网络访问错误", icon: 'none' })
				// 	}
				// })
			},
			fail:res=>{
				//wx.showToast({ title:"网络访问错误", icon: 'none' })
			}
		})
	},
	onChange(event){
		this.setData({value: event.detail});
	},
	inChange(event){
		this.setData({value1: event.detail});
	},
	ouChange(event){
		this.setData({value2: event.detail});
	},
	saveres(){
		if (this.data.message == '') { wx.showToast({ title: "请填写评价", icon: 'none'}); return false;}
		if (!this.data.value) { wx.showToast({ title:"请评价商品符合度", icon: 'none'}); return false; }
		if (!this.data.value1) { wx.showToast({ title:"请评价店家服务态度", icon: 'none'}); return false; }
		if (!this.data.value2) { wx.showToast({ title:"请评价物流发货速度", icon: 'none'}); return false; }
		url._posts('api/user/add_comment_post', {
			token: app.globalData.token ? app.globalData.token : token,
			rec_id: this.data.rec_id,
			goods_id: this.data.appraise.goods_id,
			order_id: this.data.appraise.order_id,
			content: this.data.message,
			comment_img_file1: this.data.uploadimg,
			goods_rank: this.data.value,
			service_rank: this.data.value1,
			deliver_rank: this.data.value2
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
	}
})