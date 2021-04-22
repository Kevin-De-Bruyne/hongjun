// pages/payConfirm/payConfirm.js
const token = wx.getStorageSync('token');
const app = getApp()
const API = require('../../utils/util.js');
import Toast from '../../vant/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:{},
    htp:'https://hj.gzhjzdd.cn/',
    nvabarData: {
      showCapsule: 1,  //1表示显示    0表示不显示
      title: '680助力包',   // 名片
      type: '1',
      showlist: '1'
    },
    user_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
    console.log(options.user_id)
    this.setData({
      user_id:options.user_id
    })
  },
  btn(){
  //   API._posts('api/pay/weixinpay',{
  //     token: app.globalData.token ? app.globalData.token : token,
  //     money: order_amount,
  //     order_id: order_id,
  //     order_sn: order_sn
  // }).then(res => {
  //     wx.requestPayment({
  //         'timeStamp': res.data.timeStamp,
  //         'nonceStr': res.data.nonceStr,
  //         'package': res.data.package,
  //         'signType': res.data.signType,
  //         'paySign': res.data.paySign,
  //         success: function (res) {

  //         },
  //         fail: function (res) {

  //         },
  //         complete: function (res) {
  //             wx.redirectTo({url: '/pages/order/order'})
  //         }
  //     })
  // }).catch(res => {
  //     //wx.showToast({ title:"网络访问错误", icon: 'none' })
  // })
  // API._posts('api/api/add_pay_vote_order',{
  //   user_id:app.globalData.user_id,
  //   money:this.data.goods.shop_price,
  //   goods_id:this.data.goods.goods_id

  // }).then(res => {
  //  console.log(res)
  //   if(res.code==200){
  //     API._posts('api/pay/weixinpay',{
  //       token: app.globalData.token ? app.globalData.token : token,
  //       money: this.data.goods.shop_price,
  //       order_id: res.order_id,
  //       order_sn: res.order_sn,
  //       to_user:this.data.user_id
  //     }).then(res => {
  //      console.log(res)
  //      wx.requestPayment({
  //       'timeStamp': res.data.timeStamp,
  //       'nonceStr': res.data.nonceStr,
  //       'package': res.data.package,
  //       'signType': res.data.signType,
  //       'paySign': res.data.paySign,
  //       success: function (res) {

  //       },
  //       fail: function (res) {

  //       },
  //       complete: function (res) {
  //           wx.redirectTo({url: '/pages/toupiao/toupiao'})
  //           wx.showToast({
  //             title: '支付成功',
  //             icon:'none'
  //           })
  //       }
  //   })
  //     }).catch(res => {
      
  //     });
  //   }
  // }).catch(res => {
  
  // });
//   API._posts('api/cart/cart2',{
//     action: 1,
//     // spec_key: this.data.spec_index,
//     goods_id: this.data.goods.goods_id,
//     goods_num: 1,
//     token: app.globalData.token ? app.globalData.token : token
// }).then(res => {
//     this.setData({show: false});
//     if(res.status == 200){
        wx.navigateTo({
            url: '../fillOrder/fillOrder?goods_id=' + this.data.goods.goods_id + '&number=1'+'&action=1'+'&user_id='+this.data.user_id
        })
//     }else{
//         Toast(res.msg);
//     }
// }).catch(res => {
//     //wx.showToast({ title:"网络访问错误", icon: 'none' })
// })
  },
  getData(){
    API._posts('api/api/sign_goods',{

  }).then(res => {
    this.setData({
      goods:res.data
    })
  }).catch(res => {
  
  });
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})