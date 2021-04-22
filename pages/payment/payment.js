// pages/payment/payment.js
const API = require('../../utils/util.js');
const token = wx.getStorageSync('token');
const app = getApp();
import Toast from '../../vant/toast/toast';
Page({

    /**
    * 页面的初始数据
    */
    data: {
        order_amount: '',
        order_id: '',
        order_sn:'',
        nvabarData: {
          showCapsule: 1,  //1表示显示    0表示不显示
          title: '支付',   // 名片
          type: '1'
        },
        height: app.globalData.height * 2
    },

    /**
    * 生命周期函数--监听页面加载
    */
    onLoad: function (options) {
        this.setData({
            order_amount: options.order_amount,
            order_id: options.order_id,
            order_sn: options.order_sn
        })
    },
    payment(){
        API._posts('api/pay/weixinpay',{
            token: app.globalData.token ? app.globalData.token : token,
            money: this.data.order_amount,
            order_id: this.data.order_id,
            order_sn: this.data.order_sn
        }).then(res => {
            wx.requestPayment({
                'timeStamp': res.data.timeStamp,
                'nonceStr': res.data.nonceStr,
                'package': res.data.package,
                'signType': res.data.signType,
                'paySign': res.data.paySign,
                success: function (res) {

                },
                fail: function (res) {

                },
                complete: function (res) {
                    if (res.errMsg == 'requestPayment:ok') {
                        wx.showToast({ title:"支付成功", icon: 'none' })
                        setTimeout(function () {
                            wx.navigateTo({url: '../order/order'})
                        }, 700)
                    }else{
                        wx.showToast({ title:"支付失败", icon: 'none' })
                    }
                }
            })
        }).catch(res => {
            //wx.showToast({ title:"网络访问错误", icon: 'none' })
        })
    },
    
})