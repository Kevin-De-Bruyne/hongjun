var API = require('../../utils/util.js');
const app = getApp();
Page({
data: {
    cateItems: [],
    cateItems2: [],
    curIndex: 0,
    curnum:'',
    url:'',
    nvabarData: {
      showCapsule: 0,  //1表示显示    0表示不显示
      title: '商品分类',   // 名片
      type: '1',
      showlist: '3'
    },
    height: app.globalData.height * 2
},
onLoad:function(){
    var that = this
    API._post('api/Index/classification').then(res => {
        that.setData({
            cateItems: res.category1,
            cateItems2: res.goods_list
        })
    }).catch(res => {
        //wx.showToast({ title:"网络访问错误", icon: 'none' })
    })
},
//事件处理函数  
switchRightTab: function (e) {
    var that = this;
    var array = that.data.cateItems;
    var i = e.currentTarget.dataset.index;
    // 把点击到的某一项，设为当前index  
    that.setData({
        curIndex: i
    })
    API._post('api/Index/classification',{
        id: array[i].id
    }).then(res => {
        that.setData({
            cateItems: res.category1,
            cateItems2: res.goods_list
        })
    }).catch(res => {
        //wx.showToast({ title:"网络访问错误", icon: 'none' })
    })
},
// 商品详情页
de:function(e){
    // wx.navigateTo({
    //     url: '../classification/classification?id=' + e.currentTarget.dataset.item.id+'&conters='+e.currentTarget.dataset.item.name
    // })
    wx.navigateTo({
        url:'../details/details?goods_id='+ e.currentTarget.dataset.item.goods_id
    })
}
})
