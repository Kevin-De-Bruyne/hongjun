var url = require('../../../utils/util.js');
// var index=require('../../index/index/index.js');
const app = getApp()

Component({
    properties: {
        navbarData:{ 
            type: Object,
            value: {},
            observer: function (event) {
                // console.log(event)
            }
        }
    },
    data: {
        height: '',
        //默认值  默认显示左上角
        navbarData: {
            showCapsule: null
        }
    },
    attached: function () {
        // 获取是否是通过分享进入的小程序
        this.setData({
            share: app.globalData.share
        })
        // 定义导航栏的高度   方便对齐
        this.setData({
            height: app.globalData.height
        })
        
    },
    methods: {
        // 返回上一页面
        _navback() {
            wx.navigateBack()
            // wx.showTabBar()
        },
        //返回到我的
        _backmine() {
            app.globalData.share = false;
            wx.switchTab({
                url: '/pages/personal/personal',
            })
        },
        //返回到首页
        _backhome() {
            app.globalData.share = false;
            wx.switchTab({
                url: '/pages/index/index',
            })
        }
    }

})