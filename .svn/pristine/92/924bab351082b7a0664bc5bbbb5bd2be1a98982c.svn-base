// pages/getuser/index.js
var url = require("../../utils/util.js");
const app = getApp();

Component({
    properties:{
        getUsersData:{
            type: Object,
            value: {},
            observer: function (event) {
                // console.log(event)
            }
        }
    },
    data:{
        getUsersData:[]
    },
    attached(){

    },
    moved: function () {
        console.log(this.data.getUsersData)
    },
    methods:{
        getUserInfo(res){
            if(res.detail.errMsg == "getUserInfo:ok"){
                app.globalData.userInfo = res.detail.userInfo;
                url._post('api/login/wx_user',{
                    token: app.globalData.token ? app.globalData.token : token,
                    userInfo: JSON.stringify(res.detail.userInfo)
                }).then(res => {
                    this.triggerEvent('myevent',{type: '0'})
                }).catch(res => {
                    wx.showToast({ title:"网络访问错误", icon: 'none' })
                })
            }else{
                console.log(res.detail)
            }
        },
        cancel(){
            console.log(this.data.getUsersData)
            switch(this.data.getUsersData.types){
                case "1":
                    wx.switchTab({
                        url:'/pages/index/index'
                    });
                    break;
                case "2":
                    this.setData({
                        getUsersData:{value:"0"}
                    });
                    break;
                default:
                    console.log("参数types定义错误");
            }
        }
    }
})