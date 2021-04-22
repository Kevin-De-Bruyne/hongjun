// pages/muster/job/job.js
const url = require('../../../utils/util.js');
const token = wx.getStorageSync('token');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deputy:false,
    username:null,
    phone:null,
    address:null,
    wx:null,
    is:null,
    iphone:"12345678910",
    province:[
        {
            "text":"是",
            "status":"1"
        },
        {
            "text":"否",
            "status":"2"
        },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    url._posts('api/user/get_contact',{
          token: app.globalData.token ? app.globalData.token : token
      }).then(res => {
          this.setData({iphone: res.phone})
      }).catch(res => {
            //wx.showToast({ title:"网络访问错误", icon: 'none' })
        })
  },


  // 收货人
  userpeople(event){
    this.setData({ username: event.detail });
  },
  // 手机号
  userphone(event){
    this.setData({ phone: event.detail });
  },
  // 详细地址
  useraddress(event){
    this.setData({ address: event.detail });
  },
  userwx(event){
    this.setData({ wx: event.detail });
  },
  useris(event){
    this.setData({ deputy: true });
  },
  cityClose() {
    this.setData({ deputy: false });
  },
  proCancel(){
    this.setData({ deputy: false });
  },
  proConfirm(event) {
    this.setData({ deputy: false, is: event.detail.value.text});
  },
  saveres(){
    if (!this.data.username) { wx.showToast({ title: "姓名为空", icon: 'none'}); return false;}
    if (!this.data.phone) { wx.showToast({ title:"手机为空", icon: 'none'}); return false; }
    if (!this.data.address) { wx.showToast({ title: "所报项目为空", icon: 'none' }); return false; }
    if (!this.data.wx) { wx.showToast({ title: "微信为空", icon: 'none'}); return false;}
    if (!this.data.is) { wx.showToast({ title:"是否已缴费", icon: 'none'}); return false; }
    url._posts('api/user/baoming', {
      token: app.globalData.token ? app.globalData.token : token,
      name: this.data.username,
      phone: this.data.phone,
      project: this.data.address,
      weixin: this.data.wx,
      jiaofei: this.data.is
    }).then(res => {
      wx.showToast({ title: res.msg, icon: 'none' })
      if (res.status == 200){
        setTimeout(()=>{
          wx.switchTab({
            url: '/pages/personal/personal'
          })
        },700)
      }
    }).catch(res => {
            //wx.showToast({ title:"网络访问错误", icon: 'none' })
        })
  }
})