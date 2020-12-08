// pages/fillOrder/fillOrder.js
const API = require('../../utils/util.js');
const token = wx.getStorageSync('token');
const app = getApp();
import Toast from '../../vant/toast/toast';
Page({

/**
* 页面的初始数据
*/
data: {
    checked: false,
    message:'',
    password:'',
    number:null,
    user_money:'',
    shipping_fee:'',
    youhui_amount:'',
    total_amount:'',
    jf_amount:'',
    goods_id:'',
    action:'',
    cate:Object,
    user_address:Object,
    address_id:'',
    cart_id:'',
    spec_key:null,
    radio: '1',
    list:[],
    nvabarData: {
      showCapsule: 1,  //1表示显示    0表示不显示
      title: '提交订单',   // 名片
      type: '1'
    },
    height: app.globalData.height * 2,
    disableds:false
},

nations(r){
    var value = r.detail;
    this.setData({ message: value.value })
},

onClick(event) {
    const { name } = event.currentTarget.dataset;
    this.setData({
        radio: name
    });
},
onChange({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ 
        checked: detail 
    });
},
onChangetwo(event) {
    this.setData({
        password: event.detail
    });
},
address(){
    wx.navigateTo({
        url:'../address/address?number='+this.data.number+'&goods_id='+this.data.goods_id+'&action='+this.data.action
    })
},
/**
* 生命周期函数--监听页面加载
*/
onLoad: function (options) {
    if(options.spec_key && options.spec_key != 'null'){
        this.setData({spec_key: options.spec_key});
    }
    if(options.number){
        this.setData({number: options.number});
    }
    if(wx.getStorageSync("address_id")){
        this.setData({address_id: wx.getStorageSync("address_id")});
    }
    if(options.cart_id){
        this.setData({cart_id: options.cart_id});
    }
    this.setData({
        goods_id: options.goods_id,
        action: options.action
    });
    this.fillO();
},
fillO(){
    API._post('api/cart/cart2',{
        action: this.data.action,
        address_id: this.data.address_id,
        cart_id: this.data.cart_id,
        goods_id: this.data.goods_id,
        goods_num: this.data.number,
        spec_key: this.data.spec_key,
        token: app.globalData.token ? app.globalData.token : token,
    }).then(res => {
        res.discount = Number(res.discount)
        this.setData({
            user_money: res.user_money,
            youhui_amount: res.youhui_amount,
            shipping_fee: res.shipping_fee,
            total_amount: res.total_amount,
            jf_amount: res.jf_amount,
            cate: res.goods,
            user_address: res.user_address,
            list: res
        })
    }).catch(res => {
        //wx.showToast({ title:"网络访问错误", icon: 'none' })
    })
},
click() {
    if(this.data.disableds){return false};
    Toast.loading({
        mask: true,
        message: '提交中...',
        duration:0
    });
    this.setData({disableds:true});
    API._post('api/cart/order',{
        total_amount: this.data.total_amount,
        pay_type: this.data.radio, //支付方式
        user_note: this.data.message,
        shipping_fee: this.data.shipping_fee,
        paypwd: this.data.password,
        action: this.data.action,
        address_id: this.data.user_address.address_id,
        goods_id: this.data.goods_id,
        cart_id: this.data.cart_id,
        goods_num: this.data.number,
        spec_key: this.data.spec_key,
        token: app.globalData.token ? app.globalData.token : token,
    }).then(res => {
        // if(res.status === 200){
        //     if (this.data.checked = true){
        //         Toast("提交订单成功！正在跳转支付页");
        //         setTimeout(()=>{
        //             wx.navigateTo({
        //                 url: '../payment/payment?order_amount=' + res.order_amount + '&order_id=' + res.order_id + '&order_sn=' + res.order_sn
        //             })
        //         },300)
        //     }else{
        //         wx.navigateTo({
        //             url: '../order/order'
        //         })
        //     }
        // }else{
        //     Toast(res.msg);
        // }
        setTimeout(()=>{
            Toast.clear();
            setTimeout(()=>{
                this.setData({disableds: false});
            },1500)
            if(res.status == 200){
                if(this.data.radio == '1' || this.data.radio == '3'){
                    wx.redirectTo({url: '/pages/order/order'})
                }else{
                    this.payment(res.order_amount,res.order_id,res.order_sn);
                }
            }else if(res.status == 10000){
                Toast(res.msg);
                setTimeout(()=>{
                    wx.navigateTo({url: '/pages/setting/setting'})
                },1500)
            }else{
                Toast(res.msg);
            }
        },700)
            
        
    }).catch(res => {
        Toast.clear();
        //wx.showToast({ title:"网络访问错误", icon: 'none' });
    })
},

// 微信支付
payment(order_amount,order_id,order_sn){
    API._post('api/pay/weixinpay',{
        token: app.globalData.token ? app.globalData.token : token,
        money: order_amount,
        order_id: order_id,
        order_sn: order_sn
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
                wx.redirectTo({url: '/pages/order/order'})
            }
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
    if(wx.getStorageSync("address_id")){
        this.setData({address_id: wx.getStorageSync("address_id")});
    }
    this.fillO();
},

})