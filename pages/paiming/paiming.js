// pages/toupiao/toupiao.js
const token = wx.getStorageSync('token');
const app = getApp()
const API = require('../../utils/util.js');
import Toast from '../../vant/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1,  //1表示显示    0表示不显示
      title: '排名',   // 名片
      type: '1',
      showlist: '3'
    },
    tabBars:{},
    bgcImage:'/images/china.jpg',
    poster:'/images/poster.png',
    vedio:'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
    province_list:[
      {
        name:'全部'
      },
      {
        name:'北京'
      },
      {
        name:'广东'
      },
      {
        name:'全部'
      },
      {
        name:'北京'
      },
      {
        name:'广东'
      },
      {
        name:'浙江'
      },
      {
        name:'全部'
      },
      {
        name:'乌鲁木齐'
      },
      {
        name:'全部'
      },
      {
        name:'乌鲁木齐'
      }
    ],
    currentProIndex:0,
    currentCityIndex:1,
    active:true,
    achor:'',
    province_list:[],
    city_list:[],
    level:'',
    achor:[],
    search:'',
    isPlayer:false,
    isShow:true,
    bgcImage:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbars();
  },
  bindSearch(e){
    this.setData({
      search:e.detail.value
    })
  },
  getVote(){
    API._posts('api/api/total',{
      // token: app.globalData.token ? app.globalData.token : token
  }).then(res => {
      this.setData({
        bgcImage:res.banner
      })
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
    // 
    API._posts('api/api/rank',{
      // token: app.globalData.token ? app.globalData.token : token
      // id:'a'
      level:0
  }).then(res => {
      this.setData({
        achor:res.data
      })
      console.log(this.data.achor)
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
        currentCityIndex:1
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
    API._posts('api/api/rank',{
      // token: app.globalData.token ? app.globalData.token : token
      provinces:this.data.province_list[index].id
  }).then(res => {
      this.setData({
        achor:res.data
      })
      if(this.data.achor==''){
        wx.showToast({
          title: '暂无选手信息',
        })
      }
      }).catch(res => {
 
    });    
  },
  cityClick(e){
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
    }
    else if(this.data.city_list[index].level==1){
      API._posts('api/api/rank',{
        // token: app.globalData.token ? app.globalData.token : token
        provinces:this.data.city_list[index].id
    }).then(res => {
        this.setData({
          achor:res.data
        })
        }).catch(res => {
   
      });    
    }else{
      API._posts('api/api/rank',{
        // token: app.globalData.token ? app.globalData.token : token
        citys:this.data.city_list[index].id,
        level:this.data.city_list[index].level
  
    }).then(res => {
      this.setData({
        achor:res.data
      })
      console.log(Object.keys(this.data.achor).length)
      if(this.data.achor==''){
        this.setData({
          isPlayer:true,
          isShow:false
        })
      }else{
        this.setData({
          isPlayer:false,
          isShow:true
        })
      }
    }).catch(res => {
   
    });
    }
    
  },
  getPhoneNumber(e){
    console.log(e.detail.value)
  },
  moreClick(){
    // wx.showLoading({
    //   title: '加载中',
    //   icon:'none'
    // })
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration:500
    });
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