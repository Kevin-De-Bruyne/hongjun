// pages/shouquan/shouquan.js
const token = wx.getStorageSync('token');
const app = getApp()
const API = require('../../utils/util.js');
var times = null;
import Toast from '../../vant/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1,  //1表示显示    0表示不显示
      title: '首页',   // 名片
      type: '1',
      showlist: '1'
    },
    phone:'',
    shopId:'',
    cartId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.shopId=options.shopId
    this.data.cartId=options.cartId
  },
  sendPhone(){
    API._posts('api/api/edit_phone',{
      token: app.globalData.token ? app.globalData.token : token,
       phone:this.data.phone
  }).then(res => {
    if(res.code==200){
      wx.navigateBack()
    }
  }).catch(res => {
      wx.showToast({ title:"信息接收失败，请重新授权！", icon: 'none' })
  })
  },
  bindName(e){
    this.setData({
      phone:e.detail.value
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