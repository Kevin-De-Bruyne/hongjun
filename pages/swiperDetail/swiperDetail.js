// pages/swiperDetail/swiperDetail.js
const token = wx.getStorageSync('token');
const app = getApp()
const API = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    desc:'',
    nvabarData: {
      showCapsule: 1,  //1表示显示    0表示不显示
      title: '轮播详情',   // 名片
      type: '1',
      showlist: '1'
    },
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    // this.getData();
    API._posts('api/api/loopic_message',{
      id:options.id
   }).then(res => {
     this.setData({
       desc:res[0].desc
     })
   }).catch(res => {
   
   });
  },
  getData(){
    API._posts('api/api/loopic_message',{
     id:37
  }).then(res => {
    
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