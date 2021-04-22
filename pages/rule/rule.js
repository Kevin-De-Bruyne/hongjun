// pages/rule/rule.js
const url = require('../../utils/util.js');
const token = wx.getStorageSync('token');
const app = getApp()
import Toast from '../../vant/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1,  //1表示显示    0表示不显示
      title: '规则',   // 名片
      type: '1',
      showlist: '3'
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbars();
    
  },
  getData(){
    url._posts('api/api/guize',{
      // token: app.globalData.token ? app.globalData.token : token
      // id:this.data.province_list[index].id
  }).then(res => {
    this.setData({
        rule:res
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
    this.getData();
    if(typeof this.getTabBar==='function'&&this.getTabBar()
    ){
        this.getTabBar().setData({
            selected:4
        })
    }
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
        Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration:500
    });
    console.log('我下拉了')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration:500
    });
    console.log('我下拉了')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})