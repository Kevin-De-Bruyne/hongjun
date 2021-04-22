
Component({
  data: {
    selected:0,
    "color": "#a9b7b7",
    "selectedColor": "#FECD04",
    "borderStyle": "white",
    "list": [
      {
        "selectedIconPath": "/components/tabbarComponent/icon/shouye_act.png",
        "iconPath": "/components/tabbarComponent/icon/shouye.png",
        "pagePath": "/pages/toupiao/toupiao",
        "text": "投票"
      },
      {
        "selectedIconPath": "/components/tabbarComponent/icon/guize_act.png",
        "iconPath": "/components/tabbarComponent/icon/guize.png",
        "pagePath": "/pages/rule/rule",
        "text": "规则"
      },
      {
        "selectedIconPath": "/components/tabbarComponent/icon/baoming_act.png",
        "iconPath": "/components/tabbarComponent/icon/baoming.png",
        "text": "报名",
        "pagePath": "/pages/baoming/baoming"
      },
      {
        "selectedIconPath": "/components/tabbarComponent/icon/pai_act.png",
        "iconPath": "/components/tabbarComponent/icon/pai.png",
        "pagePath": "/pages/paiming/paiming",
        "text": "排名"
      }
    ]
  },
  attached() {
  },
  methods: {
    huishou(){
      console.log('回收回收')
    },
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      console.log(url)
      wx.switchTab({
        url
      })
      this.setData({
        selected:data.index
      })
      console.log(this.data.selected)
      
    }
  }
})