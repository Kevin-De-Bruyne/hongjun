// pages/live/live.js
const API = require('../../utils/util.js');
const app = getApp();
const token = wx.getStorageSync('token');
import Toast from '../../vant/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper:[
       {
        url:'../../images/lunbo.png'
       },
       {
        url:'../../images/lunbo.png'
       },
       {
        url:'../../images/lunbo.png'
       }
    ],
    nvabarData: {
      showCapsule: 1,  //1表示显示    0表示不显示
      title: '直播',   // 名片
      type: '1',
      // showlist: '3'
    },
    scrollTop:0,
    textList:[
      {
        name:'推荐'
      },
      {
        name:'服装穿搭'
      },
      {
        name:'亲自母婴'
      },
      {
        name:'鞋袜鞋包'
      },
      {
        name:'珠宝饰品'
      },
      {
        name:'鞋袜鞋包'
      },
      {
        name:'珠宝饰品'
      },
      {
        name:'鞋袜鞋包'
      },
      {
        name:'珠宝饰品'
      }
    ],
    currentIndex:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onPageScroll: function (e) {
    var _this = this;
    // console.log(e.scrollTop)
    _this.setData({
    scrollTop:e.scrollTop
    })
  },
  liClick(e){
    const {index}=e.currentTarget.dataset;
    this.setData({
      currentIndex:index
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