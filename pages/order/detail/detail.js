// pages/order/detail/detail.js
const url = require('../../../utils/util.js');
const token = wx.getStorageSync('token');
var comply = null;
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		detail:[],
		order_id:null,
		new_date:'0',
		time_stamp:null,
		status:null,
		nvabarData: {
          showCapsule: 1,  //1表示显示    0表示不显示
          title: '订单详情',   // 名片
          type: '1'
        },
        height: app.globalData.height * 2
	},
	//复制
	copyText(){
	    var text= this.data.detail.invoice_no;
	    wx.setClipboardData({
	        data: text,
	        success:res=>{
	            wx.getClipboardData({
	                success:res=>{
	                    // wx.showToast({ title: "复制成功", icon: 'success' })
	                }
	            })
	        }
	    })
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({order_id: options.order_id});
		this.get_order();
	},
	get_order(){
		url._posts('api/user/order_detail',{
			token: app.globalData.token ? app.globalData.token : token,
			id: this.data.order_id
		}).then(res => {
			var time_stamp = res.order.time_stamp*1000;
			if(res.order.msg === '待付款'){
				clearInterval(comply)
				setTimeout(this.time,10);
				var nowadays = new Date().getTime();
				if(time_stamp - nowadays > 0){
					comply = setInterval(this.time, 1000);
				}else{
					clearInterval(comply)
					this.update_order()
				}
			}
			this.setData({
				detail: res.order,
				time_stamp: time_stamp,
				status: res.order.msg
			})
		}).catch(res => {
            //wx.showToast({ title:"网络访问错误", icon: 'none' })
        })
	},
	update_order(){
		url._posts('api/cart/update_order',{
			token: app.globalData.token ? app.globalData.token : token,
			order_id: this.data.order_id
		}).then(res => {
			this.setData({
				status: "已取消"
			})
		})
	},
	
	time(){
		var nowadays = new Date().getTime();
		var leftTime = this.data.time_stamp - nowadays;
		var d, h, m, s, ms;
		if (leftTime >= 0) {
			h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
			m = Math.floor(leftTime / 1000 / 60 % 60);
			s = Math.floor(leftTime / 1000 % 60);
			s = s < 10 ? "0" + s : s;
			m = m < 10 ?  m : m;
			h = h < 10 ? "0" + h : h;
			if(m==0){
				this.setData({ new_date : '时间只有'+ s + '秒,请及时支付'});
			}else{
				this.setData({ new_date : '请在' + m + '分钟内完成付款'});
			}
			// setTimeout(this.time,1000);
		} else if(leftTime <= 0){
			clearInterval(comply)
			this.update_order()
		}
	}
})