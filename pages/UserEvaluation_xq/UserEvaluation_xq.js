// pages/UserEvaluation_xq/UserEvaluation_xq.js
const API = require('../../utils/util.js');
const token = wx.getStorageSync('token');
const app = getApp();
import Toast from '../../vant/toast/toast';
Page({
    /**
    * 页面的初始数据
    */
    data: {
        goods_id: '',
        url: '',
        sql: [],
        eval: [],
        comm: '',
        inputValue: '',
        nvabarData: {
          showCapsule: 1,  //1表示显示    0表示不显示
          title: '评价详情',   // 名片
          type: '1'
        },
        height: app.globalData.height * 2
    },

    /**
    * 生命周期函数--监听页面加载
    */
    onLoad: function (options) {
        var goods_id = options.goods_id;
        var shu = options.number;
        API._post('api/goods/comment_list',{
            goods_id: goods_id,
            token: app.globalData.token ? app.globalData.token : token,
        }).then(res => {
            this.setData({
                eval: res.evaluate[shu],
                comm: res.evaluate[shu].comment_id,
                goods_id: goods_id
            });
            this.load();
        });
    },
    load(){
        API._post('api/goods/tp_reply',{
            comment_id: this.data.comm,
        }).then(res => {
            this.setData({
                sql: res.sql
            })
        });
    },
    zan(e) {
        API._post('api/goods/givealike',{
            goods_id: this.data.goods_id,
            comment_id: this.data.comm,
            token: app.globalData.token ? app.globalData.token : token,
        }).then(res => {
            Toast(res.msg);
        })
        this.load();
    },
    bindKeyInput: function (e) {
        this.setData({
            inputValue: e.detail.value
        })
    },
    clickButton() {
        if(this.data.inputValue){
            API._post('api/goods/reply_cz',{
                comment_id: this.data.comm,
                content: this.data.inputValue,
                token: app.globalData.token ? app.globalData.token : token,
            }).then(res => {
                this.load();
                this.setData({
                    inputValue:''
                })
            })
        }else{
            Toast("亲~输入的内容不能为空哦！")
        }
    },
    

    /**
    * 生命周期函数--监听页面卸载
    */
    onUnload: function () {
        this.setData({
            inputValue: '',
        });
    },

    
})