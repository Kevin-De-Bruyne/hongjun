//index.js
//获取应用实例
const token = wx.getStorageSync('token');
const app = getApp()
const API = require('../../utils/util.js');
var times = null;
import Toast from '../../vant/toast/toast';
Page({
    data: {
        value:'',
        navTab:[],
        tabBar:{},
        swiper:[],
        scroll:[],
        tabshow:false,
        shops:[], //热卖
        activity_goods:[], //活动
        time_goods:[], //限时
        recommend_goods:[], //推荐
        num: 2,
        newtimes: "23:59:59",
        nvabarData: {
          showCapsule: 1,  //1表示显示    0表示不显示
          title: '首页',   // 名片
          type: '1',
          showlist: '3'
        },
        height: app.globalData.height * 2,
        showicon:false,
        topNum:0,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        btn:true
    },
    
    swipergoods(r){
        const {index}=r.currentTarget.dataset
        console.log(index)
        wx.navigateTo({
            url:'/pages/swiperDetail/swiperDetail'+`?id=${this.data.swiper[index].id}`
        });
    },
    onLoad: function (options) {
        // wx.showTabBar();
        console.log(options)
        app.editTabbar();
        app.userLogin().then(res => {
            if(res == 1){
                console.log(app.globalData.user_id)
                API._posts('api/Index/index',{
                    scenes: JSON.stringify(options),
                    token: app.globalData.token ? app.globalData.token : token
                }).then(res => {
                    // console.log(app.globalData.user_id)
                    this.setData({
                        swiper: res.banner,
                        navTab: res.nav,
                        scroll: res.primary_classification,
                        shops: res.hot_goods,
                        activity_goods: res.activity_goods,
                        time_goods: res.time_goods,
                        recommend_goods: res.recommend_goods
                    })
                    wx.setStorageSync('scenes',JSON.stringify(options))
                }).catch(res => {
                    //wx.showToast({ title:"网络访问错误", icon: 'none' })
                });
            }
        });
        // wx.getSetting({
        //     success: function(res){
        //         console.log(res)
        //       if (res.authSetting['scope.userInfo']) {
        //         wx.getUserInfo({
        //           success:res=> {
                    
        //           }
        //         })
        //       }else{
        //          wx.navigateTo({
        //            url: '/pages/shouquan/shouquan',
        //          },2000)
        //          wx.showToast({
        //             title: '请授权登录',
        //             icon:'none'
        //           })
        //       }
        //     }
        //   })
        // this.startTime()
    },
    lunbo(){
        wx.navigateTo({
          url: '/pages/renzheng/renzheng',
        })
    },
    bindGetUserInfo: function(e) {
        // console.log(e.detail.userInfo)
        // if (e.detail.userInfo){
        //   //用户按了允许授权按钮
        //   app.userLogin().then(res => {
        //     if(res == 1){
        //         wx.switchTab({
        //             url: '/pages/personal/personal',
        //           })
                  
        //         API._posts('api/Index/index',{
        //             scenes: JSON.stringify(options),
        //             token: app.globalData.token ? app.globalData.token : token
        //         }).then(res => {
        //             console.log(6666)
        //             this.setData({
        //                 swiper: res.banner,
        //                 navTab: res.nav,
        //                 scroll: res.primary_classification,
        //                 shops: res.hot_goods,
        //                 activity_goods: res.activity_goods,
        //                 time_goods: res.time_goods,
        //                 recommend_goods: res.recommend_goods
        //             })
        //             wx.setStorageSync('scenes',JSON.stringify(options))
        //         }).catch(res => {
        //             //wx.showToast({ title:"网络访问错误", icon: 'none' })
        //         });
        //     }
        // });
        // } else {
        //   //用户按了拒绝按钮
        // }
      },
      
    /**
    * 生命周期函数--监听页面显示
    */
    onShow: function (options) {
        API._posts('api/Index/index',{
            scenes: JSON.stringify(options),
            token: app.globalData.token ? app.globalData.token : token
        }).then(res => {
            this.setData({
                swiper: res.banner,
                navTab: res.nav,
                scroll: res.primary_classification,
                shops: res.hot_goods,
                activity_goods: res.activity_goods,
                time_goods: res.time_goods,
                recommend_goods: res.recommend_goods
            })
            wx.setStorageSync('scenes',JSON.stringify(options))
        }).catch(res => {
            //wx.showToast({ title:"网络访问错误", icon: 'none' })
        });
    },
    liveGoGo(){
        API._posts('api/broadcast/get_goods_list',{
            token: app.globalData.token ? app.globalData.token : token,
            limit:30,
            status:3
        }).then(res => {
           console.log(res)
        }).catch(res => {
            //wx.showToast({ title:"网络访问错误", icon: 'none' })
        });
    },  
    startTime(){
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = this.checkTime(m);
        s = this.checkTime(s);
        this.setData({newtimes: h+":"+m+":"+s})
        times = setTimeout(this.startTime,1000);
    },

    checkTime(i){
        if (i<10){
            i="0" + i
        };
        return i;
    },


    goTop (r) {
        this.setData({topNum:0})
    },
    modeshop(r){
        // 0 热卖 1推荐 2活动 3限时
        var i = r.target.dataset.index;
        wx.navigateTo({
            url: '/pages/index/idetails/idetails?index='+i
        });
        console.log(i)
    },
    search(){
        if( this.data.value != ''){
            wx.navigateTo({
                url: '../classification/classification?value='+this.data.value
            })
        }else{
            Toast("搜索关键词不能为空！")
        }
    },
    bindKeyInput: function (e) {
        this.setData({value: e.detail.value})
    },

    upper(r) {
        this.setData({showicon:false});
    },

    scroll(r) {
        if(r.detail.scrollTop > 77){
            this.setData({showicon:true});
        }else{
            this.setData({showicon:false});
        }
    },
    liveGo(){
        
    },
    handleContact(r){
        console.log(r.detail)
    },

    // 横向滑动
    scorll: function (r) {
        var data = r.currentTarget.dataset.index;
        if(r.currentTarget.dataset.index.id == 0){
            wx.switchTab({
                url:'/pages/class/class'
            })
        }else{
            wx.navigateTo({
                url: '../classification/classification?id=' + data.id +'&conters=' + data.name
            })
        }
            
    },
    navst(r) {
        var value= r.currentTarget.dataset.index;
        wx.navigateTo({
            url: value.menu_url
        })
    },
    gouser(){
        wx.switchTab({
            url:'/pages/personal/personal'
        })
    },
    /**
    * 用户点击右上角分享
    */
    onShareAppMessage: function (options) {
        var that = this;
        var shareObj = {
            title: "素星同路",
            path: '/pages/index/index',
            successs: res=>{
                wx.showToast({ title:"分享成功", icon: 'successs' })
            },
            fail: res=>{
                // 转发失败之后的回调
                if(res.errMsg == 'shareAppMessage:fail cancel'){

                }else if(res.errMsg == 'shareAppMessage:fail'){

                }
            }
        };
        if(options.from == 'button'){

        };
        return shareObj;
    },
})