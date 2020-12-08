// pages/deputy/deputy.js
const url = require('../../utils/util.js');
const token = wx.getStorageSync('token');
const app = getApp();
import Toast from '../../vant/toast/toast';
import Dialog from '../../vant/dialog/dialog';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		deputy:[],
		name:'', //姓名
		sex:'',
		birthday:'',
		nation:'',
		show: false,
		school:'',
		province:["男","女","保密"],
		currentDate: new Date().getTime(),
		minDate: new Date('Thu Jan 01 1949 00:00:00 GMT+0800 (中国标准时间)').getTime(),
		formatter(type, value) {
			if (type === 'year') {
				return `${value}年`;
			} else if (type === 'month') {
				return `${value}月`;
			}
			return value;
		},
		showa:false,
		education:'',
		company:'',
		companyer:'',
		address:'',
		phone:'',
		work_desc: '',
		company_desc:'',
		study_desc:'',
		work_desc:'',
		alipay_account:'',
		type: 1, //1香养师 2学院
		alipay_name:'',
		bankcard_name:'',
		bank:'',
		bankname:'',
		bankcard:'',
		idcard_img1:'', //身份证正面
    	idcard_img2:'', //身份证反面
    	company_img:'', //营业执照
    	other_companyimg:'', //其他资质图片
    	school_img:'',//毕业证图片
    	study_img:'',//学习证明图片
    	protocol:'',
    	nvabarData: {
          showCapsule: 1,  //1表示显示    0表示不显示
          title: '申请',   // 名片
          type: '1'
        },
        height: app.globalData.height * 2,
        status:3, //0已提交 1通过 2拒绝 3没有
        desc:''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({type: Number(options.type)})
		if(options.type == 1){
			this.setData({protocol:'香养师注册协议'})
		}else{
			this.setData({protocol:'香养机构注册协议'})
		}
	},
	onShow: function(){
		this.getData();
	},

	getData(){
		url._post('api/user/user_invite',{
	        token: app.globalData.token ? app.globalData.token : token
	    }).then(res => {
	    	if(res.info){
	    		this.setData(res.info)
	    	}
	    	if(res.info.status == 0){
				Dialog.alert({
		            title: '提示',
		            message: '已提交，等待审核！',
		        }).then(() => {
		            wx.switchTab({
		                url:'/pages/personal/personal'
		            })
		        })
			}
	        console.log(this.data)
	    }).catch(res => {})
	},

	//性别
	proConfirm(r) {
		var { value } = r.detail;
		this.setData({ sex: value , show: false })
	},
	getsex(){
		this.setData({ show: !this.data.show });
	},
	// 出生
	onInput(event) {
		this.setData({
			currentDate: event.detail
		});
	},
	bornrs(){
		this.setData({ showa: !this.data.showa });
	},
	proConfirm1(r){
		var date = new Date(r.detail);
		var year= date.getFullYear();
        var mon = date.getMonth()+1;
        var day = date.getDate();
        this.setData({
        	birthday: year + '-' +  mon + '-' + day,
        	showa: false 
        })
	},
	//输入框处理
	nations(r){
		var value = r.detail;
		var type = r.target.dataset.type;
		if(type == 1){
			this.setData({ name: value });
		}else if(type == 2){
			this.setData({ nation: value });
		}else if(type == 3){
			this.setData({ school: value });
		}else if(type == 4){
			this.setData({ education: value })
		}else if(type == 5){
			this.setData({ study_desc: value.value })
		}else if(type == 6){
			this.setData({ work_desc: value.value })
		}else if(type == 7){
			this.setData({ alipay_account: value })
		}else if(type == 8){
			this.setData({ bank: value })
		}else if(type == 9){
			this.setData({ bankname: value })
		}else if(type == 10){
			this.setData({ bankcard: value })
		}else if(type == 11){
			this.setData({ bankcard_name: value })
		}else if(type == 12){
			this.setData({ alipay_name: value })
		}else if(type == 13){
			this.setData({ sex: value })
		}else if(type == 14){
			this.setData({ birthday: value })
		}else if(type == 101){
			this.setData({ company: value })
		}else if(type == 102){
			this.setData({ companyer: value })
		}else if(type == 103){
			this.setData({ address: value })
		}else if(type == 104){
			this.setData({ phone: value })
		}else if(type == 105){
			this.setData({ work_desc: value.value })
		}else if(type == 106){
			this.setData({ company_desc: value.value })
		}
	},

	// 文件上传处理
	upload(r){
		// 200-205 营业 相关资质 学习证明 身份证正面 身份证反面 毕业证正面
		var type = r.currentTarget.dataset.type;
		const fileManager = wx.getFileSystemManager();
		var _this = this;
		Toast.loading({
	        mask: true,
	        message: '提交中...',
	        duration:0
	    });
    	wx.chooseImage({
			count: 9,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success: res=> {
				setTimeout(()=>{
					var base64 = 'data:image/jpeg;base64,' + fileManager.readFileSync(res.tempFilePaths[0],'base64')
					console.log(base64);
					if(type == 200){
						this.setData({ company_img: base64 });
					}else if(type == 201){
						this.setData({ other_companyimg: base64 });
					}else if(type == 202){
						this.setData({ study_img: base64 });
					}else if(type == 203){
						this.setData({ idcard_img1: base64 });
					}else if(type == 204){
						this.setData({ idcard_img2: base64 });
					}else if(type == 205){
						this.setData({ school_img: base64 });
					}
				},1000)
					
			},
			fail:res=>{
				
			},
			complete:res=>{
				setTimeout(()=>{
					Toast.clear();
				},1000)
			}
		})
	},

	// 收款信息
	onChange(event) {
		this.setData({
			activeName: event.detail
		});
	},

	
	saveres(){
		url._post('api/user/set_invite', {
			token: app.globalData.token ? app.globalData.token : token,
			data: JSON.stringify(this.data)
		}).then(res => {
			wx.showToast({ title: res.msg, icon: 'none' })
			if (res.status == 200){
				setTimeout(()=>{
					wx.switchTab({
						url: '/pages/personal/personal'
					})
				},700)
			}
		}).catch(res => {
            //wx.showToast({ title:"网络访问错误", icon: 'none' })
        })
	},
	isprotocol(){
	    wx.navigateTo({
	        url: '/pages/authorize/user/index?type='+this.data.type
	    })
	},
})