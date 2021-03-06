// page/component/new-pages/cart/cart.js
// 默认请求第一页
const API = require('../../utils/util.js');
const token = wx.getStorageSync('token');
import Toast from '../../vant/toast/toast';
const app = getApp();
import Dialog from '../../vant/dialog/dialog';
var bool = true;
Page({
data: {
    show_edit: "block",
    edit_show: "none",
    edit_name: "编辑",
    // 商品列表数据
    list: [],
    totalP:'',
    // 金额
    totalPrice: '', // 总价，初始为0
    totalPrices: '',
    totalPri:'',
    // 全选状态
    selectAllStatus: true, // 全选状态
    shops:[],
    cartId: [],
    shopId:[],
    active:true,
    shouquan:'',
    nvabarData: {
      showCapsule: 1,  //1表示显示    0表示不显示
      title: '购物车',   // 名片
      type: '1',
      showlist: '3'
    },
    height: app.globalData.height * 2,
    phonenumber:''
},

logins(){
    API._posts('api/login/check_login',{
        token: app.globalData.token ? app.globalData.token : token
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
        //         // console.log('请求失败')
        //         console.log('取消登录，除了首页不能浏览其他页面')
        //     });
        // }
            this.load();
    })
},

onLoad: function () {
    app.editTabbar();
    console.log(token)
    this.logins();
    var that=this
    wx.getSetting({
        success: function(res){
          if (res.authSetting['scope.userInfo']) {
              that.setData({
                  shouquan:2
              })
            wx.getUserInfo({
              success:res=> {
                
              }
            })
          }else{
            that.setData({
                shouquan:1
            })
          }
        }
      })
},
getPhoneNumber:function(e){
    if(e.detail.encryptedData){
        wx.login({
          success:res=>{
              console.log(res)
              var code=res.code
              API._posts('api/api/wx_user_phone ',{
                token: app.globalData.token ? app.globalData.token : token,
                code: code,
                iv:e.detail.iv,
                encryptedData:e.detail.encryptedData,

            }).then(data => {
                console.log(data)
            }).catch(res => {
                wx.showToast({ title:"获取用户信息失败，请重新访问！", icon: 'none' })
            })
          }
        })
    }else{

    }
},
bindGetUserInfo: function(e) {
    console.log(e.detail.userInfo)
    if (e.detail.userInfo){
      //用户按了允许授权按钮
      var cart = [];
      var shop = [];
      var that=this
      app.userLogin().then(res=>{
        if(res==1){
      API._posts('api/cart/cart',{
          goods_id: '',
          token: app.globalData.token ? app.globalData.token : token
      }).then(res => {
          for (let i = 0; i < res.cart_list.length; i++) {
              if(res.cart_list[i].selected == true){
                  cart.push(res.cart_list[i].id);
                  shop.push(res.cart_list[i].goods_id);
              }else{
                  cart.splice(i, 1);
                  shop.splice(i, 1);
              }
          }
          that.setData({
              cartId: cart.join("_"),
              shopId: shop.join("_"),
              list: res.cart_list,
              shops: res.hot_goods,
              totalPri: this.data.totalPrice - this.data.totalPrices,
              selectAllStatus:true,
          });
          console.log(that.data.shouquan)
          // 价格方法
          this.count_price();
          this.count_prices();
      })
      console.log(that.data.shouquan)
      that.setData({
          shouquan:2
      })
    }
})
    } else {
      //用户按了拒绝按钮
    }
  },
onShow: function () {
    this.logins();
},
load:function(){
    var that = this;
    var cart = [];
    var shop = [];
    API._posts('api/cart/cart',{
        goods_id: '',
        token: app.globalData.token ? app.globalData.token : token
    }).then(res => {
        for (let i = 0; i < res.cart_list.length; i++) {
            if(res.cart_list[i].selected == true){
                cart.push(res.cart_list[i].id);
                shop.push(res.cart_list[i].goods_id);
            }else{
                cart.splice(i, 1);
                shop.splice(i, 1);
            }
        }
        that.setData({
            cartId: cart.join("_"),
            shopId: shop.join("_"),
            list: res.cart_list,
            shops: res.hot_goods,
            totalPri: this.data.totalPrice - this.data.totalPrices,
            selectAllStatus:true
        });
        // 价格方法
        this.count_price();
        this.count_prices();
    })
},
/**
* 当前商品选中事件
*/
selectList(e) {
    var that = this;
    // 获取选中的radio索引
    var index = e.currentTarget.dataset.index;
    // 获取到商品列表数据
    var list = that.data.list;
    // 循环数组数据，判断----选中/未选中[selected]
    list[index].selected = !list[index].selected;

    if (list[index].selected == 0){
    that.setData({
    selectAllStatus: false
    })
    } else if (list[index].selected == 1) {
    for (var i = list.length - 1; i >= 0; i--) {
    if (!list[i].selected) {
    that.setData({
    selectAllStatus: false 
    })
    break;
    } else if (list[i].selected == 1) {
    that.setData({ 
    selectAllStatus: true 
    })
    }
    } 
    }
    // 调用计算金额方法
    that.count_price();
    that.count_prices();
},
// 编辑
btn_edit: function () {
    var that = this;
    if (bool) {
    that.setData({
    edit_show: "block",
    edit_name: "取消",
    show_edit: "none"
    })
    bool = false;
    } else {
    that.setData({
    edit_show: "none",
    edit_name: "编辑",
    show_edit: "block"
    })
    bool = true;
    }
},
// 删除
deletes: function (e) {
    var that = this;
    const id = e.currentTarget.id;
    let list = this.data.list;
    const index = e.currentTarget.dataset.index;
    wx.showModal({
    title: '提示',
    content: '确认删除吗？',
    success: function (res) {
    if(res.confirm){
    API._posts('api/cart/delete',
    {
    token: app.globalData.token ? app.globalData.token : token,
    id: id
    }).then(res => {
    if (res == 1) {
    list.splice(index, 1);
    }
    that.load();
    that.count_price();
    that.count_prices();
    }).catch(e => {
    })
    } 
    }
    })  
    this.load(); 
},
/**
* 购物车全选事件
*/
selectAll(e) {
    var that= this
    // 全选ICON默认选中
    let selectAllStatus = this.data.selectAllStatus;
    if (selectAllStatus == true) {
    selectAllStatus = 1;
    // 获取商品数据
    let list = this.data.list;
    // 循环遍历判断列表中的数据是否选中
    for (let i = 0; i < list.length; i++) {
    list[i].selected = 0;
    }
    } else {
    selectAllStatus = 0;
    // 获取商品数据
    let list = this.data.list;
    // 循环遍历判断列表中的数据是否选中
    for (let i = 0; i < list.length; i++) {
    list[i].selected = 1;
    }
    }
    // true  -----   false
    that.setData({
    selectAllStatus: (!selectAllStatus)
    })
    // 计算金额方法
    that.count_price();
    that.count_prices();
},
bindViewTap:function(){
    wx.switchTab({
        url: '../index/index'
    })
},
/**
* 绑定加数量事件
*/
btn_add(e) {
    var that = this
    // 获取点击的索引
    const index = e.currentTarget.dataset.index;
    var id = e.currentTarget.id;
    // 获取商品数据
    let list = this.data.list; 
    // 获取商品数量
    let num = list[index].goods_num;
    num = num + 1
    list[index].goods_num = num;

    API._posts('api/cart/cart_num_cz',{
        token: app.globalData.token ? app.globalData.token : token,
        id: id,
        number:num
    }).then(res => {
        if(res.status == 200){
            // 计算金额方法
            this.count_price();
            this.count_prices();
            this.setData({
                list: list
            });
        }else{
            wx.showToast({ title: res.msg, icon: 'none' })
        }
    }).catch(e => {
        //wx.showToast({ title:"网络访问错误", icon: 'none' })
    })
},
/**
* 绑定减数量事件
*/
btn_minus(e) {
    const index = e.currentTarget.dataset.index;
    var id = e.currentTarget.id;
    let list = this.data.list;
    var that = this
    // 获取商品数量
    let num = list[index].goods_num;
    if (num <= 1) {
        return false;
    }
    num = num - 1;
    list[index].goods_num = num;

    API._posts('api/cart/cart_num_cz',{
        token: app.globalData.token ? app.globalData.token : token,
        id: id,
        number:num
    }).then(res => {
        if(res.status == 200){
            // 计算金额方法
            that.count_price();
            that.count_prices();
            that.setData({
                list: list
            });
        }else{
            wx.showToast({ title: res.msg, icon: 'none' })
        }
    }).catch(e => {
        //wx.showToast({ title:"网络访问错误", icon: 'none' })
    })
},
// 提交订单
btn_submit_order: function (e) {
    var cart = [];
    var shop = [];
    if(this.data.selectAllStatus){
        wx.navigateTo({
            url: '../fillOrder/fillOrder?goods_id=' + this.data.shopId + '&cart_id=' + this.data.cartId +'&action=2'
        });
    }else{
        for (var i in this.data.list) {
            if(this.data.list[i].selected == true){
                cart.push(this.data.list[i].id);
                shop.push(this.data.list[i].goods_id);
            }
        }
        if(cart.length == 0){
            wx.showToast({ title: "至少购买一个商品", icon: 'none'});
            return false;
        }else{
            wx.navigateTo({
                url: '../fillOrder/fillOrder?goods_id=' + shop.join("_") + '&cart_id=' + cart.join("_") +'&action=2'
            });
        }
    }
},
/**
* 计算总价
*/
count_price() {
    // 获取商品列表数据
    let list = this.data.list;
    // 声明一个变量接收数组列表price
    let total = 0;
    // 循环列表得到每个数据
    for (let i = 0; i < list.length; i++) {
    // 判断选中计算价格
        if (list[i].selected) {
            // 所有价格加起来 count_money
            total += list[i].goods_num * list[i].goods_price;
        }
    }
    // 最后赋值到data中渲染到页面
    this.setData({
        list: list,
        totalPrice: total.toFixed(2)
    });
},
// 优惠价
count_prices() {
    // 获取商品列表数据
    let list = this.data.list;
    // 声明一个变量接收数组列表price
    let total = 0;
    // 循环列表得到每个数据
    for (let i = 0; i < list.length; i++) {
        var z = list[i].member_goods_price;
        // 判断选中计算价格
        if (list[i].selected) {
        // 所有价格加起来 count_money
            total +=  z* list[i].goods_num;
        }
    }

    // 最后赋值到data中渲染到页面
    this.setData({
        list: list,
        totalPrices: total.toFixed(2)
    });
  
  }
})