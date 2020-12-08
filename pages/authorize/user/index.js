// pages/authorize/user/index.js
const url = require('../../../utils/util.js');
const token = wx.getStorageSync('token');
const app = getApp();
Page({

/**
* 页面的初始数据
*/
data: {
    isprotocol:null,
    type:null,
    nvabarData: {
      showCapsule: 1,  //1表示显示    0表示不显示
      title: '平台用户服务协议',   // 名片
      type: '1'
    },
    height: app.globalData.height * 2
},
onLoad: function (options) {
    console.log(options.type);

    if(options.type){
        this.setData({type:options.type})
        if(options.type == 0){
            this.getlist('api/index/useragreement');
        }else if(options.type == 1){
            this.getlist('api/index/teacheragreement');
            this.setData({
                nvabarData: {
                  showCapsule: 1,  //1表示显示    0表示不显示
                  title: '香养师注册协议',
                  type: '1'
                }
            })
            // wx.setNavigationBarTitle({
            //     title: "香养师注册协议"
            // })
        }else if(options.type == 2){
            this.getlist('api/index/schoolagreement');
            this.setData({
                nvabarData: {
                  showCapsule: 1,  //1表示显示    0表示不显示
                  title: '香养机构注册协议',
                  type: '1'
                }
            })
            // wx.setNavigationBarTitle({
            //     title: "香养机构注册协议"
            // })
        }
    }
        
},
getlist(r){
    url._post(r).then(res => {
        var result = res.desc;
        const regex = new RegExp('<img', 'gi');
        result = result.replace(regex, '<img style="max-width: 100%;"');
        this.setData({isprotocol: result})
    }).catch(res => {
        wx.showToast({ title:"异常错误", icon: 'none' })
    })
},

onShow: function (options) {
    console.log(this.data.type);
    if(this.data.type == 0){
        this.getlist('api/index/useragreement');
    }else if(this.data.type == 1){
        this.getlist('api/index/teacheragreement');
    }else if(this.data.type == 2){
        this.getlist('api/index/schoolagreement');
    }
},

})