// pages/playerDetail/playerDetail.js
const token = wx.getStorageSync('token');
const app = getApp()
const API = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id:'',
    rank_number:'',
    player:{
      // total_vote:2500
    },
    qrcode:'',
    show: false,
    payshow:false,
    style:'height:35%;width:80%;display:flex;align-items: center;justify-content: center; background-color:rgba(255,255,255,0);flex-direction: column;',
    htp:'https://www.myfutrue.com/',
    nvabarData: {
      showCapsule: 1,  //1表示显示    0表示不显示
      title: '选手详情',   // 名片
      type: '1',
      showlist: '3'
    },
    codepop:false,
    needvote:'',
    showBao:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbars();
    console.log(app.globalData.user_id)
    
    console.log(options.user_id)
    console.log(options.rank_number)
    this.setData({
      user_id:options.user_id,
      rank_number:options.rank_number
    })
    this.getData().then(res=>{
      if(app.globalData.user_id==res.data[0].user_id){
        this.setData({
          showBao:true
        })
      }
    });
    this.needvote();
  },
  btnpay(){
    wx.navigateTo({
      url: `/pages/payConfirm/payConfirm?user_id=${this.data.user_id}`,
    })
  },
  getqrcode(){
    this.setData({
      codepop:true
    })
    console.log(this.data.codepop)
    API._posts('api/user/qr_code',{
      token: app.globalData.token ? app.globalData.token : token
  }).then(res => {
    this.setData({
      qrcode:res.qrcode
    })
  }).catch(res => {
  
  });
  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  needvote(){
    API._posts('api/api/need_vote_number',{
      
  }).then(res => {
    
    this.setData({
      needvote:res.value
    })
  }).catch(res => {
  
  });
  },
  myVote(){
    if(this.data.player.total_vote<this.data.needvote){
      // this.setData({
      //   show:true
      // })
      wx.showToast({
        title: '票数未到达所需要求',
        icon:'none'
      })
    }else{
      // wx.navigateTo({
      //   url: '/pages/chongzhi/chongzhi',
      // })
       this.setData({
        show:true
      })
    }
  },
  SaveImg: function (file) {
    var _this = this
    wx.downloadFile({
        url: _this.data.qrcode,
        success (res) {
            wx.saveImageToPhotosAlbum({  // 下载成功后再保存到本地
                filePath: res.tempFilePath,  //返回的临时文件路径，下载后的文件会存储到一个临时文件
                success () {
                    wx.showToast({
                        title: '图片保存成功',
                        icon: 'none',
                        duration: 2000
                    })
                }
            })
        }
    })
    wx.previewImage({
      urls: [this.data.qrcode],
    })
},
  codepop(){
    this.setData({
      codepop:false
     })
  },
  playerVote(){
    API._posts('api/api/vote',{
      visit_id:app.globalData.user_id,
      user_id:this.data.player.user_id
  }).then(res => {
    if(res.code==500){
      wx.showToast({
        title: '无剩余票数',
        icon:'none'
      })
      setTimeout(()=>{
        wx.navigateTo({
          url: '/pages/present/present'+`?user_id=${this.data.user_id}`+`&rank_number=${this.data.rank_number}`
        })
      },1200)
     
   
    }
    else{
      wx.navigateTo({
        url: '/pages/voteSuccess/voteSuccess'+`?user_id=${this.data.user_id}`+`&rank_number=${this.data.rank_number}`
      })
    }
    
  }).catch(res => {
  
  });
  },
  getData(){
    return new Promise((resolve,reject)=>{
      API._posts('api/api/vote_message',{
        // token: app.globalData.token ? app.globalData.token : token
        user_id:this.data.user_id,
        rank_number:this.data.rank_number
        // text:this.data.search
    }).then(res => {
      resolve(res)
      this.setData({
        player:res.data[0]
      })
      console.log(this.data.player)
    }).catch(res => {
    
    });
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
  onShow: function (option) {
    console.log(option)
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
   
  }
})