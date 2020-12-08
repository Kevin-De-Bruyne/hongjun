// pages/muster/synergism/sysner/sysner.js
Page({

/**
* 页面的初始数据
*/
data: {
    synergism:[]
},

/**
* 生命周期函数--监听页面加载
*/
onLoad: function (options) {
    url._post('api/index/hezuo_detail',{
        id: options.id
    }).then(res => {
        let result = res.list.content;
        const regex = new RegExp('<img', 'gi');
        result = result.replace(regex, '<img style="max-width: 100%;"');
        this.setData({synergism: result})
    }).catch(res => {
        //wx.showToast({ title:"网络访问错误", icon: 'none' })
    })
},


})