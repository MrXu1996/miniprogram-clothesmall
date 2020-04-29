// components/common/w-tab-control/w-tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles: {
      type: Array,
      default: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTabClick(e) {
      const index = e.currentTarget.dataset.index
      // 修改currentIndex
      this.setData({
        currentIndex: index
      })      

      // 通知页面内部的点击事件
      this.triggerEvent('itemClick', {index, title: this.properties.titles[index]}, {})
    }
  }
})
