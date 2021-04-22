// pages/applyAchor/applyAchor.js
const url = require('../../utils/util.js');
const token = wx.getStorageSync('token');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1,  //1表示显示    0表示不显示
      title: '创建直播',   // 名片
      type: '1',
      showlist: '2',
      coversrc:'',
      show: false,
    },
    qrcode:'',
    qrcode_url:'',
    shimin:false,
    title:'',
    account:'',
    liveName:'',
    date:'',
    // minDate: new Date().getTime(),
    // maxDate: new Date(2019, 10, 1).getTime(),
    currentDate: new Date().getTime(),
    minDate:new Date().getTime(),
    maxDate:new Date(2021,3,8).getTime(),
    currentDate2: new Date().getTime(),
    startshow:false,
    toast:false,
    sharesrc:'',
    guanfangsrc:'',
    endDate:new Date().getTime()+1800000,
    endShow:'false',
    room:{},
    curl:'http://www.myfutrue.com',
    userstartTime:'',
    userendTime:'',
    changeTime:'',
    changeTimes:'',
    anchor:{},
    btnClick:true,
    qrcodeImage:'https://res.wx.qq.com/op_res/9rSix1dhHfK4rR049JL0PHJ7TpOvkuZ3mE0z7Ou_Etvjf-w1J_jVX0rZqeStLfwh'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
    this.getPerson()
    console.log(options.name)
  },
  getPerson(){
    url._posts('api/user/index',{
        token: app.globalData.token ? app.globalData.token : token
    }).then(res => {
        this.setData({anchor:res.anchor});
    }).catch(res => {
        //wx.showToast({ title:"网络访问错误", icon: 'none' })
    })
},
  getData(options){
    url._posts('api/broadcast/get_user_apply_data',{
      token: app.globalData.token ? app.globalData.token : token
  }).then(res => {
    if(res.status==200){
     console.log(res)
     if(res.room!=''){
       this.setData({
         sharesrc:this.data.curl+res.room.shareImg,
         guanfangsrc:this.data.curl+res.room.coverImg,
         title:res.room.name,
         account:res.room.anchorWechat,
         liveName:res.room.anchorName,
         room:res.room
       })
    }
     this.setData({
      //  userstartTime:res.room.startTime,
      //  userendTime:res.room.endTime
     })
    //  var start=new Date(this.data.room.startTime)
    //  console.log(this.formatDate(start))
    //  var end=new Date(this.data.room.endTime)
    //  this.setData({
    //   userstartTime:this.formatDate(start),
    //    userendTime:this.formatDate2(end)
    //  })
    
    }
  }).catch(res => {
      //wx.showToast({ title:"网络访问错误", icon: 'none' })
  })
  },
  // formatter(type, val) {
  //   if (type === 'month') {
  //     return `${val}月`;
  //   } else if (type === 'day') {
  //     return `${val}日`;
  //   }
  //   return val;
  // },
  onConfirm(event){
    // console.log(typeof this.data.currentDate)
    //  let s=event.detail
    // console.log(s)
    // let d=new Date(s)
    //   this.setData({
    //     startshow:false,
    //     userstartTime:this.formatDate(d),
    //     currentDate:this.formatDate(d)
    //   })
    // //  this.data.currentDate=Number(this.data.currentDate)
    //  console.log(this.data.currentDate)
    this.setData({
      startshow:false
    })
  },
  onCancel(){

    this.setData({
      startshow:false,
      endShow:false
    })
   },
   
  onConfirm2(event){
    // let s=event.detail
    // var d=new Date(s)
    //   this.setData({
    //     endshow:false,
    //     userendTime:this.formatDate(d),
    //     endDate:this.formatDate(d)
    //   })
    //   console.log(this.data.endDate)
    this.setData({
      endshow:false
    })
},
onConfirmold(event){
  //   this.setData({
  //     endshow:false,
  //     userendTime:this.formatDate(d),
  //     endDate:this.formatDate(d)
  //   })
  //   console.log(this.data.endDate)
  this.setData({
    startshow:false,
    userstartTime:this.formatDate(this.data.changeTime),
    currentDate:this.formatDate(this.data.changeTime)
  })
  console.log(this.data.currentDate)
},
onConfirmold2(event){
  //   this.setData({
  //     endshow:false,
  //     userendTime:this.formatDate(d),
  //     endDate:this.formatDate(d)
  //   })
  //   console.log(this.data.endDate)
  this.setData({
    endshow:false,
    userendTime:this.formatDate2(this.data.changeTimes),
    endDate:this.formatDate2(this.data.changeTimes)
  })
  console.log(this.data.endDate)
},
endShows(){
    this.setData({
      endshow:true
    })
  },
  startShow(){
    console.log('草拟吗的')
    this.setData({
      startshow:true
    })
  },
  onCloseDate(){
    this.setData({
      startshow:false
    })
  },
  onCloseDate2(){
    this.setData({
      endshow:false
    })
  },
  onPickerChange(e) {
    console.log("onPickerChange", e)
},
  bindTitle(e){
    // e.detail.value=this.data.title
    this.setData({
      title:e.detail.value
    });
  },
  bindTitles(e){
      this.setData({
        title:e.detail.value
      });
  },
  bindAccount(e){
    // e.detail.value=this.data.account
    this.setData({
      account:e.detail.value
    });
  },
  bindAccounts(e){
    this.setData({
      account:e.detail.value
    });
  },
  bindName(e){
    console.log(this.data.title)
    // e.detail.value=this.data.liveName
    this.setData({
      liveName:e.detail.value
    });
  },
  bindNames(e){
    this.setData({
      liveName:e.detail.value
    });
  },
  onInput(event) {
    let s=event.detail
    var d=new Date(s)
    this.setData({
      currentDate: this.formatDate(d),
    });
    console.log('我触发了')
  },
  onInputold(event) {
    let s=event.detail
    var d=new Date(s)
    this.data.changeTime=d
    console.log(d)
    console.log('我触发了')
    this.setData({
      userstartTime:this.formatDate(d)
    });
   
  },
  onInputold2(event) {
    let s=event.detail
    var d=new Date(s)
    this.data.changeTimes=d
    console.log('我触发了')
    this.setData({
      userendTime:this.formatDate2(d)
    });
   console.log(this.data.endDate)
  },
  onInput2(event) {
    let s=event.detail
    var d=new Date(s)
    this.setData({
      endDate: this.formatDate2(d),
    });
    console.log('w ye chufal')
  },
  // onInputold2(event) {
  //   let s=event.detail
  //   var d=new Date(s)
  //   this.setData({
  //     userendTime: this.formatDate(d),
  //   });
   
  // },
  formatDate2(now){
    var year=now.getFullYear();  //取得4位数的年份
    var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
    if(month<10){
      month='0'+(now.getMonth()+1)
    }
    var date=now.getDate();      //返回日期月份中的天数（1到31）
    if(date<10){
      date='0'+(now.getDate())
     }
    var hour=now.getHours();     //返回日期中的小时数（0到23）
    if(hour<10){
      hour='0'+(now.getHours())
     }
    var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
    if(minute<10){
      minute='0'+(now.getMinutes())
     }
    var second=now.getSeconds(); //返回日期中的秒数（0到59）
    this.data.endDate=year+"-"+month+"-"+date+" "+hour+":"+minute
    return year+"-"+month+"-"+date+" "+hour+":"+minute; 
  },
  formatDate(now){
    var year=now.getFullYear();  //取得4位数的年份
    var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
    if(month<10){
      month='0'+(now.getMonth()+1)
    }
    var date=now.getDate();      //返回日期月份中的天数（1到31）
    if(date<10){
      date='0'+(now.getDate())
     }
    var hour=now.getHours();     //返回日期中的小时数（0到23）
    if(hour<10){
      hour='0'+(now.getHours())
     }
    var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
    if(minute<10){
      minute='0'+(now.getMinutes())
     }
    var second=now.getSeconds(); //返回日期中的秒数（0到59）
    this.data.currentDate=year+"-"+month+"-"+date+" "+hour+":"+minute
    // console.log(this.data.currentDate)
    return year+"-"+month+"-"+date+" "+hour+":"+minute; 
    

  },
  next(){
    // wx.navigateTo({
    //   url: '/pages/liveSetting/liveSetting',
    // })
    console.log(this.data.title)
    url._posts('api/broadcast/add_room',{
        token: app.globalData.token ? app.globalData.token : token,
        name:this.data.title,
        coverImg:this.data.guanfangsrc,
        startTime:this.data.currentDate,
        endTime:this.data.endDate,
        anchorName:this.data.liveName,
        anchorWechat:this.data.account,
        shareImg:this.data.sharesrc,
        type:0,
        closeLike:0,
        closeGoods:0,
        closeComment:0,

  }).then(res => {
       if(res.status==200){
        this.setData({
          btnClick:false
        })
        setTimeout(()=>{
          this.setData({
            btnClick:true
          })
        },4000)
          wx.showToast({
            title: '创建成功',
            icon:'none'
          })
          this.setData({
            qrcode_url:res.qrcode
          })
        setTimeout(()=>{
          wx.navigateTo({
            url: '/pages/live/live',
          })
        },2000)
      
      }if(res.status==500){
        if(res.message=='请扫描二维码实名认证'){
          this.setData({
            shimin:true
          })
         }
        wx.showToast({
          title: res.message,
          icon:"none"
        })
        if(new Date(this.data.endDate).getTime()<new Date().getTime()+2400000){
          wx.showToast({ title:'结束时间不能小于开始的时间的30分钟', icon: 'none'})
        }
        if(new Date(this.data.currentDate).getTime()<new Date().getTime()+600000){
          wx.showToast({ title:'开始时间不能小于当前的时间的30分钟', icon: 'none'})
          console.log(new Date(this.data.currentDate))
        }
        // this.setData({
        //   qrcode_url:res.qrcode
        // })
      }
  }).catch(res => {
      wx.showToast({ title:"访问失败", icon: 'none' })
  })
},
  showPopup() {
  
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  shareClick(e){
    var that=this
    const {type}=e.currentTarget.dataset
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          sharesrc:res.tempFilePaths
        })
        console.log(that.data.sharesrc)
        for (var x = 0; x < res.tempFilePaths.length; x++) {
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[x], //选择图片返回的相对路径
            encoding: "base64",//这个是很重要的
            success: res => { //成功的回调
             //返回base64格式
             that.data.sharesrc='data:image/png;base64,' + res.data
            //  console.log(that.data.sharesrc)
            }
          })
        }
      }
    })
  },
  guanClick(){
    var that=this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          guanfangsrc:res.tempFilePaths
        })
        // console.log(that.data.sharesrc)
        for (var x = 0; x < res.tempFilePaths.length; x++) {
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[x], //选择图片返回的相对路径
            encoding: "base64",//这个是很重要的
            success: res => { //成功的回调
             //返回base64格式
             that.data.guanfangsrc='data:image/png;base64,' + res.data
            }
          })
        }
      }
    })
  },
  codeClick(){
    wx.previewImage({
      urls: [this.data.qrcodeImage],
    })
  },
  coverClick(){
    var that=this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          coversrc:res.tempFilePaths
        })
        console.log(that.data.sharesrc)
        for (var x = 0; x < res.tempFilePaths.length; x++) {
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[x], //选择图片返回的相对路径
            encoding: "base64",//这个是很重要的
            success: res => { //成功的回调
             //返回base64格式
             that.data.coversrc='data:image/png;base64,' + res.data
             console.log(that.data.sharesrc)
            }
          })
        }
      }
    })
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