// pages/details/details.
const API = require('../../utils/util.js');
const app = getApp();
const token = wx.getStorageSync('token');
import Toast from '../../vant/toast/toast';
Page({
    data: {
        show: false,
        upbutton: false,
        top: [],
        top_two: [],
        // 默认显示的
        currentTab: 0,
        currentTab_two: 0,
        index: 0,
        cate: Object,
        imgUrls: [],
        id:'',
        is_collect:'',
        value:1,
        goods_content:null,
        shopImg: null,
        spec_index: null,
        spec_goods_price:[],
        title:null,
        images:null,
        nvabarData: {
          showCapsule: 1,  //1表示显示    0表示不显示
          title: '商品详情',   // 名片
          type: '1',
          showlist:''
        },
        height: app.globalData.height * 2,
        showicon:false,
        topNum:0,
        showlist:''
    },

    upper(r) {
        this.setData({showicon:false});
    },

    scroll(r) {
        // console.log(r.detail.scrollTop)
        if(r.detail.scrollTop > 77){
            this.setData({showicon:true});
        }else{
            this.setData({showicon:false});
        }
    },
    goTop (r) {
        this.setData({topNum:0})
    },
    handleContact(r){
        console.log(r.detail)
    },

    laTap: function (r) {
        var i = r.target.dataset.vo;
        var j = r.target.dataset.io;
        var id = r.target.dataset.items.id;
        for(var k in this.data.top[i].spec_item){
            this.data.top[i].spec_item[k].checked = "";
        }
        this.data.top[i].spec_item[j].checked = "actives";
        this.setData({top: this.data.top});
        var spec= this.data.spec_index.split("_")
        spec[i] = id;
        spec = spec.join("_");
        for(var k in this.data.spec_goods_price){
            if(spec == this.data.spec_goods_price[k].key){
                this.setData({
                    shopImg: this.data.spec_goods_price[k],
                    spec_index: this.data.spec_goods_price[k].key
                })
            }
        }
    },
    fenTap: function (e) {
        this.setData({currentTab_two: e.currentTarget.id})
    },
    // 加入购物车
    cart() {
        this.setData({ 
            show: true,
            upbutton: true,
            upaction: false 
        });
    },
    // 立即购买
    shops() {
        this.setData({
            show: true,
            upbutton: false,
            upaction: false
        });
    },
    // 购物车确认
    cartButton() {
        API._posts('api/login/check_login',{
            token: app.globalData.token ? app.globalData.token : token
        }).then(res => {
            if(res.status == 500){
                // wx.navigateTo({
                //     url:'/pages/authorize/login/index?login=11'
                // })
                wx.showToast({ title:"异地登录", icon: 'none' })
            }
            // else if(res.status == 800){
            //     wx.navigateTo({
            //         url: '/pages/authorize/reg/index?login=11'
            //     })
            // }
            else{
                API._posts('api/cart/add_carts',{
                    goods_id: this.data.id, // 商品ID
                    goods_num: this.data.value, //购买数量
                    selected: 1, 
                    spec_key: this.data.spec_index, //商品规格
                    token: app.globalData.token ? app.globalData.token : token
                }).then(res => {
                    if(res.status == 200){
                        wx.showToast({ title: res.msg, icon: 'success' });
                    }else{
                        wx.showToast({ title: res.msg, icon: 'none' });
                    }
                    this.setData({show: false});
                }).catch(res => {
                    //wx.showToast({ title:"网络访问错误", icon: 'none' })
                })
            }
        })

                
    },
    // 购买确认
    shopsButton() {
        API._posts('api/login/check_login',{
            token: app.globalData.token ? app.globalData.token : token
        }).then(res => {
            if(res.status == 500){
                // wx.navigateTo({
                //     url:'/pages/authorize/login/index?login=11'
                // })
                wx.showToast({ title:"异地登录", icon: 'none' })
            }
            // else if(res.status == 800){
            //     wx.navigateTo({
            //         url: '/pages/authorize/reg/index?login=11'
            //     })
            // }
            else{
                API._posts('api/cart/cart2',{
                    action: 1,
                    spec_key: this.data.spec_index,
                    goods_id: this.data.id,
                    goods_num: this.data.value,
                    token: app.globalData.token ? app.globalData.token : token
                }).then(res => {
                    this.setData({show: false});
                    if(res.status == 200){
                        wx.navigateTo({
                            url: '../fillOrder/fillOrder?goods_id=' + this.data.id + '&number=' + this.data.value + '&action=1&spec_key='+this.data.spec_index
                        })
                    }else{
                        Toast(res.msg);
                    }
                }).catch(res => {
                    //wx.showToast({ title:"网络访问错误", icon: 'none' })
                })
            }
        })
    },
    // 立即兑换
    jifen() {
        API._posts('api/cart/cart2',{
            action: 1,
            goods_id: this.data.id,
            goods_num: this.data.value,
            token: app.globalData.token ? app.globalData.token : token
        }).then(res => {
            if(res.status == 200){
                wx.navigateTo({
                    url: '../fillOrder/fillOrder?goods_id=' + this.data.id + '&number=' + this.data.value + '&action=1'
                })
            }else{
                Toast(res.msg);
            }
        }).catch(res => {
            //wx.showToast({ title:"网络访问错误", icon: 'none' })
        })
    },
    onClickButton() {
        this.setData({show: false});
    },
    click() {
        API._posts('api/login/check_login',{
            token: app.globalData.token ? app.globalData.token : token
        }).then(res => {
            if(res.status == 500){
                // wx.redirectTo({
                //     url:'/pages/authorize/login/index?login=11'
                // })
                wx.showToast({ title:"异地登录", icon: 'none' })
            }
            // else if(res.status == 800){
            //     wx.redirectTo({
            //         url: '/pages/authorize/reg/index?login=11'
            //     })
            // }
            else{
                wx.navigateTo({
                    url: '../UserEvaluation/UserEvaluation?goods_id=' + this.data.id
                })
            }
        })
                
    },
    /**
    * 生命周期函数--监听页面加载
    */
    onLoad: function (options) {
        var that = this;
        that.setData({id: options.goods_id});
        if(options.type == 1){
            that.setData({
                nvabarData: {
                    showCapsule: 1,  //1表示显示    0表示不显示
                    title: '商品详情',   // 名片
                    type: '1',
                    showlist: '1'
                }
            });
        };
        that.details();
    },
    addCollection() {
        API._posts('api/login/check_login',{
            token: app.globalData.token ? app.globalData.token : token
        }).then(res => {
            if(res.status == 500){
                // wx.redirectTo({
                //     url:'/pages/authorize/login/index'
                // })
                wx.showToast({ title:"异地登录", icon: 'none' })
            }
            // else if(res.status == 800){
            //     wx.redirectTo({
            //         url: '/pages/authorize/reg/index'
            //     })
            // }
            else{
                API._posts('api/goods/collect',{
                    goods_id: this.data.id,
                    token: app.globalData.token ? app.globalData.token : token
                }).then(res => {
                    if (res.status === 200) {
                        this.details();
                        Toast("已收藏成功！请前往个人中心查看");
                    } else if (res.status === 500) {
                        this.details();
                        Toast("已取消收藏！");
                    }
                }).catch(res => {
                    //wx.showToast({ title:"网络访问错误", icon: 'none' })
                })
            }
        })
                
    },
    details() {
        API._posts('api/goods/goodsinfo',{
            goods_id: this.data.id,
            token: app.globalData.token ? app.globalData.token : token
        }).then(res => {
            
            var WxParse = require('../../wxParse/wxParse.js');
            var article = res.sql.goods_content;
            WxParse.wxParse('article', 'html', article, this, 5);
            // let result = res.sql.goods_content;
            // const regex = new RegExp('<img', 'gi');
            // result = result.replace(regex, '<img style="max-width: 100%;"');
            if(res.spec_goods_price[0]){
                this.setData({
                    shopImg: res.spec_goods_price[0],
                    spec_index: res.spec_goods_price[0].key
                })
            }else{
                this.setData({
                    shopImg: res.sql
                })
            }
            this.setData({
                imgUrls: res.banner,
                cate: res.sql,
                top: res.spec_list,
                is_collect: res.is_collect,
                spec_goods_price: res.spec_goods_price,
                title:res.sql.goods_name,
                images:res.sql.original_img
            })
        }).catch(res => {
            // wx.showToast({ title:"网络访问错误", icon: 'none' })
        })
    },
    onChange(event){
        this.setData({value:event.detail})
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

    },

    /**
    * 生命周期函数--监听页面卸载
    */
    onUnload: function () {

    },

    

    /**
    * 用户点击右上角分享
    */
    onShareAppMessage: function (options) {
        var that = this;
        var shareObj = {
            title: that.data.title,
            path: '/pages/details/details?goods_id='+that.data.id+'&type=1',
            imageUrl: that.data.images,
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
    }
})