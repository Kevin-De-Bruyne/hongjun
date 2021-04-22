// pages/UserEvaluation/UserEvaluation.js
const API = require('../../utils/util.js');
const token = wx.getStorageSync('token');
import Toast from '../../vant/toast/toast';
const app = getApp()
Page({

/**
* 页面的初始数据
*/
data: {
    img:true,
    url: '',
    eval:[],
    goods_id:'',
    dex:'',
    zan_num:'',
    nvabarData: {
    showCapsule: 1,  //1表示显示    0表示不显示
    title: '用户评价',   // 名片
    type: '1'
    },
    height: app.globalData.height * 2
},

/**
* 生命周期函数--监听页面加载
*/
onLoad: function (options) {
    this.setData({
        goods_id: options.goods_id
    })
    this.show();
},
show(){
    API._posts('api/goods/comment_list',{
        goods_id: this.data.goods_id,
        token: app.globalData.token ? app.globalData.token : token,
    }).then(res => {
        this.setData({
            eval: res.evaluate
        })
    })
},
zan(e) {
    var i = e.currentTarget.dataset.index;
    API._posts('api/goods/givealike',{
        goods_id: this.data.goods_id,
        comment_id: this.data.eval[i].comment_id,
        token: app.globalData.token ? app.globalData.token : token,
    }).then(res => {
        Toast(res.msg);
        if(res.status == 200){
            this.show();
        }
    })
},

/**
* 生命周期函数--监听页面初次渲染完成
*/
onReady: function () {

},
user_xq(e) {
    var tindex = e.currentTarget.dataset.index;
    wx.navigateTo({
        url: '../UserEvaluation_xq/UserEvaluation_xq?number=' + tindex + '&goods_id=' + this.data.goods_id
    })
},

/**
* 生命周期函数--监听页面显示
*/
onShow: function () {
    this.show();
},


})