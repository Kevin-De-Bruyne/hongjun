// tabBarComponent/tabBar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbar: {
      type: Object,
      value: {
        // "backgroundColor": "#ffffff",
        // "color": "#979795",
        // "selectedColor": "#1c1c1b",
        // "list": [
        //   {
        //     "pagePath": "/pages/toupiao/toupiao",
        //     "iconPath": "icon/shouye.png",
        //     "selectedIconPath": "icon/shouye_act.png",
        //     "text": "首页"
        //   },
        //   {
        //     "pagePath": "/pages/shops/shops",
        //     "iconPath": "icon/guize.png",
        //     "text": "发布"
        //   },
        //   {
        //     "pagePath": "/pages/personal/personal",
        //     "iconPath": "icon/pai.png",
        //     "selectedIconPath": "icon/pai_act.png",
        //     "text": "我的"
        //   }
        // ]
      }
    },
    active:{
      type:Boolean
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    // isIphoneX: app.globalData.systemInfo.model.search('iPhone X') != -1 ? true : false
    active:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
  //   paiClick(){
  //     this.setData({
  //       active:true
  //     })
  // }
}
})
