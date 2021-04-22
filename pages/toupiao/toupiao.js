// pages/toupiao/toupiao.js
const token = wx.getStorageSync('token');
const app = getApp()
const API = require('../../utils/util.js');
const back = wx.getBackgroundAudioManager();
import Toast from '../../vant/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1,  //1表示显示    0表示不显示
      title: '投票',   // 名片
      type: '1',
      showlist: '3'
    },
    tabBars:{},
    poster:'/images/poster.png',
    vedio:'',
    province_list:[

    ],
    city_list:[],
    currentProIndex:0,
    currentCityIndex:1,
    achor:[],
    active:true,
    scroll:false,
    level:'',
    scrollHeight:'',
    search:'',
    isPlayer:false,
    total:{},
    voice:'',
    pageNum:0,
    totalpage:'',
    bgcImage:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbars();
    this.backmusic();
  },
  yyClick(e){
    const {index}=e.currentTarget.dataset
    // console.log(this.data.achor[index].user_id)
    // console.log(this.data.achor[index].rank_number)
    wx.navigateTo({
      // url: '/pages/playerDetail/playerDetail?user_id='+this.data.achor[index].user_id+'&rank_number='+this.data.achor[index].rank_number
      url: '/pages/playerDetail/playerDetail'+`?user_id=${this.data.achor[index].user_id}`+`&rank_number=${this.data.achor[index].rank_number}`
    })
  },
  votes(e){
    const {index}=e.currentTarget.dataset
    API._posts('api/api/vote',{
      // token: app.globalData.token ? app.globalData.token : token
      visit_id:app.globalData.user_id,
      user_id:this.data.achor[index].user_id
  }).then(res => {
    if(res.message=='无剩余票数'){
      wx.showToast({
        title: res.message,
        icon:'none'
      })
    }else{
      console.log(res)
      wx.showToast({
        title: res.message,
        icon:'none'
      })
      console.log(this.data.pageNum)
      API._posts('api/api/seach',{
        // token: app.globalData.token ? app.globalData.token : token
        number:this.data.pageNum
        // text:this.data.search
    }).then(res => {
      this.setData({
        achor:res.data
      })
    }).catch(res => {
    
    });
    }

  }).catch(res => {
 
  });

  },
  getData(){
    return new Promise((ok,reject)=>{
      API._posts('api/api/provinces',{
        // token: app.globalData.token ? app.globalData.token : token
    }).then(res => {
      if(res.code==200){
        this.setData({
          province_list:res.data,
          level:res.data[0].level
        })
        // console.log(this.data.province_list)
      }
    }).catch(res => {
   
    });
    // 排名接口
        API._posts('api/api/seach',{
          // token: app.globalData.token ? app.globalData.token : token
          id:'a'
      }).then(res => {
        ok(res)
          this.setData({
            achor:res.data,
            voice:res.voice,
            video:res.video,
            totalpage:res.page
          })
          console.log(this.data.totalpage)
          }).catch(res => {
     
        });  
    })
   
  },
  search(){
    API._posts('api/api/seach',{
      // token: app.globalData.token ? app.globalData.token : token
      // id:'a',
      text:this.data.search
  }).then(res => {
    this.setData({
      achor:res.data
    })
  }).catch(res => {
 
  });
  },
  provinceClick(e){
      const {index}=e.currentTarget.dataset
    this.setData({
      currentProIndex:index
    })
    API._posts('api/api/seach_city',{
      // token: app.globalData.token ? app.globalData.token : token
      id:this.data.province_list[index].id

  }).then(res => {
    if(res.code==200){
      this.setData({
        city_list:res.list,
        level:res.list[2].level,
        currentCityIndex:1,
        pageNum:0
       })
       if(this.data.province_list[index].level==0){
         this.setData({
           level:this.data.city_list[0].level
         })
       }
    }
    
      }).catch(res => {
 
    });
    // 排名接口
    API._posts('api/api/seach',{
      // token: app.globalData.token ? app.globalData.token : token
      id:this.data.province_list[index].id
  }).then(res => {
      this.setData({
        achor:res.data
      })
      if(this.data.achor==''){
        wx.showToast({
          title: '暂无选手信息',
          icon:'none'
        })
      }
      }).catch(res => {
 
    });    
  },
  cityClick(e){
    console.log(this.data.pageNum)
    const {index}=e.currentTarget.dataset
    this.setData({
      currentCityIndex:index
    })
    console.log(this.data.city_list[index].id)
    if(this.data.city_list[index].level==0){
      this.setData({
        currentProIndex:0,
        city_list:this.data.province_list,
        level:this.data.city_list[0].level
      })
      API._posts('api/api/seach',{
        // token: app.globalData.token ? app.globalData.token : token
        id:this.data.city_list[index].id
    }).then(res => {
        this.setData({
          achor:res.data,
          pageNum:0
        })
        console.log(this.data.achor)
        }).catch(res => {
   
      });    
    }
    else if(this.data.city_list[index].level==1){
      API._posts('api/api/seach',{
        // token: app.globalData.token ? app.globalData.token : token
        id:this.data.city_list[index].id
    }).then(res => {
        this.setData({
          achor:res.data
        })
        console.log(this.data.achor)
        }).catch(res => {
   
      });    
    }else{
      API._posts('api/api/citys_rank',{
        // token: app.globalData.token ? app.globalData.token : token
        id:this.data.city_list[index].id,
        level:this.data.city_list[index].level
  
    }).then(res => {
      this.setData({
        achor:res.data,
        pageNum:0
      })
      if(this.data.achor==''){
        this.setData({
          isPlayer:true
        })
      }else{
        this.setData({
          isPlayer:false
        })
      }
    }).catch(res => {
   
    });
    }
    
  },
  getVote(){
    API._posts('api/api/total',{
      // token: app.globalData.token ? app.globalData.token : token
  }).then(res => {
      this.setData({
        total:res,
        bgcImage:res.banner
      })
  }).catch(res => {
 
  });
  },
  onPageScroll: function(e) {
    // 监听用户滑动页面事件。
    this.data.scrollHeight=e.scrollTop
    console.log(e.scrollTop)
  },
  weixinpay(){
    wx.requestPayment(
      {
      'timeStamp': '',
      'nonceStr': '',
      'package': '',
      'signType': 'MD5',
      'paySign': '',
      'success':function(res){},
      'fail':function(res){},
      'complete':function(res){}
      })
  },
  bindGetPhone(e){
    console.log(e.detail)
    var iv=e.detail.iv
    wx.login({
      success:res=>{
        var code=res.code
        console.log(iv)
      }
    })
  },
  bindSearch(e){
    this.setData({
      search:e.detail.value
    })
  },
  scrollfalse(){
      var me = this;
      var query = wx.createSelectorQuery().in(me);
      query.selectViewport().scrollOffset()
      query.select(".level_search").boundingClientRect();
      query.exec(function (res) {
        console.log(res);
        var miss = res[0].scrollTop + res[1].top - 10;
        console.log(miss)
        wx.pageScrollTo({
          scrollTop: 694,
          duration: 300,
        });
        
      })
      this.setData({
        scroll:true
      })
   
  },
  scrolltrue(){
    if(this.data.scrollHeight!=0){
      wx.pageScrollTo({
        scrollTop:0,
        duration: 300,
      });
  }
},
  backmusic: function () {
    var that=this
    console.log(this)
    this.getData().then(res=>{
      console.log(res)
      this.setData({
        voice:res.voice
      })
      console.log(this.data.voice)
      player();
      function player() {
        // console.log(this.data.voice)
      back.title = "海贼王";   // 必须要有一个title
      // this指向问题，此时this是指向getData这个方法的then回调的res
      back.src = that.data.voice;  
       // 千与千寻 "http://*************.mp3"
      back.onEnded(() => {
      player();  // 音乐循环播放
      })
     }
    })
     
  },
  moreClick(){
    // console.log(this.data.pageNum)
    console.log(this.data.pageNum)
    if(this.data.pageNum>=this.data.totalpage-1){
      wx.showToast({
        title: '没有更多了',
        icon:'none'
      })
    }else{
      (this.data.pageNum)++
      console.log(this.data.pageNum)
      API._posts('api/api/seach',{
        // token: app.globalData.token ? app.globalData.token : token
        number:this.data.pageNum
    }).then(res => {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration:500
      });
        this.setData({
          achor:res.data
        })
        console.log(this.data.achor)
        }).catch(res => {
   
      });    
    }
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
    this.setData({
      pageNum:0
    })
    wx.getSetting({
      success: function(res){
          console.log(res)
        if (res.authSetting['scope.userInfo']) {
            // that.setData({
            //     isShouquan:2
            // })
          wx.getUserInfo({
            success:res=> {
              
            }
          })
        }else{
            wx.navigateTo({
              url: '/pages/personal/personal',
            })
            wx.showToast({
              title: '请授权登录',
              icon:'none'
            })
        }
      }
    })
    // wx.hideTabBar();
    if(typeof this.getTabBar==='function'&&this.getTabBar()
    ){
        this.getTabBar().setData({
            selected:4
        })
    }
    this.getData();
    this.getVote();
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
  onShareAppMessage: function () {

  }
})