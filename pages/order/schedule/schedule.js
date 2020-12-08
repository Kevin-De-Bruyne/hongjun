// pages/order/schedule/schedule.js
const url = require('../../../utils/util.js');
const token = wx.getStorageSync('token');
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		schedule:[],
		steps: [
			{
			desc: '提交申请'
			},
			{
			desc: '取消处理'
			},
			{
			desc: '退款处理'
			},
			{
			desc: '完成'
			}
		],
		nvabarData: {
          showCapsule: 1,  //1表示显示    0表示不显示
          title: '当前进度',   // 名片
          type: '1'
        },
        height: app.globalData.height * 2
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		url._post('api/user/cancel_order_info',{
			token: app.globalData.token ? app.globalData.token : token,
			order_id: options.order_id
		}).then(res => {
			if(res.order.pay_status==1){
				res.order['pay_msg'] = '取消处理';
			}else if(res.order.pay_status==2){
				res.order['pay_msg'] = '退款处理';
			}else{
				res.order['pay_msg'] = '已完成';
			}
			if(res.order.pay_status<3){
				res.order['pay_note']='亲爱的客户，我们正在为您处理中，请耐心等待';
			}else {
				if(res.order.pay_status<=3){
					res.order['pay_note']='亲爱的客户，您的退款订单已完成';
				}else{
					res.order['pay_note']='亲爱的客户，您的退款订单审核失败，原因'+res.order.orderadmin_note;
				}
			}
			this.setData({
				schedule: res.order
			})
		}).catch(res => {
            //wx.showToast({ title:"网络访问错误", icon: 'none' })
        })
	},

	
})