// pages/playerDetail/playerDetail.js
const token = wx.getStorageSync('token');
const app = getApp()
const API = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    presentList:[],
    htp:'https://www.myfutrue.com/',
    user_id:'',
    rank_number:'',
    player:{},
    currentIndex:0,
    checked:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.player_img)
    console.log(options.user_id)
    app.editTabbars();
    this.setData({
      user_id:options.user_id,
      rank_number:options.rank_number
    })
  },
  presentClick(e){
    const {index}=e.currentTarget.dataset
    this.setData({
      currentIndex:index
    })
  },
  getData(){
    API._posts('api/api/vote_list',{
      // token: app.globalData.token ? app.globalData.token : token
  }).then(res => {
      this.setData({
        presentList:res
      })
      console.log(this.data.presentList)
    
  }).catch(res => {
 
  });
  API._posts('api/api/vote_message',{
    // token: app.globalData.token ? app.globalData.token : token
    user_id:this.data.user_id,
    rank_number:this.data.rank_number
    // text:this.data.search
}).then(res => {
  this.setData({
    player:res.data[0]
  })
  console.log(this.data.player)
}).catch(res => {

});
  },
  cbClick(){
    this.setData({
      checked:!this.data.checked
    })
  },
  pay(){
    console.log(this.data.checked)
    if(this.data.checked==false){
      wx.showToast({
        title: '请勾选协议',
        icon:'none'
      })
    }else{
      API._posts('api/api/add_pay_vote_order',{
        user_id:app.globalData.user_id,
        money:this.data.presentList[this.data.currentIndex].shop_price,
        goods_id:this.data.presentList[this.data.currentIndex].goods_id
    
      }).then(res => {
       console.log(res)
        if(res.code==200){
          API._posts('api/pay/weixinpay',{
            token: app.globalData.token ? app.globalData.token : token,
            money: this.data.presentList[this.data.currentIndex].shop_price,
            order_id: res.order_id,
            order_sn: res.order_sn,
            to_user:this.data.user_id
          }).then(res => {
           console.log(res)
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
                wx.redirectTo({url: '/pages/toupiao/toupiao'})
            }
        })
          }).catch(res => {
          
          });
        }
      }).catch(res => {
      
      });
    }
   
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  aa(){
    wx.navigateTo({
      url: '/pages/liwuxieyi/liwuxieyi',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData();
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