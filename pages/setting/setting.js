const url = require('../../utils/util.js');
const token = wx.getStorageSync('token');
const app = getApp();
Page({

/**
* 页面的初始数据
*/
data: {
	password1:'',
	password2:'',
	password3:'',
	show: false,
    nvabarData: {
      showCapsule: 1,  //1表示显示    0表示不显示
      title: '密码设置',   // 名片
      type: '1'
    },
    height: app.globalData.height * 2,
    shopId:'',
    cartId:''
},

/**
* 生命周期函数--监听页面加载
*/
onLoad: function (options) {
    this.data.shopId=options.shopId
    this.data.cartId=options.cartId
	url._posts('api/user/userinfo',{
        token: app.globalData.token ? app.globalData.token : token,
    }).then(res => {
    	if(res.data.paypwd_status == 1){
    		this.setData({show: true})
    	}
    }).catch(res => {
        wx.showToast({ title:"信息接收失败，请重新授权！", icon: 'none' })
    })
},
saveseed(){
	url._posts('api/user/paypwd',{
        token: app.globalData.token ? app.globalData.token : token,
        new_password: this.data.password2,
        confirm_password: this.data.password3,
        old_password: this.data.password1,
    }).then(res => {
    	// wx.showToast({ title: res.msg, icon: 'none' })
    	if(res.status == 200){
    		wx.navigateBack()
        }
        if(res.msg=='请先绑定手机号'){
            wx.navigateTo({
                url: '../shouquan/shouquan?goods_id=' + this.data.shopId + '&cart_id=' + this.data.cartId +'&action=2',
            })
        }
    }).catch(res => {
        wx.showToast({ title:"信息接收失败，请重新授权！", icon: 'none' })
    })
},
password(r){
	if(r.target.dataset.index == 0){
        this.setData({password1: r.detail})
    }else if(r.target.dataset.index == 1){
        this.setData({password2: r.detail})
    }else if(r.target.dataset.index == 2){
        this.setData({password3: r.detail})
    }
}

})