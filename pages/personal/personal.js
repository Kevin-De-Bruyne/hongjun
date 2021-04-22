// pages/personal/personal.js
const url = require('../../utils/util.js');
const token = wx.getStorageSync('token');
const app = getApp()
import Dialog from '../../vant/dialog/dialog';
Page({

/**
* 页面的初始数据
*/
data: {
    user:[],
    users:[],
    navs1:[],
    navs2:[],
    navs3:[],
    tabBar:{},
    icon:[],
    anchor:'',
    active:true,
    nvabarData: {
      showCapsule: 0,  //1表示显示    0表示不显示
      title: '个人中心',   // 名片
      type: '1',
      showlist: '3'
    },
    height: app.globalData.height * 2,
    isShouquan:'',
    nav4:[
        {
            
        }
    ]
},
outto(){
    app.globalData.token = null;
    wx.clearStorageSync("token");
    wx.redirectTo({
        url:'/pages/authorize/login/index'
    })
},
navGo(e){
    // const {index}=e.currentTarget.dataset
    // wx.navigateTo({
    //   url: this.data.nav3[index].menu_url+'?anchor='+111
    // })
    // console.log(111)
},
//复制
copyText(){
    var text= this.data.users.id_number;
    wx.setClipboardData({
        data: text,
        success:res=>{
            wx.getClipboardData({
                success:res=>{
                    // wx.showToast({ title: "复制成功", icon: 'success' })
                }
            })
        }
    })
},
logins(){
    let token=wx.getStorageSync("token")
    url._posts('api/login/check_login',{
        token: token
    }).then(res => {
        // if(res.status != 200){
        //     Dialog.confirm({
        //         title: '提示',
        //         message: '您暂未登陆，是否登陆？',
        //     }).then(() => {
        //         if(res.status == 500){
        //             wx.navigateTo({
        //                 url:'/pages/authorize/login/index'
        //             })
        //             wx.showToast({ title:"异地登录", icon: 'none' })
        //         }
        //         // else if(res.status == 800){
        //         //     wx.navigateTo({
        //         //         url: '/pages/authorize/reg/index'
        //         //     })
        //         // }
        //     }).catch(() => {
        //         wx.switchTab({
        //             url:'/pages/index/index'
        //         })
        //     });
        // }
        if(res.status==200){
            this.getdata();
        }
            
    })
},
handleContact(r){
    console.log(r.detail)
},

/**
* 生命周期函数--监听页面加载
*/
onLoad: function (options) {
    if (wx.getUserProfile) {
        this.setData({
          canIUseGetUserProfile: true
        })
      }
    app.editTabbar();
    this.setData({heights:app.globalData.height});
    // this.logins();
    // this.getUserInfo(r)
},

gettoken(){

},
getUserInfo(r){
    if(r.detail.errMsg == "getUserInfo:ok"){
        url._posts('api/login/wx_user',{
            token: app.globalData.token ? app.globalData.token : token,
            userInfo: JSON.stringify(r.detail.userInfo)
        
        }).then(res => {
           console.log(res)
        }).catch(res => {
            wx.showToast({ title:"信息接收失败，请重新授权！", icon: 'none' })
        })
    }
},
bindGetUserInfo: function(e) {
    console.log(e.detail.userInfo)
    console.log(e.detail)
    if (e.detail.userInfo){
      //用户按了允许授权按钮
    //   app.userLogin().then(res => {
    //     if(res==1){
        // app.userLogin().then(res=>{
        //     if(res==1){
            wx.login({
                success: res => {
                    console.log(res)
                    var code=res.code
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    if(res.code!=''){
                        // this.getuserinfo().then(res=>{
                            console.log(res)
                            url._posts('api/login/wx_login',{
                                code: code,
                                userInfo:e.detail.userInfo,
                                iv:e.detail.iv,
                                signature:e.detail.signature,
                                rawData:e.detail.rawData,
                                encryptedData:e.detail.encryptedData,
                                first_leader:'',
                                vote_id:''

                            }).then(data => {
                                if(data.code == 200){
                                    console.log(data)
                                    var token = data.token
                                    // this.globalData.user_id=data.user_id
                                    wx.setStorageSync("token",data.token)
                                    // resolve(1)
                                    url._posts('api/user/index',{
                                        token: app.globalData.token ? app.globalData.token : token
                                    }).then(res => {
                                        this.setData({users: res.data,navs1: res.nav1,navs2: res.nav2,navs3: res.nav3,anchor:res.anchor});
                                    }).catch(res => {
                                        //wx.showToast({ title:"网络访问错误", icon: 'none' })
                                    })   
                                    this.setData({
                                        isShouquan:2
                                    })
                                }else{
                                    reject(2)
                                }
                            }).catch(res => {
                                wx.showToast({ title:"获取用户信息失败，请重新访问！", icon: 'none' })
                            })
                        // })
                    }
                   
                }
                
            })
        // -----------------------------
               
        //     }
        // })
    //     }
    // });
    } else {
      //用户按了拒绝按钮
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (ress) => {
        // this.setData({
        //   userInfo: res.userInfo,
        //   hasUserInfo: true
        // })
        console.log(ress)
        wx.login({
          success: res => {
              console.log(res)
              var code=res.code
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              if(res.code!=''){
                  // this.getuserinfo().then(res=>{
                      console.log(res)
                      url._posts('api/login/wx_login',{
                          code: code,
                          userInfo:ress.userInfo,
                          iv:ress.iv,
                          signature:ress.signature,
                          rawData:ress.rawData,
                          encryptedData:ress.encryptedData
                      }).then(data => {
                          if(data.code == 200){
                            wx.setStorageSync("token",data.token)
                            wx.switchTab({
                              url: '/pages/index/index',
                            })
                            wx.showToast({
                              title: '授权成功',
                              icon:'none'
                            })
                          }else{
                              
                          }
                      }).catch(res => {
                          wx.showToast({ title:"获取用户信息失败，请重新访问！", icon: 'none' })
                      })
                  // })
              }
             
          }
          
      })
      }
    })
  },
getdata(){
    var that=this
    // app.userLogin().then(res=>{
    //     if(res==1){
        let token=wx.getStorageSync("token")
            url._posts('api/user/index',{
                token:token
            }).then(res => {
                that.setData({users: res.data,navs1: res.nav1,navs2: res.nav2,navs3: res.nav3,anchor:res.anchor});
            }).catch(res => {
                //wx.showToast({ title:"网络访问错误", icon: 'none' })
            })   
            that.setData({
                isShouquan:2
            })
    //     }
    // })
    //  wx.getSetting({
    //         success: function(res){
    //             console.log(res)
    //           if (res.authSetting['scope.userInfo']) {
    //               that.setData({
    //                   isShouquan:2
    //               })
    //             wx.getUserInfo({
    //               success:res=> {
                    
    //               }
    //             })
    //           }else{
    //             that.setData({
    //                 isShouquan:1
    //             })
    //           }
    //         }
    //       })

},
getIcon(){
    url._posts('api/api/four_icon',{
        // token: app.globalData.token ? app.globalData.token : token
    }).then(res => {
       this.setData({
           icon:res
       })
    }).catch(res => {
        //wx.showToast({ title:"网络访问错误", icon: 'none' })
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
    this.getIcon();
    this.logins();
},



setting(){
	wx.navigateTo({
		url: '/pages/setting/setting'
	})
},
navst(r){
	var s = r.currentTarget.dataset.item;
    console.log(s)
    if(s == '0'){
        wx.navigateTo({
            url: '/pages/order/order'
        })
    }else{
        wx.navigateTo({
            url: s.menu_url
        })
    }
    	
},
usermoney(){
    wx.navigateTo({
        url: '/pages/personal/money/money?usermoney='+this.data.users.user_money+'&freeze='+this.data.users.frozen_money+'&pay_points='+this.data.users.pay_points
    })
},
usermoneys(){
    wx.navigateTo({
        url: '/pages/personal/overage/overage?type=1'
    })
}
})