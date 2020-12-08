const url = require('../../utils/util.js');
const token = wx.getStorageSync('token');
const app = getApp()
import Dialog from '../../vant/dialog/dialog';
Page({

/**
* 页面的初始数据
*/
data: {
    nvabarData: {
      showCapsule: 1,  //1表示显示    0表示不显示
      title: '查看物流',   // 名片
      type: '1'
    },
    height: app.globalData.height * 2,
    order_id:'',
    steps:[]
},

/**
* 生命周期函数--监听页面加载
*/
onLoad: function (options) {
    if(options.order_id){
        this.setData({order_id:options.order_id})
        this.getdata();
    }else{
        wx.navigateBack()
    }
},
getdata(){
    url._post('api/user/delivery_detail',{
        token: app.globalData.token ? app.globalData.token : token,
        order_id: this.data.order_id
    }).then(res => {
        if(res.status == 200){
            for(var i in res.data){
                res.data[i]['text'] = res.data[i].context
                res.data[i]['desc'] = res.data[i].ftime
            }
            if(res.data){
                this.setData({steps:res.data})
            }
        }
    }).catch(res => {
        //wx.showToast({ title:"网络访问错误", icon: 'none' })
    })
},


onShow: function () {
    
}

})