// pages/index/idetails/idetails.js
const token = wx.getStorageSync('token');
const app = getApp()
const url = require('../../../utils/util.js');
Page({

/**
* 页面的初始数据
*/
data: {
    shops: [],
    index: null,
    nvabarData: {
      showCapsule: 1,  //1表示显示    0表示不显示
      title: '',   // 名片
      type: '1'
    },
    height: app.globalData.height * 2
},

/**
* 生命周期函数--监听页面加载
*/
onLoad: function (options) {
    // 0 热卖 1推荐 2活动 3限时
    if(options.index == 0){
        this.setData({
            nvabarData:{
                showCapsule: 1,
                title: '热卖商品', 
                type: '1'
            }
        })
        // wx.setNavigationBarTitle({
        //     title: "热卖商品"
        // })
    }else if(options.index == 1){
        this.setData({
            nvabarData:{
                showCapsule: 1,
                title: '产品推荐', 
                type: '1'
            }
        })
    }else if(options.index == 2){
        this.setData({
            nvabarData:{
                showCapsule: 1,
                title: '会员活动', 
                type: '1'
            }
        })
    }else if(options.index == 3){
        this.setData({
            nvabarData:{
                showCapsule: 1,
                title: '限时抢购', 
                type: '1'
            }
        })
    };
    this.setData({index:options.index})
    this.getDatas(options.index);
},

getDatas(r){
    url._post('api/index/goods_list',{
        token: app.globalData.token ? app.globalData.token : token,
        type: r
    }).then(res => {
        this.setData({shops: res.data})
    }).catch(res => {
        //wx.showToast({ title:"网络访问错误", icon: 'none' })
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
    this.setData({shops: [],index: null})
},

/**
* 生命周期函数--监听页面卸载
*/
onUnload: function () {
    this.setData({shops: [],index: null})
},
/**
* 页面相关事件处理函数--监听用户下拉动作
*/
onPullDownRefresh: function () {
    this.getDatas(this.data.index);
},
})