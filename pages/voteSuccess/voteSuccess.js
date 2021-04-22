// pages/playerDetail/playerDetail.js
const token = wx.getStorageSync('token');
const app = getApp()
const API = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id:'',
    rank_number:'',
    player:{},
    htp:'https://www.myfutrue.com/',
    nvabarData: {
      showCapsule: 1,  //1表示显示    0表示不显示
      title: '选手详情',   // 名片
      type: '1',
      showlist: '1'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbars();
    this.setData({
      user_id:options.user_id,
      rank_number:options.rank_number
    })
    this.getData();
  },
  getData(){
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
  again(){
    wx.navigateTo({
      url: '/pages/present/present'+`?user_id=${this.data.user_id}`+`&rank_number=${this.data.rank_number}`+`&player_img=${this.data.player.head_pic}`
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