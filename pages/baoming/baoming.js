// pages/baoming/baoming.js
const token = wx.getStorageSync('token');
const app = getApp()
const API = require('../../utils/util.js');
let shen_id,shi_id,qv_id
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1,  //1表示显示    0表示不显示
      title: '报名',   // 名片
      type: '1',
      showlist: '3'
    },
    tabBars:{},
    checked:true,
    sex:'男',
    name:'',
    phone:'',
    region: ['广东省', '广州市', '海珠区'],
    address:'',
    IdCard:'',
    email:'',
    goodAt:'',
    codepop:false,
    height:'',
    age:'',
    shen_id:'',
    shi_id:'',
    dis_id:'',
    weight:'',
    experience:'',
    customItem: '全部',
    zhengId:'',
    fanId:'',
    qrcode:'',
    zheng:[
      {image:''},{image:''}
    ],
    personal:[
      {image:''}
    ],
    spassport:[
      {image:''},{image:''}
    ],
    shenghuo:[
      {image:''},{image:''},{image:''}
    ],
    juzhao:[
      {image:''},{image:''},{image:''}
    ],
    show:false,
    radio:'1',
    cityshow:false,
    disshow:false,
    strshow:false,
    cityIndex:[0],
		areaIndex:[0],
    strIndex:[0],
    street1:[],
    district:[],
    city:[],
    proIndex:[0],
    province:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbars();
    API._posts('api/api/experience', {
      token: app.globalData.token
    }).then(res => {
      for (var i in res.data){
        res.data[i]["text"] = res.data[i]["name"];
      }
      this.setData({
        province: res.data
      })
      console.log(this.data.province)
    }).catch(res => {
            wx.showToast({ title:"网络访问错误", icon: 'none' })
        })
  },
  openmap(){
    this.setData({
      show:true
    })
  },
  mybindmsg(e){
    console.log(e)
    this.setData({
      mymessage:e.detail.value
    })
  },
  mybindphone(e){
    console.log(e);
    this.setData({
      myphone:e.detail.value
    })
  },
  proChange(e){
		let index=e.detail.value
		this.setData({
			proIndex:index
		})
  },
  proCancel(){
		this.setData({ show: false });
  },
  proConfirm(event) {
		let name=this.data.province[this.data.proIndex[0]].name
		let id=this.data.province[this.data.proIndex[0]].id
		this.setData({ show: false, provincer: name, citys:null,districts:null,street:null,place1:id,place2:null,place3:null,place4:null,cityshow: true});
		API._posts('api/api/citys', {
			id: id
		}).then(res => {
			for (var i in res.data) {
				res.data[i]["text"] = res.data[i]["name"];
			}
			this.setData({
				city: res.data
			})
		}).catch(res => {
            wx.showToast({ title:"网络访问错误", icon: 'none' })
        })
	},
  proClose(){
		this.setData({ show: false });
	},
  disConfirm(event) {
		let name=this.data.district[this.data.areaIndex[0]].name
    let id=this.data.district[this.data.areaIndex[0]].id
     shen_id=this.data.province[this.data.proIndex[0]].id
     shi_id=this.data.city[this.data.cityIndex[0]].id
     qv_id=this.data.district[this.data.areaIndex[0]].id

    let shen_name=this.data.province[this.data.proIndex[0]].name
    let shi_name=this.data.city[this.data.cityIndex[0]].name
    let qv_name=this.data.district[this.data.areaIndex[0]].name

    let addres=shen_name+shi_name+qv_name
    this.setData({ 
      disshow: false,
       districts: name ,
       place3:id,
       street:null,
       place4:null,
       myaddres:addres
      });
		
  },
  disCancel() {
		this.setData({ disshow: false });
	},
  strCancel() {
		this.setData({ strshow: false });
	},
  strConfirm(event) {
		let name=this.data.street1[this.data.strIndex[0]].name
		let id=this.data.street1[this.data.strIndex[0]].id
		this.setData({ strshow: false,street: name ,place4:id});
	},
  strClose() {
		this.setData({ strshow: false });
  },
  disClose(){
    this.setData({
      disshow:false
    })
  },
  cityClose(){
    this.setData({
      cityshow:false
    })
  },
  cityChange(e){
		let index=e.detail.value
		this.setData({
			cityIndex:index
		})
  },
  strChange(e){
		let index=e.detail.value
		this.setData({
			strIndex:index
		})
	},
  areaChange(e){
		let index=e.detail.value
		this.setData({
			areaIndex:index
		})
  },
  cityCancel() {
		this.setData({ cityshow: false });
  },
  cityConfirm(event) {
		let name=this.data.city[this.data.cityIndex[0]].name
		let id=this.data.city[this.data.cityIndex[0]].id
		this.setData({ cityshow: false, citys: name, districts:null,street:null,place2:id,place3:null,place4:null,disshow: true });
		API._posts('api/api/xian', {
			id: id
		}).then(res => {
			for (var i in res.data) {
				res.data[i]["text"] = res.data[i]["name"];
			}
			this.setData({
				district: res.data
			})
		}).catch(res => {
            wx.showToast({ title:"网络访问错误", icon: 'none' })
        })
	},
  codepop(){
    this.setData({
      codepop:false
    })
  },
  bindName(e){
    this.setData({
      name:e.detail.value
    })
  },
  bindAge(e){
    this.setData({
      age:e.detail.value
    })
  },
  bindPhone(e){
    this.setData({
      phone:e.detail.value
    })
  },
  bindAddress(e){
    this.setData({
      address:e.detail.value
    })
  },
  bindCard(e){
    this.setData({
      IdCard:e.detail.value
    })
  },
  bindEmail(e){
    this.setData({
      email:e.detail.value
    })
  },
  bindGood(e){
    this.setData({
      goodAt:e.detail.value
    })
  },
  bindHeight(e){
    this.setData({
      height:e.detail.value
    })
  },
  bindWeight(e){
    this.setData({
      weight:e.detail.value
    })
  },
  bindPersonal(e){
    this.setData({
      experience:e.detail.value
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
  submit(){
    console.log(this.data.checked)
    if(this.data.shenghuo[0].image==''){
      wx.showToast({
        title: '生活照不能为空',
        icon:'none'
      })
    }
    else if(this.data.juzhao[0].image==''){
      wx.showToast({
        title: '剧照不能为空',
        icon:'none'
      })
    }
    else  if(this.data.checked==false){
      wx.showToast({
        title: '请勾选协议',
        icon:'none'
      })
    }
    else{
      console.log(app.globalData.user_id)
      API._posts('api/api/add_user_info',{
        // token: app.globalData.token ? app.globalData.token : token
        id:app.globalData.user_id,
        user_name:this.data.name,
        sex:this.data.sex,
        phone:this.data.phone,
        age:this.data.age,
        provinces:shen_id,
        citys:shi_id,
        districts:qv_id,
        address:this.data.address,
        id_car:this.data.IdCard,
        caiyi:this.data.goodAt,
        weight:this.data.weight,
        height:this.data.height,
        head_pic:JSON.stringify(this.data.personal[0].image).slice(1,JSON.stringify(this.data.personal[0].image).length-1),
        zheng_car:JSON.stringify(this.data.zheng[0].image).slice(1,JSON.stringify(this.data.zheng[0].image).length-1),
        fan_car:JSON.stringify(this.data.zheng[1].image).slice(1,JSON.stringify(this.data.zheng[1].image).length-1),
        life_photo:this.data.shenghuo,
        crew_photo:this.data.juzhao,
        experience:this.data.experience,
        email:this.data.email
    }).then(res => {
      if(res.code==200){
        console.log(res)
        console.log('报名成功')
        wx.showToast({
          title: '报名成功',
          icon:'none'
        })
        // wx.switchTab({
        //   url: '/pages/toupiao/toupiao',
        // })
      this.setData({
      codepop:true,
      name:'',
      age:'',
      phone:'',
      address:'',
      IdCard:'',
      goodAt:'',
      email:'',
      height:'',
      weight:'',
      display_type:'',
      experience:'',
      zheng:[
        {image:''},{image:''}
      ],
      personal:[
        {image:''}
      ],
      spassport:[
        {image:''},{image:''}
      ],
      shenghuo:[
        {image:''},{image:''},{image:''}
      ],
      juzhao:[
        {image:''},{image:''},{image:''}
      ]
    })
    this.getqrcode();
        // console.log(this.data.province_list)
      }else{
        
        wx.showToast({
          title: res.message,
          icon:'none'
        })
    
      }
    }).catch(res => {
   
    });
    }
   
  // wx.switchTab({
  //   url: '/pages/index/index',
  // })
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
cbClick(){
  this.setData({
    checked:!this.data.checked
  })
},
aa(){
  wx.navigateTo({
    url: '/pages/baomingxieyi/baomingxieyi',
  })
},
bb(){
  wx.navigateTo({
    url: '/pages/userxieyi/userxieyi',
  })
},
  zhengClick(e){
    var that=this
    const {index}=e.currentTarget.dataset
    var indexImage = "zheng[" + index + "].image"
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          [indexImage]:tempFilePaths
        })
        // console.log(that.data.passport[0].image)
        for (var x = 0; x < res.tempFilePaths.length; x++) {
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[x], //选择图片返回的相对路径
            encoding: "base64",//这个是很重要的
            success: res => { //成功的回调
             //返回base64格式
             that.data.zheng[index].image='data:image/png;base64,' + res.data
            }
          })
          console.log(that.data.zheng)
        }
        // console
        // var zheng=JSON.stringify(that.data.zheng[index].image)
          // console.log(zheng)
          // zheng=zheng.slice(1,zheng.length-1)
          // that.setData({
          //   zhengId:zheng
          // })
          // console.log(that.data.zhengId)
        
      }
    })
  },
  personalClick(e){
    var that=this
    const {index}=e.currentTarget.dataset
    var indexImage = "personal[" + index + "].image"
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          [indexImage]:tempFilePaths
        })
        // console.log(that.data.passport[0].image)
        for (var x = 0; x < res.tempFilePaths.length; x++) {
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[x], //选择图片返回的相对路径
            encoding: "base64",//这个是很重要的
            success: res => { //成功的回调
             //返回base64格式
             that.data.personal[index].image='data:image/png;base64,' + res.data
            }
          })
          console.log(JSON.stringify(that.data.personal[0].image))
          // that.data.personal=JSON.stringify(that.data.personal)
          // that
        }
        
      }
    })
  },
  szhengjianClick(e){
    var that=this
    const {index}=e.currentTarget.dataset
    var indexImage = "spassport[" + index + "].image"
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          [indexImage]:tempFilePaths
        })
        // console.log(that.data.passport[0].image)
        for (var x = 0; x < res.tempFilePaths.length; x++) {
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[x], //选择图片返回的相对路径
            encoding: "base64",//这个是很重要的
            success: res => { //成功的回调
             //返回base64格式
             that.data.spassport[index].image='data:image/png;base64,' + res.data
            }
          })
        }
        
      }
    })
  },
  shenghuoClick(e){
    var that=this
    const {index}=e.currentTarget.dataset
    var indexImage = "shenghuo[" + index + "].image"
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          [indexImage]:tempFilePaths
        })
        // console.log(that.data.passport[0].image)
        for (var x = 0; x < res.tempFilePaths.length; x++) {
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[x], //选择图片返回的相对路径
            encoding: "base64",//这个是很重要的
            success: res => { //成功的回调
             //返回base64格式
             that.data.shenghuo[index].image='data:image/png;base64,' + res.data
            }
          })
        }
        
        
      }
    })
  },
  juzhaoClick(e){
    var that=this
    const {index}=e.currentTarget.dataset
    var indexImage = "juzhao[" + index + "].image"
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          [indexImage]:tempFilePaths
        })
        // console.log(that.data.passport[0].image)
        for (var x = 0; x < res.tempFilePaths.length; x++) {
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[x], //选择图片返回的相对路径
            encoding: "base64",//这个是很重要的
            success: res => { //成功的回调
             //返回base64格式
             that.data.juzhao[index].image='data:image/png;base64,' + res.data
            }
          })
        }
        
      }
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  onChange({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checked: detail });
    if(this.data.checked==false){
      this.setData({
        sex:'女'
      })
    }else{
      this.setData({
        sex:'男'
      })
    }
    console.log(this.data.sex)
  },
  display(){
    API._posts('api/api/display_type',{
      // token: app.globalData.token ? app.globalData.token : token
     
      // text:this.data.search
  }).then(res => {
    this.setData({
      display_type:res.value
    })
  }).catch(res => {
  
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
    console.log('sadsds')
    if(typeof this.getTabBar==='function'&&this.getTabBar()
    ){
        this.getTabBar().setData({
            selected:4
        })
    }
  this.display();

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